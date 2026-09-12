/**
 * Official Calibration (Part XXXIII): internal and official lanes are
 * compared but never merged; official evidence is INSUFFICIENT until logged.
 */
import { describe, it, expect } from 'vitest';
import {
  computeCalibration,
  internalTimedAccuracy,
  officialAccuracy,
  officialEvidenceStatus,
} from '../src/engine/calibration';
import type { OfficialPracticeLog, QuestionAttemptRecord } from '../src/engine/db-schema';

const attempt = (over: Partial<QuestionAttemptRecord>): QuestionAttemptRecord => ({
  questionId: 'lr-a-001',
  questionVersion: 1,
  timestamp: Date.now(),
  selectedChoice: 0,
  correct: true,
  responseTimeMs: 60_000,
  confidence: 4,
  mode: 'timed',
  skillIds: ['lr-flaw'],
  reviewedExplanation: false,
  changedAnswer: false,
  changedDirection: null,
  flagged: null,
  errorCategory: null,
  hintsUsed: 0,
  sessionId: 's1',
  ...over,
});

const log = (over: Partial<OfficialPracticeLog>): OfficialPracticeLog => ({
  testName: 'PrepTest 158 (LawHub)',
  date: '2026-08-01',
  rawScore: null,
  scaledScore: 165,
  lr1Correct: 20, lr1Total: 25,
  lr2Correct: 19, lr2Total: 25,
  rcCorrect: 20, rcTotal: 27,
  timingNotes: '', missedQuestions: '', questionTypes: '',
  reasonsMissed: '', confidence: '', lessonsLearned: '',
  ...over,
});

describe('officialEvidenceStatus', () => {
  it('is INSUFFICIENT with no logs', () => {
    expect(officialEvidenceStatus([]).status).toBe('INSUFFICIENT');
  });
  it('is PROVISIONAL below 3 logs, SUFFICIENT at 3+', () => {
    expect(officialEvidenceStatus([log({})]).status).toBe('PROVISIONAL');
    expect(officialEvidenceStatus([log({}), log({}), log({})]).status).toBe('SUFFICIENT');
  });
});

describe('lane separation', () => {
  it('internal lane only counts timed/test attempts', () => {
    const attempts = [
      ...Array.from({ length: 10 }, () => attempt({ correct: true, mode: 'timed' })),
      ...Array.from({ length: 10 }, () => attempt({ correct: false, mode: 'learning' })),
    ];
    const s = internalTimedAccuracy(attempts, 'LR');
    expect(s.n).toBe(10);
    expect(s.acc).toBe(1);
  });
  it('official lane aggregates section scores without touching attempts', () => {
    const s = officialAccuracy([log({})], 'LR');
    expect(s.n).toBe(50);
    expect(s.acc).toBeCloseTo(39 / 50);
  });
});

describe('computeCalibration', () => {
  it('returns only the INSUFFICIENT insight when no official logs exist', () => {
    const attempts = Array.from({ length: 20 }, () => attempt({}));
    const out = computeCalibration({ attempts, logs: [], masteredSkillIds: [], skillLabels: {} });
    expect(out.length).toBe(1);
    expect(out[0].kind).toBe('insufficient-official');
  });

  it('warns when internal timed accuracy exceeds official by ≥10 pts', () => {
    const attempts = Array.from({ length: 20 }, () =>
      attempt({ correct: true, questionId: 'lr-a-001' }),
    );
    // Official LR: 25/50 = 50% vs internal 100% → 50pt gap.
    const logs = [log({ lr1Correct: 12, lr1Total: 25, lr2Correct: 13, lr2Total: 25 })];
    const out = computeCalibration({ attempts, logs, masteredSkillIds: [], skillLabels: {} });
    const gap = out.find((i) => i.id === 'gap-warn-LR');
    expect(gap).toBeDefined();
    expect(gap!.severity).toBe('warn');
    expect(gap!.body).toContain('provisional');
  });

  it('flags mastered skills that appear in official missed-types notes', () => {
    const attempts = Array.from({ length: 20 }, () => attempt({}));
    const logs = [log({ questionTypes: 'flaw questions and parallel flaw reasoning' })];
    const out = computeCalibration({
      attempts,
      logs,
      masteredSkillIds: ['lr-flaw'],
      skillLabels: { 'lr-flaw': 'Flaw in Reasoning' },
    });
    expect(out.some((i) => i.kind === 'mastery-not-transferring')).toBe(true);
  });

  it('detects official score trends', () => {
    const attempts = Array.from({ length: 20 }, () => attempt({}));
    const logs = [
      log({ date: '2026-06-01', scaledScore: 160 }),
      log({ date: '2026-07-01', scaledScore: 163 }),
      log({ date: '2026-08-01', scaledScore: 167 }),
    ];
    const out = computeCalibration({ attempts, logs, masteredSkillIds: [], skillLabels: {} });
    expect(out.some((i) => i.id === 'official-trend-up')).toBe(true);
  });
});
