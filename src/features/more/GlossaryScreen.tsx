import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen, Field, Sheet, EmptyState, useToast } from '../../components';
import { GLOSSARY, type GlossaryTerm } from '../../content';
import { db } from '../../db/db';
import { MoreBack, useTable } from './common';

export default function GlossaryScreen() {
  const toast = useToast();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<GlossaryTerm | null>(null);

  const [bookmarks, , reloadBookmarks] = useTable(() =>
    db.bookmarks.where('kind').equals('glossary').toArray(),
  );

  const savedTerms = useMemo(
    () => new Set(bookmarks.map((b) => b.refId)),
    [bookmarks],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.definition.toLowerCase().includes(q),
    );
  }, [query]);

  const toggleBookmark = async (term: GlossaryTerm) => {
    try {
      const existing = await db.bookmarks
        .where('[kind+refId]')
        .equals(['glossary', term.term])
        .first();
      if (existing?.id != null) {
        await db.bookmarks.delete(existing.id);
        toast('Bookmark removed.');
      } else {
        await db.bookmarks.add({ kind: 'glossary', refId: term.term, createdAt: Date.now() });
        toast('Term bookmarked.');
      }
      await reloadBookmarks();
    } catch {
      toast('Could not update bookmark. Try again.');
    }
  };

  return (
    <Screen title="Glossary">
      <div className="more-wrap">
        <MoreBack />
        <Field
          label="Search terms"
          type="search"
          placeholder="e.g. sufficient condition"
          value={query}
          onChange={setQuery}
        />

        {filtered.length === 0 ? (
          <EmptyState
            title="No matching terms"
            body={`Nothing in the glossary matches "${query}". Try a different search.`}
          />
        ) : (
          <div className="more-list" role="list">
            {filtered.map((g) => (
              <button
                key={g.term}
                type="button"
                className="more-term"
                role="listitem"
                onClick={() => setSelected(g)}
              >
                <span className="more-term-name">{g.term}</span>
                {savedTerms.has(g.term) && <span aria-label="Bookmarked">★</span>}
                <span className="more-row-chev" aria-hidden="true">›</span>
              </button>
            ))}
          </div>
        )}

        <Sheet
          open={selected != null}
          onClose={() => setSelected(null)}
          title={selected?.term ?? ''}
        >
          {selected && (
            <div className="more-sheet-form">
              <div className="more-def-block">
                <h4>Definition</h4>
                <p>{selected.definition}</p>
              </div>
              <div className="more-def-block">
                <h4>Example</h4>
                <p>{selected.example}</p>
              </div>
              <div className="more-def-block">
                <h4>Common confusion</h4>
                <p>{selected.commonConfusion}</p>
              </div>
              {selected.lessonIds.length > 0 && (
                <div className="more-def-block">
                  <h4>Taught in</h4>
                  <div className="more-entry-cta">
                    {selected.lessonIds.map((id) => (
                      <button
                        key={id}
                        type="button"
                        className="more-bookmark-btn"
                        onClick={() => {
                          setSelected(null);
                          navigate(`/learn/lesson/${id}`);
                        }}
                      >
                        Lesson {id}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button
                type="button"
                className={`more-bookmark-btn${savedTerms.has(selected.term) ? ' more-bookmark-btn--on' : ''}`}
                onClick={() => void toggleBookmark(selected)}
                aria-pressed={savedTerms.has(selected.term)}
              >
                {savedTerms.has(selected.term) ? '★ Bookmarked' : '☆ Bookmark this term'}
              </button>
            </div>
          )}
        </Sheet>
      </div>
    </Screen>
  );
}
