import { describe, it, expect } from 'vitest';
import { scoreAttempt, recordAttempt, computeMastery } from './mastery';
import type { AttemptInput } from './types';

const T0 = 1_700_000_000_000;
let seq = 0;

function attempt(over: Partial<AttemptInput> = {}): AttemptInput {
  return {
    questionId: `q-${seq++}`,
    questionVersion: 1,
    timestamp: T0,
    correct: true,
    responseTimeMs: 60_000,
    estimatedSeconds: 80,
    confidence: 5,
    hintsUsed: 0,
    changedAnswer: false,
    firstAttemptOnQuestion: true,
    mode: 'learning',
    revealedSolution: false,
    skillIds: ['lr-flaw'],
    difficulty: 3,
    ...over,
  };
}

describe('scoreAttempt', () => {
  it('confident clean correct earns full quality', () => {
    expect(scoreAttempt(attempt()).q).toBe(1);
  });
  it('guessed correct earns reduced quality', () => {
    expect(scoreAttempt(attempt({ confidence: 1 })).q).toBeCloseTo(0.55, 2);
  });
  it('revealed solution earns zero mastery', () => {
    expect(scoreAttempt(attempt({ revealedSolution: true })).q).toBe(0);
  });
  it('hints reduce quality', () => {
    expect(scoreAttempt(attempt({ hintsUsed: 2 })).q).toBeCloseTo(0.5, 2);
  });
  it('very slow correct is discounted', () => {
    expect(scoreAttempt(attempt({ responseTimeMs: 300_000 })).q).toBeCloseTo(0.7, 2);
  });
  it('repeat exposure halves quality', () => {
    expect(scoreAttempt(attempt({ firstAttemptOnQuestion: false })).q).toBe(0.5);
  });
  it('confident wrong has high severity', () => {
    const r = scoreAttempt(attempt({ correct: false, confidence: 5 }));
    expect(r.q).toBe(0);
    expect(r.sev).toBeCloseTo(1.7, 2);
  });
  it('low-confidence wrong is less severe', () => {
    const r = scoreAttempt(attempt({ correct: false, confidence: 1 }));
    expect(r.sev).toBe(1);
  });
  it('changing right-to-wrong adds severity', () => {
    const r = scoreAttempt(attempt({
      correct: false, confidence: 3, changedAnswer: true,
      changedDirection: 'right-to-wrong',
    }));
    expect(r.sev).toBeCloseTo(1.75, 2);
  });
});

describe('computeMastery', () => {
  it('new state with fewer than 3 attempts', () => {
    let ev = recordAttempt(null, attempt({ skillIds: ['s1'] }));
    const m = computeMastery(ev, T0);
    expect(m.state).toBe('new');
  });
  it('caps easy-only evidence at 70', () => {
    let ev = null as any;
    for (let i = 0; i < 10; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s2'], difficulty: 2, confidence: 5,
        timestamp: T0 + i * 1000,
      }));
    }
    const m = computeMastery(ev, T0 + 20_000);
    expect(m.score).toBeLessThanOrEqual(70);
  });
  it('mastered requires mixed, timed, delayed evidence', () => {
    let ev = null as any;
    const day = 86_400_000;
    // 6 mixed correct at difficulty 4, spaced days apart
    for (let i = 0; i < 6; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s3'], difficulty: 4, mode: 'mixed',
        timestamp: T0 + i * 4 * day,
      }));
    }
    // 3 timed correct
    for (let i = 0; i < 3; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s3'], difficulty: 4, mode: 'timed',
        timestamp: T0 + 30 * day + i * day,
      }));
    }
    const m = computeMastery(ev, T0 + 40 * day);
    expect(m.state).toBe('mastered');
    expect(m.score).toBeGreaterThanOrEqual(88);
  });
  it('stable requires mixed and delayed evidence', () => {
    let ev = null as any;
    const day = 86_400_000;
    for (let i = 0; i < 8; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s4'], difficulty: 3,
        mode: i % 2 ? 'mixed' : 'learning',
        timestamp: T0 + i * 5 * day,
      }));
    }
    const m = computeMastery(ev, T0 + 45 * day);
    expect(['stable', 'mastered']).toContain(m.state);
  });
  it('all-wrong evidence stays in learning', () => {
    let ev = null as any;
    for (let i = 0; i < 6; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s5'], correct: false, confidence: 2,
        timestamp: T0 + i * 1000,
      }));
    }
    const m = computeMastery(ev, T0 + 10_000);
    expect(m.state).toBe('learning');
    expect(m.score).toBeLessThan(60);
  });
  it('high-confidence errors penalize the score', () => {
    let ev = null as any;
    for (let i = 0; i < 5; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s6'], difficulty: 4, timestamp: T0 + i * 1000,
      }));
    }
    for (let i = 0; i < 5; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s6'], correct: false, confidence: 5, difficulty: 4,
        timestamp: T0 + 10_000 + i * 1000,
      }));
    }
    const m = computeMastery(ev, T0 + 30_000);
    expect(m.highConfWrongRate).toBe(0.5);
    expect(m.score).toBeLessThan(60);
  });
});

describe('multidimensional mastery (Parts XXI–XXII)', () => {
  const day = 86_400_000;
  it('blocked practice alone can never earn mastered', () => {
    let ev = null as any;
    // 30 perfect blocked drill attempts at difficulty 4–5, spaced out.
    for (let i = 0; i < 30; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s7'], difficulty: 5, mode: 'drill', confidence: 5,
        purpose: 'independent-blocked',
        timestamp: T0 + i * 4 * day,
      }));
    }
    const m = computeMastery(ev, T0 + 130 * day);
    expect(m.dimensions.acquisition).toBeGreaterThan(90);
    expect(m.dimensions.discrimination).toBeNull();
    expect(m.state).not.toBe('mastered');
  });
  it('guided correct after 3 hints moves acquisition far less than independent correct', () => {
    let guided = null as any;
    for (let i = 0; i < 6; i++) {
      guided = recordAttempt(guided, attempt({
        skillIds: ['s8'], difficulty: 3, mode: 'learning', confidence: 5,
        hintsUsed: 3, purpose: 'guided-practice', timestamp: T0 + i * 1000,
      }));
    }
    let indep = null as any;
    for (let i = 0; i < 6; i++) {
      indep = recordAttempt(indep, attempt({
        skillIds: ['s9'], difficulty: 3, mode: 'drill', confidence: 5,
        hintsUsed: 0, purpose: 'independent-blocked', timestamp: T0 + i * 1000,
      }));
    }
    const mg = computeMastery(guided, T0 + 10_000);
    const mi = computeMastery(indep, T0 + 10_000);
    expect(mg.dimensions.acquisition!).toBeLessThan(mi.dimensions.acquisition!);
    expect(mi.dimensions.acquisition).toBeGreaterThan(90);
  });
  it('transfer-purpose items feed the transfer dimension', () => {
    let ev = null as any;
    for (let i = 0; i < 4; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s10'], difficulty: 4, mode: 'mixed', confidence: 4,
        purpose: 'transfer', timestamp: T0 + i * day,
      }));
    }
    const m = computeMastery(ev, T0 + 10 * day);
    expect(m.dimensions.transfer).not.toBeNull();
    expect(m.dimensionN.transfer).toBe(4);
  });
  it('delayed retrieval feeds retention separately from acquisition', () => {
    let ev = null as any;
    for (let i = 0; i < 5; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s11'], difficulty: 3, mode: 'drill', confidence: 5,
        timestamp: T0 + i * 5 * day,
      }));
    }
    const m = computeMastery(ev, T0 + 30 * day);
    expect(m.dimensions.retention).not.toBeNull();
    expect(m.dimensions.retention).toBeGreaterThan(80);
  });
  it('mixed first-attempts approximate transfer until transfer items exist', () => {
    let ev = null as any;
    for (let i = 0; i < 4; i++) {
      ev = recordAttempt(ev, attempt({
        skillIds: ['s12'], difficulty: 4, mode: 'mixed', confidence: 5,
        purpose: 'mixed-discrimination', timestamp: T0 + i * 1000,
      }));
    }
    const m = computeMastery(ev, T0 + 10_000);
    // firstAttemptOnQuestion defaults true in the helper → counts as transfer
    expect(m.dimensions.transfer).not.toBeNull();
  });
});
