/**
 * Content QA pipeline. Fails the build on invalid content.
 * Run: npx vitest run tests/content.test.ts
 *
 * Adapted to the real content API (src/content/index.ts).
 * Rules: id uniqueness, no placeholders, referential integrity, structural
 * validity per the content contract, and quantity gates.
 */
import { describe, it, expect } from 'vitest';
import {
  QUESTIONS, LESSONS, PASSAGES, DRILLS, CONTRAST_DRILLS,
  SKILLS, GLOSSARY, curriculumStages, validateReferences,
} from '../src/content/index';

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

// Part IV / LI vocabularies (must match src/content/index.ts).
const PURPOSES = new Set([
  'worked-example', 'micro-drill', 'guided-practice', 'skill-acquisition',
  'independent-blocked', 'mixed-discrimination', 'transfer',
  'timed-assessment', 'section-simulation',
]);
const STATUSES = new Set([
  'draft', 'author-reviewed', 'adversarial-reviewed',
  'validated', 'needs-revision', 'retired',
]);

describe('global id uniqueness', () => {
  it('no duplicate ids across all content', () => {
    const seen = new Map<string, string>();
    const dups: string[] = [];
    const add = (id: string, kind: string) => {
      if (seen.has(id)) dups.push(`${id} (${seen.get(id)} + ${kind})`);
      else seen.set(id, kind);
    };
    QUESTIONS.forEach(q => add(q.id, 'question'));
    LESSONS.forEach(l => add(l.id, 'lesson'));
    PASSAGES.forEach(p => add(p.id, 'passage'));
    DRILLS.forEach(d => add(d.id, 'drill'));
    GLOSSARY.forEach(g => add(`glossary:${g.term}`, 'glossary'));
    expect(dups).toEqual([]);
  });
  it('no placeholder text anywhere', () => {
    const bad: string[] = [];
    const scan = (id: string, v: unknown) => {
      const s = JSON.stringify(v).toLowerCase();
      if (/lorem ipsum|todo|tbd|placeholder|fixme|\[insert/.test(s)) bad.push(id);
    };
    QUESTIONS.forEach(q => scan(q.id, q));
    LESSONS.forEach(l => scan(l.id, l));
    PASSAGES.forEach(p => scan(p.id, p));
    DRILLS.forEach(d => scan(d.id, d));
    expect(bad).toEqual([]);
  });
  it('reference validation passes', () => {
    expect(validateReferences()).toEqual([]);
  });
});

describe('skills', () => {
  const ids = new Set(SKILLS.map(s => s.id));
  it('prerequisites exist and graph is acyclic', () => {
    for (const s of SKILLS) {
      for (const p of s.prerequisites) {
        expect(ids.has(p), `${s.id} prereq ${p} missing`).toBe(true);
      }
    }
    const visited = new Set<string>(), stack = new Set<string>();
    const byId = new Map(SKILLS.map(s => [s.id, s]));
    const visit = (id: string): void => {
      if (stack.has(id)) throw new Error(`cycle at ${id}`);
      if (visited.has(id)) return;
      stack.add(id);
      for (const p of byId.get(id)!.prerequisites) visit(p);
      stack.delete(id); visited.add(id);
    };
    SKILLS.forEach(s => visit(s.id));
  });
});

describe('questions', () => {
  const skillIds = new Set(SKILLS.map(s => s.id));
  const passageIds = new Set(PASSAGES.map(p => p.id));
  const qIds = new Set(QUESTIONS.map(q => q.id));

  it('every question is structurally valid', () => {
    const errors: string[] = [];
    for (const q of QUESTIONS) {
      if (q.choices.length !== 5) errors.push(`${q.id}: ${q.choices.length} choices`);
      if (q.correctIndex < 0 || q.correctIndex > 4) errors.push(`${q.id}: bad correctIndex`);
      if (!skillIds.has(q.questionType)) errors.push(`${q.id}: unknown type ${q.questionType}`);
      if (q.editorialDifficulty < 1 || q.editorialDifficulty > 5) errors.push(`${q.id}: bad editorialDifficulty`);
      // Part IV/V/LI metadata (see docs/ITEM_WRITING_STANDARD.md)
      if (!PURPOSES.has(q.itemPurpose)) errors.push(`${q.id}: bad itemPurpose ${q.itemPurpose}`);
      if (!STATUSES.has(q.validationStatus)) errors.push(`${q.id}: bad validationStatus ${q.validationStatus}`);
      if (q.validationStatus === 'retired') errors.push(`${q.id}: retired item still in bank`);
      if (q.validationStatus === 'validated') {
        if (q.itemPurpose === 'worked-example' || q.itemPurpose === 'micro-drill')
          errors.push(`${q.id}: validated status on instructional item`);
        const p = q.difficultyProfile;
        const rated = p ? Object.values(p).filter(v => v !== undefined).length : 0;
        if (rated < 3) errors.push(`${q.id}: validated item needs difficultyProfile (≥3 dimensions)`);
      }
      if (q.difficultyProfile) {
        for (const [k, v] of Object.entries(q.difficultyProfile)) {
          if (v! < 1 || v! > 5) errors.push(`${q.id}: difficultyProfile.${k} out of range`);
        }
      }
      if (!q.stem.trim()) errors.push(`${q.id}: empty stem`);
      // RC questions store the passage separately — stimulus may be empty;
      // LR questions must carry their own stimulus.
      if (q.sectionType === 'LR' && !q.stimulus.trim()) errors.push(`${q.id}: empty stimulus`);
      if (wordCount(q.explanationQuick) < 15) errors.push(`${q.id}: quick explanation too short`);
      if (wordCount(q.explanationWalkthrough) < 60) errors.push(`${q.id}: walkthrough too short`);
      if (q.choiceExplanations.length !== 5) errors.push(`${q.id}: choiceExplanations != 5`);
      q.choiceExplanations.forEach((c, i) => {
        if (wordCount(c) < 20) errors.push(`${q.id}: choice ${i} explanation too short`);
      });
      if (!q.generalLesson.trim()) errors.push(`${q.id}: missing generalLesson`);
      if (q.hints.length !== 3 || q.hints.some(h => !h.trim())) errors.push(`${q.id}: hints invalid`);
      if (q.estimatedSeconds < 30 || q.estimatedSeconds > 180) errors.push(`${q.id}: bad estimatedSeconds`);
      if (q.sourceType !== 'original') errors.push(`${q.id}: sourceType not original`);
      for (const s of [...q.secondarySkills, ...q.prerequisites]) {
        if (!skillIds.has(s)) errors.push(`${q.id}: unknown skill ${s}`);
      }
      if (q.sectionType === 'RC' && !q.passageId) errors.push(`${q.id}: RC without passageId`);
      if (q.passageId && !passageIds.has(q.passageId)) errors.push(`${q.id}: bad passageId ${q.passageId}`);
      if (q.version < 1) errors.push(`${q.id}: bad version`);
      // Answer-length leakage ratchet (P0-1): the credited choice must not be
      // systematically the longest. Enforced per item: ratio ≤1.25 AND not
      // uniquely longest by >20 chars. A test-wise "pick the longest" student
      // must gain nothing.
      {
        const lens = q.choices.map(c => c.text.length);
        const cred = lens[q.correctIndex];
        const dist = lens.filter((_, i) => i !== q.correctIndex);
        const maxD = Math.max(...dist);
        if (cred / maxD > 1.25)
          errors.push(`${q.id}: credited ${cred} chars > 1.25× longest distractor ${maxD}`);
        const sorted = [...lens].sort((a, b) => b - a);
        if (cred === sorted[0] && sorted[0] - sorted[1] > 20 && lens.indexOf(sorted[0]) === q.correctIndex)
          errors.push(`${q.id}: credited uniquely longest by ${sorted[0] - sorted[1]} chars`);
      }
    }
    expect(errors).toEqual([]);
  });

  it('passage question links are consistent', () => {
    const errors: string[] = [];
    for (const p of PASSAGES) {
      if (p.questionIds.length < 5) errors.push(`${p.id}: only ${p.questionIds.length} questions`);
      for (const qid of p.questionIds) {
        if (!qIds.has(qid)) { errors.push(`${p.id}: missing question ${qid}`); continue; }
        const q = QUESTIONS.find(x => x.id === qid)!;
        if (q.passageId !== p.id) errors.push(`${qid}: passageId ${q.passageId} != ${p.id}`);
      }
    }
    expect(errors).toEqual([]);
  });

  it('no duplicate stimuli', () => {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    const seen = new Map<string, string>();
    const dups: string[] = [];
    // Only questions carrying their own stimulus (LR) are checked; RC
    // questions share their passage text by design.
    for (const q of QUESTIONS.filter(q => q.stimulus.trim())) {
      const k = norm(q.stimulus);
      if (seen.has(k)) dups.push(`${q.id} duplicates ${seen.get(k)}`);
      else seen.set(k, q.id);
    }
    expect(dups).toEqual([]);
  });

  it('every major LR type has coverage across difficulties', () => {
    const major = ['lr-flaw', 'lr-weaken', 'lr-strengthen', 'lr-necessary-assumption',
      'lr-sufficient-assumption', 'lr-must-be-true', 'lr-main-conclusion'];
    const missing: string[] = [];
    for (const t of major) {
      const qs = QUESTIONS.filter(q => q.questionType === t);
      if (qs.length < 8) missing.push(`${t}: only ${qs.length}`);
      const diffs = new Set(qs.map(q => q.editorialDifficulty));
      if (!diffs.has(4) && !diffs.has(5)) missing.push(`${t}: no hard questions`);
    }
    expect(missing).toEqual([]);
  });

  it('meets quantity gates', () => {
    const lr = QUESTIONS.filter(q => q.sectionType === 'LR');
    const rc = QUESTIONS.filter(q => q.sectionType === 'RC');
    expect(lr.length).toBeGreaterThanOrEqual(240);
    expect(rc.length).toBeGreaterThanOrEqual(120);
    expect(PASSAGES.length).toBeGreaterThanOrEqual(25);
    expect(PASSAGES.filter(p => p.comparative).length).toBeGreaterThanOrEqual(6);
  });

  it('item-purpose distribution is sane (Part IV/XXXVII)', () => {
    // Assessment-quality items must exist at every band; instructional items
    // must not dominate the hard bands.
    const assess = new Set(['independent-blocked', 'mixed-discrimination', 'transfer', 'timed-assessment', 'section-simulation']);
    const hard = QUESTIONS.filter(q => q.sectionType === 'LR' && q.editorialDifficulty >= 4);
    const hardAssess = hard.filter(q => assess.has(q.itemPurpose));
    expect(hardAssess.length).toBeGreaterThan(0);
    // No retired items leak into the bank (checked per-item above too).
    expect(QUESTIONS.some(q => q.validationStatus === 'retired')).toBe(false);
  });

  it('heuristic item-leakage checks flag for review (Part XXXVI)', () => {
    // These are tripwires for editorial review, not proof of invalidity.
    // Word-overlap is only suspicious for item types whose credited answer
    // should supply NEW content (strengthen/weaken/assumption/flaw/...);
    // restatement tasks (main-conclusion, must-be-true) legitimately share
    // wording with the stimulus.
    const NEW_CONTENT_TYPES = new Set([
      'lr-flaw', 'lr-weaken', 'lr-strengthen', 'lr-necessary-assumption',
      'lr-sufficient-assumption', 'lr-evaluate', 'lr-resolve-explain',
      'lr-principle', 'lr-parallel', 'lr-parallel-flaw', 'lr-method',
      'lr-point-at-issue',
    ]);
    const flags: string[] = [];
    const tokens = (s: string) =>
      s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 5);
    for (const q of QUESTIONS.filter(q => q.sectionType === 'LR')) {
      const credited = q.choices[q.correctIndex].text;
      const others = q.choices.filter((_, i) => i !== q.correctIndex).map(c => c.text);
      // 1. credited choice substantially longest
      const maxOther = Math.max(...others.map(o => o.length));
      if (credited.length > maxOther * 1.8 && credited.length > 120)
        flags.push(`${q.id}: credited choice much longer than all distractors`);
      // 2. credited choice uniquely repeats distinctive stimulus wording
      if (NEW_CONTENT_TYPES.has(q.questionType)) {
        const stim = new Set(tokens(q.stimulus));
        const cred = new Set(tokens(credited));
        const shared = [...cred].filter(w => stim.has(w));
        if (shared.length >= 3) {
          const unique = shared.filter(w => !others.some(o => tokens(o).includes(w)));
          if (unique.length >= 2) flags.push(`${q.id}: credited uniquely repeats stimulus words (${unique.slice(0, 3).join(', ')})`);
        }
      }
    }
    // Tripwire budget: flags are expected to be reviewed editorially
    // (see docs/OVERHAUL_AUDIT.md §leakage). The budget is a ratchet:
    // it must only ever go down as flagged items are revised.
    // Baseline 2026-09-11: 31 flags (mostly task-inherent length/word
    // overlap in resolve/parallel/point-at-issue items; each reviewed).
    expect(flags.length).toBeLessThan(40);
    if (flags.length > 0) console.log('leakage tripwires:\n' + flags.slice(0, 20).join('\n'));
  });

  it('credited answer positions are not pathologically imbalanced', () => {
    const counts = [0, 0, 0, 0, 0];
    for (const q of QUESTIONS) counts[q.correctIndex]++;
    const total = QUESTIONS.length;
    for (let i = 0; i < 5; i++) {
      const share = counts[i] / total;
      expect(share).toBeGreaterThan(0.10);
      expect(share).toBeLessThan(0.35);
    }
  });
});

describe('lessons', () => {
  const skillIds = new Set(SKILLS.map(s => s.id));
  const drillIds = new Set(DRILLS.map(d => d.id));
  const lessonIds = new Set(LESSONS.map(l => l.id));
  it('every lesson is structurally valid', () => {
    const errors: string[] = [];
    for (const l of LESSONS) {
      if (l.blocks.length < 4) errors.push(`${l.id}: only ${l.blocks.length} blocks`);
      if (!l.title.trim()) errors.push(`${l.id}: empty title`);
      for (const s of [...l.skills, ...l.prerequisites]) {
        if (!skillIds.has(s)) errors.push(`${l.id}: unknown skill ${s}`);
      }
      const hasInteractive = l.blocks.some(b =>
        b.kind === 'checkpoint' || b.kind === 'tryit' || b.kind === 'retrieval');
      if (!hasInteractive) errors.push(`${l.id}: no interactive block`);
      for (const b of l.blocks) {
        if (b.kind === 'checkpoint') {
          if (b.choices.length < 2 || b.correctIndex >= b.choices.length) errors.push(`${l.id}: bad checkpoint`);
          if (wordCount(b.explanation) < 15) errors.push(`${l.id}: checkpoint explanation short`);
        }
        if (b.kind === 'tryit') {
          for (const d of b.drillIds) if (!drillIds.has(d)) errors.push(`${l.id}: bad drill ${d}`);
        }
      }
    }
    expect(errors).toEqual([]);
  });
  it('curriculum order covers every lesson exactly once', () => {
    const flat = curriculumStages.flatMap(s => s.lessons.map(l => l.id));
    expect(new Set(flat).size).toBe(flat.length);
    expect(new Set(flat).size).toBe(lessonIds.size);
    for (const id of flat) expect(lessonIds.has(id), `order lists missing ${id}`).toBe(true);
  });
  it('meets lesson quantity gate', () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(80);
  });
});

describe('drills', () => {
  const skillIds = new Set(SKILLS.map(s => s.id));
  it('every drill is valid', () => {
    const errors: string[] = [];
    for (const d of DRILLS) {
      if (d.choices.length < 2 || d.choices.length > 4) errors.push(`${d.id}: bad choice count`);
      if (d.correctIndex >= d.choices.length) errors.push(`${d.id}: bad correctIndex`);
      if (wordCount(d.explanation) < 30) errors.push(`${d.id}: explanation too short`);
      for (const s of d.skillIds) if (!skillIds.has(s)) errors.push(`${d.id}: unknown skill ${s}`);
    }
    expect(errors).toEqual([]);
  });
  it('foundation skills have drill coverage', () => {
    const fSkills = SKILLS.filter(s => s.id.startsWith('f-')).map(s => s.id);
    const covered = new Set(DRILLS.flatMap(d => d.skillIds));
    const missing = fSkills.filter(s => !covered.has(s));
    expect(missing).toEqual([]);
  });
  it('meets drill quantity gates', () => {
    expect(DRILLS.length - CONTRAST_DRILLS.length).toBeGreaterThanOrEqual(140);
    expect(CONTRAST_DRILLS.length).toBeGreaterThanOrEqual(100);
  });
});

describe('glossary', () => {
  it('terms are complete', () => {
    const errors: string[] = [];
    for (const g of GLOSSARY) {
      if (!g.term.trim() || wordCount(g.definition) < 10) errors.push(`${g.term}: bad definition`);
    }
    expect(errors).toEqual([]);
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(30);
  });
});
