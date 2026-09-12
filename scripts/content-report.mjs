#!/usr/bin/env node
/**
 * content-report.mjs — content coverage report (Part XXXVII).
 * Generates coverage breakdowns that prevent content-bank blind spots:
 *   LR: counts by type / skill / difficulty / purpose / topic / validation status
 *   RC: domain / comparative / question types / difficulty / word count / set size
 * Writes: scripts/reports/content-report.json and content-report.md
 * Exit 0 always (informational); CI archives the artifacts.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseQuestions, parsePassages } from './lib/parse-content.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const RDIR = join(ROOT, 'scripts/reports');
mkdirSync(RDIR, { recursive: true });

const qs = parseQuestions();
const lr = qs.filter(q => q.sectionType === 'LR');
const rc = qs.filter(q => q.sectionType === 'RC');
const passages = parsePassages();

const countBy = (arr, fn) => {
  const m = {};
  for (const x of arr) { const k = fn(x) ?? '∅'; m[k] = (m[k] || 0) + 1; }
  return Object.fromEntries(Object.entries(m).sort((a, b) => b[1] - a[1]));
};

const lrByType = countBy(lr, q => q.questionType);
const lrByDiff = countBy(lr, q => `d${q.editorialDifficulty}`);
const lrByPurpose = countBy(lr, q => q.itemPurpose);
const lrByStatus = countBy(lr, q => q.validationStatus);
const lrByTopic = countBy(lr, q => q.topic || '∅');
// type × difficulty matrix
const matrix = {};
for (const q of lr) {
  const k = q.questionType;
  matrix[k] = matrix[k] || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  matrix[k][q.editorialDifficulty]++;
}
const hardTypes = Object.entries(matrix).filter(([, d]) => (d[4] + d[5]) === 0).map(([t]) => t);

const rcByDiff = countBy(rc, q => `d${q.editorialDifficulty}`);
const rcByPurpose = countBy(rc, q => q.itemPurpose);
const rcByType = countBy(rc, q => q.questionType);
const passInfo = passages.map(p => ({
  id: p.id, title: p.title.slice(0, 60), domain: p.domain,
  comparative: p.comparative, words: p.wordCount,
  questions: p.questionIds.length,
}));
const setSizes = countBy(passInfo, p => `${p.questions}q`);

const report = {
  generatedAt: new Date().toISOString().slice(0, 10),
  lr: {
    total: lr.length,
    byType: lrByType, byDifficulty: lrByDiff, byPurpose: lrByPurpose,
    byValidation: lrByStatus, typeDifficultyMatrix: matrix,
    typesWithNoHardItems: hardTypes,
    topicCount: Object.keys(lrByTopic).length,
  },
  rc: {
    total: rc.length, byDifficulty: rcByDiff, byPurpose: rcByPurpose, byType: rcByType,
    passages: passages.length,
    comparative: passInfo.filter(p => p.comparative).length,
    setSizeDistribution: setSizes,
    sets: passInfo,
  },
};

writeFileSync(join(RDIR, 'content-report.json'), JSON.stringify(report, null, 2));

const md = `# Content coverage report — ${report.generatedAt}

## LR (${lr.length} items)
### By type
${Object.entries(lrByType).map(([t, n]) => `- ${t}: ${n}`).join('\n')}
### By editorial difficulty
${Object.entries(lrByDiff).map(([d, n]) => `- ${d}: ${n}`).join('\n')}
### By item purpose
${Object.entries(lrByPurpose).map(([p, n]) => `- ${p}: ${n}`).join('\n')}
### By validation status
${Object.entries(lrByStatus).map(([s, n]) => `- ${s}: ${n}`).join('\n')}
### Types with NO difficulty-4/5 items (blind spot)
${hardTypes.length ? hardTypes.map(t => `- ${t}`).join('\n') : 'none'}
### Topic diversity: ${Object.keys(lrByTopic).length} distinct topics

## RC (${rc.length} questions, ${passages.length} passages)
### Set-size distribution
${Object.entries(setSizes).map(([s, n]) => `- ${s}: ${n} passage(s)`).join('\n')}
### By difficulty
${Object.entries(rcByDiff).map(([d, n]) => `- ${d}: ${n}`).join('\n')}
### Passages
${passInfo.map(p => `- ${p.id} (${p.domain}${p.comparative ? ', comparative' : ''}): ${p.words} words, ${p.questions} questions`).join('\n')}
`;
writeFileSync(join(RDIR, 'content-report.md'), md);
console.log(md);
