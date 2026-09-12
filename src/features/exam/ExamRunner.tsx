import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStudy } from '../../state/study';
import { getQuestion } from '../../content';
import {
  Button,
  EmptyState,
  LoadingSkeleton,
  ProgressBar,
  Screen,
  Sheet,
  Timer,
} from '../../components';
import type { TimerMode } from '../../components';
import { QuestionRunner } from '../practice/QuestionRunner';
import type { RunnerResult } from '../practice/QuestionRunner';
import {
  SECTION_SECONDS,
  createRun,
  loadRunDurable,
  loadSectionAnswersFromStorage,
  loadSectionDeadline,
  saveRun,
  saveSectionAnswers,
  saveSectionDeadline,
  sectionSessionId,
} from './examStore';
import type { ExamAnswerRecord, ExamRunState, ExamSectionDef } from './examStore';
import './exam.css';

/* ------------------------------------------------------------------ */
/* Section view — one timed 35-minute section                          */
/* ------------------------------------------------------------------ */

interface SectionStats {
  itemCount: number;
  correctCount: number;
  answers: Record<string, ExamAnswerRecord>;
}

function SectionView({
  run,
  section,
  timerMode,
  onFinishSection,
  onExit,
}: {
  run: ExamRunState;
  section: ExamSectionDef;
  timerMode: TimerMode;
  onFinishSection: (stats: SectionStats, auto: boolean) => void;
  onExit: () => void;
}) {
  const questionIds = section.questionIds;
  const total = questionIds.length;

  const [qPos, setQPos] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ExamAnswerRecord>>(() =>
    loadSectionAnswersFromStorage(run.runId, section.index) ?? {},
  );
  const [flags, setFlags] = useState<Record<string, boolean>>(() => {
    const stored = loadSectionAnswersFromStorage(run.runId, section.index) ?? {};
    const f: Record<string, boolean> = {};
    for (const [qid, rec] of Object.entries(stored)) if (rec.flagged) f[qid] = true;
    return f;
  });
  // Strict wall-clock timer (2026-09-12): the 35:00 clock is anchored to a
  // persisted deadline timestamp, not a decrementing counter. It never
  // pauses — not on tab backgrounding, not on reload (the deadline is
  // restored from durable storage) — matching real test-day conditions.
  const [deadline] = useState(() => {
    const stored = loadSectionDeadline(run.runId, section.index);
    if (stored !== null) return stored;
    const d = Date.now() + SECTION_SECONDS * 1000;
    saveSectionDeadline(run.runId, section.index, d);
    return d;
  });
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.ceil((deadline - Date.now()) / 1000)),
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const answersRef = useRef(answers);
  const doneRef = useRef(false);
  const finishRef = useRef<(auto: boolean) => void>(() => {});

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const currentQid = questionIds[qPos];
  const answeredCount = useMemo(
    () => questionIds.filter((id) => answers[id]?.answered).length,
    [questionIds, answers],
  );
  const unansweredCount = total - answeredCount;
  const flaggedCount = useMemo(
    () => questionIds.filter((id) => flags[id]).length,
    [questionIds, flags],
  );

  const finishSection = useCallback(
    (auto: boolean) => {
      if (doneRef.current) return;
      doneRef.current = true;
      const all = answersRef.current;
      const correctCount = questionIds.filter((id) => all[id]?.answered && all[id].correct).length;
      onFinishSection({ itemCount: total, correctCount, answers: all }, auto);
    },
    [onFinishSection, questionIds, total],
  );
  finishRef.current = finishSection;

  // Countdown from the wall-clock deadline; 4 Hz tick so the display never
  // drifts a full second behind real elapsed time. Never pauses: the old
  // pause-on-hidden behavior let a user stop the clock by backgrounding
  // the tab, which no proctored administration permits.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (doneRef.current) return;
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left <= 0) {
        window.clearInterval(id);
        finishRef.current(true);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [deadline]);

  const handleAnswer = useCallback(
    (r: RunnerResult) => {
      const q = getQuestion(r.questionId);
      const wasAnswered = answersRef.current[r.questionId]?.answered === true;
      const rec: ExamAnswerRecord = {
        questionId: r.questionId,
        // The deferred contract reports correctness only; the exact letter is
        // recoverable solely when the answer was correct.
        choice: r.correct && q ? q.correctIndex : null,
        confidence: null,
        flagged: r.flagged,
        correct: r.correct,
        answered: true,
        responseTimeMs: r.responseTimeMs,
        hintsUsed: r.hintsUsed,
      };
      const next = { ...answersRef.current, [r.questionId]: rec };
      answersRef.current = next;
      setAnswers(next);
      saveSectionAnswers(run.runId, section.index, next);
      // Auto-advance on first answer; stay put when revising an old answer.
      if (!wasAnswered) {
        setQPos((prev) => {
          if (prev + 1 < questionIds.length) return prev + 1;
          const firstOpen = questionIds.findIndex((id) => !next[id]?.answered);
          return firstOpen >= 0 ? firstOpen : prev;
        });
      }
    },
    [questionIds, run.runId, section.index],
  );

  const navState = (qid: string, idx: number): string => {
    const classes = ['ex-navbtn'];
    if (answers[qid]?.answered) classes.push('ex-navbtn--answered');
    if (flags[qid]) classes.push('ex-navbtn--flagged');
    if (idx === qPos) classes.push('ex-navbtn--current');
    return classes.join(' ');
  };

  const navLabel = (qid: string, idx: number): string => {
    const bits = [`Question ${idx + 1}`];
    if (idx === qPos) bits.push('current question');
    bits.push(answers[qid]?.answered ? 'answered' : 'unanswered');
    if (flags[qid]) bits.push('flagged');
    return bits.join(', ');
  };

  if (total === 0) {
    return (
      <Screen title={`Section ${section.index + 1}`}>
        <EmptyState
          title="Section couldn't be built"
          body="We couldn't assemble questions for this section. Please try starting the exam again."
          actionLabel="Back to exam setup"
          onAction={onExit}
        />
      </Screen>
    );
  }

  const sectionLabel = `Section ${section.index + 1}`;
  const ofLabel = run.mode === 'sim' ? ` of ${run.sections.length}` : '';

  return (
    <div className="ex-runner">
      <header className="ex-runner-head">
        <div className="ex-runner-title">
          <h1>
            {sectionLabel}
            {ofLabel}
          </h1>
          <span className="ex-muted">
            Question {Math.min(qPos + 1, total)} of {total}
            {flaggedCount > 0 && ` · ⚑ ${flaggedCount} flagged`}
          </span>
        </div>
        <Timer secondsLeft={secondsLeft} mode={timerMode} urgent={secondsLeft <= 300} />
      </header>

      <ProgressBar
        value={total === 0 ? 0 : answeredCount / total}
        ariaLabel={`${answeredCount} of ${total} questions answered`}
      />

      <nav className="ex-navigator" aria-label="Question navigator">
        {questionIds.map((qid, idx) => (
          <button
            key={qid}
            type="button"
            className={navState(qid, idx)}
            aria-label={navLabel(qid, idx)}
            aria-current={idx === qPos ? 'true' : undefined}
            onClick={() => setQPos(idx)}
          >
            {flags[qid] && <span aria-hidden="true" className="ex-navflag">⚑</span>}
            {idx + 1}
          </button>
        ))}
      </nav>

      <div className="ex-question">
        {currentQid && (
          <QuestionRunner
            key={currentQid}
            questionId={currentQid}
            mode="timed"
            sessionId={sectionSessionId(run.runId, section.index)}
            deferred
            flagged={flags[currentQid] ?? false}
            onFlagChange={(f) =>
              setFlags((prev) => ({ ...prev, [currentQid]: f }))
            }
            onAnswer={handleAnswer}
          />
        )}
      </div>

      <div className="ex-runner-foot">
        <Button
          variant="ghost"
          disabled={qPos === 0}
          onClick={() => setQPos((p) => Math.max(0, p - 1))}
        >
          ← Previous
        </Button>
        <Button
          variant="ghost"
          disabled={qPos >= total - 1}
          onClick={() => setQPos((p) => Math.min(total - 1, p + 1))}
        >
          Next →
        </Button>
        <Button variant="danger" onClick={() => setConfirmOpen(true)}>
          End section
        </Button>
      </div>

      <Sheet open={confirmOpen} onClose={() => setConfirmOpen(false)} title={`End ${sectionLabel}?`}>
        <p>
          {unansweredCount === 0
            ? 'You have answered every question in this section.'
            : `You have ${unansweredCount} unanswered question${unansweredCount === 1 ? '' : 's'} in this section.`}
        </p>
        <p className="ex-muted">
          {flaggedCount > 0
            ? `${flaggedCount} flagged question${flaggedCount === 1 ? '' : 's'} — tap the navigator to revisit.`
            : 'Ending now submits this section as-is.'}
        </p>
        <div className="ex-actions">
          <Button variant="primary" fullWidth onClick={() => setConfirmOpen(false)}>
            Keep working
          </Button>
          <Button variant="danger" fullWidth onClick={() => finishSection(false)}>
            End section
          </Button>
        </div>
      </Sheet>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ExamRunner — builds/loads the run, advances sections                 */
/* ------------------------------------------------------------------ */

export default function ExamRunner() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { ready, profile, mastery, seenQuestionIds, logPracticeSession } = useStudy();

  const [run, setRun] = useState<ExamRunState | null>(null);
  const [buildError, setBuildError] = useState<string | null>(null);
  const builtForRef = useRef<string | null>(null);

  const paramKey = searchParams.toString();

  // Build a new run, or resume an existing one by runId.
  useEffect(() => {
    if (!ready) return;
    if (builtForRef.current === paramKey) return;
    builtForRef.current = paramKey;

    const runId = searchParams.get('runId');
    if (runId) {
      let cancelled = false;
      (async () => {
        const existing = await loadRunDurable(runId);
        if (cancelled) return;
        if (!existing) {
          setBuildError('This exam run could not be found. It may have been cleared with site data.');
          return;
        }
        if (existing.currentSection >= existing.sections.length) {
          navigate(`/exam/results/${runId}`, { replace: true });
          return;
        }
        setRun(existing);
      })();
      return () => {
        cancelled = true;
      };
    }

    const mode = searchParams.get('mode') === 'section' ? 'section' : 'sim';
    const kindParam = searchParams.get('kind');
    const kind: 'LR' | 'RC' = kindParam === 'RC' ? 'RC' : 'LR';
    try {
      const fresh = createRun(mode, kind, mastery, seenQuestionIds);
      const empty = fresh.sections.find((s) => s.questionIds.length === 0);
      if (empty) {
        setBuildError('We could not assemble enough questions for this exam. Try again later.');
        return;
      }
      saveRun(fresh);
      setRun(fresh);
    } catch (e) {
      setBuildError(e instanceof Error ? e.message : 'Failed to build the exam.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, paramKey]);

  const handleFinishSection = useCallback(
    async (stats: SectionStats, _auto: boolean) => {
      if (!run) return;
      const secIdx = run.currentSection;
      const section = run.sections[secIdx];
      const accuracy = stats.itemCount > 0 ? stats.correctCount / stats.itemCount : 0;

      await logPracticeSession({
        sessionId: sectionSessionId(run.runId, secIdx),
        mode: 'full-section',
        startedAt: run.startedAt,
        endedAt: Date.now(),
        itemCount: stats.itemCount,
        correctCount: stats.correctCount,
        xpEarned: 0,
        interrupted: false,
        summary: JSON.stringify({ accuracy, variable: section.variable }),
      });

      const updated: ExamRunState = {
        ...run,
        finishedSections: [...run.finishedSections, secIdx],
        currentSection: secIdx + 1,
      };
      saveRun(updated);

      if (run.mode === 'sim' && secIdx === 1) {
        navigate(`/exam/break?runId=${run.runId}`);
        return;
      }
      if (updated.currentSection >= updated.sections.length) {
        if (run.mode === 'sim') {
          // Full-sim summary over scored sections only (variable excluded).
          let totalQ = 0;
          let totalC = 0;
          for (const s of updated.sections) {
            if (s.variable) continue;
            const ans = loadSectionAnswersFromStorage(run.runId, s.index) ?? {};
            totalQ += s.questionIds.length;
            totalC += s.questionIds.filter((id) => ans[id]?.answered && ans[id].correct).length;
          }
          await logPracticeSession({
            sessionId: run.runId,
            mode: 'full-sim',
            startedAt: run.startedAt,
            endedAt: Date.now(),
            itemCount: totalQ,
            correctCount: totalC,
            xpEarned: 0,
            interrupted: false,
            summary: JSON.stringify({
              accuracy: totalQ > 0 ? totalC / totalQ : 0,
              sections: updated.sections.filter((s) => !s.variable).length,
            }),
          });
        }
        navigate(`/exam/results/${run.runId}`);
        return;
      }
      setRun(updated);
    },
    [run, logPracticeSession, navigate],
  );

  if (!ready || (!run && !buildError)) {
    return (
      <Screen title="Exam">
        <LoadingSkeleton lines={10} />
      </Screen>
    );
  }

  if (buildError || !run) {
    return (
      <Screen title="Exam">
        <EmptyState
          title="Couldn't start the exam"
          body={buildError ?? 'Something went wrong while setting up the exam.'}
          actionLabel="Back to exam setup"
          onAction={() => navigate('/exam')}
        />
      </Screen>
    );
  }

  const section = run.sections[run.currentSection];
  const timerMode: TimerMode = profile?.timerMode ?? 'visible';

  return (
    <SectionView
      key={`${run.runId}:${run.currentSection}`}
      run={run}
      section={section}
      timerMode={timerMode}
      onFinishSection={handleFinishSection}
      onExit={() => navigate('/exam')}
    />
  );
}
