/**
 * LSAT Compass — Contrast drills (d-c001…d-c100).
 *
 * Contract: content-schema.md §6 (Drill record), §7 (QA rubric), §9 (voice).
 * All stimuli, choices, and explanations are original compositions written for
 * this app. No LSAC, LawHub, PrepTest, or commercial-prep material is reproduced
 * or paraphrased.
 *
 * ID allocation — 10 per confusable pair (lesson files reference these ranges):
 *   necessary-vs-sufficient              d-c001–010
 *   strengthen-vs-sufficient-assumption  d-c011–020
 *   must-be-true-vs-most-strongly-supported d-c021–030
 *   conclusion-vs-premise                d-c031–040
 *   fact-vs-inference                    d-c041–050
 *   author-view-vs-other-view            d-c051–060
 *   weaken-vs-flaw                       d-c061–070
 *   necessary-assumption-vs-strengthen   d-c071–080
 *   correlation-vs-causation             d-c081–090
 *   some-vs-most-vs-all                  d-c091–100
 *
 * Every drill carries a contrastNote naming the distinction being taught.
 */

export interface Drill {
  id: string;
  kind: "translate" | "identify" | "classify" | "contrast" | "complete" | "order";
  skillIds: string[];
  difficulty: 1 | 2 | 3;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  contrastNote?: string;
  /** Schema §0: every record is marked original, version 1. */
  version?: number;
  sourceType?: "original";
}

const V1 = { version: 1, sourceType: "original" } as const;

export const DRILLS_C: Drill[] = [
  // ==================================================================
  // necessary-vs-sufficient — d-c001–010
  // ==================================================================
  {
    id: "d-c001",
    kind: "contrast",
    skillIds: ["lr-nec-vs-suff", "f-conditional"],
    difficulty: 1,
    prompt:
      "A city ordinance states: 'A food truck may operate downtown only if it holds a current health permit.' For a food truck operating downtown, which of the following is NECESSARY but NOT SUFFICIENT?",
    choices: [
      "The truck holds a current health permit.",
      "The truck's owner wants to operate downtown.",
      "The truck passed every inspection ever conducted.",
      "The truck is the only food truck downtown.",
    ],
    correctIndex: 0,
    explanation:
      "'Only if' makes the health permit necessary: no permit, no downtown operation. But it is not sufficient, because the ordinance may impose further conditions — a business license, a vending-zone assignment, insurance — that the sentence never rules out. The other choices are not required by the ordinance at all. This is the classic necessary-vs-sufficient trap: treating a requirement as a guarantee.",
    contrastNote:
      "A necessary condition must hold for the outcome to occur, but it does not guarantee the outcome; a sufficient condition guarantees it. 'Only if' signals necessity — never sufficiency.",
    ...V1,
  },
  {
    id: "d-c002",
    kind: "contrast",
    skillIds: ["lr-nec-vs-suff", "f-conditional"],
    difficulty: 1,
    prompt:
      "A museum admits anyone who shows a membership card OR a same-day ticket. Which of the following is SUFFICIENT but NOT NECESSARY for admission?",
    choices: [
      "Showing a same-day ticket.",
      "Being employed by the museum.",
      "Arriving before noon.",
      "Wanting to see the exhibits.",
    ],
    correctIndex: 0,
    explanation:
      "Showing a same-day ticket is sufficient: the 'or' rule admits anyone who shows one, so the ticket guarantees entry. It is not necessary, because a membership card also works — there are two paths in. The other choices describe things the rule never requires and never promises will gain admission. Notice the mirror image of a necessity rule: 'or' creates sufficiency, while 'only if' creates necessity.",
    contrastNote:
      "A sufficient condition guarantees the outcome but need not be the only way to get there. With an 'or' rule, each listed path is sufficient without being necessary.",
    ...V1,
  },
  {
    id: "d-c003",
    kind: "classify",
    skillIds: ["lr-nec-vs-suff", "lr-necessary-assumption"],
    difficulty: 2,
    prompt:
      "A question stem reads: 'Which of the following is an assumption the argument requires?' Which task is being requested?",
    choices: [
      "Find a necessary assumption — something the argument must be taking for granted.",
      "Find a sufficient assumption — something that would prove the conclusion.",
      "Find the flaw in the argument's reasoning.",
      "Find a statement that most strengthens the argument.",
    ],
    correctIndex: 0,
    explanation:
      "The word 'requires' is the giveaway: the stem asks for an assumption the argument depends on — one that must be true for the reasoning to work. That is a necessary assumption, tested by negation: deny it and the argument collapses. A sufficient assumption would be introduced with language like 'allows the conclusion to be properly drawn.' Strengthen and flaw are different tasks entirely, even though they orbit the same gap.",
    contrastNote:
      "Necessary-assumption stems use 'requires,' 'depends on,' or 'must assume.' Sufficient-assumption stems use 'allows the conclusion to be properly drawn' or 'follows logically if assumed.' The stem tells you which job to do.",
    ...V1,
  },
  {
    id: "d-c004",
    kind: "classify",
    skillIds: ["lr-nec-vs-suff", "lr-sufficient-assumption"],
    difficulty: 2,
    prompt:
      "A stem reads: 'Which of the following, if assumed, allows the conclusion to be properly drawn?' Which task is being requested?",
    choices: [
      "Find a necessary assumption.",
      "Find a sufficient assumption — a missing premise that makes the conclusion follow logically.",
      "Find what must be true given the premises.",
      "Find the argument's main conclusion.",
    ],
    correctIndex: 1,
    explanation:
      "'Allows the conclusion to be properly drawn' means the missing premise must close the logical gap completely — combined with the stated premises, it has to guarantee the conclusion. That is a sufficient assumption. A merely helpful statement is not enough here, and 'must be true' asks for a deduction from the premises rather than a premise to add. Watch for this phrasing: 'properly drawn' and 'follows logically' always signal sufficiency.",
    contrastNote:
      "Sufficient-assumption tasks demand a guarantee: the right answer plus the premises must entail the conclusion. Necessary-assumption tasks demand only a requirement: something the argument cannot do without.",
    ...V1,
  },
  {
    id: "d-c005",
    kind: "contrast",
    skillIds: ["lr-nec-vs-suff", "lr-necessary-assumption"],
    difficulty: 2,
    prompt:
      "An argument concludes that a new dam will not harm fish migration. Which test tells you whether a proposed assumption is NECESSARY to the argument?",
    choices: [
      "Negate it: if the argument falls apart, the assumption was necessary.",
      "Affirm it: if the conclusion becomes certain, the assumption was necessary.",
      "Check whether it mentions fish or dams.",
      "See whether it makes the argument slightly stronger.",
    ],
    correctIndex: 0,
    explanation:
      "The negation test is the defining tool for necessary assumptions: a necessary assumption is something the argument cannot live without, so denying it must damage the argument. The second choice describes a test for sufficiency, not necessity. The third is keyword matching, which the test punishes, and the fourth describes strengthening — a helpful statement can strengthen without being required. Only negation separates 'needed' from 'merely helpful.'",
    contrastNote:
      "Necessary = the argument needs it (negation test). Sufficient = it guarantees the conclusion (affirmation test). Strengthen = it merely helps. Each task has its own test.",
    ...V1,
  },
  {
    id: "d-c006",
    kind: "contrast",
    skillIds: ["lr-nec-vs-suff", "f-conditional", "f-translate"],
    difficulty: 2,
    prompt:
      "Consider the rule: 'You can vote in the election only if you are a registered citizen.' Which restatement is correct?",
    choices: [
      "If you are a registered citizen, then you can vote.",
      "If you can vote, then you are a registered citizen.",
      "If you are not a registered citizen, then you can vote.",
    ],
    correctIndex: 1,
    explanation:
      "'Only if' introduces a necessary condition: voting requires registered citizenship, so voting implies citizenship (vote → citizen). The first choice reverses this into a sufficient claim — citizenship alone does not guarantee you can vote, since age, residency, or deadlines may also matter. The third choice is incoherent. Reversal is the most common conditional error: always put the 'only if' phrase after the arrow.",
    contrastNote:
      "'P only if Q' translates to P → Q: Q is necessary for P, never sufficient. The classic error is reversing the arrow and treating the necessary condition as a guarantee.",
    ...V1,
  },
  {
    id: "d-c007",
    kind: "contrast",
    skillIds: ["lr-nec-vs-suff", "lr-necessary-assumption"],
    difficulty: 2,
    prompt:
      "A student argues: 'I will pass the bar exam because I completed every practice question in my prep course.' Which statement is NECESSARY for this reasoning but NOT SUFFICIENT to guarantee she passes?",
    choices: [
      "Completing the practice questions prepared her for the actual exam.",
      "She will answer every question on the real exam correctly.",
      "Her prep course was the most expensive one available.",
      "She studied late into the night before the exam.",
    ],
    correctIndex: 0,
    explanation:
      "If completing the questions did not prepare her at all, the reason gives zero support for the conclusion — so the argument needs the first choice. Yet preparation alone does not guarantee passing; nerves, health, or luck on test day could intervene, so it is not sufficient. The second choice would guarantee passing but is far stronger than the argument requires — confusing 'would prove it' with 'is needed' is exactly the necessary/sufficient mix-up. The last two choices are irrelevant.",
    contrastNote:
      "Arguments routinely need modest assumptions (preparation helped) without needing extreme ones (perfection). Necessary means 'the reasoning needs it'; sufficient means 'it seals the deal.'",
    ...V1,
  },
  {
    id: "d-c008",
    kind: "contrast",
    skillIds: ["lr-nec-vs-suff", "f-conditional"],
    difficulty: 3,
    prompt: "A sign reads: 'Entry if and only if you show ID.' What is true of showing ID?",
    choices: [
      "It is necessary but not sufficient for entry.",
      "It is both necessary and sufficient for entry.",
      "It is sufficient but not necessary for entry.",
      "It is neither necessary nor sufficient.",
    ],
    correctIndex: 1,
    explanation:
      "'If and only if' is the rare phrase that runs both directions: 'if' makes showing ID sufficient (show ID → entry), and 'only if' makes it necessary (entry → showed ID). Together they form a perfect two-way lock. The first choice drops the 'if' half, the third drops the 'only if' half, and the fourth ignores the sentence entirely. 'If and only if' always means the condition is both required and enough.",
    contrastNote:
      "'If and only if' is the one phrase that asserts both directions at once: the condition is required (necessary) AND enough (sufficient). Every other conditional phrase gives you only one direction.",
    ...V1,
  },
  {
    id: "d-c009",
    kind: "classify",
    skillIds: ["lr-nec-vs-suff", "lr-sufficient-assumption"],
    difficulty: 3,
    prompt:
      "A stem reads: 'The conclusion follows logically if which of the following is assumed?' Which task is being requested?",
    choices: [
      "Find a necessary assumption.",
      "Find a statement that most strengthens the argument.",
      "Find a sufficient assumption — a premise that makes the conclusion inescapable.",
      "Find a statement that must be true.",
    ],
    correctIndex: 2,
    explanation:
      "'Follows logically' is guarantee language: the correct answer, added to the premises, must make the conclusion inescapable. That is a sufficient assumption. The first choice is the trap: a necessary assumption is something the argument needs, but needing is not proving, and a needed-but-gap-leaving statement would not make anything 'follow logically.' The second asks for help rather than proof, and the fourth asks for a deduction rather than a missing premise.",
    contrastNote:
      "'Follows logically if assumed' = sufficiency task. The answer must prove the conclusion, not merely be something the argument needs. A necessary assumption that leaves a gap is wrong here.",
    ...V1,
  },
  {
    id: "d-c010",
    kind: "contrast",
    skillIds: ["lr-nec-vs-suff", "lr-necessary-assumption"],
    difficulty: 3,
    prompt:
      "Argument: 'The new restaurant will succeed because the neighborhood lacks good Italian food.' Proposed assumption: 'The restaurant will serve Italian food.' Apply the negation test. What does it show?",
    choices: [
      "Negated — 'the restaurant will not serve Italian food' — the argument collapses, so the assumption is necessary.",
      "Negated, the argument is unaffected, so the assumption is unnecessary.",
      "It shows the assumption is sufficient to guarantee success.",
      "The negation test only applies to strengthen questions.",
    ],
    correctIndex: 0,
    explanation:
      "Negate the proposal: the restaurant will not serve Italian food. Then 'the neighborhood lacks good Italian food' gives no reason at all to expect success — the reasoning collapses, which is exactly what the negation test looks for. So the assumption is necessary. The third choice overclaims: serving Italian food does not guarantee success, since rent, management, and competition still matter. The fourth is simply false — the negation test is the signature move for necessary-assumption questions.",
    contrastNote:
      "The negation test in action: deny the candidate assumption and watch the argument. Collapse = necessary. No effect = not necessary. It never tests sufficiency.",
    ...V1,
  },
  // ==================================================================
  // strengthen-vs-sufficient-assumption — d-c011–020
  // ==================================================================
  {
    id: "d-c011",
    kind: "contrast",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 1,
    prompt:
      "Argument: 'The town's new bike lanes will reduce traffic congestion, because several cyclists have said they will switch to bike commuting once the lanes open.' Which choice STRENGTHENS the argument?",
    choices: [
      "A city survey found that 15% of drivers would switch to cycling if safe lanes existed.",
      "Cycling is healthier than driving a car.",
      "The bike lanes cost less than widening the roads.",
      "Several cyclists said they would keep driving through the winter.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice makes the conclusion more likely by showing the promised switch is not just a few anecdotes but a real slice of drivers — it supports the key causal step without proving the outcome. The second is true but beside the point, since health was never the issue; the third is about cost rather than congestion; and the fourth weakens by shrinking the pool of switchers. Note what the right answer does not do: it does not guarantee congestion will fall — strengthening only raises the odds.",
    contrastNote:
      "Strengthening makes the conclusion more likely; it does not have to prove it. A choice can be the right strengthen answer even while leaving the conclusion uncertain.",
    ...V1,
  },
  {
    id: "d-c012",
    kind: "contrast",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 2,
    prompt:
      "Argument: 'Marina will be hired as the firm's new analyst because she scored highest on the skills test.' Which choice, if true, GUARANTEES the conclusion — makes it follow logically?",
    choices: [
      "Marina also interviewed very well.",
      "The firm always hires the highest scorer on the skills test, with no exceptions.",
      "The skills test is a good predictor of job performance.",
      "Marina wants the job badly.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice closes the gap completely: if the firm invariably hires the top scorer and Marina is the top scorer, her hiring follows as a matter of logic. The first and third choices merely strengthen — a great interview and a predictive test make hiring more likely but leave room for other candidates or other criteria. The fourth is irrelevant. This is the sufficient-assumption standard: the right answer plus the premises must entail the conclusion, not just support it.",
    contrastNote:
      "A sufficient assumption must prove the conclusion, not merely support it. 'Helps' (first and third choices) is the strengthen standard; 'guarantees' (second choice) is the sufficient-assumption standard. The task tells you which bar to clear.",
    ...V1,
  },
  {
    id: "d-c013",
    kind: "classify",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 2,
    prompt:
      "A stem reads: 'Which of the following most strengthens the argument?' Which task is being requested?",
    choices: [
      "Find evidence that makes the conclusion more likely — proof is not required.",
      "Find a missing premise that makes the conclusion certain.",
      "Find the flaw in the argument's reasoning.",
      "Find what must be true given the premises.",
    ],
    correctIndex: 0,
    explanation:
      "'Most strengthens' asks for support, not proof: the winner raises the conclusion's probability, even if the conclusion remains uncertain. The second choice describes a sufficient assumption, which is a stricter job — every sufficient assumption would strengthen, but most strengtheners fall short of proof. The third and fourth are different question types. On strengthen questions, do not reject a choice merely because it leaves some doubt.",
    contrastNote:
      "Strengthen stems ('most strengthens,' 'provides the most support') ask for a probability boost, not a logical guarantee. Do not hold strengthen answers to the sufficient-assumption standard.",
    ...V1,
  },
  {
    id: "d-c014",
    kind: "classify",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 2,
    prompt:
      "A stem reads: 'The conclusion follows logically if which of the following is assumed?' Which task is being requested?",
    choices: [
      "Find a necessary assumption.",
      "Find a sufficient assumption — a premise that makes the conclusion inescapable.",
      "Find a statement that slightly supports the argument.",
      "Find the argument's main conclusion.",
    ],
    correctIndex: 1,
    explanation:
      "'Follows logically' means the conclusion must become inescapable once the answer is added — that is the sufficient-assumption task. The first choice is the trap: a necessary assumption is something the argument needs, but needing is not proving, and a needed-but-gap-leaving statement would not make anything 'follow logically.' The third choice describes strengthening, a weaker standard, and the fourth is a different question type entirely.",
    contrastNote:
      "Guarantee language ('follows logically,' 'properly drawn,' 'justifies') signals a sufficient assumption. Need language ('requires,' 'depends on') signals a necessary assumption.",
    ...V1,
  },
  {
    id: "d-c015",
    kind: "contrast",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 2,
    prompt:
      "Argument: 'The new bakery will thrive because foot traffic on its street is very high.' Which choice STRENGTHENS the argument?",
    choices: [
      "Two similar bakeries on nearby streets with comparable foot traffic are thriving.",
      "The bakery's ovens are brand new.",
      "Foot traffic on the street drops sharply on weekends.",
      "The bakery will sell bread as its main product.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice supports the argument by analogy: where the same key condition (high foot traffic) held, bakeries like this one thrived — making the conclusion more likely without proving it. The second is about equipment, not the foot-traffic reasoning; the fourth merely restates what a bakery does; and the third weakens by qualifying the traffic claim. Notice that the right answer leaves open other ways the bakery could fail, such as high rent or competition — which is fine, because strengtheners need not eliminate all doubt.",
    contrastNote:
      "A strengthener supports the argument's specific reasoning — here, the link between foot traffic and thriving. Irrelevant truths and partial underminers fail because they do not touch that link.",
    ...V1,
  },
  {
    id: "d-c016",
    kind: "classify",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 2,
    prompt:
      "Argument: 'The library's extended hours will increase membership, because a poll shows nonmembers want evening access.' Consider the claim: 'The poll surveyed a representative sample of nonmembers.' Ann says it strengthens the argument. Beth says it guarantees the conclusion. Who is right?",
    choices: [
      "Ann — it makes the poll evidence more trustworthy but leaves other gaps open.",
      "Beth — it proves membership will increase.",
      "Neither — the claim is irrelevant.",
      "Both — strengthening and guaranteeing are the same thing.",
    ],
    correctIndex: 0,
    explanation:
      "A representative sample makes the poll a reliable guide to nonmember desires, which shores up the argument's evidence — genuine strengthening. But it does not guarantee the conclusion: wanting evening access is not the same as buying a membership, and costs, competition, or inconvenient hours could still block growth. Beth confuses 'better evidence' with 'proof.' The fourth choice names the exact confusion this drill targets: strengthening and guaranteeing are different standards.",
    contrastNote:
      "Better evidence strengthens; only a gap-closing premise guarantees. Representative sampling fixes the evidence quality but does not connect 'wanting access' to 'buying memberships.'",
    ...V1,
  },
  {
    id: "d-c017",
    kind: "contrast",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 2,
    prompt:
      "Argument: 'This bridge will be certified safe because it passed the state inspection.' Which choice, if true, GUARANTEES the conclusion?",
    choices: [
      "The inspection was extremely thorough.",
      "Any bridge that passes the state inspection is automatically certified safe.",
      "No bridge has ever collapsed after passing inspection.",
      "The bridge was recently repainted.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice is a rule that turns the premise into a proof: passed inspection → automatically certified, and this bridge passed, so certification follows by logic alone. The first and third choices strengthen — a thorough inspection and a clean track record make safety more plausible — but neither makes certification inescapable, since certification could still involve other steps. The fourth is cosmetic and irrelevant. When the stem demands a guarantee, accept nothing that leaves a gap.",
    contrastNote:
      "Look for the choice that converts the premise into a logical rule covering the conclusion. 'Thorough' and 'never collapsed' help; only 'automatically certified' proves.",
    ...V1,
  },
  {
    id: "d-c018",
    kind: "classify",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 3,
    prompt:
      "Argument: 'The café will stay open late because the owner wants more evening revenue.' Consider the claim: 'Staying open late is the only way to increase evening revenue, and the owner always does whatever increases revenue.' Ann says it strengthens; Beth says it guarantees the conclusion. Who is right?",
    choices: [
      "Ann — it supports the argument but proof is too much to claim.",
      "Neither — it weakens the argument.",
      "Beth — if true, the conclusion follows by logic.",
      "Neither — it is irrelevant to the argument.",
    ],
    correctIndex: 2,
    explanation:
      "Beth is right. If staying open late is the only path to evening revenue and the owner invariably pursues revenue, then the owner will stay open late — the conclusion is inescapable, not merely more likely. This is a sufficient assumption wearing ordinary clothes: it need not use fancy logic words to close the gap completely. Ann's mistake is treating every helpful statement as a mere strengthener; some statements prove.",
    contrastNote:
      "A statement that closes every gap guarantees — even without formal logic vocabulary. Test it: add the claim to the premises and ask whether the conclusion could still be false. If not, it is sufficient.",
    ...V1,
  },
  {
    id: "d-c019",
    kind: "contrast",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 3,
    prompt:
      "The mayor claims: 'Our new curfew reduced nighttime vandalism — vandalism fell 30% since the curfew began.' Which choice most STRENGTHENS the mayor's causal claim?",
    choices: [
      "The curfew is popular with parents.",
      "No other anti-vandalism measures were introduced during that period.",
      "Vandalism also fell in a neighboring city with no curfew.",
      "Vandalism is expensive for shop owners.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice rules out the leading alternative explanation — that something else caused the drop — which makes the curfew the more likely cause. That is exactly what causal strengthen answers do: eliminate rivals rather than prove. The third choice weakens by suggesting a broader trend, while the first and fourth are true-but-irrelevant sentiments about the curfew. Note that the right answer still does not prove the curfew worked, since a hidden factor could remain — which is precisely why it is a strengthener and not a sufficient assumption.",
    contrastNote:
      "Causal strengthening usually works by eliminating alternative causes. It raises the probability of the claimed cause without proving it — proof would require ruling out every possible alternative.",
    ...V1,
  },
  {
    id: "d-c020",
    kind: "contrast",
    skillIds: ["lr-strengthen", "lr-sufficient-assumption"],
    difficulty: 3,
    prompt:
      "Argument: 'The software update will fix the crashes, because the crashes are caused by a memory leak that the update patches.' Which choice, if true, makes the conclusion follow logically?",
    choices: [
      "The memory leak is the only cause of the crashes.",
      "The update was tested extensively before release.",
      "Users are eager for the crashes to be fixed.",
      "The update also makes the software run faster.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice seals the argument: if the leak is the sole cause and the update patches it, the crashes must stop — the conclusion is inescapable. The second and fourth choices strengthen at best (tested, faster), and the third is irrelevant desire. Contrast this with a strengthen question: there, excluding one rival cause is enough; here, the conclusion must follow logically, so every rival must be excluded — which only 'the only cause' accomplishes.",
    contrastNote:
      "Guarantee demands total gap closure: 'the only cause' leaves no alternative standing. Strengthen demands only a probability lift: excluding one rival is enough. Match your standard to the stem.",
    ...V1,
  },
  // ==================================================================
  // must-be-true-vs-most-strongly-supported — d-c021–030
  // ==================================================================
  {
    id: "d-c021",
    kind: "contrast",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported", "f-deduction"],
    difficulty: 1,
    prompt:
      "Facts: 'Every package shipped on Tuesday arrived by Friday. The Alvarez order shipped on Tuesday.' Which of the following MUST be true?",
    choices: [
      "The Alvarez order arrived by Friday.",
      "The Alvarez order arrived on Thursday.",
      "No package shipped on Wednesday arrived by Friday.",
      "The Alvarez order was sent by express courier.",
    ],
    correctIndex: 0,
    explanation:
      "The first fact is a universal rule — every Tuesday shipment arrived by Friday — and the second fact places the Alvarez order inside that rule, so its Friday arrival is inescapable. The second choice over-specifies the day, the third talks about Wednesday shipments the facts never mention, and the fourth invents a shipping method. 'Must be true' means provable from the facts alone: if a choice adds even one unproven detail, it is wrong.",
    contrastNote:
      "Must-be-true answers are proven by the facts alone — no added details, no hedging beyond what is shown. One extra word ('Thursday') sinks an otherwise close answer.",
    ...V1,
  },
  {
    id: "d-c022",
    kind: "contrast",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported", "f-deduction"],
    difficulty: 2,
    prompt:
      "Facts: 'Most students who attended review sessions passed the exam. Jamal attended every review session.' Which inference is licensed by a 'most strongly supported' question?",
    choices: [
      "Jamal passed the exam.",
      "Jamal likely passed the exam.",
      "Jamal earned the highest score in the class.",
      "Review sessions guarantee that attendees pass.",
    ],
    correctIndex: 1,
    explanation:
      "The first choice states as fact what the evidence only makes probable: 'most' leaves room for exceptions, and Jamal could be one. The second keeps the hedge ('likely'), matching exactly what the facts support — and that modest, well-calibrated inference is what 'most strongly supported' rewards. The third invents a rank and the fourth upgrades 'most' to a guarantee. The lesson: for this question type, the best answer often says less than you want it to.",
    contrastNote:
      "'Most strongly supported' licenses modest, hedged inferences that track the evidence; it punishes overclaiming. 'Jamal passed' goes one step past the facts; 'Jamal likely passed' stays on them.",
    ...V1,
  },
  {
    id: "d-c023",
    kind: "classify",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported"],
    difficulty: 2,
    prompt: "A stem reads: 'Which of the following must be true?' Which task is being requested?",
    choices: [
      "Find a conclusion fully proven by the stated facts.",
      "Find the best-supported guess, even if it goes a bit beyond the facts.",
      "Find the flaw in the reasoning.",
      "Find a statement that strengthens the facts.",
    ],
    correctIndex: 0,
    explanation:
      "'Must be true' demands airtight proof: the correct answer follows from the facts with no leaps, no probabilities, no 'likely.' The second choice describes the 'most strongly supported' task — a real question type with a looser standard — and confusing the two is one of the costliest errors in the section. The third and fourth belong to other question types. When you see 'must,' 'cannot be false,' or 'follows logically,' hold every choice to the proof standard.",
    contrastNote:
      "Must-be-true = proven, no leaps. Most-strongly-supported = best inference, small hedged steps allowed. The stem's verb tells you which standard applies.",
    ...V1,
  },
  {
    id: "d-c024",
    kind: "classify",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported"],
    difficulty: 2,
    prompt:
      "A stem reads: 'Which of the following is most strongly supported by the information above?' Which task is being requested?",
    choices: [
      "Find a conclusion proven with absolute certainty.",
      "Find the inference the facts best support — a small, reasonable step is allowed.",
      "Find an assumption the argument requires.",
      "Find the argument's main conclusion.",
    ],
    correctIndex: 1,
    explanation:
      "'Most strongly supported' asks for the best inference, not a proof: the winner is the choice the facts point to most clearly, and it may take one small, sensible step beyond them — usually with hedging like 'likely' or 'tends to.' The first choice imposes the must-be-true standard and would wrongly eliminate the intended answer. The third and fourth are different tasks. Think of it as 'which answer is best earned by the facts' rather than 'which is proven.'",
    contrastNote:
      "Most-strongly-supported rewards the best-earned inference, hedging included. Must-be-true rewards only proof. Mixing up the standards makes you reject right answers or accept overclaims.",
    ...V1,
  },
  {
    id: "d-c025",
    kind: "contrast",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported", "f-deduction"],
    difficulty: 2,
    prompt:
      "Facts: 'The city's two largest employers both announced hiring freezes. Several small firms reported layoffs.' Which choice claims MORE than the facts allow — too strong to be a valid inference?",
    choices: [
      "The city's unemployment rate will certainly rise.",
      "Some city employers are cutting back on hiring.",
      "The hiring freezes were caused by the national economy.",
      "Small firms are laying off workers.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice leaps from 'some employers are pulling back' to a certain citywide outcome — 'will certainly rise' claims knowledge of the whole labor market, including employers never mentioned. That overclaim disqualifies it for any inference question. The second stays safely inside the facts, the fourth restates one, and the third is wrong for a different reason (it invents an unsupported cause). 'Too strong' is the most common wrong-answer flavor on inference questions: watch for certainly, always, never, and will.",
    contrastNote:
      "Inference answers must not outrun the facts. Absolutes like 'certainly' and 'will' signal overclaiming — the signature wrong answer on both must-be-true and most-strongly-supported questions.",
    ...V1,
  },
  {
    id: "d-c026",
    kind: "contrast",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported", "f-deduction"],
    difficulty: 3,
    prompt:
      "Facts: 'All of the museum's paintings are insured. Some of the insured items are on loan.' Which of the following MUST be true?",
    choices: [
      "Some of the museum's paintings are on loan.",
      "Some insured items are paintings.",
      "All loaned items are paintings.",
      "Most of the paintings are on loan.",
    ],
    correctIndex: 1,
    explanation:
      "From 'all paintings are insured' we know some insured things are paintings — the paintings themselves — so the second choice is a direct, inescapable unpacking of the universal claim. The first is the trap: the insured items on loan could be sculptures or furniture, so nothing proves any painting is on loan. The third reverses the facts and the fourth upgrades 'some' to 'most.' Quantifier discipline — tracking exactly which group each statement is about — is what separates the provable from the tempting.",
    contrastNote:
      "'All A are B' proves 'some B are A,' but it proves nothing about which B's have some further property. The trap smuggles the loaned items into the painting group without a ticket.",
    ...V1,
  },
  {
    id: "d-c027",
    kind: "contrast",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported", "f-deduction"],
    difficulty: 2,
    prompt:
      "A study found that people who keep a daily journal report lower stress than those who do not; the researchers controlled for income and age. Which is MOST strongly supported?",
    choices: [
      "Journaling reduces stress.",
      "People who journal tend to report less stress than people who do not.",
      "Everyone should keep a daily journal.",
      "Income has no effect on stress levels.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice is the modest, hedged restatement the data actually earn: journalers in the study reported less stress, so 'tend to report less' tracks the evidence without leaping. The first converts a correlation into a causal claim — 'reduces' asserts a mechanism the study never tested. The third prescribes behavior the data cannot justify, and the fourth misreads 'controlled for' as 'proven irrelevant.' Most-strongly-supported answers describe what was found; they do not upgrade it into causes or advice.",
    contrastNote:
      "The best-supported inference usually just describes the finding with careful hedging. Causal verbs ('reduces,' 'causes') and prescriptions ('should') are overclaims — even when the underlying correlation is real.",
    ...V1,
  },
  {
    id: "d-c028",
    kind: "classify",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported"],
    difficulty: 3,
    prompt:
      "A student picks an answer that adds one small, reasonable, hedged step beyond the stated facts. For which question type could that answer be correct?",
    choices: [
      "Must be true.",
      "Neither — any step beyond the facts is always wrong.",
      "Most strongly supported.",
      "Both types equally.",
    ],
    correctIndex: 2,
    explanation:
      "'Most strongly supported' is precisely the question type that tolerates one small, sensible step past the facts — 'likely,' 'tends to,' 'suggests' — because it asks for the best inference, not a proof. 'Must be true' would reject that same answer for going beyond what is proven. The 'neither' option is too strict (it would make most-strongly-supported questions unanswerable), and 'both equally' ignores the real difference in standards. Knowing which liberties each stem allows is the whole game on inference questions.",
    contrastNote:
      "Hedged steps beyond the facts: allowed for most-strongly-supported, fatal for must-be-true. The question type sets the license; the answer must stay inside it.",
    ...V1,
  },
  {
    id: "d-c029",
    kind: "contrast",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported", "f-deduction"],
    difficulty: 3,
    prompt:
      "Facts: 'If the alarm sounds, the doors lock automatically. The doors did not lock.' Which of the following MUST be true?",
    choices: [
      "The alarm sounded but the mechanism failed.",
      "Someone locked the doors manually.",
      "The alarm usually sounds at noon.",
      "The alarm did not sound.",
    ],
    correctIndex: 3,
    explanation:
      "This is the contrapositive: if alarm → locked doors, then doors-not-locked → alarm-did-not-sound. The rule guarantees that sounding the alarm locks the doors, so unlocked doors prove the alarm never sounded — the fourth choice. The first contradicts the rule's guarantee, the second invents manual locking the facts never mention, and the third adds an irrelevant habit. Contrapositive deductions are the most-tested must-be-true pattern: deny the necessary outcome, and the sufficient trigger falls with it.",
    contrastNote:
      "Must-be-true loves the contrapositive: 'If P then Q; not Q; therefore not P.' Choices that contradict the rule or invent new facts fail the proof standard.",
    ...V1,
  },
  {
    id: "d-c030",
    kind: "contrast",
    skillIds: ["lr-must-be-true", "lr-most-strongly-supported", "f-deduction"],
    difficulty: 3,
    prompt:
      "Data show urban tree cover expanded over the last decade while average summer temperatures in those neighborhoods fell slightly. Which choice asserts causation the data do NOT establish?",
    choices: [
      "Tree cover and summer temperatures moved in opposite directions in these neighborhoods.",
      "Expanding tree cover caused the temperature drop.",
      "Trees are the best way to cool any city.",
      "Temperatures fell in every single neighborhood.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice upgrades a correlation into a causal claim — 'caused' — which the data cannot establish, since a third factor (new building codes, weather patterns) could explain both trends. The first choice merely describes the observed pattern and stays licensed. The third and fourth overclaim in other ways (superlatives, universals), but the question targets the causal leap specifically. On inference questions, causal verbs are guilty until proven innocent: only experimental or gap-closing evidence earns them.",
    contrastNote:
      "Correlation licenses description ('moved in opposite directions'), not causation ('caused'). The causal verb is the overclaim — the same confusion that powers the correlation-vs-causation flaw family.",
    ...V1,
  },
  // ==================================================================
  // conclusion-vs-premise — d-c031–040
  // ==================================================================
  {
    id: "d-c031",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-structure", "f-indicators"],
    difficulty: 1,
    prompt:
      "Read the argument: 'The new highway will ease congestion. After all, every similar highway project in the region has reduced commute times. Moreover, traffic engineers endorse the plan.' Which sentence is the CONCLUSION?",
    choices: [
      "The new highway will ease congestion.",
      "Every similar highway project in the region has reduced commute times.",
      "Traffic engineers endorse the plan.",
      "Congestion is the region's biggest problem.",
    ],
    correctIndex: 0,
    explanation:
      "The first sentence is the claim everything else is trying to establish: the track record of similar projects and the engineers' endorsement are both offered as reasons to believe congestion will ease. 'After all' and 'moreover' are premise indicators — they flag support, not the main point. The fourth choice is never stated at all. Ask of each sentence: is it being used to support something else (premise), or is it the thing being supported (conclusion)?",
    contrastNote:
      "The conclusion is the claim being supported; premises are the reasons doing the supporting. Indicator words like 'after all' and 'moreover' mark premises — they point toward the conclusion, not away from it.",
    ...V1,
  },
  {
    id: "d-c032",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-structure"],
    difficulty: 1,
    prompt:
      "Read the argument: 'Libraries should extend weekend hours. Many patrons work on weekdays and can only visit on weekends. Extended hours would also boost attendance at library programs.' Which sentence is offered as a PREMISE?",
    choices: [
      "Libraries should extend weekend hours.",
      "Weekend hours are more popular than weekday hours.",
      "Many patrons work on weekdays and can only visit on weekends.",
      "Libraries are essential to every community.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice restates the argument's second sentence — a reason offered to support the recommendation — so it is a premise: it explains why extended hours are needed. The first choice is the conclusion (the 'should' recommendation being argued for). The second and fourth choices are never stated; they may sound agreeable, but a premise must actually appear in the argument. Do not confuse 'sounds supportive' with 'was offered as support.'",
    contrastNote:
      "A premise must actually be stated in the argument as a reason. The conclusion ('should extend hours') is the recommendation; everything cited to back it is a premise.",
    ...V1,
  },
  {
    id: "d-c033",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-structure"],
    difficulty: 2,
    prompt:
      "Read the argument: 'Public transit should be free. Free transit would increase ridership, since cost is the main barrier for many commuters. Higher ridership, in turn, would cut traffic and pollution. Thus, making transit free would benefit the whole city.' Which is the MAIN conclusion?",
    choices: [
      "Free transit would increase ridership.",
      "Higher ridership would cut traffic and pollution.",
      "Making transit free would benefit the whole city.",
      "Public transit should be free.",
    ],
    correctIndex: 3,
    explanation:
      "The final choice — the opening recommendation — is the main conclusion: every other sentence works to justify making transit free. The first two choices are premises (reasons to adopt the policy), and the third choice, though it looks conclusive, is itself a reason supporting the recommendation: the city benefits, so it should do it. 'Thus' can introduce an intermediate conclusion, not only the main one. Always ask: what is the author's ultimate point — what is everything else serving?",
    contrastNote:
      "The main conclusion is the ultimate point everything else serves — often a recommendation ('should'). A 'thus' sentence can be an intermediate step that itself supports the main recommendation.",
    ...V1,
  },
  {
    id: "d-c034",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-indicators"],
    difficulty: 1,
    prompt:
      "Read the argument: 'The reservoir is low, rainfall has been scarce, and demand keeps rising. Consequently, water restrictions are unavoidable.' Which word signals that the conclusion is coming?",
    choices: ["Consequently", "and", "keeps", "scarce"],
    correctIndex: 0,
    explanation:
      "'Consequently' is a conclusion indicator: it announces that what follows is being inferred from what came before. The low reservoir, scarce rainfall, and rising demand are the evidence; the unavoidable restrictions are the point drawn from them. Words like 'and' merely join items, while 'keeps' and 'scarce' are content words inside premises. Learning a short list of conclusion indicators (therefore, thus, consequently, so, hence) makes conclusions jump out on sight.",
    contrastNote:
      "Conclusion indicators ('consequently,' 'therefore,' 'thus,' 'so') flag the sentence being inferred. Premise indicators ('because,' 'since,' 'after all') flag the evidence. The indicator tells you the sentence's job.",
    ...V1,
  },
  {
    id: "d-c035",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-structure"],
    difficulty: 2,
    prompt:
      "Read the argument: 'Critics say the festival is too loud. But the festival brings the town significant revenue, and surveys show most residents enjoy it. So the festival should continue.' Which choice RESTATES A PREMISE rather than the conclusion?",
    choices: [
      "The festival should continue in some form.",
      "Most residents enjoy the festival.",
      "The festival is too loud.",
      "Loud events are always unpopular.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice restates a premise — the survey finding offered as a reason to keep the festival. The first choice restates the conclusion ('should continue'), which is the trap: it repeats the main point in new words, but repeating the conclusion does not make it a premise. The third choice is the critics' objection, which the author mentions only to set aside, and the fourth is never stated. A restated premise still does premise work: it supports rather than concludes.",
    contrastNote:
      "Restating does not change a sentence's job. A reworded conclusion is still the conclusion; a reworded premise is still a premise. Judge by role — supporting or supported — not by wording.",
    ...V1,
  },
  {
    id: "d-c036",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-structure"],
    difficulty: 2,
    prompt:
      "Read the argument: 'Sharks are often feared, but most species are harmless to humans. In fact, you are more likely to be struck by lightning than attacked by a shark. People should not fear sharks.' Which sentence is the CONCLUSION?",
    choices: [
      "Most species are harmless to humans.",
      "You are more likely to be struck by lightning than attacked by a shark.",
      "People should not fear sharks.",
      "Sharks are often feared.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice — the final recommendation — is the conclusion: the harmlessness of most species and the lightning comparison are evidence marshaled to change how people feel about sharks. The fourth choice is scene-setting background — it reports a fact (people fear sharks) without using it as a reason. Background differs from premises: premises actively support the conclusion, while background merely sets the stage. Here, everything after 'but' works toward the closing 'should.'",
    contrastNote:
      "Background facts set the scene; premises give reasons; the conclusion is the point. The opening 'sharks are feared' is background — the argument's work starts with 'but.'",
    ...V1,
  },
  {
    id: "d-c037",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-structure"],
    difficulty: 3,
    prompt:
      "Read the argument: 'The merger will fail. The two companies have incompatible cultures, which means integration will stall. Stalled integrations drain morale. Hence the merger cannot succeed.' Which is the MAIN conclusion?",
    choices: [
      "Integration will stall.",
      "The merger will fail.",
      "Stalled integrations drain morale.",
      "The two companies have incompatible cultures.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice — the opening prediction — is the main conclusion; everything else is scaffolding beneath it. The first choice is an intermediate conclusion — inferred from the culture clash and then used to support the final prediction ('hence the merger cannot succeed' merely rephrases the opening). The third and fourth choices are premises feeding the chain. Map the support: cultures → stall → morale drain → failure. The main conclusion is the claim at the top of the chain that nothing else supports.",
    contrastNote:
      "Arguments can stack conclusions: an intermediate conclusion is supported by premises and in turn supports the main conclusion. The main conclusion is the one nothing else in the argument supports — here, the merger's failure.",
    ...V1,
  },
  {
    id: "d-c038",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-structure"],
    difficulty: 3,
    prompt:
      "Read the argument: 'Honeybees can recognize human faces. Researchers trained bees to distinguish photographs, and the bees succeeded. This ability probably evolved for recognizing flowers, not people.' Which sentence is a PREMISE supporting the first claim?",
    choices: [
      "Honeybees can recognize human faces.",
      "This ability probably evolved for recognizing flowers, not people.",
      "Bees are important pollinators.",
      "Researchers trained bees to distinguish photographs, and the bees succeeded.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice — the researchers' experiment — is the evidence offered for the face-recognition claim, making it a premise. The first choice is the conclusion it supports. The second is an additional speculation about evolution — interesting, but it does not support the recognition claim; it explains it. The third is never stated. Watch for this pattern: an argument often adds an extra claim after its conclusion that neither supports it nor follows from it — extra content is not automatically a premise.",
    contrastNote:
      "Not every sentence after the conclusion is a premise. A premise must actually support the conclusion. Explanatory asides ('it probably evolved for…') add color without doing support work.",
    ...V1,
  },
  {
    id: "d-c039",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-indicators"],
    difficulty: 2,
    prompt:
      "Read the argument: 'We should plant native grasses in the park. After all, they need far less water than turf, and they support local pollinators.' Which sentence is the CONCLUSION?",
    choices: [
      "They need far less water than turf.",
      "We should plant native grasses in the park.",
      "They support local pollinators.",
      "Turf is expensive to maintain.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice — the 'should' recommendation — is the conclusion; the first and third are the reasons, flagged by the premise indicator 'after all.' The fourth choice is never stated — it may be true, but unstated claims cannot be premises. The skill mirrors finding premises in reverse: locate the claim everything else is trying to get you to accept, and the rest fall into place as support.",
    contrastNote:
      "'Should' recommendations are almost always conclusions — they are the advice the evidence is meant to justify. 'After all' marks the evidence that follows.",
    ...V1,
  },
  {
    id: "d-c040",
    kind: "identify",
    skillIds: ["f-premise-conclusion", "f-structure"],
    difficulty: 3,
    prompt:
      "Read the argument: 'Some argue that electric scooters reduce car use. However, studies show most scooter trips replace walking, not driving. So scooters do little to cut emissions.' Which is the AUTHOR's conclusion?",
    choices: [
      "Electric scooters reduce car use.",
      "Most scooter trips replace walking, not driving.",
      "Scooters do little to cut emissions.",
      "Studies of scooter use are unreliable.",
    ],
    correctIndex: 2,
    explanation:
      "The author's conclusion is the final emissions claim, signaled by 'so' and by the 'however' pivot that rejects the opening view. The first choice is someone else's position — the author quotes it only to rebut it, a classic trap. The second choice is the premise (the study finding) doing the rebutting work, and the fourth is never stated. When an argument opens with an opposing view, the conclusion is usually the author's response to it, not the view itself.",
    contrastNote:
      "An argument may open with a view the author rejects. The author's conclusion is the response ('so scooters do little…'), not the quoted opposition. Track who believes what.",
    ...V1,
  },
  // ==================================================================
  // fact-vs-inference — d-c041–050
  // ==================================================================
  {
    id: "d-c041",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 1,
    prompt:
      "Stimulus: 'The Harbor Bridge opened in 1987. It was the first cable-stayed bridge in the state. Tolls were removed in 2005.' Which of the following is STATED as a fact?",
    choices: [
      "The Harbor Bridge opened in 1987.",
      "The bridge is the oldest in the state.",
      "Tolls were unpopular with drivers.",
      "The bridge needs major repairs.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice repeats the stimulus word for word — it is stated, not inferred. The second goes beyond the facts (first cable-stayed is not first bridge), the third guesses at public opinion the stimulus never mentions, and the fourth invents a condition. 'Stated' means present in the text; anything requiring even a tiny leap — however plausible — is an inference, not a fact.",
    contrastNote:
      "A stated fact appears in the text; an inference requires a leap, however small. 'First cable-stayed' does not state 'oldest,' and silence about repairs states nothing about repairs.",
    ...V1,
  },
  {
    id: "d-c042",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 1,
    prompt:
      "Stimulus: 'The town library holds 40,000 books. It added 2,000 books last year. The children's section was renovated in 2020.' Which of the following is an INFERENCE rather than a stated fact?",
    choices: [
      "The library holds 40,000 books.",
      "The collection grew last year.",
      "The children's section was renovated in 2020.",
      "The library added 2,000 books last year.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice infers growth from the 2,000 additions — a reasonable step, but a step: books could also have been discarded, so growth is concluded, not stated. The other three choices each repeat the stimulus nearly verbatim. This is the core skill: stated claims are found in the text, while inferences are built from it. On inference questions, only the built claims are answerable — but you must build them carefully.",
    contrastNote:
      "Inferences are built from stated facts via a reasoning step ('added books' → 'grew'). Stated facts are simply found. The step may be small, but it is still a step.",
    ...V1,
  },
  {
    id: "d-c043",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 2,
    prompt:
      "Stimulus: 'Dr. Alvarez's study followed 500 patients for ten years. Patients who exercised regularly had fewer heart problems. The study controlled for diet and smoking.' Which of the following is a FACT reported by the study?",
    choices: [
      "Exercise prevents heart problems.",
      "The study followed 500 patients for ten years.",
      "Everyone should exercise regularly.",
      "Diet does not affect heart health.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice is a fact straight from the stimulus — sample size and duration as reported. The first upgrades an observed association into a causal claim ('prevents'), which the study never states. The third is a prescription nobody uttered, and the fourth misreads 'controlled for diet' as 'diet is irrelevant' — controlling for a variable acknowledges it matters. Facts are what the text says happened; causes, advice, and dismissals are inferences or inventions.",
    contrastNote:
      "Studies report findings ('had fewer heart problems'); they do not state causal certainties ('prevents') or prescriptions ('should'). Upgrading a finding into a cause or a command crosses from fact to inference.",
    ...V1,
  },
  {
    id: "d-c044",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 2,
    prompt:
      "Stimulus: 'The bakery on Main Street closed last month after twenty years. A coffee shop will open in the same space next spring.' Which of the following is an INFERENCE?",
    choices: [
      "The bakery operated for twenty years.",
      "A coffee shop will open in the same space next spring.",
      "The storefront will sit empty for several months.",
      "The bakery closed last month.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice connects the two stated facts across time: closed last month, reopening next spring, so the space sits empty through the intervening months — including winter. That is a genuine inference: nothing in the stimulus says 'empty for months' outright. The other choices each restate one sentence of the stimulus. Temporal inferences like this are common: combine dated facts and read what falls between them.",
    contrastNote:
      "Combining two stated facts can yield an inference neither states alone ('closed last month' + 'opens next spring' → 'empty for months'). Restating one fact is not inferring.",
    ...V1,
  },
  {
    id: "d-c045",
    kind: "identify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 2,
    prompt:
      "Passage: 'Coral reefs support a quarter of marine species. Reef coverage has declined 50% since 1950.' A student claims the passage states that half of all marine species are threatened. Is the student correct?",
    choices: [
      "Yes — the passage says exactly that.",
      "No — that is an inference built from the facts, not a stated fact.",
      "Yes — it is a direct quotation.",
      "No — the passage states the opposite.",
    ],
    correctIndex: 1,
    explanation:
      "The passage states two facts — reefs support a quarter of species, coverage halved — and the student combined them into 'half of all marine species are threatened.' That combination is an inference: it assumes threatened reefs mean threatened species in a fixed proportion, which the passage never says. It may be a reasonable inference, but 'stated' is a stricter claim. Detail questions test exactly this: can you tell what the text said from what you concluded from it?",
    contrastNote:
      "Combining facts produces an inference, even a sensible one. 'Stated' means the words (or their direct paraphrase) are in the text. Keep your conclusions labeled as conclusions.",
    ...V1,
  },
  {
    id: "d-c046",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 2,
    prompt:
      "Stimulus: 'The new policy requires helmets for all riders under 16. It takes effect June 1. Violations carry a $25 fine.' Which of the following is an INFERENCE?",
    choices: [
      "Riders under 16 must wear helmets.",
      "The fine for violations is $25.",
      "The policy takes effect June 1.",
      "A 15-year-old riding without a helmet on June 2 could be fined.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice applies the stated rule to a specific case — a 15-year-old, helmetless, on June 2 — which requires combining all three facts: the age rule, the effective date, and the penalty. That application step makes it an inference. The first three choices each paraphrase a single stated sentence with no combination and no new case. Applying a general rule to a new particular is inference, even when the application is straightforward.",
    contrastNote:
      "Applying a stated rule to a new case is inference ('a 15-year-old on June 2 could be fined'). Repeating the rule itself is stating a fact. The new particular is what makes it a step.",
    ...V1,
  },
  {
    id: "d-c047",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 3,
    prompt:
      "Stimulus: 'Every respondent who reported sleeping eight hours also reported high energy. No respondent who reported low energy slept eight hours.' Which of the following is STATED?",
    choices: [
      "Sleeping eight hours causes high energy.",
      "All high-energy respondents slept eight hours.",
      "Every respondent who slept eight hours reported high energy.",
      "Low energy is caused by poor sleep.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice is a direct restatement of the first sentence — rewording is still stating. The first and fourth choices smuggle in causation ('causes') the stimulus never asserts; correlation in a survey is not a stated cause. The second choice reverses the conditional: the stimulus says eight-hour sleepers had high energy, not that all high-energy people slept eight hours. Reversal turns a stated fact into an invalid inference — one of the test's favorite traps.",
    contrastNote:
      "Restating a fact keeps it a fact; reversing it creates an (invalid) inference. 'All A are B' states nothing about whether all B are A — the converse is a leap, not a quote.",
    ...V1,
  },
  {
    id: "d-c048",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 2,
    prompt:
      "Stimulus: 'The city's population grew 8% last decade, while housing units grew only 3%.' Which of the following is an INFERENCE?",
    choices: [
      "The population grew 8% last decade.",
      "Housing units grew 3% last decade.",
      "The figures cover the last decade.",
      "Housing construction lagged behind population growth.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice interprets the two growth rates comparatively — 'lagged behind' is a judgment built from the numbers, not one of the numbers themselves. The first three choices each repeat a stated figure or timeframe. Comparison words ('lagged,' 'outpaced,' 'faster than') almost always signal inference: the stimulus gives the raw numbers, and the reader supplies the verdict. Verdicts about numbers are never 'stated.'",
    contrastNote:
      "Raw numbers are facts; verdicts about numbers ('lagged,' 'outpaced') are inferences. Comparison language marks the step from data to judgment.",
    ...V1,
  },
  {
    id: "d-c049",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 3,
    prompt:
      "Stimulus: 'The jury deliberated for six hours before reaching a verdict. The trial lasted three weeks.' Which of the following is an INFERENCE rather than a stated fact?",
    choices: [
      "The deliberation was relatively brief.",
      "The trial lasted three weeks.",
      "The jury deliberated for six hours.",
      "The verdict was unanimous.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice evaluates six hours against a three-week trial and judges it 'relatively brief' — an evaluative step beyond the facts, making it an inference. The second and third choices restate the stimulus. The fourth is neither stated nor inferable; it is pure invention, which is worse than an inference — an inference at least follows from the facts. Distinguish three tiers: stated (in the text), inferred (built from the text), and invented (from nowhere).",
    contrastNote:
      "Three tiers: stated (in the text), inferred (built from it, like 'relatively brief'), invented (from nowhere, like 'unanimous'). Inferences must be built from the facts; inventions are never correct.",
    ...V1,
  },
  {
    id: "d-c050",
    kind: "classify",
    skillIds: ["f-deduction", "lr-must-be-true"],
    difficulty: 2,
    prompt:
      "A test-taker reads 'the data suggest the policy worked' as 'the study proved the policy worked.' What error has the test-taker made?",
    choices: [
      "Confusing a premise with a conclusion.",
      "Confusing an inference with a stated fact.",
      "Reversing a conditional statement.",
      "Attacking the study's source instead of its reasoning.",
    ],
    correctIndex: 1,
    explanation:
      "'Suggest' marks a tentative inference; 'proved' claims a settled fact. The test-taker upgraded hedged language into certainty — treating an inference as if it were stated. This single habit drives countless wrong answers: once you believe the study 'proved' something, you will accept overstrong choices and reject properly hedged ones. Train yourself to preserve the author's exact strength: suggest stays suggest, prove stays prove.",
    contrastNote:
      "Preserve the author's strength level. 'Suggest' (inference) is not 'proved' (fact). Upgrading hedges into certainties is the fact/inference confusion in its most expensive form.",
    ...V1,
  },
  // ==================================================================
  // author-view-vs-other-view — d-c051–060
  // ==================================================================
  {
    id: "d-c051",
    kind: "identify",
    skillIds: ["rc-author-viewpoint", "rc-other-viewpoints"],
    difficulty: 1,
    prompt:
      "Excerpt: 'Many historians credit the railroad with settling the West. But this overlooks the role of mining booms, which drew far more migrants in the 1860s. The railroad followed settlement more than it caused it.' Whose view is 'the railroad caused western settlement'?",
    choices: [
      "Historians whose view the author describes and rejects.",
      "The author's own view.",
      "A view both the author and the historians share.",
      "No one mentioned in the excerpt.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice is correct: the railroad-as-cause view belongs to 'many historians' — the author introduces it only to knock it down with 'but this overlooks…' and the closing reversal. The second choice, the author's own view, is the opposite: settlement largely preceded the railroad. The pivot words ('but,' 'overlooks') are the tell: everything before them is someone else's position being set up, everything after is the author's correction. Never attribute the setup to the author.",
    contrastNote:
      "Authors often open with a view they will reject. Pivot words ('but,' 'however,' 'overlooks') mark the handoff from someone else's view to the author's. Attribute each claim to its actual holder.",
    ...V1,
  },
  {
    id: "d-c052",
    kind: "identify",
    skillIds: ["rc-author-viewpoint", "rc-other-viewpoints"],
    difficulty: 1,
    prompt:
      "Excerpt: 'Nutritionists have long warned that dietary fat causes heart disease. Recent studies, however, find no clear link, suggesting sugar plays the larger role. The old warning, it seems, was misplaced.' Which view does the AUTHOR hold?",
    choices: [
      "Dietary fat is the main cause of heart disease.",
      "The old warning about fat was misplaced.",
      "Sugar is harmless.",
      "Nutritionists are always wrong about everything.",
    ],
    correctIndex: 1,
    explanation:
      "The author's view is the closing judgment: the old warning was misplaced. The first choice is the nutritionists' original position, which the 'however' pivot overturns. The third overreads 'sugar plays the larger role' into 'sugar is harmless' — the author never clears sugar. The fourth universalizes a single disagreement into 'always wrong about everything,' a classic too-strong distortion. The author's view is the post-pivot position, stated at its own strength.",
    contrastNote:
      "The author's view is what survives the pivot — here, that the fat warning was misplaced. Do not confuse it with the rejected view (fat causes disease) or inflate it into absolutes the author never stated.",
    ...V1,
  },
  {
    id: "d-c053",
    kind: "identify",
    skillIds: ["rc-author-viewpoint", "rc-attitude"],
    difficulty: 2,
    prompt:
      "Excerpt: 'Economists praise the new trade deal, calling it 'a triumph.' I find this celebration premature: the deal's labor provisions are unenforceable.' What is the author's attitude toward the economists' view?",
    choices: [
      "Full agreement.",
      "Neutral reporting.",
      "Skeptical disagreement.",
      "The author's attitude is unstated.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice is correct: the author explicitly pushes back — 'I find this celebration premature' — followed by a substantive objection about unenforceable labor provisions. That is disagreement, and the measured tone ('premature' rather than 'absurd') makes it skeptical rather than hostile. It is not neutral reporting, since the author takes a side, and the attitude is plainly stated, not hidden. Attitude questions ask how the author feels about a view; here the feeling is doubt, expressed through direct evaluative language.",
    contrastNote:
      "Attitude = the author's stance toward a view, read from evaluative language ('premature,' 'a triumph'). Disagreement can be measured ('skeptical') rather than hostile — match the tone, don't inflate it.",
    ...V1,
  },
  {
    id: "d-c054",
    kind: "classify",
    skillIds: ["rc-author-viewpoint", "rc-other-viewpoints"],
    difficulty: 2,
    prompt:
      "Excerpt: 'Supporters of the dam point to cheap electricity. Opponents warn of ecological harm. Both sides, however, ignore the real question: whether the river's flow can sustain any dam at all.' Which statement reflects the AUTHOR's own position?",
    choices: [
      "The dam will provide cheap electricity.",
      "The dam will cause ecological harm.",
      "Dams are never worthwhile under any circumstances.",
      "The debate overlooks whether the river can sustain a dam.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice reflects the author's position, arriving after 'however': both camps miss the real question of the river's capacity. The first two choices belong to the supporters and opponents respectively — the author cites them without endorsing either. The third inflates the author's narrow point into a universal anti-dam stance the excerpt never takes. When an author surveys two sides and then pivots, the author's view is the pivot, not either surveyed side.",
    contrastNote:
      "Surveying two sides is not endorsing either. The author's view is the post-pivot claim — here, that both sides miss the real question. Attribute quoted positions to their speakers, not the author.",
    ...V1,
  },
  {
    id: "d-c055",
    kind: "identify",
    skillIds: ["rc-author-viewpoint", "rc-other-viewpoints"],
    difficulty: 2,
    prompt:
      "Excerpt: 'While critics are right that the policy is expensive, its benefits outweigh the costs.' What does the AUTHOR believe?",
    choices: [
      "The policy is flawless.",
      "The policy's benefits outweigh its costs.",
      "The critics are entirely wrong.",
      "The policy should be repealed.",
    ],
    correctIndex: 1,
    explanation:
      "The author concedes the cost point ('critics are right that…') but maintains the overall verdict: benefits outweigh costs. A concession is a tactical agreement on one point, not surrender — the author's bottom line is unchanged. The first choice ignores the conceded flaw, the third ignores the concession's limits (critics are right about the expense), and the fourth reverses the verdict. Read concessions carefully: note exactly what is granted and what is still claimed.",
    contrastNote:
      "A concession ('while critics are right that…') grants one point without abandoning the author's verdict. Do not mistake a partial agreement for full agreement — or for disagreement.",
    ...V1,
  },
  {
    id: "d-c056",
    kind: "identify",
    skillIds: ["rc-author-viewpoint", "rc-attitude"],
    difficulty: 2,
    prompt:
      "Excerpt: 'The committee approved the plan unanimously, or so the chair claims. The minutes, however, record two abstentions.' What is the author's view of the chair's claim?",
    choices: [
      "The author doubts the chair's claim.",
      "The author endorses the chair's claim.",
      "The author ignores the chair's claim.",
      "The author finds the claim irrelevant.",
    ],
    correctIndex: 0,
    explanation:
      "The author undercuts the claim twice: 'or so the chair claims' distances the author from it, and the minutes' two abstentions contradict 'unanimously.' That is doubt, expressed through attribution language and counterevidence rather than direct denial. The author neither endorses nor ignores the claim — it is engaged and undermined. Phrases like 'so X claims,' 'allegedly,' and scare quotes are standard signals that the author is not on board.",
    contrastNote:
      "Doubt is often signaled indirectly: distancing attribution ('or so the chair claims') plus contradicting evidence. The author need not say 'I disagree' — the framing does the disagreeing.",
    ...V1,
  },
  {
    id: "d-c057",
    kind: "identify",
    skillIds: ["rc-author-viewpoint", "rc-other-viewpoints", "rc-attitude"],
    difficulty: 3,
    prompt:
      "Excerpt: 'Defenders of the new curriculum say it boosts creativity. Test scores, though, have slipped each year since its adoption. Perhaps creativity is rising, but the evidence offered for it is thin.' What is the AUTHOR's view?",
    choices: [
      "The curriculum boosts creativity.",
      "The claimed creativity gains lack solid evidence.",
      "The curriculum has failed entirely.",
      "Test scores are the only valid measure of learning.",
    ],
    correctIndex: 1,
    explanation:
      "The author's view is the measured closing assessment: the creativity gains may exist ('perhaps'), but the evidence for them is thin, and test scores have slipped. The first choice is the defenders' claim, which the author pointedly fails to endorse. The third overstates — the author allows that creativity might be rising, so 'failed entirely' goes too far. The fourth invents an exclusivity about test scores the author never asserts. The author's view is skeptical but bounded: doubt the evidence, not everything.",
    contrastNote:
      "Skepticism has a strength level. The author doubts the evidence for creativity gains without declaring total failure or crowning test scores. Match the author's exact degree of doubt — no more, no less.",
    ...V1,
  },
  {
    id: "d-c058",
    kind: "classify",
    skillIds: ["rc-author-viewpoint", "rc-other-viewpoints"],
    difficulty: 2,
    prompt: "Which of the following question stems asks for the AUTHOR's viewpoint?",
    choices: [
      "According to the passage, critics argue that…",
      "The passage states that…",
      "Which best describes the organization of the passage?",
      "With which of the following would the author most likely agree?",
    ],
    correctIndex: 3,
    explanation:
      "The fourth stem asks what the author would endorse — the author's viewpoint, possibly extended one careful step. The first stem asks for someone else's view (the critics'), a classic confusion: students answer with the author's opinion instead. The second asks for a stated detail regardless of whose view it is, and the third asks about structure. On viewpoint questions, first identify whose view is wanted, then answer only for that person.",
    contrastNote:
      "'Would the author agree' = author's viewpoint. 'Critics argue' = someone else's viewpoint. 'The passage states' = detail. The stem names the person — answer for that person only.",
    ...V1,
  },
  {
    id: "d-c059",
    kind: "identify",
    skillIds: ["rc-author-viewpoint", "rc-other-viewpoints"],
    difficulty: 3,
    prompt:
      "Excerpt: 'Linguists once held that children learn language purely by imitation. But children produce sentences they have never heard, which imitation cannot explain. Some innate capacity must be at work.' Whose view is 'children learn language purely by imitation'?",
    choices: [
      "The author's own view.",
      "Linguists whose view the author rejects.",
      "A view shared by the author and the linguists.",
      "No one mentioned in the excerpt.",
    ],
    correctIndex: 1,
    explanation:
      "The imitation theory belongs to the 'linguists' of an earlier era — 'once held' places it in the past, and 'but' introduces the author's rebuttal (novel sentences imitation cannot explain). The author's own view is the innate-capacity conclusion. 'Once held' plus a rebuttal is the standard museum-piece structure: an old view displayed only to be retired. Do not attribute retired views to the author.",
    contrastNote:
      "Time markers ('once held') plus rebuttal ('but') mark a retired view. The author displays it to replace it. The author's view is the replacement — here, that some innate capacity must be at work.",
    ...V1,
  },
  {
    id: "d-c060",
    kind: "identify",
    skillIds: ["rc-author-viewpoint", "rc-attitude"],
    difficulty: 3,
    prompt:
      "Excerpt: 'The mayor calls the budget 'balanced,' a word that does a lot of heavy lifting here, given the $40 million in deferred maintenance.' What does the AUTHOR imply?",
    choices: [
      "The budget is genuinely balanced.",
      "Deferred maintenance is unimportant.",
      "The mayor's description is misleading.",
      "The author has no opinion on the budget.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice is correct: the scare quotes around 'balanced' and the dry remark about 'heavy lifting' signal ironic distance — the author implies the label is doing work the numbers cannot support, given $40 million in deferred maintenance. The first choice is the mayor's claim, which the irony undercuts. The second misreads the mention of deferred maintenance — the author cites it as the reason the label fails, not as trivia. The fourth ignores the obvious editorializing. Irony and scare quotes are attitude markers: the author is saying the opposite of the quoted word.",
    contrastNote:
      "Scare quotes and ironic asides ('does a lot of heavy lifting') signal the author's real attitude: doubt or mockery of the quoted claim. Read the framing, not just the quoted word.",
    ...V1,
  },
  // ==================================================================
  // weaken-vs-flaw — d-c061–070
  // ==================================================================
  {
    id: "d-c061",
    kind: "contrast",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 1,
    prompt:
      "Argument: 'Our town's new streetlights reduced crime, since crime fell 20% after they were installed.' Which choice WEAKENS the argument?",
    choices: [
      "A citywide policing initiative began the same month the lights were installed.",
      "Streetlights are expensive to maintain.",
      "Crime fell 20% after installation.",
      "Residents say they like the new lights.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice supplies an alternative cause for the crime drop — the policing initiative — which makes it less likely the streetlights deserve the credit. That is what weakening does: add a fact that makes the conclusion less likely. The second and fourth choices are true but beside the causal point, and the third merely restates a premise. Note the choice does not prove the lights had no effect; weakening only needs to damage the conclusion, not destroy it.",
    contrastNote:
      "Weakening adds a fact that makes the conclusion less likely — often an alternative cause. It does not describe the reasoning error; it damages the conclusion directly with new information.",
    ...V1,
  },
  {
    id: "d-c062",
    kind: "contrast",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 2,
    prompt:
      "Argument: 'Our town's new recycling bins increased recycling, since recycling rates rose after the bins arrived.' Which choice NAMES THE FLAW in this reasoning?",
    choices: [
      "Recycling rates might have risen for another reason.",
      "The bins are blue and easy to spot.",
      "It confuses a correlation in time with proof of causation.",
      "Recycling benefits the environment.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice describes the reasoning error itself: treating 'after this, therefore because of this' as proof. The first choice is the tempting confusion — it weakens the argument by suggesting an alternative, but it does not name the flaw; it performs a different job. The second is irrelevant description and the fourth is an unrelated endorsement. Flaw answers are meta: they talk about the argument ('it confuses…,' 'it overlooks…,' 'it assumes…'), while weakeners talk about the world.",
    contrastNote:
      "Naming the flaw describes the error ('confuses correlation with causation'); weakening supplies a damaging fact ('might have risen for another reason'). Flaw answers talk about the argument; weakeners talk about the world.",
    ...V1,
  },
  {
    id: "d-c063",
    kind: "classify",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 2,
    prompt:
      "Argument: 'The tutoring program works — scores rose after it began.' A proposed choice reads: 'The argument overlooks the possibility that the score increase was due to an easier test.' Does this choice WEAKEN the argument or NAME ITS FLAW?",
    choices: [
      "It weakens — it proves the test was easier.",
      "It names the flaw — it describes what the reasoning failed to consider.",
      "It strengthens the argument.",
      "It states the argument's conclusion.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice is correct: the proposed answer points at the reasoning ('overlooks the possibility') without asserting any new fact — it never says the test WAS easier, only that the argument ignored the possibility. That is flaw-description language. The first choice misreads it as proving the easier test, which would be weakening via new evidence. The giveaway is the verb: 'overlooks,' 'fails to consider,' 'assumes,' and 'takes for granted' describe reasoning; they do not add facts.",
    contrastNote:
      "'Overlooks the possibility' describes a gap in reasoning — flaw language. It asserts no fact, so it weakens nothing directly. Possibility-language names flaws; fact-language weakens.",
    ...V1,
  },
  {
    id: "d-c064",
    kind: "classify",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 2,
    prompt:
      "Same argument: 'The tutoring program works — scores rose after it began.' A different choice reads: 'The test given after the program was significantly easier than the one given before.' Does this choice WEAKEN the argument or NAME ITS FLAW?",
    choices: [
      "It names the flaw.",
      "It weakens — it supplies a concrete fact that undermines the conclusion.",
      "It strengthens the argument.",
      "It restates a premise.",
    ],
    correctIndex: 1,
    explanation:
      "This choice asserts a fact about the world — the later test really was easier — which gives the score increase an alternative explanation and makes 'the program works' less likely. That is weakening by new evidence. Unlike the previous drill's 'overlooks the possibility,' there is no meta-commentary on the reasoning; the damage is done by information. Compare the pair: possibility-language describes the flaw, fact-language weakens.",
    contrastNote:
      "Concrete counter-facts weaken ('the test WAS easier'). Possibility-talk about the reasoning ('overlooks the possibility') names the flaw. Same topic, opposite jobs — the verb tells you which.",
    ...V1,
  },
  {
    id: "d-c065",
    kind: "classify",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 2,
    prompt: "A stem reads: 'Which of the following most weakens the argument?' Which task is being requested?",
    choices: [
      "Find a fact that makes the conclusion less likely.",
      "Find a description of the reasoning error.",
      "Find an assumption the argument requires.",
      "Find the argument's main conclusion.",
    ],
    correctIndex: 0,
    explanation:
      "'Most weakens' asks for new information that damages the conclusion — a fact, finding, or scenario that makes the conclusion less likely. The second choice describes the flaw task ('vulnerable to criticism on the grounds that…'), a different stem with different correct answers. The third and fourth are other question types. A reliable check: the right weaken answer should contain a claim about the world, not about the argument.",
    contrastNote:
      "Weaken stems ('most weakens,' 'undermines') want damaging facts about the world. Flaw stems ('vulnerable to criticism,' 'flawed because') want descriptions of the reasoning error. Different stems, different answers.",
    ...V1,
  },
  {
    id: "d-c066",
    kind: "classify",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 2,
    prompt:
      "A stem reads: 'The reasoning is most vulnerable to criticism on the grounds that…' Which task is being requested?",
    choices: [
      "Find a description of the flaw in the reasoning.",
      "Find a fact that weakens the conclusion.",
      "Find a statement that strengthens the argument.",
      "Find what must be true.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice is correct: 'vulnerable to criticism on the grounds that' is the classic flaw stem — it asks you to diagnose the reasoning error, not to attack the conclusion with new facts. The correct answer will use meta-language — 'fails to consider,' 'presumes,' 'confuses,' 'overlooks.' The second choice is the weaken task in disguise, and students who confuse the two pick damaging facts where the stem wanted a diagnosis. Read the stem's verb before you read the choices.",
    contrastNote:
      "'Vulnerable to criticism' = diagnose the error (flaw). 'Most weakens' = damage the conclusion (weaken). The stem's verb decides which job the right answer must do.",
    ...V1,
  },
  {
    id: "d-c067",
    kind: "contrast",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 3,
    prompt:
      "Argument: 'The senator's tax plan will fail because the senator has been wrong about the economy before.' Which choice NAMES THE FLAW?",
    choices: [
      "The senator might be right about the economy this time.",
      "Tax policy is complicated and hard to predict.",
      "The senator's past predictions were actually accurate.",
      "It attacks the senator's record instead of engaging with the plan's merits.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice names the ad hominem flaw: the argument substitutes an attack on the person for an evaluation of the plan. The first and third choices weaken — they supply reasons to doubt the conclusion ('might be right,' 'were actually accurate') — but they describe the world, not the error. The second is a vague generality. This drill pairs with the next: the same argument shape, two tasks, and the answers that fit one task fail the other.",
    contrastNote:
      "Ad hominem diagnosis ('attacks the person instead of the plan') names the flaw. Counter-claims about the senator's record weaken. Diagnosis talks about the argument; counter-evidence talks about the world.",
    ...V1,
  },
  {
    id: "d-c068",
    kind: "contrast",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 3,
    prompt:
      "Argument: 'This cream must reduce wrinkles: it contains retinol, and retinol reduces wrinkles in laboratory studies.' Which choice WEAKENS the argument?",
    choices: [
      "The argument assumes laboratory results apply to the cream.",
      "Wrinkles are a natural part of aging.",
      "The cream contains too little retinol to have any effect.",
      "The cream is expensive compared to alternatives.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice breaks the key link with a fact: if the dose is too small to matter, the retinol premise cannot deliver the conclusion. The first choice is the trap — it correctly names the flaw (assuming lab-to-real-world transfer) but the stem asked for weakening, not diagnosis. The second and fourth are irrelevant to whether the cream works. When the stem says 'weakens,' reach for the choice that adds damaging information, not the one that best describes the mistake.",
    contrastNote:
      "A flaw question on this argument would reward 'assumes lab results apply' — but this stem asks for weakening, so only the damaging fact ('too little retinol') qualifies. Task first, content second.",
    ...V1,
  },
  {
    id: "d-c069",
    kind: "classify",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 3,
    prompt:
      "A proposed choice reads: 'The argument takes a claim about most members of a group to be true of every member.' Does this choice WEAKEN an argument or NAME ITS FLAW?",
    choices: [
      "It weakens by providing a counterexample.",
      "It names the flaw — it describes a quantifier shift in the reasoning.",
      "It strengthens the argument.",
      "It identifies the argument's conclusion.",
    ],
    correctIndex: 1,
    explanation:
      "The choice describes the reasoning's move — sliding from 'most' to 'every' — without asserting any fact about the world or supplying a counterexample. That is flaw-diagnosis language: it characterizes what the argument did wrong. A weakener on the same topic would say something like 'several members are exceptions,' adding information. The verb pattern ('takes… to be,' 'treats… as,' 'presumes') is the signature of flaw answers.",
    contrastNote:
      "Quantifier-shift language ('takes most to mean every') diagnoses the reasoning — flaw. A weakener would add a fact ('here are exceptions'). Description of the move vs. new information: that is the whole distinction.",
    ...V1,
  },
  {
    id: "d-c070",
    kind: "contrast",
    skillIds: ["lr-weaken", "lr-flaw"],
    difficulty: 3,
    prompt:
      "Argument: 'We should not build the skate park: teenagers are irresponsible.' Which choice WEAKENS the argument?",
    choices: [
      "The argument generalizes about all teenagers from no evidence.",
      "Teenagers in neighboring towns have maintained their skate parks responsibly for years.",
      "Skate parks can be noisy for nearby residents.",
      "The proposed park would cost $2 million.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice supplies a direct counterexample — responsible teenagers maintaining real skate parks — which damages the sweeping premise the conclusion rests on. The first choice accurately names the flaw (hasty generalization) but does not weaken by the stem's standard: it diagnoses rather than adding facts. The third and fourth choices actually support not building the park, which is the opposite job. Note the discipline: even a perfect flaw description is wrong when the stem asks for weakening.",
    contrastNote:
      "Counterexamples weaken ('neighboring teens maintain parks responsibly'). Generalization-diagnosis ('generalizes from no evidence') names the flaw. The right content with the wrong job is still the wrong answer.",
    ...V1,
  },
  // ==================================================================
  // necessary-assumption-vs-strengthen — d-c071–080
  // ==================================================================
  {
    id: "d-c071",
    kind: "contrast",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 1,
    prompt:
      "Argument: 'The museum's new exhibit will draw crowds because the artist is famous.' Which statement is REQUIRED — a necessary assumption of the argument?",
    choices: [
      "The artist's fame will attract at least some visitors to the exhibit.",
      "Fame always draws huge crowds.",
      "The exhibit is well advertised.",
      "The museum is located downtown.",
    ],
    correctIndex: 0,
    explanation:
      "The argument needs fame to actually pull visitors through the door — negate the first choice ('fame will attract no visitors') and the reason gives zero support for the conclusion, so it is necessary. The second choice would guarantee crowds, but the argument does not need that much; 'always' and 'huge' are stronger than required, making it a sufficient-style trap. The third merely helps without being needed, and the fourth is irrelevant. Required means the argument dies without it — nothing more.",
    contrastNote:
      "Necessary = the argument cannot live without it (negation test). 'Fame attracts some visitors' is needed; 'fame always draws huge crowds' is overkill. Need, not guarantee, is the standard.",
    ...V1,
  },
  {
    id: "d-c072",
    kind: "contrast",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 2,
    prompt:
      "Argument: 'The new café will succeed because the neighborhood has no good coffee shops.' Which choice HELPS the argument but is NOT REQUIRED?",
    choices: [
      "At least some neighborhood residents are potential café customers.",
      "Residents have said they want a local coffee shop.",
      "The café will be painted blue.",
      "Residents prefer to make coffee at home.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice helps — expressed demand makes success more likely — but the café could still succeed without a survey saying so (foot traffic, commuters, or quality could carry it), so it is not required. The first choice is the trap: negate it ('no residents are potential customers') and the argument collapses, which makes it necessary, not merely helpful. The third is irrelevant and the fourth weakens. 'Helps but not required' is the definition of a strengthener that is not an assumption.",
    contrastNote:
      "Strengtheners help without being needed; necessary assumptions are needed. Negate the candidate: collapse means required (first choice), survival means merely helpful (second choice).",
    ...V1,
  },
  {
    id: "d-c073",
    kind: "contrast",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 2,
    prompt:
      "To check whether a statement is a NECESSARY assumption of an argument, which procedure should you use?",
    choices: [
      "Affirm the statement and see whether the conclusion becomes certain.",
      "Check whether the statement mentions the conclusion's key terms.",
      "Negate the statement and see whether the argument still stands.",
      "Ask whether the statement makes the argument slightly stronger.",
    ],
    correctIndex: 2,
    explanation:
      "The third procedure is correct: negation is the defining test for necessity — a necessary assumption is one the argument cannot do without, so denying it must wound the argument. The first procedure tests sufficiency (does it prove the conclusion?), the second is keyword matching — a notorious trap — and the fourth tests strengthening, which is a weaker standard. Each assumption task has its own test; using the wrong test is how students 'confirm' answers that merely help.",
    contrastNote:
      "Necessary assumption → negation test (deny it; does the argument fall?). Sufficient assumption → proof test (affirm it; does the conclusion follow?). Strengthen → support test (does it help?). Match the test to the task.",
    ...V1,
  },
  {
    id: "d-c074",
    kind: "classify",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 2,
    prompt:
      "A stem reads: 'Which of the following is an assumption required by the argument?' Which task is being requested?",
    choices: [
      "Find a statement that would help the argument.",
      "Find what must be true for the argument to work — a necessary assumption.",
      "Find the flaw in the argument's reasoning.",
      "Find a statement that follows from the argument.",
    ],
    correctIndex: 1,
    explanation:
      "'Required by' is necessity language: the stem wants something the argument depends on, such that denying it would damage the reasoning. The first choice is the strengthen task in disguise — helpful is not required, and the test exploits exactly this blur. The third and fourth are other question types. When you see 'required,' 'depends on,' or 'must assume,' run the negation test on each candidate.",
    contrastNote:
      "'Required by,' 'depends on,' 'must assume' = necessary assumption. 'Helps' or 'supports' = strengthen. The stem's verb tells you whether to demand necessity or accept mere help.",
    ...V1,
  },
  {
    id: "d-c075",
    kind: "classify",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 2,
    prompt:
      "A stem reads: 'Which of the following, if true, most strengthens the argument?' Which task is being requested?",
    choices: [
      "Find support that makes the conclusion more likely — it need not be required.",
      "Find a statement the argument requires.",
      "Find the argument's hidden flaw.",
      "Find the main conclusion.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice is correct: 'most strengthens' asks for a probability boost, not a requirement — the winner makes the conclusion more likely, and it may be something the argument could survive without. The second choice imposes the necessity standard and would wrongly reject good strengtheners. The third and fourth are different tasks. Practical tip: on strengthen questions, never eliminate a choice for 'not being necessary' — necessity is simply not the job.",
    contrastNote:
      "Strengthen = more likely, requirement optional. Necessary assumption = required, helpfulness alone insufficient. Eliminating a strengthen choice for 'not being necessary' is a category error.",
    ...V1,
  },
  {
    id: "d-c076",
    kind: "contrast",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 3,
    prompt:
      "Argument: 'The drug will be approved because trials showed it is safe and effective.' Which choice HELPS the argument but is NOT REQUIRED?",
    choices: [
      "The drug is safe.",
      "The trials were double-blind.",
      "The drug cures all diseases.",
      "The trials were funded by the manufacturer.",
    ],
    correctIndex: 1,
    explanation:
      "Double-blind trials are more credible, so the second choice helps — but approval does not require double-blinding specifically; well-run open trials could also support it, so it is not necessary. The first choice is the trap: it restates a stated premise, and denying it ('the drug is not safe') destroys the argument, making it necessary rather than merely helpful. The third is absurd overkill and the fourth, if anything, weakens by suggesting bias. Restated premises are always necessary — never pick them as 'merely helpful.'",
    contrastNote:
      "A restated premise ('the drug is safe') is necessary, not merely helpful — denying it kills the argument. 'Double-blind' improves the evidence without being required. Helpful ≠ required, and stated ≠ optional.",
    ...V1,
  },
  {
    id: "d-c077",
    kind: "contrast",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 3,
    prompt:
      "Argument: 'The bridge will hold the trucks because it was built to code.' Which statement is REQUIRED by this reasoning?",
    choices: [
      "The bridge was inspected this year.",
      "No bridge built to code has ever failed.",
      "The building code is adequate for the trucks' weight.",
      "Trucks are heavy vehicles.",
    ],
    correctIndex: 2,
    explanation:
      "Negate the third choice — the code is not adequate for these trucks — and 'built to code' gives no reason to expect the bridge to hold them; the argument collapses, so the assumption is necessary. The first choice helps (a recent inspection is reassuring) without being required. The second is the sufficient-style trap: it would guarantee the conclusion but demands far more than the argument needs. The fourth is a trivial truth doing no work. Necessity is the minimum the argument needs — test by negation, not by impressiveness.",
    contrastNote:
      "'No bridge built to code has ever failed' would prove the conclusion but is stronger than needed — sufficiency, not necessity. The argument only needs the code to cover these trucks. Demand the minimum the reasoning needs.",
    ...V1,
  },
  {
    id: "d-c078",
    kind: "classify",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 3,
    prompt:
      "A description reads: 'This statement must be true for the argument to work; without it, the conclusion cannot follow.' Which concept is being described?",
    choices: [
      "A necessary assumption.",
      "A statement that strengthens the argument.",
      "A sufficient assumption.",
      "The argument's main conclusion.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice is correct: 'must be true for the argument to work; without it, the conclusion cannot follow' is the textbook definition of a necessary assumption — note the negation test embedded in the phrasing ('without it… cannot follow'). A strengthener (second choice) helps without being needed; a sufficient assumption (third) guarantees the conclusion rather than being required by it; the conclusion (fourth) is what follows, not what is needed. When a description contains 'without it,' think necessity.",
    contrastNote:
      "'Without it, the conclusion cannot follow' = necessary assumption, with the negation test built into the definition. 'If it, then the conclusion must follow' = sufficient assumption. The direction of the 'must' decides.",
    ...V1,
  },
  {
    id: "d-c079",
    kind: "classify",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 2,
    prompt:
      "A student says: 'This choice helps the argument, so it must be the necessary assumption.' What is wrong with this reasoning?",
    choices: [
      "Nothing — helpful choices are always necessary assumptions.",
      "Helpful is not the same as required; a strengthener can help without being necessary.",
      "Necessary assumptions never help the argument.",
      "Strengtheners always weaken the argument.",
    ],
    correctIndex: 1,
    explanation:
      "The student collapses two different standards: strengthening (makes the conclusion more likely) and necessity (the argument cannot work without it). Countless choices help without being required — a favorable survey, a credible method, a supporting example — and none of them is a necessary assumption. The negation test exposes the error: if denying the choice leaves the argument standing, it was merely helpful. 'Helps, therefore required' is the single most common necessary-assumption mistake.",
    contrastNote:
      "'Helps' ≠ 'required.' The student's error is treating the strengthen standard as the necessity standard. Apply the negation test: no collapse, no necessity.",
    ...V1,
  },
  {
    id: "d-c080",
    kind: "contrast",
    skillIds: ["lr-necessary-assumption", "lr-strengthen"],
    difficulty: 3,
    prompt:
      "Argument: 'The team will make the playoffs because it has the league's best record.' Consider the statement: 'The playoffs include the teams with the best records.' Is it REQUIRED or merely HELPFUL?",
    choices: [
      "Merely helpful — the team might make the playoffs another way.",
      "Irrelevant to the argument.",
      "It weakens the argument.",
      "Required — negate it and the argument collapses.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice is correct. Negate the statement: the playoffs do not include the best-record teams (say they are chosen by lottery). Then 'best record' gives no reason to expect a playoff berth, and the argument collapses — the textbook signature of necessity. It is not merely helpful, because without some link between record and playoffs the premise is inert. It is certainly not irrelevant or weakening. This is the negation test doing its full job: deny, observe collapse, conclude necessity.",
    contrastNote:
      "Without a record-to-playoffs link, the premise ('best record') cannot reach the conclusion ('will make the playoffs'). The link is load-bearing: deny it and the reasoning falls. Load-bearing = necessary.",
    ...V1,
  },
  // ==================================================================
  // correlation-vs-causation — d-c081–090
  // ==================================================================
  {
    id: "d-c081",
    kind: "contrast",
    skillIds: ["f-causation", "f-samples"],
    difficulty: 1,
    prompt:
      "A study finds that people who drink green tea tend to live longer. Which question must be answered before concluding that green tea CAUSES longer life?",
    choices: [
      "Do green-tea drinkers also exercise more or eat better?",
      "What brand of green tea did they drink?",
      "How many people were in the study?",
      "Is green tea popular in Asia?",
    ],
    correctIndex: 0,
    explanation:
      "The first question hunts for an alternative cause: if tea drinkers also exercise and eat well, those habits — not the tea — might explain the longevity. Until rival explanations are ruled out, causation is unproven. The second and fourth questions are irrelevant details, and while the third (sample size) matters for reliability, a huge sample of confounded data still cannot prove causation. Correlation raises a question; only eliminating alternatives begins to answer it causally.",
    contrastNote:
      "Correlation becomes causation only when alternative causes are ruled out. 'Do tea drinkers live healthier in other ways?' is the causal question; brand, popularity, and even sample size do not touch it.",
    ...V1,
  },
  {
    id: "d-c082",
    kind: "contrast",
    skillIds: ["f-causation"],
    difficulty: 1,
    prompt: "Which of the following statements describes mere CORRELATION rather than causation?",
    choices: [
      "Building libraries causes literacy to rise.",
      "Towns with more libraries have higher literacy rates.",
      "Higher literacy causes towns to build libraries.",
      "Libraries are quiet places to read.",
    ],
    correctIndex: 1,
    explanation:
      "The second choice reports only that two things go together — more libraries, higher literacy — without claiming one produces the other. That is correlation. The first and third both assert causal arrows (in opposite directions), which is precisely what the data alone do not establish; perhaps wealth causes both. The fourth is an unrelated observation. Spotting the causal verb ('causes') versus the associational phrasing ('have,' 'tend to') is the first causal-literacy skill.",
    contrastNote:
      "Correlation says things go together ('towns with more libraries have higher literacy'); causation says one produces the other ('building libraries causes…'). The verb is the tell — 'causes' claims what mere co-occurrence cannot.",
    ...V1,
  },
  {
    id: "d-c083",
    kind: "contrast",
    skillIds: ["f-causation", "f-samples"],
    difficulty: 2,
    prompt:
      "A headline reads: 'Study proves coffee prevents dementia.' The study actually found that coffee drinkers develop dementia less often. What is wrong with the headline?",
    choices: [
      "It turns a correlation into a proven causal claim.",
      "It understates what the study found.",
      "Coffee has nothing to do with dementia.",
      "The study included too many participants.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice is correct: the study found an association — coffee drinkers develop dementia less often — but the headline upgrades it to proof of prevention ('proves,' 'prevents'). That upgrade is the correlation-to-causation leap: perhaps coffee drinkers differ in education, wealth, or health habits that actually explain the gap. The second choice gets the direction wrong (the headline overstates, not understates), the third dismisses a real association, and the fourth is nonsense — large samples are a virtue. Headlines routinely commit this leap; the test checks whether you will.",
    contrastNote:
      "'Develop dementia less often' (correlation) is not 'prevents dementia' (causation), and 'found' is not 'proves.' Two upgrades — association→cause, found→proven — each need evidence the study never supplied.",
    ...V1,
  },
  {
    id: "d-c084",
    kind: "contrast",
    skillIds: ["f-causation", "f-samples"],
    difficulty: 2,
    prompt:
      "A school notes that students who attend tutoring score higher. Which finding would best support the claim that tutoring CAUSES the higher scores?",
    choices: [
      "The tutored students were already top performers before tutoring began.",
      "A randomized experiment assigned struggling students to tutoring or no tutoring, and the tutored group improved more.",
      "More students signed up for tutoring this year than last.",
      "The tutors are well paid and experienced.",
    ],
    correctIndex: 1,
    explanation:
      "Random assignment is the gold standard for causation: by randomly placing similar students into tutoring or not, the experiment balances out pre-existing differences, so the improvement gap can be credited to the tutoring itself. The first choice weakens the causal claim (it suggests selection bias — strong students chose tutoring). The third and fourth are irrelevant to causation. When the test asks what would support a causal claim, look for experimental control or the elimination of alternatives.",
    contrastNote:
      "Randomized experiments isolate causation by balancing rival explanations in advance. Observational gaps ('tutored students score higher') cannot do this — the groups may have differed before the treatment.",
    ...V1,
  },
  {
    id: "d-c085",
    kind: "contrast",
    skillIds: ["f-causation"],
    difficulty: 2,
    prompt:
      "A critic observes that cities with more police have more crime, and concludes that police cause crime. What has the critic overlooked?",
    choices: [
      "That police officers are expensive to employ.",
      "That crime statistics are perfectly accurate.",
      "That all cities have identical populations.",
      "That high crime may cause cities to hire more police — reverse causation.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice is correct: the critic assumed the arrow runs from police to crime, but it may run the other way — rising crime prompts cities to hire more officers. That is reverse causation — the presumed effect is actually driving the presumed cause. The first choice is a budget aside, the second grants the data too much credit rather than challenging the inference, and the third demands an irrelevant uniformity. Whenever X and Y are linked, always test both arrow directions before accepting either.",
    contrastNote:
      "Correlation is directionless: 'more police, more crime' fits both 'police cause crime' and 'crime causes hiring.' The critic picked a direction without evidence. Always test the reverse arrow.",
    ...V1,
  },
  {
    id: "d-c086",
    kind: "contrast",
    skillIds: ["f-causation"],
    difficulty: 2,
    prompt: "Ice cream sales and drowning deaths both rise in summer. Which conclusion is best licensed by this fact?",
    choices: [
      "Ice cream sales cause drowning deaths.",
      "Drowning deaths cause ice cream sales.",
      "Hot weather likely drives both increases.",
      "Ice cream prevents drowning.",
    ],
    correctIndex: 2,
    explanation:
      "The third choice offers the common-cause explanation: summer heat independently increases both swimming (and hence drownings) and ice-cream buying, producing a correlation with no direct link between the two. The first two choices pick causal arrows the data cannot support, and the fourth is absurd. The common third variable is the most frequently tested alternative to direct causation — when two trends move together, always ask what single factor could drive both.",
    contrastNote:
      "A shared third variable ('hot weather') explains correlation without any direct causal link. Before accepting 'X causes Y,' ask: what single factor could independently cause both X and Y?",
    ...V1,
  },
  {
    id: "d-c087",
    kind: "contrast",
    skillIds: ["f-causation", "f-samples"],
    difficulty: 3,
    prompt:
      "Users of a meditation app report less anxiety than non-users. Which finding would most help turn this correlation into evidence of CAUSATION?",
    choices: [
      "Users were randomly assigned to meditate or not, and the meditation group improved more.",
      "The app has been downloaded millions of times.",
      "Anxious people tend to avoid trying meditation.",
      "The app receives high ratings in the app store.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice is correct: random assignment with a control group is what upgrades correlation to causal evidence — it ensures the meditators and non-meditators started out comparable, so the anxiety gap is attributable to the meditation. The second and fourth choices are popularity metrics, irrelevant to causation. The third is interesting — it suggests self-selection bias — but it undermines rather than supports the causal claim. The pattern is consistent: experiments prove, observations suggest.",
    contrastNote:
      "To move from 'associated' to 'caused,' you need a design that rules out pre-existing differences — random assignment with a control group. Popularity (downloads, ratings) never substitutes for design.",
    ...V1,
  },
  {
    id: "d-c088",
    kind: "contrast",
    skillIds: ["f-causation"],
    difficulty: 3,
    prompt:
      "An early study linked children's night-lights to nearsightedness. Later research showed that nearsighted parents both use night-lights and pass myopia genes to their children. The original night-light link is best described as…",
    choices: [
      "Proof that night-lights damage children's eyes.",
      "A correlation explained by a third variable — parental myopia.",
      "Proof that myopia is contagious.",
      "A meaningless coincidence with no possible explanation.",
    ],
    correctIndex: 1,
    explanation:
      "Parental myopia is the third variable: it causes both the night-light use (nearsighted parents prefer lit rooms) and the children's nearsightedness (genetics), creating a correlation between night-lights and myopia with no causal link between them. The first choice keeps the original causal error, the third invents contagion, and the fourth gives up on explanation when a good one exists. This is the classic third-variable debunk — the test's favorite way to dissolve a causal claim.",
    contrastNote:
      "Third-variable explanation: Z causes both X and Y, so X and Y correlate without X causing Y. Here Z is parental myopia, X is night-light use, Y is children's myopia. Find Z before believing X→Y.",
    ...V1,
  },
  {
    id: "d-c089",
    kind: "contrast",
    skillIds: ["f-causation"],
    difficulty: 3,
    prompt:
      "The mayor claims: 'The new principal caused test scores to rise, since scores rose after she arrived.' Which question best challenges this causal claim?",
    choices: [
      "Is the principal well liked by teachers?",
      "Do test scores really matter?",
      "Did anything else change at the school around the same time?",
      "Was the previous principal ineffective?",
    ],
    correctIndex: 2,
    explanation:
      "The third question hunts for alternative causes — a new curriculum, different tests, demographic shifts — that could explain the rise instead of (or in addition to) the principal. 'After this, therefore because of this' is the post hoc fallacy, and its antidote is always: what else changed? The first question is about popularity, the second about values, and the fourth, while suggestive, does not directly supply a rival cause. Challenging a causal claim means proposing or probing rival explanations.",
    contrastNote:
      "'After, therefore because of' (post hoc) is the most common causal flaw. The challenge is always the same: what else happened at the same time? Rival causes, not opinions about the cause, do the damage.",
    ...V1,
  },
  {
    id: "d-c090",
    kind: "classify",
    skillIds: ["f-causation"],
    difficulty: 2,
    prompt:
      "When an argument moves from 'X is associated with Y' to 'X causes Y,' what should a careful test-taker do?",
    choices: [
      "Accept the causal claim if the correlation is strong.",
      "Look for alternative causes, reverse causation, or a common third variable.",
      "Reject all statistical evidence as unreliable.",
      "Assume the study's data were fabricated.",
    ],
    correctIndex: 1,
    explanation:
      "The disciplined response to a correlation-to-causation move is to generate rival explanations: maybe Y causes X (reverse), maybe Z causes both (third variable), maybe it is coincidence or selection bias. The first choice surrenders — strong correlations still need causal evidence. The third and fourth overreact; statistics are usable, and fabrication is never the assumed flaw. The correct weaken or flaw answer to a causal argument almost always names one of these three rivals.",
    contrastNote:
      "The causal skeptic's checklist: alternative cause, reverse causation, third variable. Run it on every 'X is linked to Y, therefore X causes Y' argument before accepting the conclusion.",
    ...V1,
  },
  // ==================================================================
  // some-vs-most-vs-all — d-c091–100
  // ==================================================================
  {
    id: "d-c091",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 1,
    prompt: "'All of the committee's proposals were adopted.' Which of the following MUST be true?",
    choices: [
      "Some of the committee's proposals were adopted.",
      "The committee made exactly five proposals.",
      "Some proposals were controversial.",
      "The committee meets monthly.",
    ],
    correctIndex: 0,
    explanation:
      "'All' logically contains 'some': if every proposal was adopted, then at least one was — 'some' means 'at least one,' not 'a few.' The other choices add specifics (five proposals, controversy, meeting schedule) the statement never provides. This is the foundational quantifier move: all → some. It feels too easy to be tested, but the test relies on students forgetting it under pressure — especially in 'must be true' questions where the provable answer looks disappointingly weak.",
    contrastNote:
      "'All A are B' guarantees 'some A are B,' because 'some' means at least one. The provable answer often looks weak — that weakness is exactly what makes it provable.",
    ...V1,
  },
  {
    id: "d-c092",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 1,
    prompt: "'Most of the flights were delayed.' Which of the following MUST be true?",
    choices: [
      "All flights were delayed.",
      "No flight was on time.",
      "Some flights were delayed.",
      "The delays were lengthy.",
    ],
    correctIndex: 2,
    explanation:
      "'Most' means more than half, which certainly includes at least one — so 'some flights were delayed' must be true. The first two choices upgrade 'most' to 'all,' the classic too-strong error: most leaves room for exceptions. The fourth adds a detail (length) never mentioned. Quantifier questions punish every upgrade: most → all, some → most, few → none. Hold each quantifier at its exact strength.",
    contrastNote:
      "'Most' proves 'some' but never 'all.' Every quantifier upgrade — most→all, some→most — is an overclaim. Keep each quantifier at its stated strength.",
    ...V1,
  },
  {
    id: "d-c093",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 2,
    prompt: "'Some of the documents are missing.' Which of the following CANNOT be true?",
    choices: [
      "All of the documents are missing.",
      "Most of the documents are present.",
      "Exactly one document is missing.",
      "None of the documents is missing.",
    ],
    correctIndex: 3,
    explanation:
      "'Some are missing' means at least one is missing, which directly contradicts 'none is missing' — so the fourth choice cannot be true. The first choice is compatible ('some' includes the possibility of 'all'), the second is compatible (most present still allows some missing), and the third is compatible (exactly one is 'at least one'). Students often misread 'some' as 'some but not all'; on this test, 'some' is always compatible with 'all.'",
    contrastNote:
      "'Some' = at least one, and it is compatible with 'all.' Only 'none' contradicts 'some.' The common misreading — 'some but not all' — will cost you whenever the test exploits it.",
    ...V1,
  },
  {
    id: "d-c094",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 2,
    prompt: "'Most reviewers praised the film.' Which inference is licensed?",
    choices: [
      "All reviewers praised the film.",
      "The film is genuinely good.",
      "No reviewer criticized the film.",
      "Some reviewers praised the film.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice is the only licensed move: most → some — more than half praised it, so at least one did. The first choice upgrades most to all; the third does the same upgrade in negative form; the second substitutes the reviewers' judgment for your own, which no quantifier logic licenses. Licensed inferences are the minimal ones — take exactly what the quantifier gives and not one degree more.",
    contrastNote:
      "From 'most,' only 'some' follows. 'All,' 'none criticized,' and quality judgments each add an unlicensed degree. The licensed inference is the minimal one.",
    ...V1,
  },
  {
    id: "d-c095",
    kind: "classify",
    skillIds: ["f-quantifiers"],
    difficulty: 2,
    prompt:
      "A student reads 'some' as 'only some' — that is, 'some but not all.' Which correction is right?",
    choices: [
      "'Some' means exactly a few.",
      "'Some' means at least one — and it is compatible with 'all.'",
      "'Some' excludes 'most.'",
      "'Some' means about half.",
    ],
    correctIndex: 1,
    explanation:
      "On this test, 'some' is a precise logical term meaning 'at least one,' with no upper bound — it is fully compatible with 'most' and even 'all.' The student's 'some but not all' reading imports an everyday conversational implicature ('some' suggesting 'not all') that logic does not recognize. Every other choice invents a false precision: 'a few,' 'about half,' and exclusions the term never carries. When you see 'some,' think 'at least one' and stop.",
    contrastNote:
      "Test-logic 'some' = at least one, no upper bound, compatible with 'all.' The everyday hint of 'not all' is conversational, not logical — and the test exploits the difference.",
    ...V1,
  },
  {
    id: "d-c096",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 3,
    prompt:
      "Facts: 'All managers attended the training. Some attendees received certificates.' Which of the following MUST be true?",
    choices: [
      "Some managers received certificates.",
      "All attendees were managers.",
      "Some certificate recipients attended the training.",
      "Most managers received certificates.",
    ],
    correctIndex: 2,
    explanation:
      "The certificate recipients are a subset of attendees (they received them as attendees), so 'some certificate recipients attended the training' is inescapable — it merely unpacks 'some attendees received certificates.' The first choice is the trap: the certificate recipients might be non-manager attendees, so no manager is proven to hold one. The second reverses the facts and the fourth upgrades 'some' to 'most.' Track which group each quantifier attaches to; the trap always moves a property to the wrong group.",
    contrastNote:
      "Quantifiers attach to specific groups: 'some attendees' received certificates, not 'some managers.' Moving a property from one group to another ('some managers received certificates') is unlicensed — the groups are not interchangeable.",
    ...V1,
  },
  {
    id: "d-c097",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 3,
    prompt:
      "Facts: 'Most birds in the aviary are parrots. Most birds in the aviary are green.' Which of the following MUST be true?",
    choices: [
      "Some parrots in the aviary are green.",
      "All parrots in the aviary are green.",
      "Most green birds in the aviary are parrots.",
      "Some green birds are not parrots.",
    ],
    correctIndex: 0,
    explanation:
      "The first choice is correct: two majorities of the same group must overlap — if more than half the birds are parrots and more than half are green, the two majorities cannot avoid sharing members, so some parrot is green. This overlap principle is the one valid 'most + most' inference. The second choice upgrades to 'all'; the third reverses the direction (most green → parrots is unproven); the fourth claims a non-overlap that need not exist. Most + most → some overlap, and nothing more.",
    contrastNote:
      "Two 'most' claims about the same group must overlap — that is the only valid most+most inference ('some parrots are green'). Direction reversals and upgrades to 'all' remain unlicensed.",
    ...V1,
  },
  {
    id: "d-c098",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 2,
    prompt: "'A few customers complained.' A student concludes: 'Most customers are unhappy.' What is the student's error?",
    choices: [
      "Reversing a conditional statement.",
      "Treating 'a few' (some) as 'most' — a quantifier upgrade.",
      "Confusing correlation with causation.",
      "Attacking the customers instead of the complaint.",
    ],
    correctIndex: 1,
    explanation:
      "'A few' is in the 'some' family — at least one, possibly a small number — and it proves nothing about 'most' (more than half). The student upgraded the quantifier two full strengths, from a weak existential to a majority claim. The other choices name real flaws, but none matches: there is no conditional to reverse, no causal claim, and no personal attack. Quantifier upgrades are among the most common wrong-answer generators — always check whether the answer's quantifier matches the evidence's.",
    contrastNote:
      "'A few'/'some' never proves 'most.' Quantifier upgrades — some→most, most→all — are a top wrong-answer pattern. Match the answer's quantifier strength to the evidence's, exactly.",
    ...V1,
  },
  {
    id: "d-c099",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 3,
    prompt:
      "Survey facts: 'Some respondents were cyclists. All cyclists surveyed owned a helmet.' Which of the following MUST be true?",
    choices: [
      "All respondents were cyclists.",
      "Most respondents owned a helmet.",
      "Some helmet owners were not cyclists.",
      "Some respondents owned a helmet.",
    ],
    correctIndex: 3,
    explanation:
      "The fourth choice is correct: the cyclists in the survey are respondents, and all of them owned helmets — so at least some respondents (the cyclists) owned helmets. That is the valid chain: some A are B, all B are C, therefore some A are C. The first choice upgrades 'some' to 'all,' the second upgrades to 'most,' and the third speculates about non-cyclist owners the facts never mention. Some + all → some is a licensed syllogism; any upgrade beyond 'some' breaks it.",
    contrastNote:
      "'Some A are B; all B are C' licenses only 'some A are C.' The conclusion can never be stronger than the weakest link — 'some' caps the whole chain.",
    ...V1,
  },
  {
    id: "d-c100",
    kind: "contrast",
    skillIds: ["f-quantifiers", "f-deduction"],
    difficulty: 3,
    prompt: "A report states: 'Not all of the samples were contaminated.' Which of the following MUST be true?",
    choices: [
      "No samples were contaminated.",
      "Some samples were uncontaminated.",
      "Most samples were clean.",
      "The samples were safe to use.",
    ],
    correctIndex: 1,
    explanation:
      "'Not all were contaminated' means at least one was not — which is exactly 'some samples were uncontaminated.' The first choice flips to the opposite extreme ('none'), the third upgrades to 'most,' and the fourth adds a safety judgment the report never makes. 'Not all' is the negation of a universal, and negating 'all' yields 'some… not' — a mechanical translation worth memorizing: not-all = some-are-not.",
    contrastNote:
      "'Not all A are B' = 'some A are not B.' It proves nothing about 'most' or 'none,' and nothing about safety. Negating a universal yields an existential — mechanical, exact, and frequently tested.",
    ...V1,
  },
];
