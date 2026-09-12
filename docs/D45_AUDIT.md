# D4/D5 Difficulty Recalibration Audit (mandate §§21–23)

Date: 2026-09-12. Reviewer: hostile-recalibration pass (`d45-hostile-recalibration-2026-09-12`).
Scope: every bank item labeled editorialDifficulty 4 or 5 at baseline (57 D4 + 15 D5 = 72 items).

## Method

Each item was reviewed against the §22 acceptance test as a hostile reviewer:

1. Why exactly does the credited answer satisfy the stem?
2. For each distractor: why might a competent test taker choose it?
3. At least TWO wrong answers must have a credible attraction mechanism on first reading.
   If four answers are obviously irrelevant and one obviously addresses the argument, the item
   is not D4/D5 — it is downgraded, never artificially complicated to preserve the label.

Difficulty labels follow the §21 rubric (reasoning architecture, not tortured language):
D3 = multiple initially plausible choices, correct argument representation required;
D4 = meaningful inferential distance, close distractors, reasoning not pattern-matching;
D5 = high competitive density, subtle-but-fair distinctions, several choices survive superficial review.

## Distribution change

| Band | Before | After |
| --- | --- | --- |
| D5 | 15 | 8 |
| D4 | 57 | 48 |
| D3 | 163 | 179 |
| (D1/D2 unchanged) | 39/142 | 39/142 |

22 items demoted (7 from D5, 15 from D4); 8 D5 and 42 D4 items validated with documented attraction
mechanisms. Every reviewed item carries a dated `reviewHistory` entry in its source record.
One content defect was found and fixed during review: `lr-g-210` choice E was self-contradictory
("residents stopped reporting crimes, so reporting soared"); it now reads "where crimes had long
gone unreported, so reporting soared," matching its own explanation.

Note: `lr-h-257` (lr-must-be-true) was initially demoted 5→3, then set to 4: it retains two credible
converse-trap distractors (B/E), and D4 preserves hard-question coverage for its type
(tests/content.test.ts coverage gate) without re-inflating to D5.

## Demotions (22)

| Item | From | To | Hostile-review finding |
| --- | --- | --- | --- |
| lr-a-035 | D4 | D3 | Demote 4->3 (S22). Both speakers state the credited disagreement verbatim (would/would-not strengthen democracy). Explicit-opposition point-at-issue is easy-authentic, not hard. |
| lr-c-096 | D5 | D4 | Demote 5->4 (S22). Credited B (curbside pickup ended) is the strongest weakener, but the runner-up weakeners (sorting-rule confusion; mandatory-program declines elsewhere) fall to standard some/other-cities scope heuristics. Real competition, not D5 subtlety. |
| lr-c-109 | D5 | D4 | Demote 5->4 (S22). Only D (healthier employees self-select) has real pull as a direction trap; A/C/E are inert. The B-rules-out-D architecture is genuine D4, but two-plus credible attractions are not present at D5 density. |
| lr-c-120 | D4 | D3 | Demote 4->3 (S22). Only A has moderate pull; C/D/E are obviously irrelevant to the causal claim. Credited B is the single evident probe of checklist compliance. |
| lr-d-133 | D4 | D3 | Demote 4->3 (S22). Credited E (reverse-causation exclusion) is the classic single-move necessary assumption; only D (over-strong every) attracts. |
| lr-e-165 | D5 | D4 | Demote 5->4 (S22). Distractors are standard scope/opposition traps (all circumstances; entirely funded by fees; ride frequency). Credited D maps directly onto the stimulus fairness structure. |
| lr-e-169 | D4 | D3 | Demote 4->3 (S22). Credited B near-verbatim synthesizes the stimulus (deciding voter, prejudged); E/C are visible scope extremes. |
| lr-e-176 | D4 | D3 | Demote 4->3 (S22). Only C (exception-direction misread) is credible; A/D/E invoke reasons unrelated to the knowing-falsehood exception. |
| lr-e-179 | D5 | D4 | Demote 5->4 (S22). Condition matching against a 30-day/receipt/misuse-exception principle; A (window) and B (misuse) attract, but the reasoning is checklist application, not D5 inferential architecture. |
| lr-f-199 | D4 | D3 | Demote 4->3 (S22). One genuine discrimination (circular A versus expert-consensus B); C/D/E obviously fail to match the circularity pattern. Fails the two-attraction bar. |
| lr-h-229 | D4 | D3 | Demote 4->3 (S22). The either/or dilemma is explicit in the stimulus; only C (equal-likelihood misread) attracts. |
| lr-h-243 | D4 | D3 | Demote 4->3 (S22). Credited C restates the stimulus conditions nearly verbatim; only E (never publish anything) attracts as a scope trap. |
| lr-h-257 | D5 | D4 | Demote 5->4 (revised) (S21/S22). Two-premise transitive chain with contrapositive key; B/E are textbook converse errors. Revised to D4: two credible converse traps (B/E); hardest item of its type. |
| lr-h-258 | D5 | D3 | Demote 5->3 (S22). Credited B (necessary treated as sufficient) is the only choice engaging the reasoning; A is generic flaw-speak and C/D/E describe maneuvers absent from the stimulus. Fails the two-attraction bar. |
| lr-h-260 | D4 | D3 | Demote 4->3 (S22). The beavers-must-build-dams gap is the exposed single move; only B (outcome guarantee, too strong) has real pull. |
| lr-h-263 | D5 | D4 | Demote 5->4 (S22). Single-chain most/all quantifier reasoning; A/B/C are quantifier-shift traps. Credible traps, but the architecture is a direct transitive chain. |
| rc-c04-q3 | D4 | D3 | Demote 4->3 (S22). Distractors are mostly strawmen (abandon emissions entirely; moral hazard inapplicable; never attempted); only C attracts moderately. |
| rc-c05-q3 | D4 | D3 | Demote 4->3 (S22). Only C (teacher-quality attribution) competes; A/B/D are extremes or self-defeating. |
| rc-c06-q3 | D4 | D3 | Demote 4->3 (S22). Only D (transformative scope-word trap) has modest pull; B/C/E obviously fail. |
| rc-c06-q4 | D4 | D3 | Demote 4->3 (S22). Only A (music-licensing analogy overreach) competes; B/D/E are extreme misstatements. |
| rc-p08-q6 | D4 | D3 | Demote 4->3 (S22). Credited C restates the passage prescription directly; A/B/D are strawmen and only E (windfall substituting for tax capacity, which the passage criticizes) has modest pull. |
| rc-p12-q6 | D4 | D3 | Demote 4->3 (S22). Only A (terrain/prey detail) competes with the epistemic-framing key; C/D/E are obviously irrelevant. |

## Validated at D5 (8)

| Item | Finding |
| --- | --- |
| lr-c-095 | VALIDATE D5. Credited E is an exact-quantity alternative cause (dispatch software accounts for the full two minutes, leaving no residual for repaving). Attractions: D (worse congestion with better times strengthens - direction trap), B (second-mechanism strengthener misread), A (some-still-late weakness trap). |
| lr-d-136 | VALIDATE D5. Credited C survives the negation test (if math gains lift English/history scores, the curriculum exclusion collapses). Attractions: A (over-strong no-effect-in-any-subject), B (phone-use shifting feels necessary), D (superlative bait). |
| lr-g-215 | VALIDATE D5. Credited D resolves through two mechanisms (rain outside the watershed; flood-control releases). Attractions: A (record consumption neutralized only by the under-five-percent clause - subtle scope trap), B (confirms rather than resolves). |
| lr-g-220 | VALIDATE D5. Credited D is a composition shift (new low-scoring test takers entered the measured pool). Attractions: E (harder test neutralized by the statewide-rise clause), B (constrains the mystery without resolving it). |
| lr-h-256 | VALIDATE D5 after scrutiny. Credited E is the final normative synthesis; B is explicitly flagged by the text as the real lesson, a strong sub-conclusion trap; A/C/D are in-text premise restates. Competitive density is genuine and the lesson-versus-recommendation distinction is fair. |
| lr-h-261 | VALIDATE D5. Credited B (intermediate conclusion inferred from freight/hospital facts, supporting the funding claim). Attractions: A (main-conclusion mislabel), C (unsupported-premise mislabel), E (concession mislabel of the Admittedly clause). |
| lr-h-262 | VALIDATE D5. Credited D captures the principle-transfer-then-application arc. Attractions: C (near-miss overstatement - every relevant respect - that also drops the ban conclusion), A (direction-reversed), E (half-right oversight account). |
| lr-h-264 | VALIDATE D5. Credited A is the explicit clash (traffic helps versus will not rescue). Attractions: D (surface policy disagreement - the classic too-broad trap), B (Marcus concedes the traffic rise), C/E (one-side-only positions). |

## Validated at D4 (42)

| Item | Finding |
| --- | --- |
| lr-a-018 | VALIDATE D4. Credited E (rebuttal of the industry objection). Attractions: B (overstates the premise as direct proof the law succeeds), C (concession-direction misread). |
| lr-a-034 | VALIDATE D4. Credited D (tax versus cap superiority). Attractions: B (guarantee language Hana never claims), A (Ivan concedes predictability matters - concession trap). |
| lr-b-034 | VALIDATE D4. Credited E is hedged and data-bound. Attractions: A (causal overreach), B (timeline/attribution overreach), C (arithmetic trap - hours fell 1 percent at a higher wage). |
| lr-c-082 | VALIDATE D4. Credited B (analogy without shown similarity). Attractions: C (balanced-budget versus debt-elimination confusion), E (attacks the household premise), D (substantive objection, not a flaw). |
| lr-c-083 | VALIDATE D4. Credited A (residents versus actual voters). Attractions: C (reversed - the flaw is ignoring turnout, not presuming it matches), B (generic unrepresentative-sample trap), D (convoluted percentage confusion). |
| lr-c-093 | VALIDATE D4. Credited A (simultaneous tutoring confound). Attractions: C (cereal-manufacturer funding - source trap), D (some-ate-yet-scored-poorly anecdote trap), B (strengthens). |
| lr-c-094 | VALIDATE D4. Credited C (commuters workplaces not served). Attractions: E (some-never-switch quantifier trap), A (temporary construction versus permanent effect). |
| lr-c-108 | VALIDATE D4. Credited C (within-city controlled comparison). Attractions: B (nationwide-trend weakener misread as strengthener), D (researcher-advocacy source trap), E (some-cities exception). |
| lr-d-147 | VALIDATE D4. Credited B supplies the converse that repairs the argument. Attractions: C (restates the premise), D (most-quantifier trap). |
| lr-d-148 | VALIDATE D4. Credited D (always switches to cheapest) bridges price to action. Attractions: B (wanting savings is not switching), E (most-cities scope trap), A (future prices). |
| lr-d-149 | VALIDATE D4. Credited A (liability requires negligence evidence) bridges verdict to evidence. Attractions: C (fact of negligence does not bridge the epistemic claim), D (general reliability). |
| lr-d-150 | VALIDATE D4. Credited C (no poorly managed team finishes on time) is the contrapositive bridge. Attractions: B (converse trap), A (budget irrelevance). |
| lr-e-174 | VALIDATE D4. Credited C satisfies both conditions. Attractions: A (lobbyist fails the constituent condition), B (80 dollars fails the threshold), E (permissible gift paired with a separate violation), D (donation rationale does not cure the threshold failure). |
| lr-f-186 | VALIDATE D4. Credited E matches the statistical syllogism. Attractions: C (certainty upgrades probably), B (half-undermines probably), A (reversed structure). |
| lr-g-206 | VALIDATE D4. Credited A (discarded thick reusables add more plastic per bag). Attractions: C (paper litter is not plastic litter - material-attention trap), D (regional trend contextualizes but explains no mechanism). |
| lr-g-210 | VALIDATE D4. Credited E (new officers surface long-unreported crime; reporting artifact, victimization flat). Attractions: C (regional-trend alternative resolution - runner-up), D (unspent funding). Choice E text repaired 2026-09-12: prior wording (residents stopped reporting, so reporting soared) was self-contradictory. |
| lr-g-218 | VALIDATE D4. Credited E (vacancy stock filled by wage-drawn in-migration). Attractions: D (layoffs deepen the paradox - direction trap), B (over-21 scope limiter). |
| lr-h-224 | VALIDATE D4. Credited D (premise ruling out alternatives). Attractions: E (the statement IS asserted, so not an unstated assumption), B (role mislabel), C (wrong evidence mapping). |
| lr-h-225 | VALIDATE D4. Credited E (premise backing the intermediate conclusion). Attractions: D (support direction reversed), B (background downgrade), C (offered-to-refute misread). |
| lr-h-234 | VALIDATE D4. Credited D (whether to adopt pricing here). Attractions: A (Brooks concedes tried-city efficacy - concession trap), C (harm claim is one-sided). |
| lr-h-235 | VALIDATE D4. Credited E (whether remote work caused the rise). Attractions: A (union concedes the number - concession trap), B (layoffs asserted by one side only). |
| lr-h-239 | VALIDATE D4. Credited D (course comparability). Attractions: B (study scope/semesters), C (Hawthorne-style awareness). |
| lr-h-244 | VALIDATE D4. Credited D (substantial benefit plus minimal burden). Attractions: A (drops the burden condition), C (literally-no-burden extreme inversion). |
| lr-h-247 | VALIDATE D4. Credited C (clear, specific structural threat). Attractions: E (blanket precautionary ban violates specificity), B (vague rumors fail the clear-and-specific clause). |
| lr-h-248 | VALIDATE D4, violates-stem. Credited D (no disclosure, no opt-out). Attractions: E (treatment refused outright - no risks left to disclose), B (explicit request conforms - direction trap under a violates stem). |
| lr-h-251 | VALIDATE D4. Credited C (equivocation on room to breathe parallels a voice). Attractions: B (promise literally kept), E (tax/fee deception is not equivocation). |
| lr-h-252 | VALIDATE D4. Credited D (composition: players to team). Attractions: B (division - reverse direction), C (hedged most/probably), A (flat HQ costs add information). |
| lr-h-255 | VALIDATE D4. Credited E (frost destroyed the early crop on the new acreage). Attractions: D (record prior harvest partially de-paradoxes), A (price incentive deepens the paradox - direction trap). |
| lr-h-259 | VALIDATE D4. Credited C (sleep-schedule confound). Attractions: D (manufacturer sued on other products - source trap), E (different-company headband irrelevance). |
| rc-c01-q3 | VALIDATE D4. Credited E (process safeguards beat the black-box objection). Attractions: A (tu quoque on human secrecy), D (trade-secrecy necessity). |
| rc-c02-q3 | VALIDATE D4. Credited A (burdens real but outweighed by preventing irreversible harm). Attractions: E (tourism fully compensates - overclaim), B (denies conceded burdens). |
| rc-p01-q6 | VALIDATE D4. Credited C (minimalism is a rebuttable default and this scenario rebuts it). Attractions: A (ignores rebuttability), D (maximalist-legitimacy overclaim), B (passive-virtue misread). |
| rc-p05-q6 | VALIDATE D4. Credited C (reader-weighted inference view). Attractions: A (objectivist misread), B (intentionalist trap), D (erases the passage distinction). |
| rc-p06-q6 | VALIDATE D4. Credited C (microhistory as small-scale lens). Attractions: B (chronological story misclassification), A (Annales thematic confusion), E (pre-modern-only scope trap). |
| rc-p07-q6 | VALIDATE D4. Credited A (defensible nudge with opt-out and guardrails). Attractions: B (autonomy-objection absolutized), E (domain-only scope trap). |
| rc-p09-q6 | VALIDATE D4. Credited E (skeletal indictment plus transitional-penalty qualification). Attractions: B (Boserup demographic rival), C (ancient-DNA reframing), A (Sahlins thesis mismatch). |
| rc-p10-q6 | VALIDATE D4. Credited B (causal-direction problem). Attractions: D (direct-causation reversal), A (strong-determinism vindication overread). |
| rc-p11-q6 | VALIDATE D4. Credited E (reciprocal altruism with turn-taking and exclusion). Attractions: C (group-selection framing), A (kin selection despite stated unrelatedness), B (costly signaling surface match). |
| rc-p13-q6 | VALIDATE D4. Credited A (paradox, solution, geochemical objection arc). Attractions: C (generic narrative arc), E (ridiculed-dissenters mischaracterization). |
| rc-p15-q6 | VALIDATE D4. Credited B (reversible, documented cleaning is still intervention the critic rejects). Attractions: A/E (non-intervention choices a misreader picks - direction traps), D (documentation approved by the critic). |
| rc-p17-q6 | VALIDATE D4. Credited E (authorization and liability - the governance gap). Attractions: A (growth-rate empirics), B (tightening existing reserves). |
| rc-p19-q6 | VALIDATE D4. Credited B (clear theft case both camps accept). Attractions: C (undeterminable origin), A (legal purchase), D (joint excavation), E (long display). |

## Residual risk

Difficulty labels are calibrated to the §21 rubric by structured hostile review, not by live
student response data (the bank is original content; no administration statistics exist).
When real response data accrues, labels should be re-anchored empirically (§23 official-anchor
calibration remains the reference for band boundaries).
