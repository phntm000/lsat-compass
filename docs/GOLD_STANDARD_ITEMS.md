# Gold-Standard Items — LSAT Compass

**Purpose.** Calibration exemplars for everyone who writes, reviews, or
validates items. Before mass classification or revision, read these items and
internalize what "validated" must mean. An item earns `validated` only when it
clears every bar below — hostile review found no second defensible answer, no
leakage cue, and no difficulty inflation.

**Status (2026-09-11).** 32 LR items validated from the first hostile tranche
(40 items: 32 validated, 8 adversarial-reviewed). Exemplars below are drawn
from that set. The bar they set applies to all future validation.

---

## The bar, in one page

1. **One defensible answer.** A hostile reader actively trying to defend a
   distractor fails. The credited answer follows from the stimulus by the
   question type's logic; every distractor fails for a nameable reason
   (recorded in `trapTypes`).
2. **No leakage.** Credited choice ≤ 1.25× the longest distractor and not
   uniquely longest by > 20 characters — verified mechanically across all
   416 questions — AND no semantic cue (hedging, specificity, tone) marks the
   answer.
3. **Honest difficulty.** `editorialDifficulty` reflects the item as written,
   not the type's reputation. `difficultyProfile` rates ≥ 3 dimensions from
   the item itself (structural complexity, inferential distance, distractor
   proximity, linguistic complexity, causal complexity, abstraction).
4. **Type fidelity.** The stem asks what the type asks; the stimulus rewards
   the type's reasoning move and nothing else. A flaw item's credited answer
   names the flaw committed, not a nearby flaw.
5. **Explanations teach.** `explanationQuick` gives the 2–4 sentence crux;
   `explanationWalkthrough` shows the full reasoning chain (120–300 words);
   each `choiceExplanations` entry says why that choice wins or loses in
   ≥ 25 substantive words — never "this is incorrect because it is wrong."
6. **Purpose fit.** `itemPurpose` matches the item's role: `skill-acquisition`
   items are clean and focused; `mixed-discrimination` items are unlabeled
   and type-ambiguous on the surface.

---

## Exemplars

### 1. `lr-d-136` — Necessary Assumption at difficulty 5 (the ceiling exemplar)

The hardest validated item in the bank, and the model for what d5 must earn:

- **Two-move stimulus.** A causal claim (ban → scores) PLUS an elimination
  move (math curriculum can't explain it because gains were in other
  subjects). The assumption lives in the elimination move, not the headline
  causal claim — this is what makes it d5 rather than d3.
- **Negation-testable answer.** (C): "Gains in mathematics instruction do not
  produce higher scores in English and history." Negate it and the
  subject-pattern evidence stops excluding the curriculum — the argument
  collapses. The explanation says exactly this.
- **Live distractors.** (A) overstates (no positive effect in ANY subject —
  stronger than needed); (B) is a genuine alternative explanation but not an
  assumption the stated reasoning *depends* on; (D) is comparative puffery.
  Each fails for a distinct, nameable reason.
- **Profile honesty.** structuralComplexity 4, inferentialDistance 5,
  distractorProximity 4, causalComplexity 4 — rated from the item, and the
  walkthrough justifies the ratings.

*Lesson for validators:* d5 requires layered reasoning (causal + elimination),
not just long sentences. Compare against inflated items that were downgraded
(e.g. `lr-d-160` d5→d3) — length and jargon are not difficulty.

### 2. `lr-c-071` — Flaw at difficulty 1 (the floor exemplar)

The model for what d1 must be — clean, not condescending:

- **One flaw, unmistakable.** Ad hominem: Patel attacks Alvarez's impartiality
  instead of the bike-lane proposal. A learner who understands ad hominem
  answers in seconds; a learner who doesn't is taught by the explanation.
- **Profile:** structuralComplexity 1, inferentialDistance 1,
  linguisticComplexity 2. The d1 rating is earned by the single transparent
  move, not by the type label.
- **Purpose fit.** `skill-acquisition`: focused, minimal noise, ideal for
  first exposure to flaw questions.

*Lesson for validators:* d1 items must still be real LSAT-style reasoning,
not trivia. The stimulus is a naturalistic hearing exchange, not a textbook
example.

### 3. `lr-g-205` — Resolve the Paradox at difficulty 2

The model for paradox items:

- **Genuine tension.** Fewer workdays → MORE output. The paradox is stated
  in one crisp sentence pair; no throat-clearing.
- **Resolution addresses the mechanism.** (C): Fridays were status meetings;
  eliminating them left four uninterrupted coding days. It explains *how*
  less time produced more output.
- **Near-miss distractor.** (A) "happier and less burned out" is tempting —
  it gestures at a mechanism but doesn't connect happiness to shipped
  features. This is the classic paradox trap: an answer that *rhymes* with
  resolution without resolving. The choice explanation must name this.
- **Irrelevant-but-topical distractors.** (B) flat headcount and (D)
  competitors' schedules are about workweeks but touch neither side of the
  paradox.

*Lesson for validators:* the credited paradox resolution must bridge the
specific tension stated. "Positive-sounding" is not resolving.

### 4. `lr-f-181` — Parallel Reasoning

(Representative of the four validated parallel-reasoning items
`lr-f-181/185/186/191`.)

- Parallel items live or die on **structural isomorphism**: the credited
  answer matches the original's logical skeleton (conditional chain,
  contrapositive, scope) while differing in surface content. Validators must
  diagram both and confirm the match is structural, not topical.
- Distractors must share surface topic with the original but break the
  structure — the classic parallel trap is "same subject, different logic."

### 5. `lr-a-006` — Main Conclusion

- The credited answer must be the conclusion *as stated*, not a stronger or
  weaker nearby claim. Validators check: does the answer match the
  conclusion's exact scope and modality? Distractors typically include a
  premise restated as a conclusion, or the conclusion with shifted scope.

### 6. `lr-b-007` — Must Be True

- The credited answer follows by *deduction alone* — no outside knowledge,
  no "most reasonable" judgment. Validators attempt to construct a
  counterexample to the credited answer from the stimulus; if one exists,
  the item fails.

---

## Anti-exemplars (what validation must catch)

Drawn from the first tranche's hostile findings:

- **Difficulty inflation** (the dominant defect found): items rated d4/d5 on
  type reputation rather than the item's actual reasoning load. Eight items
  were downgraded before validation. Rule: rate the item, not the type.
- **Leakage by verbosity**: wave-2 fixes extended distractors to meet the
  1.25×/20-char thresholds. Hostile review (25/25 KEEP) confirmed the
  extensions didn't create defensible distractors — but future editors must
  re-verify semantics after any length edit, not just the ratio.
- **KEEP-INSTRUCTIONAL items** (8): sound reasoning but instructional
  scaffolding that would cue answers in assessment. These are
  `adversarial-reviewed`, never `validated`, and never enter simulations.

---

## Validator checklist (per item)

- [ ] Attempt to defend each distractor as correct. Record why each fails.
- [ ] Negate the credited answer (assumption family) or construct a
      counterexample (inference family). Confirm the argument breaks.
- [ ] Check length ratio ≤ 1.25× and longest-gap ≤ 20 chars (mechanical).
- [ ] Read the credited answer blind: does any word/phrase cue it?
- [ ] Rate ≥ 3 difficulty dimensions from the item itself; sanity-check
      `editorialDifficulty` against the profile.
- [ ] Read all five `choiceExplanations`: each ≥ 25 words, each substantive.
- [ ] Confirm `itemPurpose` fits the item's actual role.
- [ ] Write the `reviewHistory` entry: date, reviewer, verdict, notes.
