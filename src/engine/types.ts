/**
 * Core domain types for LSAT Compass engines.
 * Pure data — no React, no Dexie. Engines are deterministic pure functions.
 */

export type MasteryState =
  | 'new' | 'learning' | 'developing' | 'stable' | 'mastered' | 'lapsed';

export type AttemptMode =
  | 'learning'   // immediate feedback, hints available
  | 'drill'      // blocked practice on one skill
  | 'review'     // spaced-review queue
  | 'mixed'      // interleaved, unlabeled
  | 'timed'      // timed practice / section
  | 'test';      // exam simulation (no feedback until end)

/** Item purpose tags (mirrors content ItemPurpose; engine keeps its own copy
 *  to avoid importing the content bundle into pure engine code). */
export type ItemPurposeTag =
  | 'worked-example' | 'micro-drill' | 'guided-practice' | 'skill-acquisition'
  | 'independent-blocked' | 'mixed-discrimination' | 'transfer'
  | 'timed-assessment' | 'section-simulation';

export interface AttemptInput {
  questionId: string;
  questionVersion: number;
  timestamp: number; // epoch ms
  correct: boolean;
  responseTimeMs: number;
  estimatedSeconds: number;
  /** 1 = guessing, 2 = 40%, 3 = 60%, 4 = 80%, 5 = certain */
  confidence: 1 | 2 | 3 | 4 | 5;
  hintsUsed: number;
  changedAnswer: boolean;
  changedDirection?: 'wrong-to-right' | 'right-to-wrong';
  firstAttemptOnQuestion: boolean;
  mode: AttemptMode;
  /** learner saw the answer/explanation before submitting — earns zero mastery */
  revealedSolution: boolean;
  skillIds: string[];
  /** editorial difficulty of the attempted item (author-assigned, 1–5) */
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** item purpose of the attempted item, when known (Part IV) */
  purpose?: ItemPurposeTag | null;
}

/** One stored evidence record per (attempt × skill). Kept small; last 40/skill. */
export interface EvidenceRecord {
  t: number;
  /** quality in [0,1]; 1 = fully earned correct, 0 = wrong/guessed/revealed */
  q: number;
  /** severity of a miss in [0, ~2]; 0 when correct */
  sev: number;
  diff: 1 | 2 | 3 | 4 | 5;
  mode: AttemptMode;
  conf: 1 | 2 | 3 | 4 | 5;
  /** gap in days since previous attempt on this skill */
  gapDays: number;
  /** first attempt on this question (undefined on legacy records → falsy) */
  first?: boolean;
  /** item purpose of the attempted item, when known (Part IV) */
  purpose?: ItemPurposeTag | null;
}

export interface SkillEvidence {
  skillId: string;
  attempts: number;
  records: EvidenceRecord[]; // newest last, trimmed to 40
  lastPracticed: number; // epoch ms, 0 = never
  lapses: number;
  stabilityDays: number; // FSRS-inspired stability; init 1
  dueAt: number; // epoch ms for next review
  prevState: MasteryState;
}

/** Per-dimension evidence breakdown (Part XXI). Each dimension is a
 *  0–100 quality-weighted score, or null when no evidence exists yet. */
export interface MasteryDimensions {
  acquisition: number | null;
  retention: number | null;
  discrimination: number | null;
  transfer: number | null;
  timedExecution: number | null;
}

export interface MasteryResult {
  score: number; // 0..100
  state: MasteryState;
  /** per-dimension scores (Part XXI); replaces the old flat components */
  dimensions: MasteryDimensions;
  /** evidence counts per dimension */
  dimensionN: Record<keyof MasteryDimensions, number>;
  highConfWrongRate: number | null;
  maxDifficultySeen: number;
  dueAt: number;
  stabilityDays: number;
}

export interface SkillMeta {
  id: string;
  importance: 1 | 2 | 3;
  prerequisites: string[];
}

export const DAY_MS = 86_400_000;

export function emptyEvidence(skillId: string): SkillEvidence {
  return {
    skillId,
    attempts: 0,
    records: [],
    lastPracticed: 0,
    lapses: 0,
    stabilityDays: 1,
    dueAt: 0,
    prevState: 'new',
  };
}
