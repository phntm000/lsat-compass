/**
 * Dexie IndexedDB layer for LSAT Compass.
 * Local-first: everything persists on-device. Versioned with migrations.
 */
import Dexie, { type Table } from 'dexie';
import { TABLES } from '../engine/db-schema';
import type {
  UserProfile, SkillStateRecord, QuestionAttemptRecord,
  LessonProgressRecord, PracticeSessionRecord, OfficialPracticeLog,
  AchievementRecord, NoteRecord, BookmarkRecord, EssayRecord,
  DailyActivityRecord, BackupMetaRecord, SettingsRecord,
} from '../engine/db-schema';

export const APP_VERSION = '1.0.0';

export class CompassDB extends Dexie {
  profile!: Table<UserProfile, string>;
  skillStates!: Table<SkillStateRecord, string>;
  attempts!: Table<QuestionAttemptRecord, number>;
  lessonProgress!: Table<LessonProgressRecord, string>;
  sessions!: Table<PracticeSessionRecord, number>;
  officialLogs!: Table<OfficialPracticeLog, number>;
  achievements!: Table<AchievementRecord, string>;
  notes!: Table<NoteRecord, number>;
  bookmarks!: Table<BookmarkRecord, number>;
  essays!: Table<EssayRecord, number>;
  dailyActivity!: Table<DailyActivityRecord, string>;
  backupMeta!: Table<BackupMetaRecord, string>;
  settings!: Table<SettingsRecord, string>;

  constructor() {
    super('lsat-compass');
    this.version(1).stores({ ...TABLES });
    // Future migrations go here, e.g.:
    // this.version(2).stores({ ... }).upgrade(tx => { ... });
  }
}

export const db = new CompassDB();

export function defaultProfile(): UserProfile {
  return {
    id: 'me',
    onboardingComplete: false,
    isNewToLsat: null,
    targetTestDate: null,
    targetScore: null,
    diagnosticScore: null,
    preferredSessionMinutes: 20,
    daysPerWeek: 4,
    soundEnabled: true,
    haptics: true,
    reducedMotion: false,
    theme: 'system',
    timerMode: 'visible',
    timerWarnings: true,
    createdAt: Date.now(),
  };
}

export async function getProfile(): Promise<UserProfile> {
  const existing = await db.profile.get('me');
  if (existing) return existing;
  const fresh = defaultProfile();
  await db.profile.put(fresh);
  return fresh;
}

/** Today's date key in local timezone, YYYY-MM-DD. */
export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export async function recordActivity(patch: Partial<DailyActivityRecord>): Promise<void> {
  const key = todayKey();
  const existing = await db.dailyActivity.get(key);
  const base: DailyActivityRecord = existing ?? {
    date: key, minutes: 0, attempts: 0, correct: 0, xp: 0, reviewsCompleted: 0,
  };
  await db.dailyActivity.put({
    ...base,
    minutes: base.minutes + (patch.minutes ?? 0),
    attempts: base.attempts + (patch.attempts ?? 0),
    correct: base.correct + (patch.correct ?? 0),
    xp: base.xp + (patch.xp ?? 0),
    reviewsCompleted: base.reviewsCompleted + (patch.reviewsCompleted ?? 0),
  });
}

/** All study dates (for streaks). */
export async function studyDates(): Promise<string[]> {
  const rows = await db.dailyActivity
    .where('date').above('')
    .and(r => r.minutes > 0 || r.attempts > 0)
    .toArray();
  return rows.map(r => r.date).sort();
}
