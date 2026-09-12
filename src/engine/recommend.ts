/**
 * Adaptive recommendation engine (§22) and Today-plan builder (§23).
 * Fully local and deterministic. Every recommendation carries a human-readable
 * `reason` so the "intelligence" is inspectable, never black-box.
 */
import { DAY_MS } from './types';
import type { MasteryResult, MasteryState, SkillEvidence, SkillMeta } from './types';
import type { ReviewCandidate } from './scheduler';

export interface LessonMeta {
  id: string;
  stage: number;
  title: string;
  estimatedMinutes: number;
  skills: string[];
  prerequisites: string[];
}

export interface PlanBlock {
  kind: 'review' | 'lesson' | 'drill' | 'contrast' | 'mixed' | 'timed'
       | 'remediation' | 'quest' | 'official';
  title: string;
  detail: string;
  minutes: number;
  reason: string;
  refIds: string[];   // lesson ids, skill ids, or drill ids
  score: number;      // internal ranking score
}

export interface TodayPlan {
  blocks: PlanBlock[];
  totalMinutes: number;
  primaryCta: string;
  generatedAt: number;
}

interface EngineInputs {
  now: number;
  minutes: number;                    // user's preferred session length
  lessons: LessonMeta[];              // curriculum order
  lessonProgress: Record<string, 'done' | 'started'>;
  reviews: ReviewCandidate[];
  masteryBySkill: Record<string, { mastery: MasteryResult; evidence: SkillEvidence; meta: SkillMeta }>;
  remediationNeeded: { skillId: string; pattern: string }[]; // from error analysis
  confusionPairs: { pair: string; missRate: number }[];      // for contrast drills
  testDateMs: number | null;
  recentTimedAccuracy: number | null; // last 20 timed attempts
  untimedAccuracy: number | null;
}

/** Next uncompleted lesson whose prerequisites are at least 'developing'. */
function nextLesson(
  lessons: LessonMeta[], progress: Record<string, 'done' | 'started'>,
  masteryBySkill: EngineInputs['masteryBySkill'],
): LessonMeta | null {
  for (const l of lessons) {
    if (progress[l.id] === 'done') continue;
    const prereqsOk = l.prerequisites.every(p => {
      const s = masteryBySkill[p]?.mastery.state as MasteryState | undefined;
      return s === 'developing' || s === 'stable' || s === 'mastered';
    });
    if (prereqsOk) return l;
  }
  return null;
}

function stateRank(s: MasteryState): number {
  return { new: 0, learning: 1, developing: 2, stable: 3, mastered: 4, lapsed: 1 }[s];
}

export function buildTodayPlan(inp: EngineInputs): TodayPlan {
  const blocks: PlanBlock[] = [];
  let remaining = inp.minutes;

  const push = (b: Omit<PlanBlock, 'score'>, score: number) => {
    if (b.minutes < 0) return;
    blocks.push({ ...b, score });
  };

  // 1. Overdue / due review — always first if anything is due (§44).
  const reviewItems = inp.reviews.slice(0, 6);
  if (reviewItems.length > 0) {
    const mins = Math.min(remaining, reviewItems.length * 3);
    push({
      kind: 'review',
      title: `${reviewItems.length} scheduled review${reviewItems.length > 1 ? 's' : ''}`,
      detail: reviewItems.map(r => shortSkill(r.skillId)).join(' · '),
      minutes: mins,
      reason: inp.reviews[0].reason,
      refIds: reviewItems.map(r => r.skillId),
    }, 100);
    remaining -= mins;
  }

  // 2. Remediation mini-lessons for detected error patterns (§80).
  for (const r of inp.remediationNeeded.slice(0, 2)) {
    if (remaining < 8) break;
    push({
      kind: 'remediation',
      title: `${shortSkill(r.skillId)} repair`,
      detail: r.pattern,
      minutes: Math.min(10, remaining),
      reason: 'Detected a repeated error pattern — targeted repair beats more random questions.',
      refIds: [r.skillId],
    }, 95);
    remaining -= Math.min(10, remaining);
  }

  // 3. Next curriculum lesson.
  const nl = nextLesson(inp.lessons, inp.lessonProgress, inp.masteryBySkill);
  if (nl && remaining >= 8) {
    push({
      kind: 'lesson',
      title: nl.title,
      detail: `Lesson ${nl.id}`,
      minutes: Math.min(nl.estimatedMinutes, remaining),
      reason: 'Next step in your learning path.',
      refIds: [nl.id],
    }, 90);
    remaining -= Math.min(nl.estimatedMinutes, remaining);
  }

  // 4. Contrast drills for confused pairs (§27).
  const confused = inp.confusionPairs.filter(c => c.missRate >= 0.4).slice(0, 2);
  for (const c of confused) {
    if (remaining < 6) break;
    push({
      kind: 'contrast',
      title: `Contrast: ${c.pair}`,
      detail: 'Tell these apart reliably',
      minutes: Math.min(8, remaining),
      reason: `You're mixing up ${c.pair} — direct contrast fixes this fastest.`,
      refIds: [c.pair],
    }, 88);
    remaining -= Math.min(8, remaining);
  }

  // 5. Weakest-skill drill (importance-weighted).
  const weak = Object.values(inp.masteryBySkill)
    .filter(s => (s.evidence?.attempts ?? 0) >= 3 &&
      (s.mastery.state === 'learning' || s.mastery.state === 'developing' || s.mastery.state === 'lapsed'))
    .sort((a, b) =>
      (b.meta.importance * (100 - b.mastery.score)) - (a.meta.importance * (100 - a.mastery.score)));
  if (weak[0] && remaining >= 8) {
    push({
      kind: 'drill',
      title: `Targeted drill: ${shortSkill(weak[0].meta.id)}`,
      detail: `${Math.round(weak[0].mastery.score)}% mastery`,
      minutes: Math.min(12, remaining),
      reason: 'Your weakest high-value skill right now.',
      refIds: [weak[0].meta.id],
    }, 85);
    remaining -= Math.min(12, remaining);
  }

  // 6. Mixed practice — once foundations are developing (§46, §83).
  const developingCount = Object.values(inp.masteryBySkill)
    .filter(s => stateRank(s.mastery.state) >= 2).length;
  if (developingCount >= 4 && remaining >= 10) {
    push({
      kind: 'mixed',
      title: 'Mixed practice set',
      detail: 'Unlabeled question types',
      minutes: Math.min(15, remaining),
      reason: 'Mixed practice builds transfer — recognizing types without labels.',
      refIds: [],
    }, 80);
    remaining -= Math.min(15, remaining);
  }

  // 7. Timed work — when untimed accuracy is solid, or test date is near.
  const daysToTest = inp.testDateMs ? (inp.testDateMs - inp.now) / DAY_MS : null;
  const timedReady = (inp.untimedAccuracy ?? 0) >= 0.72 ||
    (daysToTest !== null && daysToTest <= 45);
  if (timedReady && remaining >= 10) {
    push({
      kind: 'timed',
      title: daysToTest !== null && daysToTest <= 21 ? 'Timed section' : 'Timed mini-set',
      detail: 'Test-speed practice',
      minutes: Math.min(remaining, daysToTest !== null && daysToTest <= 21 ? 35 : 12),
      reason: daysToTest !== null && daysToTest <= 45
        ? `Test date is ${Math.max(1, Math.round(daysToTest))} days out — timing matters now.`
        : 'Your untimed accuracy supports adding time pressure.',
      refIds: [],
    }, 78);
  }

  // 8. Official practice nudge at milestones (§60, Stage 8).
  const totalAttempts = Object.values(inp.masteryBySkill)
    .reduce((n, s) => n + (s.evidence?.attempts ?? 0), 0);
  if (totalAttempts >= 150 && totalAttempts < 170) {
    push({
      kind: 'official',
      title: 'Try an official LawHub section',
      detail: 'Free official practice',
      minutes: 0,
      reason: 'You have enough foundation — calibrate against real LSAT questions.',
      refIds: [],
    }, 70);
  }

  blocks.sort((a, b) => b.score - a.score);
  const totalMinutes = blocks.reduce((n, b) => n + b.minutes, 0);
  const primary = blocks[0];
  return {
    blocks,
    totalMinutes,
    primaryCta: primary ? `Start: ${primary.title}` : 'Start foundations',
    generatedAt: inp.now,
  };
}

function shortSkill(id: string): string {
  return id.replace(/^(f|lr|rc|w)-/, '').replace(/-/g, ' ');
}
