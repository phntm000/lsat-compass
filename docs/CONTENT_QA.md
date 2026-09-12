# Content QA — Validation Protocol

**Status:** Active. Last updated 2026-09-11.

Every item in the bank carries a `validationStatus`. The statuses form a pipeline; an item moves right only by passing the gate criteria. `retired` items never appear to learners.

```
draft → author-reviewed → adversarial-reviewed → validated
                    ↘ needs-revision ↗            ↘ retired
```

## Status definitions

| Status | Meaning | May appear in… |
|--------|---------|----------------|
| `draft` | Authored, not yet self-reviewed | Nowhere learner-facing |
| `author-reviewed` | Author has re-read and self-checked against this protocol | Lessons, guided practice, drills |
| `adversarial-reviewed` | Passed hostile review by a second reviewer (or structured adversarial pass) but has a flagged limitation | All of the above; **not** in timed simulations |
| `validated` | Passed full validation below with no open flags | Everywhere, including timed sections and full simulations |
| `needs-revision` | Failed a gate; blocked until fixed and re-reviewed | Nowhere until fixed |
| `retired` | Removed from the active bank (duplication, unfixable defect) | Nowhere |

## Validation gate (all must hold for `validated`)

1. **Single defensible answer.** A hostile reviewer attempts to defend each distractor. If any distractor survives, the item fails.
2. **Construct validity.** The item tests its labeled `questionType`/skill — the credited answer is reachable by the skill's method, not by test-wiseness.
3. **Length parity.** Credited choice ≤ 1.25× the longest distractor; not uniquely longest by >20 chars. (Enforced by `tests/content.test.ts` ratchet.)
4. **Position hygiene.** Correct indices uniform across the bank (χ² check in tests).
5. **Distractor quality.** At least one near-miss distractor for editorialDifficulty ≥ 3 (a choice a competent student could pick for a nameable wrong reason); no cartoon distractors at difficulty ≥ 4.
6. **Explanation standards.** `explanationQuick` (2–4 sentences, why the winner wins), `explanationWalkthrough` (120–300 words, addresses each distractor's failure), `choiceExplanations` (one substantive ≥25-word note per choice), `generalLesson` (transferable principle).
7. **Difficulty honesty.** `editorialDifficulty` matches the hostile reviewer's independent rating within ±1; `difficultyProfile` populated (≥3 dimensions) for difficulty ≥ 3.
8. **Purpose fit.** `itemPurpose` matches the item's actual instructional role; assessment-purpose items (`independent-blocked` and up) contain no teaching cues in stem/stimulus.
9. **No leakage.** No stimulus wording uniquely repeated in the credited choice; no "always/never" absolutes in distractors that make them trivially wrong unless the type warrants it.
10. **RC only.** `evidenceMap` populated: each question anchored to passage paragraph(s); no question answerable without the passage; no question contradicting passage facts.

## Review records

Each validation or revision appends a `ReviewEntry` to the item's `reviewHistory`: date, reviewer role, verdict, and notes. `validated` requires ≥1 adversarial pass recorded.

## Simulation eligibility (Part LI)

Timed sections and full simulations draw **only** from `validated` items. If the validated pool for a section type is exhausted, the builder falls back to `adversarial-reviewed` items **with a learner-visible disclosure** that the section includes items pending full validation — and logs the fallback. Internal mastery metrics computed from fallback sections are flagged as provisional.

## Ratchet tests

`tests/content.test.ts` enforces:
- No `retired` item in the active bank.
- Leakage budget: uniquely-longest-credited rate may only decrease from the recorded baseline.
- `validated` items have ≥3 `difficultyProfile` dimensions and non-empty `reviewHistory`.
- Answer-position uniformity (χ²).
- Instructional/assessment purpose distribution sanity.
