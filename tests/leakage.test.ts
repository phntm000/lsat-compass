/**
 * Answer-choice surface-leakage ratchets (mandate §§25–27).
 * Run: npx vitest run tests/leakage.test.ts
 *
 * The bank must be unwinnable by a reader who never reasons about content.
 * Every gate below is a surface-only heuristic applied to the real QUESTIONS
 * array. Each must sit near chance (20% for 5-choice items), and a
 * surface-only classifier trained on per-choice cosmetics must not exceed
 * ~25% cross-validated accuracy.
 *
 * Distributional neutrality (§26): we do NOT force same-length answers.
 * Choice lengths should vary naturally; what must not vary is the
 * *correlation* between surface features and correctness.
 */
import { describe, it, expect } from 'vitest';
import { QUESTIONS } from '../src/content/index';

const N = QUESTIONS.length;

const choiceText = (q: (typeof QUESTIONS)[number], i: number) =>
  (q.choices[i] as { text: string }).text;
const lengthsOf = (q: (typeof QUESTIONS)[number]) =>
  q.choices.map((_, i) => choiceText(q, i).trim().length);

const tokenSet = (s: string) =>
  new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 3));

function uniqueLongestIsCorrect(q: (typeof QUESTIONS)[number]): boolean | null {
  const L = lengthsOf(q);
  const mx = Math.max(...L);
  if (L.filter((x) => x === mx).length !== 1) return null; // tie: heuristic undefined
  return L.indexOf(mx) === q.correctIndex;
}
function uniqueShortestIsCorrect(q: (typeof QUESTIONS)[number]): boolean | null {
  const L = lengthsOf(q);
  const mn = Math.min(...L);
  if (L.filter((x) => x === mn).length !== 1) return null;
  return L.indexOf(mn) === q.correctIndex;
}

// Chance = 20%; with n≈416, ±2.5σ ≈ ±5pts. Ceiling 27% / floor 13% catches
// both leakage and mechanical anti-leakage overcorrection.
const HI = 0.27;
const LO = 0.13;

describe('surface-leakage ratchets (§§25–27)', () => {
  it('unique-longest choice is credited at chance', () => {
    const hits = QUESTIONS.filter((q) => uniqueLongestIsCorrect(q) === true).length;
    const rate = hits / N;
    expect(rate, `unique-longest-correct ${(rate * 100).toFixed(1)}% of ${N}`).toBeLessThanOrEqual(HI);
    expect(rate).toBeGreaterThanOrEqual(LO);
  });

  it('unique-shortest choice is credited at chance', () => {
    const hits = QUESTIONS.filter((q) => uniqueShortestIsCorrect(q) === true).length;
    const rate = hits / N;
    expect(rate, `unique-shortest-correct ${(rate * 100).toFixed(1)}%`).toBeLessThanOrEqual(HI);
    expect(rate).toBeGreaterThanOrEqual(LO);
  });

  it('pick-the-longest strategy scores near chance', () => {
    let right = 0, decided = 0;
    for (const q of QUESTIONS) {
      const r = uniqueLongestIsCorrect(q);
      if (r === null) { decided++; continue; } // tie → strategy guesses randomly-ish
      decided++;
      if (r) right++;
    }
    const acc = right / decided;
    expect(acc, `longest-strategy accuracy ${(acc * 100).toFixed(1)}%`).toBeLessThanOrEqual(HI);
  });

  it('credited-position distribution is uniform (chi-square)', () => {
    const counts = [0, 0, 0, 0, 0];
    for (const q of QUESTIONS) counts[q.correctIndex]++;
    const exp = N / 5;
    const chi2 = counts.reduce((s, c) => s + (c - exp) ** 2 / exp, 0);
    // df=4: p=0.01 critical value is 13.28; p=0.99 lower tail is 0.30.
    expect(chi2, `chi2=${chi2.toFixed(2)} counts=${counts}`).toBeLessThan(13.28);
    expect(chi2).toBeGreaterThan(0.3);
  });

  it('credited choice is not systematically longer than distractors', () => {
    const deltas = QUESTIONS.map((q) => {
      const L = lengthsOf(q);
      const d = L.filter((_, i) => i !== q.correctIndex);
      return L[q.correctIndex] - d.reduce((a, b) => a + b, 0) / d.length;
    }).sort((a, b) => a - b);
    const median = deltas[Math.floor(deltas.length / 2)];
    const mean = deltas.reduce((a, b) => a + b, 0) / deltas.length;
    expect(Math.abs(median), `median length delta ${median.toFixed(1)} chars`).toBeLessThanOrEqual(6);
    expect(Math.abs(mean), `mean length delta ${mean.toFixed(1)} chars`).toBeLessThanOrEqual(6);
  });

  it('lexical stem-overlap does not identify the credited choice', () => {
    let wins = 0;
    for (const q of QUESTIONS) {
      const stemT = tokenSet(`${q.stem} ${q.stimulus ?? ''}`);
      const overlaps = q.choices.map((_, i) => {
        const ct = tokenSet(choiceText(q, i));
        let n = 0;
        for (const w of ct) if (stemT.has(w)) n++;
        return n;
      });
      const dMax = Math.max(...overlaps.filter((_, i) => i !== q.correctIndex));
      if (overlaps[q.correctIndex] > dMax) wins++;
    }
    const rate = wins / N;
    expect(rate, `max-overlap-correct ${(rate * 100).toFixed(1)}%`).toBeLessThanOrEqual(0.30);
  });

  it('surface-only classifier cannot find the answer (10-fold CV ≤ 27%)', () => {
    // Per-choice cosmetic features only — no semantics:
    //   [bias, len, uniqueLongest, uniqueShortest, position, stemOverlap, lenVsSiblings]
    // Metric: PER-QUESTION argmax accuracy (predict the choice with the
    // highest P(correct)); chance = 20%. Plain per-choice accuracy is useless
    // here — predicting "wrong" for everything already scores 80%.
    const X: number[][] = [];
    const meta: { q: number; i: number; ci: number }[] = [];
    QUESTIONS.forEach((q, qi) => {
      const L = lengthsOf(q);
      const mx = Math.max(...L), mn = Math.min(...L);
      const stemT = tokenSet(`${q.stem} ${q.stimulus ?? ''}`);
      q.choices.forEach((_, i) => {
        const ct = tokenSet(choiceText(q, i));
        let ov = 0;
        for (const w of ct) if (stemT.has(w)) ov++;
        X.push([
          1, L[i] / 100,
          L[i] === mx && L.filter((x) => x === mx).length === 1 ? 1 : 0,
          L[i] === mn && L.filter((x) => x === mn).length === 1 ? 1 : 0,
          i / 4, ov / 10,
          (L[i] - (L.reduce((a, b) => a + b, 0) - L[i]) / 4) / 100,
        ]);
        meta.push({ q: qi, i, ci: q.correctIndex });
      });
    });
    const acc = crossValidatedPickAccuracy(X, meta, 10, 42);
    expect(acc, `surface classifier pick-accuracy ${(acc * 100).toFixed(1)}%`).toBeLessThanOrEqual(0.27);
    expect(acc).toBeGreaterThanOrEqual(0.13);
  });
});

/** 10-fold CV logistic regression scored by per-question argmax accuracy. */
function crossValidatedPickAccuracy(
  X: number[][], meta: { q: number; i: number; ci: number }[], folds: number, seed: number,
): number {
  // Fold on QUESTIONS, not choices, so no leakage across a question's choices.
  const qIds = [...new Set(meta.map((m) => m.q))];
  let s = seed;
  const rand = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  for (let i = qIds.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [qIds[i], qIds[j]] = [qIds[j], qIds[i]];
  }
  const foldOf = new Map<number, number>();
  qIds.forEach((q, k) => foldOf.set(q, Math.floor((k * folds) / qIds.length)));
  const y = meta.map((m) => (m.i === m.ci ? 1 : 0));
  const dim = X[0].length;
  let correct = 0, total = 0;
  for (let f = 0; f < folds; f++) {
    const testRows: number[] = [];
    const trainRows: number[] = [];
    meta.forEach((m, r) => ((foldOf.get(m.q) === f ? testRows : trainRows).push(r)));
    const w = new Array(dim).fill(0);
    for (let iter = 0; iter < 400; iter++) {
      const g = new Array(dim).fill(0);
      for (const r of trainRows) {
        const z = X[r].reduce((a, x, j) => a + x * w[j], 0);
        const p = 1 / (1 + Math.exp(-z));
        for (let j = 0; j < dim; j++) g[j] += (p - y[r]) * X[r][j];
      }
      for (let j = 0; j < dim; j++) w[j] -= (0.5 * g[j]) / trainRows.length;
    }
    // Per test question: pick the choice with the highest score.
    const byQ = new Map<number, { best: number; bestScore: number; ci: number }>();
    for (const r of testRows) {
      const z = X[r].reduce((a, x, j) => a + x * w[j], 0);
      const m = meta[r];
      const cur = byQ.get(m.q);
      if (!cur || z > cur.bestScore) byQ.set(m.q, { best: m.i, bestScore: z, ci: m.ci });
    }
    for (const { best, ci } of [...byQ.values()].map((v) => ({ best: v.best, ci: v.ci }))) {
      total++;
      if (best === ci) correct++;
    }
  }
  return correct / total;
}
