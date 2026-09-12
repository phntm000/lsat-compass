/**
 * Official Calibration (Part XXXIII) — discrepancy insights between
 * internal practice evidence and official LawHub PrepTest performance.
 *
 * Governing rules:
 *  - Official and internal evidence are NEVER merged. Internal accuracy and
 *    official scores live in separate lanes; this module only compares them.
 *  - Official evidence is INSUFFICIENT until at least one official log
 *    exists. No "Test-Day Ready" verdict may be derived from internal
 *    questions alone.
 *  - Insights describe discrepancies; they never predict scores.
 */
import type { OfficialPracticeLog, QuestionAttemptRecord } from './db-schema';

export type SectionKind = 'LR' | 'RC';

export interface LaneAccuracy {
  n: number;
  correct: number;
  acc: number | null; // null when n === 0
}

export interface CalibrationInsight {
  id: string;
  kind:
    | 'insufficient-official'
    | 'gap-warn'
    | 'gap-ok'
    | 'mastery-not-transferring'
    | 'official-trend';
  severity: 'info' | 'warn' | 'good';
  title: string;
  body: string;
}

function accOf(n: number, correct: number): number | null {
  return n === 0 ? null : correct / n;
}

/** Internal lane: timed + exam-simulation attempts only (not guided/drill). */
export function internalTimedAccuracy(
  attempts: QuestionAttemptRecord[],
  kind: SectionKind,
): LaneAccuracy {
  let n = 0, correct = 0;
  for (const a of attempts) {
    if (a.mode !== 'timed' && a.mode !== 'test') continue;
    const isLR = a.questionId.startsWith('lr-');
    const isRC = a.questionId.startsWith('rc-');
    if ((kind === 'LR' && !isLR) || (kind === 'RC' && !isRC)) continue;
    n++;
    if (a.correct) correct++;
  }
  return { n, correct, acc: accOf(n, correct) };
}

/** Official lane: LawHub PrepTest logs. Never mixed with internal data. */
export function officialAccuracy(
  logs: OfficialPracticeLog[],
  kind: SectionKind,
): LaneAccuracy {
  let n = 0, correct = 0;
  for (const log of logs) {
    if (kind === 'LR') {
      if (log.lr1Correct != null && log.lr1Total != null) { correct += log.lr1Correct; n += log.lr1Total; }
      if (log.lr2Correct != null && log.lr2Total != null) { correct += log.lr2Correct; n += log.lr2Total; }
    } else {
      if (log.rcCorrect != null && log.rcTotal != null) { correct += log.rcCorrect; n += log.rcTotal; }
    }
  }
  return { n, correct, acc: accOf(n, correct) };
}

const pct = (x: number) => Math.round(x * 100);

export function officialEvidenceStatus(logs: OfficialPracticeLog[]): {
  status: 'INSUFFICIENT' | 'PROVISIONAL' | 'SUFFICIENT';
  logCount: number;
} {
  const logCount = logs.length;
  return {
    logCount,
    status: logCount === 0 ? 'INSUFFICIENT' : logCount < 3 ? 'PROVISIONAL' : 'SUFFICIENT',
  };
}

export interface CalibrationInput {
  attempts: QuestionAttemptRecord[];
  logs: OfficialPracticeLog[];
  /** Skill ids currently in 'mastered' state (internal). */
  masteredSkillIds: string[];
  /** Human-readable skill labels keyed by skill id, for transfer checks. */
  skillLabels: Record<string, string>;
}

/**
 * Transfer-validation rule: an internally-mastered skill that appears in
 * the learner's own "question types missed" on official tests is flagged
 * as not transferring. Matching is keyword-based over the learner's
 * free-text entry — conservative by design (only flags clear mentions).
 */
function masteredButMissedOfficially(
  input: CalibrationInput,
): CalibrationInsight[] {
  const out: CalibrationInsight[] = [];
  if (input.masteredSkillIds.length === 0 || input.logs.length === 0) return out;
  const missedText = input.logs
    .map((l) => `${l.questionTypes} ${l.reasonsMissed}`.toLowerCase())
    .join(' | ');
  if (!missedText.trim()) return out;
  const flagged: string[] = [];
  for (const sid of input.masteredSkillIds) {
    const label = (input.skillLabels[sid] ?? sid).toLowerCase();
    const keywords = label.split(/[^a-z]+/).filter((w) => w.length > 3);
    // Flag when ≥2 distinctive keywords from the skill label appear.
    const hits = keywords.filter((w) => missedText.includes(w));
    if (hits.length >= 2) flagged.push(input.skillLabels[sid] ?? sid);
  }
  if (flagged.length > 0) {
    out.push({
      id: 'mastery-not-transferring',
      kind: 'mastery-not-transferring',
      severity: 'warn',
      title: 'Mastery not transferring to official material',
      body:
        `These skills show as mastered in app practice but appear in your ` +
        `official missed-types notes: ${flagged.join('; ')}. Internal mastery ` +
        `has not transferred — revisit them with official PrepTest questions ` +
        `and re-prove each one under timed conditions.`,
    });
  }
  return out;
}

function officialTrend(logs: OfficialPracticeLog[]): CalibrationInsight[] {
  const scored = logs
    .filter((l) => l.scaledScore != null)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (scored.length < 3) return [];
  const first = scored[0].scaledScore!;
  const last = scored[scored.length - 1].scaledScore!;
  const delta = last - first;
  if (delta >= 3) {
    return [{
      id: 'official-trend-up', kind: 'official-trend', severity: 'good',
      title: 'Official scores trending up',
      body: `Your logged scaled scores rose from ${first} to ${last} across ${scored.length} PrepTests. Official evidence — the only kind that counts for readiness — is moving the right way.`,
    }];
  }
  if (delta <= -3) {
    return [{
      id: 'official-trend-down', kind: 'official-trend', severity: 'warn',
      title: 'Official scores trending down',
      body: `Your logged scaled scores fell from ${first} to ${last} across ${scored.length} PrepTests. Consider whether recent study changes transferred, and log what differed on test day in each entry's notes.`,
    }];
  }
  return [];
}

export function computeCalibration(input: CalibrationInput): CalibrationInsight[] {
  const insights: CalibrationInsight[] = [];
  const { status, logCount } = officialEvidenceStatus(input.logs);

  if (status === 'INSUFFICIENT') {
    insights.push({
      id: 'insufficient-official',
      kind: 'insufficient-official',
      severity: 'info',
      title: 'Official evidence: INSUFFICIENT',
      body:
        'No LawHub PrepTest is logged yet. Internal practice metrics cannot establish test-day readiness — only official material can. Take a timed PrepTest on LawHub and log it (More → Official practice log) to activate calibration.',
    });
    return insights; // Nothing else is comparable without an official lane.
  }

  for (const kind of ['LR', 'RC'] as SectionKind[]) {
    const internal = internalTimedAccuracy(input.attempts, kind);
    const official = officialAccuracy(input.logs, kind);
    if (internal.acc === null || internal.n < 10 || official.acc === null) continue;
    const gap = internal.acc - official.acc;
    if (gap >= 0.1) {
      insights.push({
        id: `gap-warn-${kind}`,
        kind: 'gap-warn',
        severity: 'warn',
        title: `${kind}: internal accuracy exceeds official by ${pct(gap)} pts`,
        body:
          `Timed in-app ${kind}: ${pct(internal.acc)}% over ${internal.n} questions. ` +
          `Official ${kind}: ${pct(official.acc)}% over ${official.n} questions. ` +
          `A gap this large suggests in-app items are easier or more familiar than official material. ` +
          `Treat internal ${kind} mastery as provisional and prioritize official PrepTests for this section.`,
      });
    } else if (gap <= -0.05) {
      insights.push({
        id: `gap-ok-${kind}`,
        kind: 'gap-ok',
        severity: 'good',
        title: `${kind}: official performance matches or beats internal`,
        body:
          `Official ${kind} (${pct(official.acc)}%) is at or above timed in-app ${kind} (${pct(internal.acc)}%). ` +
          `Your preparation is transferring to official material — the strongest signal this app can show.`,
      });
    }
  }

  if (status === 'PROVISIONAL') {
    insights.push({
      id: 'provisional-note',
      kind: 'insufficient-official',
      severity: 'info',
      title: `Official evidence: PROVISIONAL (${logCount} logged)`,
      body:
        'Calibration is active but thin. Log at least 3 PrepTests for stable discrepancy signals — a single test can reflect a bad day as easily as a real gap.',
    });
  }

  insights.push(...masteredButMissedOfficially(input));
  insights.push(...officialTrend(input.logs));
  return insights;
}
