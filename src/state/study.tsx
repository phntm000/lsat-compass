/**
 * StudyProvider — the learning state spine of LSAT Compass.
 *
 * Owns: profile, XP/level, streak, per-skill evidence + mastery, review queue,
 * Today plan, diagnostic insights, readiness. Every attempt flows through
 * recordQuestionAttempt / recordDrillAttempt, which:
 *   1. scores the attempt with the mastery engine,
 *   2. updates per-skill evidence (with lapse bookkeeping),
 *   3. persists attempt + skill state to IndexedDB,
 *   4. awards XP and checks achievements,
 *   5. rebuilds all derived plans.
 *
 * All engine calls are pure/deterministic; this file is the only impure layer.
 */
import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import type { ReactNode } from 'react';
import { db, getProfile, recordActivity, studyDates, todayKey } from '../db/db';
import type {
  UserProfile, QuestionAttemptRecord, SkillStateRecord, PracticeSessionRecord,
} from '../engine/db-schema';
import { computeMastery, recordAttempt, withLapseBookkeeping } from '../engine/mastery';
import { emptyEvidence, DAY_MS } from '../engine/types';
import type {
  AttemptInput, AttemptMode, MasteryResult, SkillEvidence, SkillMeta,
} from '../engine/types';
import { buildReviewQueue } from '../engine/scheduler';
import type { ReviewPlan } from '../engine/scheduler';
import { buildTodayPlan } from '../engine/recommend';
import type { TodayPlan } from '../engine/recommend';
import {
  xpFor, levelFor, checkAchievements, updateStreak,
} from '../engine/gamification';
import type { AchievementDef, AchievementStats, XpEvent } from '../engine/gamification';
import { diagnosticInsights, readinessProfile } from '../engine/diagnostics';
import type { Insight, ReadinessProfile } from '../engine/diagnostics';
import { allSkills, LESSONS, getQuestion, getDrill, getLesson } from '../content';

/* ------------------------------------------------------------------ */
/* Public types                                                        */
/* ------------------------------------------------------------------ */

export interface QuestionAttemptParams {
  questionId: string;
  selectedChoice: number;
  responseTimeMs: number;
  confidence: 1 | 2 | 3 | 4 | 5 | null;
  mode: AttemptMode;
  hintsUsed: number;
  revealedSolution: boolean;
  changedAnswer: boolean;
  changedDirection?: 'wrong-to-right' | 'right-to-wrong';
  sessionId?: string | null;
  /**
   * Override computed correctness. Used for synthetic items (lesson
   * checkpoints) that have no content answer key — without this they would
   * always record as wrong.
   */
  correct?: boolean;
  /** Persist a user flag for later review (Error Lab, Second-Pass). */
  flagged?: boolean | null;
  /** override when the item isn't a content question (checkpoints, etc.) */
  skillIds?: string[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  estimatedSeconds?: number;
  questionVersion?: number;
  /** item purpose override (defaults to the content question's itemPurpose) */
  purpose?: import('../engine/types').ItemPurposeTag | null;
}

export interface AttemptOutcome {
  correct: boolean;
  firstAttempt: boolean;
  xpGained: number;
  newAchievements: AchievementDef[];
}

export interface DrillAttemptParams {
  drillId: string;
  correct: boolean;
  responseTimeMs: number;
  sessionId?: string | null;
}

export interface StudyContextValue {
  ready: boolean;
  profile: UserProfile | null;
  xp: number;
  level: number;
  levelName: string;
  nextLevelXp: number | null;
  streak: number;
  weeklyActive: number;
  mastery: Record<string, MasteryResult>;
  reviewPlan: ReviewPlan | null;
  todayPlan: TodayPlan | null;
  insights: Insight[];
  readiness: ReadinessProfile | null;
  lessonProgress: Record<string, 'done' | 'started'>;
  seenQuestionIds: Set<string>;
  recordQuestionAttempt(p: QuestionAttemptParams): Promise<AttemptOutcome>;
  recordDrillAttempt(p: DrillAttemptParams): Promise<AttemptOutcome>;
  recordCheckpoint(lessonId: string, index: number, correct: boolean): Promise<void>;
  completeLesson(
    lessonId: string, checkpointsCorrect: number, checkpointsTotal: number, minutes: number,
  ): Promise<{ xpGained: number; newAchievements: AchievementDef[] }>;
  startLesson(lessonId: string): Promise<void>;
  completeReviewSession(count: number, minutes: number): Promise<void>;
  completeContrastSession(
    itemCount: number, correctCount: number, minutes: number,
  ): Promise<{ xpGained: number; newAchievements: AchievementDef[] }>;
  logPracticeSession(rec: Omit<PracticeSessionRecord, 'id'>): Promise<void>;
  markExplanationReviewed(questionId: string): Promise<void>;
  updateProfile(patch: Partial<UserProfile>): Promise<void>;
  refresh(): Promise<void>;
}

const StudyContext = createContext<StudyContextValue | null>(null);

export function useStudy(): StudyContextValue {
  const v = useContext(StudyContext);
  if (!v) throw new Error('useStudy must be used inside StudyProvider');
  return v;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const CONFUSION_PARTNERS: Record<string, string> = {
  'lr-necessary-assumption': 'lr-sufficient-assumption',
  'lr-sufficient-assumption': 'lr-necessary-assumption',
  'lr-strengthen': 'lr-necessary-assumption',
  'lr-weaken': 'lr-flaw',
  'lr-flaw': 'lr-weaken',
  'lr-resolve-paradox': 'lr-strengthen',
  'lr-method': 'lr-argument-part',
  'lr-argument-part': 'lr-method',
  'lr-parallel-flaw': 'lr-flaw',
  'lr-parallel-reasoning': 'lr-method',
  'lr-point-at-issue': 'lr-argument-part',
  'f-conditional': 'f-translate',
  'f-translate': 'f-conditional',
  'lr-nec-vs-suff': 'lr-sufficient-assumption',
  'rc-main-point': 'rc-primary-purpose',
  'rc-primary-purpose': 'rc-main-point',
  'rc-inference': 'rc-detail',
  'rc-detail': 'rc-inference',
};

function recordToEv(r: SkillStateRecord): SkillEvidence {
  return {
    skillId: r.skillId, attempts: r.attempts, records: r.records,
    lastPracticed: r.lastPracticed, lapses: r.lapses,
    stabilityDays: r.stabilityDays, dueAt: r.dueAt, prevState: r.prevState,
  };
}

function evToRecord(ev: SkillEvidence): SkillStateRecord {
  return {
    skillId: ev.skillId, attempts: ev.attempts, records: ev.records,
    lastPracticed: ev.lastPracticed, lapses: ev.lapses,
    stabilityDays: ev.stabilityDays, dueAt: ev.dueAt, prevState: ev.prevState,
    exposureCount: 0,
  };
}

function confToProb(c: number): number {
  return { 1: 0.2, 2: 0.4, 3: 0.6, 4: 0.8, 5: 0.95 }[c] ?? 0.6;
}

function mean(xs: number[]): number | null {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

const skillMetaById = new Map<string, SkillMeta>(
  allSkills.map((s): [string, SkillMeta] => [
    s.id,
    { id: s.id, importance: s.importance, prerequisites: s.prerequisites },
  ]),
);

function metaFor(skillId: string): SkillMeta {
  return skillMetaById.get(skillId) ?? { id: skillId, importance: 2, prerequisites: [] };
}

function daysAgoKey(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return todayKey(d);
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function StudyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [weeklyActive, setWeeklyActive] = useState(0);
  const [mastery, setMastery] = useState<Record<string, MasteryResult>>({});
  const [reviewPlan, setReviewPlan] = useState<ReviewPlan | null>(null);
  const [todayPlan, setTodayPlan] = useState<TodayPlan | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [readiness, setReadiness] = useState<ReadinessProfile | null>(null);
  const [lessonProgress, setLessonProgress] = useState<Record<string, 'done' | 'started'>>({});
  const [seenQuestionIds, setSeenQuestionIds] = useState<Set<string>>(new Set());

  const evidenceRef = useRef<Record<string, SkillEvidence>>({});
  const lastAchCheck = useRef(0);

  /* ---------------- refresh: rebuild all derived state ---------------- */
  const refresh = useCallback(async () => {
    const now = Date.now();
    const prof = await getProfile();
    setProfile(prof);

    const rows = await db.skillStates.toArray();
    const ev: Record<string, SkillEvidence> = {};
    const m: Record<string, MasteryResult> = {};
    for (const r of rows) {
      const e = recordToEv(r);
      ev[r.skillId] = e;
      m[r.skillId] = computeMastery(e, now);
    }
    evidenceRef.current = ev;
    setMastery(m);

    const acts = await db.dailyActivity.toArray();
    setXp(acts.reduce((n, a) => n + a.xp, 0));

    const dates = await studyDates();
    const { streak: st, weeklyActive: wa } = updateStreak(dates, todayKey());
    setStreak(st);
    setWeeklyActive(wa);

    const lpRows = await db.lessonProgress.toArray();
    const lp: Record<string, 'done' | 'started'> = {};
    for (const r of lpRows) lp[r.lessonId] = r.completedAt ? 'done' : 'started';
    setLessonProgress(lp);

    const attempts = await db.attempts.orderBy('timestamp').toArray();
    setSeenQuestionIds(new Set(attempts.map((a) => a.questionId)));

    // Review queue.
    const absentDays = dates.length === 0 ? 0
      : Math.max(0, Math.round((now - Date.parse(dates[dates.length - 1] + 'T12:00:00')) / DAY_MS) - 1);
    const rp = buildReviewQueue(
      rows.map((r) => ({
        evidence: recordToEv(r),
        mastery: computeMastery(recordToEv(r), now),
        meta: metaFor(r.skillId),
      })),
      now,
      prof.preferredSessionMinutes,
      absentDays,
    );
    setReviewPlan(rp);

    // Accuracy aggregates for plans / insights / readiness.
    const last20 = attempts.slice(-20);
    const accOf = (list: QuestionAttemptRecord[]) =>
      list.length ? list.filter((a) => a.correct).length / list.length : null;
    const timedModes: AttemptMode[] = ['timed', 'test'];
    const recentTimedAccuracy = accOf(last20.filter((a) => timedModes.includes(a.mode)));
    const untimedList = last20.filter((a) => !timedModes.includes(a.mode));
    const untimedAccuracy = accOf(untimedList);

    const domainAcc = (timed: boolean | null, domain: 'LR' | 'RC'): number | null => {
      const list = attempts.filter((a) => {
        const isTimed = timedModes.includes(a.mode);
        if (timed !== null && isTimed !== timed) return false;
        return (a.skillIds[0] ?? '').startsWith(domain.toLowerCase() + '-');
      });
      return accOf(list);
    };
    const timedLR = domainAcc(true, 'LR');
    const timedRC = domainAcc(true, 'RC');
    const untimedLR = domainAcc(false, 'LR');
    const untimedRC = domainAcc(false, 'RC');

    const ratios: number[] = [];
    for (const a of attempts.slice(-100)) {
      const q = getQuestion(a.questionId);
      if (q) ratios.push(a.responseTimeMs / 1000 / q.estimatedSeconds);
    }
    const avgResponseRatio = mean(ratios);
    const changedRightToWrong = attempts.filter((a) => a.changedDirection === 'right-to-wrong').length;

    const weekAgo = now - 7 * DAY_MS;
    const twoWeeksAgo = now - 14 * DAY_MS;
    const last7 = attempts.filter((a) => a.timestamp >= weekAgo);
    const prev7 = attempts.filter((a) => a.timestamp >= twoWeeksAgo && a.timestamp < weekAgo);
    const a7 = accOf(last7);
    const ap7 = accOf(prev7);
    const recentTrend = a7 !== null && ap7 !== null ? Math.round((a7 - ap7) * 100) : null;

    const officialLogs = await db.officialLogs.count();

    const insightInput = {
      masteryBySkill: m,
      timedAccuracyByDomain: { LR: timedLR, RC: timedRC },
      untimedAccuracyByDomain: { LR: untimedLR, RC: untimedRC },
      avgResponseRatio,
      changedRightToWrong,
      totalAttempts: attempts.length,
      recentTrend,
      officialLogs,
    };
    const diags = diagnosticInsights(insightInput);
    setInsights(diags);

    // Readiness.
    const timedAtts = attempts.filter((a) => timedModes.includes(a.mode));
    const studyDaysLast14 = dates.filter((d) => d >= daysAgoKey(14)).length;
    const hcRates = Object.values(m)
      .map((x) => x.highConfWrongRate)
      .filter((v): v is number => v !== null);
    setReadiness(readinessProfile({
      masteryBySkill: m,
      timedSectionCount: await db.sessions.where('mode').equals('full-section').count(),
      timedAccuracy: accOf(timedAtts),
      officialLogs,
      studyDaysLast14,
      highConfWrongRate: mean(hcRates),
    }));

    // Today plan.
    const masteryBySkill: Record<string, { mastery: MasteryResult; evidence: SkillEvidence; meta: SkillMeta }> = {};
    for (const r of rows) {
      masteryBySkill[r.skillId] = {
        mastery: computeMastery(recordToEv(r), now),
        evidence: recordToEv(r),
        meta: metaFor(r.skillId),
      };
    }
    const remediationNeeded = diags
      .filter((i) => i.severity === 'act' && i.skillIds.length > 0)
      .map((i) => ({ skillId: i.skillIds[0], pattern: i.title }));

    const confusionPairs = Object.entries(m)
      .filter(([, mm]) => (mm.highConfWrongRate ?? 0) >= 0.25)
      .map(([sid, mm]) => {
        const partner = CONFUSION_PARTNERS[sid];
        return partner ? { pair: `${sid} vs ${partner}`, missRate: mm.highConfWrongRate ?? 0 } : null;
      })
      .filter((x): x is { pair: string; missRate: number } => x !== null);

    setTodayPlan(buildTodayPlan({
      now,
      minutes: prof.preferredSessionMinutes,
      lessons: LESSONS.map((l) => ({
        id: l.id, stage: l.stage, title: l.title, estimatedMinutes: l.estimatedMinutes,
        skills: l.skills, prerequisites: l.prerequisites,
      })),
      lessonProgress: lp,
      reviews: rp.items,
      masteryBySkill,
      remediationNeeded,
      confusionPairs,
      testDateMs: prof.targetTestDate ? Date.parse(prof.targetTestDate + 'T12:00:00') : null,
      recentTimedAccuracy,
      untimedAccuracy,
      untimedAttempts: untimedList.length,
    }));

    setReady(true);
  }, []);

  useEffect(() => {
    refresh().catch((e) => console.error('StudyProvider refresh failed', e));
  }, [refresh]);

  /* ---------------- achievements ---------------- */
  const checkAndGrantAchievements = useCallback(async (force = false): Promise<AchievementDef[]> => {
    const now = Date.now();
    if (!force && now - lastAchCheck.current < 30_000) return [];
    lastAchCheck.current = now;

    const earnedRows = await db.achievements.toArray();
    const earned = new Set(earnedRows.map((r) => r.achievementId));
    const attempts = await db.attempts.toArray();
    const m = mastery;
    const ev = evidenceRef.current;

    const conditional = attempts.filter((a) => a.skillIds.includes('f-conditional'));
    const withConf = attempts.filter((a) => a.confidence !== null).slice(-100);
    const calErr = withConf.length >= 10
      ? withConf.reduce(
          (n, a) => n + Math.abs(confToProb(a.confidence as number) - (a.correct ? 1 : 0)),
          0,
        ) / withConf.length
      : null;
    const dates = await studyDates();
    const weekAgoKey = daysAgoKey(7);
    const sessions = await db.sessions.toArray();
    const sumMode = (mode: string) => sessions.filter((s) => s.mode === mode);
    const contrastSessions = sumMode('contrast');
    let bestMixed10: number | null = null;
    for (const s of sumMode('mixed')) {
      if (s.itemCount < 10) continue;
      try {
        const summary = s.summary ? (JSON.parse(s.summary) as { accuracy?: number }) : {};
        if (typeof summary.accuracy === 'number') {
          bestMixed10 = Math.max(bestMixed10 ?? 0, summary.accuracy);
        }
      } catch { /* ignore malformed */ }
    }
    const parseAcc = (s: { summary: string | null }): number | null => {
      try {
        const summary = s.summary ? (JSON.parse(s.summary) as { accuracy?: number }) : {};
        return typeof summary.accuracy === 'number' ? summary.accuracy : null;
      } catch { return null; }
    };

    const acts = await db.dailyActivity.toArray();
    const stats: AchievementStats = {
      conditionalAttempts: conditional.length,
      conditionalCorrect: conditional.filter((a) => a.correct).length,
      assumptionStates: {
        'lr-necessary-assumption': m['lr-necessary-assumption']?.state ?? 'new',
        'lr-sufficient-assumption': m['lr-sufficient-assumption']?.state ?? 'new',
      },
      calibrationN: withConf.length,
      calibrationError: calErr,
      recoveredLapsed: Object.entries(ev).some(
        ([sid, e]) => e.lapses > 0 && ['stable', 'mastered'].includes(m[sid]?.state ?? 'new'),
      ),
      reviewsCompleted: acts.reduce((n, a) => n + a.reviewsCompleted, 0),
      sectionsCompleted: sumMode('full-section').length,
      simsCompleted: sumMode('full-sim').length,
      mistakesReviewed: attempts.filter((a) => !a.correct && a.reviewedExplanation).length,
      contrastAttempts: contrastSessions.reduce((n, s) => n + s.itemCount, 0),
      contrastCorrect: contrastSessions.reduce((n, s) => n + s.correctCount, 0),
      studyDaysLast7: dates.filter((d) => d >= weekAgoKey).length,
      longSessions: sessions.filter(
        (s) => s.endedAt !== null && s.endedAt - s.startedAt >= 45 * 60_000,
      ).length,
      flawState: m['lr-flaw']?.state ?? null,
      rcPassagesAt70: sumMode('rc-passage').filter((s) => (parseAcc(s) ?? 0) >= 0.7).length,
      secondPassCompleted: sumMode('second-pass').length > 0,
      notesSaved: await db.notes.count(),
      officialLogged: (await db.officialLogs.count()) > 0,
      bestMixed10,
    };

    const newly = checkAchievements(stats, earned);
    for (const def of newly) {
      await db.achievements.add({ achievementId: def.id, earnedAt: now });
      await recordActivity({ xp: def.xp });
    }
    if (newly.length > 0) {
      const updated = await db.dailyActivity.toArray();
      setXp(updated.reduce((n, a) => n + a.xp, 0));
    }
    return newly;
  }, [mastery]);

  /* ---------------- attempt pipeline ---------------- */
  const applyAttemptToSkills = useCallback(async (input: AttemptInput): Promise<void> => {
    for (const skillId of input.skillIds) {
      const prev = evidenceRef.current[skillId] ?? null;
      const next = recordAttempt(prev, input);
      const masteryNow = computeMastery(next, input.timestamp);
      const final = withLapseBookkeeping(next, masteryNow);
      const existing = await db.skillStates.get(skillId);
      const rec = evToRecord(final);
      rec.exposureCount = existing?.exposureCount ?? 0;
      await db.skillStates.put(rec);
      evidenceRef.current[skillId] = final;
    }
  }, []);

  const recordQuestionAttempt = useCallback(async (
    p: QuestionAttemptParams,
  ): Promise<AttemptOutcome> => {
    const now = Date.now();
    const q = getQuestion(p.questionId);
    const correct = p.correct ?? (q ? p.selectedChoice === q.correctIndex : false);
    const skillIds = p.skillIds ?? (q ? [q.questionType, ...q.secondarySkills] : []);
    const difficulty = p.difficulty ?? q?.editorialDifficulty ?? 2;
    const firstAttempt = (await db.attempts.where('questionId').equals(p.questionId).count()) === 0;

    const input: AttemptInput = {
      questionId: p.questionId,
      questionVersion: p.questionVersion ?? q?.version ?? 1,
      timestamp: now,
      correct,
      responseTimeMs: p.responseTimeMs,
      estimatedSeconds: p.estimatedSeconds ?? q?.estimatedSeconds ?? 60,
      confidence: p.confidence ?? 3,
      hintsUsed: p.hintsUsed,
      changedAnswer: p.changedAnswer,
      changedDirection: p.changedDirection,
      firstAttemptOnQuestion: firstAttempt,
      mode: p.mode,
      revealedSolution: p.revealedSolution,
      skillIds,
      difficulty,
      purpose: p.purpose ?? q?.itemPurpose ?? null,
    };
    await applyAttemptToSkills(input);

    await db.attempts.add({
      questionId: p.questionId,
      questionVersion: input.questionVersion,
      timestamp: now,
      selectedChoice: p.selectedChoice,
      correct,
      responseTimeMs: p.responseTimeMs,
      confidence: p.confidence,
      mode: p.mode,
      skillIds,
      reviewedExplanation: false,
      changedAnswer: p.changedAnswer,
      changedDirection: p.changedDirection ?? null,
      flagged: p.flagged ?? null,
      errorCategory: null,
      hintsUsed: p.hintsUsed,
      sessionId: p.sessionId ?? null,
    });

    let event: XpEvent = 'question_attempt';
    let bonus = 0;
    if (!p.revealedSolution) {
      if (correct && firstAttempt) { event = 'question_correct_first'; bonus = difficulty; }
      else if (correct) event = 'question_correct';
    }
    const xpGained = xpFor(event, bonus);
    await recordActivity({
      minutes: p.responseTimeMs / 60_000,
      attempts: 1,
      correct: correct ? 1 : 0,
      xp: xpGained,
    });

    await refresh();
    const newAchievements = await checkAndGrantAchievements();
    return { correct, firstAttempt, xpGained, newAchievements };
  }, [applyAttemptToSkills, refresh, checkAndGrantAchievements]);

  const recordDrillAttempt = useCallback(async (
    p: DrillAttemptParams,
  ): Promise<AttemptOutcome> => {
    const now = Date.now();
    const d = getDrill(p.drillId);
    const skillIds = d?.skillIds ?? [];
    const input: AttemptInput = {
      questionId: p.drillId,
      questionVersion: 1,
      timestamp: now,
      correct: p.correct,
      responseTimeMs: p.responseTimeMs,
      estimatedSeconds: 45,
      confidence: 3,
      hintsUsed: 0,
      changedAnswer: false,
      firstAttemptOnQuestion: true,
      mode: 'drill',
      revealedSolution: false,
      skillIds,
      difficulty: d?.difficulty ?? 1,
    };
    await applyAttemptToSkills(input);
    await db.attempts.add({
      questionId: p.drillId,
      questionVersion: 1,
      timestamp: now,
      selectedChoice: p.correct ? 1 : 0,
      correct: p.correct,
      responseTimeMs: p.responseTimeMs,
      confidence: null,
      mode: 'drill',
      skillIds,
      reviewedExplanation: false,
      changedAnswer: false,
      changedDirection: null,
      flagged: null,
      errorCategory: null,
      hintsUsed: 0,
      sessionId: p.sessionId ?? null,
    });

    const xpGained = xpFor(p.correct ? 'question_correct' : 'question_attempt');
    await recordActivity({
      minutes: p.responseTimeMs / 60_000, attempts: 1,
      correct: p.correct ? 1 : 0, xp: xpGained,
    });
    await refresh();
    const newAchievements = await checkAndGrantAchievements();
    return { correct: p.correct, firstAttempt: true, xpGained, newAchievements };
  }, [applyAttemptToSkills, refresh, checkAndGrantAchievements]);

  const recordCheckpoint = useCallback(async (lessonId: string, index: number, correct: boolean) => {
    const lesson = getLesson(lessonId);
    await recordQuestionAttempt({
      questionId: `checkpoint:${lessonId}:${index}`,
      selectedChoice: correct ? 1 : 0,
      correct,
      responseTimeMs: 20_000,
      confidence: null,
      mode: 'learning',
      hintsUsed: 0,
      revealedSolution: false,
      changedAnswer: false,
      skillIds: lesson?.skills ?? [],
      difficulty: 1,
      estimatedSeconds: 30,
      questionVersion: 1,
    });
  }, [recordQuestionAttempt]);

  const startLesson = useCallback(async (lessonId: string) => {
    const existing = await db.lessonProgress.get(lessonId);
    if (!existing) {
      await db.lessonProgress.put({
        lessonId, startedAt: Date.now(), completedAt: null,
        checkpointsCorrect: 0, checkpointsTotal: 0,
      });
      await refresh();
    }
  }, [refresh]);

  const completeLesson = useCallback(async (
    lessonId: string, checkpointsCorrect: number, checkpointsTotal: number, minutes: number,
  ) => {
    const now = Date.now();
    const existing = await db.lessonProgress.get(lessonId);
    await db.lessonProgress.put({
      lessonId,
      startedAt: existing?.startedAt ?? now,
      completedAt: now,
      checkpointsCorrect,
      checkpointsTotal,
    });
    // Exposure: mark taught skills as introduced.
    const lesson = getLesson(lessonId);
    if (lesson) {
      for (const sid of lesson.skills) {
        const row = await db.skillStates.get(sid);
        if (!row) {
          const rec = evToRecord(emptyEvidence(sid));
          rec.exposureCount = 1;
          await db.skillStates.put(rec);
        } else {
          await db.skillStates.update(sid, { exposureCount: (row.exposureCount ?? 0) + 1 });
        }
      }
    }
    const xpGained = xpFor('lesson_complete') + checkpointsCorrect * xpFor('checkpoint_correct');
    await recordActivity({ minutes, xp: xpGained });
    await refresh();
    const newAchievements = await checkAndGrantAchievements(true);
    return { xpGained, newAchievements };
  }, [refresh, checkAndGrantAchievements]);

  const completeReviewSession = useCallback(async (count: number, minutes: number) => {
    await recordActivity({ minutes, reviewsCompleted: count, xp: xpFor('review_complete') });
    await refresh();
    await checkAndGrantAchievements();
  }, [refresh, checkAndGrantAchievements]);

  const completeContrastSession = useCallback(async (
    itemCount: number, correctCount: number, minutes: number,
  ) => {
    const now = Date.now();
    const gained = xpFor('contrast_complete');
    await db.sessions.add({
      sessionId: `contrast-${now}`, mode: 'contrast',
      startedAt: now - minutes * 60_000, endedAt: now,
      itemCount, correctCount, xpEarned: gained,
      interrupted: false,
      summary: JSON.stringify({ accuracy: itemCount ? correctCount / itemCount : 0 }),
    });
    await recordActivity({ minutes, xp: gained });
    await refresh();
    const newAchievements = await checkAndGrantAchievements();
    return { xpGained: gained, newAchievements };
  }, [refresh, checkAndGrantAchievements]);

  const logPracticeSession = useCallback(async (rec: Omit<PracticeSessionRecord, 'id'>) => {
    await db.sessions.add(rec);
    await recordActivity({
      minutes: rec.endedAt !== null ? (rec.endedAt - rec.startedAt) / 60_000 : 0,
      xp: rec.xpEarned,
    });
    await refresh();
    await checkAndGrantAchievements();
  }, [refresh, checkAndGrantAchievements]);

  const markExplanationReviewed = useCallback(async (questionId: string) => {
    const latest = await db.attempts.where('questionId').equals(questionId).last();
    if (latest?.id !== undefined) {
      await db.attempts.update(latest.id, { reviewedExplanation: true });
    }
  }, []);

  const updateProfile = useCallback(async (patch: Partial<UserProfile>) => {
    const prof = await getProfile();
    const next = { ...prof, ...patch };
    await db.profile.put(next);
    setProfile(next);
    if (patch.theme) {
      const theme = patch.theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : patch.theme;
      document.documentElement.dataset.theme = theme;
      try {
        localStorage.setItem('compass-theme', patch.theme);
      } catch { /* private mode */ }
    }
  }, []);

  const level = useMemo(() => levelFor(xp), [xp]);

  const value: StudyContextValue = {
    ready,
    profile,
    xp,
    level: level.level,
    levelName: level.name,
    nextLevelXp: level.nextXp,
    streak,
    weeklyActive,
    mastery,
    reviewPlan,
    todayPlan,
    insights,
    readiness,
    lessonProgress,
    seenQuestionIds,
    recordQuestionAttempt,
    recordDrillAttempt,
    recordCheckpoint,
    completeLesson,
    startLesson,
    completeReviewSession,
    completeContrastSession,
    logPracticeSession,
    markExplanationReviewed,
    updateProfile,
    refresh,
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}
