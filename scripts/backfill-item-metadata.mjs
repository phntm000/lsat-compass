#!/usr/bin/env node
/**
 * Backfill Part IV/V/LI metadata on existing question items.
 * For each `    difficulty: N,` line in src/content/questions/*.ts, replaces it with:
 *     editorialDifficulty: N,
 *     itemPurpose: '<heuristic default>',
 *     validationStatus: 'author-reviewed',
 * Heuristic defaults are documented and intentionally conservative; the
 * adversarial audit (docs/OVERHAUL_AUDIT.md) refines them per item.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const files = [
  'src/content/questions/lr-a.ts', 'src/content/questions/lr-b.ts',
  'src/content/questions/lr-c.ts', 'src/content/questions/lr-d.ts',
  'src/content/questions/lr-e.ts', 'src/content/questions/lr-f.ts',
  'src/content/questions/lr-g.ts', 'src/content/questions/lr-h.ts',
  'src/content/questions/rc-a.ts', 'src/content/questions/rc-b.ts',
];

function purposeFor(d) {
  if (d <= 1) return 'skill-acquisition';
  if (d <= 3) return 'independent-blocked';
  return 'mixed-discrimination';
}

let total = 0;
for (const f of files) {
  const src = readFileSync(f, 'utf8');
  if (src.includes('editorialDifficulty')) {
    console.log(`SKIP (already migrated): ${f}`);
    continue;
  }
  // Split into item chunks at item boundaries.
  const parts = src.split(/(\n    id: ')/);
  let out = parts[0];
  let count = 0;
  for (let i = 1; i < parts.length; i += 2) {
    const head = parts[i]; // "\n    id: '"
    const body = parts[i + 1] ?? '';
    const chunk = head + body;
    const m = chunk.match(/difficulty: ([1-5]),/);
    if (m) {
      const d = Number(m[1]);
      const replacement =
        `editorialDifficulty: ${d},\n` +
        `    itemPurpose: '${purposeFor(d)}',\n` +
        `    validationStatus: 'author-reviewed',`;
      out += chunk.replace(/    difficulty: [1-5],/, '    ' + replacement);
      count++;
    } else {
      out += chunk;
    }
  }
  writeFileSync(f, out);
  console.log(`${f}: ${count} items migrated`);
  total += count;
}
console.log(`TOTAL: ${total} items`);
