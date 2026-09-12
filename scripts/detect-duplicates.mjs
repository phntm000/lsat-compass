#!/usr/bin/env node
/**
 * detect-duplicates.mjs — near-duplicate stimulus detection (Part XXXVI).
 * Flags LR item pairs whose stimuli are suspiciously similar (Jaccard ≥ 0.55
 * on content-word sets), suggesting duplicated reasoning structures.
 * Exit 0 always; prints report. CI fails separately on exact duplicates
 * (tests/content.test.ts "no duplicate stimuli").
 */
import { parseQuestions, tokenSet, jaccard } from './lib/parse-content.mjs';

const qs = parseQuestions().filter(q => q.sectionType === 'LR' && q.stimulus.trim());
const sets = qs.map(q => ({ id: q.id, type: q.questionType, s: tokenSet(q.stimulus) }));

const pairs = [];
for (let i = 0; i < sets.length; i++) {
  for (let j = i + 1; j < sets.length; j++) {
    const sim = jaccard(sets[i].s, sets[j].s);
    if (sim >= 0.55) pairs.push({ a: sets[i].id, b: sets[j].id, sim: +sim.toFixed(2), sameType: sets[i].type === sets[j].type });
  }
}
pairs.sort((x, y) => y.sim - x.sim);

console.log(`# Near-duplicate stimulus report — ${qs.length} LR items scanned`);
console.log(`# threshold: Jaccard >= 0.55 on content words\n`);
if (!pairs.length) { console.log('No suspicious pairs found.'); process.exit(0); }
for (const p of pairs.slice(0, 40)) {
  console.log(`${p.sim.toFixed(2)}  ${p.a}  <->  ${p.b}${p.sameType ? '  [same type]' : ''}`);
}
console.log(`\n${pairs.length} pair(s) at/above threshold — review for duplicated structures.`);
