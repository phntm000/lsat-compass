# Item-Writing Standard

**Status:** Active. Last updated 2026-09-11.

All original items (LR questions, RC questions, drills) are authored to this standard. It exists so a future author — human or agent — produces items indistinguishable in rigor from the validated bank.

## 1. Non-negotiables

1. **One defensible answer.** Before finalizing, attempt to defend every distractor as correct. If you can construct a sincere defense, rewrite.
2. **Skill-first.** Name the exact reasoning move the item tests. If the item is solvable by a heuristic that would fail on official material (longest answer, word-matching, "always pick the hedged choice"), it is defective.
3. **LSAC fidelity.** Stems use official phrasing patterns ("Which one of the following…", "most strongly supported", "depends on assuming"). Stimuli read like edited prose, not textbook examples: no proper-name syllogisms ("No reptiles are…"), no announced methods ("This argument proceeds by…").
4. **No teaching cues in assessment items.** Items with `itemPurpose` of `independent-blocked` or higher contain no bolded claims, no labeled principles, no hints embedded in the stem.
5. **Length parity.** Draft all five choices, then length-match: credited ≤ 1.25× longest distractor. Never pad the credited answer with throat-clearing; never starve distractors.
6. **Register.** Plain, precise, adult prose. No purple metaphors, no jokes, no topical references that will date.

## 2. Difficulty is multidimensional

Set `editorialDifficulty` (1–5, author-assigned, NOT empirically calibrated — never present it as a measured scale) and populate `difficultyProfile` (≥3 dimensions for difficulty ≥ 3):

- **Structural complexity:** how many inferential steps / argument layers?
- **Linguistic complexity:** sentence length, subordination, abstraction of diction.
- **Inferential distance:** how far is the credited answer from the text's surface?
- **Distractor proximity:** how tempting is the best distractor?
- **Scope subtlety / viewpoint complexity / conditional / causal complexity** as applicable.

Difficulty 4–5 must be earned through these dimensions — not through formal-logic density in a 30-word stimulus, not through cartoon distractors around an obvious answer.

## 3. Distractor design

- Every distractor embodies a **nameable error**: too-strong, scope shift, reversal, half-right, answers the wrong question, true-but-irrelevant.
- Difficulty ≥ 3 requires at least one **near-miss**: a choice a competent student picks for a diagnosable reason.
- Difficulty ≥ 4 forbids cartoon distractors (obviously irrelevant, comically wrong).
- Tag each distractor's error in `trapTypes` using the schema taxonomy.

## 4. Stimulus diversity

Avoid the known template ruts: quantified-result openings, final-sentence "therefore" conclusions, "After X, Y increased ∴ X caused Y" causal setups, "Studies show" frames, "Critics argue" dialogues. When a template is pedagogically necessary (e.g., teaching causal flaws), vary its surface: different domains, different sentence rhythms, conclusions in non-final position.

## 5. Explanations

- `explanationQuick`: 2–4 sentences. States the winning move, not just the winner.
- `explanationWalkthrough`: 120–300 words. Reconstructs the reasoning, then explains **why each distractor fails** by name.
- `choiceExplanations`: one ≥25-word note per choice, each naming the error or the virtue.
- `generalLesson`: 1–3 sentences, transferable to unseen items of the type.
- `hints` (3, Socratic, staged): point at the gap, never at the answer.

## 6. RC passages

- **Archetype variety.** Across the bank: interpretive disputes, empirical syntheses, doctrinal analyses, institutional analyses, policy debates, neutral surveys, historical developments, cautious-hypothesis pieces, methodological critiques. No single arc (phenomenon → side A → side B → synthesis) may dominate.
- **Closers vary.** Never end every passage with an aphorism; some end mid-argument, some with an open question, some with a qualification.
- **Domains** balance across law / humanities / social-science / natural-science.
- **Comparative pairs** vary the relationship: point/counterpoint, phenomenon/explanation, principle/application, same-evidence-different-inference, criticism/response.
- **Set sizes** vary 5–8 with justification; never uniform.
- **Evidence maps** required: every question anchored to paragraph(s).
- **Topic clusters** tagged; no section serves two passages from one cluster.

## 7. Revision discipline

When revising an item, bump `version`, set `revisedAt`, and append a `ReviewEntry` stating what changed and why. Never silently alter a validated item's choices without re-running the validation gate.
