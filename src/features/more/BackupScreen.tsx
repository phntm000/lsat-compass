import { useRef, useState } from 'react';
import { Screen, Button, Field, LoadingSkeleton, useToast } from '../../components';
import { useStudy } from '../../state/study';
import { db, APP_VERSION, getProfile } from '../../db/db';
import {
  buildBackup,
  validateBackup,
  type BackupFile,
} from '../../engine/db-schema';
import { MoreBack } from './common';

const TABLES = [
  'profile',
  'skillStates',
  'attempts',
  'lessonProgress',
  'sessions',
  'officialLogs',
  'achievements',
  'notes',
  'bookmarks',
  'essays',
  'dailyActivity',
] as const;

type BackupTable = (typeof TABLES)[number];

function tableCounts(backup: BackupFile): { table: string; count: number }[] {
  const d = backup.data;
  return [
    { table: 'profile', count: d.profile ? 1 : 0 },
    { table: 'skillStates', count: d.skillStates.length },
    { table: 'attempts', count: d.attempts.length },
    { table: 'lessonProgress', count: d.lessonProgress.length },
    { table: 'sessions', count: d.sessions.length },
    { table: 'officialLogs', count: d.officialLogs.length },
    { table: 'achievements', count: d.achievements.length },
    { table: 'notes', count: d.notes.length },
    { table: 'bookmarks', count: d.bookmarks.length },
    { table: 'essays', count: d.essays.length },
    { table: 'dailyActivity', count: d.dailyActivity.length },
  ];
}

export default function BackupScreen() {
  const { ready, refresh } = useStudy();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [replacing, setReplacing] = useState(false);
  const [merging, setMerging] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [pending, setPending] = useState<BackupFile | null>(null);
  const [confirmText, setConfirmText] = useState('');
  const [activeReset, setActiveReset] = useState<'curriculum' | 'analytics' | 'everything' | null>(null);
  const [resetting, setResetting] = useState(false);

  if (!ready) {
    return (
      <Screen title="Backup & reset">
        <LoadingSkeleton lines={6} />
      </Screen>
    );
  }

  const handleExport = async () => {
    setExporting(true);
    try {
      const [profile, skillStates, attempts, lessonProgress, sessions, officialLogs,
        achievements, notes, bookmarks, essays, dailyActivity] = await Promise.all([
        db.profile.get('me'),
        db.skillStates.toArray(),
        db.attempts.toArray(),
        db.lessonProgress.toArray(),
        db.sessions.toArray(),
        db.officialLogs.toArray(),
        db.achievements.toArray(),
        db.notes.toArray(),
        db.bookmarks.toArray(),
        db.essays.toArray(),
        db.dailyActivity.toArray(),
      ]);
      const backup = buildBackup(APP_VERSION, {
        profile: profile ?? null,
        skillStates,
        attempts,
        lessonProgress,
        sessions,
        officialLogs,
        achievements,
        notes,
        bookmarks,
        essays,
        dailyActivity,
      });
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const now = new Date();
      const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const a = document.createElement('a');
      a.href = url;
      a.download = `lsat-compass-backup-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      const meta = await db.backupMeta.get('meta');
      await db.backupMeta.put({
        id: 'meta',
        lastExportAt: Date.now(),
        lastImportAt: meta?.lastImportAt ?? null,
        appVersion: APP_VERSION,
      });
      toast('Backup exported.');
    } catch {
      toast('Export failed. Try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleFile = async (file: File) => {
    setImportError(null);
    setPending(null);
    setImporting(true);
    try {
      const text = await file.text();
      let json: unknown;
      try {
        json = JSON.parse(text);
      } catch {
        setImportError('Invalid backup file: not valid JSON.');
        return;
      }
      const result = validateBackup(json);
      if (!result.ok || !result.backup) {
        setImportError(`Invalid backup file: ${result.error ?? 'unknown error'}`);
        return;
      }
      setPending(result.backup);
    } catch {
      setImportError('Invalid backup file: could not be read.');
    } finally {
      setImporting(false);
    }
  };

  const handleMerge = async () => {
    if (!pending) return;
    if (!window.confirm('Merge this backup into your current data? Records are matched by ID — backup records are added or updated, and anything already here that isn\u2019t in the backup is kept. Your current profile settings stay as they are.')) return;
    setMerging(true);
    try {
      const data = pending.data;
      const tables = TABLES.map((t) => db[t as BackupTable]);
      await db.transaction('rw', tables, async () => {
        // Upsert every record WITHOUT clearing: merge, not replace.
        // Profile is a singleton — the current device's settings win.
        await db.skillStates.bulkPut(data.skillStates);
        await db.attempts.bulkPut(data.attempts);
        await db.lessonProgress.bulkPut(data.lessonProgress);
        await db.sessions.bulkPut(data.sessions);
        await db.officialLogs.bulkPut(data.officialLogs);
        await db.achievements.bulkPut(data.achievements);
        await db.notes.bulkPut(data.notes);
        await db.bookmarks.bulkPut(data.bookmarks);
        await db.essays.bulkPut(data.essays);
        await db.dailyActivity.bulkPut(data.dailyActivity);
      });
      const meta = await db.backupMeta.get('meta');
      await db.backupMeta.put({
        id: 'meta',
        lastExportAt: meta?.lastExportAt ?? null,
        lastImportAt: Date.now(),
        appVersion: APP_VERSION,
      });
      await refresh();
      setPending(null);
      toast('Backup merged.');
    } catch {
      toast('Merge failed. Your current data was left untouched.');
    } finally {
      setMerging(false);
    }
  };

  const handleReplace = async () => {
    if (!pending) return;
    if (!window.confirm('Replace ALL local data with this backup? This cannot be undone.')) return;
    setReplacing(true);
    try {
      const data = pending.data;
      const tables = TABLES.map((t) => db[t as BackupTable]);
      await db.transaction('rw', tables, async () => {
        for (const t of TABLES) await db[t as BackupTable].clear();
        if (data.profile) await db.profile.bulkPut([data.profile]);
        await db.skillStates.bulkPut(data.skillStates);
        await db.attempts.bulkPut(data.attempts);
        await db.lessonProgress.bulkPut(data.lessonProgress);
        await db.sessions.bulkPut(data.sessions);
        await db.officialLogs.bulkPut(data.officialLogs);
        await db.achievements.bulkPut(data.achievements);
        await db.notes.bulkPut(data.notes);
        await db.bookmarks.bulkPut(data.bookmarks);
        await db.essays.bulkPut(data.essays);
        await db.dailyActivity.bulkPut(data.dailyActivity);
      });
      const meta = await db.backupMeta.get('meta');
      await db.backupMeta.put({
        id: 'meta',
        lastExportAt: meta?.lastExportAt ?? null,
        lastImportAt: Date.now(),
        appVersion: APP_VERSION,
      });
      await refresh();
      setPending(null);
      toast('Backup restored.');
    } catch {
      toast('Restore failed. Your current data was left untouched.');
    } finally {
      setReplacing(false);
    }
  };

  const startReset = (kind: 'curriculum' | 'analytics' | 'everything') => {
    setActiveReset(kind);
    setConfirmText('');
  };

  const handleReset = async () => {
    if (!activeReset || confirmText.trim().toUpperCase() !== 'RESET') return;
    if (!window.confirm('This is permanent. Continue?')) return;
    setResetting(true);
    try {
      if (activeReset === 'curriculum') {
        await db.transaction('rw', db.lessonProgress, db.skillStates, async () => {
          await db.lessonProgress.clear();
          await db.skillStates.clear();
        });
        toast('Curriculum progress reset.');
      } else if (activeReset === 'analytics') {
        await db.transaction(
          'rw',
          db.attempts, db.dailyActivity, db.sessions, db.achievements,
          async () => {
            await db.attempts.clear();
            await db.dailyActivity.clear();
            await db.sessions.clear();
            await db.achievements.clear();
          },
        );
        toast('Analytics reset.');
      } else {
        const tables = [...TABLES.map((t) => db[t as BackupTable]), db.backupMeta, db.settings];
        await db.transaction('rw', tables, async () => {
          for (const t of TABLES) await db[t as BackupTable].clear();
          await db.backupMeta.clear();
          await db.settings.clear();
        });
        await getProfile(); // re-seed default profile
        toast('Everything erased. Fresh start.');
      }
      await refresh();
    } catch {
      toast('Reset failed. Try again.');
    } finally {
      setResetting(false);
      setActiveReset(null);
      setConfirmText('');
    }
  };

  const resetCopy: Record<'curriculum' | 'analytics' | 'everything', { title: string; body: string }> = {
    curriculum: {
      title: 'Reset curriculum',
      body: 'This clears lesson progress and skill mastery. Notes, bookmarks, attempts, and your official log are kept.',
    },
    analytics: {
      title: 'Reset analytics',
      body: 'This clears question attempts, daily activity, practice sessions, and achievements. Lessons and notes are kept.',
    },
    everything: {
      title: 'Erase everything',
      body: 'This permanently deletes ALL local data — every table, including your profile — and starts fresh. There is no undo.',
    },
  };

  return (
    <Screen title="Backup & reset">
      <div className="more-wrap">
        <MoreBack />

        <h2 className="more-section-title">Backup</h2>
        <div className="more-card">
          <p>
            Your data lives only on this device. Export a backup file to keep a
            copy somewhere safe, or to move to another device.
          </p>
          <div className="more-actions">
            <Button fullWidth disabled={exporting} onClick={() => void handleExport()}>
              {exporting ? 'Exporting…' : 'Export backup'}
            </Button>
            <Button
              fullWidth
              variant="ghost"
              disabled={importing}
              onClick={() => fileRef.current?.click()}
            >
              {importing ? 'Reading file…' : 'Import backup'}
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="more-file-hidden"
              aria-label="Choose backup file"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = '';
                if (f) void handleFile(f);
              }}
            />
          </div>
        </div>

        {importError && (
          <div className="more-error" role="alert">
            {importError}
            <div className="more-actions" style={{ marginTop: 12 }}>
              <Button variant="ghost" onClick={() => fileRef.current?.click()}>
                Try another file
              </Button>
            </div>
          </div>
        )}

        {pending && (
          <div className="more-card" role="status">
            <h3>Backup looks valid ✓</h3>
            <p className="more-note">
              Exported {new Date(pending.exportDate).toLocaleString('en-US')} · app v{pending.appVersion} · checksum OK
            </p>
            <div className="more-entries">
              {tableCounts(pending).map(({ table, count }) => (
                <div key={table} className="more-entry-head">
                  <span className="more-entry-sub">{table}</span>
                  <span className="more-entry-title">{count.toLocaleString('en-US')}</span>
                </div>
              ))}
            </div>
            <div className="more-actions" style={{ marginTop: 16 }}>
              <Button
                fullWidth
                disabled={replacing || merging}
                onClick={() => void handleMerge()}
              >
                {merging ? 'Merging…' : 'Merge into current data'}
              </Button>
              <p className="more-note" style={{ marginTop: 8 }}>
                Merge adds or updates records by ID and keeps everything else.
                Replace wipes this device first — export a backup before replacing.
              </p>
              <Button
                variant="danger"
                fullWidth
                disabled={replacing || merging}
                onClick={() => void handleReplace()}
              >
                {replacing ? 'Replacing…' : 'Replace all data'}
              </Button>
            </div>
          </div>
        )}

        <h2 className="more-section-title">Reset</h2>
        <div className="more-danger-zone">
          <h3>Danger zone</h3>
          <p>Resets are permanent and cannot be undone. Export a backup first if you might want your data back.</p>

          <div className="more-actions">
            <Button variant="danger" fullWidth onClick={() => startReset('curriculum')}>
              Reset curriculum
            </Button>
            <Button variant="danger" fullWidth onClick={() => startReset('analytics')}>
              Reset analytics
            </Button>
            <Button variant="danger" fullWidth onClick={() => startReset('everything')}>
              Erase everything
            </Button>
          </div>

          {activeReset && (
            <div className="more-confirm-box">
              <h3 style={{ color: 'var(--danger)' }}>{resetCopy[activeReset].title}</h3>
              <p>{resetCopy[activeReset].body}</p>
              <Field
                label="Type RESET to confirm"
                placeholder="RESET"
                value={confirmText}
                onChange={setConfirmText}
              />
              <div className="more-actions-row">
                <Button variant="ghost" onClick={() => { setActiveReset(null); setConfirmText(''); }}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  disabled={confirmText.trim().toUpperCase() !== 'RESET' || resetting}
                  onClick={() => void handleReset()}
                >
                  {resetting ? 'Working…' : 'Confirm'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Screen>
  );
}
