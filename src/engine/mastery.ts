/**
 * Mastery model — multidimensional edition (Parts XXI, XXII).
 *
 * A single 0–100 score hides the most educationally important distinctions:
 * a learner may understand a concept (high acquisition) yet fail to
 * recognize it unlabeled (low discrimination) or under time (low timed
 * execution). We therefore track five separate evidence dimensions per
 * skill and only then blend them into an overall score:
 *
 *   acquisition    — guided + blocked independent performance (quality-weighted)
 *   retention      — delayed retrieval (gap ≥ 3 days since last practice)
 *   discrimination — unlabeled mixed/interleaved performance
 *   transfer       — structurally novel transfer items (or mixed first-attempts
 *                    on unseen items, until dedicated transfer items exist)
 *   timedExecution — timed practice and exam-simulation performance
 *
 * Evidence weighting (Part XXII):
 *   guided correct after 3 hints      → small update (q already discounted)
 *   first-attempt independent correct → moderate update
 *   delayed mixed correct             → large update (context multiplier)
 *   novel transfer correct            → large update (context multiplier)
 *   high-confidence wrong             → misconception update (severity + penalty)
 *   correct after answer exposure     → no mastery credit (q = 0)
 *   repeated identical structure      → diminishing value (q × 0.5)
 *
 * The overall score renormalizes over dimensions that actually have
 * evidence. 'mastered' state additionally requires discrimination AND
 * (transfer OR timed) evidence — mastery can never be earned from blocked
 * questions alone (Part XXI).
 */
import { DAY_MS, emptyEvidence } from './types';
import type {
  AttemptInput, AttemptMode, EvidenceRecord, ItemPurposeTag, MasteryResult,
  MasteryState, SkillEvidence,
} from './types';

const MAX_RECORDS = 40;
const RECENCY_HALFLIFE_DAYS = 14;

/** Per-attempt evidence quality q ∈ [0,1] and miss severity sev ≥ 0. */
export function scoreAttempt(a: AttemptInput): { q: number; sev: number } {
  if (a.revealedSolution) {
    // Saw the answer before submitting: recorded, but earns nothing.
    return { q: 0, sev: a.correct ? 0 : 0.5 };
  }
  if (a.correct) {
    let q = 1;
    if (a.confidence <= 2) q *= 0.55;            // guessed or shaky correct
    else if (a.confidence === 3) q *= 0.85;
    // Guided help discounts steeply: three hints ≈ nearly-given answer.
    if (a.hintsUsed > 0) q *= Math.max(0.25, 1 - 0.25 * a.hintsUsed);
    const ratio = a.responseTimeMs / 1000 / Math.max(1, a.estimatedSeconds);
    if (ratio > 2.5) q *= 0.7;                   // very slow correct
    if (a.changedAnswer && a.changedDirection === 'wrong-to-right') q *= 0.85;
    if (!a.firstAttemptOnQuestion) q *= 0.5;     // repeat exposure
    return { q: round2(q), sev: 0 };
  }
  // Wrong answer: q = 0, severity grows with confidence & bad changes.
  let sev = 1;
  if (a.confidence >= 4) sev += 0.7;             // confident misconception
  else if (a.confidence === 3) sev += 0.25;
  if (a.changedAnswer && a.changedDirection === 'right-to-wrong') sev += 0.5;
  if (a.hintsUsed > 0) sev *= 0.85;             // struggled openly, slightly less severe
  return { q: 0, sev: round2(sev) };
}

export function recordAttempt(
  prev: SkillEvidence | null,
  a: AttemptInput,
): SkillEvidence {
  const ev: SkillEvidence = prev ?? emptyEvidence(a.skillIds[0] ?? 'unknown');
  const { q, sev } = scoreAttempt(a);
  const gapDays = ev.lastPracticed === 0
    ? 0
    : Math.max(0, (a.timestamp - ev.lastPracticed) / DAY_MS);

  const rec: EvidenceRecord = {
    t: a.timestamp, q, sev, diff: a.difficulty, mode: a.mode,
    conf: a.confidence, gapDays,
    first: a.firstAttemptOnQuestion,
    purpose: a.purpose ?? null,
  };
  const records = [...ev.records, rec].slice(-MAX_RECORDS);

  // FSRS-inspired stability update (simplified, deterministic).
  let s = ev.stabilityDays;
  if (q >= 0.6) s = clamp(s * (1.35 + q * 0.9), 1, 180);
  else if (q < 0.4) s = Math.max(1, s * 0.45);
  // else: partial credit holds stability

  return {
    ...ev,
    attempts: ev.attempts + 1,
    records,
    lastPracticed: a.timestamp,
    stabilityDays: round2(s),
    dueAt: a.timestamp + s * DAY_MS,
  };
}

// ---------------------------------------------------------------------------
// Dimension classification
// ---------------------------------------------------------------------------

const TIMED: AttemptMode[] = ['timed', 'test'];
const TRANSFER_PURPOSES: ItemPurposeTag[] = ['transfer'];

function isTransfer(r: EvidenceRecord): boolean {
  if (r.purpose && (TRANSFER_PURPOSES as string[]).includes(r.purpose)) return true;
  // Approximation until dedicated transfer items exist: an unlabeled,
  // first-attempt mixed item exercises recognition, the core of transfer.
  return r.mode === 'mixed' && r.first === true;
}

/** Context multiplier: how much this record should move its dimension. */
function contextWeight(r: EvidenceRecord): number {
  let w = 1;
  if (r.mode === 'learning') w *= 0.7;          // guided: small updates
  if (r.mode === 'mixed') w *= 1.2;             // unlabeled: larger updates
  if (isTransfer(r)) w *= 1.5;                  // novel transfer: large updates
  if (r.gapDays >= 7) w *= 1.4;                 // long-delay retrieval
  else if (r.gapDays >= 3) w *= 1.25;           // delayed retrieval
  return w;
}

function dimensionMean(
  records: EvidenceRecord[], now: number,
  pick: (r: EvidenceRecord) => boolean,
): { value: number | null; n: number } {
  let wSum = 0, qSum = 0, n = 0;
  for (const r of records) {
    if (!pick(r)) continue;
    n++;
    const ageDays = Math.max(0, (now - r.t) / DAY_MS);
    const w = Math.pow(0.5, ageDays / RECENCY_HALFLIFE_DAYS) * contextWeight(r);
    wSum += w; qSum += w * r.q;
  }
  return { value: wSum === 0 ? null : qSum / wSum, n };
}

export function computeMastery(ev: SkillEvidence, now: number): MasteryResult {
  const rs = ev.records;

  const acquisition = dimensionMean(rs, now, r =>
    r.mode === 'learning' || r.mode === 'drill' ||
    (r.mode === 'review' && !isTransfer(r)));
  const retention = dimensionMean(rs, now, r => r.gapDays >= 3);
  const discrimination = dimensionMean(rs, now, r => r.mode === 'mixed');
  const transfer = dimensionMean(rs, now, isTransfer);
  const timedExecution = dimensionMean(rs, now, r => TIMED.includes(r.mode));

  // Confidence calibration: high-confidence error rate.
  let hcWrong = 0, hcN = 0;
  for (const r of rs) {
    if (r.conf >= 4) { hcN++; if (r.q < 0.5) hcWrong++; }
  }
  const highConfWrongRate = hcN >= 5 ? hcWrong / hcN : null;

  const maxDifficultySeen = rs.reduce((m, r) => Math.max(m, r.diff), 0);

  // Overall score: weighted blend of dimensions with evidence; weights
  // renormalize over non-null dimensions. Discrimination, transfer, and
  // timed execution carry the most weight because they predict test-day
  // performance; acquisition alone cannot produce a high score.
  const parts: [number, number | null][] = [
    [0.20, acquisition.value],
    [0.15, retention.value],
    [0.25, discrimination.value],
    [0.20, transfer.value],
    [0.20, timedExecution.value],
  ];
  let wSum = 0, vSum = 0;
  for (const [w, v] of parts) if (v !== null) { wSum += w; vSum += w * v; }
  let score = wSum > 0 ? (vSum / wSum) * 100 : 0;

  // Difficulty cap: easy-only evidence cannot claim high mastery.
  if (ev.attempts >= 5) {
    if (maxDifficultySeen <= 2) score = Math.min(score, 70);
    else if (maxDifficultySeen <= 3) score = Math.min(score, 85);
  }

  // Calibration penalty: confident-but-wrong is a misconception signal.
  if (highConfWrongRate !== null) score -= Math.min(18, highConfWrongRate * 30);

  score = round2(clamp(score, 0, 100));

  const delayedSuccess = rs.filter(r => r.gapDays >= 3 && r.q >= 0.6).length;
  const delayedTotal = rs.filter(r => r.gapDays >= 3).length;

  let state: MasteryState;
  if (ev.attempts < 3) state = 'new';
  else if (
    (ev.prevState === 'stable' || ev.prevState === 'mastered' || ev.prevState === 'lapsed') &&
    acquisition.value !== null && acquisition.value < 0.55
  ) state = 'lapsed';
  // Mastered REQUIRES discrimination evidence plus transfer or timed proof —
  // blocked practice alone can never earn it (Part XXI).
  else if (
    score >= 88 &&
    discrimination.n >= 3 && (discrimination.value ?? 0) >= 0.7 &&
    ((transfer.n >= 2 && (transfer.value ?? 0) >= 0.6) ||
     (timedExecution.n >= 3 && (timedExecution.value ?? 0) >= 0.7)) &&
    delayedSuccess >= 1 && maxDifficultySeen >= 3
  ) state = 'mastered';
  else if (score >= 75 && discrimination.n >= 2 && delayedTotal >= 1) state = 'stable';
  else if (score >= 60) state = 'developing';
  else state = 'learning';

  const pct = (v: number | null) => (v === null ? null : round2(v * 100));
  return {
    score, state,
    dimensions: {
      acquisition: pct(acquisition.value),
      retention: pct(retention.value),
      discrimination: pct(discrimination.value),
      transfer: pct(transfer.value),
      timedExecution: pct(timedExecution.value),
    },
    dimensionN: {
      acquisition: acquisition.n,
      retention: retention.n,
      discrimination: discrimination.n,
      transfer: transfer.n,
      timedExecution: timedExecution.n,
    },
    highConfWrongRate: highConfWrongRate === null ? null : round2(highConfWrongRate),
    maxDifficultySeen,
    dueAt: ev.dueAt,
    stabilityDays: ev.stabilityDays,
  };
}

/** Apply lapse bookkeeping when state transitions into lapsed. */
export function withLapseBookkeeping(ev: SkillEvidence, m: MasteryResult): SkillEvidence {
  if (m.state === 'lapsed' && ev.prevState !== 'lapsed') {
    return { ...ev, lapses: ev.lapses + 1, prevState: 'lapsed', stabilityDays: 1,
             dueAt: ev.lastPracticed + DAY_MS };
  }
  if (m.state !== ev.prevState) return { ...ev, prevState: m.state };
  return ev;
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}
function round2(x: number): number { return Math.round(x * 100) / 100; }
