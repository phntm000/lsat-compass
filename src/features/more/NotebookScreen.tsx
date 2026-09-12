import { useMemo, useState } from 'react';
import { Screen, Button, Field, Sheet, EmptyState, LoadingSkeleton, useToast } from '../../components';
import { db } from '../../db/db';
import type { NoteRecord } from '../../engine/db-schema';
import { MoreBack, useTable } from './common';

type RefType = NoteRecord['refType'];

const REF_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'None' },
  { value: 'question', label: 'Question' },
  { value: 'lesson', label: 'Lesson' },
  { value: 'glossary', label: 'Glossary term' },
  { value: 'general', label: 'General' },
];

interface NoteForm {
  title: string;
  body: string;
  tags: string;
  refType: string;
  refId: string;
}

const EMPTY_FORM: NoteForm = { title: '', body: '', tags: '', refType: '', refId: '' };

function parseTags(s: string): string[] {
  return s.split(',').map((t) => t.trim()).filter(Boolean);
}

export default function NotebookScreen() {
  const toast = useToast();
  const [notes, loading, reload] = useTable(() =>
    db.notes.orderBy('updatedAt').reverse().toArray(),
  );
  const [query, setQuery] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<NoteRecord | null>(null);
  const [form, setForm] = useState<NoteForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [notes, query]);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setSheetOpen(true);
  };

  const openEdit = (note: NoteRecord) => {
    setEditing(note);
    setForm({
      title: note.title,
      body: note.body,
      tags: note.tags.join(', '),
      refType: note.refType ?? '',
      refId: note.refId ?? '',
    });
    setSheetOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast('Give the note a title.');
      return;
    }
    setSaving(true);
    try {
      const now = Date.now();
      const refType = (form.refType || null) as RefType;
      const payload = {
        title: form.title.trim(),
        body: form.body,
        tags: parseTags(form.tags),
        refType,
        refId: form.refId.trim() || null,
        updatedAt: now,
      };
      if (editing?.id != null) {
        await db.notes.update(editing.id, payload);
        toast('Note updated.');
      } else {
        await db.notes.add({ ...payload, createdAt: now });
        toast('Note saved.');
      }
      setSheetOpen(false);
      await reload();
    } catch {
      toast('Could not save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (note: NoteRecord) => {
    if (note.id == null) return;
    if (!window.confirm(`Delete "${note.title}"?`)) return;
    try {
      await db.notes.delete(note.id);
      await reload();
      toast('Note deleted.');
    } catch {
      toast('Could not delete. Try again.');
    }
  };

  const fmtDate = (ts: number) => new Date(ts).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <Screen title="Notebook">
      <div className="more-wrap">
        <MoreBack />
        <Field
          label="Search notes"
          type="search"
          placeholder="Title, body, or tag"
          value={query}
          onChange={setQuery}
        />
        <Button fullWidth onClick={openNew}>New note</Button>

        {loading ? (
          <LoadingSkeleton lines={4} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={notes.length === 0 ? 'No notes yet' : 'No matching notes'}
            body={
              notes.length === 0
                ? 'Save rules and insights as you study.'
                : `Nothing matches "${query}".`
            }
            actionLabel={notes.length === 0 ? 'New note' : undefined}
            onAction={notes.length === 0 ? openNew : undefined}
          />
        ) : (
          <div className="more-entries">
            {filtered.map((note) => (
              <div key={note.id} className="more-entry">
                <div className="more-entry-head">
                  <div>
                    <div className="more-entry-title">{note.title}</div>
                    <div className="more-entry-sub">
                      Updated {fmtDate(note.updatedAt)}
                      {note.refType ? ` · ${note.refType}${note.refId ? `: ${note.refId}` : ''}` : ''}
                    </div>
                  </div>
                </div>
                {note.body && (
                  <div className="more-entry-detail">
                    {note.body.length > 160 ? `${note.body.slice(0, 160)}…` : note.body}
                  </div>
                )}
                {note.tags.length > 0 && (
                  <div className="more-tags">
                    {note.tags.map((t) => (
                      <span key={t} className="more-tag">{t}</span>
                    ))}
                  </div>
                )}
                <div className="more-entry-cta">
                  <Button variant="ghost" onClick={() => openEdit(note)}>Edit</Button>
                  <Button variant="danger" onClick={() => void handleDelete(note)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Sheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title={editing ? 'Edit note' : 'New note'}
        >
          <div className="more-sheet-form">
            <Field label="Title" placeholder="e.g. Flaw: confusing correlation and causation" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            <div>
              <label className="more-field-label" htmlFor="note-body">Body</label>
              <textarea
                id="note-body"
                className="more-textarea"
                placeholder="Write the rule or insight in your own words…"
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              />
            </div>
            <Field
              label="Tags (comma separated)"
              placeholder="e.g. flaw, LR, must-review"
              value={form.tags}
              onChange={(v) => setForm((f) => ({ ...f, tags: v }))}
            />
            <div>
              <label className="more-field-label" htmlFor="note-reftype">Linked to (optional)</label>
              <select
                id="note-reftype"
                className="more-select"
                value={form.refType}
                onChange={(e) => setForm((f) => ({ ...f, refType: e.target.value }))}
              >
                {REF_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            {form.refType && form.refType !== 'general' && (
              <Field
                label="Reference ID"
                placeholder="e.g. lesson 1.4, question id, or glossary term"
                value={form.refId}
                onChange={(v) => setForm((f) => ({ ...f, refId: v }))}
              />
            )}
            <Button fullWidth disabled={saving} onClick={() => void handleSave()}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Save note'}
            </Button>
          </div>
        </Sheet>
      </div>
    </Screen>
  );
}
