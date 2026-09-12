/**
 * Session generator (§24). Composes concrete sessions from engine state.
 * Pure logic with injected content providers (so it stays testable without
 * importing the whole content bank).
 */
import type { MasteryResult } from './types';
import type { ReviewCandidate } from './scheduler';
import type { RemediationBranch } from './remediation';

export type SessionMode =
  | 'learn' | 'review' | 'drill' | 'mixed' | 'timed'
  | 'weakness-repair' | 'error-log' | 'contrast' | 'full-section';

export interface SessionItem {
  kind: 'lesson' | 'question' | 'drill' | 'contrast' | 'passage-set';
  refId: string;
  skillIds: string[];
  estimatedMinutes: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
}

export interface SessionPlan {
  id: string;
  mode: SessionMode;
  title: string;
  minutes: number;
  items: SessionItem[];
  createdAt: number;
  timed: boolean;
  feedbackMode: 'immediate' | 'deferred';
  /** Remediation branch (Part XXXVI) — set for weakness-repair sessions. */
  remediationBranch?: RemediationBranch;
  /** When true, the runner asks the learner to name each question's type
   *  after answering (discrimination-branch proof step). */
  typeLabelProof?: boolean;
}

export interface QuestionProvider {
  /** n unseen (or least-recently-seen) question ids for skill in difficulty range */
  pick(skillId: string, n: number, diffMin: number, diffMax: number,
       excludeIds: string[], seenIds: Set<string>): { id: string; skillIds: string[]; difficulty: number; estMin: number }[];
  /** Fetch a single question by id (misconception re-face). Optional. */
  pickById?(qid: string): { id: string; skillIds: string[]; difficulty: number; estMin: number } | undefined;
  pickPassageSet(n: number, excludeIds: string[]): { id: string; questionIds: string[]; estMin: number }[];
  pickDrills(skillIds: string[], n: number, excludeIds: string[]): { id: string; skillIds: string[]; estMin: number }[];
  pickContrast(pair: string | null, n: number): { id: string; skillIds: string[]; estMin: number }[];
}

export interface ComposerInput {
  now: number;
  mode: SessionMode;
  minutes: number; // 5..60
  targetSkillIds?: string[];
  reviews?: ReviewCandidate[];
  masteryBySkill: Record<string, MasteryResult>;
  seenQuestionIds: Set<string>;
  provider: QuestionProvider;
  recentErrors: { questionId: string; skillIds: string[] }[]; // for error-log mode
  /** Remediation branch chosen by the caller (Part XXXVI). */
  remediationBranch?: RemediationBranch;
  /** Exact question ids to re-face (misconception branch). */
  refaceQuestionIds?: string[];
  testDateMs?: number | null;
  /**
   * Full skill catalog ids. Used as a fallback when neither targetSkillIds
   * nor mastery keys yield any skills (e.g. a brand-new user with no
   * attempts yet) — without this, question-picking modes build empty sets.
   */
  allSkillIds?: string[];
}

function difficultyWindow(score: number, failingAtHigh: boolean): [number, number] {
  if (failingAtHigh) return [1, 3]; // back off: simpler representations (§45)
  if (score < 55) return [1, 2];
  if (score < 70) return [2, 3];
  if (score < 85) return [2, 4];
  return [3, 5];
}

function isFailingAtHigh(skillId: string,
  masteryBySkill: Record<string, MasteryResult>): boolean {
  const m = masteryBySkill[skillId];
  if (!m) return false;
  // Recent evidence poor despite attempts at difficulty ≥4.
  return (m.dimensions.discrimination ?? m.dimensions.acquisition ?? 100) < 55 && m.maxDifficultySeen >= 4;
}

/** Deterministic interleave order (seeded shuffle) for mixed sets. */
export function interleaveOrder<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed >>> 0 || 1;
  const rand = () => (s = (s * 1664525 + 1013904223) >>> 0) / 0xffffffff;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let planSeq = 0;

export function composeSession(inp: ComposerInput): SessionPlan {
  const items: SessionItem[] = [];
  let remaining = inp.minutes;
  const exclude: string[] = [];
  // Fluency remediation is timed training by definition (Part XXXVI): the
  // branch promises "time pressure with pacing visible", so it forces the
  // session timer even though the mode is 'weakness-repair'.
  const timed = inp.mode === 'timed' || inp.mode === 'full-section' ||
    inp.remediationBranch === 'fluency';
  const feedbackMode = inp.mode === 'timed' || inp.mode === 'full-section'
    ? 'deferred' : 'immediate';

  const addQ = (skillId: string, n: number, minsEach = 1.6) => {
    const m = inp.masteryBySkill[skillId];
    const [dMin, dMax] = difficultyWindow(m?.score ?? 40, isFailingAtHigh(skillId, inp.masteryBySkill));
    const picked = inp.provider.pick(skillId, n, dMin, dMax, exclude, inp.seenQuestionIds);
    for (const q of picked) {
      if (remaining < 1) break;
      items.push({ kind: 'question', refId: q.id, skillIds: q.skillIds,
                   estimatedMinutes: q.estMin, difficulty: q.difficulty as 1|2|3|4|5 });
      exclude.push(q.id);
      remaining -= Math.min(remaining, minsEach);
    }
  };

  const derivedSkillIds = inp.targetSkillIds ??
    Object.keys(inp.masteryBySkill).filter(k => k.startsWith('lr-') || k.startsWith('f-'));
  // New users have no mastery keys yet — fall back to the full catalog so
  // timed/mixed/full-section modes still build real sets.
  const skillIds = derivedSkillIds.length > 0 ? derivedSkillIds : (inp.allSkillIds ?? []);

  switch (inp.mode) {
    case 'review': {
      for (const r of (inp.reviews ?? []).slice(0, 8)) {
        if (remaining < 2) break;
        const drills = inp.provider.pickDrills([r.skillId], 2, exclude);
        for (const d of drills) {
          items.push({ kind: 'drill', refId: d.id, skillIds: d.skillIds, estimatedMinutes: d.estMin });
          exclude.push(d.id); remaining -= d.estMin;
        }
        addQ(r.skillId, 2);
      }
      break;
    }
    case 'drill': {
      const target = skillIds[0];
      if (target) {
        const drills = inp.provider.pickDrills([target], 4, exclude);
        for (const d of drills) {
          items.push({ kind: 'drill', refId: d.id, skillIds: d.skillIds, estimatedMinutes: d.estMin });
          remaining -= d.estMin;
        }
        addQ(target, Math.max(2, Math.floor(remaining / 1.6)));
      }
      break;
    }
    case 'weakness-repair': {
      const branch: RemediationBranch = inp.remediationBranch ?? 'general';
      // Misconception branch: re-face the exact questions that fooled the
      // learner (high-confidence misses), not fresh items.
      if (branch === 'misconception' && (inp.refaceQuestionIds?.length ?? 0) > 0) {
        for (const qid of inp.refaceQuestionIds!.slice(0, 10)) {
          if (remaining < 2) break;
          const q = inp.provider.pickById?.(qid);
          if (!q || exclude.includes(qid)) continue;
          items.push({ kind: 'question', refId: q.id, skillIds: q.skillIds,
                       estimatedMinutes: q.estMin, difficulty: q.difficulty as 1|2|3|4|5 });
          exclude.push(q.id); remaining -= Math.min(remaining, 2);
        }
        break;
      }
      const weak = Object.entries(inp.masteryBySkill)
        .filter(([, m]) => m.score < 60 && m.state !== 'new')
        .sort((a, b) => a[1].score - b[1].score)
        .slice(0, 3);
      const targets = weak.length > 0 ? weak.map(([sid]) => sid)
        : (inp.targetSkillIds ?? []).slice(0, 3);
      for (const sid of targets) {
        if (remaining < 4) break;
        if (branch === 'reacquisition') {
          // Guided rebuild: drills first, then explained questions.
          const drills = inp.provider.pickDrills([sid], 3, exclude);
          for (const d of drills) {
            items.push({ kind: 'drill', refId: d.id, skillIds: d.skillIds, estimatedMinutes: d.estMin });
            exclude.push(d.id); remaining -= d.estMin;
          }
          addQ(sid, 3);
        } else {
          // discrimination / general: unlabeled mixed questions.
          // fluency: unlabeled mixed questions; the session timer is forced
          // on for this branch via plan.timed (see composeSession).
          addQ(sid, 4);
        }
      }
      break;
    }
    case 'error-log': {
      const errs = inp.recentErrors.slice(0, 10);
      for (const e of errs) {
        if (remaining < 2) break;
        // Analogous question on the same skills (§41: "schedule analogous questions").
        const sid = e.skillIds[0];
        if (sid) addQ(sid, 1);
      }
      break;
    }
    case 'contrast': {
      const cs = inp.provider.pickContrast(null, Math.max(4, Math.floor(remaining / 1.2)));
      for (const c of cs) {
        items.push({ kind: 'contrast', refId: c.id, skillIds: c.skillIds, estimatedMinutes: c.estMin });
        remaining -= c.estMin;
      }
      break;
    }
    case 'mixed': {
      // Interleave across skills the learner has touched (§46).
      const touched = skillIds.filter(s => (inp.masteryBySkill[s]?.score ?? 0) > 0);
      const order = interleaveOrder(touched.length ? touched : skillIds, inp.now);
      let i = 0;
      while (remaining >= 1.5 && i < 40) {
        const sid = order[i % order.length];
        const before = items.length;
        addQ(sid, 1);
        if (items.length === before) break;
        i++;
      }
      break;
    }
    case 'timed': {
      // Timed mini-set: LR or mixed at test pace.
      let i = 0;
      const order = interleaveOrder(skillIds.filter(s => s.startsWith('lr-')), inp.now);
      while (remaining >= 1.2 && i < 30) {
        const sid = order[i % order.length];
        const before = items.length;
        addQ(sid, 1, 1.2);
        if (items.length === before) break;
        i++;
      }
      break;
    }
    case 'full-section': {
      // 35-minute LR section simulation: ~25 questions, mixed types.
      const order = interleaveOrder(skillIds.filter(s => s.startsWith('lr-')), inp.now);
      let i = 0;
      const target = 25;
      while (items.length < target && i < 60) {
        const sid = order[i % order.length];
        addQ(sid, 1, 1.4);
        i++;
      }
      remaining = 0;
      break;
    }
    case 'learn':
    default: {
      // Learn mode is lesson-driven; the runner handles lesson + follow-up items.
      break;
    }
  }

  const titles: Record<SessionMode, string> = {
    learn: 'Learn', review: 'Spaced review', drill: 'Targeted drill',
    mixed: 'Mixed practice', timed: 'Timed set', 'weakness-repair': 'Weakness repair',
    'error-log': 'Error log review', contrast: 'Contrast training',
    'full-section': 'Full 35-minute section',
  };

  return {
    id: `plan-${inp.now}-${++planSeq}`,
    mode: inp.mode,
    title: titles[inp.mode],
    minutes: inp.minutes - remaining,
    items,
    createdAt: inp.now,
    timed,
    feedbackMode,
    remediationBranch: inp.remediationBranch,
    typeLabelProof: inp.remediationBranch === 'discrimination',
  };
}
