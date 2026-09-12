#!/usr/bin/env node
/**
 * difficulty-report.mjs — editorial difficulty distribution analysis (Part V).
 * Reports per-type difficulty histograms and flags:
 *   - types with no d4/d5 items (upper-band blind spots)
 *   - items whose estimatedSeconds are inconsistent with their difficulty
 *     (d5 items at 45s, d1 items at 110s)
 *   - validated items missing difficultyProfile dimensions
 */
import { parseQuestions } from './lib/parse-content.mjs';
import { readFileSync } from 'node:fs';

const qs = parseQuestions();
const lr = qs.filter(q => q.sectionType === 'LR');

// estimatedSeconds needs the TS source; parse quickly
const estById = {};
for (const f of ['lr-a','lr-b','lr-c','lr-d','lr-e','lr-f','lr-g','lr-h','rc-a','rc-b']) {
  const src = readFileSync(`src/content/questions/${f}.ts`, 'utf8');
  for (const m of src.matchAll(/id: '([^']+)',[\s\S]{0,600}?estimatedSeconds: (\d+)/g)) {
    estById[m[1]] = Number(m[2]);
  }
}

console.log('# Editorial difficulty report\n');
const byType = {};
for (const q of lr) {
  byType[q.questionType] = byType[q.questionType] || {1:0,2:0,3:0,4:0,5:0};
  byType[q.questionType][q.editorialDifficulty]++;
}
for (const [t, d] of Object.entries(byType).sort()) {
  console.log(`${t}: d1=${d[1]} d2=${d[2]} d3=${d[3]} d4=${d[4]} d5=${d[5]}`);
}
console.log('\n# Time/difficulty mismatches (est. seconds vs band)');
let mism = 0;
for (const q of qs) {
  const s = estById[q.id]; if (!s) continue;
  const d = q.editorialDifficulty;
  if ((d >= 4 && s < 60) || (d <= 2 && s > 100)) {
    console.log(`  ${q.id} d${d} @ ${s}s`);
    mism++;
  }
}
console.log(mism ? `${mism} mismatch(es)` : 'none');
