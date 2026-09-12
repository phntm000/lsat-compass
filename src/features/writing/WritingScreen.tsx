import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  Button,
  EmptyState,
  LoadingSkeleton,
  Screen,
  Sheet,
  useToast,
} from '../../components';
import { LessonReader } from '../learn/LessonReader';
import { getLesson } from '../../content';
import { useStudy } from '../../state/study';
import { db } from '../../db/db';
import type { EssayRecord } from '../../engine/db-schema';
import { getWritingPrompt, WRITING_PROMPTS } from './prompts';
import EssayScreen from './EssayScreen';
import './writing.css';

const WRITING_LESSON_IDS = ['w.1', 'w.2', 'w.3', 'w.4', 'w.5', 'w.6', 'w.7', 'w.8', 'w.9'];

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function avgRubric(essay: EssayRecord): string | null {
  const vals = Object.values(essay.selfAssessment ?? {});
  if (vals.length === 0) return null;
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return avg.toFixed(1);
}

const RUBRIC_LABELS: Record<string, string> = {
  thesis: 'Thesis',
  perspectives: 'Use of perspectives',
  counterargument: 'Counterargument',
  organization: 'Organization',
  clarity: 'Clarity',
};

function WritingHub() {
  const { ready, lessonProgress } = useStudy();
  const navigate = useNavigate();
  const toast = useToast();

  const [readerLessonId, setReaderLessonId] = useState<string | null>(null);
  const [essays, setEssays] = useState<EssayRecord[] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const lessons = WRITING_LESSON_IDS.map((id) => getLesson(id)).filter(
    (l): l is NonNullable<typeof l> => l != null,
  );

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    db.essays
      .orderBy('createdAt')
      .reverse()
      .toArray()
      .then((rows) => {
        if (!cancelled) setEssays(rows);
      })
      .catch(() => {
        if (!cancelled) setEssays([]);
      });
    return () => {
      cancelled = true;
    };
  }, [ready]);

  const deleteSelected = async () => {
    if (selectedId == null) return;
    try {
      await db.essays.delete(selectedId);
      setEssays((prev) => (prev ?? []).filter((e) => e.id !== selectedId));
      setSelectedId(null);
      setConfirmingDelete(false);
      toast('Essay deleted.');
    } catch {
      toast('Couldn’t delete the essay. Try again.', { title: 'Delete failed' });
    }
  };

  if (!ready || essays === null) {
    return (
      <Screen title="Writing">
        <LoadingSkeleton lines={8} />
      </Screen>
    );
  }

  if (readerLessonId) {
    return (
      <div className="wr-reader-wrap">
        <div className="wr-backbar">
          <Button variant="ghost" onClick={() => setReaderLessonId(null)}>
            ← Back to Writing
          </Button>
        </div>
        <LessonReader lessonId={readerLessonId} />
      </div>
    );
  }

  const selected = selectedId != null ? essays.find((e) => e.id === selectedId) ?? null : null;
  const selectedPrompt = selected ? getWritingPrompt(selected.promptId) : undefined;

  return (
    <Screen title="Writing">
      <p className="wr-disclaimer">Argumentative Writing is unscored — this is practice only.</p>

      <section aria-labelledby="wr-lessons">
        <h2 id="wr-lessons" className="wr-section-title">Lessons</h2>
        <ul className="wr-list">
          {lessons.map((lesson) => {
            const done = lessonProgress[lesson.id] === 'done';
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  className="wr-row"
                  onClick={() => setReaderLessonId(lesson.id)}
                >
                  <span className="wr-row-main">
                    <span className="wr-row-title">
                      {done && (
                        <span className="wr-done" aria-label="Completed">
                          ✓
                        </span>
                      )}
                      {lesson.title}
                    </span>
                    <span className="wr-row-meta">{lesson.estimatedMinutes} min</span>
                  </span>
                  <span className="wr-row-chev" aria-hidden="true">
                    ›
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="wr-prompts">
        <h2 id="wr-prompts" className="wr-section-title">Prompt practice</h2>
        <p className="wr-section-sub">15-minute analysis, then a 35-minute timed essay.</p>
        <ul className="wr-cards">
          {WRITING_PROMPTS.map((prompt) => (
            <li key={prompt.id} className="wr-card">
              <h3 className="wr-card-title">{prompt.title}</h3>
              <p className="wr-card-bg">{prompt.background.slice(0, 160)}…</p>
              <p className="wr-card-meta">
                {prompt.perspectives.length} perspectives · untimed preview, timed writing
              </p>
              <Button
                variant="primary"
                fullWidth
                onClick={() => navigate(`essay/${prompt.id}`)}
              >
                Start timed practice
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="wr-history">
        <h2 id="wr-history" className="wr-section-title">Essay history</h2>
        {essays.length === 0 ? (
          <EmptyState
            title="No essays yet"
            body="Complete a timed practice above — your finished essays and self-assessments will appear here."
          />
        ) : (
          <ul className="wr-list">
            {essays.map((essay) => {
              const prompt = getWritingPrompt(essay.promptId);
              const avg = avgRubric(essay);
              return (
                <li key={essay.id}>
                  <button
                    type="button"
                    className="wr-row"
                    onClick={() => {
                      setSelectedId(essay.id ?? null);
                      setConfirmingDelete(false);
                    }}
                  >
                    <span className="wr-row-main">
                      <span className="wr-row-title">{prompt?.title ?? 'Practice essay'}</span>
                      <span className="wr-row-meta">
                        {formatDate(essay.createdAt)} · {essay.wordCount}{' '}
                        {essay.wordCount === 1 ? 'word' : 'words'}
                        {avg !== null && ` · avg ${avg}/5`}
                      </span>
                    </span>
                    <span className="wr-row-chev" aria-hidden="true">
                      ›
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <Sheet
        open={selected !== null}
        onClose={() => {
          setSelectedId(null);
          setConfirmingDelete(false);
        }}
        title={selectedPrompt?.title ?? 'Essay'}
      >
        {selected && (
          <div className="wr-detail">
            <p className="wr-detail-meta">
              {formatDate(selected.createdAt)} · {selected.wordCount}{' '}
              {selected.wordCount === 1 ? 'word' : 'words'}
            </p>
            {selected.thesis && (
              <div className="wr-detail-block">
                <h3 className="wr-detail-h">Thesis</h3>
                <p>{selected.thesis}</p>
              </div>
            )}
            {selected.selfAssessment && (
              <div className="wr-detail-block">
                <h3 className="wr-detail-h">Self-assessment</h3>
                <dl className="wr-detail-rubric">
                  {Object.entries(selected.selfAssessment).map(([key, value]) => (
                    <div key={key} className="wr-detail-rubric-row">
                      <dt>{RUBRIC_LABELS[key] ?? key}</dt>
                      <dd>{value}/5</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <div className="wr-detail-block">
              <h3 className="wr-detail-h">Essay</h3>
              <p className="wr-detail-body">{selected.body}</p>
            </div>
            {confirmingDelete ? (
              <div className="wr-actions">
                <Button variant="ghost" fullWidth onClick={() => setConfirmingDelete(false)}>
                  Keep it
                </Button>
                <Button variant="danger" fullWidth onClick={deleteSelected}>
                  Yes, delete
                </Button>
              </div>
            ) : (
              <div className="wr-actions">
                <Button variant="danger" fullWidth onClick={() => setConfirmingDelete(true)}>
                  Delete essay
                </Button>
              </div>
            )}
          </div>
        )}
      </Sheet>
    </Screen>
  );
}

export default function WritingScreen() {
  return (
    <Routes>
      <Route index element={<WritingHub />} />
      <Route path="essay/:promptId" element={<EssayScreen />} />
    </Routes>
  );
}
