import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, Button, Sheet, EmptyState, LoadingSkeleton, useToast } from '../../components';
import { getLesson, getQuestion, getGlossaryTerm, getPassage } from '../../content';
import { db } from '../../db/db';
import type { BookmarkRecord } from '../../engine/db-schema';
import { MoreBack, useTable } from './common';

const KIND_LABELS: Record<BookmarkRecord['kind'], string> = {
  lesson: 'Lesson',
  question: 'Question',
  glossary: 'Glossary',
  passage: 'Passage',
};

function resolveTitle(b: BookmarkRecord): string {
  switch (b.kind) {
    case 'lesson': {
      const l = getLesson(b.refId);
      return l ? `Lesson ${l.id} — ${l.title}` : `Lesson ${b.refId}`;
    }
    case 'question': {
      const q = getQuestion(b.refId);
      return q ? `${q.sectionType} · ${q.questionType} · ${q.editorialDifficulty}/5` : `Question ${b.refId}`;
    }
    case 'glossary': {
      const g = getGlossaryTerm(b.refId);
      return g ? g.term : b.refId;
    }
    case 'passage': {
      const p = getPassage(b.refId);
      return p ? p.title : `Passage ${b.refId}`;
    }
  }
}

export default function SavedScreen() {
  const toast = useToast();
  const navigate = useNavigate();
  const [bookmarks, loading, reload] = useTable(() =>
    db.bookmarks.orderBy('createdAt').reverse().toArray(),
  );
  const [passageInfo, setPassageInfo] = useState<BookmarkRecord | null>(null);

  const passage = useMemo(
    () => (passageInfo ? getPassage(passageInfo.refId) : undefined),
    [passageInfo],
  );

  const handleTap = (b: BookmarkRecord) => {
    switch (b.kind) {
      case 'lesson':
        navigate(`/learn/lesson/${b.refId}`);
        break;
      case 'question':
        navigate(`/practice/q/${b.refId}`);
        break;
      case 'glossary':
        navigate('glossary');
        break;
      case 'passage':
        setPassageInfo(b);
        break;
    }
  };

  const handleRemove = async (b: BookmarkRecord) => {
    if (b.id == null) return;
    try {
      await db.bookmarks.delete(b.id);
      await reload();
      toast('Bookmark removed.');
    } catch {
      toast('Could not remove. Try again.');
    }
  };

  return (
    <Screen title="Saved bookmarks">
      <div className="more-wrap">
        <MoreBack />

        {loading ? (
          <LoadingSkeleton lines={4} />
        ) : bookmarks.length === 0 ? (
          <EmptyState
            title="Nothing saved yet"
            body="Bookmark lessons, questions, and terms to find them here."
          />
        ) : (
          <div className="more-list" role="list">
            {bookmarks.map((b) => (
              <div key={b.id} className="more-bookmark-item" role="listitem">
                <span className="more-kind">{KIND_LABELS[b.kind]}</span>
                <div className="more-entry-head">
                  <div className="more-entry-title" style={{ textTransform: b.kind === 'glossary' ? 'capitalize' as const : 'none' }}>
                    {resolveTitle(b)}
                  </div>
                </div>
                <div className="more-entry-cta">
                  <Button variant="ghost" onClick={() => handleTap(b)}>
                    {b.kind === 'passage' ? 'Details' : 'Open'}
                  </Button>
                  <Button variant="danger" onClick={() => void handleRemove(b)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Sheet
          open={passageInfo != null}
          onClose={() => setPassageInfo(null)}
          title={passage?.title ?? 'Passage'}
        >
          {passageInfo && (
            <div className="more-sheet-form">
              {passage ? (
                <>
                  <div className="more-def-block">
                    <h4>Domain</h4>
                    <p>{passage.domain}</p>
                  </div>
                  <div className="more-def-block">
                    <h4>Questions</h4>
                    <p>{passage.questionIds.length} linked questions · ~{passage.estimatedMinutes} min</p>
                  </div>
                </>
              ) : (
                <p className="more-note">This passage is no longer available.</p>
              )}
              <Button variant="danger" fullWidth onClick={() => {
                setPassageInfo(null);
                void handleRemove(passageInfo);
              }}>
                Remove bookmark
              </Button>
            </div>
          )}
        </Sheet>
      </div>
    </Screen>
  );
}
