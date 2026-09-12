/**
 * Content coverage report (mandate §103) — generated on each release.
 * Run: npm run report:coverage
 * Writes docs/CONTENT_COVERAGE.md with counts for every category,
 * displaying empty categories explicitly (a zero row is a finding,
 * not an omission).
 */
import { QUESTIONS, PASSAGES, DRILLS } from '../src/content/index.ts';
import { writeFileSync } from 'node:fs';

const PURPOSES = [
  'worked-example', 'micro-drill', 'guided-practice', 'skill-acquisition',
  'independent-blocked', 'mixed-discrimination', 'transfer',
  'timed-assessment', 'section-simulation',
];
const STATUSES = ['validated', 'adversarial-reviewed', 'author-reviewed', 'needs-revision', 'draft', 'retired'];
const DIFFICULTIES = [1, 2, 3, 4, 5];

// Reasoning-family rollup of LR question types (standard LSAT taxonomy).
const FAMILY_OF = {
  'lr-main-conclusion': 'structure', 'lr-argument-completion': 'structure',
  'lr-role': 'structure', 'lr-parallel': 'structure', 'lr-parallel-flaw': 'structure',
  'lr-flaw': 'flaw-evaluate', 'lr-evaluate': 'flaw-evaluate',
  'lr-assumption': 'assumption', 'lr-assumption-sufficient': 'assumption',
  'lr-principle': 'principle', 'lr-principle-apply': 'principle',
  'lr-strengthen': 'causal-strengthen-weaken', 'lr-weaken': 'causal-strengthen-weaken',
  'lr-strengthen-weaken': 'causal-strengthen-weaken',
  'lr-must-be-true': 'inference', 'lr-inference': 'inference',
  'lr-most-strongly-supported': 'inference', 'lr-inference-fill': 'inference',
  'lr-explain': 'explain', 'lr-resolve': 'explain', 'lr-paradox': 'explain',
  'lr-technique': 'method', 'lr-method': 'method',
  'lr-point-at-issue': 'dialogue', 'lr-argument-part': 'structure',
};

const count = (arr, key) => {
  const m = new Map();
  for (const x of arr) {
    const k = key(x);
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
};

const table = (title, rows, allKeys, keyLabel) => {
  const seen = new Set(rows.map(([k]) => k));
  const lines = [`### ${title}`, '', `| ${keyLabel} | Count |`, '|---|---|'];
  for (const k of allKeys) {
    const row = rows.find(([rk]) => rk === k);
    lines.push(`| ${k} | ${row ? row[1] : '**0 (empty)**'} |`);
    seen.delete(k);
  }
  for (const [k, v] of rows) {
    if (!allKeys.includes(k)) lines.push(`| ${k} (unlisted) | ${v} |`);
  }
  lines.push('');
  return lines.join('\n');
};

const lr = QUESTIONS.filter((q) => q.sectionType === 'LR');
const rc = QUESTIONS.filter((q) => q.sectionType === 'RC');
const now = new Date().toISOString().slice(0, 10);

const out = [];
out.push(`# Content Coverage Report`, '');
out.push(`Generated: ${now} (mandate §103 — regenerate on each release via \`npm run report:coverage\`)`, '');
out.push(`Bank totals: **${QUESTIONS.length} questions** (${lr.length} LR, ${rc.length} RC) · **${PASSAGES.length} RC passage sets**`, '');

/* ---------------- LR ---------------- */
out.push('## Logical Reasoning', '');
out.push(table('By question type',
  [...count(lr, (q) => q.questionType).entries()].sort((a, b) => b[1] - a[1]),
  [...new Set(lr.map((q) => q.questionType))].sort(), 'Type'));
out.push(table('By difficulty',
  [...count(lr, (q) => q.editorialDifficulty).entries()].sort((a, b) => a[0] - b[0]),
  DIFFICULTIES, 'Difficulty'));
out.push(table('By item purpose',
  [...count(lr, (q) => q.itemPurpose).entries()],
  PURPOSES, 'Purpose'));
out.push(table('By topic',
  [...count(lr, (q) => q.labels?.topic ?? '(none)').entries()].sort((a, b) => b[1] - a[1]),
  [...new Set(lr.map((q) => q.labels?.topic ?? '(none)'))].sort(), 'Topic'));
out.push(table('By reasoning family',
  [...count(lr, (q) => FAMILY_OF[q.questionType] ?? 'other').entries()].sort((a, b) => b[1] - a[1]),
  [...new Set(Object.values(FAMILY_OF)), 'other'].sort(), 'Family'));
out.push(table('By validation status',
  [...count(lr, (q) => q.validationStatus).entries()],
  STATUSES, 'Status'));

/* ---------------- RC ---------------- */
out.push('## Reading Comprehension', '');
const qStatus = new Map(QUESTIONS.map((q) => [q.id, q.validationStatus]));
const tierOf = (p) => {
  const sts = p.questionIds.map((qid) => qStatus.get(qid));
  if (sts.length > 0 && sts.every((s) => s === 'validated')) return 'tier 0 (fully validated)';
  if (sts.every((s) => s === 'validated' || s === 'adversarial-reviewed')) return 'tier 1 (adversarial-reviewed)';
  return 'tier 2 (below exam gate)';
};
out.push(table('Passage sets by domain (archetype)',
  [...count(PASSAGES, (p) => p.domain).entries()],
  ['law', 'humanities', 'natural-science', 'social-science'], 'Domain'));
out.push(table('Passage sets by form',
  [...count(PASSAGES, (p) => (p.comparative ? 'comparative' : 'single')).entries()],
  ['single', 'comparative'], 'Form'));
out.push(table('Passage sets by question count (set size)',
  [...count(PASSAGES, (p) => p.questionIds.length).entries()].sort((a, b) => a[0] - b[0]),
  [5, 6, 7, 8], 'Set size'));
out.push(table('RC questions by question type',
  [...count(rc, (q) => q.questionType).entries()].sort((a, b) => b[1] - a[1]),
  [...new Set(rc.map((q) => q.questionType))].sort(), 'Type'));
out.push(table('RC questions by difficulty',
  [...count(rc, (q) => q.editorialDifficulty).entries()].sort((a, b) => a[0] - b[0]),
  DIFFICULTIES, 'Difficulty'));
out.push(table('RC questions by item purpose',
  [...count(rc, (q) => q.itemPurpose).entries()],
  PURPOSES, 'Purpose'));
out.push(table('Passage sets by exam tier (cold status)',
  [...count(PASSAGES, tierOf).entries()],
  ['tier 0 (fully validated)', 'tier 1 (adversarial-reviewed)', 'tier 2 (below exam gate)'], 'Tier'));

/* ---------------- Drills (§19 context) ---------------- */
/* Drills are a separate bank from QUESTIONS: they carry no itemPurpose field
 * because every drill IS the micro-drill / guided-practice layer of the
 * taxonomy. Report them explicitly so zero-purpose rows in the question bank
 * are read in context rather than as missing content. */
out.push('## Drills (separate bank — micro-drill / guided-practice layer)', '');
out.push(`Total: **${DRILLS.length} drills** (foundation ${DRILLS.filter((d) => d.id.startsWith('d-f')).length}, contrast ${DRILLS.filter((d) => d.id.startsWith('d-c')).length}). Drills do not carry \`itemPurpose\`; by design they serve the micro-drill and guided-practice purposes. Question-bank purposes with zero items (worked-example, transfer for LR, timed-assessment, section-simulation) remain genuinely unpopulated and are shown as empty above.`, '');
out.push(table('Drills by kind',
  [...count(DRILLS, (d) => d.kind).entries()].sort((a, b) => b[1] - a[1]),
  ['translate', 'identify', 'classify', 'contrast', 'complete', 'order'], 'Kind'));
out.push(table('Drills by difficulty',
  [...count(DRILLS, (d) => d.difficulty).entries()].sort((a, b) => a[0] - b[0]),
  [1, 2, 3], 'Difficulty'));
out.push(table('Drills by skill',
  [...count(DRILLS, (d) => d.skillIds[0] ?? '(none)').entries()].sort((a, b) => b[1] - a[1]),
  [...new Set(DRILLS.map((d) => d.skillIds[0] ?? '(none)'))].sort(), 'Skill'));

/* ---------------- Passage inventory ---------------- */
out.push('## Passage inventory', '');
out.push('| Passage | Domain | Form | Set size | Tier |', '|---|---|---|---|---|');
for (const p of PASSAGES) {
  out.push(`| ${p.id} — ${p.title} | ${p.domain} | ${p.comparative ? 'comparative' : 'single'} | ${p.questionIds.length} | ${tierOf(p)} |`);
}
out.push('');

writeFileSync('docs/CONTENT_COVERAGE.md', out.join('\n'));
console.log(`docs/CONTENT_COVERAGE.md written: ${QUESTIONS.length} questions, ${PASSAGES.length} passage sets`);
