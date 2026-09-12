import { describe, it, expect } from 'vitest';
import { buildReviewQueue, priorityOf } from './scheduler';
import { computeMastery, recordAttempt } from './mastery';
import type { SkillEvidence, MasteryResult, SkillMeta } from './types';
import { DAY_MS } from './types';
import type { AttemptInput } from './types';

const T0 = 1_700_000_000_000;
const META: SkillMeta = { id: 'lr-flaw', importance: 3, prerequisites: [] };

function evWith(opts: {
  skillId?: string; correct?: boolean; n?: number; conf?: 1|2|3|4|5;
  daysAgo?: number; stabilityDays?: number; prevState?: any;
}): { evidence: SkillEvidence; mastery: MasteryResult } {
  let ev: SkillEvidence | null = null;
  const n = opts.n ?? 5;
  for (let i = 0; i < n; i++) {
    const a: AttemptInput = {
      questionId: `q-${opts.skillId}-${i}`, questionVersion: 1,
      timestamp: T0 - (opts.daysAgo ?? 0) * DAY_MS + i * 1000,
      correct: opts.correct ?? true, responseTimeMs: 60_000,
      estimatedSeconds: 80, confidence: opts.conf ?? 4, hintsUsed: 0,
      changedAnswer: false, firstAttemptOnQuestion: true,
      mode: 'learning', revealedSolution: false,
      skillIds: [opts.skillId ?? 'lr-flaw'], difficulty: 3,
    };
    ev = recordAttempt(ev, a);
  }
  if (opts.stabilityDays) { ev!.stabilityDays = opts.stabilityDays; ev!.dueAt = ev!.lastPracticed + opts.stabilityDays * DAY_MS; }
  if (opts.prevState) ev!.prevState = opts.prevState;
  const mastery = computeMastery(ev!, T0);
  return { evidence: ev!, mastery };
}

describe('priorityOf', () => {
  it('overdue outranks not-yet-due', () => {
    const a = evWith({ daysAgo: 20, stabilityDays: 2 });
    const b = evWith({ daysAgo: 0, stabilityDays: 30 });
    const pa = priorityOf(a.evidence, a.mastery, META, T0).priority;
    const pb = priorityOf(b.evidence, b.mastery, META, T0).priority;
    expect(pa).toBeGreaterThan(pb);
  });
  it('lapsed skills get a boost', () => {
    const lapsed = evWith({ correct: false, conf: 5, n: 6, prevState: 'stable' });
    const p = priorityOf(lapsed.evidence, lapsed.mastery, META, T0);
    expect(lapsed.mastery.state).toBe('lapsed');
    expect(p.priority).toBeGreaterThan(1.5);
  });
  it('high-confidence errors raise severity', () => {
    const bad = evWith({ correct: false, conf: 5, n: 8 });
    const mild = evWith({ correct: false, conf: 1, n: 8 });
    const pb = priorityOf(bad.evidence, bad.mastery, META, T0).priority;
    const pm = priorityOf(mild.evidence, mild.mastery, META, T0).priority;
    expect(pb).toBeGreaterThan(pm);
  });
});

describe('buildReviewQueue', () => {
  it('respects the cap and reports capped', () => {
    const inputs = Array.from({ length: 30 }, (_, i) =>
      ({ ...evWith({ skillId: `s-${i}`, daysAgo: 10, stabilityDays: 1 }), meta: { ...META, id: `s-${i}` } }));
    const plan = buildReviewQueue(inputs, T0, 30, 0);
    expect(plan.items.length).toBeLessThanOrEqual(10); // 30 min / 3
    expect(plan.capped).toBe(true);
    expect(plan.totalDue).toBe(30);
  });
  it('recovery mode caps at 12 after long absence', () => {
    const inputs = Array.from({ length: 30 }, (_, i) =>
      ({ ...evWith({ skillId: `s-${i}`, daysAgo: 10, stabilityDays: 1 }), meta: { ...META, id: `s-${i}` } }));
    const plan = buildReviewQueue(inputs, T0, 120, 7);
    expect(plan.recoveryMode).toBe(true);
    expect(plan.items.length).toBeLessThanOrEqual(12);
  });
  it('mastered and not-due skills are excluded', () => {
    const fresh = evWith({ daysAgo: 0, stabilityDays: 60 });
    const plan = buildReviewQueue(
      [{ ...fresh, meta: META }], T0, 30, 0);
    // fresh, high-stability, not overdue, high score → excluded
    expect(plan.totalDue).toBe(0);
  });
  it('sorts by descending priority', () => {
    const inputs = Array.from({ length: 5 }, (_, i) =>
      ({ ...evWith({ skillId: `s-${i}`, daysAgo: i * 5, stabilityDays: 2 }), meta: { ...META, id: `s-${i}` } }));
    const plan = buildReviewQueue(inputs, T0, 60, 0);
    for (let i = 1; i < plan.items.length; i++) {
      expect(plan.items[i - 1].priority).toBeGreaterThanOrEqual(plan.items[i].priority);
    }
  });
});
