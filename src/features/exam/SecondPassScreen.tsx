import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useStudy } from '../../state/study';
import { getQuestion } from '../../content';
import { Button, EmptyState, LoadingSkeleton, Screen, StatCard } from '../../components';
import { QuestionRunner } from '../practice/QuestionRunner';
import type { RunnerResult } from '../practice/QuestionRunner';
import { formatClock, loadRun, loadSectionAnswers } from './examStore';
import type { ExamAnswerRecord, ExamRunState } from './examStore';
import './exam.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const RUSHED_FRACTION = 0.4;

interface Candidate {
  key: string;
  sectionIdx: number;
  sectionLabel: number; // 1-based
  qPos: number; // 0-based within section
  questionId: string;
  flagged: boolean;
  rushed: boolean;
  timedChoice: number | null;
  timedCorrect: boolean;
  responseTimeMs: number;
  estimatedMs: number;
}

interface Reviewed {
  correct: boolean;
  responseTimeMs: number;
}

type Phase = 'loading' | 'list' | 'review' | 'reveal';

function choiceLabel(choice: number | null, correct: boolean): string {
  if (choice != null) return LETTERS[choice];
  return correct ? '✓' : '✗';
}

function classify(timedCorrect: boolean, reviewedCorrect: boolean): { title: string; body: string } {
  if (!timedCorrect && reviewedCorrect)
    return { title: 'Timing issue', body: 'You knew this — the clock beat you. Practice the same question type with tighter pacing.' };
  if (!timedCorrect && !reviewedCorrect)
    return { title: 'Conceptual — review the explanation', body: 'Untimed review didn\'t fix it. Study the reasoning behind the correct answer.' };
  if (timedCorrect && !reviewedCorrect)
    return { title: 'Overthinking — trust your first read', body: 'Your timed instinct was right. Don\'t talk yourself out of strong first reads.' };
  return { title: 'Stable', body: 'Right both times. This reasoning is solid under pressure.' };
}

export default function SecondPassScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { ready, logPracticeSession } = useStudy();

  const [phase, setPhase] = useState<Phase>('loading');
  const [run, setRun] = useState<ExamRunState | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [reviewed, setReviewed] = useState<Record<string, Reviewed>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const reviewStartedAt = useRef<number>(0);
  const loggedRef = useRef(false);

  const runId = searchParams.get('runId');

  // Load run + timed answers, pick second-pass candidates.
  useEffect(() => {
    if (!ready) return;
    if (!runId) {
      setLoadError('No exam run specified.');
      setPhase('list');
      return;
    }
    const loaded = loadRun(runId);
    if (!loaded) {
      setLoadError('This exam run could not be found. It may have expired — session data only lives in this tab.');
      setPhase('list');
      return;
    }
    setRun(loaded);
    let cancelled = false;
    (async () => {
      const scored = loaded.sections.filter((s) => !s.variable);
      const out: Candidate[] = [];
      for (const s of scored) {
        const answers: Record<string, ExamAnswerRecord> = await loadSectionAnswers(runId, s.index, s);
        s.questionIds.forEach((qid, qPos) => {
          const rec = answers[qid];
          if (!rec) return;
          const q = getQuestion(qid);
          const estimatedMs = (q?.estimatedSeconds ?? 60) * 1000;
          const rushed = rec.answered && rec.responseTimeMs < RUSHED_FRACTION * estimatedMs;
          if (rec.flagged || rushed) {
            out.push({
              key: `${s.index}:${qid}`,
              sectionIdx: s.index,
              sectionLabel: s.index + 1,
              qPos,
              questionId: qid,
              flagged: rec.flagged,
              rushed,
              timedChoice: rec.choice,
              timedCorrect: rec.answered && rec.correct,
              responseTimeMs: rec.responseTimeMs,
              estimatedMs,
            });
          }
        });
      }
      if (!cancelled) {
        setCandidates(out);
        setPhase('list');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, runId]);

  const startReview = () => {
    reviewStartedAt.current = Date.now();
    setReviewIdx(0);
    setPhase('review');
  };

  const handleReviewed = (r: RunnerResult) => {
    const key = candidates[reviewIdx]?.key;
    if (!key) return;
    setReviewed((prev) => ({
      ...prev,
      [key]: { correct: r.correct, responseTimeMs: r.responseTimeMs },
    }));
    if (reviewIdx + 1 < candidates.length) {
      setReviewIdx(reviewIdx + 1);
    } else {
      setPhase('reveal');
    }
  };

  const summary = useMemo(() => {
    const counts = { timing: 0, conceptual: 0, overthinking: 0, stable: 0 };
    for (const c of candidates) {
      const rev = reviewed[c.key];
      if (!rev) continue;
      const cls = classify(c.timedCorrect, rev.correct).title;
      if (cls === 'Timing issue') counts.timing += 1;
      else if (cls.startsWith('Conceptual')) counts.conceptual += 1;
      else if (cls.startsWith('Overthinking')) counts.overthinking += 1;
      else counts.stable += 1;
    }
    return counts;
  }, [candidates, reviewed]);

  // Log the second-pass session once the reveal is reached.
  useEffect(() => {
    if (phase !== 'reveal' || loggedRef.current || !runId) return;
    loggedRef.current = true;
    const correctCount = candidates.filter((c) => reviewed[c.key]?.correct).length;
    void logPracticeSession({
      sessionId: `${runId}:second-pass`,
      mode: 'second-pass',
      startedAt: reviewStartedAt.current || Date.now(),
      endedAt: Date.now(),
      itemCount: candidates.length,
      correctCount,
      xpEarned: 0,
      interrupted: false,
      summary: JSON.stringify({ classifications: summary }),
    });
  }, [phase, runId, candidates, reviewed, summary, logPracticeSession]);

  if (!ready || phase === 'loading') {
    return (
      <Screen title="Second-pass review">
        <LoadingSkeleton lines={8} />
      </Screen>
    );
  }

  if (loadError || !run || !runId) {
    return (
      <Screen title="Second-pass review">
        <EmptyState
          title="Couldn't load the review"
          body={loadError ?? 'Something went wrong.'}
          actionLabel="Back to exam setup"
          onAction={() => navigate('/exam')}
        />
      </Screen>
    );
  }

  if (phase === 'list' && candidates.length === 0) {
    return (
      <Screen title="Second-pass review">
        <EmptyState
          title="Nothing to review"
          body="No flagged questions and no rushed answers in this run — a clean, deliberate performance."
          actionLabel="Back to results"
          onAction={() => navigate(`/exam/results/${runId}`)}
        />
      </Screen>
    );
  }

  if (phase === 'list') {
    return (
      <Screen title="Second-pass review">
        <p className="ex-lede">
          Revisit the questions you flagged or answered unusually fast —{' '}
          <strong>untimed, with no feedback until the end</strong>. Then we'll
          compare your timed and reviewed answers to find timing issues vs.
          concept gaps.
        </p>
        <ul className="ex-candidates">
          {candidates.map((c) => (
            <li key={c.key} className="ex-candidate">
              <div>
                <strong>
                  Section {c.sectionLabel} · Q{c.qPos + 1}
                </strong>
                <span className="ex-muted"> · {getQuestion(c.questionId)?.questionType ?? 'question'}</span>
              </div>
              <div className="ex-badges">
                {c.flagged && <span className="ex-badge ex-badge--flag">⚑ Flagged</span>}
                {c.rushed && (
                  <span className="ex-badge ex-badge--rush">
                    Rushed · {formatClock(c.responseTimeMs)} of ~{formatClock(c.estimatedMs)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="ex-actions">
          <Button fullWidth onClick={startReview}>
            Start second-pass review ({candidates.length})
          </Button>
          <Button variant="ghost" fullWidth onClick={() => navigate(`/exam/results/${runId}`)}>
            Back to results
          </Button>
        </div>
      </Screen>
    );
  }

  if (phase === 'review') {
    const c = candidates[reviewIdx];
    return (
      <Screen title={`Review ${reviewIdx + 1} of ${candidates.length}`}>
        <p className="ex-muted">
          Section {c.sectionLabel} · Q{c.qPos + 1} — answer fresh, untimed.
        </p>
        <QuestionRunner
          key={c.key}
          questionId={c.questionId}
          mode="review"
          sessionId={`${runId}:second-pass`}
          deferred
          initialChoice={c.timedChoice}
          onAnswer={handleReviewed}
        />
      </Screen>
    );
  }

  // Reveal
  return (
    <Screen title="Second-pass results">
      <p className="ex-lede">
        Timed vs. reviewed vs. correct — what changed when the clock was off?
      </p>
      <div className="ex-statgrid">
        <StatCard label="Timing issues" value={String(summary.timing)} sub="knew it, clock beat you" />
        <StatCard label="Conceptual" value={String(summary.conceptual)} sub="review the explanation" />
        <StatCard label="Overthinking" value={String(summary.overthinking)} sub="trust your first read" />
        <StatCard label="Stable" value={String(summary.stable)} sub="solid under pressure" />
      </div>
      <ul className="ex-reveal">
        {candidates.map((c) => {
          const rev = reviewed[c.key];
          const q = getQuestion(c.questionId);
          const cls = classify(c.timedCorrect, rev?.correct ?? false);
          return (
            <li key={c.key} className="ex-card ex-reveal-card">
              <div className="ex-card-head">
                <h3>
                  Section {c.sectionLabel} · Q{c.qPos + 1}
                </h3>
                <span className="ex-badge">{cls.title}</span>
              </div>
              <dl className="ex-facts">
                <div>
                  <dt>Timed</dt>
                  <dd>{choiceLabel(c.timedChoice, c.timedCorrect)}</dd>
                </div>
                <div>
                  <dt>Reviewed</dt>
                  <dd>{rev ? (rev.correct ? '✓' : '✗') : '—'}</dd>
                </div>
                <div>
                  <dt>Correct</dt>
                  <dd>{q ? LETTERS[q.correctIndex] : '?'}</dd>
                </div>
              </dl>
              <p className="ex-muted">{cls.body}</p>
              <Link className="ex-link" to={`/practice/q/${c.questionId}`}>
                Review the explanation →
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="ex-actions">
        <Button fullWidth onClick={() => navigate(`/exam/results/${runId}`)}>
          Back to results
        </Button>
        <Button variant="ghost" fullWidth onClick={() => navigate('/practice')}>
          Back to Practice
        </Button>
      </div>
    </Screen>
  );
}
