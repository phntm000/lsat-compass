# LSAT Compass — Final Audit vs. Requirements (2026-09-11)

Independent verification pass over the built product at `~/workspace/lsat-compass`,
checked against every major requirement in the original commission. Method:
direct code inspection, targeted greps, runtime test execution, and content
sampling — not trust in builder reports. Two real bugs were found and fixed
during this audit (see §11).

## 1. Current LSAT format fidelity — PASS

Verified in `src/features/exam/examStore.ts`, `ExamRunner.tsx`,
`ExamResultsScreen.tsx`:

- 4 sections × 35 minutes (`SECTION_SECONDS = 35 * 60`). Timer freezes on
  `visibilitychange`, auto-submits at zero.
- 2 scored LR + 1 scored RC + 1 hidden variable, variable at random position
  1–4 and random kind (LR/RC). Section header during the test shows only
  "Section N" — the variable is unidentifiable while testing, matching the
  real administration.
- 10-minute intermission after section 2 (`BREAK_SECONDS = 10 * 60`,
  routed at `secIdx === 1`), skippable.
- Variable disclosed only on the results screen ("Section N was the unscored
  variable section"), excluded from scored accuracy.
- Results labeled "Original Practice Simulation — not an official LSAT score."
  Setup screen repeats the disclaimer.
- Argumentative Writing is a separate module (`src/features/writing/`):
  15-minute analysis timer + 35-minute essay timer, word count, draft
  autosave, 5-dimension self-assessment rubric, local history. Unscored.

## 2. Learning sequence — PASS

Stages 0–10 map to the required arc: 0 Orientation (understand) → 1
Foundations (model) → 2 LR core types (guided practice) → 3 LR integration
(mixed) → 4–5 RC (transfer) → 6 timing (timed) → 7 full sections (simulate)
→ 8 official-practice integration → 9 test readiness (retain) → 10 writing.
Prerequisite gating locks lessons until foundation skills reach developing+.
Practice modes cover drill / mixed / timed / review / weakness-repair /
error-log / contrast / full-section. Lesson blocks implement the full
pedagogical stack: prose, keyterms, worked examples, misconceptions,
checkpoints, try-it drills, retrieval prompts, summaries.

## 3. Zero backend / privacy — PASS

- Zero `fetch`/`XMLHttpRequest`/`WebSocket`/`EventSource` calls in `src`.
- Zero API keys, zero analytics/trackers (grep-verified).
- Only external URLs in the codebase: `lsac.org` and `lawsac.org/lawhub`
  (official-practice links, as specified).
- All state in IndexedDB via Dexie on-device. No sign-in, no accounts.
- Service worker precaches 42 entries (3.35 MB); app is fully functional
  offline after first load.

## 4. Copyright / originality — PASS

- All 416 questions carry `sourceType: 'original'`; content QA suite
  (16/16) enforces originality labels, id uniqueness, no placeholders,
  and no duplicate stimuli.
- Official practice exists only as external LawHub links + a self-entered
  practice log. No PrepTest content reproduced.

## 5. Claims integrity — PASS

- No 120–180 conversions anywhere (the one "120–180" mention describes how
  LSAC scores official PrepTests — factual, in Resources).
- No score predictions, no "AI" labels, no guaranteed outcomes.
- Readiness panel labeled "Readiness (internal)" with the exact disclaimer
  "An internal study metric — not an LSAT score prediction."
- Onboarding explicitly promises "never fake score predictions."

## 6. iPhone-first / PWA / accessibility — PASS WITH CAVEAT

- `viewport-fit=cover`, `apple-mobile-web-app-capable`, theme-color,
  standalone display, safe-area CSS tokens on fixed chrome.
- 44px minimum targets in the component kit; no hover-dependent UI;
  static sweep found zero unlabeled images and zero click-only divs.
- **Caveat:** manual iPhone QA (390px layouts, sheets, keyboard/viewport,
  reduced motion, offline reload on device) was not possible from this
  environment and remains for a real device pass.

## 7. Gamification restraint — PASS

- XP/levels/achievements reward attempts, reviews, lessons, sections.
- No loot boxes, currencies, energy timers, or streak-punishment copy
  (streak uses grace; zero-day copy reads "🌱 Streak starts today").
- Achievement logic lives in the engine; UI only renders toasts.

## 8. Data portability — PASS

- Full JSON export of all 12 tables via checksum-guarded `buildBackup`.
- Import validates (`validateBackup`) and now offers **merge** (upsert by
  id, current profile kept) **and** replace (with explicit confirmation).
- Three reset tiers — curriculum, analytics, everything — each behind
  typed confirmation. Full reset re-seeds a default profile.

## 9. Content quality (pedagogical spot-check) — PASS, high bar

Sampled Stage-1 lessons, LR questions with full explanation stacks, and
contrast drills. Questions carry: 3 staged Socratic hints, quick +
walkthrough explanations, per-choice explanations naming the trap
(restates-premise, opposite, scope-shift, wrong-viewpoint…), a transferable
general lesson, misconception tags, and difficulty metadata. Lesson
checkpoints use plausible distractors that target known misconceptions.
This is substantive teaching material, not filler.

## 10. Test coverage — 60/60 PASS, with honest gaps

| Suite | Count | Status |
|---|---|---|
| Engine unit (`src/engine/`) | 37 | ✅ pass |
| Content QA (`tests/content.test.ts`) | 16 | ✅ pass |
| Integration (`tests/integration.test.ts`) | 7 | ✅ pass (new this audit) |

New integration tests cover: backup round-trip + tamper rejection, exam sim
structure (4 sections, 1 hidden variable, scored LR/LR/RC, ≥20 Qs per LR
section, no cross-section duplicates), timing constants, and the
mastery→Dexie→review-queue pipeline (via fake-indexeddb).
`tsc --noEmit` clean. `vite build` green.

**Honest gaps:** no scripted browser E2E (no Playwright in this
environment); timed flows are covered by unit + integration tests on the
underlying logic, not by driving the UI. Manual iOS QA outstanding (see §6).

## 11. Findings fixed during this audit

1. **Critical — empty LR sections for new users.** `composeSession`
   derived its skill list from mastery keys; a new user has none, so
   full-section/timed/mixed modes built zero-question sets. Fixed with an
   `allSkillIds` fallback in the engine, wired through `examStore` and
   `SessionRunner`.
2. **Critical — LR section starvation in sims.** Cross-section dedupe ran
   *after* composition without feeding exclusions back in, so sections 2+
   got 4 questions instead of 25. Fixed by threading the live exclusion
   set through as `seenQuestionIds`.
3. **Import was replace-only** — added validated merge (upsert by id).
4. **Flags not persisted** — all three `QuestionRunner` submit paths now
   pass `flagged` through to IndexedDB (state layer already supported it).
5. **`settings` table untyped** — added `Table<SettingsRecord, string>`
   declaration to `CompassDB`.

## 12. Residual risks

- First-load bundle is ~3.4 MB precached (content-heavy); acceptable for
  the offline requirement. 2026-09-11 optimization pass: root cause of the
  merged content chunk found — rolldown-vite (Vite 8) never invokes the
  `output.manualChunks` function form (verified: it receives empty module
  ids). Replaced with `output.advancedChunks` groups; the bank now ships
  as five granular chunks (questions 1.70 MB / lessons 686 kB / drills
  242 kB / passages 98 kB / meta 58 kB raw; 427/207 kB gzip for the two
  large ones), giving parallel fetch and per-area cache invalidation.
  No deployment has been performed (standing constraint).
  2026-09-11: deployed to GitHub Pages at
  https://phntm000.github.io/lsat-compass/ (repo phntm000/lsat-compass,
  dist pushed to main, Pages from main branch) with user approval.

## Verdict

The build meets every major requirement in the commission. The two
critical exam-construction bugs found in this audit are fixed and
regression-tested. Remaining work is a real-device iPhone pass and a
hosting decision — both need the user.
