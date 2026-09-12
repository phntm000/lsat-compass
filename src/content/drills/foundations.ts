/**
 * LSAT Compass — Foundation micro-drills (d-f001…).
 *
 * Contract: content-schema.md §6 (Drill record), §7 (QA rubric), §9 (voice).
 * All stimuli, choices, and explanations are original compositions written for
 * this app. No LSAC, LawHub, PrepTest, or commercial-prep material is reproduced
 * or paraphrased.
 *
 * ID allocation (lesson files reference these ranges):
 *   f-argument          d-f001–010   (10)
 *   f-premise-conclusion d-f011–022  (12)
 *   f-indicators        d-f023–032   (10)
 *   f-structure         d-f033–044   (12)
 *   f-assumption        d-f045–056   (12)
 *   f-deduction         d-f057–066   (10)
 *   f-conditional       d-f067–078   (12)
 *   f-translate         d-f079–090   (12)
 *   f-quantifiers       d-f091–100   (10)
 *   f-causation         d-f101–110   (10)
 *   f-samples           d-f111–118   (8)
 *   f-numbers           d-f119–126   (8)
 *   f-comparison        d-f127–134   (8)
 *   f-analogy           d-f135–142   (8)
 *   f-flaws             d-f143–152   (10)
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

export const DRILLS_F: Drill[] = [
  // ==================================================================
  // f-argument — d-f001–010: classify argument vs explanation vs
  // report vs description.
  // ==================================================================
  {
    id: "d-f001",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 1,
    prompt:
      "The night shift should keep the loading dock gate locked. Last month three pallets were taken from the staging area, and the insurance audit flagged the unlocked gate as a liability. What kind of passage is this?",
    choices: ["Argument", "Explanation", "Report", "Description"],
    correctIndex: 0,
    explanation:
      "This is an argument because it tries to convince you of a claim — that the gate should stay locked — and backs that claim with reasons: the stolen pallets and the audit finding. An argument always has this two-part shape, a conclusion supported by premises. Here the word ‘should’ marks the conclusion, and the theft and audit details are the supporting premises offered to persuade you.",
    ...V1,
  },
  {
    id: "d-f002",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 1,
    prompt:
      "Riverbend's council met Tuesday evening. Members approved the 2027 budget, tabled the parking ordinance, and adjourned at nine. What kind of passage is this?",
    choices: ["Explanation", "Report", "Description", "Argument"],
    correctIndex: 1,
    explanation:
      "This is a report because it simply tells you what happened, with no attempt to persuade you of anything. There is no claim being defended and no reasons offered for a conclusion — just a neutral record of events. Notice how different it feels from an argument: nobody is trying to change your mind, and no ‘because’ or ‘should’ is doing any work.",
    ...V1,
  },
  {
    id: "d-f003",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 1,
    prompt:
      "The bread rose unevenly because the kitchen was cold on one side, so the yeast activated at different rates. What kind of passage is this?",
    choices: ["Description", "Argument", "Explanation", "Report"],
    correctIndex: 2,
    explanation:
      "This is an explanation because it tells you WHY something happened that is already accepted as fact — the uneven rise. Nobody is trying to convince you the bread rose unevenly; that is taken for granted, and the cold kitchen is offered as the cause. The key test: an explanation assumes the outcome and gives its reason, while an argument tries to prove the outcome is true.",
    ...V1,
  },
  {
    id: "d-f004",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 1,
    prompt:
      "The harbor at dawn was a sheet of hammered silver, the moored boats rocking gently in their slips as gulls traced slow circles overhead. What kind of passage is this?",
    choices: ["Argument", "Explanation", "Report", "Description"],
    correctIndex: 3,
    explanation:
      "This is a description because its job is to paint a picture, not to prove a point or explain a cause. It gives you sensory details — the silver water, the rocking boats, the gulls — so you can imagine the scene. There is no conclusion to accept, no cause being identified, and no events being reported; the passage simply shows you what something looks like.",
    ...V1,
  },
  {
    id: "d-f005",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 1,
    prompt:
      "Mara's clinic should extend its evening hours. Working patients keep missing appointments, and no-shows cost the clinic more each month. What kind of passage is this?",
    choices: ["Argument", "Explanation", "Report", "Description"],
    correctIndex: 0,
    explanation:
      "This is an argument. The conclusion is the recommendation that the clinic should extend evening hours, and the two other sentences are premises supporting it: missed appointments show the need, and rising no-show costs show the stakes. Even without indicator words like ‘therefore,’ the structure gives it away — a claim about what should happen, backed by reasons why it should happen.",
    ...V1,
  },
  {
    id: "d-f006",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 1,
    prompt:
      "The lake's fish population crashed because an upstream dam blocked the spring spawning run. What kind of passage is this?",
    choices: ["Argument", "Explanation", "Report", "Description"],
    correctIndex: 1,
    explanation:
      "This is an explanation. The crashed fish population is presented as an established fact — the passage is not trying to convince you it happened — and the dam blocking the spawning run is offered as the cause. Watch out: the word ‘because’ appears in both arguments and explanations. The difference is whether the ‘because’ clause is proving a disputed claim (argument) or giving the cause of an accepted fact (explanation).",
    ...V1,
  },
  {
    id: "d-f007",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 2,
    prompt:
      "The fire chief said crews contained the blaze by 4 a.m. No homes were damaged, though two sheds were lost. What kind of passage is this?",
    choices: ["Argument", "Explanation", "Report", "Description"],
    correctIndex: 2,
    explanation:
      "This is a report. It relays facts about the fire — when it was contained, what was damaged — without drawing a conclusion or pushing a point of view. The quotation from the fire chief might look like evidence, but evidence needs a conclusion to support, and there is none here. A report‘s job is to inform you about events; an argument‘s job is to persuade you about a claim.",
    ...V1,
  },
  {
    id: "d-f008",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 2,
    prompt:
      "You should back up your files. When my laptop died last year, I lost a semester of work. What kind of passage is this?",
    choices: ["Explanation", "Report", "Description", "Argument"],
    correctIndex: 3,
    explanation:
      "This is an argument. The conclusion is the advice — you should back up your files — and the lost semester of work is a premise offered to persuade you to take that advice. Personal stories can be premises too; what matters is the role the sentence plays. Here the story is not just being told for its own sake, the way a report would tell it — it is ammunition for the recommendation.",
    ...V1,
  },
  {
    id: "d-f009",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 3,
    prompt:
      "The reservoir dropped to record lows because farmers drew heavily during the drought, and the city imposed watering limits in response. What kind of passage is this?",
    choices: ["Explanation", "Report", "Description", "Argument"],
    correctIndex: 0,
    explanation:
      "This is an explanation, and it is tricky because it contains two cause-and-effect links. The low reservoir is an accepted fact, and heavy farm use explains it; the watering limits are then explained as a response to the low reservoir. At no point does the passage try to convince you that something should be done or that a disputed claim is true — it only accounts for why things happened, which is the signature of an explanation.",
    ...V1,
  },
  {
    id: "d-f010",
    kind: "classify",
    skillIds: ["f-argument"],
    difficulty: 3,
    prompt:
      "The planning commission heard three hours of testimony on the rezoning. Supporters cited new jobs; opponents cited heavier traffic. The commission delayed its vote. What kind of passage is this?",
    choices: ["Explanation", "Report", "Description", "Argument"],
    correctIndex: 1,
    explanation:
      "This is a report, and it is designed to tempt you toward ‘argument’ because arguments appear inside it — the supporters and opponents each argued their side. But the passage itself is not making any of those arguments; it is neutrally telling you that they were made. Always classify the passage, not the people quoted in it: since the author takes no side and draws no conclusion, this is a report.",
    ...V1,
  },

  // ==================================================================
  // f-premise-conclusion — d-f011–022: identify premises, conclusions,
  // and intermediate conclusions.
  // ==================================================================
  {
    id: "d-f011",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 1,
    prompt:
      "The town should build a bike lane on Elm Street. Traffic studies show Elm has the highest collision rate downtown, and cyclists currently have no protected route. Which sentence states the main conclusion?",
    choices: [
      "The town should build a bike lane on Elm Street.",
      "Traffic studies show Elm has the highest collision rate downtown.",
      "Cyclists currently have no protected route.",
    ],
    correctIndex: 0,
    explanation:
      "The main conclusion is the claim everything else is trying to support — here, that the town should build the bike lane. The collision statistics and the lack of a protected route are premises: they are the reasons offered to convince you the lane is needed. A reliable habit is to ask, 'What is the author trying to get me to believe or do?' That sentence is the conclusion; everything backing it up is a premise.",
    ...V1,
  },
  {
    id: "d-f012",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 1,
    prompt:
      "The orchestra's donor base is aging. The orchestra should start a youth outreach program, since the outreach would fill empty seats and build future donors. Which sentence states the main conclusion?",
    choices: [
      "The orchestra's donor base is aging.",
      "The orchestra should start a youth outreach program.",
      "The outreach would fill empty seats and build future donors.",
    ],
    correctIndex: 1,
    explanation:
      "The main conclusion is the recommendation that the orchestra should start a youth outreach program. The aging donor base explains why action is needed, and the filled seats and future donors explain why this particular action would work — both are premises supporting the recommendation. Conclusions often contain recommendation language like 'should,' 'must,' or 'ought to,' which is a useful early clue while you build the habit.",
    ...V1,
  },
  {
    id: "d-f013",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 1,
    prompt:
      "The library will close early on Fridays. Staffing costs rose this year, so the board cut Friday hours, which means the study rooms will be unavailable after 5. Which claim is the intermediate conclusion — the one that is supported by a premise AND used to support the final conclusion?",
    choices: [
      "Staffing costs rose this year.",
      "The library will close early on Fridays.",
      "The board cut Friday hours.",
    ],
    correctIndex: 2,
    explanation:
      "The intermediate conclusion is 'the board cut Friday hours.' It is supported by the premise about rising staffing costs — that is why the board acted — and it in turn supports the final conclusion that the library will close early, since cut hours cause early closing. Intermediate conclusions sit in the middle of the chain: they are conclusions relative to what comes before them and premises relative to what follows.",
    ...V1,
  },
  {
    id: "d-f014",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 1,
    prompt:
      "Jun should replace the warehouse roof now. The last inspection found soft spots in three sections. Delaying will only raise the repair estimate. Which claim is offered as a reason (premise) rather than the conclusion?",
    choices: [
      "The last inspection found soft spots in three sections.",
      "The roof has needed work for years.",
      "Jun should replace the warehouse roof now.",
    ],
    correctIndex: 0,
    explanation:
      "The premise is the inspection finding about soft spots — it is a factual reason offered to support the recommendation that Jun replace the roof now. The third choice is the conclusion itself (the 'should' recommendation), and the second choice never appears in the passage at all. When hunting for premises, look for the factual claims that do the supporting work rather than the claim being supported.",
    ...V1,
  },
  {
    id: "d-f015",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 2,
    prompt:
      "Since remote work reduced downtown foot traffic, the café should open a weekend stall at the farmers' market. The stall would reach new customers, and market shoppers already buy coffee there. Which is the main conclusion?",
    choices: [
      "Remote work reduced downtown foot traffic.",
      "The café should open a weekend stall at the farmers' market.",
      "Market shoppers already buy coffee there.",
    ],
    correctIndex: 1,
    explanation:
      "The main conclusion is the recommendation to open the weekend stall. The drop in foot traffic explains the problem, and the new customers and coffee-buying shoppers explain why the stall is a good solution — those are premises. Note that the conclusion sits in the middle of the passage here, so do not assume the conclusion is always first or last. Follow the support: every other sentence exists to back up the stall recommendation.",
    ...V1,
  },
  {
    id: "d-f016",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 2,
    prompt:
      "Ridership east of the harbor dropped 40 percent. The ferry company will end service to the island, so islanders must take the bridge bus instead. Which claim is the intermediate conclusion?",
    choices: [
      "Ridership east of the harbor dropped 40 percent.",
      "Islanders must take the bridge bus instead.",
      "The ferry company will end service to the island.",
    ],
    correctIndex: 2,
    explanation:
      "The intermediate conclusion is that the ferry company will end service to the island. The 40 percent ridership drop is the premise supporting that decision, and the ended service is then used as the reason islanders must take the bridge bus — the final conclusion. Think of it as a relay: the ridership fact passes support to the service cut, which passes support to the bus requirement.",
    ...V1,
  },
  {
    id: "d-f017",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 2,
    prompt:
      "The museum's new exhibit deserves its grant. Attendance doubled during preview week, and school group bookings hit a record. Which is the main conclusion?",
    choices: [
      "The museum's new exhibit deserves its grant.",
      "School group bookings hit a record.",
      "Attendance doubled during preview week.",
    ],
    correctIndex: 0,
    explanation:
      "The main conclusion is the evaluative judgment that the exhibit deserves its grant. Doubled attendance and record school bookings are premises — evidence offered to justify that judgment. Evaluative words like 'deserves' often mark conclusions, because facts alone rarely contain evaluation; someone is drawing a conclusion from the facts. The facts do the supporting, and the judgment is what they support.",
    ...V1,
  },
  {
    id: "d-f018",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 2,
    prompt:
      "The data center should switch to the new cooling system. The current system uses 30 percent more electricity, and local power rates rise every summer. Which claim is a premise?",
    choices: [
      "The data center should switch to the new cooling system.",
      "Local power rates rise every summer.",
      "The new system will pay for itself within a year.",
    ],
    correctIndex: 1,
    explanation:
      "The premise is the factual claim that local power rates rise every summer — it is one of the reasons supporting the switch. The first choice is the conclusion (the 'should' recommendation), and the third choice is a plausible-sounding claim that the passage never makes. Be careful with attractive invented choices: a premise must actually appear in the passage and actually do supporting work.",
    ...V1,
  },
  {
    id: "d-f019",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 3,
    prompt:
      "The team lost its two senior engineers. The launch will therefore slip past the holiday window, so the company should revise its sales forecast. Which is the intermediate conclusion?",
    choices: [
      "The company should revise its sales forecast.",
      "The team lost its two senior engineers.",
      "The launch will slip past the holiday window.",
    ],
    correctIndex: 2,
    explanation:
      "The intermediate conclusion is that the launch will slip past the holiday window. Losing the engineers is the premise that supports it, and the slipped launch is then the reason the company should revise its forecast — the final conclusion. The word 'therefore' is a helpful flag here: it typically introduces a conclusion, and since this one goes on to support a further recommendation, it is intermediate rather than final.",
    ...V1,
  },
  {
    id: "d-f020",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 3,
    prompt:
      "The council should reject the marina proposal. Dredging would disturb the heron nesting grounds, and without the herons, the estuary tour operators would lose their main attraction. Which is the main conclusion?",
    choices: [
      "The council should reject the marina proposal.",
      "Dredging would disturb the heron nesting grounds.",
      "The estuary tour operators would lose their main attraction.",
    ],
    correctIndex: 0,
    explanation:
      "The main conclusion is the recommendation that the council reject the marina. The dredging harm and the tour operators' loss are premises, and notice they form a small chain of their own: dredging disturbs the herons, which hurts the operators, which is why the council should reject the proposal. Even when premises link together, the claim they are all ultimately serving — the rejection — is the main conclusion.",
    ...V1,
  },
  {
    id: "d-f021",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 3,
    prompt:
      "Homeowners near the quarry report cracked foundations, and the blasting schedule matches the damage timeline. The quarry company must reinforce its vibration controls. Which is the main conclusion?",
    choices: [
      "The blasting schedule matches the damage timeline.",
      "The quarry company must reinforce its vibration controls.",
      "Homeowners near the quarry report cracked foundations.",
    ],
    correctIndex: 1,
    explanation:
      "The main conclusion is the demand that the quarry company reinforce its vibration controls. The cracked foundations and the matching blasting schedule are the evidence offered to justify that demand. This one is harder because there are no indicator words at all — no 'therefore' or 'because' — so you must rely purely on the logic: the first two sentences give reasons, and the last sentence is the action those reasons are meant to justify.",
    ...V1,
  },
  {
    id: "d-f022",
    kind: "identify",
    skillIds: ["f-premise-conclusion"],
    difficulty: 3,
    prompt:
      "Only certified pilots may fly the survey drones, because the insurance policy voids coverage for uncertified operators. Which claim functions as the premise?",
    choices: [
      "Only certified pilots may fly the survey drones.",
      "Survey drones are expensive to insure.",
      "The insurance policy voids coverage for uncertified operators.",
    ],
    correctIndex: 2,
    explanation:
      "The premise is the insurance fact — the policy voids coverage for uncertified operators — because it is the reason given for the rule that only certified pilots may fly. The word 'because' directly flags it. The rule itself is the conclusion: it is the claim being justified. The second choice is invented and unsupported. In short passages like this, the sentence after 'because' is almost always doing the premise work.",
    ...V1,
  },

  // ==================================================================
  // f-indicators — d-f023–032: does the word signal a premise, a
  // conclusion, or is it not functioning as an indicator here?
  // ==================================================================
  {
    id: "d-f023",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 1,
    prompt:
      "The bridge is closed; therefore, commuters must use the tunnel. In this sentence, the word 'therefore' is …",
    choices: ["A conclusion indicator", "Not functioning as an indicator", "A premise indicator"],
    correctIndex: 0,
    explanation:
      "'Therefore' is a classic conclusion indicator: it announces that what follows is the claim being supported — here, that commuters must use the tunnel. The closed bridge is the premise doing the supporting. Conclusion indicators point forward to the conclusion the way an arrow points at its target; ‘therefore,’ ‘thus,’ ‘hence,’ and ‘so’ (in its therefore-sense) all play this role.",
    ...V1,
  },
  {
    id: "d-f024",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 1,
    prompt:
      "Because the soil stayed dry, the seeds failed to sprout. In this sentence, the word 'because' is …",
    choices: ["Not functioning as an indicator", "A premise indicator", "A conclusion indicator"],
    correctIndex: 1,
    explanation:
      "'Because' is a classic premise indicator: it introduces the reason or evidence — the dry soil — that supports the claim that the seeds failed to sprout. Premise indicators point backward or forward to the support: ‘because,’ ‘since’ (in its reason-sense), ‘for,’ and ‘after all’ all introduce the grounds for a claim rather than the claim itself.",
    ...V1,
  },
  {
    id: "d-f025",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 2,
    prompt:
      "The shelter has taken in stray dogs since 2011. In this sentence, the word 'since' is …",
    choices: ["A premise indicator", "A conclusion indicator", "Not functioning as an indicator"],
    correctIndex: 2,
    explanation:
      "Here ‘since’ is not functioning as an indicator at all — it marks time (‘from 2011 until now’), not a reason. This is the classic ‘since’ misfire: the same word can introduce a premise (‘since the roof leaks, we need repairs’) or a time span (‘since 2011’). Never classify by the word alone; always check what job it is doing in the sentence. Here it is doing a calendar‘s job, not a logician‘s.",
    ...V1,
  },
  {
    id: "d-f026",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 2,
    prompt:
      "The reservoir fell to 30 percent, and thus the council declared water restrictions. In this sentence, the word 'thus' is …",
    choices: ["A conclusion indicator", "Not functioning as an indicator", "A premise indicator"],
    correctIndex: 0,
    explanation:
      "'Thus' is a conclusion indicator: it signals that the declaration of water restrictions is the conclusion drawn from the reservoir‘s low level. Like ‘therefore’ and ‘hence,’ it tells you the supported claim is coming next. Do not be distracted by the fact that the conclusion here is an action rather than a belief — conclusions can be recommendations and decisions, and indicators flag them just the same.",
    ...V1,
  },
  {
    id: "d-f027",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 2,
    prompt:
      "As the storm approached, the harbor master closed the marina. In this sentence, the word 'as' is …",
    choices: ["A conclusion indicator", "Not functioning as an indicator", "A premise indicator"],
    correctIndex: 1,
    explanation:
      "Here ‘as’ is not functioning as an indicator — it means ‘while’ or ‘at the time that,’ describing when the marina was closed. ‘As’ can be a premise indicator in its reason-sense (‘as the engine was old, it failed’), which makes this a genuine misfire. The test is always the same: is the word introducing a reason for a claim, or just setting the scene? Here it is just setting the scene.",
    ...V1,
  },
  {
    id: "d-f028",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 2,
    prompt:
      "The clinic hired two nurses, for the patient load had doubled. In this sentence, the word 'for' is …",
    choices: ["A conclusion indicator", "Not functioning as an indicator", "A premise indicator"],
    correctIndex: 2,
    explanation:
      "'For' is a premise indicator here, used in its old-fashioned ‘because’ sense: the doubled patient load is the reason supporting the hiring decision. This is a favorite LSAT trick because ‘for’ more often marks purpose (‘a gift for you’) or duration. When ‘for’ sits between two clauses and can be swapped with ‘because’ without changing the meaning, it is flagging a premise.",
    ...V1,
  },
  {
    id: "d-f029",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 3,
    prompt:
      "The final bid came in double the budget. It follows that the original estimate was too low. In this sentence, the phrase 'it follows that' is …",
    choices: ["A conclusion indicator", "Not functioning as an indicator", "A premise indicator"],
    correctIndex: 0,
    explanation:
      "'It follows that' is a conclusion indicator: it presents the low estimate as the claim derived from the bid evidence. The phrase is explicit about the logic — the conclusion ‘follows from’ the premise the way a theorem follows from axioms. Longer indicator phrases like this one, ‘we may infer that,’ and ‘this shows that’ all do the same job as the short words ‘therefore’ and ‘thus.’",
    ...V1,
  },
  {
    id: "d-f030",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 3,
    prompt:
      "Her essay used the word 'since' in every paragraph. In this sentence, the word 'since' is …",
    choices: ["A conclusion indicator", "Not functioning as an indicator", "A premise indicator"],
    correctIndex: 1,
    explanation:
      "Here ‘since’ is not functioning as an indicator because it is being mentioned rather than used — the sentence is about the word itself, like a specimen in a display case. Philosophers call this the use-mention distinction: using ‘since’ to give a reason differs from mentioning the word ‘since’ as a topic. When a sentence talks about language instead of using language to reason, no indicator work is happening.",
    ...V1,
  },
  {
    id: "d-f031",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 3,
    prompt:
      "The team should skip the morning session. The reservoir of goodwill was already at half capacity, after all. In this sentence, the phrase 'after all' is …",
    choices: ["A conclusion indicator", "Not functioning as an indicator", "A premise indicator"],
    correctIndex: 2,
    explanation:
      "'After all' is a premise indicator: it introduces the depleted goodwill as the supporting reason for skipping the session, typically with a tone of ‘this should already be obvious.’ It works like ‘because’ or ‘for,’ flagging the grounds rather than the claim. Do not confuse it with ‘after’ in its time-sense; the full phrase ‘after all’ is what carries the indicator meaning.",
    ...V1,
  },
  {
    id: "d-f032",
    kind: "classify",
    skillIds: ["f-indicators"],
    difficulty: 3,
    prompt:
      "The contractor finished early, so the owners moved in ahead of schedule. In this sentence, the word 'so' is …",
    choices: ["A conclusion indicator", "Not functioning as an indicator", "A premise indicator"],
    correctIndex: 0,
    explanation:
      "'So' is a conclusion indicator here, equivalent to ‘therefore’: the early finish is the premise, and the early move-in is the conclusion it supports. ‘So’ is the most common indicator on the LSAT and also the most misfire-prone — it can mark degree (‘so tall that…’) or purpose. The check: can you replace it with ‘therefore’ without breaking the sentence? Here you can, which confirms it is flagging a conclusion.",
    ...V1,
  },

  // ==================================================================
  // f-structure — d-f033–044: evidence → bridge → conclusion; spotting
  // intermediate conclusions and the bridging work between claims.
  // ==================================================================
  {
    id: "d-f033",
    kind: "order",
    skillIds: ["f-structure"],
    difficulty: 1,
    prompt:
      "Put these claims in logical order, from evidence to bridge to conclusion. (A) The bakery should open a second location. (B) Saturday lines stretch out the door. (C) The long lines mean demand exceeds what one shop can serve.",
    choices: ["B → C → A", "A → B → C", "C → A → B"],
    correctIndex: 0,
    explanation:
      "The logical order is B → C → A. Start with the raw evidence: Saturday lines stretch out the door (B). The bridge (C) interprets that evidence — the lines mean demand exceeds one shop's capacity — connecting the fact to the decision. The conclusion (A) is the recommendation the bridge justifies. Arguments flow from facts, through the reasoning that links them, to the claim they support.",
    ...V1,
  },
  {
    id: "d-f034",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 1,
    prompt:
      "Riverside's library fines brought in $8,000 last year. That revenue covers the entire children's program budget, so the council should keep the fine system. Which sentence does the bridging work — linking the evidence to the conclusion?",
    choices: [
      "Riverside's library fines brought in $8,000 last year.",
      "That revenue covers the entire children's program budget.",
      "The council should keep the fine system.",
    ],
    correctIndex: 1,
    explanation:
      "The bridge is 'That revenue covers the entire children's program budget.' The $8,000 figure is raw evidence — it does not by itself say anything about whether fines are good. The bridge interprets the evidence, showing why it matters: the money funds the children's program. That interpretation is what connects the fact to the conclusion that fines should stay. Bridges turn data into reasons.",
    ...V1,
  },
  {
    id: "d-f035",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 1,
    prompt:
      "The plant closed because orders fell. With the closure, unemployment rose, so the mayor declared an economic emergency. Which claim is the intermediate conclusion?",
    choices: [
      "The mayor declared an economic emergency.",
      "The plant closed because orders fell.",
      "Unemployment rose.",
    ],
    correctIndex: 2,
    explanation:
      "The intermediate conclusion is 'Unemployment rose.' It is supported by the premise about the plant closure and orders falling, and it is then used to support the final conclusion — the mayor's emergency declaration. Notice the chain: each claim hands support to the next one. When you can trace this handoff from evidence through a middle claim to a final conclusion, you have mapped the argument's structure.",
    ...V1,
  },
  {
    id: "d-f036",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 2,
    prompt:
      "Jury pools drawn only from voter rolls skew older. Older jurors differ systematically from the community, so courts should pull names from tax and DMV records too. Which sentence is the bridge?",
    choices: [
      "Older jurors differ systematically from the community.",
      "Courts should pull names from tax and DMV records too.",
      "Jury pools drawn only from voter rolls skew older.",
    ],
    correctIndex: 0,
    explanation:
      "The bridge is 'Older jurors differ systematically from the community.' The skew toward older jurors is just a demographic fact — it becomes a reason to change the system only once you add that older jurors differ from the community, which makes the skew a fairness problem. The bridge supplies the missing evaluative link between the fact and the recommendation. Without it, the evidence would not point at the conclusion.",
    ...V1,
  },
  {
    id: "d-f037",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 2,
    prompt:
      "The trailhead lot overflows every weekend. Overflow parking damages the meadow, which is why the rangers now require reservations. Which claim is the intermediate conclusion?",
    choices: [
      "The trailhead lot overflows every weekend.",
      "Overflow parking damages the meadow.",
      "The rangers now require reservations.",
    ],
    correctIndex: 1,
    explanation:
      "The intermediate conclusion is 'Overflow parking damages the meadow.' The overflowing lot is the evidence for it, and it is then the reason the rangers require reservations — the final conclusion. A common mistake is to treat the first sentence as the main point, but the passage's real destination is the reservation policy; everything else exists to justify it, with the meadow damage as the crucial middle step.",
    ...V1,
  },
  {
    id: "d-f038",
    kind: "order",
    skillIds: ["f-structure"],
    difficulty: 2,
    prompt:
      "Put these claims in logical order, from evidence to intermediate conclusion to main conclusion. (A) The city should fund the shelter's expansion. (B) Intake requests rose 60 percent this year. (C) The shelter will turn families away by winter.",
    choices: ["A → C → B", "B → C → A", "C → B → A"],
    correctIndex: 1,
    explanation:
      "The logical order is B → C → A. The 60 percent rise in intake requests (B) is the evidence. The prediction that the shelter will turn families away (C) is the intermediate conclusion drawn from that evidence — it is a claim the evidence supports, and it also serves as a reason for the final step. The funding recommendation (A) is the main conclusion everything builds toward. Mapping this chain is the core skill of structural analysis.",
    ...V1,
  },
  {
    id: "d-f039",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 2,
    prompt:
      "The harvest was the largest in a decade. Record yields pushed prices down, so the co-op's revenue actually fell, and the board should approve the export contract. Which is the main conclusion?",
    choices: [
      "The board should approve the export contract.",
      "The harvest was the largest in a decade.",
      "The co-op's revenue actually fell.",
    ],
    correctIndex: 0,
    explanation:
      "The main conclusion is the recommendation that the board approve the export contract. The record harvest is the evidence, and the fallen revenue is the intermediate conclusion — supported by the harvest facts and supporting the contract recommendation. Do not be fooled by the surprising twist that revenue fell despite a big harvest; the twist is a middle step, not the destination. The destination is always the claim everything else serves.",
    ...V1,
  },
  {
    id: "d-f040",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 3,
    prompt:
      "Night deliveries wake residents on Pine Street. Sleep disruption lowers property values over time, so the council should ban truck traffic after 10 p.m. Which sentence does the bridging work?",
    choices: [
      "Night deliveries wake residents on Pine Street.",
      "Sleep disruption lowers property values over time.",
      "The council should ban truck traffic after 10 p.m.",
    ],
    correctIndex: 1,
    explanation:
      "The bridge is 'Sleep disruption lowers property values over time.' Waking residents is a fact, but a fact about lost sleep does not automatically justify a truck ban — the bridge converts it into an economic harm, falling property values, which is the kind of harm councils act on. The bridge is often a general principle or a consequence-claim that connects the specific evidence to the conclusion's stakes. Finding it is how you see why the argument thinks its evidence matters.",
    ...V1,
  },
  {
    id: "d-f041",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 3,
    prompt:
      "The software migration failed twice. Each failure corrupted client records, which is why the firm lost two major accounts, so the partners must hire outside consultants. Which claim is the intermediate conclusion?",
    choices: [
      "The partners must hire outside consultants.",
      "The software migration failed twice.",
      "The firm lost two major accounts.",
    ],
    correctIndex: 2,
    explanation:
      "The intermediate conclusion is 'The firm lost two major accounts.' The failed migrations and corrupted records support it, and it supports the final recommendation to hire consultants. This passage has a four-link chain — failures, corrupted records, lost accounts, hire consultants — and the question asks you to find the link that both receives and passes support. Tracing chains like this, link by link, is exactly what structural questions on the LSAT demand.",
    ...V1,
  },
  {
    id: "d-f042",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 3,
    prompt:
      "The bakery's flour supplier raised prices 20 percent. Higher ingredient costs shrink margins across the menu, so the owner must raise prices or cut hours. Which sentence does the bridging work?",
    choices: [
      "Higher ingredient costs shrink margins across the menu.",
      "The owner must raise prices or cut hours.",
      "The bakery's flour supplier raised prices 20 percent.",
    ],
    correctIndex: 0,
    explanation:
      "The bridge is 'Higher ingredient costs shrink margins across the menu.' The 20 percent flour increase is a single fact; the bridge generalizes it into a principle about ingredient costs and margins, which is what makes the price-or-hours dilemma follow. Bridges often move from the specific to the general. When you can name the generalization an argument is relying on, you have found the exact spot where the argument is most vulnerable to attack.",
    ...V1,
  },
  {
    id: "d-f043",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 3,
    prompt:
      "The new vaccine cut infections by half in the trial county. Neighboring counties without the program saw no decline, so health officials should expand the program statewide. Which claim is the key evidence?",
    choices: [
      "Health officials should expand the program statewide.",
      "The new vaccine cut infections by half in the trial county.",
      "Neighboring counties without the program saw no decline.",
    ],
    correctIndex: 1,
    explanation:
      "The key evidence is the halved infection rate in the trial county — the core fact the whole argument rests on. The neighboring counties' lack of decline is supporting evidence too, but it plays a secondary role: it rules out the alternative explanation that infections were falling everywhere anyway. The statewide expansion is the conclusion. Distinguishing the load-bearing evidence from the auxiliary evidence is what lets you evaluate whether an argument's foundation is solid.",
    ...V1,
  },
  {
    id: "d-f044",
    kind: "identify",
    skillIds: ["f-structure"],
    difficulty: 3,
    prompt:
      "The river's trout count fell three years running. Biologists blame warmer water, and the anglers' association expects the autumn tournament to draw half its usual crowd, so the town should delay the derby. Which claim is the intermediate conclusion?",
    choices: [
      "The town should delay the derby.",
      "The river's trout count fell three years running.",
      "The autumn tournament will draw half its usual crowd.",
    ],
    correctIndex: 2,
    explanation:
      "The intermediate conclusion is the prediction about the tournament drawing half its usual crowd. The falling trout count and the biologists' explanation support that prediction, and the prediction supports the final recommendation to delay the derby. Note that the biologists' blame is itself a small sub-argument nested inside the larger one — real arguments often contain these nested supports, and mapping them without getting lost is the advanced structural skill.",
    ...V1,
  },

  // ==================================================================
  // f-assumption — d-f045–056: find the unstated gap; necessary vs
  // sufficient vs merely helpful.
  // ==================================================================
  {
    id: "d-f045",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 1,
    prompt:
      "The city should repaint the crosswalks. The current paint is so faded that drivers cannot see the markings. What is the argument assuming?",
    choices: [
      "Visible crosswalks make drivers more likely to yield to pedestrians.",
      "Crosswalk paint is the city's largest road expense.",
      "Drivers dislike faded paint.",
    ],
    correctIndex: 0,
    explanation:
      "The argument assumes that visible crosswalks make drivers more likely to yield — that is the unstated link between 'repaint the crosswalks' and the goal of safer streets. Without it, the faded paint would just be ugly, not dangerous, and repainting would not be justified. An assumption is the missing piece the argument needs to get from its premises to its conclusion; here the gap is between visible markings and actual safety.",
    ...V1,
  },
  {
    id: "d-f046",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 1,
    prompt:
      "Mara will win the grant. Her proposal scored highest in every category. What is the argument assuming?",
    choices: [
      "The judges liked Mara personally.",
      "The grant goes to the highest-scoring proposal.",
      "Mara's proposal was well written.",
    ],
    correctIndex: 1,
    explanation:
      "The argument assumes the grant goes to the highest-scoring proposal — the rule connecting 'scored highest' to 'will win.' Without that rule, a top score is just a nice number with no bearing on the outcome. This is the most common assumption pattern: the argument treats some evidence as decisive without stating the rule that makes it decisive. Finding that unstated rule is the whole game of assumption questions.",
    ...V1,
  },
  {
    id: "d-f047",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 2,
    prompt:
      "The software must be secure, because it passed the independent audit. Which of the following must be true for this argument to work?",
    choices: [
      "Secure software always passes this audit.",
      "The audit was the most expensive option available.",
      "If software passes the audit, then it is secure.",
    ],
    correctIndex: 2,
    explanation:
      "The argument must assume that passing the audit guarantees security — that is the necessary link between the premise and the conclusion. The first choice reverses the direction: it says security leads to passing, but the argument needs passing to lead to security, so it does not help. The second choice is irrelevant. When checking necessity, use the denial test: if passing the audit did NOT guarantee security, the argument would collapse, which proves the assumption is required.",
    ...V1,
  },
  {
    id: "d-f048",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 2,
    prompt:
      "The restaurant will thrive because the location gets heavy foot traffic. What is the argument assuming?",
    choices: [
      "Heavy foot traffic turns into paying customers.",
      "The restaurant's food is excellent.",
      "The location has low rent.",
    ],
    correctIndex: 0,
    explanation:
      "The argument assumes heavy foot traffic turns into paying customers — the bridge between 'many passersby' and 'a thriving restaurant.' Foot traffic alone does not pay the bills; only customers do. The excellent food and low rent would both be helpful, but the argument does not need them — it needs the link it actually relies on. Distinguishing what an argument needs from what would merely help it is a crucial assumption skill.",
    ...V1,
  },
  {
    id: "d-f049",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 2,
    prompt:
      "The dam will hold, since engineers inspected it last spring. What is the argument assuming?",
    choices: [
      "The dam was built to modern standards.",
      "No structural damage occurred after the inspection.",
      "The engineers were the most qualified available.",
    ],
    correctIndex: 1,
    explanation:
      "The argument assumes no structural damage occurred after the inspection. A clean inspection last spring says nothing about what has happened since — a flood, an earthquake, or simple wear could have changed everything. The argument needs the bridge across time: that the inspected condition still holds today. The engineers' qualifications and the dam's original standards would be nice to know, but the time gap is the hole the argument actually falls through.",
    ...V1,
  },
  {
    id: "d-f050",
    kind: "identify",
    skillIds: ["f-assumption", "f-conditional"],
    difficulty: 2,
    prompt:
      "If the bridge is icy, the race is canceled. The race was canceled. What extra assumption would make 'the bridge was icy' definitely follow?",
    choices: [
      "Icy bridges are dangerous for runners.",
      "The race is rarely canceled.",
      "Only an icy bridge could have canceled the race.",
    ],
    correctIndex: 2,
    explanation:
      "The needed assumption is 'Only an icy bridge could have canceled the race.' The premises give you 'icy bridge leads to cancellation' and 'cancellation happened,' but many things can cause a cancellation — you need the extra rule that ice was the only possible cause. This is a sufficient assumption: it does not have to be true in real life, but adding it would make the conclusion airtight. Icy bridges being dangerous explains why ice cancels races, but it does not prove ice was the cause this time.",
    ...V1,
  },
  {
    id: "d-f051",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 3,
    prompt:
      "The CEO's cost-cutting plan will work here because it worked at her previous company. What is the argument assuming?",
    choices: [
      "The two companies are similar in the ways that matter for the plan.",
      "The plan cut costs by 20 percent at the previous company.",
      "The CEO is a talented manager.",
    ],
    correctIndex: 0,
    explanation:
      "The argument assumes the two companies are relevantly similar — the same costs, the same structure, the same conditions that made the plan work before. Without that similarity, the previous success is just a story about a different company. The 20 percent figure would strengthen the argument by showing the plan worked well, but the argument does not need the exact number — it needs the situations to be comparable. Analogy arguments always hide a similarity assumption.",
    ...V1,
  },
  {
    id: "d-f052",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 3,
    prompt:
      "We should hire Luis. He has the most experience of any applicant. What is the argument assuming?",
    choices: [
      "The other applicants have no experience.",
      "Job performance in this role depends mainly on experience.",
      "Luis interviewed well.",
    ],
    correctIndex: 1,
    explanation:
      "The argument assumes job performance here depends mainly on experience — the rule that turns 'most experience' into 'best hire.' If the role actually rewards creativity or teamwork more than years served, the most experienced applicant might be the wrong pick. The interview performance would be a helpful extra reason, but the argument as written stands or falls on the experience-equals-quality link. Always ask: what rule would make this evidence point at this conclusion?",
    ...V1,
  },
  {
    id: "d-f053",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 3,
    prompt:
      "The museum's attendance will rise because admission is now free. What is the argument assuming?",
    choices: [
      "The museum's exhibits are interesting.",
      "Free museums always draw crowds.",
      "Potential visitors were staying away mainly because of the admission price.",
    ],
    correctIndex: 2,
    explanation:
      "The argument assumes potential visitors were staying away mainly because of the admission price. Free admission only boosts attendance if price was the barrier keeping people out — if visitors were actually deterred by parking, hours, or boring exhibits, the price cut changes nothing. The interesting exhibits would be helpful, but the argument's logic specifically needs price to have been the obstacle. Causal arguments always assume the stated cause was the operative one.",
    ...V1,
  },
  {
    id: "d-f054",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 3,
    prompt:
      "The vaccine is safe, because no trial participant had a serious reaction. Which assumption is NECESSARY for this argument?",
    choices: [
      "The trial was large enough and long enough to detect serious reactions.",
      "Vaccines are generally safe.",
      "The trial participants were all healthy adults.",
    ],
    correctIndex: 0,
    explanation:
      "The necessary assumption is that the trial was large and long enough to detect serious reactions. If the trial had twelve people and lasted a week, zero reactions would prove nothing — the absence of evidence would not be evidence of absence. Apply the denial test: deny this assumption, and the argument collapses, which is the mark of necessity. The general safety of vaccines would be merely helpful background, not something the argument's logic requires.",
    ...V1,
  },
  {
    id: "d-f055",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 3,
    prompt:
      "The new coach will improve the team, since she won championships with her last two teams. What is the argument assuming?",
    choices: [
      "Championship teams always keep winning.",
      "This team's players can execute the coach's system.",
      "The coach is popular with fans.",
    ],
    correctIndex: 1,
    explanation:
      "The argument assumes this team's players can execute the coach's system — that the talent and fit transfer along with the coach. Past championships show she can coach, but coaching only improves a team whose players can run her schemes. Fan popularity is irrelevant, and the claim that championship teams always keep winning is far stronger than needed. The gap is specific: the argument moves from 'she succeeded elsewhere' to 'she will succeed here,' and only transferable conditions bridge it.",
    ...V1,
  },
  {
    id: "d-f056",
    kind: "identify",
    skillIds: ["f-assumption"],
    difficulty: 3,
    prompt:
      "This laptop is reliable because it carries a three-year warranty. Which of the following is NECESSARY for the argument?",
    choices: [
      "The warranty covers all parts and labor.",
      "Three years is the longest warranty available.",
      "Manufacturers do not offer long warranties on products they expect to fail.",
    ],
    correctIndex: 2,
    explanation:
      "The necessary assumption is that manufacturers do not offer long warranties on products they expect to fail. The argument treats the warranty as a signal of reliability, and that signal means nothing if companies hand out long warranties on duds. Deny it — imagine manufacturers warranty everything for three years regardless — and the conclusion loses all support. Full parts coverage would make the warranty nicer, but the argument needs the signaling link, not the fine print.",
    ...V1,
  },

  // ==================================================================
  // f-deduction — d-f057–066: what MUST follow from these premises?
  // ==================================================================
  {
    id: "d-f057",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 1,
    prompt:
      "Premises: All city buses have fare boxes. Route 9 is a city bus. What must follow?",
    choices: [
      "Route 9 has a fare box.",
      "Route 9 runs on time.",
      "All fare boxes are on city buses.",
    ],
    correctIndex: 0,
    explanation:
      "Route 9 must have a fare box. The first premise puts every city bus inside the group of things with fare boxes, and the second premise puts Route 9 inside the group of city buses — so Route 9 lands inside the fare-box group. That is all the premises guarantee. They say nothing about punctuality, and 'all buses have fare boxes' does not mean 'only buses have fare boxes,' so the reversed claim does not follow.",
    ...V1,
  },
  {
    id: "d-f058",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 1,
    prompt:
      "Premises: No volunteers arrived before noon. Sam is a volunteer. What must follow?",
    choices: [
      "Sam arrived after noon.",
      "Sam did not arrive before noon.",
      "Sam was the last volunteer to arrive.",
    ],
    correctIndex: 1,
    explanation:
      "'Sam did not arrive before noon' must follow. The premise rules out every volunteer from the before-noon group, and Sam is a volunteer, so Sam is ruled out too. Notice the careful wording: 'did not arrive before noon' is not the same as 'arrived after noon' — Sam might never have arrived at all. Deduction rewards this precision: claim exactly what the premises force, and not one word more.",
    ...V1,
  },
  {
    id: "d-f059",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 2,
    prompt:
      "Premises: Every bakery on Main Street closes on Mondays. Crumb & Craft is on Main Street. What must follow?",
    choices: [
      "Crumb & Craft is a bakery.",
      "Crumb & Craft closes on Mondays.",
      "If Crumb & Craft is a bakery, then it closes on Mondays.",
    ],
    correctIndex: 2,
    explanation:
      "Only the conditional claim must follow. The premises tell us about bakeries on Main Street, but they never tell us Crumb & Craft is a bakery — it could be a bookstore. So we cannot conclude it closes on Mondays outright, and we certainly cannot conclude it is a bakery. What we can conclude is the guarded version: IF it is a bakery, the Monday rule applies. This is the classic trap of smuggling in an unstated membership claim.",
    ...V1,
  },
  {
    id: "d-f060",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 2,
    prompt:
      "Premises: Most council members opposed the plan. The plan needed a majority of the council to pass. What must follow?",
    choices: [
      "The plan did not pass.",
      "The plan was unpopular with residents.",
      "Every council member voted on the plan.",
    ],
    correctIndex: 0,
    explanation:
      "The plan must not have passed. 'Most' means more than half, so most opposition means a majority opposed — and a plan that needs majority support cannot survive majority opposition. The premises say nothing about whether every member voted or what residents think, so those claims overreach. The key move is translating 'most' into 'more than half' and letting the arithmetic do the work.",
    ...V1,
  },
  {
    id: "d-f061",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 2,
    prompt:
      "Premises: Only members may use the pool. Dana used the pool. What must follow?",
    choices: [
      "Members always use the pool.",
      "Dana is a member.",
      "Dana used the pool legally.",
    ],
    correctIndex: 1,
    explanation:
      "Dana must be a member. 'Only members may use the pool' means pool use is restricted to members — anyone using the pool is therefore a member. Note the direction: membership is necessary for pool use, not the other way around, so we cannot conclude that members always use the pool. And 'legally' adds a judgment the premises never make; perhaps Dana snuck in. Deduction sticks to exactly what the premises license.",
    ...V1,
  },
  {
    id: "d-f062",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 2,
    prompt:
      "Premises: The store refunds any item returned within 30 days. Priya returned the lamp after 45 days. What must follow?",
    choices: [
      "Priya cannot get a refund anywhere.",
      "The store will not refund the lamp.",
      "The stated policy does not guarantee Priya a refund.",
    ],
    correctIndex: 2,
    explanation:
      "All that must follow is that the policy does not guarantee Priya a refund. The policy promises refunds for returns within 30 days; a 45-day return falls outside the promise, so no refund is owed under the stated rule. But the store might still refund it out of goodwill — the premises do not forbid that. Denying the antecedent never proves the opposite outcome; it only removes the guarantee.",
    ...V1,
  },
  {
    id: "d-f063",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 3,
    prompt:
      "Premises: All of the chef's signature dishes contain garlic. The special tonight is not a signature dish. What must follow?",
    choices: [
      "The premises do not establish whether the special contains garlic.",
      "The special contains garlic.",
      "The special does not contain garlic.",
    ],
    correctIndex: 0,
    explanation:
      "Nothing about the special's garlic content follows. The premise tells us what is true of signature dishes, and the special is explicitly not one — so the rule simply does not apply to it. This is the negation trap: from 'all signature dishes have garlic' people infer 'non-signature dishes lack garlic,' but the premise never says garlic is exclusive to signature dishes. When the rule's condition is not met, the rule stays silent.",
    ...V1,
  },
  {
    id: "d-f064",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 3,
    prompt:
      "Premises: Some of the clinic's patients are teenagers. All teenagers need parental consent for treatment. What must follow?",
    choices: [
      "All of the clinic's patients need parental consent.",
      "Some of the clinic's patients need parental consent.",
      "Some teenagers are the clinic's patients.",
    ],
    correctIndex: 1,
    explanation:
      "'Some of the clinic's patients need parental consent' must follow. The 'some' patients who are teenagers inherit the consent requirement that applies to all teenagers — the some-group sits inside the teenager group, which sits inside the needs-consent group. We cannot upgrade 'some' to 'all,' and reversing to 'some teenagers are patients' changes the claim's direction. Chain the groups carefully and carry the quantifier ('some') through unchanged.",
    ...V1,
  },
  {
    id: "d-f065",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 3,
    prompt:
      "Premises: No reptiles are warm-blooded. All mammals are warm-blooded. What must follow?",
    choices: [
      "Some mammals are not warm-blooded.",
      "All warm-blooded animals are mammals.",
      "No reptiles are mammals.",
    ],
    correctIndex: 2,
    explanation:
      "'No reptiles are mammals' must follow. Every mammal is warm-blooded, and no reptile is warm-blooded, so the mammal group and the reptile group cannot overlap — a creature in both would have to be warm-blooded and not warm-blooded at once. The first choice contradicts a premise, and the second reverses 'all mammals are warm-blooded' into a claim about all warm-blooded animals, which the premises never support.",
    ...V1,
  },
  {
    id: "d-f066",
    kind: "complete",
    skillIds: ["f-deduction"],
    difficulty: 3,
    prompt:
      "Premises: If the generator fails, the freezers thaw. The freezers did not thaw. What must follow?",
    choices: [
      "The generator did not fail.",
      "The generator is reliable.",
      "The freezers will never thaw.",
    ],
    correctIndex: 0,
    explanation:
      "The generator must not have failed. This is the contrapositive in action: the premise says generator failure leads to thawing, and since the thawing did not happen, the failure cannot have happened either. The other choices overreach — 'reliable' is a sweeping judgment about the future, and 'never' goes far beyond one observed outcome. The contrapositive gives you exactly one safe inference: deny the result, and you may deny the trigger.",
    ...V1,
  },

  // ==================================================================
  // f-conditional — d-f067–078: contrapositives; valid vs invalid
  // (reversal, negation).
  // ==================================================================
  {
    id: "d-f067",
    kind: "translate",
    skillIds: ["f-conditional"],
    difficulty: 1,
    prompt:
      "Original: If it rains, the game is canceled. Which is its contrapositive?",
    choices: [
      "If the game is not canceled, then it did not rain.",
      "If it does not rain, the game is not canceled.",
      "If it rains, the game is canceled.",
    ],
    correctIndex: 0,
    explanation:
      "The contrapositive is 'If the game is not canceled, then it did not rain.' Form it in two steps: swap the two halves, then negate each. The original says rain is enough to cancel the game; the contrapositive says the absence of cancellation is enough to rule out rain. The second choice negates without swapping — the negation fallacy — and it is invalid: a dry day does not guarantee the game goes on, since lightning could cancel it too.",
    ...V1,
  },
  {
    id: "d-f068",
    kind: "identify",
    skillIds: ["f-conditional"],
    difficulty: 1,
    prompt:
      "Rule: If the alarm sounds, the doors lock. Which of the following also follows from this rule?",
    choices: [
      "If the doors are locked, the alarm sounded.",
      "If the doors are unlocked, the alarm did not sound.",
      "If the alarm sounds, the doors lock.",
    ],
    correctIndex: 1,
    explanation:
      "'If the doors are unlocked, the alarm did not sound' follows — it is the contrapositive, formed by swapping and negating. The first choice is the reversal fallacy: locked doors could have many causes (a drill, a malfunction), so they do not prove the alarm sounded. The third choice merely restates the rule. Only the contrapositive of a conditional is logically equivalent to it; reversals and negations are not.",
    ...V1,
  },
  {
    id: "d-f069",
    kind: "translate",
    skillIds: ["f-conditional"],
    difficulty: 2,
    prompt:
      "Translate into arrow form: Only members can vote.",
    choices: [
      "Member → Vote",
      "Not a member → Vote",
      "Vote → Member",
    ],
    correctIndex: 2,
    explanation:
      "The correct translation is 'Vote → Member': voting requires membership, so anyone who votes must be a member. 'Only' introduces the necessary condition, which goes on the right side of the arrow. The reversal 'Member → Vote' is the classic trap — members may or may not vote; membership merely opens the door. The second choice is nonsense. Remember the slogan: 'only' points to the necessary condition, and the necessary condition goes on the right.",
    ...V1,
  },
  {
    id: "d-f070",
    kind: "identify",
    skillIds: ["f-conditional"],
    difficulty: 2,
    prompt:
      "The sign reads: No entry without a ticket. Which follows from the sign's rule?",
    choices: [
      "If someone entered, they had a ticket.",
      "If someone has a ticket, they entered.",
      "If someone has a ticket, they may not enter.",
    ],
    correctIndex: 0,
    explanation:
      "'If someone entered, they had a ticket' follows. 'No entry without a ticket' means a ticket is necessary for entry: Entry → Ticket. The second choice reverses it — ticket holders might never show up — and the third contradicts the sign's plain meaning. 'Without' works like 'only': it introduces the necessary condition. Translate first, then check each choice against the arrow; the reversal will always be the tempting wrong answer.",
    ...V1,
  },
  {
    id: "d-f071",
    kind: "translate",
    skillIds: ["f-conditional"],
    difficulty: 2,
    prompt:
      "Translate into arrow form: The plant closes if the levy fails.",
    choices: [
      "Levy passes → Plant stays open",
      "Levy fails → Plant closes",
      "Plant closes → Levy fails",
    ],
    correctIndex: 1,
    explanation:
      "The correct translation is 'Levy fails → Plant closes.' The word 'if' introduces the sufficient condition, which goes on the left: the levy's failure is enough to close the plant. The third choice reverses the arrow — the plant might close for other reasons, like a fire — and the first choice negates both sides without swapping, which is invalid: a passed levy does not guarantee the plant stays open.",
    ...V1,
  },
  {
    id: "d-f072",
    kind: "identify",
    skillIds: ["f-conditional"],
    difficulty: 2,
    prompt:
      "Rule: You can graduate only if you finish the thesis. Dana graduated. What must be true?",
    choices: [
      "Anyone who finishes the thesis graduates.",
      "Dana might have graduated without finishing.",
      "Dana finished the thesis.",
    ],
    correctIndex: 2,
    explanation:
      "Dana must have finished the thesis. 'Only if' makes the thesis a necessary condition: Graduate → Finished thesis. Since Dana graduated, the necessary condition is satisfied. The first choice reverses the arrow — finishing may not be enough if other requirements exist. The second choice denies the arrow outright. 'Only if' is one of the most tested phrases on the LSAT precisely because test-takers flip it; anchor it with the rule that the necessary condition goes on the right.",
    ...V1,
  },
  {
    id: "d-f073",
    kind: "translate",
    skillIds: ["f-conditional"],
    difficulty: 3,
    prompt:
      "Translate into arrow form: Being on the roster is necessary for playing in the match.",
    choices: [
      "Play → On roster",
      "On roster → Play",
      "Not playing → On roster",
    ],
    correctIndex: 0,
    explanation:
      "The correct translation is 'Play → On roster.' A necessary condition goes on the right side of the arrow: playing requires roster membership, so every player is on the roster. The second choice confuses necessary with sufficient — rostered players might be benched all season. The third choice mangles the logic: not playing tells you nothing, since benched roster members also do not play. Necessary-condition language ('necessary for,' 'required for,' 'must have') always puts the requirement on the right.",
    ...V1,
  },
  {
    id: "d-f074",
    kind: "identify",
    skillIds: ["f-conditional"],
    difficulty: 3,
    prompt:
      "Rule: If the reservoir drops below 40 percent, rationing begins. Rationing has not begun. What follows?",
    choices: [
      "Rationing will never begin.",
      "The reservoir is at or above 40 percent.",
      "The reservoir is completely full.",
    ],
    correctIndex: 1,
    explanation:
      "The reservoir must be at or above 40 percent. This is a direct contrapositive application: the rule says low water leads to rationing, and rationing's absence rules out the low-water trigger. The third choice overclaims — 'at or above 40 percent' includes 41 percent, not just full. The first choice projects into the future, which the premises never license. The contrapositive tells you about the present facts, not about what will always be.",
    ...V1,
  },
  {
    id: "d-f075",
    kind: "translate",
    skillIds: ["f-conditional"],
    difficulty: 3,
    prompt:
      "Original: If the witness is credible, the verdict stands. Which is its contrapositive?",
    choices: [
      "If the witness is not credible, the verdict is overturned.",
      "If the verdict stands, the witness is credible.",
      "If the verdict is overturned, the witness was not credible.",
    ],
    correctIndex: 2,
    explanation:
      "The contrapositive is 'If the verdict is overturned, the witness was not credible' — swap the halves and negate each. The first choice negates without swapping (the negation fallacy): a non-credible witness might still see the verdict stand on other evidence. The second choice swaps without negating (the reversal fallacy): the verdict could stand for unrelated reasons. Drill the two-step recipe — swap, then negate — until it is automatic, because the LSAT hides contrapositives in exactly these plain-English clothes.",
    ...V1,
  },
  {
    id: "d-f076",
    kind: "identify",
    skillIds: ["f-conditional"],
    difficulty: 3,
    prompt:
      "The sign says: Employees only beyond this point. Mara is beyond this point. What follows?",
    choices: [
      "Mara is an employee.",
      "All employees are beyond this point.",
      "Mara works the register.",
    ],
    correctIndex: 0,
    explanation:
      "Mara must be an employee. 'Employees only' makes employee status necessary for being beyond the point: Beyond point → Employee. Mara satisfies the left side, so the right side follows. The second choice reverses the arrow — employees could be anywhere, including the parking lot. The third choice adds an unsupported detail about the register. 'Only' phrases are reversal magnets; always place the 'only' group on the right side of the arrow.",
    ...V1,
  },
  {
    id: "d-f077",
    kind: "translate",
    skillIds: ["f-conditional"],
    difficulty: 3,
    prompt:
      "Translate into arrow form: You cannot board without a boarding pass.",
    choices: [
      "No boarding pass → Board",
      "Board → Boarding pass",
      "Boarding pass → Board",
    ],
    correctIndex: 1,
    explanation:
      "The correct translation is 'Board → Boarding pass.' 'Without' introduces the necessary condition, just like 'only': no pass, no boarding, so boarding requires a pass. The third choice reverses it — pass holders can still miss their flight. The first choice is the opposite of the rule's meaning. When you see 'cannot…without,' 'no…without,' or 'never…without,' immediately put the 'without' item on the right side of the arrow.",
    ...V1,
  },
  {
    id: "d-f078",
    kind: "identify",
    skillIds: ["f-conditional"],
    difficulty: 3,
    prompt:
      "An arguer reasons: If the budget passes, hiring resumes. Hiring resumed. Therefore the budget passed. How should this reasoning be classified?",
    choices: [
      "Invalid — it denies the antecedent.",
      "Valid — it applies the rule correctly.",
      "Invalid — it affirms the consequent.",
    ],
    correctIndex: 2,
    explanation:
      "This is invalid — it affirms the consequent. The rule says budget passage leads to hiring; observing hiring and concluding the budget passed treats the result as proof of the trigger. But hiring could have resumed for other reasons — a grant, a hiring freeze lifted by court order. Affirming the consequent and denying the antecedent are the two classic conditional fallacies, and spotting them by name is a foundational flaw-detection skill.",
    ...V1,
  },

  // ==================================================================
  // f-translate — d-f079–090: translate natural-language conditionals
  // (if, only if, unless, except, without, requires, all, none).
  // ==================================================================
  {
    id: "d-f079",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 1,
    prompt:
      "Translate into arrow form: If the river floods, the road closes.",
    choices: [
      "River floods → Road closes",
      "Road closes → River floods",
      "River floods → Road stays open",
    ],
    correctIndex: 0,
    explanation:
      "The correct translation is 'River floods → Road closes.' The word 'if' introduces the sufficient condition, which goes on the left side of the arrow: flooding is enough to close the road. The second choice reverses the direction — the road could close for construction or an accident. The third choice states the opposite of the rule. 'If A, B' always becomes A → B; drill this until it is reflex.",
    ...V1,
  },
  {
    id: "d-f080",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 1,
    prompt:
      "Translate into arrow form: The picnic happens only if the rain holds off.",
    choices: [
      "Rain holds off → Picnic happens",
      "Picnic happens → Rain held off",
      "Rain falls → Picnic happens",
    ],
    correctIndex: 1,
    explanation:
      "The correct translation is 'Picnic happens → Rain held off.' The phrase 'only if' introduces the necessary condition, which goes on the right: dry weather is required for the picnic, so a happening picnic proves the rain held off. The first choice treats dry weather as sufficient — but the caterer could still cancel. The third choice contradicts the sentence's meaning. 'Only if' is the mirror image of 'if,' and mixing them up is the single most common translation error.",
    ...V1,
  },
  {
    id: "d-f081",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 2,
    prompt:
      "Translate into arrow form: Unless the crew finishes, the launch is delayed.",
    choices: [
      "Launch is delayed → Crew finishes",
      "Crew finishes → Launch is delayed",
      "Crew does not finish → Launch is delayed",
    ],
    correctIndex: 2,
    explanation:
      "The correct translation is 'Crew does not finish → Launch is delayed.' Treat 'unless' as 'if not': unless the crew finishes means if the crew does not finish. The 'if not' clause is the sufficient condition on the left. The second choice drops the negation and says the opposite of the sentence. The first choice reverses the arrow — a delayed launch could result from weather, not from the crew's work.",
    ...V1,
  },
  {
    id: "d-f082",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 2,
    prompt:
      "Translate into arrow form: No dogs are allowed in the park except service animals.",
    choices: [
      "Dog in park → Service animal",
      "Service animal → Dog in park",
      "Dog in park → Not a service animal",
    ],
    correctIndex: 0,
    explanation:
      "The correct translation is 'Dog in park → Service animal.' 'Except' works like 'only': being a service animal is necessary for a dog to be in the park, so any dog you see there must be a service animal. The second choice reverses it — service animals are permitted, not required, to visit. The third choice contradicts the rule. 'Except,' 'but,' and 'other than' all introduce the necessary condition when they carve out the sole exception.",
    ...V1,
  },
  {
    id: "d-f083",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 2,
    prompt:
      "Translate into arrow form: You cannot enter the archive without a badge.",
    choices: [
      "No badge → Enter archive",
      "Enter archive → Have a badge",
      "Have a badge → Enter archive",
    ],
    correctIndex: 1,
    explanation:
      "The correct translation is 'Enter archive → Have a badge.' 'Without' introduces the necessary condition: no badge means no entry, so entering proves badge possession. The third choice reverses the arrow — badge holders might still be turned away for other reasons. The first choice states the exact opposite of the rule. Whenever you see 'cannot…without' or 'no…without,' put the 'without' item on the right side of the arrow.",
    ...V1,
  },
  {
    id: "d-f084",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 2,
    prompt:
      "Translate into arrow form: The grant requires matching funds.",
    choices: [
      "Provide matching funds → Get the grant",
      "Get the grant → No matching funds needed",
      "Get the grant → Provide matching funds",
    ],
    correctIndex: 2,
    explanation:
      "The correct translation is 'Get the grant → Provide matching funds.' 'Requires' introduces the necessary condition, which goes on the right: matching funds are required for the grant, so receiving the grant proves the funds were provided. The first choice treats the funds as sufficient — but the application could still be rejected on merit. The second choice contradicts the sentence. 'Requires,' 'needs,' and 'must have' are necessary-condition flags.",
    ...V1,
  },
  {
    id: "d-f085",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 3,
    prompt:
      "Translate into arrow form: All of the approved vendors carry insurance.",
    choices: [
      "Approved vendor → Carries insurance",
      "Carries insurance → Approved vendor",
      "Approved vendor → No insurance",
    ],
    correctIndex: 0,
    explanation:
      "The correct translation is 'Approved vendor → Carries insurance.' 'All A are B' becomes A → B: membership in the first group guarantees membership in the second. The second choice reverses it — insured companies might never apply for approval. The third choice contradicts the sentence. Universal statements ('all,' 'every,' 'each,' 'any') are conditionals in disguise, and translating them into arrows makes their contrapositives easy to spot.",
    ...V1,
  },
  {
    id: "d-f086",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 3,
    prompt:
      "Translate into arrow form: None of the interns may approve refunds.",
    choices: [
      "Not an intern → Approves refunds",
      "Approves refunds → Not an intern",
      "Intern → Approves refunds",
    ],
    correctIndex: 1,
    explanation:
      "The correct translation is 'Approves refunds → Not an intern.' 'None of the interns may approve refunds' means intern status and refund approval never overlap: anyone approving refunds cannot be an intern. Equivalently, Intern → Not approve refunds. The third choice states the opposite of the rule. The first choice reverses and mangles it — non-interns are permitted, not required, to approve refunds. 'None' and 'no' statements become arrows by negating one side.",
    ...V1,
  },
  {
    id: "d-f087",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 3,
    prompt:
      "Translate into arrow form: The merger goes through if regulators approve, but only if the shareholders also vote yes.",
    choices: [
      "Regulators approved → Merger goes through",
      "Shareholders voted yes → Merger goes through",
      "Merger goes through → Regulators approved AND shareholders voted yes",
    ],
    correctIndex: 2,
    explanation:
      "The correct translation is 'Merger goes through → Regulators approved AND shareholders voted yes.' The 'only if' clause makes both approvals necessary conditions, so a completed merger proves both happened. The first and second choices each treat one necessary condition as sufficient — but regulators' approval alone, or shareholders' alone, does not complete the merger. When a sentence stacks conditions, collect every necessary condition on the right side of the arrow.",
    ...V1,
  },
  {
    id: "d-f088",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 3,
    prompt:
      "Translate into arrow form: Without a quorum, no vote is valid.",
    choices: [
      "Valid vote → Quorum was present",
      "Quorum was present → Valid vote",
      "No quorum → Valid vote",
    ],
    correctIndex: 0,
    explanation:
      "The correct translation is 'Valid vote → Quorum was present.' 'Without a quorum, no vote is valid' means a quorum is necessary for validity: any valid vote proves a quorum existed. The second choice reverses it — a quorum does not guarantee the vote was conducted properly in other respects. The third choice contradicts the sentence. Leading with 'without' is a common LSAT disguise for a necessary condition; move it to the right side of the arrow.",
    ...V1,
  },
  {
    id: "d-f089",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 3,
    prompt:
      "Translate into arrow form: Employees may work remotely except on client-visit days.",
    choices: [
      "Works remotely → Client-visit day",
      "Works remotely → Not a client-visit day",
      "Client-visit day → Works remotely",
    ],
    correctIndex: 1,
    explanation:
      "The correct translation is 'Works remotely → Not a client-visit day.' 'Except on client-visit days' carves out the one situation where remote work is forbidden, so anyone working remotely must not be on a client-visit day. The third choice reverses the arrow — client-visit days require office presence, not remote work. The first choice states the opposite of the exception. 'Except' marks the forbidden case; negate it on the right side.",
    ...V1,
  },
  {
    id: "d-f090",
    kind: "translate",
    skillIds: ["f-translate"],
    difficulty: 3,
    prompt:
      "Translate into arrow form: A passport is required for international travel.",
    choices: [
      "Has a passport → Travels internationally",
      "Travels internationally → No passport needed",
      "Travels internationally → Has a passport",
    ],
    correctIndex: 2,
    explanation:
      "The correct translation is 'Travels internationally → Has a passport.' 'Required for' makes the passport a necessary condition of international travel: anyone traveling internationally must have one. The first choice reverses it — millions hold passports they never use. The second choice contradicts the sentence. 'Required for,' 'needed for,' and 'essential for' all put the required thing on the right side of the arrow.",
    ...V1,
  },

  // ==================================================================
  // f-quantifiers — d-f091–100: all/most/many/some/not all/none
  // relationships and valid/invalid inferences.
  // ==================================================================
  {
    id: "d-f091",
    kind: "identify",
    skillIds: ["f-quantifiers"],
    difficulty: 1,
    prompt:
      "Premises: All of the choir's sopranos attended the rehearsal. Most of the choir are sopranos. What follows?",
    choices: [
      "Most of the choir attended the rehearsal.",
      "All of the choir attended the rehearsal.",
      "Some choir members are not sopranos.",
    ],
    correctIndex: 0,
    explanation:
      "'Most of the choir attended' follows. Most of the choir are sopranos, and every soprano attended, so the attending group contains most of the choir. We cannot upgrade to 'all' — the non-soprano minority might have skipped. The third choice is true (most are sopranos means some are not) but it is not the inference the question asks for; it restates a premise rather than combining the two premises into something new.",
    ...V1,
  },
  {
    id: "d-f092",
    kind: "identify",
    skillIds: ["f-quantifiers"],
    difficulty: 1,
    prompt:
      "Premise: Some of the files are corrupted. Which of the following must be true?",
    choices: [
      "Most of the files are corrupted.",
      "Not all of the files are intact.",
      "None of the files are intact.",
    ],
    correctIndex: 1,
    explanation:
      "'Not all of the files are intact' must be true. 'Some are corrupted' guarantees at least one corrupted file, which is enough to falsify 'all are intact.' But 'some' means 'at least one' — it does not mean 'most,' so the first choice overclaims, and it certainly does not mean 'all,' so the third choice overclaims too. The safe inference from 'some' is small: at least one, and whatever logically follows from at least one.",
    ...V1,
  },
  {
    id: "d-f093",
    kind: "identify",
    skillIds: ["f-quantifiers"],
    difficulty: 2,
    prompt:
      "Premise: Most birds in the sanctuary are migratory. Which of the following is NOT guaranteed by this premise?",
    choices: [
      "More than half the birds are migratory.",
      "At least one bird in the sanctuary is migratory.",
      "Every bird in the sanctuary is migratory.",
    ],
    correctIndex: 2,
    explanation:
      "'Every bird is migratory' is not guaranteed. 'Most' means more than half — which does guarantee at least one migratory bird and does mean more than half are migratory — but it explicitly leaves room for a minority that is not migratory. This is the standard 'most' trap: test-takers slide from 'most' to 'all' because both sound like 'a lot.' They are logically worlds apart: 'most' tolerates exceptions, 'all' does not.",
    ...V1,
  },
  {
    id: "d-f094",
    kind: "classify",
    skillIds: ["f-quantifiers"],
    difficulty: 2,
    prompt:
      "Premise: Many residents opposed the toll. Someone concludes: 'So most residents opposed the toll.' How should this inference be classified?",
    choices: [
      "Invalid — 'many' does not guarantee 'most.'",
      "Invalid — 'many' means 'few.'",
      "Valid — 'many' guarantees 'most.'",
    ],
    correctIndex: 0,
    explanation:
      "The inference is invalid because 'many' does not guarantee 'most.' 'Many' is vague — it means a large number, but large relative to what? Forty angry residents are 'many' in a town of one hundred only if they exceed fifty. 'Most,' by contrast, has a precise meaning: more than half. Vague quantity words ('many,' 'several,' 'a number of') never license precise quantity conclusions ('most,' 'all').",
    ...V1,
  },
  {
    id: "d-f095",
    kind: "translate",
    skillIds: ["f-quantifiers"],
    difficulty: 2,
    prompt:
      "Which statement is logically equivalent to 'Not all of the samples were pure'?",
    choices: [
      "None of the samples were pure.",
      "Some of the samples were impure.",
      "Most of the samples were impure.",
    ],
    correctIndex: 1,
    explanation:
      "'Some of the samples were impure' is equivalent. 'Not all were pure' means at least one sample failed to be pure — and 'at least one was impure' is exactly what 'some were impure' claims. 'None were pure' goes too far: perhaps nine of ten were pure. 'Most were impure' also overclaims, since a single impure sample already makes the original true. 'Not all' is the negation of 'all,' and the negation of 'all are' is 'some are not.'",
    ...V1,
  },
  {
    id: "d-f096",
    kind: "identify",
    skillIds: ["f-quantifiers"],
    difficulty: 3,
    prompt:
      "Premises: Most of the committee approved the budget. All of the officers are on the committee. What follows about the officers?",
    choices: [
      "Most of the officers approved the budget.",
      "Some of the officers approved the budget.",
      "The premises guarantee no specific claim about the officers.",
    ],
    correctIndex: 2,
    explanation:
      "The premises guarantee no specific claim about the officers. It is tempting to carry 'most approved' down to the officer subgroup, but the officers could be exactly the minority that voted no — nothing rules that out. Quantifier claims about a whole group do not transfer to an arbitrary subgroup. This is one of the LSAT's favorite traps: the subgroup could sit entirely inside the exception, so only the guarded answer is safe.",
    ...V1,
  },
  {
    id: "d-f097",
    kind: "identify",
    skillIds: ["f-quantifiers"],
    difficulty: 3,
    prompt:
      "Premises: Some of the paintings are portraits. All portraits are oil paintings. What follows?",
    choices: [
      "Some of the paintings are oil paintings.",
      "All of the paintings are oil paintings.",
      "All oil paintings are portraits.",
    ],
    correctIndex: 0,
    explanation:
      "'Some of the paintings are oil paintings' follows. The 'some' paintings that are portraits sit inside the portrait group, and the portrait group sits entirely inside the oil-painting group — so those paintings are oil paintings too. We cannot upgrade 'some' to 'all.' The third choice reverses a premise: 'all portraits are oil paintings' tells us about portraits, not about oil paintings in general, which may include landscapes and still lifes. Chain the groups in the direction the premises point, and carry 'some' through unchanged.",
    ...V1,
  },
  {
    id: "d-f098",
    kind: "identify",
    skillIds: ["f-quantifiers"],
    difficulty: 3,
    prompt:
      "Premises: None of the volunteers were paid. Some volunteers were students. What follows?",
    choices: [
      "Some paid workers were students.",
      "Some students were not paid.",
      "No students were paid.",
    ],
    correctIndex: 1,
    explanation:
      "'Some students were not paid' follows. The 'some' volunteers who were students inherit the no-pay status that applies to all volunteers — the some-group sits inside the volunteer group, which sits entirely outside the paid group. We cannot extend this to 'no students were paid,' because non-volunteer students might have paying jobs. Carry the quantifier through the chain, but never widen it beyond the group the premises describe.",
    ...V1,
  },
  {
    id: "d-f099",
    kind: "identify",
    skillIds: ["f-quantifiers"],
    difficulty: 2,
    prompt:
      "Premises: All of the defendants who testified were acquitted. Mara is a defendant, and she testified. What follows?",
    choices: [
      "All defendants were acquitted.",
      "Every acquitted defendant testified.",
      "Mara was acquitted.",
    ],
    correctIndex: 2,
    explanation:
      "Mara must have been acquitted. The rule covers every defendant who testified, and Mara is a testifying defendant, so the rule applies to her directly. We cannot widen the rule to all defendants — those who never testified fall outside it. And the second choice reverses the rule: 'all testifying defendants were acquitted' does not mean 'all acquitted defendants testified,' since some may have been acquitted without testifying. Apply universal rules exactly to the group they describe.",
    ...V1,
  },
  {
    id: "d-f100",
    kind: "identify",
    skillIds: ["f-quantifiers"],
    difficulty: 3,
    prompt:
      "Premise: Most managers approved the plan. Which of the following must be true?",
    choices: [
      "Some managers approved the plan.",
      "Most employees approved the plan.",
      "The plan was implemented.",
    ],
    correctIndex: 0,
    explanation:
      "'Some managers approved the plan' must be true, because 'most' (more than half) logically contains 'some' (at least one). If more than half approved, then certainly at least one did. The second choice shifts scope from managers to employees — an entirely different group the premise never mentions. The third choice leaps from approval to implementation, which requires further steps the premise does not provide. 'Most' implies 'some'; it implies nothing about other groups or about what happened next.",
    ...V1,
  },

  // ==================================================================
  // f-causation — d-f101–110: correlation vs causation; alternative
  // cause; reverse causation; confounds.
  // ==================================================================
  {
    id: "d-f101",
    kind: "classify",
    skillIds: ["f-causation"],
    difficulty: 1,
    prompt:
      "Towns with more libraries have higher literacy rates. A columnist concludes that building libraries causes literacy to rise. How should this reasoning be classified?",
    choices: [
      "It shows correlation only, not causation.",
      "It demonstrates reverse causation.",
      "It shows the two are unrelated.",
      "It demonstrates causation.",
    ],
    correctIndex: 0,
    explanation:
      "This shows correlation only. Libraries and literacy move together, but the columnist has not ruled out the obvious alternatives: wealthy towns can afford both libraries and good schools, or literate populations demand more libraries. Correlation means two things vary together; causation means one produces the other. Moving from the first to the second without eliminating alternative explanations is the most common causal flaw on the LSAT.",
    ...V1,
  },
  {
    id: "d-f102",
    kind: "identify",
    skillIds: ["f-causation"],
    difficulty: 1,
    prompt:
      "Ice cream sales and drowning deaths both rise every summer. Which best explains this pattern?",
    choices: [
      "Ice cream consumption causes drowning.",
      "Hot weather drives both: more swimming and more ice cream buying.",
      "Drowning deaths cause ice cream sales to rise.",
    ],
    correctIndex: 1,
    explanation:
      "Hot weather is the third factor driving both trends: summer heat sends people swimming (raising drownings) and sends them buying ice cream. This is the classic 'common cause' pattern — two effects of one cause masquerading as cause and effect of each other. Whenever two things rise and fall together, ask what third factor might be moving both before you accept that one causes the other.",
    ...V1,
  },
  {
    id: "d-f103",
    kind: "identify",
    skillIds: ["f-causation"],
    difficulty: 2,
    prompt:
      "The mayor credits the new curfew with the drop in vandalism. However, a neighborhood watch program started the same month the curfew began. What is the main weakness in the mayor's claim?",
    choices: [
      "Vandalism may rise again next year.",
      "The curfew may be unpopular.",
      "An alternative cause — the neighborhood watch — could explain the drop.",
    ],
    correctIndex: 2,
    explanation:
      "The main weakness is the alternative cause: the neighborhood watch started at the same time, so it — not the curfew — might deserve the credit. When two candidate causes arrive together, the evidence cannot distinguish between them. The mayor's popularity and next year's vandalism are irrelevant to whether the curfew caused this year's drop. Always check the timeline for rival causes before accepting a causal claim.",
    ...V1,
  },
  {
    id: "d-f104",
    kind: "identify",
    skillIds: ["f-causation"],
    difficulty: 2,
    prompt:
      "A study finds that depressed patients who exercise recover faster, and concludes that exercise speeds recovery from depression. Which alternative explanation most threatens this conclusion?",
    choices: [
      "Less-depressed patients may be the ones able to exercise, so mood causes the exercise rather than the reverse.",
      "The study was conducted in winter.",
      "Exercise is difficult for severely depressed patients.",
    ],
    correctIndex: 0,
    explanation:
      "The threat is reverse causation: instead of exercise improving mood, better mood may enable exercise. The study observed exercisers recovering faster, but it never established which came first — the exercise or the milder depression that made exercise possible. The conclusion assumes the causal arrow points one way; the alternative points it the other way. Whenever a study links a behavior to an outcome, ask whether the outcome could be producing the behavior.",
    ...V1,
  },
  {
    id: "d-f105",
    kind: "classify",
    skillIds: ["f-causation"],
    difficulty: 2,
    prompt:
      "After the district adopted a new reading program, test scores rose. The district also hired reading specialists that same year. How should the claim 'the program raised scores' be classified?",
    choices: [
      "Weakened by a confound — the specialists are a rival explanation.",
      "Weakened by reverse causation.",
      "Irrelevant — scores always fluctuate.",
      "Well supported — scores rose after the program.",
    ],
    correctIndex: 0,
    explanation:
      "The claim is weakened by a confound: the newly hired reading specialists are a rival explanation for the rising scores. A confound is an alternative cause tangled up with the claimed one — both changed at once, so the evidence cannot separate their effects. 'After' does not mean 'because of,' and when two interventions coincide, crediting just one of them is wishful thinking, not reasoning.",
    ...V1,
  },
  {
    id: "d-f106",
    kind: "classify",
    skillIds: ["f-causation"],
    difficulty: 2,
    prompt:
      "Cities with more coffee shops have more startups. A blogger concludes that coffee shops cause startups to form. How should this reasoning be classified?",
    choices: [
      "It demonstrates causation.",
      "It shows correlation only, not causation.",
      "It demonstrates reverse causation.",
      "It shows the two are unrelated.",
    ],
    correctIndex: 1,
    explanation:
      "This shows correlation only. Prosperous, educated cities attract both coffee shops and entrepreneurs — the city's wealth and talent pool likely cause both. The blogger leaps from 'together' to 'caused by' without ruling out that common cause or the reverse direction (startup workers demanding more coffee shops). Treat every 'X causes Y' conclusion drawn from mere co-occurrence as guilty until proven innocent.",
    ...V1,
  },
  {
    id: "d-f107",
    kind: "identify",
    skillIds: ["f-causation"],
    difficulty: 3,
    prompt:
      "A clinic claims its new therapy works because every patient who completed it improved. There was no comparison group of untreated patients. What is the main weakness?",
    choices: [
      "Without an untreated group, improvement might have happened anyway.",
      "Some patients may not have finished the therapy.",
      "The therapy may be expensive.",
    ],
    correctIndex: 0,
    explanation:
      "The main weakness is the missing comparison group. Patients might have improved on their own, through rest, or because of the placebo effect of receiving attention — without untreated patients to compare against, there is no baseline. Causal claims need a counterfactual: what would have happened without the treatment? A before-and-after story about one group cannot answer that question, no matter how dramatic the improvement looks.",
    ...V1,
  },
  {
    id: "d-f108",
    kind: "identify",
    skillIds: ["f-causation"],
    difficulty: 3,
    prompt:
      "Happy employees are more productive, so a firm plans to boost morale in order to raise output. Which alternative most threatens the plan?",
    choices: [
      "Morale programs cost money.",
      "Productive workers may simply feel happier, so productivity causes morale rather than the reverse.",
      "Some happy employees are unproductive.",
    ],
    correctIndex: 1,
    explanation:
      "The threat is reverse causation: productivity may cause happiness rather than happiness causing productivity. If workers feel good because they are succeeding, then artificially boosting morale will not manufacture success — the firm would be pushing on the effect instead of the cause. The plan assumes the arrow runs morale → output; the alternative runs it output → morale. Cost and exceptions are side issues; the direction of the arrow is the whole argument.",
    ...V1,
  },
  {
    id: "d-f109",
    kind: "identify",
    skillIds: ["f-causation"],
    difficulty: 3,
    prompt:
      "Traffic deaths fell the year speed cameras were installed, and the city credits the cameras. But that winter was unusually harsh, keeping many drivers home. What most weakens the city's claim?",
    choices: [
      "Traffic deaths fluctuate from year to year.",
      "Speed cameras are unpopular with drivers.",
      "The harsh winter is an alternative cause of fewer deaths.",
    ],
    correctIndex: 2,
    explanation:
      "The harsh winter is an alternative cause: fewer drivers on the road means fewer deaths regardless of cameras. The city's claim assumes the cameras were the operative difference between the two years, but the weather was a second difference pointing the same way. To defend the claim, the city would need to show the drop exceeds what the weather alone explains. Rival causes that coincide with the claimed cause are the most direct way to weaken a causal argument.",
    ...V1,
  },
  {
    id: "d-f110",
    kind: "identify",
    skillIds: ["f-causation"],
    difficulty: 3,
    prompt:
      "In a fertilizer trial, treated plots yielded more corn. However, the treated plots also received more sunlight each day. What is the flaw in concluding the fertilizer caused the higher yield?",
    choices: [
      "Sunlight is a confound — it, not the fertilizer, may explain the yield.",
      "Corn yields vary by season.",
      "The trial should have used more plots.",
    ],
    correctIndex: 0,
    explanation:
      "Sunlight is a confound: it differs between the groups exactly the way the fertilizer does, so the higher yield could be the sun's work. A fair trial holds everything constant except the tested factor; here two factors varied at once, making their effects inseparable. This is why experiments use control groups and randomization — to prevent exactly this kind of tangling. Whenever groups differ in more than one way, blame cannot be assigned to any single difference.",
    ...V1,
  },

  // ==================================================================
  // f-samples — d-f111–118: representativeness, self-selection,
  // response bias.
  // ==================================================================
  {
    id: "d-f111",
    kind: "identify",
    skillIds: ["f-samples"],
    difficulty: 1,
    prompt:
      "A radio host polls callers about a proposed tax, and 80 percent of callers oppose it. He concludes most listeners oppose the tax. What is wrong with the sample?",
    choices: [
      "Callers self-select — only motivated listeners call in.",
      "The tax is too complicated to poll about.",
      "The sample is too small.",
    ],
    correctIndex: 0,
    explanation:
      "The problem is self-selection: the callers chose themselves, and people with strong feelings — especially anger — are far more likely to call than the indifferent majority. A sample must resemble the population it claims to represent, and volunteers with an axe to grind do not resemble typical listeners. Whenever respondents opt in, assume the sample overrepresents the passionate and underrepresents everyone else.",
    ...V1,
  },
  {
    id: "d-f112",
    kind: "identify",
    skillIds: ["f-samples"],
    difficulty: 1,
    prompt:
      "A gym surveys members entering at 6 a.m. about preferred class times, then schedules most classes in the early morning. What is wrong with the sample?",
    choices: [
      "Six a.m. is too early to think clearly.",
      "Morning exercisers are unrepresentative of all members.",
      "The survey should have been online.",
    ],
    correctIndex: 1,
    explanation:
      "The sample is unrepresentative: surveying only 6 a.m. arrivals captures early risers and misses everyone who prefers afternoons or evenings — the very people whose preferences the gym most needs to learn. The sample was drawn from a slice of the population that already agrees with the conclusion. A good sample mirrors the whole membership; this one mirrors only the dawn patrol.",
    ...V1,
  },
  {
    id: "d-f113",
    kind: "identify",
    skillIds: ["f-samples"],
    difficulty: 2,
    prompt:
      "A restaurant has twenty one-star online reviews calling the food terrible, out of 5,000 diners served last year. What should you conclude about the food?",
    choices: [
      "The food is excellent — only twenty complaints is a great record.",
      "The food is terrible — the reviews prove it.",
      "Almost nothing — angry diners are far more likely to write reviews.",
    ],
    correctIndex: 2,
    explanation:
      "You should conclude almost nothing, because of response bias: furious customers write reviews while satisfied ones simply leave. Twenty angry reviews out of 5,000 diners is a tiny, self-selected fraction that cannot speak for the silent majority. The first choice overcorrects — the reviews do not prove excellence either. With biased samples, the honest answer is usually that the evidence is too skewed to support any conclusion about the whole group.",
    ...V1,
  },
  {
    id: "d-f114",
    kind: "identify",
    skillIds: ["f-samples"],
    difficulty: 2,
    prompt:
      "A college polls alumni donors about whether tuition should rise. Most donors say yes. What is wrong with using this to claim alumni support a rise?",
    choices: [
      "Donors are wealthier than typical alumni and may not mind higher tuition.",
      "The poll should have included current students.",
      "Tuition is set by the board, not by alumni.",
    ],
    correctIndex: 0,
    explanation:
      "The sample is unrepresentative: donors are wealthier and more institutionally loyal than typical alumni, so their comfort with higher tuition does not transfer to the alumni body as a whole. The sample matches the population on one trait (alumnus status) but differs on the trait that matters for the question (price sensitivity). Representativeness is always relative to the question being asked: a sample can be fine for one purpose and biased for another.",
    ...V1,
  },
  {
    id: "d-f115",
    kind: "identify",
    skillIds: ["f-samples"],
    difficulty: 2,
    prompt:
      "A company tests its new scheduling app on its own employees, finds they love it, and concludes all office workers will love it. What is the sampling flaw?",
    choices: [
      "Employees were paid to test the app.",
      "The company's employees may differ from office workers generally.",
      "The app was not finished during testing.",
    ],
    correctIndex: 1,
    explanation:
      "The flaw is generalizing from an unrepresentative sample: one company's employees — with its culture, tech comfort, and workflows — may differ sharply from office workers at large. The sample is convenient, not representative. Convenience samples are the most common sampling flaw because they are cheap, but cheap is not the same as sound. Before generalizing, ask whether the sampled group resembles the target group in the ways that matter.",
    ...V1,
  },
  {
    id: "d-f116",
    kind: "identify",
    skillIds: ["f-samples"],
    difficulty: 3,
    prompt:
      "A mail survey about job satisfaction gets a 12 percent response rate, and the results show high satisfaction. What is the main concern?",
    choices: [
      "Mail surveys are outdated.",
      "Twelve percent of workers is too few to matter.",
      "Nonresponse bias — dissatisfied workers may have thrown the survey away.",
    ],
    correctIndex: 2,
    explanation:
      "The main concern is nonresponse bias: the 88 percent who did not reply may differ systematically from those who did — and dissatisfied workers are prime candidates for ignoring a company survey. A low response rate does not just shrink the sample; it skews it, because the decision to respond correlates with the attitude being measured. The results describe the respondents, not the workforce. Always ask who is missing before trusting who answered.",
    ...V1,
  },
  {
    id: "d-f117",
    kind: "identify",
    skillIds: ["f-samples"],
    difficulty: 3,
    prompt:
      "A study of sleep habits surveys only medical residents, then reports conclusions about 'adults' generally. What is the flaw?",
    choices: [
      "Medical residents sleep less than typical adults.",
      "The study should have surveyed children too.",
      "Residents are too busy to answer surveys honestly.",
    ],
    correctIndex: 0,
    explanation:
      "The flaw is overgeneralization from an extreme sample: medical residents work brutal hours and sleep far less than typical adults, so findings about their sleep cannot be stretched to all adults. The sample is not just small or convenient — it is systematically unusual on exactly the dimension being studied. Generalizing requires the sample to be ordinary on the relevant traits; when the sample is extraordinary, the conclusions stay fenced inside it.",
    ...V1,
  },
  {
    id: "d-f118",
    kind: "identify",
    skillIds: ["f-samples"],
    difficulty: 3,
    prompt:
      "At a town hall meeting, attendees vote overwhelmingly to oppose a development. The headline reads: 'Town Opposes Development.' What is wrong with the headline's claim?",
    choices: [
      "Town hall meetings are too long.",
      "Attendees self-select — nearby homeowners with strong views turn out, unlike typical residents.",
      "The vote was not binding.",
    ],
    correctIndex: 1,
    explanation:
      "The headline commits a self-selection error: town hall attendees are not a cross-section of the town — they are the residents motivated enough to show up on a weeknight, disproportionately nearby homeowners with intense views. The meeting measures the intensity of the organized, not the opinion of the town. Whether the vote binds anyone is beside the point; the sample cannot support the headline's sweeping claim about the whole town.",
    ...V1,
  },

  // ==================================================================
  // f-numbers — d-f119–126: totals vs percentages vs rates; base-rate
  // reasoning.
  // ==================================================================
  {
    id: "d-f119",
    kind: "identify",
    skillIds: ["f-numbers"],
    difficulty: 1,
    prompt:
      "Hospital A recorded 50 patient deaths last year; Hospital B recorded 30. A reporter concludes Hospital B is safer. What is missing?",
    choices: [
      "The total number of patients each hospital treated.",
      "The names of the doctors at each hospital.",
      "The hospitals' locations.",
    ],
    correctIndex: 0,
    explanation:
      "What is missing is the total number of patients — the denominator. Fifty deaths out of 100,000 patients is a far better record than 30 deaths out of 500. Raw totals without rates are meaningless for comparison: a bigger hospital will almost always have bigger raw numbers. Never compare counts across groups of different sizes without converting to rates first.",
    ...V1,
  },
  {
    id: "d-f120",
    kind: "identify",
    skillIds: ["f-numbers"],
    difficulty: 1,
    prompt:
      "A headline reads: 'Bike thefts DOUBLE in Milltown!' The article notes thefts rose from 2 to 4. What is misleading about the headline?",
    choices: [
      "The headline understates the problem.",
      "The percentage sounds dramatic but the absolute numbers are tiny.",
      "The headline should name the thieves.",
    ],
    correctIndex: 1,
    explanation:
      "The headline is misleading because a 100 percent increase on a base of 2 is just 2 additional thefts — the percentage sounds alarming while the absolute change is trivial. Percentages magnify small bases: doubling 2 is nothing like doubling 20,000, though both are 'doubled.' Always ask for the raw numbers behind a percentage change; without the base, a percentage is a drama without a scale.",
    ...V1,
  },
  {
    id: "d-f121",
    kind: "identify",
    skillIds: ["f-numbers"],
    difficulty: 2,
    prompt:
      "A poll of 100 people shows a candidate leading 60 percent to 40 percent. The campaign declares victory is certain. What is the flaw?",
    choices: [
      "Sixty percent is not a majority.",
      "Polls should survey 1,000 people exactly.",
      "One hundred respondents is a small sample with a large margin of error.",
    ],
    correctIndex: 2,
    explanation:
      "The flaw is the small sample: with only 100 respondents, the margin of error is roughly ±10 points, so the 'lead' could easily be statistical noise. Percentages from tiny samples look as solid as percentages from huge ones, but they are far shakier. There is no magic number like 1,000 — what matters is that the sample is large enough for the claimed precision, and 100 is not large enough to declare anything certain.",
    ...V1,
  },
  {
    id: "d-f122",
    kind: "identify",
    skillIds: ["f-numbers"],
    difficulty: 2,
    prompt:
      "School X has a 90 percent pass rate; School Y has an 80 percent pass rate. But X tested 20 students and Y tested 2,000. Which comparison is fair?",
    choices: [
      "Neither rate alone settles it — X's rate rests on far fewer students.",
      "Y is better — it tested more students.",
      "X is better — 90 percent beats 80 percent.",
    ],
    correctIndex: 0,
    explanation:
      "Neither rate alone settles it. School X's 90 percent comes from just 20 students, where a few lucky or unlucky results swing the percentage wildly; School Y's 80 percent rests on 2,000 students and is far more stable. Percentages hide their sample sizes, and small-sample percentages are volatile. Before comparing rates, check the counts behind them — a rate built on 20 observations is a rumor, not a measurement.",
    ...V1,
  },
  {
    id: "d-f123",
    kind: "identify",
    skillIds: ["f-numbers"],
    difficulty: 2,
    prompt:
      "A disease test is 99 percent accurate. Only 1 in 10,000 people has the disease. Alex tests positive. Is Alex probably sick?",
    choices: [
      "Yes — the test is 99 percent accurate.",
      "Probably not — with so few sick people, most positives are false alarms.",
      "Impossible to say anything at all.",
    ],
    correctIndex: 1,
    explanation:
      "Alex is probably not sick — this is base-rate reasoning. Out of 10,000 people, about 1 is sick (and tests positive) while roughly 100 healthy people also test positive due to the 1 percent error rate. So a positive result is about 100-to-1 likely to be a false alarm. High accuracy cannot overcome a tiny base rate. Whenever you hear 'the test is X percent accurate,' ask how rare the condition is before updating your beliefs.",
    ...V1,
  },
  {
    id: "d-f124",
    kind: "identify",
    skillIds: ["f-numbers"],
    difficulty: 3,
    prompt:
      "A company's average salary rose after it laid off its lowest-paid workers. The CEO claims workers are better paid than before. What explains the rise?",
    choices: [
      "The CEO is lying about the numbers.",
      "The remaining workers got raises.",
      "Removing low salaries raised the average even if nobody got a raise.",
    ],
    correctIndex: 2,
    explanation:
      "Removing the lowest salaries raises the average mechanically, even if no remaining worker earned a penny more. An average describes the group's composition, not any individual's fate — change who counts, and the average moves. This composition effect is a staple of misleading statistics: the number went up, but the reality it supposedly describes did not change at all. Always ask whether the group itself changed before crediting a change in its average.",
    ...V1,
  },
  {
    id: "d-f125",
    kind: "identify",
    skillIds: ["f-numbers"],
    difficulty: 3,
    prompt:
      "A tutoring center advertises: 'Our method works — 80 percent of students improved!' The fine print reveals the trial involved 10 students. What is the problem?",
    choices: [
      "With 10 students, the result could easily be luck.",
      "The center should not advertise at all.",
      "Eighty percent is not impressive.",
    ],
    correctIndex: 0,
    explanation:
      "With only 10 students, 80 percent means just 8 improved — a result that could easily arise by chance, cherry-picked students, or natural variation. Small trials produce jumpy percentages: one student's bad day swings the rate by 10 points. Impressive-sounding percentages need substantial counts behind them to mean anything. Eight successes is an anecdote with arithmetic, not evidence of a method.",
    ...V1,
  },
  {
    id: "d-f126",
    kind: "identify",
    skillIds: ["f-numbers"],
    difficulty: 3,
    prompt:
      "A city's total income rose, but its per-capita income fell. How is this possible?",
    choices: [
      "The numbers must be wrong.",
      "The population grew faster than total income did.",
      "Rich residents left the city.",
    ],
    correctIndex: 1,
    explanation:
      "Per-capita income is total income divided by population, so if the population grows faster than income, the per-person figure falls even as the total rises. Totals and rates can move in opposite directions because they answer different questions: 'how much altogether' versus 'how much each.' This is why you must keep totals, averages, and percentages distinct — a rising total does not mean rising prosperity per person.",
    ...V1,
  },

  // ==================================================================
  // f-comparison — d-f127–134: are these groups comparable?
  // ==================================================================
  {
    id: "d-f127",
    kind: "classify",
    skillIds: ["f-comparison"],
    difficulty: 1,
    prompt:
      "A study compares marathon times of runners training at sea level with those training at high altitude, without mentioning altitude's effect on oxygen. How should this comparison be classified?",
    choices: [
      "Unfair — a key difference (altitude) was ignored.",
      "Unfair — different stopwatches were used.",
      "Fair — both groups ran marathons.",
    ],
    correctIndex: 0,
    explanation:
      "The comparison is unfair because altitude is a key difference that affects performance: thinner air makes training harder, so the groups were not running under comparable conditions. A fair comparison holds everything constant except the factor being studied. When groups differ in a relevant background condition, any performance gap could be the background's doing — and the comparison proves nothing about the runners themselves.",
    ...V1,
  },
  {
    id: "d-f128",
    kind: "classify",
    skillIds: ["f-comparison"],
    difficulty: 1,
    prompt:
      "A report compares test scores at two schools and declares one school's teaching superior. But the higher-scoring school admits only top applicants. How should this comparison be classified?",
    choices: [
      "Fair — test scores measure teaching.",
      "Unfair — the schools' students differed before any teaching happened.",
      "Fair — selective schools hire better teachers.",
    ],
    correctIndex: 1,
    explanation:
      "The comparison is unfair because the student bodies differed before teaching began: a selective school starts with stronger students, so higher scores may reflect admissions, not instruction. Comparing outcomes across groups requires the groups to start alike in relevant ways. When one group is pre-sorted for the very trait being measured, the comparison credits the sorter for the sorter's work.",
    ...V1,
  },
  {
    id: "d-f129",
    kind: "classify",
    skillIds: ["f-comparison"],
    difficulty: 2,
    prompt:
      "A store compares this year's sales to last year's and celebrates 15 percent growth — but it opened a second location in March. How should this comparison be classified?",
    choices: [
      "Fair — growth is growth.",
      "Fair — sales are sales.",
      "Unfair — the conditions changed (a new store was added).",
    ],
    correctIndex: 2,
    explanation:
      "The comparison is unfair because the conditions changed: this year's figure covers two stores while last year's covers one. Year-over-year comparisons assume a stable baseline, and opening a location breaks that assumption. The honest comparison would be same-store sales. Whenever a before-and-after comparison looks too good, check whether the 'before' and 'after' were measured under the same conditions.",
    ...V1,
  },
  {
    id: "d-f130",
    kind: "classify",
    skillIds: ["f-comparison"],
    difficulty: 2,
    prompt:
      "City A reports an average commute of 35 minutes measured door-to-door; City B reports 25 minutes measured as in-vehicle time only. A ranking declares B's commutes shorter. How should this comparison be classified?",
    choices: [
      "Unfair — the two cities measured different things.",
      "Fair — in-vehicle time is the standard measure.",
      "Fair — both are commute averages.",
    ],
    correctIndex: 0,
    explanation:
      "The comparison is unfair because the cities measured different things: door-to-door time includes walking, waiting, and transfers, while in-vehicle time excludes them. Comparing numbers requires comparing like with like — the same quantity, measured the same way. Different measures produce different numbers even when the underlying reality is identical, so this ranking compares rulers, not commutes.",
    ...V1,
  },
  {
    id: "d-f131",
    kind: "classify",
    skillIds: ["f-comparison"],
    difficulty: 2,
    prompt:
      "A drug trial finds the treatment group recovered faster than the control group. But the treatment group was on average ten years younger. How should this comparison be classified?",
    choices: [
      "Fair — the trial had a control group.",
      "Unfair — the groups differed in age, which affects recovery.",
      "Fair — younger patients are the target market.",
    ],
    correctIndex: 1,
    explanation:
      "The comparison is unfair because the groups differed in age, and younger patients recover faster regardless of treatment. Having a control group is not enough — the groups must be alike in every relevant respect except the treatment. This is why trials randomize: to balance background traits like age. When the treatment group starts healthier, the trial measures youth, not medicine.",
    ...V1,
  },
  {
    id: "d-f132",
    kind: "classify",
    skillIds: ["f-comparison"],
    difficulty: 3,
    prompt:
      "A company compares customer satisfaction before and after a website redesign and finds a big improvement — but it also rewrote the survey questions. How should this comparison be classified?",
    choices: [
      "Fair — new questions are more accurate.",
      "Fair — satisfaction improved.",
      "Unfair — changing the questions changed what was measured.",
    ],
    correctIndex: 2,
    explanation:
      "The comparison is unfair because changing the survey questions changed the instrument: the 'before' and 'after' numbers measure different things, so their difference could be pure wording. Longitudinal comparisons require a stable yardstick. Whether the new questions are better is irrelevant — you cannot measure change with a ruler you replaced mid-measurement. Instrument changes invalidate trend claims.",
    ...V1,
  },
  {
    id: "d-f133",
    kind: "classify",
    skillIds: ["f-comparison"],
    difficulty: 3,
    prompt:
      "Two fertilizers are tested: Fertilizer P on sandy riverside soil, Fertilizer Q on rich valley loam. Q's plots yield more. The farmer concludes Q is the better fertilizer. How should this comparison be classified?",
    choices: [
      "Unfair — the soils differed, so soil may explain the yield gap.",
      "Fair — valley loam is the realistic use case.",
      "Fair — both fertilizers grew the same crop.",
    ],
    correctIndex: 0,
    explanation:
      "The comparison is unfair because the soils differed: rich loam outyields sand on its own, so the yield gap may be the soil's work, not the fertilizer's. A fair test applies both fertilizers to the same soil (ideally side-by-side plots). When the test conditions differ in a relevant way, the results are confounded — and 'realistic use case' does not rescue the logic, because the farmer wanted to compare fertilizers, not soils.",
    ...V1,
  },
  {
    id: "d-f134",
    kind: "classify",
    skillIds: ["f-comparison"],
    difficulty: 3,
    prompt:
      "Nominal wages rose 20 percent over a decade, and a pundit declares workers 20 percent better off — without adjusting for inflation. How should this comparison be classified?",
    choices: [
      "Fair — a raise is a raise.",
      "Unfair — dollars from different years buy different amounts.",
      "Fair — inflation affects everyone equally.",
    ],
    correctIndex: 1,
    explanation:
      "The comparison is unfair because it mixes dollars from different years: if prices also rose 20 percent, workers buy exactly what they bought before. Cross-time money comparisons must be inflation-adjusted — converted to constant dollars — or they compare nominal illusions. That inflation 'affects everyone' misses the point: the claim is about workers' purchasing power across time, and nominal wages do not measure that.",
    ...V1,
  },

  // ==================================================================
  // f-analogy — d-f135–142: structural vs superficial similarity.
  // ==================================================================
  {
    id: "d-f135",
    kind: "classify",
    skillIds: ["f-analogy"],
    difficulty: 1,
    prompt:
      "An arguer says banning phones in classrooms is just like banning books from libraries, since both restrict access to information. How should this analogy be classified?",
    choices: [
      "Weak — a key difference: phones disrupt others, books do not.",
      "Weak — phones and books are different objects.",
      "Strong — the relevant similarity holds.",
    ],
    correctIndex: 0,
    explanation:
      "The analogy is weak because of a key difference: phones are banned for disrupting the learning environment, while books are the learning environment — the purposes of the two bans differ completely. The shared trait ('restricts access to information') is superficial next to this difference. Strong analogies need similarity in the respects relevant to the conclusion; here the relevant respect is why each item is restricted, and on that respect the cases are opposites.",
    ...V1,
  },
  {
    id: "d-f136",
    kind: "classify",
    skillIds: ["f-analogy"],
    difficulty: 1,
    prompt:
      "A teacher says learning piano is like learning a language: both require daily practice of small patterns until they become automatic. How should this analogy be classified?",
    choices: [
      "Weak — the comparison is merely poetic.",
      "Strong — the similarity is relevant to how learning works.",
      "Weak — pianos and languages are different things.",
    ],
    correctIndex: 1,
    explanation:
      "The analogy is strong because the similarity — daily practice of small patterns building automaticity — is directly relevant to the point about how learning works. That pianos and languages are 'different things' is too crude an objection; analogies compare respects, not whole objects, and the relevant respect here matches. When the shared feature is the mechanism behind the conclusion, the analogy does real argumentative work.",
    ...V1,
  },
  {
    id: "d-f137",
    kind: "classify",
    skillIds: ["f-analogy"],
    difficulty: 2,
    prompt:
      "A pundit argues the national economy is like a household budget: just as families must not spend more than they earn, governments must not run deficits. How should this analogy be classified?",
    choices: [
      "Weak — economies are bigger than households.",
      "Strong — both involve income and spending.",
      "Weak — a key difference: governments can borrow across generations and print currency; households cannot.",
    ],
    correctIndex: 2,
    explanation:
      "The analogy is weak because of a key structural difference: governments borrow in their own currency, roll debt across generations, and set monetary policy — powers no household has. The shared vocabulary of 'income and spending' is superficial next to these differences, which directly affect whether deficits are dangerous. Size alone would be a weak objection; the specific powers that change the logic of debt are what break the analogy.",
    ...V1,
  },
  {
    id: "d-f138",
    kind: "classify",
    skillIds: ["f-analogy"],
    difficulty: 2,
    prompt:
      "A consultant says a new manager is like a new coach: both inherit an existing team, must quickly learn its strengths, and earn trust before changing systems. How should this analogy be classified?",
    choices: [
      "Strong — the similarities concern exactly what the advice is about.",
      "Weak — sports and business are different fields.",
      "Weak — coaches wear whistles.",
    ],
    correctIndex: 0,
    explanation:
      "The analogy is strong because every shared trait — inheriting a team, learning strengths, earning trust before changing systems — is relevant to the managerial advice being given. 'Different fields' is not by itself a defeater; what matters is whether the cases are alike in the respects the conclusion depends on. Here they are. A strong analogy does not need identical cases, only cases identical where it counts.",
    ...V1,
  },
  {
    id: "d-f139",
    kind: "classify",
    skillIds: ["f-analogy"],
    difficulty: 2,
    prompt:
      "A lawyer argues that deleting incriminating emails is like shredding subpoenaed documents: both destroy evidence the other side is entitled to see. How should this analogy be classified?",
    choices: [
      "Weak — shredding is louder than deleting.",
      "Strong — the relevant similarity (destroying evidence) drives the legal point.",
      "Weak — emails and paper are different media.",
    ],
    correctIndex: 1,
    explanation:
      "The analogy is strong because the legally relevant respect — destroying evidence another party is entitled to — is identical in both cases. The medium (digital versus paper) is irrelevant to the legal conclusion about spoliation. This shows how to judge analogies: identify the conclusion, ask which respects bear on it, and check whether the cases match on those respects. Here they match exactly where it matters.",
    ...V1,
  },
  {
    id: "d-f140",
    kind: "classify",
    skillIds: ["f-analogy"],
    difficulty: 3,
    prompt:
      "A debater says choosing a college is like buying a car: both are major purchases, so you should shop for the best deal. How should this analogy be classified?",
    choices: [
      "Weak — cars have warranties and colleges do not.",
      "Strong — both are major purchases.",
      "Weak — a key difference: education is a transformative experience, not a commodity with a fixed feature list.",
    ],
    correctIndex: 2,
    explanation:
      "The analogy is weak because of a key difference: a college education transforms the buyer over four years through relationships, mentors, and intellectual growth, while a car is a finished commodity with fixed specifications. 'Major purchase' is a superficial similarity that does not support 'shop for the best deal' — the deal metaphor fits commodities, not formative experiences. The warranty joke is a difference, but not the relevant one; the relevant one concerns what kind of good is being chosen.",
    ...V1,
  },
  {
    id: "d-f141",
    kind: "classify",
    skillIds: ["f-analogy"],
    difficulty: 3,
    prompt:
      "An arguer claims we should not repair the old bridge, because the Romans built bridges lasting two millennia without modern engineering. How should this analogy be classified?",
    choices: [
      "Weak — a key difference: Roman bridges carried foot traffic, not modern truck loads and traffic volumes.",
      "Weak — the Romans are long dead.",
      "Strong — Roman bridges prove old methods suffice.",
    ],
    correctIndex: 0,
    explanation:
      "The analogy is weak because of a key difference in demands: Roman bridges carried pedestrians, carts, and legions — not forty-ton trucks at highway volumes. The conclusion concerns whether the bridge is safe for modern use, and the relevant respect is load-bearing demand, on which the cases differ enormously. 'The Romans are dead' is a true but irrelevant difference; the load difference is the one that bears on the conclusion. Always attack the respect the conclusion depends on.",
    ...V1,
  },
  {
    id: "d-f142",
    kind: "classify",
    skillIds: ["f-analogy"],
    difficulty: 3,
    prompt:
      "A writing coach says a trial lawyer's opening statement is like a movie trailer: both preview what is coming to shape the audience's expectations. How should this analogy be classified?",
    choices: [
      "Weak — trailers are shorter than opening statements.",
      "Strong — the shared function (previewing to shape expectations) is the point of the comparison.",
      "Weak — trials are serious and movies are entertainment.",
    ],
    correctIndex: 1,
    explanation:
      "The analogy is strong because the comparison is explicitly functional: both are previews designed to shape expectations, and that function is exactly what the coach is teaching. The seriousness difference and the length difference are real but irrelevant to the point about previewing. This illustrates the general rule: an analogy stands or falls on the respects it invokes. When the invoked respect genuinely matches, objections from other respects miss the target.",
    ...V1,
  },

  // ==================================================================
  // f-flaws — d-f143–152: name the flaw (standard flaw taxonomy).
  // ==================================================================
  {
    id: "d-f143",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 1,
    prompt:
      "Do not trust the treasurer's budget proposal — he was caught cheating on his taxes last year. Which flaw does this argument commit?",
    choices: [
      "Ad hominem — attacking the person instead of the proposal.",
      "Straw man — misrepresenting the proposal.",
      "False dilemma — offering only two options.",
    ],
    correctIndex: 0,
    explanation:
      "This is an ad hominem: it attacks the treasurer's character instead of engaging with the budget proposal's merits. Even a tax cheat can write a sound budget; the proposal must be judged on its numbers, not its author's sins. Ad hominem is tempting because distrusting a person feels like a reason to distrust their claims — but the argument's quality is independent of the arguer's character.",
    ...V1,
  },
  {
    id: "d-f144",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 1,
    prompt:
      "The councilor proposed reviewing the parade route, which obviously means she wants to cancel the parade entirely. Which flaw does this argument commit?",
    choices: [
      "Appeal to authority — citing an unqualified source.",
      "Straw man — distorting the councilor's position into an extreme version.",
      "Circular reasoning — assuming what it tries to prove.",
    ],
    correctIndex: 1,
    explanation:
      "This is a straw man: it replaces the councilor's modest proposal (reviewing the route) with an extreme distortion (canceling the parade) and attacks the distortion. Refuting the exaggerated version does nothing to the actual position. The straw man is persuasive because the extreme version is easy to defeat — but defeating a caricature is not defeating the argument.",
    ...V1,
  },
  {
    id: "d-f145",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 2,
    prompt:
      "The lot offers 'free' parking, and freedom is priceless — so this parking must be priceless. Which flaw does this argument commit?",
    choices: [
      "Hasty generalization — leaping from one case to all.",
      "Slippery slope — predicting an extreme chain reaction.",
      "Equivocation — using 'free' in two different senses.",
    ],
    correctIndex: 2,
    explanation:
      "This is equivocation: the word 'free' shifts meaning mid-argument, from 'costing nothing' (the parking) to 'liberty' (priceless freedom). The argument works only if 'free' means the same thing throughout; once the meanings split, the inference collapses. Equivocation hides in familiar words — 'free,' 'natural,' 'fair' — whose multiple senses let an argument smuggle in a meaning it never earned.",
    ...V1,
  },
  {
    id: "d-f146",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 2,
    prompt:
      "Either we build the stadium or downtown dies — there is no third option. Which flaw does this argument commit?",
    choices: [
      "False dilemma — presenting two options as the only ones.",
      "Appeal to ignorance — treating unproven as proven.",
      "Red herring — distracting with an irrelevant topic.",
    ],
    correctIndex: 0,
    explanation:
      "This is a false dilemma: it frames the choice as stadium-or-doom while ignoring the many middle paths — renovating existing venues, phased development, other investments. The argument's force comes entirely from the missing alternatives; restore them, and the pressure to build evaporates. Whenever you hear 'either/or' with dramatic stakes, ask what options were quietly deleted from the menu.",
    ...V1,
  },
  {
    id: "d-f147",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 2,
    prompt:
      "The new policy is fair because it treats everyone fairly. Which flaw does this argument commit?",
    choices: [
      "Appeal to popularity — citing majority belief.",
      "Circular reasoning — the conclusion merely restates the premise.",
      "False cause — confusing correlation with causation.",
    ],
    correctIndex: 1,
    explanation:
      "This is circular reasoning (begging the question): the premise 'it treats everyone fairly' is just the conclusion 'it is fair' in different words. No independent reason is ever given — the argument goes in a circle, assuming exactly what it sets out to prove. Circularity is often disguised by rephrasing, so test every argument by asking: does the premise give me any reason I did not already need the conclusion to accept?",
    ...V1,
  },
  {
    id: "d-f148",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 2,
    prompt:
      "My two neighbors hate the new bus route, so the whole city hates it. Which flaw does this argument commit?",
    choices: [
      "Straw man — misrepresenting the bus route's supporters.",
      "Equivocation — shifting the meaning of 'hate.'",
      "Hasty generalization — leaping from a tiny sample to a whole population.",
    ],
    correctIndex: 2,
    explanation:
      "This is a hasty generalization: two neighbors are far too few to support a claim about an entire city. Small samples are volatile and unrepresentative — these two might live on the noisiest corner of the route. The flaw is not that the neighbors' views are false, but that the evidence is too thin to carry the conclusion's weight. Generalizations need samples that are both large enough and representative.",
    ...V1,
  },
  {
    id: "d-f149",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 3,
    prompt:
      "The famous actor says this supplement boosts immunity, so it must work. Which flaw does this argument commit?",
    choices: [
      "Appeal to authority — citing someone unqualified on the topic.",
      "Ad hominem — attacking the actor's character.",
      "False dilemma — ignoring other supplements.",
    ],
    correctIndex: 0,
    explanation:
      "This is an appeal to (irrelevant) authority: the actor's fame gives him no expertise in immunology, so his endorsement carries no evidential weight. Legitimate appeals to authority cite qualified experts speaking within their field; celebrity, wealth, or confidence are not qualifications. The flaw exploits our habit of deferring to high-status voices — a habit that serves us well only when the status is relevant to the claim.",
    ...V1,
  },
  {
    id: "d-f150",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 3,
    prompt:
      "If we allow food trucks on Main Street, soon every sidewalk will be blocked, restaurants will close, and downtown will collapse. Which flaw does this argument commit?",
    choices: [
      "Hasty generalization — generalizing from one food truck.",
      "Slippery slope — predicting an extreme chain without showing each step follows.",
      "Circular reasoning — assuming the conclusion.",
    ],
    correctIndex: 1,
    explanation:
      "This is a slippery slope: it predicts a catastrophic chain — trucks to blocked sidewalks to closed restaurants to collapsed downtown — without establishing that each step would actually lead to the next. Slippery slopes are not always fallacious; they fail when the links are asserted rather than shown. Here no mechanism connects 'some food trucks' to 'downtown collapses,' so the horror story is doing the arguing that evidence should do.",
    ...V1,
  },
  {
    id: "d-f151",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 3,
    prompt:
      "No one has proven the old riverside trail is unsafe, so it must be safe. Which flaw does this argument commit?",
    choices: [
      "False cause — confusing correlation with causation.",
      "Red herring — changing the subject.",
      "Appeal to ignorance — treating the absence of proof as proof.",
    ],
    correctIndex: 2,
    explanation:
      "This is an appeal to ignorance: it treats 'not proven unsafe' as 'proven safe,' but absence of evidence is not evidence of absence — perhaps no one has studied the trail at all. The burden of proof for a safety claim is positive evidence of safety, not the mere lack of a damning study. This flaw thrives wherever investigation is incomplete, letting the arguer convert nobody-knows into we-know.",
    ...V1,
  },
  {
    id: "d-f152",
    kind: "classify",
    skillIds: ["f-flaws"],
    difficulty: 3,
    prompt:
      "Yes, the department is over budget — but look at our award-winning parks program! Which flaw does this argument commit?",
    choices: [
      "Red herring — distracting with an irrelevant accomplishment.",
      "Straw man — misrepresenting the budget criticism.",
      "Equivocation — shifting the meaning of 'budget.'",
    ],
    correctIndex: 0,
    explanation:
      "This is a red herring: the award-winning parks program is irrelevant to whether the department overspent its budget. The shiny accomplishment distracts attention from the charge without answering it — the budget could be both over and attached to lovely parks. Red herrings work by changing the emotional subject; the defense is to keep your eye on the original question and ask whether the new topic actually addresses it.",
    ...V1,
  },
];
