import { useState } from 'react';
import { Screen, Button, Field, Sheet, EmptyState, LoadingSkeleton, useToast } from '../../components';
import { db } from '../../db/db';
import type { OfficialPracticeLog } from '../../engine/db-schema';
import { MoreBack, useTable } from './common';

interface LogForm {
  testName: string;
  date: string;
  rawScore: string;
  scaledScore: string;
  lr1Correct: string; lr1Total: string;
  lr2Correct: string; lr2Total: string;
  rcCorrect: string; rcTotal: string;
  timingNotes: string;
  missedQuestions: string;
  questionTypes: string;
  reasonsMissed: string;
  confidence: string;
  lessonsLearned: string;
}

const EMPTY_FORM: LogForm = {
  testName: '', date: '', rawScore: '', scaledScore: '',
  lr1Correct: '', lr1Total: '', lr2Correct: '', lr2Total: '',
  rcCorrect: '', rcTotal: '',
  timingNotes: '', missedQuestions: '', questionTypes: '',
  reasonsMissed: '', confidence: '', lessonsLearned: '',
};

function toNum(s: string): number | null {
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? null : n;
}

function toForm(log: OfficialPracticeLog): LogForm {
  const str = (n: number | null) => (n == null ? '' : String(n));
  return {
    testName: log.testName, date: log.date,
    rawScore: str(log.rawScore), scaledScore: str(log.scaledScore),
    lr1Correct: str(log.lr1Correct), lr1Total: str(log.lr1Total),
    lr2Correct: str(log.lr2Correct), lr2Total: str(log.lr2Total),
    rcCorrect: str(log.rcCorrect), rcTotal: str(log.rcTotal),
    timingNotes: log.timingNotes, missedQuestions: log.missedQuestions,
    questionTypes: log.questionTypes, reasonsMissed: log.reasonsMissed,
    confidence: log.confidence, lessonsLearned: log.lessonsLearned,
  };
}

function toRecord(form: LogForm): Omit<OfficialPracticeLog, 'id'> {
  return {
    testName: form.testName.trim(),
    date: form.date,
    rawScore: toNum(form.rawScore),
    scaledScore: toNum(form.scaledScore),
    lr1Correct: toNum(form.lr1Correct), lr1Total: toNum(form.lr1Total),
    lr2Correct: toNum(form.lr2Correct), lr2Total: toNum(form.lr2Total),
    rcCorrect: toNum(form.rcCorrect), rcTotal: toNum(form.rcTotal),
    timingNotes: form.timingNotes.trim(),
    missedQuestions: form.missedQuestions.trim(),
    questionTypes: form.questionTypes.trim(),
    reasonsMissed: form.reasonsMissed.trim(),
    confidence: form.confidence.trim(),
    lessonsLearned: form.lessonsLearned.trim(),
  };
}

function NumField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return <Field label={label} type="number" inputMode="numeric" value={value} onChange={onChange} />;
}

export default function OfficialLogScreen() {
  const toast = useToast();
  const [logs, loading, reload] = useTable(() =>
    db.officialLogs.orderBy('date').reverse().toArray(),
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<OfficialPracticeLog | null>(null);
  const [form, setForm] = useState<LogForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof LogForm) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setSheetOpen(true);
  };

  const openEdit = (log: OfficialPracticeLog) => {
    setEditing(log);
    setForm(toForm(log));
    setSheetOpen(true);
  };

  const handleSave = async () => {
    if (!form.testName.trim()) {
      toast('Give the entry a name, e.g. "PrepTest 158 (LawHub)".');
      return;
    }
    if (!form.date) {
      toast('Pick the date you took the test.');
      return;
    }
    setSaving(true);
    try {
      if (editing?.id != null) {
        await db.officialLogs.update(editing.id, toRecord(form));
        toast('Entry updated.');
      } else {
        await db.officialLogs.add(toRecord(form));
        toast('Official score logged.');
      }
      setSheetOpen(false);
      await reload();
    } catch {
      toast('Could not save. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (log: OfficialPracticeLog) => {
    if (log.id == null) return;
    if (!window.confirm(`Delete "${log.testName}"?`)) return;
    try {
      await db.officialLogs.delete(log.id);
      await reload();
      toast('Entry deleted.');
    } catch {
      toast('Could not delete. Try again.');
    }
  };

  const sectionTotal = (log: OfficialPracticeLog) => {
    const parts = [
      log.lr1Correct != null && log.lr1Total != null ? `${log.lr1Correct}/${log.lr1Total}` : null,
      log.lr2Correct != null && log.lr2Total != null ? `${log.lr2Correct}/${log.lr2Total}` : null,
      log.rcCorrect != null && log.rcTotal != null ? `${log.rcCorrect}/${log.rcTotal}` : null,
    ].filter(Boolean);
    return parts.length ? parts.join(' · ') : null;
  };

  return (
    <Screen title="Official practice log">
      <div className="more-wrap">
        <MoreBack />
        <div className="more-card">
          <p>
            Official scores come from LSAC/LawHub PrepTests you take outside
            this app. Log them here to track real progress separately from
            in-app practice.
          </p>
          <p>
            In-app accuracy and official PrepTest scores are different things —
            this log never mixes with your practice stats.
          </p>
        </div>

        <Button fullWidth onClick={openAdd}>Add entry</Button>

        {loading ? (
          <LoadingSkeleton lines={4} />
        ) : logs.length === 0 ? (
          <EmptyState
            title="No official scores yet"
            body="Take a PrepTest on LawHub, then log your score here to watch real progress over time."
            actionLabel="Add entry"
            onAction={openAdd}
          />
        ) : (
          <div className="more-entries">
            {logs.map((log) => (
              <div key={log.id} className="more-entry">
                <div className="more-entry-head">
                  <div>
                    <div className="more-entry-title">{log.testName}</div>
                    <div className="more-entry-sub">{log.date}</div>
                  </div>
                  {log.scaledScore != null && (
                    <div className="more-entry-score">{log.scaledScore}</div>
                  )}
                </div>
                <div className="more-entry-detail">
                  {log.rawScore != null && <div>Raw: {log.rawScore}</div>}
                  {sectionTotal(log) && <div>Sections (LR1 · LR2 · RC): {sectionTotal(log)}</div>}
                  {log.lessonsLearned && <div>Lessons: {log.lessonsLearned}</div>}
                </div>
                <div className="more-entry-cta">
                  <Button variant="ghost" onClick={() => openEdit(log)}>Edit</Button>
                  <Button variant="danger" onClick={() => void handleDelete(log)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Sheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title={editing ? 'Edit entry' : 'Log official score'}
        >
          <div className="more-sheet-form">
            <Field label="Test name" placeholder="e.g. PrepTest 158 (LawHub)" value={form.testName} onChange={set('testName')} />
            <Field label="Date taken" type="date" value={form.date} onChange={set('date')} />
            <div className="more-row-grid">
              <NumField label="Raw score" value={form.rawScore} onChange={set('rawScore')} />
              <NumField label="Scaled score" value={form.scaledScore} onChange={set('scaledScore')} />
            </div>
            <div>
              <span className="more-field-label">LR section 1 (correct / total)</span>
              <div className="more-row-grid">
                <NumField label="LR1 correct" value={form.lr1Correct} onChange={set('lr1Correct')} />
                <NumField label="LR1 total" value={form.lr1Total} onChange={set('lr1Total')} />
              </div>
            </div>
            <div>
              <span className="more-field-label">LR section 2 (correct / total)</span>
              <div className="more-row-grid">
                <NumField label="LR2 correct" value={form.lr2Correct} onChange={set('lr2Correct')} />
                <NumField label="LR2 total" value={form.lr2Total} onChange={set('lr2Total')} />
              </div>
            </div>
            <div>
              <span className="more-field-label">RC section (correct / total)</span>
              <div className="more-row-grid">
                <NumField label="RC correct" value={form.rcCorrect} onChange={set('rcCorrect')} />
                <NumField label="RC total" value={form.rcTotal} onChange={set('rcTotal')} />
              </div>
            </div>
            <Field label="Timing notes" placeholder="e.g. rushed last 5 of LR2" value={form.timingNotes} onChange={set('timingNotes')} />
            <Field label="Missed questions" placeholder="e.g. LR1 #7, #12; RC #19" value={form.missedQuestions} onChange={set('missedQuestions')} />
            <Field label="Question types missed" placeholder="e.g. flaw, parallel reasoning" value={form.questionTypes} onChange={set('questionTypes')} />
            <Field label="Why you missed them" placeholder="e.g. misread the conclusion" value={form.reasonsMissed} onChange={set('reasonsMissed')} />
            <Field label="Confidence going in" placeholder="e.g. high, shaky on RC" value={form.confidence} onChange={set('confidence')} />
            <div>
              <label className="more-field-label" htmlFor="log-lessons">Lessons learned</label>
              <textarea
                id="log-lessons"
                className="more-textarea"
                placeholder="What will you do differently next time?"
                value={form.lessonsLearned}
                onChange={(e) => set('lessonsLearned')(e.target.value)}
              />
            </div>
            <Button fullWidth disabled={saving} onClick={() => void handleSave()}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Log score'}
            </Button>
          </div>
        </Sheet>
      </div>
    </Screen>
  );
}
