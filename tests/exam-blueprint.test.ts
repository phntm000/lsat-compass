/**
 * Exam section blueprints (Part XLVIII): LR sections must follow a fixed
 * blueprint — assessment-only pool, type diversity, difficulty progression,
 * topic variety, no premature reuse — rather than the mastery-adaptive
 * practice composer. RC sections must allow 0 or 1 comparative set
 * (LSAC: comparative is not guaranteed every section).
 */
import { describe, it, expect } from 'vitest';
import { createRun, buildRCQuestionIds } from '../src/features/exam/examStore';
import { QUESTIONS, PASSAGES, getQuestion, getPassage } from '../src/content';

const NON_ASSESSMENT = new Set(['worked-example', 'micro-drill', 'guided-practice', 'skill-acquisition']);

describe('LR exam blueprint', () => {
  it('builds a 25-question section from assessment-purpose items only', () => {
    const run = createRun('section', 'LR', {}, new Set());
    const sec = run.sections[0];
    expect(sec.questionIds.length).toBe(25);
    for (const id of sec.questionIds) {
      const q = getQuestion(id)!;
      expect(NON_ASSESSMENT.has(q.itemPurpose), `non-assessment item ${id} in exam`).toBe(false);
      expect(['retired', 'draft', 'needs-revision']).not.toContain(q.validationStatus);
    }
    // No duplicate questions within the section.
    expect(new Set(sec.questionIds).size).toBe(25);
  });

  it('enforces type diversity and difficulty progression', () => {
    const run = createRun('section', 'LR', {}, new Set());
    const qs = run.sections[0].questionIds.map((id) => getQuestion(id)!);
    const typeCount = new Map<string, number>();
    for (const q of qs) typeCount.set(q.questionType, (typeCount.get(q.questionType) ?? 0) + 1);
    for (const [type, n] of typeCount) {
      expect(n, `type ${type} over-represented`).toBeLessThanOrEqual(4);
    }
    expect(typeCount.size).toBeGreaterThanOrEqual(10);
    // Roughly ascending difficulty: late slots harder than early slots.
    const early = qs.slice(0, 8).map((q) => q.editorialDifficulty);
    const late = qs.slice(17).map((q) => q.editorialDifficulty);
    const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
    expect(avg(late)).toBeGreaterThanOrEqual(avg(early));
  });

  it('never repeats a question across sections of one run', () => {
    const run = createRun('sim', undefined, {}, new Set());
    const all = run.sections.flatMap((s) => s.questionIds);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe('RC comparative distribution', () => {
  it('produces both comparative and non-comparative sections over many runs', () => {
    let withComp = 0;
    let withoutComp = 0;
    for (let i = 0; i < 40; i++) {
      const run = createRun('section', 'RC', {}, new Set());
      const ids = run.sections[0].passageIds ?? [];
      const has = ids.some((id) => getPassage(id)?.comparative);
      if (has) withComp++; else withoutComp++;
    }
    // ~50% each way; both outcomes must occur (comparative NOT guaranteed).
    expect(withComp).toBeGreaterThan(0);
    expect(withoutComp).toBeGreaterThan(0);
  });

  it('never includes more than one comparative set per section', () => {
    for (let i = 0; i < 20; i++) {
      const run = createRun('section', 'RC', {}, new Set());
      const ids = run.sections[0].passageIds ?? [];
      const comps = ids.filter((id) => getPassage(id)?.comparative);
      expect(comps.length).toBeLessThanOrEqual(1);
      expect(ids.length).toBe(4);
    }
  });

  it('never serves two passages from the same topic cluster in one section', () => {
    for (let i = 0; i < 30; i++) {
      const run = createRun('section', 'RC', {}, new Set());
      const ids = run.sections[0].passageIds ?? [];
      const clusters = ids
        .map((id) => (getPassage(id) as { topicCluster?: string } | undefined)?.topicCluster)
        .filter(Boolean);
      expect(new Set(clusters).size, `cluster clash in ${ids.join(',')}`).toBe(clusters.length);
    }
  });
});

describe('RC blueprint composition (§44 rewrite)', () => {
  const sizeOf = (pid: string) => getPassage(pid)?.questionIds.length ?? 0;
  const domainOf = (pid: string) => (getPassage(pid) as { domain?: string } | undefined)?.domain;

  it('is deterministic: the same seed builds the same section', () => {
    for (const seed of [1, 42, 777, 123456]) {
      const a = buildRCQuestionIds(new Set(), seed);
      const b = buildRCQuestionIds(new Set(), seed);
      expect(b.passageIds).toEqual(a.passageIds);
      expect(b.questionIds).toEqual(a.questionIds);
    }
  });

  it('uses only the two legal families (3S+1C or 4S+0C) across a seed sweep', () => {
    let withComp = 0;
    let withoutComp = 0;
    for (let seed = 0; seed < 60; seed++) {
      const { passageIds } = buildRCQuestionIds(new Set(), seed);
      expect(passageIds).toHaveLength(4);
      const comps = passageIds.filter((id) => getPassage(id)?.comparative).length;
      expect(comps === 0 || comps === 1, `illegal family at seed ${seed}`).toBe(true);
      if (comps === 1) withComp++; else withoutComp++;
    }
    // Both families must actually occur across seeds (~50/50 by seed bit).
    expect(withComp).toBeGreaterThan(0);
    expect(withoutComp).toBeGreaterThan(0);
  });

  it('varies set sizes within sections and keeps totals in the 24–30 band', () => {
    let sawVariety = 0;
    for (let seed = 0; seed < 60; seed++) {
      const { passageIds, questionIds } = buildRCQuestionIds(new Set(), seed);
      const sizes = passageIds.map(sizeOf);
      const total = sizes.reduce((a, b) => a + b, 0);
      expect(total, `total ${total} out of band at seed ${seed}`).toBeGreaterThanOrEqual(24);
      expect(total, `total ${total} out of band at seed ${seed}`).toBeLessThanOrEqual(30);
      expect(questionIds.length).toBe(total);
      if (new Set(sizes).size >= 2) sawVariety++;
    }
    // §43: real size variation must appear across sections, not 22×6 sameness.
    expect(sawVariety).toBeGreaterThan(40);
  });

  it('covers at least 3 distinct passage domains per section', () => {
    for (let seed = 0; seed < 60; seed++) {
      const { passageIds } = buildRCQuestionIds(new Set(), seed);
      const domains = new Set(passageIds.map(domainOf));
      expect(domains.size, `domain monoculture at seed ${seed}: ${passageIds.join(',')}`).toBeGreaterThanOrEqual(3);
    }
  });

  it('keeps the topic-cluster guard under the seeded picker', () => {
    for (let seed = 0; seed < 60; seed++) {
      const { passageIds } = buildRCQuestionIds(new Set(), seed);
      const clusters = passageIds
        .map((id) => (getPassage(id) as { topicCluster?: string } | undefined)?.topicCluster)
        .filter(Boolean);
      expect(new Set(clusters).size).toBe(clusters.length);
    }
  });
});

// Silence unused-import lint for documentation value.
void QUESTIONS;
void PASSAGES;

describe('validation gate (Part LI)', () => {
  it('flags provisional exactly when the validated pool cannot fill a section', () => {
    const validatedPool = QUESTIONS.filter(
      (q) => q.sectionType === 'LR' && !NON_ASSESSMENT.has(q.itemPurpose) &&
             q.validationStatus === 'validated',
    ).length;
    const run = createRun('section', 'LR', {}, new Set());
    expect(run.sections[0].questionIds).toHaveLength(25);
    // Provisional must be true iff validated items alone can't fill 25 slots.
    expect(run.usedProvisionalItems).toBe(validatedPool < 25);
  });

  it('RC sections prefer fully-validated passages and disclose provisional', () => {
    const qStatus = new Map(QUESTIONS.map((q) => [q.id, q.validationStatus]));
    const validatedPassages = PASSAGES.filter((p) =>
      p.questionIds.length > 0 &&
      p.questionIds.every((qid) => qStatus.get(qid) === 'validated'),
    ).length;
    const run = createRun('section', 'RC', {}, new Set());
    const sec = run.sections[0];
    expect(sec.passageIds).toHaveLength(4);
    expect(sec.questionIds.length).toBeGreaterThan(0);
    // Provisional iff fewer than 4 fully-validated passages exist.
    expect(run.usedProvisionalItems).toBe(validatedPassages < 4);
  });
});
