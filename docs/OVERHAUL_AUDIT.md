# Overhaul Audit — LSAT Compass Enterprise Remediation

**Date:** 2026-09-11
**Auditor:** Independent adversarial content audit (read-only automated scripts + stratified 40-item hostile LR sample + full 25-passage RC classification)
**Full findings:** `~/workspace/lsat-compass-docs/audit-findings.md`
**LSAC format verification:** `~/workspace/lsat-compass-docs/lsac-verification.md` (last verified 2026-09-11)

This document is the P0–P3 issue register for the overhaul. Every P0 and P1 item must be fixed, not documented. P2 items are addressed in the Phase 6/7/8 content passes or recorded as known limitations in `docs/RELEASE_AUDIT.md`.

---

## P0 — incorrect / misleading / broken / pedagogically harmful

### P0-1. Answer-length leakage (75.4% of items)
- **Finding:** Credited choice uniquely longest in 310/411 parsed items (avg 109 chars vs 73 for distractors). A test-wise student gains ~15 points of "accuracy" by picking the longest choice — inflating internal mastery, corrupting the student model, and teaching a heuristic that fails on official material (LSAC choices are length-balanced).
- **Fix:** Length-match all 416 items' choice sets (trim credited / extend distractors with substantive detail, verdict unchanged). Wave 1 (credited ≥1.5× longest distractor → 0 remain) complete. **Wave 2 complete 2026-09-11:** all 111 remaining items violating ≤1.25× / ≤20-char gap were fixed by four agents and independently verified — **416/416 items pass both thresholds, 0 malformed five-choice sets, 0 invalid correctIndex.** A hostile semantic re-review of the 25 riskiest wave-2 edits returned **25/25 KEEP** (no defensible distractor created by the length edits).
- **Gate:** `tests/content.test.ts` enforces both limits per item (ratchet).

### P0-2. Zero validated items feeding simulations
- **Finding:** All 414 items carried `validationStatus: 'author-reviewed'`; none `adversarial-reviewed` or `validated` — while the schema's own Part LI gate requires only validated items in test simulations.
- **Fix:** (a) Validation protocol defined in `docs/CONTENT_QA.md`. (b) **Hard gate 2026-09-11:** exam builders (`src/features/exam/examStore.ts`) draw sections from `validated` items ONLY — `InsufficientValidatedPoolError` blocks exam creation when the validated pool is insufficient, instead of falling back to unvalidated items (the old provisional fallback was removed). RC: only passages whose questions are ALL validated may enter simulations. (c) **Full LR classification complete 2026-09-11:** 264/264 LR items classified — 255 `validated`, 9 `adversarial-reviewed` — each with ≥3-dimension `difficultyProfile` and `reviewHistory`. (d) **Full RC validation complete 2026-09-11:** 152/152 RC questions hostile-reviewed and `validated`, each with `evidenceMap`, ≥3-dimension `difficultyProfile`, and `reviewHistory`. Pool is now sufficient (255 LR ≥ 120 needed; 25 fully-validated passages ≥ 4 needed), so the hard gate never triggers in practice.

### P0-3. Drill choice buttons rendered empty (`c.text` on `string[]`)
- **Finding:** `QuestionRunner` rendered drill choices with `text={c.text}` where drill `choices` are `string[]` — every drill choice button (252 drills) displayed empty text at runtime. TypeScript would have caught it, but the build was already broken (see P0-4) so the error was invisible.
- **Fix:** `text={c}` for drill choices (2026-09-11). Question choices (objects with `.text`) unchanged.

### P0-4. `npm run build` broken — stale local type declarations
- **Finding:** Every content file declared its own local `Question`/`Passage`/`GlossaryTerm` interfaces, drifted from the canonical schema: `editorialDifficulty`/`itemPurpose`/`validationStatus`/`topicCluster`/`example` missing. `tsc -b` (the build's typecheck) failed across content files; `npx tsc --noEmit` masked it (solution-style tsconfig with `files: []` checks nothing). Also fixed in the same pass: 3 conditional-hook violations (SessionRunner, LessonReader, QuestionRunner — real rules-of-hooks bugs), unused `startedAtRef`, Dexie `...tables` spread type errors, `flagged: string|null` vs boolean usage, `hintsUsed` out-of-scope references, a biased pseudo-random sort comparator (replaced with seeded Fisher–Yates).
- **Fix:** All content files now `import type { Question } from '../index'` / `import type { Passage } from '../index'`; `GlossaryTerm` re-exported from `glossary.ts`. `tsc -b` clean, `npm run build` green, 90/90 Vitest pass (2026-09-11).

---

## P1 — materially reduces LSAT transfer or product reliability

### P1-1. Negation test taught as mechanical discovery tool (stage2.ts:1400)
- **Fix:** Reframed as confirmation tool applied *after* gap analysis; added explicit limits (ambiguous negation, redundant support, cost of five-choice ritual). Teaser (1385) softened from "single most reliable tool" to "one of the most reliable confirmation tools."

### P1-2. "Every argument always has a gap" / "master key" (stage1.ts:494)
- **Fix:** Qualified — tight deductive arguments may have no gap; assumption-hunting is high-leverage but not a substitute for each question type's own task and standard.

### P1-3. "No question rewards outside vocabulary or facts" (stage0.ts:74)
- **Fix:** Rewritten — vocabulary-in-context and academic-prose fluency are genuinely rewarded, especially in RC inference; vocabulary is built *through* reading, not word lists.

### P1-4. RC topic duplication
- **Finding:** rc-p02 and rc-p18 both full passages on plea bargaining; rc-p12 and rc-c02 Passage A both open with Yellowstone wolf reintroduction. Risk of same-topic repetition inside one section.
- **Fix:** Added `topicCluster` to the Passage schema (rc-p02/rc-p18 → `plea-bargaining`; rc-p12/rc-c02 → `rewilding-wolves`) and a duplication guard in `pickPassageSet` plus cluster-aware comparative swap in the exam assembler: no section ever contains two passages from one cluster. **Structural harm eliminated 2026-09-11.** Then, because same-topic repetition across a learner's history still weakens variety, the underlying redundancy was also removed at the content level: **rc-p18 rewritten** as "The Fall and Reinvention of Eyewitness Testimony" (eyewitness-ID reform, new `eyewitness-id` cluster, 6 new questions) and **rc-c02 Passage A rewritten** around the California condor (Passage B's skeptical wolf side kept; all 6 questions updated and verified against the new text, one passage misquote corrected).

### P1-5. Difficulty does not scale with linguistic/structural complexity
- **Finding:** Diff-4 avg 35 words, diff-5 avg 42 words; 90% of stimuli <60 words. Upper-band hardness comes from formal-logic density in short stimuli, not the density of real hard items.
- **Fix:** 8 inflated items downgraded to honest difficulties (lr-a-027→3, lr-a-007→3, lr-b-016→2, lr-b-017→2, lr-b-032→2, lr-f-189→3, lr-h-230→3, lr-d-160→3); lr-d-136 revised. Long-term: new hard items must earn difficulty via structural/linguistic complexity (`difficultyProfile`).

### P1-6. `difficultyProfile` 0/264, `evidenceMap` 0/150
- **Fix:** Populate for all validated items; required by the content test for any item marked `validated`. **Status 2026-09-11:** full LR classification complete — **264/264 LR items classified (255 `validated`, 9 `adversarial-reviewed`)**, each with ≥3-dimension `difficultyProfile` and `reviewHistory`. **RC validation complete 2026-09-11:** 152/152 RC questions `validated`, each with `evidenceMap`, ≥3-dimension `difficultyProfile`, `reviewHistory`. Gold-standard calibration doc: `docs/GOLD_STANDARD_ITEMS.md`.
- **Remediation engine gaps closed 2026-09-11:** (a) fluency branch now genuinely timed — `composeSession` forces `plan.timed` for `remediationBranch === 'fluency'` and `SessionRunner` shows/ticks the timer off `plan.timed` (the old code only timed `mode === 'timed'`, so fluency sessions ran untimed despite the branch promise); (b) delayed rechecks — `scheduler.remediationRecheckDueAt` pulls repaired skills' `dueAt` forward to ≤2 days after a completed weakness-repair session; (c) regression tests added (`tests/remediation.test.ts`, 8/8).

### P1-7. `itemPurpose` uses only 3 of 9 values
- **Fix (planned):** Reclassify items across the full purpose taxonomy (worked-example, micro-drill, guided-practice, skill-acquisition, independent-blocked, mixed-discrimination, transfer, timed-assessment, section-simulation) so the mastery model can implement transfer requirements. **Status: not yet done as of 2026-09-11.**

---

## P2 — significant quality improvements (addressed in Phase 6/7/8 or recorded)

| # | Issue | Disposition |
|---|-------|-------------|
| 1 | All 19 single RC passages end with aphoristic closer | Vary closers in RC rewrite pass |
| 2 | All 25 RC sets exactly 6 questions | Diversify to 5/6/7/8 with justification |
| 3 | 5/6 comparative pairs are point/counterpoint | Add phenomenon/explanation, principle/application, same-evidence/different-inference |
| 4 | All 19 single passages share side-A/side-B/nuanced-middle arc | Add survey, historical-development, cautious-hypothesis, institutional-history archetypes |
| 5 | Difficulty inflation in upper band (8 items) | Downgraded (see P1-5) |
| 6 | Overused templates: 17× "After X, Y↑∴X caused Y"; 43× final-sentence "therefore" | Rewrite targets in Phase 6 |
| 7 | "Single most reliable tool" (1385), "collapse is everything" (1458) | Fixed (see P1-1) |
| 8 | "Always a small, careful step" (stage4.ts:1025) | Fixed — synthesis across paragraphs acknowledged |

## P3 — polish

- `stage0.ts:111` "no… vocabulary to memorize" — retained as anti-memorization advice (compliant).
- lr-e choice terminal punctuation inconsistency — normalized during leakage pass.
- `contrast.ts:1852` "almost always" — adequately hedged, no action.

## Explicit non-issues (verified clear)

- Indicator-word instruction compliant (hints-not-proof; mechanical-use misconception corrected).
- No "explicitly stated in the text" claims; no word-based trap-elimination advice.
- `correctIndex` uniform (χ² 1.99, n.s.).
- `**bold**` in lr-a stimuli intentional (official-style claim marking); renders correctly.
- Escape sequences in passages render correctly.

---

## Verdict distribution (40-item hostile sample)

KEEP 30 · KEEP-INSTRUCTIONAL 8 · REVISE 2 · REPLACE 0 · RETIRE 0 · Two-defensible 0/40.
Construct validity held across the sample; the dominant defect was difficulty inflation, now corrected.
