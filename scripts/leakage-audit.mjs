#!/usr/bin/env node
/**
 * Standalone surface-leakage audit (mandate §§25–27).
 * Prints every ratchet metric for the content bank without needing vitest.
 * Run: node scripts/leakage-audit.mjs
 */
import { QUESTIONS } from '../src/content/index.ts';

const N = QUESTIONS.length;
const choiceText = (q, i) => q.choices[i].text;
const lengthsOf = (q) => q.choices.map((_, i) => choiceText(q, i).trim().length);
const tokenSet = (s) =>
  new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 3));

let uniqL = 0, uniqS = 0, longestRight = 0, decided = 0, overlapWins = 0;
const deltas = [];
const pos = [0, 0, 0, 0, 0];
for (const q of QUESTIONS) {
  const L = lengthsOf(q);
  const mx = Math.max(...L), mn = Math.min(...L);
  if (L.filter((x) => x === mx).length === 1) {
    decided++;
    if (L.indexOf(mx) === q.correctIndex) { uniqL++; longestRight++; }
  }
  if (L.filter((x) => x === mn).length === 1 && L.indexOf(mn) === q.correctIndex) uniqS++;
  const d = L.filter((_, i) => i !== q.correctIndex);
  deltas.push(L[q.correctIndex] - d.reduce((a, b) => a + b, 0) / d.length);
  pos[q.correctIndex]++;
  const stemT = tokenSet(`${q.stem} ${q.stimulus ?? ''}`);
  const ovs = q.choices.map((_, i) => {
    let n = 0;
    for (const w of tokenSet(choiceText(q, i))) if (stemT.has(w)) n++;
    return n;
  });
  if (ovs[q.correctIndex] > Math.max(...ovs.filter((_, i) => i !== q.correctIndex))) overlapWins++;
}
deltas.sort((a, b) => a - b);
const exp = N / 5;
const chi2 = pos.reduce((s, c) => s + (c - exp) ** 2 / exp, 0);

const pct = (x) => `${(x * 100).toFixed(1)}%`;
console.log(`bank size: ${N}`);
console.log(`unique-longest-correct:  ${pct(uniqL / N)}  (gate 13–27%)`);
console.log(`unique-shortest-correct: ${pct(uniqS / N)}  (gate 13–27%)`);
console.log(`pick-longest accuracy:   ${pct(longestRight / decided)}  (gate ≤27%)`);
console.log(`position chi2:           ${chi2.toFixed(2)}  (gate 0.30–13.28)  counts=${pos}`);
console.log(`length delta median/mean: ${deltas[N >> 1].toFixed(1)} / ${(deltas.reduce((a, b) => a + b, 0) / N).toFixed(2)}  (gate |·|≤6)`);
console.log(`max-overlap-correct:     ${pct(overlapWins / N)}  (gate ≤30%)`);
console.log(`\nFull 10-fold CV classifier gate: see tests/leakage.test.ts (npx vitest run tests/leakage.test.ts)`);
