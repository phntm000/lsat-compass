import { describe, it, expect } from 'vitest';
import { buildTodayPlan } from './recommend';
import { interleaveOrder, composeSession } from './session';
import { xpFor, levelFor, updateStreak, checkAchievements } from './gamification';
import { diagnosticInsights, readinessProfile } from './diagnostics';
import type { MasteryResult } from './types';

function mr(score: number, state: MasteryResult['state'] = 'developing'): MasteryResult {
  return {
    score, state,
    dimensions: { acquisition: score, retention: null, discrimination: score, transfer: null, timedExecution: null },
    dimensionN: { acquisition: 5, retention: 0, discrimination: 5, transfer: 0, timedExecution: 0 },
    highConfWrongRate: null, maxDifficultySeen: 3,
    dueAt: 0, stabilityDays: 2,
  };
}

const T0 = 1_700_000_000_000;

describe('buildTodayPlan', () => {
  const lessons = [
    { id: '1.1', stage: 1, title: 'Arguments', estimatedMinutes: 12, skills: ['f-argument'], prerequisites: [] },
    { id: '1.2', stage: 1, title: 'Premises', estimatedMinutes: 12, skills: ['f-premise-conclusion'], prerequisites: ['f-argument'] },
  ];
  it('recommends the next lesson when nothing is due', () => {
    const plan = buildTodayPlan({
      now: T0, minutes: 25, lessons, lessonProgress: {},
      reviews: [], masteryBySkill: {}, remediationNeeded: [],
      confusionPairs: [], testDateMs: null,
      recentTimedAccuracy: null, untimedAccuracy: null,
    });
    expect(plan.blocks.some(b => b.kind === 'lesson' && b.refIds[0] === '1.1')).toBe(true);
    expect(plan.primaryCta).toContain('Start');
  });
  it('blocks lesson 1.2 until its prerequisite is developing', () => {
    const plan = buildTodayPlan({
      now: T0, minutes: 25, lessons, lessonProgress: { '1.1': 'done' },
      reviews: [],
      masteryBySkill: {
        'f-argument': { mastery: mr(40, 'learning'), evidence: null as any, meta: { id: 'f-argument', importance: 3, prerequisites: [] } },
      },
      remediationNeeded: [], confusionPairs: [], testDateMs: null,
      recentTimedAccuracy: null, untimedAccuracy: null,
    });
    expect(plan.blocks.some(b => b.kind === 'lesson')).toBe(false);
  });
  it('puts due reviews first', () => {
    const plan = buildTodayPlan({
      now: T0, minutes: 25, lessons, lessonProgress: {},
      reviews: [{
        skillId: 'lr-flaw', mastery: mr(50), evidence: null as any,
        meta: { id: 'lr-flaw', importance: 3, prerequisites: [] },
        daysOverdue: 5, priority: 9, reason: 'Overdue',
      }],
      masteryBySkill: {}, remediationNeeded: [], confusionPairs: [],
      testDateMs: null, recentTimedAccuracy: null, untimedAccuracy: null,
    });
    expect(plan.blocks[0].kind).toBe('review');
  });
  it('adds timed work when the test is near', () => {
    const plan = buildTodayPlan({
      now: T0, minutes: 30, lessons: [], lessonProgress: {},
      reviews: [], masteryBySkill: {}, remediationNeeded: [],
      confusionPairs: [], testDateMs: T0 + 10 * 86_400_000,
      recentTimedAccuracy: null, untimedAccuracy: 0.6, untimedAttempts: 20,
    });
    expect(plan.blocks.some(b => b.kind === 'timed')).toBe(true);
  });
  it('gates timed work on minimum untimed evidence (2026-09-12)', () => {
    const base = {
      now: T0, minutes: 30, lessons: [], lessonProgress: {},
      reviews: [], masteryBySkill: {}, remediationNeeded: [],
      confusionPairs: [], recentTimedAccuracy: null,
    };
    // Near test date but only 3 untimed attempts: no timed block.
    expect(buildTodayPlan({
      ...base, testDateMs: T0 + 10 * 86_400_000,
      untimedAccuracy: 0.6, untimedAttempts: 3,
    }).blocks.some(b => b.kind === 'timed')).toBe(false);
    // Perfect accuracy on a 2-for-2 streak: still no timed block.
    expect(buildTodayPlan({
      ...base, testDateMs: null,
      untimedAccuracy: 1.0, untimedAttempts: 2,
    }).blocks.some(b => b.kind === 'timed')).toBe(false);
    // Solid accuracy on a real sample: timed block appears.
    expect(buildTodayPlan({
      ...base, testDateMs: null,
      untimedAccuracy: 0.8, untimedAttempts: 15,
    }).blocks.some(b => b.kind === 'timed')).toBe(true);
  });
});

describe('interleaveOrder', () => {
  it('is deterministic for the same seed', () => {
    const a = interleaveOrder([1, 2, 3, 4, 5], 42);
    const b = interleaveOrder([1, 2, 3, 4, 5], 42);
    expect(a).toEqual(b);
  });
  it('differs across seeds (usually)', () => {
    const a = interleaveOrder([1, 2, 3, 4, 5, 6, 7, 8], 1);
    const b = interleaveOrder([1, 2, 3, 4, 5, 6, 7, 8], 999);
    expect(a).not.toEqual(b);
  });
});

describe('composeSession', () => {
  const provider = {
    pick: (skillId: string, n: number) =>
      Array.from({ length: n }, (_, i) => ({
        id: `${skillId}-q${i}`, skillIds: [skillId], difficulty: 2, estMin: 1.5,
      })),
    pickPassageSet: () => [],
    pickDrills: (skillIds: string[], n: number) =>
      Array.from({ length: n }, (_, i) => ({
        id: `drill-${i}`, skillIds, estMin: 1,
      })),
    pickContrast: (_p: string | null, n: number) =>
      Array.from({ length: n }, (_, i) => ({
        id: `contrast-${i}`, skillIds: ['lr-nec-vs-suff'], estMin: 1,
      })),
  };
  it('full-section targets ~25 questions and is timed', () => {
    const plan = composeSession({
      now: T0, mode: 'full-section', minutes: 35,
      masteryBySkill: { 'lr-flaw': mr(70), 'lr-weaken': mr(70) },
      seenQuestionIds: new Set(), provider, recentErrors: [],
    });
    expect(plan.items.length).toBe(25);
    expect(plan.timed).toBe(true);
    expect(plan.feedbackMode).toBe('deferred');
  });
  it('drill mode uses drills then questions', () => {
    const plan = composeSession({
      now: T0, mode: 'drill', minutes: 15, targetSkillIds: ['lr-flaw'],
      masteryBySkill: { 'lr-flaw': mr(55) },
      seenQuestionIds: new Set(), provider, recentErrors: [],
    });
    expect(plan.items[0].kind).toBe('drill');
    expect(plan.items.some(i => i.kind === 'question')).toBe(true);
  });
});

describe('gamification', () => {
  it('xpFor rewards meaningful study', () => {
    expect(xpFor('sim_complete')).toBe(200);
    expect(xpFor('question_correct_first', 3)).toBe(9);
    expect(xpFor('question_attempt')).toBe(1);
  });
  it('levelFor thresholds', () => {
    expect(levelFor(0).name).toBe('Novice Analyst');
    expect(levelFor(800).name).toBe('Assumption Hunter');
    expect(levelFor(99999).nextXp).toBe(null);
  });
  it('streak has grace for one missed day with weekly consistency', () => {
    const days = ['2026-09-05', '2026-09-06', '2026-09-07', '2026-09-08', '2026-09-10'];
    const { streak } = updateStreak(days, '2026-09-10');
    expect(streak).toBeGreaterThanOrEqual(5);
  });
  it('checkAchievements grants contrapositive', () => {
    const earned = new Set<string>();
    const stats: any = {
      conditionalAttempts: 20, conditionalCorrect: 17,
      assumptionStates: {}, calibrationN: 0, calibrationError: null,
      recoveredLapsed: false, reviewsCompleted: 0, sectionsCompleted: 0,
      simsCompleted: 0, mistakesReviewed: 0, contrastAttempts: 0,
      contrastCorrect: 0, studyDaysLast7: 0, longSessions: 0,
      flawState: null, rcPassagesAt70: 0, secondPassCompleted: false,
      notesSaved: 0, officialLogged: false, bestMixed10: null,
    };
    const got = checkAchievements(stats, earned);
    expect(got.some(a => a.id === 'contrapositive')).toBe(true);
  });
});

describe('diagnostics', () => {
  it('fires na-vs-strengthen rule', () => {
    const insights = diagnosticInsights({
      masteryBySkill: {
        'lr-necessary-assumption': mr(55),
        'lr-strengthen': mr(80),
      },
      timedAccuracyByDomain: { LR: null, RC: null },
      untimedAccuracyByDomain: { LR: null, RC: null },
      avgResponseRatio: null, changedRightToWrong: 0,
      totalAttempts: 50, recentTrend: null, officialLogs: 0,
    });
    expect(insights.some(i => i.id === 'na-vs-strengthen')).toBe(true);
  });
  it('fires rc-timed-gap rule', () => {
    const insights = diagnosticInsights({
      masteryBySkill: {},
      timedAccuracyByDomain: { LR: null, RC: 0.6 },
      untimedAccuracyByDomain: { LR: null, RC: 0.85 },
      avgResponseRatio: null, changedRightToWrong: 0,
      totalAttempts: 50, recentTrend: null, officialLogs: 0,
    });
    expect(insights.some(i => i.id === 'rc-timed-gap')).toBe(true);
  });
  it('readinessProfile computes an internal metric', () => {
    const r = readinessProfile({
      masteryBySkill: { 'f-argument': mr(80, 'stable'), 'lr-flaw': mr(70, 'developing') },
      timedSectionCount: 2, timedAccuracy: 0.72, officialLogs: 1,
      studyDaysLast14: 8, highConfWrongRate: 0.1,
    });
    expect(r.overall).toBeGreaterThan(0);
    expect(r.overall).toBeLessThanOrEqual(100);
    expect(r.gates.length).toBe(5);
  });
});
