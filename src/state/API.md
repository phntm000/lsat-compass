# LSAT Compass — State & Content API for UI builders

This is the contract between the state layer (`src/state/`, `src/db/`,
`src/engine/`, `src/content/`) and every screen. Read this before building
any feature. Do not invent alternative data paths.

## 1. The hook: `useStudy()`

```tsx
import { useStudy } from '../state/study';
const { ready, profile, todayPlan, mastery, /* ... */ } = useStudy();
```

`ready` is false until IndexedDB has loaded — every screen must render a
loading skeleton (not blank) while `!ready`.

### Read state

| Field | Type | Notes |
|---|---|---|
| `ready` | boolean | gate all screens on this |
| `profile` | UserProfile \| null | onboarding, prefs, targetTestDate |
| `xp`, `level`, `levelName`, `nextLevelXp` | number/string | XP = sum of daily activity; never invent XP |
| `streak`, `weeklyActive` | number | grace-based streak from engine |
| `mastery` | Record<string, MasteryResult> | per-skill; missing key = never attempted |
| `reviewPlan` | ReviewPlan \| null | `{ items: ReviewCandidate[], capped, totalDue, recoveryMode }` |
| `todayPlan` | TodayPlan \| null | `{ blocks: PlanBlock[], totalMinutes, primaryCta }` |
| `insights` | Insight[] | `{ id, title, body, severity: 'info'\|'watch'\|'act', skillIds }` |
| `readiness` | ReadinessProfile \| null | INTERNAL metric — never call it a score or prediction |
| `lessonProgress` | Record<id, 'done'\|'started'> | curriculum progress |
| `seenQuestionIds` | Set<string> | for "unseen first" picking |

`MasteryResult`: `{ score 0..100, state: 'new'\|'learning'\|'developing'\|'stable'\|'mastered'\|'lapsed', components: { recent, historical, timed, mixed }, highConfWrongRate, maxDifficultySeen, dueAt, stabilityDays }`.

`PlanBlock`: `{ kind: 'review'\|'lesson'\|'drill'\|'contrast'\|'mixed'\|'timed'\|'remediation'\|'quest'\|'official', title, detail, minutes, reason, refIds, score }`.

### Write actions (all async, all persist + rebuild plans)

```tsx
// The single pipeline for scored questions. Computes correctness from
// selectedChoice vs the content answer. Returns { correct, firstAttempt,
// xpGained, newAchievements } — show XP + achievement toasts from this.
recordQuestionAttempt({
  questionId, selectedChoice, responseTimeMs,
  confidence: 1|2|3|4|5|null,   // null = user skipped; engine uses 3
  mode: 'learning'|'drill'|'review'|'mixed'|'timed'|'test',
  hintsUsed, revealedSolution,   // revealed => zero mastery credit
  changedAnswer, changedDirection?: 'wrong-to-right'|'right-to-wrong',
  sessionId?: string | null,
}): Promise<AttemptOutcome>

// Foundation / contrast drills (from getDrill).
recordDrillAttempt({ drillId, correct, responseTimeMs, sessionId? }): Promise<AttemptOutcome>

// Lesson checkpoint answers (formative; light evidence weight).
recordCheckpoint(lessonId, index, correct): Promise<void>

startLesson(lessonId): Promise<void>
completeLesson(lessonId, checkpointsCorrect, checkpointsTotal, minutes)
  : Promise<{ xpGained, newAchievements }>

completeReviewSession(count, minutes): Promise<void>           // review queue done
completeContrastSession(itemCount, correctCount, minutes)      // contrast set done
logPracticeSession({ sessionId, mode, startedAt, endedAt, itemCount,
  correctCount, xpEarned, interrupted, summary }): Promise<void> // timed sections, sims
markExplanationReviewed(questionId): Promise<void>            // Error Lab deep review
updateProfile(patch: Partial<UserProfile>): Promise<void>      // prefs, test date, theme
refresh(): Promise<void>
```

**Modes matter.** `mode` drives engine semantics: `'learning'` = immediate
feedback + hints allowed; `'timed'`/`'test'` = deferred feedback, counts toward
timed accuracy; `'review'`/`'mixed'` feed the mixed-context mastery gates.
Pass the honest mode for what the user is actually doing.

**Achievements.** Every write action returns `newAchievements: AchievementDef[]`
(`{ id, title, description, xp }`). Render a toast/banner for each. Do not
re-implement achievement logic in UI.

## 2. Content reads (`src/content`)

```tsx
import { getQuestion, getLesson, getPassage, getDrill, getGlossaryTerm,
         LESSONS, QUESTIONS, PASSAGES, DRILLS, CONTRAST_DRILLS,
         FOUNDATION_DRILLS, SKILLS, GLOSSARY, allSkills, curriculumStages }
  from '../content';
```

- `Question`: `{ id, sectionType: 'LR'|'RC', questionType (skill id),
  secondarySkills, difficulty 1..5, stimulus, passageId?, stem,
  choices[5] ({text}), correctIndex 0..4, explanationQuick,
  explanationWalkthrough, choiceExplanations[5], generalLesson,
  misconceptionTags, trapTypes, prerequisites, estimatedSeconds,
  hints[3], sourceType: 'original', labels? }`.
  RC questions have **empty `stimulus`** — the passage (via `passageId`) is the
  stimulus. Never render an empty stimulus box for RC.
- `Lesson`: `{ id ('1.7'), stage 0..10, title, estimatedMinutes, skills,
  prerequisites, blocks: LessonBlock[] }`. Block kinds: `prose {md}`,
  `keyterm {term, definition}`, `example {title, body, note?}`,
  `worked {title, steps[]}`, `misconception {wrong, right}`,
  `checkpoint {prompt, choices[], correctIndex, explanation}`,
  `tryit {drillIds[]}`, `retrieval {prompt, answer}`, `summary {points[]}`,
  `next {text}`.
- `Passage`: `{ id, title, domain, comparative, parts: [{label?, paragraphs[]}], questionIds[], estimatedMinutes }`.
- `Drill`: `{ id, kind: 'translate'|'identify'|'classify'|'contrast'|'complete'|'order', skillIds[], difficulty 1..3, prompt, choices[2..4], correctIndex, explanation, contrastNote? }`.
- `Skill`: `{ id, stage, title, plainTitle, description, prerequisites, importance 1..3 }`.
- `curriculumStages`: `{ stage, title, lessons: Lesson[] }[]` in order.

## 3. Session composer (`src/engine/session.ts` + `src/state/content-provider.ts`)

```tsx
import { composeSession } from '../engine/session';
import { contentProvider } from '../state/content-provider';

const plan = composeSession({
  now: Date.now(), mode: 'drill'|'review'|'mixed'|'timed'|'weakness-repair'|
                         'error-log'|'contrast'|'full-section',
  minutes, targetSkillIds?, reviews?,           // reviews = reviewPlan.items
  masteryBySkill: mastery,                       // Record<string, MasteryResult>
  seenQuestionIds, provider: contentProvider,
  recentErrors: [{ questionId, skillIds }],       // for error-log mode
});
/* plan: { id, mode, title, minutes, items: [{ kind: 'lesson'|'question'|
   'drill'|'contrast'|'passage-set', refId, skillIds, estimatedMinutes,
   difficulty? }], timed, feedbackMode: 'immediate'|'deferred' } */
```

`interleaveOrder(items, seed)` is exported for deterministic shuffling.

## 4. Direct DB access (`src/db/db.ts`)

Prefer `useStudy()` actions. For screens that own their tables, use `db`
directly: `notes`, `bookmarks`, `officialLogs`, `essays`, `sessions`,
`dailyActivity`, `attempts`. Helpers: `getProfile()`, `recordActivity(patch)`,
`studyDates()`, `todayKey()`.

Backup format: `buildBackup(appVersion, data)` / `validateBackup(json)` from
`src/engine/db-schema.ts` (checksum-guarded). Export = all tables to JSON
download; import = validate → confirm → replace.

## 5. Gamification display rules

- XP events and levels come from `src/engine/gamification.ts` (`levelFor`,
  `ACHIEVEMENTS`). Never hardcode thresholds in UI.
- Streak has grace — never show streak-break anxiety copy.
- Readiness: label exactly as **"Readiness (internal)"** with the disclaimer
  "An internal study metric — not an LSAT score prediction."
- No fake social proof, no loot boxes, no energy timers. Ever.

## 6. Exam structure (verified 2026-09-11)

Full simulation = 4 × 35-min sections (2 LR scored, 1 RC scored, 1 hidden
unscored LR/RC) + 10-min intermission after section 2. The variable section
must be unidentifiable during the test. Argumentative Writing is separate:
15-min analysis + 35-min essay, unscored. Timers: visible/minimized/hidden per
`profile.timerMode`.

## 7. Conventions

- All routes under HashRouter. Tabs: `/today /learn /practice /progress /more`.
- `Screen` component (`src/components/Screen.tsx`) for page chrome.
- Design tokens in `src/styles/tokens.css`; 44px min targets; safe-area
  padding on fixed chrome; no hover-dependent interactions.
- Empty states everywhere (no data yet → explain + CTA, never blank).
- Loading: skeleton while `!ready`. Errors: message + retry.
- Theme via `document.documentElement.dataset.theme`; `updateProfile({theme})`
  handles it — also mirror to `localStorage 'compass-theme'` (done in state).
