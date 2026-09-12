# Remediation Baseline (mandate Phase 1)

Date: 2026-09-12. Baseline commit: `e8208a5` (source branch).
Suite at baseline: **92 tests / 8 files, all passing; `tsc --noEmit` clean.**

This document records the measured state of the bank and engine **before**
the follow-up mandate's fixes, so every later claim has a reproducible
starting point. All numbers below are produced by `tests/leakage.test.ts`
and `scripts/leakage-audit.mjs` against the baseline bank (416 items).

## Baseline surface-leakage measurements (416 items)

| Ratchet (gate) | Baseline | Verdict |
| --- | --- | --- |
| Unique-longest choice credited (13–27%) | **66.6%** (277/416) | FAIL — "pick the longest" signal |
| Unique-shortest choice credited (13–27%) | **3.6%** (15/416) | FAIL — anti-pattern floor |
| Pick-the-longest strategy (≤27%) | **68.7%** | FAIL |
| Credited-position χ² (0.30–13.28) | 2.17 [83,91,82,73,87] | pass |
| Credited-vs-distractor length delta, median (≤6) | **+17.5** | FAIL |
| Credited-vs-distractor length delta, mean (≤6) | **+17.4** | FAIL |
| Max stem-overlap choice credited (≤30%) | 4.6% | pass |
| Surface-only classifier, 10-fold CV (13–27%) | **67.8%** | FAIL |

Interpretation: the per-item ratchets (credited ≤1.25× longest distractor,
never uniquely longest by >20 chars) held at baseline, but the bank-wide
*correlation* between length and correctness was extreme: the credited choice
was the unique longest in two-thirds of items, by a median margin of 11
chars (p90 = 18, max = 20 — hard against the per-item cap, i.e. the cap was
being "gamed" by construction). A reader who never engages with content
could score ~2/3 by length alone.

## Engine findings carried from the live-site audit

- `toLocaleDateString()` without a locale arg (Today, Notebook, Progress,
  ErrorLab, Writing, Backup screens) — non-deterministic date keys.
- Timed-mode adaptation (`recommend.ts`) can trigger on minimal evidence.
- Exam runner timer pauses on backgrounding (not strict wall-clock).
- Exam state in `sessionStorage` only (not durable across browser restarts).
- RC exam assembly chose comparative-vs-single by coin flip and had no
  5–8 set-size variety control.
- No CI workflow existed (`.github/` absent) despite claims otherwise.

## Exit criteria for the remediation

All 7 leakage ratchets green; per-item content gates green; 24 new RC items
(7th question per single passage, comparative transfer items) validated;
RC section blueprint (3 single + 1 comparative OR 4 single, set sizes 5–8)
deterministic and tested; engine fixes above; CI running on `source`;
deployed to `main` and re-verified in production.
