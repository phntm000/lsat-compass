import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Screen from '../../components/Screen';
import {
  Button,
  ChoiceButton,
  EmptyState,
  LoadingSkeleton,
  ProgressBar,
  useToast,
} from '../../components';
import type { ChoiceState } from '../../components';
import { curriculumStages, allSkills, getLesson } from '../../content';
import type { Lesson, LessonBlock } from '../../content';
import { useStudy } from '../../state/study';
import { mdToHtml } from './md';
import { lockForLesson } from './lessonLock';
import './learn.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const flatLessons: Lesson[] = curriculumStages.flatMap((s) => s.lessons);

const skillPlainTitle = (id: string): string =>
  allSkills.find((s) => s.id === id)?.plainTitle ?? id;

/** ------------------------------------------------------------------ */
/** Block renderers                                                    */
/** ------------------------------------------------------------------ */

function CheckpointCard({
  block,
  blockIndex,
  onSolved,
}: {
  block: Extract<LessonBlock, { kind: 'checkpoint' }>;
  blockIndex: number;
  onSolved: (index: number, firstTry: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const [solved, setSolved] = useState(false);
  const reportedRef = useRef(false);

  const check = () => {
    if (selected === null || solved) return;
    if (selected === block.correctIndex) {
      const firstTry = tries === 0;
      setSolved(true);
      if (!reportedRef.current) {
        reportedRef.current = true;
        onSolved(blockIndex, firstTry);
      }
    } else {
      setTries((t) => t + 1);
    }
  };

  const stateFor = (i: number): ChoiceState => {
    if (solved) return i === block.correctIndex ? 'correct' : 'default';
    if (selected === i) return 'selected';
    return 'default';
  };

  return (
    <div className="learn-card learn-check">
      <p className="learn-card-kicker">Checkpoint</p>
      <p className="learn-check-prompt">{block.prompt}</p>
      <div className="learn-choices" role="radiogroup" aria-label="Checkpoint choices">
        {block.choices.map((choice, i) => (
          <ChoiceButton
            key={i}
            letter={LETTERS[i] ?? String(i + 1)}
            text={choice}
            state={stateFor(i)}
            disabled={solved}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>
      {!solved && (
        <>
          <Button
            variant="primary"
            fullWidth
            disabled={selected === null}
            onClick={check}
          >
            Check
          </Button>
          {tries > 0 && (
            <p className="learn-check-feedback" role="status">
              Not quite — try again.
            </p>
          )}
          {tries >= 2 && (
            <div className="learn-explanation">
              <p className="learn-explanation-title">Explanation</p>
              <p>{block.explanation}</p>
            </div>
          )}
        </>
      )}
      {solved && (
        <div className="learn-explanation">
          <p className="learn-explanation-title">Correct</p>
          <p>{block.explanation}</p>
        </div>
      )}
    </div>
  );
}

function RetrievalCard({ block }: { block: Extract<LessonBlock, { kind: 'retrieval' }> }) {
  const [revealed, setRevealed] = useState(false);
  const [grade, setGrade] = useState<'got' | 'missed' | null>(null);

  return (
    <div className="learn-card learn-retrieval">
      <p className="learn-card-kicker">Retrieval practice</p>
      <p className="learn-check-prompt">{block.prompt}</p>
      {!revealed ? (
        <Button variant="primary" fullWidth onClick={() => setRevealed(true)}>
          Reveal answer
        </Button>
      ) : (
        <>
          <div className="learn-answer">
            <p>{block.answer}</p>
          </div>
          {grade === null ? (
            <div className="learn-selfgrade">
              <Button variant="ghost" onClick={() => setGrade('got')}>
                Got it
              </Button>
              <Button variant="ghost" onClick={() => setGrade('missed')}>
                Missed it
              </Button>
            </div>
          ) : (
            <p className="learn-selfgrade-note" role="status">
              {grade === 'got' ? 'Nice — logged as recalled.' : 'Noted — this will come back for review.'}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function BlockCard({
  block,
  lesson,
  onFinish,
}: {
  block: LessonBlock;
  lesson: Lesson;
  onFinish: () => void;
}) {
  switch (block.kind) {
    case 'prose':
      return (
        <article
          className="learn-card learn-prose"
          dangerouslySetInnerHTML={{ __html: mdToHtml(block.md) }}
        />
      );
    case 'keyterm':
      return (
        <div className="learn-card learn-keyterm">
          <p className="learn-card-kicker">Key term</p>
          <h3 className="learn-card-title">{block.term}</h3>
          <p>{block.definition}</p>
        </div>
      );
    case 'example':
      return (
        <div className="learn-card learn-example">
          <p className="learn-card-kicker">Example</p>
          <h3 className="learn-card-title">{block.title}</h3>
          <p>{block.body}</p>
          {block.note && <p className="learn-note">{block.note}</p>}
        </div>
      );
    case 'worked':
      return (
        <div className="learn-card learn-worked">
          <p className="learn-card-kicker">Worked example</p>
          <h3 className="learn-card-title">{block.title}</h3>
          <ol className="learn-steps">
            {block.steps.map((s, i) => (
              <li key={i}>
                <strong>{s.label}</strong>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'misconception':
      return (
        <div className="learn-card learn-misconception">
          <p className="learn-card-kicker">Watch out</p>
          <div className="learn-misc-cols">
            <div className="learn-misc-wrong">
              <p className="learn-misc-title">Common mistake</p>
              <p>{block.wrong}</p>
            </div>
            <div className="learn-misc-right">
              <p className="learn-misc-title">Instead</p>
              <p>{block.right}</p>
            </div>
          </div>
        </div>
      );
    case 'checkpoint':
      // Rendered directly by LessonReader (needs per-block progress wiring).
      return null;
    case 'tryit': {
      const skills = lesson.skills.join(',');
      return (
        <div className="learn-card learn-tryit">
          <p className="learn-card-kicker">Practice</p>
          <p>
            {block.drillIds.length === 1
              ? 'Try 1 short drill on what you just learned.'
              : `Try ${block.drillIds.length} short drills on what you just learned.`}
          </p>
          <TryItCta skills={skills} />
        </div>
      );
    }
    case 'retrieval':
      return <RetrievalCard block={block} />;
    case 'summary':
      return (
        <div className="learn-card learn-summary">
          <p className="learn-card-kicker">Summary</p>
          <ul className="learn-summary-list">
            {block.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      );
    case 'next':
      return (
        <div className="learn-card learn-next">
          <p>{block.text}</p>
          <Button variant="primary" fullWidth onClick={onFinish}>
            Finish lesson
          </Button>
        </div>
      );
  }
}

function TryItCta({ skills }: { skills: string }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="primary"
      fullWidth
      onClick={() => navigate(`/practice/session?mode=drill&skills=${skills}&minutes=10`)}
    >
      Practice drills
    </Button>
  );
}

/** ------------------------------------------------------------------ */
/** LessonReader (named export)                                        */
/** ------------------------------------------------------------------ */

export function LessonReader({ lessonId }: { lessonId: string }) {
  const { ready, mastery, lessonProgress, startLesson, completeLesson } = useStudy();
  const navigate = useNavigate();
  const toast = useToast();

  const lesson = getLesson(lessonId);
  const [index, setIndex] = useState(0);
  const [solved, setSolved] = useState<Record<number, boolean>>({});
  const [firstTry, setFirstTry] = useState<Record<number, boolean>>({});
  const [finishing, setFinishing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const startedRef = useRef<string | null>(null);

  // startLesson once per lesson id.
  useEffect(() => {
    if (!ready || !lesson) return;
    if (startedRef.current === lesson.id) return;
    startedRef.current = lesson.id;
    startTimeRef.current = Date.now();
    void startLesson(lesson.id);
  }, [ready, lesson, startLesson]);

  // Scroll to top when the card changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [index]);

  const checkpointTotals = useMemo(() => {
    if (!lesson) return { correct: 0, total: 0 };
    let total = 0;
    let correct = 0;
    lesson.blocks.forEach((b, i) => {
      if (b.kind === 'checkpoint') {
        total += 1;
        if (firstTry[i]) correct += 1;
      }
    });
    return { correct, total };
  }, [lesson, firstTry]);

  const nextLesson = useMemo(() => {
    if (!lesson) return null;
    const currentPos = flatLessons.findIndex((l) => l.id === lesson.id);
    const after = flatLessons.slice(currentPos + 1).find((l) => lessonProgress[l.id] !== 'done');
    if (after) return after;
    return flatLessons.find((l) => l.id !== lesson.id && lessonProgress[l.id] !== 'done') ?? null;
  }, [lesson, lessonProgress]);

  if (!ready) {
    return (
      <Screen title="Lesson">
        <LoadingSkeleton lines={8} />
      </Screen>
    );
  }

  if (!lesson) {
    return (
      <Screen title="Lesson">
        <EmptyState
          title="Lesson not found"
          body="That lesson doesn't exist. Head back to the curriculum and pick another."
          actionLabel="Back to Learn"
          onAction={() => navigate('/learn')}
        />
      </Screen>
    );
  }

  const lock = lockForLesson(lesson, mastery);
  if (lock.locked) {
    const skillTitle = skillPlainTitle(lock.lockingSkillId ?? '');
    return (
      <Screen title={lesson.title}>
        <EmptyState
          title="Lesson locked"
          body={`Develop ${skillTitle} first — finish its lessons in the Learn map, then come back here.`}
          actionLabel="Back to Learn"
          onAction={() => navigate('/learn')}
        />
      </Screen>
    );
  }

  const stage = curriculumStages.find((s) => s.stage === lesson.stage);
  const blocks = lesson.blocks;
  const block = blocks[index];
  const isLast = index === blocks.length - 1;
  const needsCheckpoint = block.kind === 'checkpoint' && !solved[index];

  const handleCheckpointSolved = (blockIndex: number, first: boolean) => {
    setSolved((prev) => ({ ...prev, [blockIndex]: true }));
    if (first) setFirstTry((prev) => ({ ...prev, [blockIndex]: true }));
  };

  const finish = async () => {
    if (finishing || finished) return;
    setFinishing(true);
    const minutes = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000));
    try {
      const { xpGained: xp, newAchievements } = await completeLesson(
        lesson.id,
        checkpointTotals.correct,
        checkpointTotals.total,
        minutes,
      );
      setXpGained(xp);
      toast(`+${xp} XP`, { title: 'Lesson complete' });
      for (const a of newAchievements) {
        toast(a.description, { title: `Achievement: ${a.title}` });
      }
      setFinished(true);
      window.scrollTo(0, 0);
    } finally {
      setFinishing(false);
    }
  };

  if (finished) {
    return (
      <Screen title="Lesson complete">
        <div className="learn-card learn-complete">
          <p className="learn-card-kicker">Done</p>
          <h2 className="learn-card-title">{lesson.title}</h2>
          <p className="learn-complete-xp">+{xpGained} XP earned</p>
          {checkpointTotals.total > 0 && (
            <p className="learn-complete-checkpoints">
              Checkpoints: {checkpointTotals.correct}/{checkpointTotals.total} correct on first try
            </p>
          )}
          <div className="learn-complete-actions">
            {nextLesson && (
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate(`/learn/lesson/${nextLesson.id}`)}
              >
                Next lesson: {nextLesson.id} — {nextLesson.title}
              </Button>
            )}
            <Button variant="ghost" fullWidth onClick={() => navigate('/learn')}>
              Back to Learn
            </Button>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen title={lesson.title}>
      <div className="learn-reader">
        <div className="learn-reader-meta">
          <span>{stage?.title ?? `Stage ${lesson.stage}`}</span>
          <span aria-hidden="true"> · </span>
          <span>{lesson.estimatedMinutes} min</span>
        </div>
        {lesson.skills.length > 0 && (
          <div className="learn-chips" aria-label="Skills in this lesson">
            {lesson.skills.map((s) => (
              <span key={s} className="learn-chip">
                {skillPlainTitle(s)}
              </span>
            ))}
          </div>
        )}
        <div className="learn-pager-top">
          <span className="learn-pager-count">
            Block {index + 1} of {blocks.length}
          </span>
          <ProgressBar
            value={blocks.length === 0 ? 0 : (index + 1) / blocks.length}
            ariaLabel={`Lesson progress, block ${index + 1} of ${blocks.length}`}
          />
        </div>

        <div key={index}>
          {block.kind === 'checkpoint' ? (
            <CheckpointCard
              block={block}
              blockIndex={index}
              onSolved={handleCheckpointSolved}
            />
          ) : (
            <BlockCard block={block} lesson={lesson} onFinish={finish} />
          )}
        </div>

        <div className="learn-pager">
          <Button
            variant="ghost"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            Back
          </Button>
          {!isLast && (
            <Button
              variant="primary"
              disabled={needsCheckpoint}
              onClick={() => setIndex((i) => Math.min(blocks.length - 1, i + 1))}
            >
              Next
            </Button>
          )}
          {isLast && block.kind !== 'next' && (
            <Button variant="primary" disabled={finishing} onClick={finish}>
              {finishing ? 'Finishing…' : 'Finish lesson'}
            </Button>
          )}
        </div>
      </div>
    </Screen>
  );
}

/** ------------------------------------------------------------------ */
/** Default export: LessonScreen route (/learn/lesson/:lessonId)       */
/** ------------------------------------------------------------------ */

export default function LessonScreen() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  if (!lessonId) {
    return (
      <Screen title="Lesson">
        <EmptyState
          title="Lesson not found"
          body="No lesson was specified. Head back to the curriculum and pick one."
          actionLabel="Back to Learn"
          onAction={() => navigate('/learn')}
        />
      </Screen>
    );
  }

  return <LessonReader lessonId={lessonId} />;
}
