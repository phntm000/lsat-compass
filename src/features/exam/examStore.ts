/**
 * Exam feature — shared run state + sessionStorage persistence.
 *
 * Runs are built at setup time and persisted to sessionStorage so the exam
 * survives reloads and the break screen. Timed answers are persisted per
 * section (needed for second-pass review) with a Dexie fallback.
 */
import type { MasteryResult } from '../../engine/types';
import { PASSAGES, QUESTIONS, getPassage } from '../../content';
import type { Question } from '../../content';
import { db } from '../../db/db';

export const SECTION_SECONDS = 35 * 60;
export const BREAK_SECONDS = 10 * 60;

export interface ExamAnswerRecord {
  questionId: string;
  /** Timed choice letter index; null when unanswered, or when the exact
   *  letter is unknown (QuestionRunner's deferred contract only reports
   *  correctness — it is exact when the answer was correct). */
  choice: number | null;
  confidence: null;
  flagged: boolean;
  correct: boolean;
  answered: boolean;
  responseTimeMs: number;
  hintsUsed: number;
}

export interface ExamSectionDef {
  index: number;
  kind: 'LR' | 'RC';
  /** True for the hidden unscored variable section (sim only). */
  variable: boolean;
  questionIds: string[];
  passageIds?: string[];
}

export interface ExamRunState {
  runId: string;
  mode: 'sim' | 'section';
  kind?: 'LR' | 'RC';
  sections: ExamSectionDef[];
  /** Next section to run (0-based). Advanced after each finished section. */
  currentSection: number;
  /** 1-based label of the variable section; null for single-section mode.
   *  NEVER surfaced in the runner UI until results. */
  variablePosition: number | null;
  startedAt: number;
  finishedSections: number[];
  /** True when any section fell back to adversarial-reviewed (not validated)
   *  items because the validated pool was exhausted. Surfaced as a
   *  learner-visible disclosure in results (Part LI). */
  usedProvisionalItems: boolean;
}

const RUN_KEY = (runId: string) => `exam-run:${runId}`;
const ANSWERS_KEY = (runId: string, sectionIdx: number) => `exam-answers:${runId}:${sectionIdx}`;

export function saveRun(run: ExamRunState): void {
  try {
    sessionStorage.setItem(RUN_KEY(run.runId), JSON.stringify(run));
  } catch {
    /* storage unavailable — run stays in memory only */
  }
}

export function loadRun(runId: string): ExamRunState | null {
  try {
    const raw = sessionStorage.getItem(RUN_KEY(runId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ExamRunState;
    if (!parsed || !Array.isArray(parsed.sections) || parsed.sections.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSectionAnswers(
  runId: string,
  sectionIdx: number,
  answers: Record<string, ExamAnswerRecord>,
): void {
  try {
    sessionStorage.setItem(ANSWERS_KEY(runId, sectionIdx), JSON.stringify(answers));
  } catch {
    /* storage unavailable */
  }
}

export function loadSectionAnswersFromStorage(
  runId: string,
  sectionIdx: number,
): Record<string, ExamAnswerRecord> | null {
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY(runId, sectionIdx));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, ExamAnswerRecord>;
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Answers for a section: sessionStorage first, Dexie attempts as fallback
 * (sessionId `<runId>:s<idx>`). The fallback recovers choice/correct/timing
 * but not flags (recordQuestionAttempt stores flagged: null).
 */
export async function loadSectionAnswers(
  runId: string,
  sectionIdx: number,
  section: ExamSectionDef,
): Promise<Record<string, ExamAnswerRecord>> {
  const stored = loadSectionAnswersFromStorage(runId, sectionIdx);
  if (stored && Object.keys(stored).length > 0) return stored;
  try {
    const rows = await db.attempts.where('sessionId').equals(`${runId}:s${sectionIdx}`).toArray();
    const out: Record<string, ExamAnswerRecord> = {};
    for (const qid of section.questionIds) {
      const latest = rows.filter((r) => r.questionId === qid).sort((a, b) => b.timestamp - a.timestamp)[0];
      if (!latest) continue;
      out[qid] = {
        questionId: qid,
        choice: latest.selectedChoice >= 0 ? latest.selectedChoice : null,
        confidence: null,
        flagged: false,
        correct: latest.correct,
        answered: latest.selectedChoice >= 0,
        responseTimeMs: latest.responseTimeMs,
        hintsUsed: latest.hintsUsed,
      };
    }
    return out;
  } catch {
    return stored ?? {};
  }
}

/* ------------------------------------------------------------------ */
/* Section builders                                                    */
/* ------------------------------------------------------------------ */

/**
 * LR exam blueprint (Part XLVIII): sections are NOT random concatenations
 * and NOT mastery-adaptive (a simulation must feel like test day, not
 * practice). The blueprint controls:
 *  - assessment-only pool (no worked-example/micro-drill/skill-acquisition,
 *    no retired/draft/needs-revision items)
 *  - question-type diversity (cap 4 per type, ≥12 distinct types)
 *  - difficulty progression (roughly ascending, like real sections:
 *    early slots d1–2, middle d2–4, late d3–5)
 *  - topic diversity (no adjacent same-topic items)
 *  - no premature reuse (live seen-set threaded through every section)
 *
 * Target 25 questions: consistent with widely-reported section lengths
 * (24–26). LSAC does not publish an exact per-section count, so the app
 * never presents this number as official.
 */
const ASSESSMENT_PURPOSES = new Set([
  'independent-blocked', 'mixed-discrimination', 'transfer',
  'timed-assessment', 'section-simulation',
]);

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed >>> 0 || 1;
  const rand = () => (s = (s * 1664525 + 1013904223) >>> 0) / 0xffffffff;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Thrown when the validated-item pool cannot fill a simulation section.
 *  Final-release rule (Part LI): only validated items may enter simulations —
 *  the app blocks exam creation instead of serving unvalidated items. */
export class InsufficientValidatedPoolError extends Error {
  constructor(sectionKind: string, have: number, need: number) {
    super(
      `Not enough validated ${sectionKind} questions to build this exam ` +
      `(${have} available, ${need} needed). Simulations unlock as the ` +
      `validated question bank grows.`,
    );
    this.name = 'InsufficientValidatedPoolError';
  }
}

function buildLRBlueprint(
  target: number,
  seen: Set<string>,
  seed: number,
): { ids: string[]; provisional: boolean } {
  // Part LI gate: simulations draw from VALIDATED items only. No fallback
  // to adversarial-reviewed or author-reviewed items — if the validated
  // pool cannot fill the section, creation is blocked with a clear error.
  const eligible = (status: string, excludeSeen: boolean) =>
    QUESTIONS.filter(
      (q) =>
        q.sectionType === 'LR' &&
        ASSESSMENT_PURPOSES.has(q.itemPurpose) &&
        q.validationStatus === status &&
        (!excludeSeen || !seen.has(q.id)),
    );
  let pool = eligible('validated', true);
  const provisional = false;
  // If the unseen validated pool is exhausted, allow seen validated items
  // (repetition beats a short section); still validated-only.
  if (pool.length < target) {
    pool = eligible('validated', false);
  }
  if (pool.length < target) {
    throw new InsufficientValidatedPoolError('LR', pool.length, target);
  }

  // Slot difficulty bands: roughly ascending like a real section.
  const band = (slot: number): [number, number] => {
    if (slot < 8) return [1, 2];
    if (slot < 17) return [2, 4];
    return [3, 5];
  };

  const typeCount = new Map<string, number>();
  const picked: Question[] = [];
  const usedIds = new Set<string>();

  for (let slot = 0; slot < target; slot++) {
    const [lo, hi] = band(slot);
    const prevTopic = picked.length ? picked[picked.length - 1].labels?.topic : null;
    const candidates = seededShuffle(
      pool.filter(
        (q) =>
          !usedIds.has(q.id) &&
          q.editorialDifficulty >= lo && q.editorialDifficulty <= hi &&
          (typeCount.get(q.questionType) ?? 0) < 4 &&
          q.labels?.topic !== prevTopic,
      ),
      seed + slot * 7919,
    );
    // Relax topic rule, then type cap, then difficulty band — never fail.
    const choice =
      candidates[0] ??
      seededShuffle(pool.filter((q) => !usedIds.has(q.id) &&
        q.editorialDifficulty >= lo && q.editorialDifficulty <= hi), seed + slot)[0] ??
      seededShuffle(pool.filter((q) => !usedIds.has(q.id)), seed + slot)[0];
    if (!choice) break;
    picked.push(choice);
    usedIds.add(choice.id);
    seen.add(choice.id);
    typeCount.set(choice.questionType, (typeCount.get(choice.questionType) ?? 0) + 1);
  }
  return { ids: picked.map((q) => q.id), provisional };
}

function buildLRQuestionIds(
  _mastery: Record<string, MasteryResult>,
  /** Live set: previously built sections' picks AND the user's seen ids.
   *  Each section's composer avoids everything in it, so no two sections
   *  share a question and unseen questions are preferred. */
  seen: Set<string>,
): { ids: string[]; provisional: boolean } {
  // Exam LR sections use the fixed blueprint (Part XLVIII), not the
  // mastery-adaptive practice composer: a simulation must not adapt.
  const seed = (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0;
  return buildLRBlueprint(25, seen, seed);
}

function buildRCQuestionIds(excludePassages: Set<string>): { questionIds: string[]; passageIds: string[]; provisional: boolean } {
  // Part LI gate for RC: only passages whose questions are ALL validated
  // may enter simulations. If fewer than 4 fully-validated passages are
  // available, creation is blocked with a clear error — no fallback to
  // adversarial-reviewed or author-reviewed passages.
  const qStatus = new Map(QUESTIONS.map((q) => [q.id, q.validationStatus]));
  const passageTier = (pid: string): 0 | 1 | 2 => {
    const p = getPassage(pid);
    if (!p) return 2;
    const sts = p.questionIds.map((qid) => qStatus.get(qid));
    if (sts.length > 0 && sts.every((s) => s === 'validated')) return 0;
    if (sts.every((s) => s === 'validated' || s === 'adversarial-reviewed')) return 1;
    return 2;
  };
  const pool = PASSAGES.filter((p) => !excludePassages.has(p.id) && passageTier(p.id) === 0);
  const provisional = false;
  if (pool.length < 4) {
    throw new InsufficientValidatedPoolError('RC', pool.length, 4);
  }
  // Topic-cluster guard (P1-4): never serve two passages from the same
  // topic cluster in one section.
  const picked: string[] = [];
  const usedClusters = new Set<string>();
  for (const p of pool) {
    if (picked.length >= 4) break;
    const cluster = (p as { topicCluster?: string }).topicCluster;
    if (cluster && usedClusters.has(cluster)) continue;
    if (cluster) usedClusters.add(cluster);
    picked.push(p.id);
  }
  if (picked.length < 4) {
    for (const p of pool) {
      if (picked.length >= 4) break;
      if (!picked.includes(p.id)) picked.push(p.id);
    }
  }
  let ids = picked.slice(0, 4);
  // LSAC: a section has "either one or no comparative reading passage" — a
  // comparative set is NOT guaranteed every section (verified 2026-09-11).
  // Include one ~50% of the time to mirror that distribution.
  const wantComparative = Math.random() < 0.5;
  const hasComparative = ids.some((id) => getPassage(id)?.comparative);
  // Cluster-aware swap: the replacement must not share a topic cluster
  // with any passage already in the set (P1-4 duplication guard).
  const clustersInUse = new Set(
    ids.map((id) => (getPassage(id) as { topicCluster?: string } | undefined)?.topicCluster).filter(Boolean),
  );
  const clusterOk = (pid: string) => {
    const c = (getPassage(pid) as { topicCluster?: string } | undefined)?.topicCluster;
    return !c || !clustersInUse.has(c);
  };
  if (wantComparative && !hasComparative) {
    const comp = pool.find(
      (p) => p.comparative && !ids.includes(p.id) && !excludePassages.has(p.id) && clusterOk(p.id),
    );
    if (comp && ids.length > 0) ids[ids.length - 1] = comp.id;
  } else if (!wantComparative && hasComparative) {
    const swap = pool.find(
      (p) => !p.comparative && !ids.includes(p.id) && !excludePassages.has(p.id) && clusterOk(p.id),
    );
    const idx = ids.findIndex((id) => getPassage(id)?.comparative);
    if (swap && idx >= 0) ids[idx] = swap.id;
  }
  for (const id of ids) excludePassages.add(id);
  const questionIds = ids.flatMap((id) => getPassage(id)?.questionIds ?? []);
  // The swap can introduce a passage from a lower tier than the pick set —
  // recompute provisional from the final set.
  const finalTier = Math.max(...ids.map((id) => passageTier(id)));
  return { questionIds, passageIds: ids, provisional: provisional || finalTier > 0 };
}

export function createRun(
  mode: 'sim' | 'section',
  kind: 'LR' | 'RC' | undefined,
  mastery: Record<string, MasteryResult>,
  seenQuestionIds: Set<string>,
): ExamRunState {
  const runId = `exam-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const excludeQ = new Set<string>(seenQuestionIds);
  const excludeP = new Set<string>();
  const sections: ExamSectionDef[] = [];

  if (mode === 'section') {
    const k: 'LR' | 'RC' = kind === 'RC' ? 'RC' : 'LR';
    let provisional = false;
    if (k === 'LR') {
      const lr = buildLRQuestionIds(mastery, excludeQ);
      provisional = lr.provisional;
      sections.push({ index: 0, kind: 'LR', variable: false, questionIds: lr.ids });
    } else {
      const rc = buildRCQuestionIds(excludeP);
      provisional = rc.provisional;
      sections.push({ index: 0, kind: 'RC', variable: false, questionIds: rc.questionIds, passageIds: rc.passageIds });
    }
    return {
      runId, mode, kind: k, sections,
      currentSection: 0, variablePosition: null,
      startedAt: Date.now(), finishedSections: [],
      usedProvisionalItems: provisional,
    };
  }

  // Full simulation: variable section is LR or RC, hidden at a random
  // position 1–4. The three scored slots are LR, LR, RC in position order.
  const variablePosition = 1 + Math.floor(Math.random() * 4);
  const variableKind: 'LR' | 'RC' = Math.random() < 0.5 ? 'LR' : 'RC';
  const scoredKinds: ('LR' | 'RC')[] = ['LR', 'LR', 'RC'];
  let scoredCursor = 0;
  let provisional = false;
  for (let pos = 1; pos <= 4; pos++) {
    const isVariable = pos === variablePosition;
    const sectionKind: 'LR' | 'RC' = isVariable ? variableKind : scoredKinds[scoredCursor++];
    if (sectionKind === 'LR') {
      const lr = buildLRQuestionIds(mastery, excludeQ);
      provisional = provisional || lr.provisional;
      sections.push({
        index: pos - 1, kind: 'LR', variable: isVariable,
        questionIds: lr.ids,
      });
    } else {
      const rc = buildRCQuestionIds(excludeP);
      provisional = provisional || rc.provisional;
      sections.push({
        index: pos - 1, kind: 'RC', variable: isVariable,
        questionIds: rc.questionIds, passageIds: rc.passageIds,
      });
    }
  }

  return {
    runId, mode: 'sim', sections,
    currentSection: 0, variablePosition,
    startedAt: Date.now(), finishedSections: [],
    usedProvisionalItems: provisional,
  };
}

export function sectionSessionId(runId: string, sectionIdx: number): string {
  return `${runId}:s${sectionIdx}`;
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatAvgMs(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return '—';
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}s`;
}
