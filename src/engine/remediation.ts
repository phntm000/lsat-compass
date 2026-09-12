/**
 * Remediation branches (Part XXXVI).
 *
 * A generic "practice more" session wastes the learner's time when the
 * deficit is specific. The five mastery dimensions diagnose *which* kind of
 * failure is happening, and each maps to a different repair strategy:
 *
 *   misconception   — high-confidence wrong answers: the learner holds a
 *                     wrong rule. Repair = confront the exact misses.
 *   discrimination  — solid guided performance but poor unlabeled mixed
 *                     performance: the learner can't recognize the skill.
 *                     Repair = unlabeled mixed + type-labeling proof.
 *   fluency         — accurate but slow / weak timed execution.
 *                     Repair = timed sets with visible pacing.
 *   reacquisition   — lapsed or weak acquisition: the skill itself decayed.
 *                     Repair = guided re-learn (drills + explained items).
 *   general         — no dominant deficit: standard mixed repair.
 */
import type { MasteryResult } from './types';

export type RemediationBranch =
  | 'misconception'
  | 'discrimination'
  | 'fluency'
  | 'reacquisition'
  | 'general';

export const BRANCH_META: Record<
  RemediationBranch,
  { title: string; learnerLine: string }
> = {
  misconception: {
    title: 'Misconception confrontation',
    learnerLine:
      'You were confident — and wrong. This session re-faces the exact questions that fooled you, so you can replace the wrong rule with the right one.',
  },
  discrimination: {
    title: 'Recognition training',
    learnerLine:
      'You know the skill guided, but miss it unlabeled. These questions hide their type — after each one you must name the question type before seeing the answer.',
  },
  fluency: {
    title: 'Timed fluency',
    learnerLine:
      'Accuracy is there; speed is not. This set runs under time pressure with pacing visible, training execution rather than understanding.',
  },
  reacquisition: {
    title: 'Re-acquisition',
    learnerLine:
      'This skill has decayed. We rebuild from guided drills upward — no timed pressure until the foundation is back.',
  },
  general: {
    title: 'Targeted repair',
    learnerLine:
      'Focused mixed practice on your weakest skills, with proof checks after every miss.',
  },
};

/** Pick the branch from the mastery dimensions. Order matters: a confident
 *  misconception outranks everything because practicing around it
 *  reinforces the wrong rule. */
export function selectRemediationBranch(m: MasteryResult): RemediationBranch {
  const d = m.dimensions;
  if ((m.highConfWrongRate ?? 0) >= 0.25) return 'misconception';
  if (m.state === 'lapsed') return 'reacquisition';
  if (
    d.acquisition != null && d.acquisition >= 65 &&
    (d.discrimination ?? 100) < 55
  ) return 'discrimination';
  if ((d.timedExecution ?? 100) < 50 && (d.acquisition ?? 0) >= 60) return 'fluency';
  if ((d.acquisition ?? 100) < 55) return 'reacquisition';
  return 'general';
}
