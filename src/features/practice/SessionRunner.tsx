import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Screen from '../../components/Screen';
import {
  Button,
  EmptyState,
  LoadingSkeleton,
  ProgressBar,
  StatCard,
  Timer,
  useSafeToast,
} from '../../components';
import type { AttemptMode } from '../../engine/types';
import { composeSession } from '../../engine/session';
import type { SessionMode, SessionPlan } from '../../engine/session';
import { contentProvider } from '../../state/content-provider';
import { useStudy } from '../../state/study';
import { db } from '../../db/db';
import { getPassage, allSkills } from '../../content';
import { selectRemediationBranch, BRANCH_META } from '../../engine/remediation';
import { remediationRecheckDueAt } from '../../engine/scheduler';
import { ContrastRunner, DrillRunner, QuestionRunner } from './QuestionRunner';
import type { RunnerResult } from './QuestionRunner';

type ModeParam = 'drill' | 'review' | 'mixed' | 'timed' | 'weakness-repair' | 'error-log' | 'contrast';
const VALID_MODES: ModeParam[] = ['drill', 'review', 'mixed', 'timed', 'weakness-repair', 'error-log', 'contrast'];

const ATTEMPT_MODE: Record<ModeParam, AttemptMode> = {
  drill: 'drill',
  review: 'review',
  mixed: 'mixed',
  timed: 'timed',
  'weakness-repair': 'mixed',
  'error-log': 'review',
  contrast: 'drill',
};

interface RunItem {
  key: string;
  kind: 'question' | 'drill' | 'contrast';
  refId: string;
  drillIds?: string[];
}

/** Merge consecutive contrast items into one ContrastRunner group. */
function toRunItems(plan: SessionPlan): RunItem[] {
  const out: RunItem[] = [];
  let group: string[] = [];
  const flush = () => {
    if (group.length > 0) {
      out.push({ key: `contrast-${out.length}`, kind: 'contrast', refId: '', drillIds: group });
      group = [];
    }
  };
  for (const it of plan.items) {
    if (it.kind === 'contrast') {
      group.push(it.refId);
      continue;
    }
    flush();
    if (it.kind === 'question') {
      out.push({ key: `q-${it.refId}`, kind: 'question', refId: it.refId });
    } else if (it.kind === 'drill') {
      out.push({ key: `d-${it.refId}`, kind: 'drill', refId: it.refId });
    } else if (it.kind === 'passage-set') {
      const p = getPassage(it.refId);
      for (const qid of p?.questionIds ?? []) {
        out.push({ key: `q-${qid}`, kind: 'question', refId: qid });
      }
    }
    // 'lesson' items never appear in practice modes; ignored defensively.
  }
  flush();
  return out;
}

export default function SessionScreen() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const toast = useSafeToast();

  const {
    ready,
    xp,
    profile,
    mastery,
    reviewPlan,
    seenQuestionIds,
    logPracticeSession,
    completeReviewSession,
    completeContrastSession,
  } = useStudy();

  const rawMode = params.get('mode') ?? 'mixed';
  const modeParam: ModeParam = VALID_MODES.includes(rawMode as ModeParam) ? (rawMode as ModeParam) : 'mixed';
  const minutes = Math.min(60, Math.max(5, Number(params.get('minutes')) || 15));
  const skillsParam = params.get('skills') ?? '';
  const targetSkillIds = useMemo(
    () => skillsParam.split(',').map((s) => s.trim()).filter(Boolean),
    [skillsParam],
  );

  const [plan, setPlan] = useState<SessionPlan | null>(null);
  const [buildFailed, setBuildFailed] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'run' | 'summary'>('run');
  const [interrupted, setInterrupted] = useState(false);
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [endArmed, setEndArmed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  const resultsRef = useRef({ correct: 0, answered: 0 });
  const xpStartRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const loggedRef = useRef(false);
  const finalizedRef = useRef(false);
  const finishingRef = useRef(false);

  // Compose the session once study state is ready.
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      try {
        const recentErrors =
          modeParam === 'error-log'
            ? (
                await db.attempts.filter((a) => !a.correct).reverse().limit(10).toArray()
              ).map((a) => ({ questionId: a.questionId, skillIds: a.skillIds }))
            : [];
        // Remediation branch (Part XXXVI): diagnose the deficit from the
        // target skills' mastery dimensions, then build a branch-specific set.
        let remediationBranch: ReturnType<typeof selectRemediationBranch> | undefined;
        let refaceQuestionIds: string[] | undefined;
        if (modeParam === 'weakness-repair') {
          const targetMastery = targetSkillIds
            .map((sid) => mastery[sid])
            .filter(Boolean);
          const m = targetMastery[0] ??
            Object.values(mastery).sort((a, b) => a.score - b.score)[0];
          if (m) {
            remediationBranch = selectRemediationBranch(m);
            if (remediationBranch === 'misconception') {
              const misses = await db.attempts
                .filter((a) => !a.correct && (a.confidence ?? 0) >= 4)
                .reverse()
                .limit(10)
                .toArray();
              refaceQuestionIds = [...new Set(misses.map((a) => a.questionId))];
            }
          }
        }
        const p = composeSession({
          now: Date.now(),
          mode: modeParam as SessionMode,
          minutes,
          targetSkillIds: targetSkillIds.length > 0 ? targetSkillIds : undefined,
          reviews: reviewPlan?.items,
          masteryBySkill: mastery,
          seenQuestionIds,
          provider: contentProvider,
          recentErrors,
          allSkillIds: allSkills.map((s) => s.id),
          remediationBranch,
          refaceQuestionIds,
        });
        if (!cancelled) {
          xpStartRef.current = xp;
          startedAtRef.current = Date.now();
          setPlan(p);
        }
      } catch {
        if (!cancelled) setBuildFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const items = useMemo(() => (plan ? toRunItems(plan) : []), [plan]);
  const total = items.length;
  const current = items[index];
  const deferred = plan?.feedbackMode === 'deferred';
  const attemptMode = ATTEMPT_MODE[modeParam];
  const timerMode = profile?.timerMode ?? 'visible';

  const finish = useCallback(
    (wasInterrupted: boolean) => {
      if (finishingRef.current || phase !== 'run') return;
      finishingRef.current = true;
      setInterrupted(wasInterrupted);
      setPhase('summary');
      // Timed sessions are logged exactly once, interrupted or not.
      if (plan && plan.mode === 'timed' && !loggedRef.current) {
        loggedRef.current = true;
        const { correct, answered } = resultsRef.current;
        const accuracy = answered > 0 ? correct / answered : 0;
        const xpEarned = Math.max(0, xp - (xpStartRef.current ?? xp));
        void logPracticeSession({
          sessionId: plan.id,
          mode: 'timed',
          startedAt: startedAtRef.current || Date.now(),
          endedAt: Date.now(),
          itemCount: answered,
          correctCount: correct,
          xpEarned,
          interrupted: wasInterrupted,
          summary: JSON.stringify({ accuracy }),
        }).catch(() => {});
      }
    },
    [plan, phase, xp, logPracticeSession],
  );

  // Timed countdown → auto-finish at 0.
  // Timer ticks for any timed session (mode 'timed' or a fluency
  // remediation branch that forces plan.timed).
  useEffect(() => {
    if (!plan || !plan.timed || phase !== 'run') return;
    if (secondsLeft <= 0) {
      finish(false);
      return;
    }
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [plan, phase, secondsLeft, finish]);

  // Per-mode summary extras (once).
  useEffect(() => {
    if (phase !== 'summary' || finalizedRef.current || !plan) return;
    finalizedRef.current = true;
    (async () => {
      try {
        if (plan.mode === 'review') {
          await completeReviewSession(resultsRef.current.answered, minutes);
        } else if (plan.mode === 'contrast') {
          const outcome = await completeContrastSession(
            resultsRef.current.answered,
            resultsRef.current.correct,
            minutes,
          );
          if (outcome.xpGained > 0) toast(`+${outcome.xpGained} XP`, { title: 'Contrast complete' });
          for (const a of outcome.newAchievements) toast(a.description, { title: a.title });
        }
        // Delayed recheck (Part XXXVI): after a completed remediation
        // session, pull the repaired skills' dueAt forward so the review
        // queue re-tests the fix within REMEDIATION_RECHECK_DAYS.
        if (plan.remediationBranch && !interrupted && targetSkillIds.length > 0) {
          const now = Date.now();
          for (const sid of targetSkillIds) {
            const rec = await db.skillStates.get(sid);
            if (!rec) continue;
            const dueAt = remediationRecheckDueAt(rec.dueAt, now);
            if (dueAt < rec.dueAt) {
              await db.skillStates.update(sid, { dueAt });
            }
          }
        }
      } catch {
        /* summary must render even if bookkeeping fails */
      }
    })();
  }, [phase, plan, minutes, completeReviewSession, completeContrastSession, toast]);

  if (!ready || (!plan && !buildFailed)) {
    return (
      <Screen title="Session">
        <LoadingSkeleton lines={6} />
      </Screen>
    );
  }

  if (buildFailed || !plan) {
    return (
      <Screen title="Session">
        <EmptyState
          title="Couldn't build a session"
          body="Something went wrong while composing your session. Please try again."
          actionLabel="Back to Practice"
          onAction={() => navigate('/practice')}
        />
      </Screen>
    );
  }

  if (items.length === 0) {
    return (
      <Screen title={plan.title}>
        <EmptyState
          title="Couldn't build a session"
          body="Not enough matching content. Try different skills."
          actionLabel="Back to Practice"
          onAction={() => navigate('/practice')}
        />
      </Screen>
    );
  }

  const advance = (correctDelta: number, answeredDelta: number) => {
    resultsRef.current.correct += correctDelta;
    resultsRef.current.answered += answeredDelta;
    setEndArmed(false);
    if (index + 1 >= total) finish(false);
    else setIndex(index + 1);
  };

  const onQuestionAnswer = (r: RunnerResult) => advance(r.correct ? 1 : 0, 1);
  const onDrillAnswer = (correct: boolean) => advance(correct ? 1 : 0, 1);
  const onContrastDone = (cc: number, t: number) => advance(cc, t);

  const requestEnd = () => {
    if (!endArmed) {
      setEndArmed(true);
      return;
    }
    finish(true);
  };

  /* ------------------------------ summary ------------------------------ */
  if (phase === 'summary') {
    const { correct, answered } = resultsRef.current;
    const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    const xpEarned = Math.max(0, xp - (xpStartRef.current ?? xp));
    return (
      <Screen title={interrupted ? 'Session ended' : 'Session complete'}>
        <div className="ps-summary">
          <p className="ps-summary-score">
            {correct}<span>/{answered}</span>
          </p>
          <p className="ps-summary-sub">
            {interrupted ? 'Ended early — progress was saved.' : plan.title}
          </p>
          <div className="ps-stats">
            <StatCard label="Accuracy" value={`${pct}%`} />
            <StatCard label="XP earned" value={`+${xpEarned}`} />
            <StatCard label="Items" value={String(answered)} />
          </div>
          <div className="ps-summary-actions">
            <Button variant="primary" fullWidth onClick={() => navigate('/practice')}>
              Done
            </Button>
            <Button variant="ghost" fullWidth onClick={() => navigate('/progress/errors')}>
              Error Lab
            </Button>
            {plan.mode === 'timed' && (
              <Button variant="ghost" fullWidth onClick={() => navigate(`/exam/second-pass?sessionId=${plan.id}`)}>
                Second-pass review
              </Button>
            )}
          </div>
        </div>
      </Screen>
    );
  }

  /* ------------------------------ running ------------------------------ */
  const branchMeta = plan.remediationBranch ? BRANCH_META[plan.remediationBranch] : null;
  return (
    <Screen title={plan.title}>
      <div className="ps-runner">
        {branchMeta && (
          <div className="ps-branch-banner" role="note">
            <strong>{branchMeta.title}</strong>
            <p>{branchMeta.learnerLine}</p>
          </div>
        )}
        <div className="ps-head">
          <div className="ps-head-row">
            <span className="ps-count">
              Item {Math.min(index + 1, total)} of {total}
            </span>
            {plan.timed && (
              <Timer secondsLeft={secondsLeft} mode={timerMode} urgent={secondsLeft <= 300} />
            )}
            <button
              type="button"
              className={`ps-end${endArmed ? ' ps-end--armed' : ''}`}
              onClick={requestEnd}
            >
              {endArmed ? 'Tap again to end' : 'End session'}
            </button>
          </div>
          <ProgressBar value={index / total} ariaLabel={`Session progress: item ${index + 1} of ${total}`} />
        </div>

        {current.kind === 'question' && (
          <QuestionRunner
            key={current.key}
            questionId={current.refId}
            mode={attemptMode}
            sessionId={plan.id}
            deferred={deferred}
            flagged={flags[current.refId] ?? false}
            onFlagChange={(f) => setFlags((prev) => ({ ...prev, [current.refId]: f }))}
            onAnswer={onQuestionAnswer}
            onExit={requestEnd}
            typeLabelProof={plan.typeLabelProof}
            trapProof={modeParam === 'weakness-repair' || modeParam === 'error-log' || modeParam === 'review'}
          />
        )}
        {current.kind === 'drill' && (
          <DrillRunner key={current.key} drillId={current.refId} onAnswer={onDrillAnswer} onExit={requestEnd} />
        )}
        {current.kind === 'contrast' && (
          <ContrastRunner
            key={current.key}
            drillIds={current.drillIds ?? []}
            sessionId={plan.id}
            onDone={onContrastDone}
          />
        )}
      </div>
    </Screen>
  );
}
