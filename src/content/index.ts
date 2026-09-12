/**
 * LSAT Compass — content hub.
 *
 * The single entry point for all authored content: the skill graph, the
 * glossary, every lesson, question, passage, and drill. It re-exports the
 * combined collections in curriculum order, exposes Map-backed lookup helpers,
 * declares the canonical record interfaces (authoritative shapes per
 * content-schema.md §§2–6), and provides validateReferences() for build-time
 * referential-integrity checks.
 *
 * Contract: content-schema.md §§0–9.
 */

import { SKILLS, type Skill } from './skills.js';
import { GLOSSARY } from './glossary.js';
import type { GlossaryTerm } from './glossary.js';
import { LESSONS_0 } from './lessons/stage0.js';
import { LESSONS_1 } from './lessons/stage1.js';
import { LESSONS_2 } from './lessons/stage2.js';
import { LESSONS_3 } from './lessons/stage3.js';
import { LESSONS_4 } from './lessons/stage4.js';
import { LESSONS_5 } from './lessons/stage5.js';
import { LESSONS_6 } from './lessons/stage6.js';
import { LESSONS_7 } from './lessons/stage7.js';
import { LESSONS_8 } from './lessons/stage8.js';
import { LESSONS_9 } from './lessons/stage9.js';
import { WRITING_LESSONS } from './lessons/writing.js';
import { QUESTIONS_LR_A } from './questions/lr-a.js';
import { QUESTIONS_LR_B } from './questions/lr-b.js';
import { QUESTIONS_LR_C } from './questions/lr-c.js';
import { QUESTIONS_LR_D } from './questions/lr-d.js';
import { QUESTIONS_LR_E } from './questions/lr-e.js';
import { QUESTIONS_LR_F } from './questions/lr-f.js';
import { QUESTIONS_LR_G } from './questions/lr-g.js';
import { QUESTIONS_LR_H } from './questions/lr-h.js';
import { RC_QUESTIONS_A } from './questions/rc-a.js';
import { RC_QUESTIONS_B } from './questions/rc-b.js';
import { PASSAGES_A } from './passages/passages-a.js';
import { PASSAGES_B } from './passages/passages-b.js';
import { DRILLS_F } from './drills/foundations.js';
import { DRILLS_C } from './drills/contrast.js';

// ---------------------------------------------------------------------------
// Canonical record interfaces (content-schema.md §§2–6)
// ---------------------------------------------------------------------------

/** A single answer choice. Schema §3. */
export interface Choice {
  text: string;
}

/** Question type id: an lr- or rc- skill id, plus 'foundations-mixed'. Schema §2. */
export type QuestionType = string;

/** Item purpose — separates instructional items from assessment items (Part IV).
 *  An instructional item may intentionally expose one reasoning relationship;
 *  a transfer/timed/simulation item may not. Difficulty must be interpreted
 *  in the context of purpose: a difficulty-5 micro-drill is not the same
 *  construct as a difficulty-5 assessment question. */
export type ItemPurpose =
  | 'worked-example'
  | 'micro-drill'
  | 'guided-practice'
  | 'skill-acquisition'
  | 'independent-blocked'
  | 'mixed-discrimination'
  | 'transfer'
  | 'timed-assessment'
  | 'section-simulation';

/** Multidimensional editorial difficulty profile (Part V).
 *  Only the dimensions relevant to the item need be rated. */
export interface DifficultyProfile {
  structuralComplexity?: 1 | 2 | 3 | 4 | 5;
  linguisticComplexity?: 1 | 2 | 3 | 4 | 5;
  abstraction?: 1 | 2 | 3 | 4 | 5;
  inferentialDistance?: 1 | 2 | 3 | 4 | 5;
  distractorProximity?: 1 | 2 | 3 | 4 | 5;
  scopeSubtlety?: 1 | 2 | 3 | 4 | 5;
  viewpointComplexity?: 1 | 2 | 3 | 4 | 5;
  conditionalComplexity?: 1 | 2 | 3 | 4 | 5;
  causalComplexity?: 1 | 2 | 3 | 4 | 5;
}

/** Content validation lifecycle (Part LI). Only 'validated' items may appear
 *  in timed section simulations; guided lessons may use 'author-reviewed'
 *  instructional items. */
export type ValidationStatus =
  | 'draft'
  | 'author-reviewed'
  | 'adversarial-reviewed'
  | 'validated'
  | 'needs-revision'
  | 'retired';

/** One entry in an item's editorial review history (dev-only, Part VII). */
export interface ReviewEntry {
  date: string;
  reviewer: string;
  verdict: 'keep' | 'revise' | 'replace' | 'retire' | 'validate' | 'demote';
  notes?: string;
}

/** RC evidence map (Part XVII): internal QA record proving the credited
 *  answer has textual support. Not shown verbatim to learners. */
export interface EvidenceMap {
  supportingParagraphs?: number[];
  supportingSentences?: string[];
  requiredInference?: string;
  viewpointOwner?: string;
  whyDistractorsFail?: string;
}

/** A scored question (LR or RC). Schema §3. */
export interface Question {
  /** e.g. "lr-na-001", "rc-p03-q2" */
  id: string;
  version: number;
  sectionType: 'LR' | 'RC';
  /** skill id, e.g. "lr-necessary-assumption" */
  questionType: QuestionType;
  /** other skill ids exercised */
  secondarySkills: string[];
  /**
   * Editorial difficulty 1–5 (foundational … very difficult).
   * AUTHOR-ASSIGNED, not empirically calibrated. Never represent this as an
   * official LSAT difficulty, percentile, or score prediction (Part XXIII).
   * Interpret in the context of `itemPurpose`.
   */
  editorialDifficulty: 1 | 2 | 3 | 4 | 5;
  /** Instructional vs assessment role (Part IV). Required. */
  itemPurpose: ItemPurpose;
  /** Validation lifecycle (Part LI). Required. */
  validationStatus: ValidationStatus;
  /** Multidimensional difficulty ratings (Part V). Required for 'validated'
   *  assessment items; recommended elsewhere. */
  difficultyProfile?: DifficultyProfile;
  /** the argument / stimulus text */
  stimulus: string;
  /** required when sectionType === 'RC' */
  passageId?: string;
  /** the question stem */
  stem: string;
  /** exactly 5 choices */
  choices: [Choice, Choice, Choice, Choice, Choice];
  correctIndex: 0 | 1 | 2 | 3 | 4;
  /** 2–4 sentences: why the correct choice wins */
  explanationQuick: string;
  /** detailed reasoning, 120–300 words */
  explanationWalkthrough: string;
  /** one substantive pedagogical explanation per choice, ≥25 words each */
  choiceExplanations: [string, string, string, string, string];
  /** transferable principle, 1–3 sentences */
  generalLesson: string;
  /** e.g. "reversal", "necessary-vs-sufficient", "scope-shift" */
  misconceptionTags: string[];
  /** trap taxonomy tags, schema §3 (exact tags) */
  trapTypes: string[];
  /** skill ids */
  prerequisites: string[];
  /** realistic: 45–110 for LR, 60–120 for RC */
  estimatedSeconds: number;
  sourceType: 'original';
  /** exactly 3 staged Socratic hints */
  hints: [string, string, string];
  /** surface topic, e.g. "urban beekeeping" */
  labels?: { topic: string };
  /** RC only: internal evidence map for editorial QA (Part XVII) */
  evidenceMap?: EvidenceMap;
  /** editorial history (Part VII/LI); learner-invisible */
  reviewHistory?: ReviewEntry[];
  /** ISO date the item was authored */
  createdAt?: string;
  /** ISO date the item was last materially revised */
  revisedAt?: string;
}

/** A content block inside a lesson. Schema §4. */
export type LessonBlock =
  | { kind: 'prose'; md: string }
  | { kind: 'keyterm'; term: string; definition: string }
  | { kind: 'example'; title: string; body: string; note?: string }
  | {
      kind: 'worked';
      title: string;
      steps: { label: string; body: string }[];
    }
  | { kind: 'misconception'; wrong: string; right: string }
  | {
      kind: 'checkpoint';
      prompt: string;
      choices: string[];
      correctIndex: number;
      explanation: string;
    }
  | { kind: 'tryit'; drillIds: string[] }
  | { kind: 'retrieval'; prompt: string; answer: string }
  | { kind: 'summary'; points: string[] }
  | { kind: 'next'; text: string };

/** A lesson. Schema §4. */
export interface Lesson {
  /** "1.7", "2.13", "w.3" */
  id: string;
  stage: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  title: string;
  /** 5–20 */
  estimatedMinutes: number;
  /** skills taught */
  skills: string[];
  /** skill ids (must be satisfiable earlier in curriculum order) */
  prerequisites: string[];
  /** 6–14 blocks */
  blocks: LessonBlock[];
  version: number;
}

/** A reading-comprehension passage. Schema §5. */
export interface Passage {
  /** "rc-p01".. , comparative "rc-c01".. */
  id: string;
  title: string;
  domain: 'law' | 'humanities' | 'social-science' | 'natural-science';
  comparative: boolean;
  /** For single: one entry. For comparative: two entries with labels. */
  parts: { label?: string; paragraphs: string[] }[];
  /** 5–8 per single, 5–7 per comparative pair */
  questionIds: string[];
  estimatedMinutes: number;
  /** Topic cluster for duplication guard: two passages sharing a cluster
   *  (e.g. 'plea-bargaining') must never appear in the same RC section. */
  topicCluster?: string;
}

/** A micro-drill or contrast exercise. Schema §6. */
export interface Drill {
  /** "d-f001".. foundations, "d-c001".. contrast */
  id: string;
  kind: 'translate' | 'identify' | 'classify' | 'contrast' | 'complete' | 'order';
  skillIds: string[];
  difficulty: 1 | 2 | 3;
  prompt: string;
  /** 2–4 choices */
  choices: string[];
  correctIndex: number;
  /** ≥ 40 words, explains WHY */
  explanation: string;
  /** for contrast drills: the distinction being taught */
  contrastNote?: string;
}

/** A glossary entry (canonical shape lives in glossary.ts). */
export type { GlossaryTerm } from './glossary.js';

export type { Skill };

// ---------------------------------------------------------------------------
// Combined collections (curriculum order)
// ---------------------------------------------------------------------------

/** All lessons in curriculum order: stages 0–9, then writing (stage 10). */
export const LESSONS: Lesson[] = [
  ...LESSONS_0,
  ...LESSONS_1,
  ...LESSONS_2,
  ...LESSONS_3,
  ...LESSONS_4,
  ...LESSONS_5,
  ...LESSONS_6,
  ...LESSONS_7,
  ...LESSONS_8,
  ...LESSONS_9,
  ...WRITING_LESSONS,
];

/** All questions: every LR file, then both RC files. */
export const QUESTIONS: Question[] = [
  ...QUESTIONS_LR_A,
  ...QUESTIONS_LR_B,
  ...QUESTIONS_LR_C,
  ...QUESTIONS_LR_D,
  ...QUESTIONS_LR_E,
  ...QUESTIONS_LR_F,
  ...QUESTIONS_LR_G,
  ...QUESTIONS_LR_H,
  ...RC_QUESTIONS_A,
  ...RC_QUESTIONS_B,
];

/** All passages. */
export const PASSAGES: Passage[] = [...PASSAGES_A, ...PASSAGES_B];

/** All drills: foundations, then contrast exercises. */
export const DRILLS: Drill[] = [...DRILLS_F, ...DRILLS_C];

/** Contrast exercises (d-c001…): teach confusable-pair distinctions. */
export const CONTRAST_DRILLS: Drill[] = [...DRILLS_C];

/** Foundation micro-drills (d-f001…). */
export const FOUNDATION_DRILLS: Drill[] = [...DRILLS_F];

export { SKILLS, GLOSSARY };

/** Alias for the full skill catalog. */
export const allSkills: Skill[] = SKILLS;

// ---------------------------------------------------------------------------
// Lookup helpers (Map-backed)
// ---------------------------------------------------------------------------

const questionById = new Map<string, Question>(QUESTIONS.map((q) => [q.id, q]));
const lessonById = new Map<string, Lesson>(LESSONS.map((l) => [l.id, l]));
const passageById = new Map<string, Passage>(PASSAGES.map((p) => [p.id, p]));
const drillById = new Map<string, Drill>(DRILLS.map((d) => [d.id, d]));
const glossaryByTerm = new Map<string, GlossaryTerm>(
  GLOSSARY.map((g) => [g.term.toLowerCase(), g]),
);

/** Returns the question with the given id, or undefined. */
export function getQuestion(id: string): Question | undefined {
  return questionById.get(id);
}

/** Returns the lesson with the given id, or undefined. */
export function getLesson(id: string): Lesson | undefined {
  return lessonById.get(id);
}

/** Returns the passage with the given id, or undefined. */
export function getPassage(id: string): Passage | undefined {
  return passageById.get(id);
}

/** Returns the drill with the given id, or undefined. */
export function getDrill(id: string): Drill | undefined {
  return drillById.get(id);
}

/**
 * Returns the glossary term matching `term` (case-insensitive), or undefined.
 */
export function getGlossaryTerm(term: string): GlossaryTerm | undefined {
  return glossaryByTerm.get(term.toLowerCase());
}

// ---------------------------------------------------------------------------
// Curriculum stages
// ---------------------------------------------------------------------------

export interface CurriculumStage {
  stage: number;
  title: string;
  lessons: Lesson[];
}

const STAGE_TITLES: Record<number, string> = {
  0: 'LSAT Orientation',
  1: 'Reasoning Foundations',
  2: 'Logical Reasoning: Core Types',
  3: 'LR Integration',
  4: 'Reading Comprehension Foundations',
  5: 'RC Application',
  6: 'Timing and Execution',
  7: 'Full Section Practice',
  8: 'Official Practice Integration',
  9: 'Test Readiness',
  10: 'Argumentative Writing',
};

/** Lessons grouped by stage, in curriculum order. */
export const curriculumStages: CurriculumStage[] = Object.entries(STAGE_TITLES)
  .map(([stage, title]) => ({
    stage: Number(stage),
    title,
    lessons: LESSONS.filter((l) => l.stage === Number(stage)),
  }))
  .sort((a, b) => a.stage - b.stage);

// ---------------------------------------------------------------------------
// Reference validation
// ---------------------------------------------------------------------------

function findDuplicateIds(
  collectionName: string,
  ids: string[],
  errors: string[],
): void {
  const seen = new Set<string>();
  const reported = new Set<string>();
  for (const id of ids) {
    if (seen.has(id) && !reported.has(id)) {
      errors.push(`duplicate id "${id}" in ${collectionName}`);
      reported.add(id);
    }
    seen.add(id);
  }
}

/**
 * Checks referential integrity across all content collections and returns a
 * list of human-readable errors. Returns [] when clean.
 *
 * Checks:
 * - duplicate ids within each collection (lessons, questions, passages,
 *   drills, skills; duplicate glossary terms, case-insensitive)
 * - RC questions whose passageId has no matching passage
 * - passages whose questionIds have no matching question
 * - drills referenced by lesson 'tryit' blocks that do not exist
 * - questions and lessons referencing skill ids not in SKILLS
 * - glossary lessonIds that do not match a real lesson
 */
export function validateReferences(): string[] {
  const errors: string[] = [];

  findDuplicateIds(
    'LESSONS',
    LESSONS.map((l) => l.id),
    errors,
  );
  findDuplicateIds(
    'QUESTIONS',
    QUESTIONS.map((q) => q.id),
    errors,
  );
  findDuplicateIds(
    'PASSAGES',
    PASSAGES.map((p) => p.id),
    errors,
  );
  findDuplicateIds(
    'DRILLS',
    DRILLS.map((d) => d.id),
    errors,
  );
  findDuplicateIds(
    'SKILLS',
    SKILLS.map((s) => s.id),
    errors,
  );
  findDuplicateIds(
    'GLOSSARY',
    GLOSSARY.map((g) => g.term.toLowerCase()),
    errors,
  );

  const skillIds = new Set(SKILLS.map((s) => s.id));
  const unknownSkills = (refIds: string[], where: string): void => {
    for (const ref of refIds) {
      if (!skillIds.has(ref)) {
        errors.push(`${where} references unknown skill id "${ref}"`);
      }
    }
  };

  // Questions: skill references + RC passage links.
  for (const q of QUESTIONS) {
    unknownSkills([q.questionType], `question "${q.id}".questionType`);
    unknownSkills(q.secondarySkills, `question "${q.id}".secondarySkills`);
    unknownSkills(q.prerequisites, `question "${q.id}".prerequisites`);
    if (q.sectionType === 'RC') {
      if (!q.passageId) {
        errors.push(`RC question "${q.id}" is missing passageId`);
      } else if (!passageById.has(q.passageId)) {
        errors.push(
          `question "${q.id}" references unknown passageId "${q.passageId}"`,
        );
      }
    }
  }

  // Passages: question links.
  for (const p of PASSAGES) {
    for (const qid of p.questionIds) {
      if (!questionById.has(qid)) {
        errors.push(
          `passage "${p.id}" references unknown question id "${qid}"`,
        );
      }
    }
  }

  // Lessons: skill references + tryit drill links.
  for (const lesson of LESSONS) {
    unknownSkills(lesson.skills, `lesson "${lesson.id}".skills`);
    unknownSkills(lesson.prerequisites, `lesson "${lesson.id}".prerequisites`);
    for (const block of lesson.blocks) {
      if (block.kind === 'tryit') {
        for (const drillId of block.drillIds) {
          if (!drillById.has(drillId)) {
            errors.push(
              `lesson "${lesson.id}" tryit block references unknown drill id "${drillId}"`,
            );
          }
        }
      }
    }
  }

  // Glossary: lesson links.
  for (const g of GLOSSARY) {
    for (const lessonId of g.lessonIds ?? []) {
      if (!lessonById.has(lessonId)) {
        errors.push(
          `glossary term "${g.term}" references unknown lesson id "${lessonId}"`,
        );
      }
    }
  }

  return errors;
}
