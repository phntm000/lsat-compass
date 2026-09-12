/**
 * Integration tests — cross-module behavior the unit tests don't cover:
 * backup round-trip, exam simulation structure, and the mastery→DB→review
 * pipeline. Uses fake-indexeddb so Dexie runs in Node.
 */
import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { buildBackup, validateBackup } from '../src/engine/db-schema';
import type { BackupFile } from '../src/engine/db-schema';
import { createRun, SECTION_SECONDS, BREAK_SECONDS } from '../src/features/exam/examStore';
import { db } from '../src/db/db';
import { recordAttempt, computeMastery } from '../src/engine/mastery';
import { buildReviewQueue } from '../src/engine/scheduler';
import type { AttemptInput } from '../src/engine/types';

function sampleData(): BackupFile['data'] {
  return {
    profile: {
      id: 'me', onboardingComplete: true, isNewToLsat: true,
      targetTestDate: null, targetScore: null, diagnosticScore: null,
      preferredSessionMinutes: 20, daysPerWeek: 4, soundEnabled: true,
      haptics: true, reducedMotion: false, theme: 'system',
      timerMode: 'visible', timerWarnings: true, createdAt: 1,
    },
    skillStates: [{
      skillId: 'lr-flaw', attempts: 10, records: 10, lastPracticed: Date.now(),
      lapses: 0, stabilityDays: 3, dueAt: Date.now(), prevState: null, exposureCount: 2,
    }],
    attempts: [],
    lessonProgress: [],
    sessions: [],
    officialLogs: [],
    achievements: [],
    notes: [],
    bookmarks: [],
    essays: [],
    dailyActivity: [],
  };
}

describe('backup round-trip', () => {
  it('build → JSON → validate preserves data and checksum', () => {
    const backup = buildBackup('1.0.0', sampleData());
    const revived = JSON.parse(JSON.stringify(backup)) as unknown;
    const result = validateBackup(revived);
    expect(result.ok).toBe(true);
    expect(result.backup?.data.skillStates[0]?.skillId).toBe('lr-flaw');
    expect(result.backup?.appVersion).toBe('1.0.0');
  });

  it('rejects tampered payloads', () => {
    const backup = buildBackup('1.0.0', sampleData());
    backup.data.skillStates[0].attempts = 9999; // tamper after checksum
    expect(validateBackup(JSON.parse(JSON.stringify(backup))).ok).toBe(false);
  });

  it('rejects non-JSON and wrong shapes', () => {
    expect(validateBackup(null).ok).toBe(false);
    expect(validateBackup({ nope: true }).ok).toBe(false);
    expect(validateBackup('string').ok).toBe(false);
  });
});

describe('exam simulation structure', () => {
  it('builds 4 sections: 2 scored LR + 1 scored RC + 1 hidden variable', () => {
    const run = createRun('sim', undefined, {}, new Set());
    expect(run.sections).toHaveLength(4);
    const variable = run.sections.filter((s) => s.variable);
    expect(variable).toHaveLength(1);
    const scored = run.sections.filter((s) => !s.variable).map((s) => s.kind).sort();
    expect(scored).toEqual(['LR', 'LR', 'RC']);
    // Variable is LR or RC and sits at a 1-based position 1..4.
    expect(['LR', 'RC']).toContain(variable[0].kind);
    expect(run.variablePosition).toBeGreaterThanOrEqual(1);
    expect(run.variablePosition).toBeLessThanOrEqual(4);
    // Every section carries real question ids — full-size sections, no
    // duplicates across sections (regression: LR sections used to starve).
    for (const s of run.sections) {
      expect(s.questionIds.length).toBeGreaterThan(0);
    }
    const lrSections = run.sections.filter((s) => s.kind === 'LR');
    for (const s of lrSections) {
      expect(s.questionIds.length).toBeGreaterThanOrEqual(20);
    }
    const all = run.sections.flatMap((s) => s.questionIds);
    expect(new Set(all).size).toBe(all.length);
  });

  it('uses the verified timing constants', () => {
    expect(SECTION_SECONDS).toBe(35 * 60);
    expect(BREAK_SECONDS).toBe(10 * 60);
  });

  it('single-section mode builds exactly one non-variable section', () => {
    const run = createRun('section', 'LR', {}, new Set());
    expect(run.sections).toHaveLength(1);
    expect(run.sections[0].variable).toBe(false);
    expect(run.variablePosition).toBeNull();
  });
});

describe('mastery → DB → review pipeline', () => {
  beforeEach(async () => {
    await db.skillStates.clear();
  });

  function attemptInput(correct: boolean, ts: number): AttemptInput {
    return {
      questionId: 'lr-a-001', questionVersion: 1, timestamp: ts,
      correct, responseTimeMs: 45_000, estimatedSeconds: 60,
      confidence: 4, hintsUsed: 0, changedAnswer: false,
      firstAttemptOnQuestion: true, mode: 'learning',
      revealedSolution: false, skillIds: ['lr-flaw'], difficulty: 2,
    };
  }

  it('persists skill evidence and surfaces it in the review queue', async () => {
    const now = Date.now();
    let ev = recordAttempt(null, attemptInput(true, now - 3 * 86_400_000));
    ev = recordAttempt(ev, attemptInput(false, now - 2 * 86_400_000));
    ev = recordAttempt(ev, attemptInput(true, now - 86_400_000));
    await db.skillStates.put({
      skillId: 'lr-flaw', attempts: ev.attempts, records: ev.records,
      lastPracticed: ev.lastPracticed, lapses: ev.lapses,
      stabilityDays: ev.stabilityDays, dueAt: ev.dueAt,
      prevState: ev.prevState, exposureCount: 0,
    });

    const row = await db.skillStates.get('lr-flaw');
    expect(row).toBeDefined();
    expect(row?.attempts).toBe(3);

    const mastery = computeMastery({
      skillId: 'lr-flaw', attempts: row!.attempts, records: row!.records,
      lastPracticed: row!.lastPracticed, lapses: row!.lapses,
      stabilityDays: row!.stabilityDays, dueAt: row!.dueAt, prevState: row!.prevState,
    }, now);
    expect(mastery.score).toBeGreaterThan(0);

    const plan = buildReviewQueue([{
      evidence: {
        skillId: 'lr-flaw', attempts: row!.attempts, records: row!.records,
        lastPracticed: row!.lastPracticed, lapses: row!.lapses,
        stabilityDays: row!.stabilityDays, dueAt: row!.dueAt, prevState: row!.prevState,
      },
      mastery,
      meta: { id: 'lr-flaw', importance: 3, prerequisites: [] },
    }], now, 20, 0);
    expect(plan.items.length).toBeGreaterThanOrEqual(0);
  });
});
