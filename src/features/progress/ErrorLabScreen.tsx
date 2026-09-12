import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Screen from '../../components/Screen';
import {
  Button,
  EmptyState,
  LoadingSkeleton,
  Sheet,
} from '../../components';
import { useStudy } from '../../state/study';
import { db } from '../../db/db';
import { allSkills, getQuestion } from '../../content';
import type { Question, Skill } from '../../content';
import type { QuestionAttemptRecord } from '../../engine/db-schema';
import './progress.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const skillById = new Map<string, Skill>(allSkills.map((s) => [s.id, s]));
function skillTitle(id: string): string {
  return skillById.get(id)?.plainTitle ?? id;
}

function latestPerQuestion(
  arr: QuestionAttemptRecord[],
): QuestionAttemptRecord[] {
  const m = new Map<string, QuestionAttemptRecord>();
  for (const a of arr) {
    const cur = m.get(a.questionId);
    if (!cur || a.timestamp > cur.timestamp) m.set(a.questionId, a);
  }
  return [...m.values()].sort((x, y) => y.timestamp - x.timestamp);
}

function questionLabel(a: QuestionAttemptRecord): string {
  const q = getQuestion(a.questionId);
  if (!q) return a.questionId;
  const skillId = a.skillIds[0] ?? q.questionType;
  return `${q.sectionType} · ${skillTitle(skillId)} · Difficulty ${q.editorialDifficulty}`;
}

function ReviewSheet({
  questionId,
  onClose,
  onMarked,
}: {
  questionId: string | null;
  onClose: () => void;
  onMarked: (questionId: string) => Promise<void>;
}) {
  const [marking, setMarking] = useState(false);
  const q: Question | undefined =
    questionId === null ? undefined : getQuestion(questionId);
  const [attempt, setAttempt] = useState<QuestionAttemptRecord | undefined>(
    undefined,
  );

  useEffect(() => {
    if (questionId === null) return;
    let cancelled = false;
    (async () => {
      const all = await db.attempts
        .where('questionId')
        .equals(questionId)
        .toArray();
      if (!cancelled) {
        const latest = all.sort((x, y) => y.timestamp - x.timestamp)[0];
        setAttempt(latest);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [questionId]);

  const handleMark = async () => {
    if (questionId === null) return;
    setMarking(true);
    try {
      await onMarked(questionId);
    } finally {
      setMarking(false);
    }
  };

  return (
    <Sheet open={questionId !== null} onClose={onClose} title="Explanation review">
      <div className="pg-sheet">
        {!q ? (
          <p className="pg-cal-note">Question content not found.</p>
        ) : (
          <>
            <p className="pg-sheet-label">
              {q.sectionType} · {skillTitle(q.questionType)} · Difficulty {q.editorialDifficulty}
            </p>
            <h3>Quick take</h3>
            <p>{q.explanationQuick}</p>
            <h3>Walkthrough</h3>
            <p>{q.explanationWalkthrough}</p>
            <h3>Choices</h3>
            {q.choices.map((ch, i) => {
              const isMine = attempt?.selectedChoice === i;
              const isCorrect = q.correctIndex === i;
              const cls = [
                'pg-choice',
                isMine && !isCorrect ? 'pg-choice--mine' : '',
                isCorrect ? 'pg-choice--correct' : '',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div className={cls} key={i}>
                  <div className="pg-choice-head">
                    <span className="pg-letter">{LETTERS[i]}</span>
                    {isMine && (
                      <span className="pg-mark pg-mark--mine">Your answer</span>
                    )}
                    {isCorrect && (
                      <span className="pg-mark pg-mark--correct">Correct answer</span>
                    )}
                  </div>
                  <p>{ch.text}</p>
                  <p className="pg-choice-exp">{q.choiceExplanations[i]}</p>
                </div>
              );
            })}
            <h3>Lesson</h3>
            <p>{q.generalLesson}</p>
            <div className="pg-sheet-cta">
              <Button
                variant="primary"
                fullWidth
                disabled={marking || attempt?.reviewedExplanation === true}
                onClick={handleMark}
              >
                {attempt?.reviewedExplanation === true
                  ? 'Reviewed ✓'
                  : marking
                    ? 'Saving…'
                    : 'Mark explanation reviewed'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}

export default function ErrorLabScreen() {
  const { ready, markExplanationReviewed } = useStudy();
  const [attempts, setAttempts] = useState<QuestionAttemptRecord[] | null>(null);
  const [reviewQid, setReviewQid] = useState<string | null>(null);

  const reload = async () => {
    setAttempts(await db.attempts.toArray());
  };

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      const a = await db.attempts.toArray();
      if (!cancelled) setAttempts(a);
    })();
    return () => {
      cancelled = true;
    };
  }, [ready]);

  const wrong = useMemo(
    () =>
      attempts === null
        ? []
        : attempts.filter(
            (a) => !a.correct && !a.questionId.startsWith('checkpoint:'),
          ),
    [attempts],
  );
  const wrongLatest = useMemo(() => latestPerQuestion(wrong), [wrong]);
  const highConf = useMemo(
    () => wrongLatest.filter((a) => (a.confidence ?? 0) >= 4),
    [wrongLatest],
  );
  const changed = useMemo(
    () =>
      attempts === null ? [] : latestPerQuestion(attempts.filter((a) => a.changedAnswer)),
    [attempts],
  );
  const skillErrors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of wrong) {
      const sid =
        a.skillIds[0] ?? getQuestion(a.questionId)?.questionType ?? 'unknown';
      counts.set(sid, (counts.get(sid) ?? 0) + 1);
    }
    return [...counts.entries()].sort((x, y) => y[1] - x[1]);
  }, [wrong]);

  const handleMarked = async (questionId: string) => {
    await markExplanationReviewed(questionId);
    await reload();
    setReviewQid(null);
  };

  if (!ready || attempts === null) {
    return (
      <Screen title="Error Lab">
        <LoadingSkeleton lines={6} />
      </Screen>
    );
  }

  const isEmpty = wrong.length === 0 && changed.length === 0;

  return (
    <Screen title="Error Lab">
      <Link to="/progress" className="pg-back">
        ← Progress
      </Link>
      {isEmpty ? (
        <EmptyState
          title="No recurring error pattern yet"
          body="Answer 15+ questions and we'll start identifying patterns."
        />
      ) : (
        <>
          {wrongLatest.length > 0 && (
            <section className="card pg-section" aria-label="Missed questions">
              <h2>Missed questions</h2>
              {wrongLatest.map((a) => (
                <div className="pg-err-row" key={a.questionId}>
                  <div className="pg-err-info">
                    <div className="pg-err-title">{questionLabel(a)}</div>
                    <div className="pg-err-meta">
                      {skillTitle(a.skillIds[0] ?? '')} ·{' '}
                      {new Date(a.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="pg-err-actions">
                    {a.reviewedExplanation && (
                      <span className="pg-reviewed">Reviewed ✓</span>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => setReviewQid(a.questionId)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </section>
          )}

          {highConf.length > 0 && (
            <section className="card pg-section" aria-label="High-confidence errors">
              <h2>Worth reviewing</h2>
              <p className="pg-cal-note">
                High-confidence answers that were wrong — these signal real
                misconceptions, not guesses.
              </p>
              {highConf.map((a) => (
                <div className="pg-err-row" key={a.questionId}>
                  <div className="pg-err-info">
                    <div className="pg-err-title">{questionLabel(a)}</div>
                    <div className="pg-err-meta">
                      Confidence {a.confidence}/5 · {skillTitle(a.skillIds[0] ?? '')}
                    </div>
                  </div>
                  <div className="pg-err-actions">
                    <Button
                      variant="ghost"
                      onClick={() => setReviewQid(a.questionId)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </section>
          )}

          {changed.length > 0 && (
            <section className="card pg-section" aria-label="Changed answers">
              <h2>Changed answers</h2>
              {changed.map((a) => (
                <div className="pg-err-row" key={a.questionId}>
                  <div className="pg-err-info">
                    <div className="pg-err-title">{questionLabel(a)}</div>
                    <div className="pg-err-meta">
                      {a.changedDirection === 'wrong-to-right'
                        ? 'You fixed it — changed wrong to right.'
                        : a.changedDirection === 'right-to-wrong'
                          ? 'Second-guessed — changed right to wrong.'
                          : 'Changed answer.'}
                    </div>
                  </div>
                  <div className="pg-err-actions">
                    <Button
                      variant="ghost"
                      onClick={() => setReviewQid(a.questionId)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </section>
          )}

          {skillErrors.length > 0 && (
            <section className="card pg-section" aria-label="Errors by skill">
              <h2>Repair by skill</h2>
              {skillErrors.map(([sid, count]) => (
                <div className="pg-err-row" key={sid}>
                  <div className="pg-err-info">
                    <div className="pg-err-title">{skillTitle(sid)}</div>
                    <div className="pg-err-meta">
                      {count} error{count === 1 ? '' : 's'}
                    </div>
                  </div>
                  <div className="pg-err-actions">
                    <Link
                      to={`/practice/session?mode=weakness-repair&skills=${encodeURIComponent(sid)}&minutes=15`}
                    >
                      <Button variant="primary">Repair</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
      <ReviewSheet
        questionId={reviewQid}
        onClose={() => setReviewQid(null)}
        onMarked={handleMarked}
      />
    </Screen>
  );
}
