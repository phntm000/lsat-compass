/**
 * IndexedDB schema design for LSAT Compass (to be wired to Dexie in src/db/).
 * Spec §9. Versioned with migration logic. All tables local-first.
 */

export const DB_NAME = 'lsat-compass';
export const DB_VERSION = 1;

/* ------------------------------------------------------------------ */
/* Records                                                             */
/* ------------------------------------------------------------------ */

export interface UserProfile {
  id: 'me';
  onboardingComplete: boolean;
  isNewToLsat: boolean | null;
  targetTestDate: string | null;   // YYYY-MM-DD
  targetScore: number | null;
  diagnosticScore: number | null;
  preferredSessionMinutes: number; // 10..60
  daysPerWeek: number;
  soundEnabled: boolean;
  haptics: boolean;
  reducedMotion: boolean;
  theme: 'light' | 'dark' | 'system';
  timerMode: 'visible' | 'minimized' | 'hidden';
  timerWarnings: boolean;
  createdAt: number;
}

export interface SkillStateRecord {
  skillId: string;
  // engine evidence (serializable form of SkillEvidence)
  attempts: number;
  records: import('./types').EvidenceRecord[];
  lastPracticed: number;
  lapses: number;
  stabilityDays: number;
  dueAt: number;
  prevState: import('./types').MasteryState;
  exposureCount: number; // lessons + worked examples seen
}

export interface QuestionAttemptRecord {
  id?: number;
  questionId: string;
  questionVersion: number;
  timestamp: number;
  selectedChoice: number;
  correct: boolean;
  responseTimeMs: number;
  confidence: 1 | 2 | 3 | 4 | 5 | null;
  mode: import('./types').AttemptMode;
  skillIds: string[];
  reviewedExplanation: boolean;
  changedAnswer: boolean;
  changedDirection: 'wrong-to-right' | 'right-to-wrong' | null;
  flagged: boolean | null;
  errorCategory: string | null;
  hintsUsed: number;
  sessionId: string | null;
}

export interface LessonProgressRecord {
  lessonId: string;
  startedAt: number;
  completedAt: number | null;
  checkpointsCorrect: number;
  checkpointsTotal: number;
}

export interface PracticeSessionRecord {
  id?: number;
  sessionId: string;
  mode: string;
  startedAt: number;
  endedAt: number | null;
  itemCount: number;
  correctCount: number;
  xpEarned: number;
  interrupted: boolean;
  summary: string | null;
}

export interface OfficialPracticeLog {
  id?: number;
  testName: string;      // e.g. "PrepTest 158 (LawHub)"
  date: string;          // YYYY-MM-DD
  rawScore: number | null;
  scaledScore: number | null;
  lr1Correct: number | null; lr1Total: number | null;
  lr2Correct: number | null; lr2Total: number | null;
  rcCorrect: number | null;  rcTotal: number | null;
  timingNotes: string;
  missedQuestions: string;  // free text: "LR1 #7, #12 ..."
  questionTypes: string;
  reasonsMissed: string;
  confidence: string;
  lessonsLearned: string;
}

export interface AchievementRecord {
  achievementId: string;
  earnedAt: number;
}

export interface NoteRecord {
  id?: number;
  title: string;
  body: string;
  tags: string[];
  refType: 'question' | 'lesson' | 'glossary' | 'general' | null;
  refId: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface BookmarkRecord {
  id?: number;
  kind: 'lesson' | 'question' | 'glossary' | 'passage';
  refId: string;
  createdAt: number;
}

export interface EssayRecord {
  id?: number;
  promptId: string;
  thesis: string;
  body: string;
  wordCount: number;
  selfAssessment: Record<string, number> | null; // rubric 1..5
  createdAt: number;
  updatedAt: number;
}

export interface SettingsRecord {
  id: 'settings';
  // reserved for future non-profile prefs
}

export interface DailyActivityRecord {
  date: string; // YYYY-MM-DD
  minutes: number;
  attempts: number;
  correct: number;
  xp: number;
  reviewsCompleted: number;
}

export interface BackupMetaRecord {
  id: 'meta';
  lastExportAt: number | null;
  lastImportAt: number | null;
  appVersion: string;
}

/* ------------------------------------------------------------------ */
/* Dexie table map (for src/db/db.ts)                                  */
/* ------------------------------------------------------------------ */

export const TABLES = {
  profile: 'id',
  skillStates: 'skillId, dueAt, prevState',
  attempts: '++id, questionId, timestamp, sessionId, [questionId+timestamp]',
  lessonProgress: 'lessonId, completedAt',
  sessions: '++id, startedAt, mode',
  officialLogs: '++id, date',
  achievements: 'achievementId, earnedAt',
  notes: '++id, createdAt, *tags, refId',
  bookmarks: '++id, [kind+refId], createdAt',
  essays: '++id, promptId, createdAt',
  settings: 'id',
  dailyActivity: 'date',
  backupMeta: 'id',
  examState: 'key',
} as const;

/** Durable exam-run state (2026-09-12): sessionStorage is wiped on tab
 *  close, which used to destroy an in-progress exam. Runs, per-section
 *  answers, and section deadlines are write-through mirrored here so an
 *  exam survives tab close, crash, and browser restart. */
export interface ExamStateRecord {
  key: string;      // e.g. exam-run:<runId>, exam-answers:<runId>:<idx>, exam-deadline:<runId>:<idx>
  value: string;    // JSON payload
  updatedAt: number;
}

/* ------------------------------------------------------------------ */
/* Backup format (§10)                                                 */
/* ------------------------------------------------------------------ */

export interface BackupFile {
  schemaVersion: 1;
  appVersion: string;
  exportDate: string; // ISO
  checksum: string;   // djb2 hex of canonical payload JSON
  data: {
    profile: UserProfile | null;
    skillStates: SkillStateRecord[];
    attempts: QuestionAttemptRecord[];
    lessonProgress: LessonProgressRecord[];
    sessions: PracticeSessionRecord[];
    officialLogs: OfficialPracticeLog[];
    achievements: AchievementRecord[];
    notes: NoteRecord[];
    bookmarks: BookmarkRecord[];
    essays: EssayRecord[];
    dailyActivity: DailyActivityRecord[];
  };
}

export function checksumOf(payload: string): string {
  let h = 5381;
  for (let i = 0; i < payload.length; i++) {
    h = ((h << 5) + h + payload.charCodeAt(i)) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

export function buildBackup(appVersion: string, data: BackupFile['data']): BackupFile {
  const payload = JSON.stringify(data);
  return {
    schemaVersion: 1,
    appVersion,
    exportDate: new Date().toISOString(),
    checksum: checksumOf(payload),
    data,
  };
}

export function validateBackup(file: unknown): { ok: boolean; error?: string; backup?: BackupFile } {
  if (!file || typeof file !== 'object') return { ok: false, error: 'Not a JSON object.' };
  const b = file as Partial<BackupFile>;
  if (b.schemaVersion !== 1) return { ok: false, error: `Unsupported schema version: ${String(b.schemaVersion)}.` };
  if (!b.data || typeof b.data !== 'object') return { ok: false, error: 'Missing data payload.' };
  const payload = JSON.stringify(b.data);
  if (b.checksum !== checksumOf(payload)) {
    return { ok: false, error: 'Checksum mismatch — the file may be corrupted. Import blocked to protect your data.' };
  }
  return { ok: true, backup: b as BackupFile };
}
