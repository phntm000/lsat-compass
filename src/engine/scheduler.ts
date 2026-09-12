/**
 * Spaced review scheduler (§15, §44).
 *
 * priority = overdueFactor × weakness × misconceptionSeverity × importance × lapseModifier
 *
 * - overdueFactor grows with days past due relative to stability
 * - weakness from mastery score
 * - misconceptionSeverity from high-confidence error rate
 * - importance from the skill graph (exam frequency)
 * - lapseModifier boosts re-learning of lapsed skills
 *
 * Caps the queue so returning users aren't buried; recovery mode after absence.
 */
import { DAY_MS } from './types';
import type { MasteryResult, SkillEvidence, SkillMeta } from './types';

export interface ReviewCandidate {
  skillId: string;
  mastery: MasteryResult;
  evidence: SkillEvidence;
  meta: SkillMeta;
  daysOverdue: number;
  priority: number;
  reason: string; // human-readable, shown in UI
}

export interface ReviewPlan {
  items: ReviewCandidate[];
  capped: boolean;
  totalDue: number;
  recoveryMode: boolean;
}

export function daysOverdue(ev: SkillEvidence, now: number): number {
  if (ev.lastPracticed === 0) return 0;
  return Math.max(0, (now - ev.dueAt) / DAY_MS);
}

export function priorityOf(
  ev: SkillEvidence, m: MasteryResult, meta: SkillMeta, now: number,
): { priority: number; daysOverdue: number } {
  const od = daysOverdue(ev, now);
  const stability = Math.max(1, ev.stabilityDays);
  const overdueFactor = 1 + od / stability;
  const weakness = 0.3 + 0.7 * (1 - m.score / 100);
  const misconceptionSeverity =
    1 + (m.highConfWrongRate ?? 0) * 2;
  const importance = meta.importance / 2; // 0.5 .. 1.5
  const lapseModifier = m.state === 'lapsed' ? 1.6
    : m.state === 'new' ? 1.2 : 1;
  const priority = overdueFactor * weakness * misconceptionSeverity *
    importance * lapseModifier;
  return { priority: Math.round(priority * 100) / 100, daysOverdue: Math.round(od * 10) / 10 };
}

function reasonFor(c: Omit<ReviewCandidate, 'reason'>): string {
  const m = c.mastery;
  if (m.state === 'lapsed') return 'Previously strong — needs re-learning';
  if ((m.highConfWrongRate ?? 0) >= 0.3) return 'Confident mistakes here signal a misconception';
  if (c.daysOverdue >= 7) return `Overdue by ${Math.round(c.daysOverdue)} days`;
  if (m.score < 60) return 'Weak area — targeted repair';
  if (m.state === 'new' || m.state === 'learning') return 'New skill — early repetition locks it in';
  return 'Scheduled retention check';
}

/**
 * Build the ranked review queue.
 * @param minutes available for review → cap items (~3 min each, max 25).
 * @param absentDays days since last study session; ≥4 triggers recovery mode.
 */
export function buildReviewQueue(
  inputs: { evidence: SkillEvidence; mastery: MasteryResult; meta: SkillMeta }[],
  now: number,
  minutes: number,
  absentDays: number,
): ReviewPlan {
  const recoveryMode = absentDays >= 4;
  const cands: ReviewCandidate[] = [];
  for (const { evidence, mastery, meta } of inputs) {
    if (evidence.lastPracticed === 0) continue; // never seen → not review
    if (mastery.state === 'mastered' && daysOverdue(evidence, now) <= 0) continue;
    const { priority, daysOverdue: od } = priorityOf(evidence, mastery, meta, now);
    // Include if due, overdue, weak, lapsed, or misconception-prone.
    if (od > 0 || mastery.score < 75 || mastery.state === 'lapsed' ||
        (mastery.highConfWrongRate ?? 0) >= 0.25) {
      const base = { skillId: evidence.skillId, mastery, evidence, meta,
                     daysOverdue: od, priority };
      cands.push({ ...base, reason: reasonFor(base) });
    }
  }
  cands.sort((a, b) => b.priority - a.priority || a.daysOverdue - b.daysOverdue);

  const totalDue = cands.length;
  const cap = recoveryMode ? 12 : Math.min(25, Math.max(3, Math.floor(minutes / 3)));
  const capped = totalDue > cap;
  return { items: cands.slice(0, cap), capped, totalDue, recoveryMode };
}

/**
 * Delayed recheck after remediation (Part XXXVI).
 *
 * A repair session is only trustworthy if the fix survives delay. After a
 * weakness-repair session completes, pull each repaired skill's `dueAt`
 * forward to at most RECHECK_DAYS from now so the review queue re-surfaces
 * the skill while the repair is fresh — even if the FSRS stability update
 * would otherwise schedule it weeks out.
 */
export const REMEDIATION_RECHECK_DAYS = 2;

export function remediationRecheckDueAt(
  currentDueAt: number,
  now: number,
  days: number = REMEDIATION_RECHECK_DAYS,
): number {
  return Math.min(currentDueAt, now + days * DAY_MS);
}
