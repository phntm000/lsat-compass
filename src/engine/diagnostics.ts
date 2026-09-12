/**
 * Deterministic insight rules (§43), readiness profile (§63), and weekly
 * review computation (§89). Rule-based — no black boxes. Each insight
 * explains the exact evidence behind it.
 */
import type { MasteryResult } from './types';

export interface InsightInput {
  masteryBySkill: Record<string, MasteryResult>;
  timedAccuracyByDomain: { LR: number | null; RC: number | null };
  untimedAccuracyByDomain: { LR: number | null; RC: number | null };
  avgResponseRatio: number | null; // responseTime / estimated
  changedRightToWrong: number;
  totalAttempts: number;
  recentTrend: number | null; // accuracy last 7d minus prior 7d, in points
  officialLogs: number;
}

export interface Insight {
  id: string;
  title: string;
  body: string;
  severity: 'info' | 'watch' | 'act';
  skillIds: string[];
}

function acc(m?: MasteryResult): number | null {
  if (!m) return null;
  // Prefer discrimination (unlabeled performance) as the accuracy signal;
  // fall back to acquisition when nothing else exists.
  return m.dimensions.discrimination ?? m.dimensions.acquisition;
}

export function diagnosticInsights(inp: InsightInput): Insight[] {
  const out: Insight[] = [];
  const M = inp.masteryBySkill;

  const na = acc(M['lr-necessary-assumption']);
  const st = acc(M['lr-strengthen']);
  if (na !== null && st !== null && na < 60 && st > 75) {
    out.push({
      id: 'na-vs-strengthen', title: 'Necessary vs. merely helpful',
      body: 'You understand how evidence can support a conclusion, but Necessary ' +
        'Assumption questions remain weaker. Review the difference between ' +
        'information that helps an argument and information the argument actually ' +
        'requires — try negating each answer choice.',
      severity: 'act', skillIds: ['lr-necessary-assumption', 'lr-nec-vs-suff'],
    });
  }

  const rcU = inp.untimedAccuracyByDomain.RC, rcT = inp.timedAccuracyByDomain.RC;
  if (rcU !== null && rcT !== null && rcU >= 0.8 && rcT <= 0.65) {
    out.push({
      id: 'rc-timed-gap', title: 'RC comprehension is strong; pacing lags',
      body: 'Your untimed comprehension is substantially stronger than your timed ' +
        'performance. Prioritize passage pacing and question triage rather than ' +
        'relearning RC concepts.',
      severity: 'act', skillIds: ['rc-passage-map'],
    });
  }

  const cond = M['f-conditional'] ?? M['f-translate'];
  if (cond && (cond.highConfWrongRate ?? 0) >= 0.35) {
    out.push({
      id: 'cond-misconception', title: 'High-confidence conditional errors',
      body: 'You are missing conditional-reasoning questions while feeling sure ' +
        'of your answers — a classic misconception signal. Revisit sufficient vs. ' +
        'necessary conditions (especially "only if" and "unless") before ' +
        'continuing with advanced LR.',
      severity: 'act', skillIds: ['f-conditional', 'f-translate'],
    });
  }

  const rev = acc(M['f-conditional']);
  const mst = acc(M['lr-must-be-true']);
  if (rev !== null && mst !== null && rev < 55 && mst < 60) {
    out.push({
      id: 'reversal-pattern', title: 'Conditional reversal pattern',
      body: 'You are missing questions after reversing a conditional relationship ' +
        '(treating "if A then B" as "if B then A"). Slow down on "only if" and ' +
        'contrapositive translations.',
      severity: 'watch', skillIds: ['f-conditional'],
    });
  }

  if (inp.totalAttempts >= 20 && inp.changedRightToWrong / inp.totalAttempts > 0.08) {
    out.push({
      id: 'second-guess', title: 'Changing right answers to wrong ones',
      body: 'You change correct answers to incorrect ones unusually often. ' +
        'Trust your first careful read — only change an answer when you can ' +
        'name the specific error in your first choice.',
      severity: 'watch', skillIds: [],
    });
  }

  if ((inp.avgResponseRatio ?? 0) > 1.8 && (inp.untimedAccuracyByDomain.LR ?? 0) > 0.7) {
    out.push({
      id: 'slow-accurate', title: 'Accurate but slow',
      body: 'Your LR accuracy is solid but you take nearly twice the budgeted ' +
        'time. You are ready for paced sets — speed will come from pattern ' +
        'recognition, not rushing.',
      severity: 'info', skillIds: [],
    });
  }

  const flaw = acc(M['lr-flaw']);
  const caus = acc(M['f-causation']);
  if (flaw !== null && caus !== null && flaw < 60 && caus < 65) {
    out.push({
      id: 'causal-flaw', title: 'Causal flaws need work',
      body: 'Flaw questions involving causal reasoning are a weak spot. Review ' +
        'alternative causes, reverse causation, and correlation-vs-causation ' +
        'before more flaw drills.',
      severity: 'act', skillIds: ['f-causation', 'lr-flaw'],
    });
  }

  if (inp.recentTrend !== null && inp.recentTrend <= -8 && inp.totalAttempts >= 40) {
    out.push({
      id: 'trend-down', title: 'Accuracy dipped this week',
      body: 'Your accuracy fell recently. This often means new, harder material ' +
        'rather than lost skill — check whether you moved up in difficulty, ' +
        'and keep reviewing errors deeply.',
      severity: 'watch', skillIds: [],
    });
  }

  const suff = acc(M['lr-sufficient-assumption']);
  if (suff !== null && suff < 60 && (na ?? 100) >= 70) {
    out.push({
      id: 'sa-weak', title: 'Sufficient Assumption is the gap',
      body: 'Necessary Assumption is stronger than Sufficient Assumption for you. ' +
        'For Sufficient Assumption, look for the choice that closes the logical ' +
        'gap completely — the conclusion must follow, not merely get support.',
      severity: 'act', skillIds: ['lr-sufficient-assumption', 'lr-nec-vs-suff'],
    });
  }

  if (inp.officialLogs === 0 && inp.totalAttempts >= 200) {
    out.push({
      id: 'official-nudge', title: 'Time to calibrate officially',
      body: 'You have solid practice volume. Take a free official LawHub section ' +
        'and log it — official questions are the best calibration for the real exam.',
      severity: 'info', skillIds: [],
    });
  }

  return out;
}

export interface ReadinessInput {
  masteryBySkill: Record<string, MasteryResult>;
  timedSectionCount: number;
  timedAccuracy: number | null;
  officialLogs: number;
  studyDaysLast14: number;
  highConfWrongRate: number | null;
}

export interface ReadinessProfile {
  overall: number; // 0..100 INTERNAL metric — never presented as an LSAT score
  components: { label: string; value: number | null; note: string }[];
  gates: { label: string; met: boolean; detail: string }[];
}

function meanSkills(M: Record<string, MasteryResult>, prefix: string): number | null {
  const vs = Object.entries(M).filter(([k]) => k.startsWith(prefix))
    .map(([, m]) => m.score);
  return vs.length ? vs.reduce((a, b) => a + b, 0) / vs.length : null;
}

/** Internal readiness metric (§63). Explicitly NOT an LSAT score prediction. */
export function readinessProfile(inp: ReadinessInput): ReadinessProfile {
  const M = inp.masteryBySkill;
  const conceptual = meanSkills(M, 'f-') ?? meanSkills(M, 'lr-') ?? 0;
  const lrMastery = meanSkills(M, 'lr-');
  const rcMastery = meanSkills(M, 'rc-');

  // Retention: share of non-new skills at developing+.
  const states = Object.values(M);
  const retention = states.length
    ? 100 * states.filter(m => ['developing', 'stable', 'mastered'].includes(m.state)).length / states.length
    : 0;
  const timing = inp.timedAccuracy === null ? null : Math.round(inp.timedAccuracy * 100);
  const transfer = lrMastery === null || rcMastery === null ? null
    : Math.round((lrMastery + rcMastery) / 2);

  const components = [
    { label: 'Conceptual mastery', value: Math.round(conceptual), note: 'Foundations + LR/RC skills' },
    { label: 'Retention', value: Math.round(retention), note: 'Skills at Developing or better' },
    { label: 'Timing', value: timing, note: timing === null ? 'No timed work yet' : 'Timed accuracy' },
    { label: 'Transfer', value: transfer, note: transfer === null ? 'Need LR and RC evidence' : 'Mixed-context performance' },
    { label: 'Official-test evidence', value: inp.officialLogs > 0 ? Math.min(100, inp.officialLogs * 25) : 0,
      note: inp.officialLogs > 0 ? `${inp.officialLogs} official log${inp.officialLogs > 1 ? 's' : ''}` : 'None logged yet' },
  ];
  const vals = components.map(c => c.value).filter((v): v is number => v !== null);
  const overall = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;

  const gates = [
    { label: 'Fundamentals at Developing+', met: conceptual >= 65, detail: `${Math.round(conceptual)}%` },
    { label: 'Timed section stability', met: inp.timedSectionCount >= 3, detail: `${inp.timedSectionCount} timed sections` },
    { label: 'Low high-confidence error rate', met: (inp.highConfWrongRate ?? 1) < 0.2,
      detail: inp.highConfWrongRate === null ? 'insufficient data' : `${Math.round((inp.highConfWrongRate ?? 0) * 100)}%` },
    { label: 'Recent practice volume', met: inp.studyDaysLast14 >= 6, detail: `${inp.studyDaysLast14}/14 days` },
    { label: 'Official practice consistency', met: inp.officialLogs >= 2, detail: `${inp.officialLogs} logged` },
  ];
  return { overall, components, gates };
}

export interface WeeklyReviewInput {
  minutesStudied: number;
  attempts: number;
  accuracyThen: number | null; // prior week
  accuracyNow: number | null;
  reviewsCompleted: number;
  strongest: { skillId: string; accuracy: number }[];
  weakest: { skillId: string; accuracy: number }[];
  topPattern: string | null;
  recommendation: string;
}

export function weeklyReviewSummary(w: WeeklyReviewInput): string[] {
  const lines: string[] = [];
  lines.push(`Study time: ${fmtDur(w.minutesStudied)}`);
  lines.push(`Questions: ${w.attempts}`);
  if (w.accuracyThen !== null && w.accuracyNow !== null) {
    lines.push(`Accuracy: ${Math.round(w.accuracyThen * 100)}% → ${Math.round(w.accuracyNow * 100)}%`);
  } else if (w.accuracyNow !== null) {
    lines.push(`Accuracy: ${Math.round(w.accuracyNow * 100)}%`);
  }
  lines.push(`Reviews completed: ${w.reviewsCompleted}`);
  if (w.strongest.length) {
    lines.push(`Strongest: ${w.strongest.slice(0, 3).map(s => `${label(s.skillId)} ${Math.round(s.accuracy * 100)}%`).join(' · ')}`);
  }
  if (w.weakest.length) {
    lines.push(`Needs work: ${w.weakest.slice(0, 3).map(s => `${label(s.skillId)} ${Math.round(s.accuracy * 100)}%`).join(' · ')}`);
  }
  if (w.topPattern) lines.push(`Important pattern: ${w.topPattern}`);
  lines.push(`Recommended next: ${w.recommendation}`);
  return lines;
}

function fmtDur(min: number): string {
  const h = Math.floor(min / 60), m = Math.round(min % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
function label(id: string): string {
  return id.replace(/^(f|lr|rc|w)-/, '').replace(/-/g, ' ');
}
