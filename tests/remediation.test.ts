/**
 * Remediation branches (Part XXXVI): the deficit diagnosis must route to
 * the matching repair strategy — never generic "practice more".
 */
import { describe, it, expect } from 'vitest';
import { selectRemediationBranch } from '../src/engine/remediation';
import type { MasteryResult, MasteryDimensions } from '../src/engine/types';

const dims = (over: Partial<MasteryDimensions>): MasteryDimensions => ({
  acquisition: null, retention: null, discrimination: null,
  transfer: null, timedExecution: null, ...over,
});

const m = (over: Partial<MasteryResult>): MasteryResult => ({
  score: 50, state: 'developing', dimensions: dims({}),
  dimensionN: { acquisition: 0, retention: 0, discrimination: 0, transfer: 0, timedExecution: 0 },
  highConfWrongRate: null, maxDifficultySeen: 2,
  dueAt: 0, stabilityDays: 1, ...over,
});

describe('selectRemediationBranch', () => {
  it('misconception outranks everything', () => {
    const r = m({
      highConfWrongRate: 0.4, state: 'lapsed',
      dimensions: dims({ acquisition: 90, discrimination: 90 }),
    });
    expect(selectRemediationBranch(r)).toBe('misconception');
  });

  it('lapsed → reacquisition', () => {
    expect(selectRemediationBranch(m({ state: 'lapsed' }))).toBe('reacquisition');
  });

  it('strong acquisition + weak discrimination → discrimination', () => {
    const r = m({ dimensions: dims({ acquisition: 80, discrimination: 40 }) });
    expect(selectRemediationBranch(r)).toBe('discrimination');
  });

  it('accurate but slow → fluency', () => {
    const r = m({ dimensions: dims({ acquisition: 75, timedExecution: 30 }) });
    expect(selectRemediationBranch(r)).toBe('fluency');
  });

  it('weak acquisition → reacquisition', () => {
    const r = m({ dimensions: dims({ acquisition: 40 }) });
    expect(selectRemediationBranch(r)).toBe('reacquisition');
  });

  it('no dominant deficit → general', () => {
    const r = m({ dimensions: dims({ acquisition: 70, discrimination: 70, timedExecution: 70 }) });
    expect(selectRemediationBranch(r)).toBe('general');
  });
});

describe('fluency branch timing (Part XXXVI)', () => {
  it('fluency remediation forces plan.timed even in weakness-repair mode', async () => {
    const { composeSession } = await import('../src/engine/session');
    const base = {
      mode: 'weakness-repair' as const,
      minutes: 15,
      now: Date.now(),
      targetSkillIds: ['lr-flaw'],
      masteryBySkill: {},
      seenQuestionIds: new Set<string>(),
      provider: { pick: () => [] },
      recentErrors: [],
      allSkillIds: ['lr-flaw'],
    };
    const fluency = composeSession({ ...base, remediationBranch: 'fluency' });
    expect(fluency.timed).toBe(true);
    const general = composeSession({ ...base, remediationBranch: 'general' });
    expect(general.timed).toBe(false);
  });
});

describe('remediation recheck scheduling (Part XXXVI)', () => {
  it('pulls dueAt forward to at most 2 days out', async () => {
    const { remediationRecheckDueAt, REMEDIATION_RECHECK_DAYS } = await import('../src/engine/scheduler');
    const { DAY_MS } = await import('../src/engine/types');
    const now = Date.now();
    expect(REMEDIATION_RECHECK_DAYS).toBe(2);
    // Far-future dueAt is pulled forward.
    expect(remediationRecheckDueAt(now + 30 * DAY_MS, now)).toBe(now + 2 * DAY_MS);
    // Near dueAt is left alone.
    expect(remediationRecheckDueAt(now + DAY_MS, now)).toBe(now + DAY_MS);
  });
});
