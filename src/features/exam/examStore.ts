/**
 * Exam feature — shared run state + durable persistence.
 *
 * Runs are built at setup time and persisted to sessionStorage (fast sync
 * reads) with a write-through IndexedDB mirror (examState table), so the
 * exam survives reloads, the break screen, tab closes, crashes, and
 * browser restarts. Timed answers are persisted per section (needed for
 * second-pass review) with a Dexie fallback.
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
const DEADLINE_KEY = (runId: string, sectionIdx: number) => `exam-deadline:${runId}:${sectionIdx}`;

/* Durable exam state (2026-09-12): sessionStorage alone meant a tab close
 * or crash destroyed an in-progress exam — unacceptable exam integrity.
 * Every write is mirrored fire-and-forget into IndexedDB (examState
 * table); the durable loaders below rehydrate sessionStorage on a miss,
 * so exams survive tab close, crash, and browser restart. */
function persistExamKey(key: string, value: unknown): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — IndexedDB mirror still applies */
  }
  db.examState
    .put({ key, value: JSON.stringify(value), updatedAt: Date.now() })
    .catch(() => {
      /* IndexedDB unavailable — sessionStorage copy still applies */
    });
}

/** Rehydrate every examState key for a run into sessionStorage. */
async function rehydrateRunKeys(runId: string): Promise<void> {
  try {
    const rows = await db.examState.toArray();
    for (const row of rows) {
      if (!row.key.includes(runId)) continue;
      try {
        if (sessionStorage.getItem(row.key) === null) {
          sessionStorage.setItem(row.key, row.value);
        }
      } catch {
        /* storage full/unavailable — in-memory return still works */
      }
    }
  } catch {
    /* IndexedDB unavailable */
  }
}

export function saveRun(run: ExamRunState): void {
  persistExamKey(RUN_KEY(run.runId), run);
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

/** Durable run load: sessionStorage first, IndexedDB mirror on a miss
 *  (rehydrating the run, its answers, and its section deadlines). */
export async function loadRunDurable(runId: string): Promise<ExamRunState | null> {
  const cached = loadRun(runId);
  if (cached) return cached;
  await rehydrateRunKeys(runId);
  return loadRun(runId);
}

export function saveSectionAnswers(
  runId: string,
  sectionIdx: number,
  answers: Record<string, ExamAnswerRecord>,
): void {
  persistExamKey(ANSWERS_KEY(runId, sectionIdx), answers);
}

/** Section wall-clock deadline (strict timer, 2026-09-12): persisted so a
 *  reload cannot reset the 35:00 clock — time genuinely elapses. */
export function saveSectionDeadline(runId: string, sectionIdx: number, deadlineMs: number): void {
  persistExamKey(DEADLINE_KEY(runId, sectionIdx), deadlineMs);
}

export function loadSectionDeadline(runId: string, sectionIdx: number): number | null {
  try {
    const raw = sessionStorage.getItem(DEADLINE_KEY(runId, sectionIdx));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as number;
    return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
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

/**
 * RC exam blueprint (§44, rewritten 2026-09-12). A section is 4 sets drawn
 * from the two legal families — 3 single + 1 comparative, or 4 single + 0
 * comparative (LSAC: "either one or no comparative reading passage"; a
 * comparative set is NOT guaranteed every section, verified 2026-09-11).
 * The family choice and every pick are deterministic functions of the run
 * seed — no Math.random in content selection — so a run is reproducible
 * from its seed and section composition is auditable.
 *
 * Beyond the family, the blueprint enforces, in strict feasibility order:
 *  1. Part LI gate: tier-0 (fully validated) passages only, else throw.
 *  2. Topic-cluster guard (P1-4): no two sets from one cluster.
 *  3. Family quota: exactly 1 comparative when the seed selects 3S+1C,
 *     exactly 0 for 4S+0C (relaxed only when the pool makes it impossible).
 *  4. Archetype diversity: ≥3 distinct passage domains per section.
 *  5. Set-size variety: never four sets of identical size when avoidable,
 *     and total questions in the realistic 24–30 band (§43 sizes 5–8).
 */
export function buildRCQuestionIds(
  excludePassages: Set<string>,
  seed: number,
): { questionIds: string[]; passageIds: string[]; provisional: boolean } {
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

  const wantComparative = (seed & 1) === 0;
  const sizeOf = (pid: string) => getPassage(pid)?.questionIds.length ?? 0;
  const domainOf = (pid: string) => (getPassage(pid) as { domain?: string } | undefined)?.domain;
  const clusterOf = (pid: string) => (getPassage(pid) as { topicCluster?: string } | undefined)?.topicCluster;

  const ordered = seededShuffle(pool, seed);
  const picked: string[] = [];
  const compsUsed = () => picked.filter((id) => getPassage(id)?.comparative).length;

  const familyOk = (pid: string, slot: number): boolean => {
    const isComp = !!getPassage(pid)?.comparative;
    const slotsLeft = 4 - slot; // including this slot
    if (wantComparative) {
      if (isComp && compsUsed() >= 1) return false;
      // Reserve room to place the required comparative set.
      if (!isComp && compsUsed() === 0 && slotsLeft === 1) return false;
    } else if (isComp) return false;
    return true;
  };
  const clusterOk = (pid: string): boolean => {
    const c = clusterOf(pid);
    return !c || !picked.some((id) => clusterOf(id) === c);
  };

  for (let slot = 0; slot < 4; slot++) {
    let cands = ordered.filter((p) => !picked.includes(p.id) && familyOk(p.id, slot) && clusterOk(p.id));
    if (cands.length === 0) {
      // Relax the family quota only (LSAC permits 0 comparatives); keep the
      // cluster guard.
      cands = ordered.filter((p) => !picked.includes(p.id) && clusterOk(p.id));
    }
    if (cands.length === 0) {
      // Last resort: relax the cluster guard too — a full section beats an
      // empty one.
      cands = ordered.filter((p) => !picked.includes(p.id));
    }
    if (cands.length === 0) break;

    // Hard preferences, applied only when feasible (restriction is skipped
    // whenever it would empty the candidate set):
    //  (a) ≥3 distinct domains across the section;
    //  (b) not all four sets the same size;
    //  (c) total questions within the realistic 24–30 band.
    const domains = new Set(picked.map(domainOf));
    const sizes = picked.map(sizeOf);
    const total = sizes.reduce((a, b) => a + b, 0);
    const restrict = (fn: (pid: string) => boolean) => {
      const r = cands.filter((p) => fn(p.id));
      if (r.length > 0) cands = r;
    };
    if (slot === 3) {
      if (domains.size < 3) restrict((pid) => !domains.has(domainOf(pid)));
      if (new Set(sizes).size === 1) restrict((pid) => sizeOf(pid) !== sizes[0]);
      restrict((pid) => total + sizeOf(pid) >= 24 && total + sizeOf(pid) <= 30);
    } else if (slot === 2 && domains.size < 2) {
      restrict((pid) => !domains.has(domainOf(pid)));
    }

    // Soft scoring: prefer unused domains and unused sizes; the seeded
    // shuffle order breaks ties deterministically.
    const score = (pid: string) =>
      (domains.has(domainOf(pid)) ? 0 : 2) + (sizes.includes(sizeOf(pid)) ? 0 : 2);
    let best: string | null = null;
    let bestScore = -1;
    for (const p of cands) {
      const s = score(p.id);
      if (s > bestScore) {
        bestScore = s;
        best = p.id;
      }
    }
    if (best) picked.push(best);
  }

  const ids = picked.slice(0, 4);
  for (const id of ids) excludePassages.add(id);
  const questionIds = ids.flatMap((id) => getPassage(id)?.questionIds ?? []);
  // Recompute provisional from the final set (defensive: the relaxed paths
  // could in principle introduce a lower-tier passage).
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
  // One seed per run governs ALL content selection (RC family + picks,
  // variable-section position/kind). Run identity stays random; content is
  // reproducible from the seed for audit.
  const seed = (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0;
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
      const rc = buildRCQuestionIds(excludeP, seed);
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

  // Full simulation: variable section is LR or RC, hidden at a position
  // 1–4 derived from the run seed. The three scored slots are LR, LR, RC
  // in position order.
  const variablePosition = 1 + (seed % 4);
  const variableKind: 'LR' | 'RC' = (seed & 8) !== 0 ? 'LR' : 'RC';
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
      const rc = buildRCQuestionIds(excludeP, seed + pos * 7919);
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
