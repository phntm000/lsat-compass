/**
 * Content-backed QuestionProvider for the session composer (engine/session.ts).
 * Pure functions over the bundled original content bank — no DB, no React.
 */
import type { QuestionProvider } from '../engine/session';
import { QUESTIONS, DRILLS, PASSAGES, CONTRAST_DRILLS, FOUNDATION_DRILLS, getQuestion, getDrill } from '../content';

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed >>> 0 || 1;
  const rand = () => (s = (s * 1_664_525 + 1_013_904_223) >>> 0) / 0xffffffff;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const contentProvider: QuestionProvider = {
  pickById(qid) {
    const q = getQuestion(qid);
    if (!q) return undefined;
    return {
      id: q.id,
      skillIds: [q.questionType, ...(q.secondarySkills ?? [])],
      difficulty: q.editorialDifficulty,
      estMin: Math.max(1, Math.round((q.estimatedSeconds ?? 90) / 60)),
    };
  },
  pick(skillId, n, diffMin, diffMax, excludeIds, seenIds) {
    const excluded = new Set(excludeIds);
    const pool = QUESTIONS.filter(
      (q) =>
        (q.questionType === skillId || q.secondarySkills.includes(skillId)) &&
        q.editorialDifficulty >= diffMin &&
        q.editorialDifficulty <= diffMax &&
        !excluded.has(q.id),
    );
    const unseen = pool.filter((q) => !seenIds.has(q.id));
    const src = unseen.length > 0 ? unseen : pool;
    // Deterministic-ish variety: rotate by day so repeats feel fresh.
    const rotated = shuffle(src, Math.floor(Date.now() / 86_400_000));
    return rotated.slice(0, n).map((q) => ({
      id: q.id,
      skillIds: [q.questionType, ...q.secondarySkills],
      difficulty: q.editorialDifficulty,
      estMin: Math.max(1, Math.round(q.estimatedSeconds / 60)),
    }));
  },

  pickPassageSet(n, excludeIds) {
    const excluded = new Set(excludeIds);
    const pool = PASSAGES.filter((p) => !excluded.has(p.id));
    // Topic-cluster guard (P1-4): never serve two passages from the same
    // topic cluster (e.g. two plea-bargaining passages) in one section.
    const picked: typeof pool = [];
    const usedClusters = new Set<string>();
    for (const p of pool) {
      if (picked.length >= n) break;
      const cluster = (p as { topicCluster?: string }).topicCluster;
      if (cluster && usedClusters.has(cluster)) continue;
      if (cluster) usedClusters.add(cluster);
      picked.push(p);
    }
    // If the guard starved the set (shouldn't with 25 passages), fill
    // remaining slots without the guard rather than shorting the section.
    if (picked.length < n) {
      for (const p of pool) {
        if (picked.length >= n) break;
        if (!picked.includes(p)) picked.push(p);
      }
    }
    return picked.slice(0, n).map((p) => ({
      id: p.id,
      questionIds: p.questionIds,
      estMin: p.estimatedMinutes,
    }));
  },

  pickDrills(skillIds, n, excludeIds) {
    const excluded = new Set(excludeIds);
    const pool = FOUNDATION_DRILLS.filter(
      (d) =>
        d.skillIds.some((s) => skillIds.includes(s)) &&
        !excluded.has(d.id),
    );
    return pool.slice(0, n).map((d) => ({
      id: d.id,
      skillIds: d.skillIds,
      estMin: 1,
    }));
  },

  pickContrast(pair, n) {
    let pool = CONTRAST_DRILLS;
    if (pair) {
      const ids = pair.split(' vs ').map((s) => s.trim());
      const matched = pool.filter((d) => ids.every((id) => d.skillIds.includes(id)));
      if (matched.length > 0) pool = matched;
    }
    return pool.slice(0, n).map((d) => ({
      id: d.id,
      skillIds: d.skillIds,
      estMin: 1,
    }));
  },
};

/** Convenience re-exports so UI code has one import point for content reads. */
export { getQuestion, getDrill };
export { QUESTIONS, DRILLS, PASSAGES };
