/**
 * LSAT Compass — Stage 1 lessons (reasoning foundations).
 *
 * ids "1.1".."1.15". All prose is original. Contract: content-schema.md
 * §§0, 1, 4, 7, 9. Tryit blocks reference foundation drill ids d-f001–d-f152
 * per the coordinator's deterministic skill→drill mapping.
 */

export type LessonBlock =
  | { kind: 'prose'; md: string }
  | { kind: 'keyterm'; term: string; definition: string }
  | { kind: 'example'; title: string; body: string; note?: string }
  | { kind: 'worked'; title: string; steps: { label: string; body: string }[] }
  | {
      kind: 'checkpoint';
      prompt: string;
      choices: string[];
      correctIndex: number;
      explanation: string;
    }
  | { kind: 'tryit'; drillIds: string[] }
  | { kind: 'misconception'; wrong: string; right: string }
  | { kind: 'retrieval'; prompt: string; answer: string }
  | { kind: 'summary'; points: string[] }
  | { kind: 'next'; text: string };

export interface Lesson {
  id: string;
  stage: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  title: string;
  estimatedMinutes: number;
  skills: string[];
  prerequisites: string[];
  blocks: LessonBlock[];
  version: number;
}

export const LESSONS_1: Lesson[] = [
  {
    id: '1.1',
    stage: 1,
    title: 'Argument vs. Non-Argument',
    estimatedMinutes: 10,
    skills: ['f-argument'],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Everything in Logical Reasoning starts with one question: is someone actually arguing here? An argument is someone trying to convince you of something — offering reasons for a claim. But LSAT passages also contain reports, descriptions, stories, and background facts where nobody is trying to convince you of anything. If you treat a mere report like an argument, you will hunt for flaws and assumptions that are not there.',
      },
      {
        kind: 'keyterm',
        term: 'Argument',
        definition:
          'A set of claims in which one claim (the conclusion) is supported by one or more other claims (the premises). The test: is the author giving reasons to believe something, or just telling you things?',
      },
      {
        kind: 'example',
        title: 'Same topic, different jobs',
        body: 'Argument: "The city should close Elm Street to cars. Pedestrian-only streets in comparable neighborhoods raised retail revenue by a fifth, and Elm Street merchants have requested the change for years." Non-argument: "Elm Street was paved in 1911. It runs for six blocks through the old market district. The city resurfaced it last spring." The first tries to convince you of a course of action; the second just reports facts. Only the first can be weakened, flawed, or assumed.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Read this passage: "The new dam will flood 200 acres of farmland. Construction begins in March and will employ 400 workers." Is it an argument?',
        choices: [
          'Yes — it gives reasons to oppose the dam',
          'No — it reports facts without trying to convince you of any claim',
          'Yes — any passage about a controversial project is an argument',
          'No — arguments must contain the word "therefore" or "because"',
        ],
        correctIndex: 1,
        explanation:
          'The passage states facts about the dam — acreage flooded, start date, jobs — but never advances a claim it wants you to accept. Flooding farmland might suggest opposition, but the author does not draw that conclusion or offer these facts as reasons for one. An argument requires someone trying to convince you of something; a controversial topic does not make every passage about it an argument, and no trigger word is ever required.',
      },
      {
        kind: 'prose',
        md: 'Non-arguments come in several flavors. There are pure reports ("Sales rose 4 percent in March"), descriptions ("The gallery occupies three floors"), narratives ("She arrived at noon and left at two"), and lists of facts. There are also explanations, which deserve care: "The streets are wet because it rained" explains why something happened rather than arguing that it did. Explanations give causes; arguments give reasons to believe a claim. When the fact being explained is not in doubt, you are usually looking at an explanation, not an argument.',
      },
      {
        kind: 'worked',
        title: 'Sort these three passages',
        steps: [
          {
            label: 'Passage A',
            body: '"Local beekeeper Ana Ruiz keeps forty hives on her rooftop. She harvests twice a year and sells at the weekend market." Ask: is Ruiz (or the author) trying to convince you of anything? No — this reports facts about her operation. Non-argument.',
          },
          {
            label: 'Passage B',
            body: '"Rooftop beekeeping should be encouraged. Ruiz\'s forty hives pollinate the community garden two blocks away, and her honey outsells imported brands at the market." Ask: is there a claim being pushed? Yes — "should be encouraged" — backed by reasons. Argument.',
          },
          {
            label: 'Passage C',
            body: '"Honey crystallizes because glucose separates from water over time. Warming the jar gently reverses the process." Ask: is anyone arguing? No — this explains a phenomenon nobody disputes. Non-argument (explanation).',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If a passage contains the word "because," it must be an argument.',
        right:
          '"Because" often introduces a premise — but just as often it introduces a causal explanation of an undisputed fact. "The bridge closed because the cables frayed" explains; it does not argue. Always ask whether someone is trying to convince you of a claim, not whether a trigger word appears.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which of the following is an argument?',
        choices: [
          '"The marathon drew 12,000 runners last year, up from 9,000 the year before. The course winds through the old town and finishes at the harbor."',
          '"The marathon route should be changed. Last year several runners collapsed in the harbor-side heat, and the medical tents were overwhelmed for an hour."',
          '"Marathon runners often hit a wall around mile twenty because their glycogen stores run low."',
          '"The first city marathon was held in 1981. It has been run every spring since, except in 2020."',
        ],
        correctIndex: 1,
        explanation:
          'Only the second passage tries to convince you of something — the claim that the route should be changed — and offers reasons (collapses, overwhelmed medical tents) in support. The first is a report of facts, the third is a causal explanation of an undisputed phenomenon, and the fourth is historical background. The test is always whether reasons are being offered for a claim, not how forceful the prose sounds.',
      },
      {
        kind: 'example',
        title: 'A trickier case: opinion without argument',
        body: '"In my view, the new library is an eyesore. The architect ignored the neighborhood\'s brick tradition, and the glass facade glares in the afternoon sun." This is an argument (opinion + reasons). Contrast: "In my view, the new library is an eyesore. It opened in March and cost forty million dollars." The first sentence is an opinion, but no reasons support it — the other sentences are unrelated facts. Opinion alone is not an argument; reasons are what make it one.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f001', 'd-f002', 'd-f003'],
      },
      {
        kind: 'summary',
        points: [
          'An argument offers reasons for a claim; a non-argument merely reports, describes, narrates, or explains.',
          'Opinions, explanations, and "because" sentences are not automatically arguments.',
          'The test: is someone trying to convince you of something?',
          'Only arguments can have flaws, assumptions, and conclusions — so sort first, analyze second.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'What is the one-question test for whether a passage contains an argument?',
        answer:
          'Ask whether the author is giving reasons to believe a claim — trying to convince you of something — rather than merely reporting facts, describing, storytelling, or explaining an undisputed fact.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.2 takes arguments apart: how to find the conclusion and the premises, including the tricky middle cases called intermediate conclusions.',
      },
    ],
  },
  {
    id: '1.2',
    stage: 1,
    title: 'Premises and Conclusions',
    estimatedMinutes: 12,
    skills: ['f-premise-conclusion'],
    prerequisites: ['f-argument'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Once you know a passage contains an argument, your first job is always the same: find the conclusion. The conclusion is the point — the claim the author wants you to accept. Everything else in the argument exists to support it. Students who skip this step and dive into the answer choices end up evaluating each choice against a vague feeling of the passage instead of against the actual claim. Five seconds spent finding the conclusion saves minutes of confusion.',
      },
      {
        kind: 'keyterm',
        term: 'Conclusion',
        definition:
          'The claim the argument is trying to establish — the point the premises are offered to support. Ask: "What is the author trying to get me to believe?" The answer is the conclusion.',
      },
      {
        kind: 'keyterm',
        term: 'Premise',
        definition:
          'A reason offered in support of the conclusion: evidence, a fact, a principle, or an observation the author uses to back up the point. Ask: "Why should I believe the conclusion?" The answers are the premises.',
      },
      {
        kind: 'example',
        title: 'A simple split',
        body: '"The night bus should run more often. Ridership has doubled in two years, and the current buses are regularly too full to board." Conclusion: the night bus should run more often. Premises: ridership doubled; buses are too full to board. Notice the conclusion is a recommendation ("should"), while the premises are factual claims offered as reasons for it.',
      },
      {
        kind: 'checkpoint',
        prompt: '"The café extended its hours. Late-night cafés attract students, and students buy a lot of coffee. So the extension was a smart move." What is the conclusion?',
        choices: [
          'The café extended its hours',
          'Late-night cafés attract students',
          'Students buy a lot of coffee',
          'The extension was a smart move',
        ],
        correctIndex: 3,
        explanation:
          'The author\'s point is the evaluation — that extending hours was smart — and everything else is offered as a reason for it. The extension itself is a background fact, while the claims about students are premises explaining why the move should succeed. Ask what the author wants you to believe rather than which sentence sounds most factual: the judgment call being defended is the conclusion.',
      },
      {
        kind: 'prose',
        md: 'Now the wrinkle that makes this skill worth a whole lesson: intermediate conclusions. Sometimes a claim is supported by a premise and in turn supports the main conclusion — it is both a conclusion (of one inference) and a premise (for the next). Consider: "The soil samples show heavy contamination. Contaminated soil makes the site unsafe for a playground. So the site is unsafe, and therefore the playground proposal should be rejected." "The site is unsafe" is supported by the contamination evidence and supports the final recommendation. It is the bridge in the middle of the argument.',
      },
      {
        kind: 'worked',
        title: 'Dissect a four-sentence argument',
        steps: [
          {
            label: 'The stimulus',
            body: '"The downtown arena loses money every year. A venue that cannot cover its costs is a burden on taxpayers. The arena is therefore a burden on taxpayers, so the city should sell it." Read it once straight through before labeling anything.',
          },
          {
            label: 'Find the main conclusion',
            body: 'Ask what the author ultimately wants: the city should sell the arena. That is the final recommendation — everything else funnels toward it. Note it comes last here, but do not rely on position.',
          },
          {
            label: 'Find the intermediate conclusion',
            body: '"The arena is a burden on taxpayers" is supported by the first two sentences and then used to support selling it. It is both a mini-conclusion and a premise for the final step — the bridge.',
          },
          {
            label: 'Find the premises',
            body: 'The raw materials: the arena loses money every year, and a venue that cannot cover its costs burdens taxpayers. Neither is supported by anything else; both are offered as givens.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The conclusion is always the last sentence of the passage.',
        right:
          'Conclusions appear anywhere — first, middle, or last. Authors often open with their point and then give reasons, or bury it mid-paragraph. Position is a hint at best; the real test is logical role: which claim is everything else trying to support?',
      },
      {
        kind: 'checkpoint',
        prompt: 'Consider: "The lake\'s water level has fallen three feet since 2010. Falling levels expose the intake pipes, and exposed intakes force the treatment plant to shut down. The plant will therefore face shutdowns, so the town must find another water source." What is the main conclusion?',
        choices: [
          'The lake\'s water level has fallen three feet since 2010',
          'Falling levels expose the intake pipes',
          'The plant will face shutdowns',
          'The town must find another water source',
        ],
        correctIndex: 3,
        explanation:
          'The main conclusion is the final recommendation: the town must find another water source. The falling water level is a premise (a given fact), the exposed intakes are a premise about consequences, and "the plant will face shutdowns" is an intermediate conclusion — it is supported by the earlier claims and in turn supports the recommendation. Ask what the author ultimately wants you to accept or do, and the recommendation is the endpoint of the reasoning chain.',
      },
      {
        kind: 'example',
        title: 'Conclusion first',
        body: '"Coffee after 2 p.m. is a bad idea. Caffeine has a half-life of about six hours, so an afternoon cup is still active at midnight, and active caffeine fragments sleep." The conclusion leads. The "so" sentence packs two premises: the half-life fact and the sleep-fragmentation claim. Reading conclusion-first passages, let the opening claim set up the question "why should I believe that?" — then collect the answers.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f011', 'd-f012', 'd-f013'],
      },
      {
        kind: 'summary',
        points: [
          'The conclusion is the claim the argument tries to establish; premises are the reasons offered for it.',
          'Intermediate conclusions are bridges: supported by premises, supporting the main conclusion.',
          'Conclusions can appear anywhere — identify by logical role, not position.',
          'Always find the conclusion before touching the answer choices.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Define premise, conclusion, and intermediate conclusion, and give the question you ask to find each.',
        answer:
          'A conclusion is the claim the argument tries to establish ("What does the author want me to believe?"). A premise is a reason offered for it ("Why should I believe that?"). An intermediate conclusion is a claim that is both supported by a premise and used to support the main conclusion — the bridge in the middle of the reasoning.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.3 covers indicator language: the clue words like "therefore" and "because" that often mark conclusions and premises — and the traps they set.',
      },
    ],
  },
  {
    id: '1.3',
    stage: 1,
    title: 'Indicator Language',
    estimatedMinutes: 10,
    skills: ['f-indicators'],
    prerequisites: ['f-premise-conclusion'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Authors leave fingerprints. Certain words — therefore, because, since, thus, for — usually signal that a conclusion or a premise is nearby. Learning these indicator words gives you a fast first pass at argument structure: scan for the fingerprints, then verify by asking what is supporting what. They are a shortcut, not a substitute, for the logical-role test from lesson 1.2.',
      },
      {
        kind: 'keyterm',
        term: 'Conclusion indicators',
        definition:
          'Words that typically introduce the conclusion: therefore, thus, hence, so, consequently, accordingly, it follows that, as a result. When you see one, the claim that follows is usually the point being argued for.',
      },
      {
        kind: 'keyterm',
        term: 'Premise indicators',
        definition:
          'Words that typically introduce a premise: since, because, for, given that, after all, in that, seeing as. The claim that follows is usually a reason offered in support of something else.',
      },
      {
        kind: 'example',
        title: 'Indicators at work',
        body: '"The reservoir is low for June. Since snowpack was thin all winter, inflow has been weak; consequently, the town should restrict lawn watering." "Since" flags a premise (thin snowpack explains weak inflow); "consequently" flags the conclusion (restrict watering). The indicators hand you the structure: facts first, recommendation at the end.',
      },
      {
        kind: 'checkpoint',
        prompt: 'In "The roads are icy, for the temperature fell below freezing overnight," what role does "for" play?',
        choices: [
          'It marks a conclusion — the temperature claim is the point',
          'It marks a premise — the temperature drop is offered as a reason for the icy-roads claim',
          'It is an ordinary preposition with no logical role',
          'It marks a contrast with an earlier claim',
        ],
        correctIndex: 1,
        explanation:
          'Here "for" works like "because": the overnight temperature drop is given as the reason to believe the roads are icy, which makes it a premise indicator and the icy-roads claim the conclusion it supports. This is the standard logical use of "for" — but keep the lesson\'s warning in mind and always verify by asking what supports what, since "for" frequently appears as a mere preposition.',
      },
      {
        kind: 'worked',
        title: 'Annotate a stimulus',
        steps: [
          {
            label: 'The stimulus',
            body: '"After all, the merger will reduce competition. Fewer competitors means higher prices for consumers; thus regulators should block the deal." Mark every candidate indicator before deciding anything.',
          },
          {
            label: 'Classify each marker',
            body: '"After all" is a premise indicator — the competition claim is offered as a reason. "Thus" is a conclusion indicator — "regulators should block the deal" is the point. The middle sentence ("fewer competitors means higher prices") has no indicator; it is a premise by role, supporting the recommendation.',
          },
          {
            label: 'Verify by role, not just words',
            body: 'Ask the lesson-1.2 questions: what does the author want? Regulators blocking the deal. Why? Reduced competition and higher prices. The indicators agree with the logical roles — when they do, you can move fast with confidence.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Indicator words always play their usual role, so you can classify sentences mechanically.',
        right:
          'Context can flip a word\'s job. "Since" is often temporal ("since 2010, sales have risen") rather than logical. "So" can mark degree ("so crowded") rather than a conclusion. "For" can be a preposition. Use indicators as a first hypothesis, then confirm by asking what supports what — the logical-role test always outranks the word.',
      },
      {
        kind: 'checkpoint',
        prompt: 'In "The trail has been closed since the landslide, so hikers should use the north route," how are the indicator words functioning?',
        choices: [
          '"since" marks a premise and "so" marks the conclusion',
          '"since" is temporal (telling when) and "so" marks the conclusion',
          'Both "since" and "so" mark premises',
          '"since" marks the conclusion and "so" marks a premise',
        ],
        correctIndex: 1,
        explanation:
          'Here "since" is temporal — it tells you when the trail closed (since the landslide), not a reason offered as support. The actual premise is the landslide-caused closure itself, and "so" genuinely introduces the conclusion (hikers should use the north route). This is the classic indicator trap: "since" wearing its time-meaning rather than its reason-meaning, which is why you always verify a word\'s role against the logic of the passage.',
      },
      {
        kind: 'example',
        title: 'Indicators buried in longer prose',
        body: '"Critics call the festival a tourist trap. Yet attendance has grown every year for a decade, and surveys show most attendees are locals. The festival, in short, belongs to the town." "In short" functions like "therefore," flagging the concluding appraisal. "Yet" pivots from the critics\' view to the author\'s evidence. Even without textbook words, the author signals structure — train your eye for the whole family of signaling phrases, not just the famous ones.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f023', 'd-f024', 'd-f025'],
      },
      {
        kind: 'summary',
        points: [
          'Conclusion indicators (therefore, thus, so, consequently) usually introduce the point; premise indicators (since, because, for, after all) usually introduce reasons.',
          'Use indicators as a fast first hypothesis for structure.',
          'Words can mislead: "since" may be temporal, "so" may mark degree — always verify by logical role.',
          'The what-supports-what test outranks any single word.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Name three conclusion indicators and three premise indicators, plus the rule for using them safely.',
        answer:
          'Conclusion: therefore, thus, consequently (also hence, so, it follows that). Premise: since, because, for (also given that, after all). The rule: treat them as a first hypothesis and always verify by asking what supports what, since words like "since" and "so" have non-logical uses.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.4 zooms out from individual claims to the whole skeleton: how premises combine, chain, and support conclusions in full argument structures.',
      },
    ],
  },
  {
    id: '1.4',
    stage: 1,
    title: 'Argument Structure',
    estimatedMinutes: 12,
    skills: ['f-structure'],
    prerequisites: ['f-premise-conclusion'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Finding the conclusion and premises is like identifying the players; mapping the structure is seeing the play. Arguments have shapes: sometimes two premises independently support the conclusion, sometimes they link together into a chain, and sometimes the author first considers an opposing view and then knocks it down. Recognizing the shape tells you where the argument is vulnerable — and nearly every Logical Reasoning question attacks exactly that spot.',
      },
      {
        kind: 'keyterm',
        term: 'Support structure',
        definition:
          'The pattern by which premises connect to the conclusion: independent premises each support the conclusion on their own; linked premises work only together; chained premises flow through intermediate conclusions. Background sentences that neither support nor conclude sit outside the structure.',
      },
      {
        kind: 'example',
        title: 'Three shapes',
        body: 'Independent: "The proposal is flawed. It exceeds the budget, and it ignores the traffic study." Either reason alone supports the verdict. Linked: "The pass is valid today, and today is Tuesday." Neither fact alone gets you anywhere; together they license entry. Chained: "The roads are icy. Icy roads make driving dangerous. So driving is dangerous, so stay home." Each step feeds the next.',
      },
      {
        kind: 'checkpoint',
        prompt: '"The policy failed. Costs tripled, and not a single target was met." How do the two premises support the conclusion?',
        choices: [
          'They are linked — neither fact alone suggests failure',
          'They are independent — each one alone supports the verdict that the policy failed',
          'The first is a premise and the second is an intermediate conclusion',
          'The second premise contradicts the first, creating a paradox',
        ],
        correctIndex: 1,
        explanation:
          'Triple costs alone would support calling the policy a failure, and zero targets met alone would do the same — each premise independently carries the conclusion. That is the mark of independent support: remove either premise and the argument still stands on the other. Linked premises need each other to work, and there is no chain of inference here at all, so neither of those structures fits.',
      },
      {
        kind: 'worked',
        title: 'Map a stimulus step by step',
        steps: [
          {
            label: 'Number the claims',
            body: '"[1] Some argue the night market hurts local shops. [2] But shop revenue on market nights has actually risen 15 percent. [3] The market draws foot traffic the shops could never attract alone. [4] So the market helps, not hurts, local shops." Four claims, numbered. Now sort them by role.',
          },
          {
            label: 'Spot the counter-consideration',
            body: 'Claim [1] is an opposing view the author raises only to reject — "some argue" plus "but" is the giveaway. It is part of the structure (it frames the debate) but it does not support the conclusion.',
          },
          {
            label: 'Draw the support arrows',
            body: 'Claims [2] and [3] are independent premises, each supporting [4] on its own: revenue rose, and foot traffic increased. The conclusion [4] directly answers the opposing view in [1]. Structure: opposing view → rejected by two independent premises → conclusion.',
          },
        ],
      },
      {
        kind: 'prose',
        md: 'Notice what the map leaves out: background. Passages often open with scene-setting sentences — "The night market opened in 2019 and runs every Friday" — that neither support the conclusion nor state it. They are context, not structure. A common error is treating every sentence as a premise; instead, ask of each sentence: does this give a reason for the conclusion, state the conclusion, or just set the scene?',
      },
      {
        kind: 'misconception',
        wrong: 'Every sentence in the stimulus is either a premise or the conclusion.',
        right:
          'Many sentences are background: context, scene-setting, or concessions that do no logical work. Forcing every sentence into the argument produces phantom premises and misread questions. Map only the sentences that play a supporting or concluding role; let the rest be scenery.',
      },
      {
        kind: 'checkpoint',
        prompt: '"[1] The new dam will generate cheap power. [2] Reservoirs behind similar dams have bred mosquitoes carrying disease. [3] Therefore the dam project should be halted." What is the structure?',
        choices: [
          'Claims 1 and 2 are independent premises both supporting claim 3',
          'Claim 1 is a counter-consideration acknowledged by the author; claim 2 is the premise actually supporting the conclusion in claim 3',
          'Claims 1 and 2 are linked premises that only work together to support claim 3',
          'Claim 1 is the conclusion and claims 2 and 3 are premises for it',
        ],
        correctIndex: 1,
        explanation:
          'Claim 1 (cheap power) is a point in the dam\'s favor, but the author\'s conclusion is to halt the project — so claim 1 cannot be supporting that conclusion. It is a counter-consideration: an opposing point the author implicitly concedes before overriding it with claim 2 (disease risk), which is the real premise driving the "halt" verdict. Recognizing conceded opposing points keeps you from misreading which side of the argument a premise is on.',
      },
      {
        kind: 'example',
        title: 'A chain with a hidden background sentence',
        body: '"Ferries are the island\'s only link to the mainland. [Background: the ferry company was founded in 1962.] Winter storms frequently cancel sailings. Canceled sailings strand medical patients. So winter ferry reliability is a public-health issue." The founding date is scenery. The live chain: only link → cancellations → stranded patients → public-health conclusion. Strip scenery first, then the chain is easy to follow — and to attack.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f033', 'd-f034', 'd-f035'],
      },
      {
        kind: 'summary',
        points: [
          'Arguments have shapes: independent premises, linked premises, chains through intermediate conclusions, and counter-considerations.',
          'Map claims by role: which support the conclusion, which oppose it, which are scenery.',
          'Background sentences that neither support nor conclude sit outside the structure — do not force them in.',
          'Structure reveals vulnerability: most LR questions attack the weakest link you just mapped.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Describe the four structural roles a sentence can play in an argument.',
        answer:
          'It can be the main conclusion (the point), a premise (a reason supporting the point, possibly via an intermediate conclusion), a counter-consideration (an opposing view raised and rejected or conceded), or background scenery that does no logical work.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.5 tackles what arguments leave unsaid: assumptions — the hidden premises that hold the whole structure up.',
      },
    ],
  },
  {
    id: '1.5',
    stage: 1,
    title: 'Assumptions: Necessary, Sufficient, and Helpful',
    estimatedMinutes: 13,
    skills: ['f-assumption'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Most arguments you will see on the LSAT lean on something they never say out loud. The premises often do not quite reach the conclusion on their own — there is usually a gap, and the author crosses it on an unstated belief: an assumption. (Tight deductive arguments may have no gap at all; the skill is noticing when one exists.) Learning to spot the gap and name what would fill it is one of the highest-leverage skills on the test, because weaken, strengthen, flaw, and assumption questions frequently turn on that hidden support — though each question type has its own task and standard, and assumption-hunting is not a substitute for them.',
      },
      {
        kind: 'keyterm',
        term: 'Assumption',
        definition:
          'An unstated premise the argument relies on — something that must be taken for granted for the reasoning to work. It is not just anything the author did not say; it is the specific missing link between the stated premises and the conclusion.',
      },
      {
        kind: 'example',
        title: 'Find the gap',
        body: '"Mara studied for weeks, so she will pass the bar exam." Stated premise: she studied for weeks. Conclusion: she will pass. The gap: studying leads to passing — but also that the exam will actually take place, that she will show up, that studying was on the right material. The argument silently assumes the bridge holds. Attack any plank of that bridge and the argument wobbles.',
      },
      {
        kind: 'checkpoint',
        prompt: '"The train is never late, so we will arrive on time." What is this argument assuming?',
        choices: [
          'Trains are generally reliable forms of transportation',
          'We will actually catch this train and it will complete its route without disruption',
          'Punctuality is the most important quality in a train service',
          'Other passengers will also arrive on time',
        ],
        correctIndex: 1,
        explanation:
          'The argument leaps from "the train is never late" to "we will arrive on time," silently assuming we board it and nothing interrupts the journey — deny that (we miss the train) and the conclusion collapses. General praise of trains and opinions about punctuality are not load-bearing, and other passengers are irrelevant. An assumption is the specific missing link the reasoning depends on, found by asking what must be true for the premises to reach the conclusion.',
      },
      {
        kind: 'prose',
        md: 'Assumptions come in two strengths, and confusing them is one of the costliest errors on the test. A necessary assumption is something the argument cannot live without — if it is false, the argument collapses. A sufficient assumption is something that, if true, would guarantee the conclusion — it is strong enough to close the gap completely, whether or not the argument actually needs that much. Between them sit merely helpful assumptions: true claims that lend some support without being required or decisive.',
      },
      {
        kind: 'keyterm',
        term: 'Necessary vs. sufficient assumption',
        definition:
          'Necessary: must be true for the argument to survive — deny it and the reasoning falls apart. Sufficient: if true, proves the conclusion all by itself — it is more than the argument needs. Test a candidate with the negation test: negate it, and if the argument dies, it was necessary.',
      },
      {
        kind: 'worked',
        title: 'Sort three candidate assumptions',
        steps: [
          {
            label: 'The argument',
            body: '"The new metro line will reduce downtown traffic, because commuters will switch from cars to the train." Premise: commuters will switch. Conclusion: traffic will fall. Now evaluate three unstated claims.',
          },
          {
            label: 'Candidate A: "The metro will actually open as planned"',
            body: 'Negate it: the metro never opens. Then nobody switches and traffic does not fall — the argument collapses. Necessary: the argument cannot survive its denial.',
          },
          {
            label: 'Candidate B: "Every single car commuter will abandon driving entirely"',
            body: 'If true, traffic certainly falls — it guarantees the conclusion. But the argument does not need anything this strong; a large shift would do. Sufficient but not necessary: more than required.',
          },
          {
            label: 'Candidate C: "The trains will run on time"',
            body: 'Helpful — reliable trains encourage switching — but the argument could survive late trains if commuters switch anyway. It lends support without being required or decisive. Merely helpful.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'An assumption is anything the author believes but did not state.',
        right:
          'Authors believe countless unstated things (that words have meanings, that tomorrow will come). An assumption, in the LSAT sense, is specifically a missing link the reasoning depends on — something connecting the premises to the conclusion. If denying it would not hurt the argument, it is not the argument\'s assumption.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Argument: "This restaurant deserves its five-star rating because its chef trained in Lyon." Which is a necessary assumption?',
        choices: [
          'The chef is the most talented graduate of her Lyon program',
          'Training in Lyon is the only way to become a great chef',
          'The restaurant\'s food is actually good — the chef\'s training reflects in the cooking',
          'Lyon is the culinary capital of France',
        ],
        correctIndex: 2,
        explanation:
          'The argument leaps from "trained in Lyon" to "deserves five stars," silently assuming the training actually shows up in the food — that the credential connects to quality. Negate it (the food is mediocre despite the training) and the argument collapses, which is the mark of a necessary assumption. The other choices are either stronger than needed (most talented, only way) or irrelevant trivia (Lyon\'s reputation) — the negation test exposes which one the reasoning truly depends on.',
      },
      {
        kind: 'example',
        title: 'The negation test in action',
        body: '"Dr. Patel endorses this vitamin, so it must be effective." Candidate assumption: "Dr. Patel is honest about the vitamins she endorses." Negate: she endorses vitamins she knows are useless. The argument dies instantly — necessary. Contrast with "Dr. Patel is the world\'s leading vitamin researcher": nice, sufficient-ish, but the argument only needs her endorsement to mean something, not her to be the best. When in doubt, negate and watch.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f045', 'd-f046', 'd-f047'],
      },
      {
        kind: 'summary',
        points: [
          'An assumption is the unstated link the reasoning depends on — not just anything unsaid.',
          'Necessary: the argument dies if it is false. Sufficient: if true, it proves the conclusion (more than needed).',
          'The negation test identifies necessary assumptions: negate the candidate and see if the argument collapses.',
          'Weaken, strengthen, flaw, and assumption questions all probe this same hidden support.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Explain the difference between necessary and sufficient assumptions and how the negation test works.',
        answer:
          'A necessary assumption must be true for the argument to survive; a sufficient assumption, if true, would guarantee the conclusion but is stronger than the argument needs. The negation test: deny the candidate assumption — if the argument collapses, it was necessary.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.6 draws a crucial distinction the test exploits constantly: the difference between a conclusion that must follow and one that is merely supported.',
      },
    ],
  },
  {
    id: '1.6',
    stage: 1,
    title: 'Deduction vs. Support',
    estimatedMinutes: 11,
    skills: ['f-deduction'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Consider two arguments. "Every member gets a discount, and Ana is a member, so Ana gets a discount." And: "Nine of ten surveyed shoppers prefer the downtown store, so the new branch will probably succeed." The first is airtight: if the premises are true, the conclusion cannot be false. The second is merely persuasive: the premises make the conclusion likely, not certain. The LSAT treats these as fundamentally different achievements, and several question types turn entirely on which one is being asked for.',
      },
      {
        kind: 'keyterm',
        term: 'Deduction (validity)',
        definition:
          'Reasoning in which the conclusion must follow from the premises — it is impossible for the premises to be true and the conclusion false. Validity is all-or-nothing: an argument is either airtight or it is not.',
      },
      {
        kind: 'keyterm',
        term: 'Support (strength)',
        definition:
          'Reasoning in which the premises make the conclusion more likely without guaranteeing it. Strength comes in degrees: evidence can support a conclusion weakly or strongly, and new information can move the needle either way.',
      },
      {
        kind: 'example',
        title: 'Airtight versus likely',
        body: 'Deduction: "All invoices over $500 need approval. This invoice is for $800. So it needs approval." Deny the conclusion while keeping the premises and you contradict yourself — that impossibility is validity. Support: "The last three product launches sold out in a week, so the fourth probably will too." Perfectly reasonable — and perfectly compatible with the fourth launch flopping. That compatibility is what makes it support rather than proof.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which of the following arguments is deductive — its conclusion must follow if its premises are true?',
        choices: [
          'All of the committee members voted yes, so the motion passed unanimously',
          'The last four winters were mild, so this winter will probably be mild too',
          'Most experts agree, so the theory is likely correct',
          'Sales rose each quarter, so next quarter should be strong',
        ],
        correctIndex: 0,
        explanation:
          'If every committee member voted yes, then unanimous passage follows by definition — denying the conclusion while accepting the premises is contradictory, which is the mark of deduction. The other three all project past patterns into the future or weigh expert opinion: reasonable support, but each conclusion could be false while its premises are true. Validity is all-or-nothing; strength is a matter of degree.',
      },
      {
        kind: 'worked',
        title: 'Classify four arguments',
        steps: [
          {
            label: 'Argument 1',
            body: '"No reptiles are mammals. A turtle is a reptile. So no turtle is a mammal." The premises lock the conclusion in — denying it contradicts the premises. Deduction.',
          },
          {
            label: 'Argument 2',
            body: '"The restaurant was packed every night this month, so it will probably still be open next year." Busy now suggests survival, but a rent hike could kill it tomorrow. Support — strong-ish, but not airtight.',
          },
          {
            label: 'Argument 3',
            body: '"If the shipment arrived, the warehouse log would show it. The log shows nothing. So the shipment did not arrive." Deny the conclusion and the second premise becomes inexplicable. Deduction (a contrapositive, which you will master in lesson 1.7).',
          },
          {
            label: 'Argument 4',
            body: '"Most successful founders wake before 6 a.m., so waking early helps success." A real correlation, but the conclusion outruns it — maybe successful people just have demanding schedules. Support — and weak support at that.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'A strong argument and a valid argument are the same thing.',
        right:
          'Validity is binary and structural: either the conclusion must follow or it need not. Strength is a matter of degree and evidence: premises can support a conclusion a little or a lot. A valid argument with false premises proves nothing about the world, and a strong argument can still have a false conclusion — they are different virtues.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which argument is deductive (valid) rather than merely supportive?',
        choices: [
          '"Eighty percent of residents favor the park, so the referendum will likely pass."',
          '"Everyone who registered by Friday may vote. Sam registered Thursday, so Sam may vote."',
          '"The company\'s profits rose three years running, so next year should be profitable too."',
          '"Most published studies support the theory, so the theory is probably correct."',
        ],
        correctIndex: 1,
        explanation:
          'The voting argument is airtight: if everyone who registered by Friday may vote and Sam registered Thursday, then Sam may vote — denying the conclusion contradicts the premises. The other three are all matters of degree: 80 percent favor does not guarantee passage, past profits do not guarantee future ones, and most studies supporting a theory does not make it certain. Only the second argument makes its conclusion unavoidable.',
      },
      {
        kind: 'example',
        title: 'Why the distinction runs the test',
        body: 'Two LSAT question types you will meet in Stage 2 are separated by exactly this line. "Must be true" questions demand deduction: the credited answer follows airtight from the stimulus. "Most strongly supported" questions ask only for support: the answer is the best-supported choice, even though it could theoretically be false. Students who treat both as "find the provable answer" miss support questions; students who treat both as "find the likely answer" miss deduction questions.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f057', 'd-f058', 'd-f059'],
      },
      {
        kind: 'summary',
        points: [
          'Deduction: the conclusion must follow — true premises make a false conclusion impossible.',
          'Support: the premises make the conclusion more likely, in degrees, without guaranteeing it.',
          'Validity is all-or-nothing; strength is a sliding scale.',
          'The distinction powers question types: "must be true" demands deduction, "most strongly supported" asks only for support.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'State the difference between deduction and support, and name which LSAT task each maps to.',
        answer:
          'In deduction the conclusion must follow from the premises (it cannot be false if they are true); in support the premises merely make the conclusion more likely, in degrees. Deduction maps to "must be true" questions, support to "most strongly supported" questions.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.7 introduces the most testable reasoning pattern in all of foundations: conditional logic — if-then reasoning and its mirror image, the contrapositive.',
      },
    ],
  },
  {
    id: '1.7',
    stage: 1,
    title: 'Conditional Logic',
    estimatedMinutes: 14,
    skills: ['f-conditional'],
    prerequisites: ['f-premise-conclusion'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Some of the most heavily tested reasoning on the LSAT hides in two small words: if and then. "If the alarm sounds, the building evacuates." This sentence does not say the alarm will sound. It does not say the building will evacuate. It states a rule connecting the two — and everything interesting follows from understanding exactly what the rule does and does not promise.',
      },
      {
        kind: 'keyterm',
        term: 'Conditional (sufficient → necessary)',
        definition:
          'A rule of the form "If A, then B": A is the sufficient condition (its truth guarantees B) and B is the necessary condition (it must hold whenever A holds). The rule fires in one direction only: from A to B, never backward.',
      },
      {
        kind: 'example',
        title: 'What the rule promises',
        body: 'Rule: "If the alarm sounds, the building evacuates." The alarm sounds — the building must evacuate. That is the rule firing. But suppose the building is evacuating and you hear no alarm. Did the rule break? No — the rule never said the alarm is the only reason a building evacuates. Fire drills, gas leaks, and false alarms all evacuate buildings without this alarm. The rule constrains what follows the alarm, not what causes evacuations.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Rule: "If the flight is delayed, passengers receive vouchers." The flight was not delayed. What follows about vouchers?',
        choices: [
          'Passengers receive vouchers anyway, by the contrapositive',
          'Passengers do not receive vouchers',
          'Nothing follows — the rule only constrains what a delay requires',
          'The flight was on time, so vouchers are guaranteed instead',
        ],
        correctIndex: 2,
        explanation:
          'This is the negation trap: denying the "if" side (not delayed) proves nothing about the "then" side. The rule says nothing about what happens when flights run on schedule — vouchers might still be given for other reasons, or not. Only two moves are valid with a conditional: firing it forward (delayed, therefore vouchers) and the contrapositive (no vouchers, therefore not delayed).',
      },
      {
        kind: 'prose',
        md: 'Every conditional has a mirror image that is equally true, and it is the single most useful inference in logic: the contrapositive. If the alarm sounding guarantees evacuation, then a building that is not evacuating guarantees the alarm did not sound. "If A then B" always gives you "if not B then not A" — flip and negate both sides. You already use this in life: if the streets are empty you infer it is not rush hour, because rush hour guarantees traffic.',
      },
      {
        kind: 'keyterm',
        term: 'Contrapositive',
        definition:
          'The logically equivalent flip of a conditional: from "If A, then B" infer "If not B, then not A." It is always valid — the one safe move you can make with any if-then rule.',
      },
      {
        kind: 'worked',
        title: 'Four moves, two valid and two traps',
        steps: [
          {
            label: 'The rule',
            body: '"If the package ships today, it arrives Friday." A = ships today, B = arrives Friday. Hold this rule fixed and test each move.',
          },
          {
            label: 'Valid move 1 — apply the rule',
            body: 'The package shipped today. Therefore it arrives Friday. This is just the rule firing forward: A happened, so B must follow.',
          },
          {
            label: 'Valid move 2 — the contrapositive',
            body: 'The package did not arrive Friday. Therefore it did not ship today. Flip and negate: not-B proves not-A. Always safe.',
          },
          {
            label: 'Trap 1 — the reversal',
            body: 'The package arrived Friday. Therefore it shipped today. Invalid: Friday arrival is compatible with Wednesday shipping. Going backward (B → A) is the most common conditional error on the test.',
          },
          {
            label: 'Trap 2 — the negation',
            body: 'The package did not ship today. Therefore it will not arrive Friday. Invalid: Thursday shipping might still make Friday. Negating the "if" side (not-A → not-B) proves nothing.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: '"If A then B" means A and B always go together, so "if B then A" is equally valid.',
        right:
          'A conditional is a one-way street: A guarantees B, but B can happen for other reasons. Reversing it (B → A) and negating it (not-A → not-B) are both invalid — the twin traps behind a huge share of wrong answers. Only the forward move and the contrapositive (not-B → not-A) are safe.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Rule: "If the reservoir falls below the intake, the town rations water." The town is not rationing water. What follows?',
        choices: [
          'The reservoir is above the intake — valid by the contrapositive',
          'The reservoir fell below the intake but the town found another source',
          'The town will ration water next month',
          'Nothing follows; the rule only applies when rationing is happening',
        ],
        correctIndex: 0,
        explanation:
          'This is the contrapositive in action: "if below intake, then rationing" flips to "if not rationing, then not below intake" — the town not rationing guarantees the reservoir has not fallen below the intake. The second choice contradicts the rule rather than following from it, the third invents a timeline the rule never mentions, and the fourth misunderstands the rule, which constrains what low water requires, not when rationing occurs.',
      },
      {
        kind: 'example',
        title: 'Chaining conditionals',
        body: '"If Maya finishes the report, she leaves early. If she leaves early, she catches the ferry." Chain them: finishing the report guarantees catching the ferry — the middle term drops out. And the contrapositive of the whole chain: if she missed the ferry, she did not finish the report. On the test, chains of two or three conditionals are common; link them end to end, then flip the entire chain when you need the contrapositive.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f067', 'd-f068', 'd-f069'],
      },
      {
        kind: 'summary',
        points: [
          'A conditional "If A, then B" fires one way only: A guarantees B.',
          'The contrapositive ("If not B, then not A") is always valid — flip and negate.',
          'Two classic traps: the reversal (B → A) and the negation (not-A → not-B) are both invalid.',
          'Conditionals chain: link A → B → C into A → C, then contrapose the whole chain.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'From "If A, then B," list the two valid inferences and the two classic invalid ones.',
        answer:
          'Valid: applying the rule forward (A, therefore B) and the contrapositive (not-B, therefore not-A). Invalid: the reversal (B, therefore A) and the negation (not-A, therefore not-B).',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.8 teaches you to spot conditionals wearing disguises: "only if," "unless," "requires," "all," and "none" are all if-then rules in plain clothes.',
      },
    ],
  },
  {
    id: '1.8',
    stage: 1,
    title: 'Translating Conditional Language',
    estimatedMinutes: 13,
    skills: ['f-translate'],
    prerequisites: ['f-conditional'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'The LSAT rarely hands you a clean "if... then..." sentence. Instead it buries conditionals inside ordinary words: only if, unless, requires, whenever, all, none, no. Each of these is an if-then rule wearing a disguise, and misreading the disguise — especially mixing up which side is which — is one of the most reliable ways to lose points. This lesson is a phrasebook: learn to translate each form into a clean rule.',
      },
      {
        kind: 'keyterm',
        term: 'Necessary-condition markers',
        definition:
          'Phrases that introduce the necessary side of a rule — the thing that must hold: "only if," "requires," "depends on," "must," "is essential for." Whatever follows these phrases is the necessary condition (the B in "If A, then B").',
      },
      {
        kind: 'example',
        title: 'The phrasebook',
        body: '"You may vote only if you are registered" → vote requires registration: if you vote, you are registered. "Entry requires a ticket" → if you enter, you have a ticket. "All surgeons are doctors" → if a surgeon, then a doctor. "No reptiles are mammals" → if a reptile, then not a mammal. "Whenever the bell rings, class ends" → if the bell rings, class ends. In each case, find the rule hiding inside the ordinary sentence.',
      },
      {
        kind: 'checkpoint',
        prompt: '"Admission requires a reservation." A visitor was admitted. What follows?',
        choices: [
          'The visitor had a reservation — "requires" marks the necessary condition',
          'Anyone with a reservation is admitted',
          'The visitor probably had a reservation, but exceptions are possible',
          'Reservations are sufficient but not necessary for admission',
        ],
        correctIndex: 0,
        explanation:
          '"Requires" marks the necessary condition: a reservation must hold for admission, so admission guarantees a reservation was made. The second choice reverses the rule — reservations were never promised to be sufficient, so reservation-holders might still be turned away. The guarantee is absolute rather than probable, and "requires" means necessary, which is the opposite of what the fourth choice claims.',
      },
      {
        kind: 'worked',
        title: 'Translate four disguised conditionals',
        steps: [
          {
            label: '"Only members may use the pool"',
            body: '"Only if" marks the necessary condition: membership is required for pool use. If someone is using the pool, they are a member. (It does not promise that every member swims.)',
          },
          {
            label: '"You cannot board unless you have a pass"',
            body: '"Unless" translates as "if not": if you do not have a pass, you cannot board — equivalently, boarding requires a pass. If someone boarded, they had a pass.',
          },
          {
            label: '"None of the volunteers are paid staff"',
            body: '"None are" means: if a volunteer, then not paid staff. The contrapositive: if paid staff, then not a volunteer. "No" and "none" always introduce a negation on one side.',
          },
          {
            label: '"The garden thrives wherever the soil drains well"',
            body: '"Wherever" works like "whenever": if the soil drains well (there), the garden thrives. The condition (drainage) is sufficient for the result (thriving).',
          },
        ],
      },
      {
        kind: 'prose',
        md: 'The highest-value distinction in this phrasebook is "if" versus "only if" — they point in opposite directions, and the test loves to swap them. "You may leave if you finish" makes finishing sufficient: finish → may leave (but you might also leave for other reasons). "You may leave only if you finish" makes finishing necessary: leave → finished (no finish, no leaving). Read "only if" as a giant arrow pointing at the necessary condition: whatever follows "only if" is what must be true.',
      },
      {
        kind: 'misconception',
        wrong: '"If" and "only if" mean roughly the same thing.',
        right:
          'They are mirror images. "If A then B" makes A sufficient for B; "A only if B" makes B necessary for A — the arrow runs the other way. Treating them as interchangeable reverses the rule, which is exactly the reversal trap from lesson 1.7 wearing fancier clothes.',
      },
      {
        kind: 'checkpoint',
        prompt: '"A grant is awarded only if the application is complete." A team received a grant. What follows?',
        choices: [
          'Their application was complete — "only if" makes completeness necessary',
          'Any complete application receives a grant',
          'Their application was probably complete, but exceptions are possible',
          'Completeness is sufficient but not required for the grant',
        ],
        correctIndex: 0,
        explanation:
          '"Only if" marks the necessary condition: completeness is required for the grant, so receiving the grant guarantees the application was complete. The second choice reverses the rule — completeness was never promised to be sufficient, so complete applications might still be denied. The third weakens a guarantee into a probability the sentence never offered, and the fourth states the exact opposite of what "only if" means.',
      },
      {
        kind: 'example',
        title: '"Unless" under the microscope',
        body: '"The concert proceeds unless it rains." Translate mechanically: if it does not rain, the concert proceeds. The contrapositive: if the concert does not proceed, it rained. What the sentence does not say: that rain guarantees cancellation (the band might play through drizzle), or that no-rain is the only way the concert happens. "A unless B" is simply "if not-B, then A" — apply the rule forward and contrapose it like any other conditional.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f079', 'd-f080', 'd-f081'],
      },
      {
        kind: 'summary',
        points: [
          '"Only if," "requires," and "depends on" mark the necessary condition — the thing that must hold.',
          '"If" marks the sufficient condition; "only if" points the arrow the other way. Do not confuse them.',
          '"A unless B" means "if not-B, then A." "All A are B" means "if A, then B." "No A are B" means "if A, then not-B."',
          'After translating, use the lesson-1.7 toolkit: fire forward, contrapose, and reject reversals and negations.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Translate each into an if-then rule: "only if," "unless," "all," "none."',
        answer:
          '"A only if B" → if A, then B (B is necessary). "A unless B" → if not-B, then A. "All A are B" → if A, then B. "No A are B" → if A, then not-B.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.9 handles the words of quantity — all, most, some, few — where small differences in meaning decide whether an inference is valid.',
      },
    ],
  },
  {
    id: '1.9',
    stage: 1,
    title: 'Quantifiers: All, Most, Some, Few',
    estimatedMinutes: 12,
    skills: ['f-quantifiers'],
    prerequisites: ['f-translate'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Ordinary conversation is sloppy with quantity words. If someone says "some people liked the movie," you hear "not everyone, probably not many." The LSAT is not sloppy. On this test, every quantity word has a precise logical meaning, and arguments turn on the difference between "some" and "most" the way a lock turns on a key. This lesson gives you the exact meanings.',
      },
      {
        kind: 'keyterm',
        term: '"Some" (the LSAT meaning)',
        definition:
          'At least one — and possibly all. "Some nurses are runners" tells you one or more nurses run; it does not tell you that most do not, or that any particular number do. It is the weakest quantity claim, and therefore the hardest to contradict.',
      },
      {
        kind: 'example',
        title: 'The quantity ladder',
        body: 'From strongest to weakest: all (every single one, no exceptions), most (more than half), many (a large number — vague, but substantial), some (at least one), few (a small number). Each rung licenses different inferences. "All" lets you apply the rule to any individual; "most" lets you conclude about majorities; "some" barely lets you conclude that an exception-free claim is false.',
      },
      {
        kind: 'checkpoint',
        prompt: 'A report states: "Some residents oppose the development." Which claim is contradicted by this statement?',
        choices: [
          'Most residents oppose the development',
          'A few residents oppose the development',
          'No residents oppose the development',
          'Many residents oppose the development',
        ],
        correctIndex: 2,
        explanation:
          '"Some" means at least one, so the only claim it rules out is "none" — zero opponents. "Most," "many," and "a few" are all logically compatible with "some": if most oppose, then certainly at least one does. This asymmetry is why "some" is the weakest quantity claim, and why upgrading it to "most" in an answer choice is always an overclaim.',
      },
      {
        kind: 'worked',
        title: 'Combine quantifiers carefully',
        steps: [
          {
            label: 'Premises',
            body: '"All managers attended the retreat. Some attendees left early." What can you conclude about managers and leaving early? Work it slowly before deciding.',
          },
          {
            label: 'What "some" gives you',
            body: 'Some attendees left early = at least one attendee left early. That person might be a manager — or might be one of the non-manager attendees. "Some" is too weak to pin down which.',
          },
          {
            label: 'The verdict',
            body: 'Nothing follows about managers leaving early. This is the classic quantifier trap: "all" feels powerful and "some" feels informative, but combined they prove nothing. For a valid inference you would need "most attendees left early" (then, since all managers are attendees... actually even that needs care) or "some managers left early" directly.',
          },
          {
            label: 'A valid combination',
            body: 'Contrast: "All managers attended. Most attendees left early." Now the early-leavers are a majority of attendees, and managers are all inside the attendee group — the two groups must overlap, so some manager left early. "Most" plus "all" can force an overlap; "some" plus "all" cannot.',
          },
        ],
      },
      {
        kind: 'prose',
        md: 'Two negation facts complete the toolkit. The opposite of "all" is not "none" — it is "some are not" (a single counterexample kills an "all" claim). And the opposite of "some" is "none": to refute "some residents objected," you must show that zero did. Test makers exploit this constantly: an answer choice that says "most" when the stimulus proved only "some" overclaims, and an argument that needs "all" but has only "most" has a gap.',
      },
      {
        kind: 'misconception',
        wrong: '"Some" means a small number — more than one or two, but definitely not all or most.',
        right:
          'On the LSAT, "some" means at least one, with no upper limit — it is logically compatible with "all." If some committee members voted yes, it remains possible that every member did. Reading everyday connotations ("some, but not many") into the word manufactures inferences the premises do not support.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Premises: "Most of the clinic\'s patients are children. All children receive a sticker after treatment." What validly follows?',
        choices: [
          'Most of the clinic\'s patients receive a sticker',
          'Some adults receive a sticker',
          'All patients who receive a sticker are children',
          'No adult receives a sticker',
        ],
        correctIndex: 0,
        explanation:
          'Most patients are children, and every child gets a sticker — so the stickered group includes all the children, who are most of the patients. Therefore most patients receive a sticker: a valid "most + all" overlap inference. The other choices overreach: adults might also get stickers (nothing rules it out), sticker-receivers need not all be children, and "no adult" claims more than the premises establish.',
      },
      {
        kind: 'example',
        title: 'Quantity words in answer choices',
        body: 'Stimulus: "A few reviewers praised the novel." Which choice must be true? "Some reviewers praised the novel" — yes, "a few" (a small number) entails "at least one." "Most reviewers praised it" — no, overclaim. "No reviewer criticized it" — no, silence about criticism. "All reviewers praised it" — no. The credited answer in a must-be-true question is often the modest restatement of the quantity actually given.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f091', 'd-f092', 'd-f093'],
      },
      {
        kind: 'summary',
        points: [
          '"Some" means at least one, possibly all — the weakest quantity claim.',
          'Strength order: all > most > many/some > few; each licenses different inferences.',
          'The negation of "all" is "some are not" (one counterexample suffices); the negation of "some" is "none."',
          'Watch answer choices that upgrade quantity: "some" in the stimulus never proves "most" in the answer.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Give the LSAT meaning of "some" and state what contradicts an "all" claim.',
        answer:
          '"Some" means at least one, possibly all. An "all" claim is contradicted by a single counterexample — proving "some are not" is enough to refute "all are."',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.10 turns to the most attacked reasoning pattern on the test: causal arguments — and the standard ways they go wrong.',
      },
    ],
  },
  {
    id: '1.10',
    stage: 1,
    title: 'Causation',
    estimatedMinutes: 13,
    skills: ['f-causation'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Few sentences are as tempting — or as dangerous — as "X causes Y." Causal claims feel explanatory and decisive, which is exactly why the LSAT attacks them more than any other reasoning pattern. A huge fraction of flaw, weaken, and strengthen questions are, underneath, about one thing: someone claimed a cause, and the evidence does not quite earn it.',
      },
      {
        kind: 'keyterm',
        term: 'Causal argument',
        definition:
          'An argument whose conclusion claims that one thing causes another: "The new fertilizer increased yields," "Screen time harms attention." The premises typically show a correlation, a timing sequence, or the removal of a suspected cause — evidence consistent with causation but rarely proving it.',
      },
      {
        kind: 'example',
        title: 'Correlation is not causation',
        body: 'Ice cream sales and drowning deaths rise and fall together every year. Nobody concludes that ice cream causes drowning — summer heat drives both. Yet arguments with this exact structure appear on the LSAT wearing business suits: "Companies with wellness programs have lower turnover, so wellness programs reduce turnover." Maybe. Or maybe well-run companies both keep employees and fund wellness programs — a common cause doing all the work.',
      },
      {
        kind: 'checkpoint',
        prompt: '"Towns with more libraries have higher literacy rates, so building libraries causes literacy." What is the most plausible alternative explanation?',
        choices: [
          'Some towns with libraries still have low literacy',
          'Wealthier towns can afford both more libraries and better schools, which raise literacy',
          'Libraries are more popular than they were a decade ago',
          'Literacy is difficult to measure precisely',
        ],
        correctIndex: 1,
        explanation:
          'The common-cause objection explains the correlation without any causal role for libraries: town wealth could produce both the libraries and the literacy, through better schools, tutoring, and resources. Mere exceptions do not defeat a correlation, library popularity is irrelevant, and measurement difficulty does not explain the observed pattern. A causal conclusion must survive its rival explanations, not merely fit the data.',
      },
      {
        kind: 'prose',
        md: 'When you meet a causal claim, run the standard four-question audit. First, could the causation run backward — does Y cause X instead? Second, could a third factor cause both? Third, could it be coincidence — the correlation is real but meaningless? Fourth, is the claimed mechanism even plausible given what the premises show? You do not need the true explanation; you only need to see that the author\'s explanation is not earned.',
      },
      {
        kind: 'worked',
        title: 'Audit a causal argument',
        steps: [
          {
            label: 'The argument',
            body: '"Towns that painted their crosswalks bright yellow saw pedestrian accidents fall 20 percent. The paint clearly makes drivers more alert." Premise: correlation (paint + fewer accidents). Conclusion: the paint caused the drop via alertness.',
          },
          {
            label: 'Reverse causation?',
            body: 'Unlikely here — fewer accidents would not cause a town to paint crosswalks. But always ask: in "happy employees are productive," maybe productive work causes happiness.',
          },
          {
            label: 'Common cause?',
            body: 'Plausible: towns that repaint crosswalks may also be towns that recently hired safety coordinators, fixed lighting, and ran awareness campaigns. A general safety push could cause both the paint and the drop.',
          },
          {
            label: 'Coincidence or alternative mechanism?',
            body: 'Also plausible: the drop might reflect a mild winter with fewer dark commuting hours, or regression — towns paint crosswalks after an unusually bad year, and accident rates naturally bounce back. The alertness mechanism is a story, not evidence.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If two things are strongly correlated, the correlation itself proves one causes the other.',
        right:
          'Correlation is compatible with causation, reverse causation, a common cause, or pure coincidence — the data alone cannot tell these apart. A causal conclusion needs more than a correlation: ideally evidence that rules out the alternatives, like a controlled comparison. Until then, "correlated" and "caused" are different claims.',
      },
      {
        kind: 'checkpoint',
        prompt: '"Students who take notes by hand score higher on exams than students who type notes, so handwriting notes causes better performance." What is the strongest objection?',
        choices: [
          'Some students who handwrite still score poorly',
          'Students who choose handwriting may already be more diligent studiers, and diligence could cause both the note method and the scores',
          'Typing notes is faster than handwriting them',
          'The study did not include graduate students',
        ],
        correctIndex: 1,
        explanation:
          'The common-cause objection strikes at the heart of the causal claim: if diligent students both choose handwriting and score well, the correlation is fully explained without handwriting causing anything. The first choice merely notes exceptions, which correlations tolerate. Typing speed is irrelevant to the causal mechanism, and the absence of graduate students does not undermine the comparison that was actually made.',
      },
      {
        kind: 'example',
        title: 'Strengthening a causal claim',
        body: 'The same audit tells you what would help a causal argument: evidence ruling out alternatives. "Towns were randomly assigned to paint or not paint their crosswalks, and only the painted towns saw accident drops" kills the common-cause and coincidence objections at once. On strengthen questions, look for the choice that eliminates a rival explanation — that is what "supporting" a causal claim usually means.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f101', 'd-f102', 'd-f103'],
      },
      {
        kind: 'summary',
        points: [
          'Causal conclusions ("X causes Y") are the most frequently attacked pattern on the test.',
          'Correlation supports causation but never proves it — reverse causation, common causes, and coincidence are always live alternatives.',
          'Audit every causal claim with the four questions: reversed? third factor? coincidence? plausible mechanism?',
          'To weaken: offer a rival explanation. To strengthen: rule one out.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Name the four-question audit for a causal claim.',
        answer:
          'Could the causation run backward (Y causes X)? Could a third factor cause both? Could the correlation be coincidence? Is the claimed mechanism actually supported by the premises?',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.11 examines one of the commonest sources of causal-style overreach: generalizing from samples and surveys.',
      },
    ],
  },
  {
    id: '1.11',
    stage: 1,
    title: 'Samples and Surveys',
    estimatedMinutes: 11,
    skills: ['f-samples'],
    prerequisites: ['f-causation'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'A large share of LSAT arguments generalize: they study some group and conclude something about a larger one. "We surveyed 500 gym members; therefore adults prefer morning workouts." The leap from the surveyed group to the claimed group is where these arguments live or die. Your job is to ask whether the sample actually represents the population the conclusion is about.',
      },
      {
        kind: 'keyterm',
        term: 'Representative sample',
        definition:
          'A sample that resembles the target population in the ways relevant to the conclusion. A survey of gym members represents gym members well and represents all adults poorly — representativeness is always relative to what is being claimed.',
      },
      {
        kind: 'example',
        title: 'The gym-member trap',
        body: '"A survey of 500 members at downtown fitness clubs found that 70 percent exercise before work. Clearly, most working adults prefer morning exercise." The sample is gym members — people who have already self-selected into an exercise habit and can afford clubs. The conclusion is about all working adults. The sample is systematically keener on exercise than the population, so the 70 percent figure tells us little about everyone else.',
      },
      {
        kind: 'checkpoint',
        prompt: '"We asked 200 people leaving the opera whether they enjoy classical music; 90 percent said yes. So most people enjoy classical music." What is the main defect?',
        choices: [
          'The sample of 200 is too small to support any conclusion',
          'The sample was drawn from opera-goers — people already inclined toward classical music — not from people at large',
          'Ninety percent is not a large enough majority',
          'The survey should have been conducted by telephone instead',
        ],
        correctIndex: 1,
        explanation:
          'The defect is unrepresentative selection: people leaving the opera are a self-selected group unusually fond of classical music, so their 90 percent says almost nothing about the general population. Two hundred respondents is plenty if they were representative — size is not the problem, and the survey mode is irrelevant. Representativeness is always relative to the population the conclusion claims to describe.',
      },
      {
        kind: 'prose',
        md: 'Three defects cover nearly every bad sample on the test. First, unrepresentative selection: the sample was drawn from a subgroup with distinctive traits (gym members, magazine subscribers, volunteers). Second, self-selection and non-response: the people who chose to answer differ from those who did not — satisfied customers fill out feedback forms; furious ones do too; the quiet middle stays silent. Third, small or vague samples: "a recent poll" with no size, no method, and no stated question is a rumor with numbers attached.',
      },
      {
        kind: 'worked',
        title: 'Dissect a survey argument',
        steps: [
          {
            label: 'The argument',
            body: '"An online poll of 2,000 readers of CareerWeekly found that 80 percent check work email on weekends. So most professionals cannot disconnect from work." Identify the sample, the population, and the defects.',
          },
          {
            label: 'Sample vs. population',
            body: 'Sample: readers of a career magazine who chose to click a poll. Population in the conclusion: most professionals. Already a mismatch: CareerWeekly readers are likelier to be career-focused than professionals at large.',
          },
          {
            label: 'Self-selection',
            body: 'It was an online opt-in poll. People with strong feelings about overwork — the always-on and the resentful — are the ones who click. The moderate majority is underrepresented by construction.',
          },
          {
            label: 'Vague method',
            body: '"Check work email on weekends" — once? routinely? The question wording shapes the number, and we are not given it. Three defects, one argument: unrepresentative source, self-selection, and opaque method.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'A large sample is automatically reliable — 2,000 respondents cannot be wrong.',
        right:
          'Size cannot fix bias. Two thousand self-selected career-magazine readers are still self-selected career-magazine readers; a bigger biased sample just measures the bias more precisely. Representativeness — who was asked and how — outranks size every time.',
      },
      {
        kind: 'checkpoint',
        prompt: '"A telephone survey of 3,000 randomly selected households found that 60 percent support the new transit tax. Therefore most city residents support it." What best evaluates this argument?',
        choices: [
          'Whether 3,000 households is a large enough sample to be reliable',
          'Whether the households that did not answer the phone differ systematically from those that did',
          'Whether transit taxes have succeeded in other cities',
          'Whether 60 percent counts as "most"',
        ],
        correctIndex: 1,
        explanation:
          'Random selection is the gold standard, but telephone surveys suffer from non-response: the people who pick up and complete a survey may differ politically and demographically from those who screen calls. If non-respondents oppose the tax at higher rates, the 60 percent figure is inflated. Sample size (3,000) is already ample, other cities are irrelevant to this city\'s residents, and 60 percent plainly is "most" — the live question is who is missing from the data.',
      },
      {
        kind: 'example',
        title: 'When a sample is fine',
        body: 'Not every sample argument is flawed. "The health department randomly selected 400 restaurant kitchens for inspection and found violations in a quarter of them" fairly supports "about a quarter of the city\'s kitchens have violations" — random selection from the full population of kitchens, with a stated method. Train your eye to notice the difference: random, well-described samples of the right population earn their generalizations.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f111', 'd-f112', 'd-f113'],
      },
      {
        kind: 'summary',
        points: [
          'Generalizations live or die on whether the sample represents the population in the conclusion.',
          'The three classic defects: unrepresentative selection, self-selection/non-response, and vague or tiny samples.',
          'Size never cures bias — a large biased sample just measures the bias precisely.',
          'Random selection from the right population, with a stated method, earns its generalization.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'What are the three classic defects of a sample, and why does size not fix them?',
        answer:
          'Unrepresentative selection (wrong subgroup), self-selection and non-response (respondents differ from non-respondents), and small or vaguely described samples. Size does not fix them because a larger biased sample still reflects the same bias — representativeness, not size, determines reliability.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.12 covers the other numerical trap: arguments built on percentages, rates, and raw numbers — and the missing denominators behind them.',
      },
    ],
  },
  {
    id: '1.12',
    stage: 1,
    title: 'Numbers, Percentages, and Rates',
    estimatedMinutes: 12,
    skills: ['f-numbers'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Numbers feel authoritative. "Accidents doubled." "Sixty percent agree." "The rate is the highest in the region." Our brains treat figures as facts, and argument-makers know it. But a number without its context — without its denominator, its baseline, its comparison group — is a rhetorical costume. This lesson teaches you to ask for the missing context before the number persuades you.',
      },
      {
        kind: 'keyterm',
        term: 'The denominator question',
        definition:
          'The habit of asking "out of what?" whenever a percentage, rate, or count is used as evidence. A percentage is a fraction; without the whole it was taken from, you cannot tell whether it is large, small, or meaningful.',
      },
      {
        kind: 'example',
        title: 'Three numbers that mislead',
        body: '"Workplace injuries doubled last year!" — from one to two, in a workforce of 4,000. "Sixty percent of accidents involve driver error" — but 60 percent of what? Of all miles driven, driver error might be far lower than its share of accidents suggests; you need the base rate. "Our town has the region\'s highest crime rate" — the town also has triple the population density, and rates per capita already account for that... or do they? Each claim collapses the moment you ask for context.',
      },
      {
        kind: 'checkpoint',
        prompt: '"The startup\'s revenue grew 200 percent last year!" The startup earned $10,000 the year before. What is the most important context?',
        choices: [
          'Whether the growth will continue next year',
          'That 200 percent growth on a $10,000 base is only $30,000 total — relative change from a tiny base is still tiny',
          'Whether competitors grew faster',
          'Whether revenue is the best measure of success',
        ],
        correctIndex: 1,
        explanation:
          'Relative change is meaningless without the base: tripling $10,000 yields $30,000, a modest absolute figure the dramatic "200 percent" obscures. Future growth, competitor comparisons, and choice of metric are all secondary — the immediate deception is a big-sounding percentage built on a tiny denominator. Always convert dramatic relative claims back to absolute terms before reacting.',
      },
      {
        kind: 'prose',
        md: 'Four specific confusions account for most numerical trickery on the test. Percentages versus percentage points: a rise from 20 to 25 percent is a 5-point increase but a 25 percent relative increase — authors pick whichever sounds bigger. Counts versus rates: more total accidents can coincide with a lower accident rate if the population grew. Relative versus absolute change: "doubled" from a tiny base is still tiny. And averages hiding distributions: an "average salary" swollen by a few executives says little about typical pay.',
      },
      {
        kind: 'worked',
        title: 'Take apart a statistical argument',
        steps: [
          {
            label: 'The argument',
            body: '"Hospital A\'s surgery mortality rate is 8 percent; Hospital B\'s is 3 percent. Patients should clearly choose Hospital B." The numbers look decisive. Ask the questions.',
          },
          {
            label: 'Denominator and case mix',
            body: 'A rate needs a comparable denominator. If Hospital A is the regional trauma center handling the hardest cases while Hospital B does routine procedures, the rates measure different patient populations — comparing them is comparing different denominators.',
          },
          {
            label: 'Counts behind the rates',
            body: 'An 8 percent rate from 25 surgeries is two deaths — noise. From 2,500 surgeries it is 200 — signal. The argument gives no counts, so you cannot tell whether either rate is stable.',
          },
          {
            label: 'The verdict',
            body: 'The conclusion outruns the numbers. A fair comparison would risk-adjust for case difficulty and report counts alongside rates. Until then, "8 versus 3" is theater, not evidence.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'A bigger percentage always means a bigger problem, and precise numbers are always trustworthy.',
        right:
          'Percentages inherit their meaning from their denominators, and precision is not accuracy — "73.4 percent" of an unrepresentative sample is precisely wrong. Always ask: percent of what, compared to what baseline, over what group, and with what counts underneath.',
      },
      {
        kind: 'checkpoint',
        prompt: '"Cyclist injuries rose 50 percent after the bike-share program launched, so the program made cycling more dangerous." What most undermines this?',
        choices: [
          'The number of cyclists tripled after the program launched',
          'Some injuries occurred on streets without bike-share stations',
          'The program is popular with tourists',
          'Injury reports are filed by hospitals, not cyclists',
        ],
        correctIndex: 0,
        explanation:
          'If ridership tripled while injuries rose only 50 percent, the injury rate per cyclist actually fell — the program coincided with more cycling, not more dangerous cycling. This is the counts-versus-rates confusion: a rising count with a faster-rising denominator means a falling rate. Injuries off the bike-share grid, tourist popularity, and who files reports do not touch the arithmetic that the conclusion depends on.',
      },
      {
        kind: 'example',
        title: 'Percentage points in the wild',
        body: '"Support for the measure surged 40 percent!" Check the fine print: from 10 percent to 14 percent — a 4-point move described in the scariest-sounding terms. Conversely, "unemployment fell just 2 percent" might mean from 10 percent to 9.8 (trivial) or from 50 percent to 49 (meaningless either way without context). When an argument leans on a dramatic-sounding change, convert it back to absolute terms before reacting.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f119', 'd-f120', 'd-f121'],
      },
      {
        kind: 'summary',
        points: [
          'Always ask the denominator question: percent of what, out of whom, compared to what?',
          'Distinguish counts from rates, percentages from percentage points, and relative from absolute change.',
          'Precision is not accuracy: exact figures from bad samples are exactly wrong.',
          'Averages can hide distributions — ask what the typical case looks like, not just the mean.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'What is the denominator question, and what are the four numerical confusions to watch for?',
        answer:
          'The denominator question is "out of what?" — demanding the whole behind any percentage, rate, or count. The four confusions: percentages versus percentage points, counts versus rates, relative versus absolute change, and averages hiding the underlying distribution.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.13 covers comparison reasoning: arguments that rank, rate, and compare — and the likeness their comparisons quietly assume.',
      },
    ],
  },
  {
    id: '1.13',
    stage: 1,
    title: 'Comparison Reasoning',
    estimatedMinutes: 11,
    skills: ['f-comparison'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Arguments love comparisons: better, worse, faster, safer, more effective. "Our method outperforms the old one." "This city is safer than that one." Comparisons feel concrete, but every comparison smuggles in two assumptions: that the things being compared are similar enough for the comparison to mean something, and that the yardstick being used measures what matters. Attack either, and the comparison collapses.',
      },
      {
        kind: 'keyterm',
        term: 'Like-versus-like (comparability)',
        definition:
          'The requirement that compared things be similar in the respects relevant to the conclusion. Comparing two marathon runners\' times is fair; comparing a marathon time to a sprint time and declaring one athlete "faster" is not — the events differ in the very respect being judged.',
      },
      {
        kind: 'example',
        title: 'A comparison that fails the likeness test',
        body: '"Ridgeview Academy\'s graduates earn more than public-school graduates, so Ridgeview provides a better education." The graduates differ before school starts: Ridgeview families are wealthier, with networks and resources that raise earnings regardless of teaching. The comparison measures family background, not school quality. For the earnings gap to show educational superiority, the students would need to be comparable going in.',
      },
      {
        kind: 'checkpoint',
        prompt: '"Our tutoring center\'s students improve more than students who study alone, so our tutoring is more effective." What must hold for this comparison to be fair?',
        choices: [
          'The students in both groups must be comparable in ability and motivation before tutoring began',
          'The tutoring center must employ more tutors than it did last year',
          'The improvement must be reported as a percentage rather than a raw score',
          'Studying alone must be shown to work for at least some students',
        ],
        correctIndex: 0,
        explanation:
          'The comparison assumes like-versus-like: if the tutoring center attracts already-motivated students while the study-alone group includes everyone else, the improvement gap reflects the students rather than the tutoring. Tutor headcount, the reporting format, and whether solo study ever works are all beside the point — the fatal threat is a pre-existing difference between the groups in exactly the respect that drives improvement.',
      },
      {
        kind: 'prose',
        md: 'Even when the things are comparable, the yardstick can mislead. "Fewer traffic deaths than a decade ago" sounds like safer roads — until you learn the population shrank by a third, making the per-capita rate worse. "More graduates than ever" might mean a bigger freshman class, not better teaching. Always separate the two questions: are the compared groups alike in relevant ways, and does the metric measure the claim being made?',
      },
      {
        kind: 'worked',
        title: 'Audit a comparison argument',
        steps: [
          {
            label: 'The argument',
            body: '"Delivery by drone is now cheaper than delivery by van: the average drone delivery costs $1.20, versus $4.80 per van delivery. Companies should switch." Two claims to check: comparability and the yardstick.',
          },
          {
            label: 'Check comparability',
            body: 'What does each average cover? Drones carry light parcels short distances in good weather; vans carry everything, everywhere, in all conditions. The "average delivery" is not the same job in both cases — the comparison mixes unlike tasks.',
          },
          {
            label: 'Check the yardstick',
            body: 'Cost per delivery ignores what the conclusion needs: reliability, capacity, and coverage. A cheaper method that cannot carry half the parcels has not been shown superior — the metric does not measure the claim.',
          },
          {
            label: 'What would fix it',
            body: 'Compare like with like: cost per delivery for the same parcels, over the same routes, in the same weather — and measure the full set of relevant outcomes, not just price. Until then, "$1.20 versus $4.80" compares two different jobs by one narrow ruler.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Any two things can be meaningfully compared as long as you use the same metric.',
        right:
          'A shared metric does not make a comparison fair. Cost per delivery, average test scores, and crime rates can all be computed for unlike groups — and all can mislead when the groups differ in ways that drive the metric. Comparability is about relevant likeness, not about using the same ruler.',
      },
      {
        kind: 'checkpoint',
        prompt: '"Patients at St. Mary\'s recover from knee surgery faster than patients at General Hospital, so St. Mary\'s has better surgeons." What most weakens this?',
        choices: [
          'St. Mary\'s is a newer building than General Hospital',
          'St. Mary\'s only accepts low-risk, relatively young patients, while General takes all cases including complex revisions',
          'Both hospitals use the same brand of implant',
          'General Hospital treats more patients overall',
        ],
        correctIndex: 1,
        explanation:
          'If St. Mary\'s treats only low-risk young patients while General handles complex cases, the patient populations differ in exactly the respect that drives recovery speed — the comparison is unlike-versus-unlike, and the recovery gap reflects case mix rather than surgical skill. Building age is cosmetic, shared implant brands are irrelevant, and total patient volume does not address whether the two groups are comparable.',
      },
      {
        kind: 'example',
        title: 'Comparisons across time',
        body: '"Teen literacy is worse than in the 1990s: test scores fell 8 points." Before accepting decline, ask what changed about the test, the tested population, and the yardstick. Was the 1990s test easier? Are more students tested now (including weaker ones previously excluded)? Is an 8-point drop on a rescaled exam even comparable? Time comparisons inherit every comparability problem, plus a shifting ruler.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f127', 'd-f128', 'd-f129'],
      },
      {
        kind: 'summary',
        points: [
          'Every comparison assumes comparability (like versus like) and a fitting yardstick.',
          'Attack the likeness: do the compared groups differ in ways that drive the metric?',
          'Attack the yardstick: does the metric actually measure the claim being made?',
          'Time comparisons add a third risk: the ruler itself may have changed.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'What two questions should you ask of any comparison argument?',
        answer:
          'Are the things being compared similar in the respects relevant to the conclusion (like versus like)? And does the yardstick used actually measure what the conclusion claims?',
      },
      {
        kind: 'next',
        text: 'Next, lesson 1.14 covers reasoning by analogy: arguing that what holds for one thing holds for another because the two are alike.',
      },
    ],
  },
  {
    id: '1.14',
    stage: 1,
    title: 'Reasoning by Analogy',
    estimatedMinutes: 11,
    skills: ['f-analogy'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Analogies are arguments of the form "X is like Y, so what is true of Y is true of X." They are everywhere in persuasion — in courtrooms, in policy debates, in everyday advice — and they appear on the LSAT dressed as ordinary arguments. An analogy is only as strong as the relevance of the likeness: the shared features must be the ones that actually drive the conclusion.',
      },
      {
        kind: 'keyterm',
        term: 'Relevant similarity',
        definition:
          'A shared feature of the two compared cases that actually matters to the conclusion being drawn. That both a school and a business have budgets is a similarity; whether it is relevant depends on whether budgets drive the point at issue.',
      },
      {
        kind: 'example',
        title: 'A working analogy and a broken one',
        body: 'Working: "Restricting a toddler\'s screen time is like restricting dessert: in both cases a developing system benefits from limits on something appealing but overstimulating." The likeness (developing self-regulation, appealing-but-excessive input) drives the conclusion about limits. Broken: "Running a city is like running a household, so the city should never borrow." Households and cities both spend money — but cities, unlike households, can outlive their debts, tax, and print-adjacent powers make borrowing structurally different. The shared feature does not drive the conclusion.',
      },
      {
        kind: 'checkpoint',
        prompt: '"Raising children is like tending a garden: both need patience, attention, and time. So just as a gardener does not yell at seeds to grow faster, parents should not pressure children to develop faster." What makes this analogy reasonable?',
        choices: [
          'Gardens and children share many features, such as needing water and sunlight',
          'The shared feature — development that unfolds on its own timeline and can be harmed by rushing — is exactly what drives the conclusion about patience',
          'Most people find garden metaphors persuasive',
          'Parenting and gardening are both difficult activities',
        ],
        correctIndex: 1,
        explanation:
          'An analogy stands on relevant similarity, not similarity in general. The conclusion is about patience with natural development timelines, and the likeness invoked — growth that cannot be rushed without damage — is precisely the feature that makes patience appropriate. Shared trivia like needing water, the metaphor\'s popularity, or both activities being difficult are irrelevant similarities that do no logical work.',
      },
      {
        kind: 'prose',
        md: 'To evaluate an analogy, do two things. First, identify the precise claim being transferred from the familiar case to the new one. Second, ask whether the two cases are alike in the respects that make that claim true — and, just as important, whether they differ in some respect that breaks it. The strongest attack on an analogy is a relevant difference: a way the cases differ that undermines the transfer.',
      },
      {
        kind: 'worked',
        title: 'Test an analogy',
        steps: [
          {
            label: 'The argument',
            body: '"Training a new employee is like planting a garden: you prepare the soil, plant carefully, and wait. So managers should not expect productivity in the first month, just as gardeners do not expect harvest in the first week." What is being transferred, and does it hold?',
          },
          {
            label: 'Identify the transferred claim',
            body: 'The claim: early patience is warranted because results take time to develop. The likeness offered: both involve preparation followed by a growth period.',
          },
          {
            label: 'Check relevant similarity',
            body: 'Promising: both involve a novice developing capability over time, and pushing either too early can damage the outcome. The shared "development takes time" feature genuinely drives the patience conclusion.',
          },
          {
            label: 'Hunt for a relevant difference',
            body: 'A fair objection: gardens grow on fixed biological timelines, while employees can be accelerated with training, mentoring, and prior experience — a new hire is not a seed. The analogy is suggestive but not decisive; it supports patience as a default, not as a rule.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If two things share any feature, an analogy between them is valid.',
        right:
          'Analogies need relevant similarity, not just similarity. Two things share countless features (both involve people, both take time); what matters is whether the shared features are the ones that make the transferred claim true. An analogy can be 90 percent similar and still fail on the 10 percent that matters.',
      },
      {
        kind: 'checkpoint',
        prompt: '"Banning phones in classrooms is like banning umbrellas indoors: both are sensible rules about distracting objects. So the phone ban is justified." What is the best objection?',
        choices: [
          'Umbrellas and phones are different objects made of different materials',
          'Phones, unlike umbrellas, are also tools for learning and emergency contact, so the "distracting object" likeness misses the features that matter to a ban',
          'Some classrooms have never had a phone problem',
          'Umbrella bans are rarely enforced',
        ],
        correctIndex: 1,
        explanation:
          'The strongest objection names a relevant difference: the analogy transfers the verdict from umbrellas (purely distracting, no classroom function) to phones, but phones differ in exactly the respect that matters to whether a ban is justified — they serve learning and safety functions umbrellas lack. Material differences and enforcement trivia are irrelevant differences, and "some classrooms" is a scope objection, not an attack on the analogy\'s logic.',
      },
      {
        kind: 'example',
        title: 'Analogies in answer choices',
        body: 'Parallel-reasoning questions (Stage 2) are analogy arguments about arguments: "which of the following argues most like the stimulus?" The same discipline applies — match the relevant structural features (the flaw pattern, the direction of the reasoning), not surface topic. Two arguments about farming and finance can be perfect parallels if their logical skeletons match.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f135', 'd-f136', 'd-f137'],
      },
      {
        kind: 'summary',
        points: [
          'An analogy claims X is like Y, so what holds for Y holds for X.',
          'Strength depends on relevant similarity: shared features that actually drive the conclusion.',
          'The standard attack is a relevant difference — a way the cases differ that breaks the transfer.',
          'Irrelevant differences (surface features) do not touch the analogy; match on structure, not topic.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'How do you evaluate an analogy, and what is the strongest form of objection to one?',
        answer:
          'Identify the claim being transferred, then check whether the cases are alike in the respects that make that claim true. The strongest objection is a relevant difference: a way the cases differ that undermines the transfer of the claim.',
      },
      {
        kind: 'next',
        text: 'Next, the final foundations lesson, 1.15: a library of the classic reasoning flaws — the named gaps you will spend Stage 2 learning to exploit.',
      },
    ],
  },
  {
    id: '1.15',
    stage: 1,
    title: 'The Common Reasoning Flaws Library',
    estimatedMinutes: 15,
    skills: ['f-flaws'],
    prerequisites: ['f-assumption', 'f-causation'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'You have spent this stage learning to find gaps between premises and conclusions. Now it is time to name them. The LSAT recycles a small catalog of classic flaws — the same broken moves appear again and again wearing different topics. Learning their names turns a vague sense of "something is off" into a precise diagnosis, and precise diagnoses are what flaw, weaken, and assumption questions reward.',
      },
      {
        kind: 'keyterm',
        term: 'Flaw',
        definition:
          'A nameable defect in reasoning: a specific way the premises fail to support the conclusion. A flawed argument may still have a true conclusion — the flaw is that the reasoning does not establish it.',
      },
      {
        kind: 'example',
        title: 'The gallery, part one',
        body: 'Ad hominem: "We should ignore the auditor\'s report — she was hired by the opposition." The attack targets the person, not the report\'s reasoning. Straw man: "My opponent wants to cut the library budget, which shows she hates reading." The position is caricatured, then the caricature is attacked. Appeal to popularity: "Everyone invests in crypto, so it must be sound." Belief is not evidence.',
      },
      {
        kind: 'checkpoint',
        prompt: '"You should not trust his budget forecast — he failed economics in college." What flaw is this?',
        choices: [
          'Straw man: it caricatures his forecast before attacking it',
          'Ad hominem: it attacks his college record instead of engaging the forecast\'s reasoning',
          'False dilemma: it presents only two possible outcomes',
          'Equivocation: it shifts the meaning of "forecast" mid-argument',
        ],
        correctIndex: 1,
        explanation:
          'The argument dismisses the forecast based on the forecaster\'s past academic performance rather than examining any assumption, number, or inference in the forecast itself — the textbook ad hominem move of attacking the person instead of the argument. There is no caricatured position, no forced choice between options, and no word changing meaning; the defect is entirely the substitution of a personal attack for engagement with the reasoning.',
      },
      {
        kind: 'example',
        title: 'The gallery, part two',
        body: 'Equivocation: "The sign says the bank is closed, but rivers have banks too, so the river must be closed." A word shifts meaning mid-argument. Circular reasoning: "This policy is the fairest because no fairer policy exists." The conclusion restates a premise. False dilemma: "Either we build the highway or the town dies." Two options are presented as exhaustive when others exist.',
      },
      {
        kind: 'example',
        title: 'The gallery, part three',
        body: 'Hasty generalization: "Two customers complained, so the product is a failure." A tiny sample proves a sweeping claim (lesson 1.11\'s territory). Part–whole: "Each player is excellent, so the team must be excellent." What holds for parts need not hold for the whole — and vice versa. Necessary–sufficient confusion: "She succeeded, so she must have had connections." Treating a sufficient condition as necessary, or the reverse (lessons 1.7–1.8).',
      },
      {
        kind: 'worked',
        title: 'Name the flaw in four arguments',
        steps: [
          {
            label: 'Argument 1',
            body: '"Professor Lin\'s climate model must be wrong; she once misdated a fossil." The evidence attacks Lin\'s record, not the model\'s assumptions or math. Flaw: ad hominem — the arguer\'s traits are irrelevant to the argument\'s merit.',
          },
          {
            label: 'Argument 2',
            body: '"Either we approve the stadium or downtown businesses will collapse — there is no third option." The argument assumes the options are exhaustive without ruling out alternatives (renovation, smaller venue, phased development). Flaw: false dilemma.',
          },
          {
            label: 'Argument 3',
            body: '"The committee\'s decision was unanimous, so it was clearly the right decision." Unanimity shows agreement, not correctness — a group can agree on a mistake. Flaw: appeal to consensus (a form of appeal to popularity).',
          },
          {
            label: 'Argument 4',
            body: '"Regular exercise correlates with longevity, so the city\'s new gym subsidies will make residents live longer." The correlation is real, but the causal leap ignores self-selection (healthy people join gyms) and other explanations. Flaw: confusing correlation with causation.',
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If an argument is flawed, its conclusion must be false.',
        right:
          'A flaw means the reasoning fails to establish the conclusion — the conclusion might still be true for other reasons. "The gym subsidies will extend lives" could be true even though the correlation argument does not prove it. Flaw questions ask what is wrong with the reasoning, never whether the conclusion is true.',
      },
      {
        kind: 'checkpoint',
        prompt: '"We cannot trust the safety review — the engineering firm that wrote it also builds bridges for a living, so of course it declared the bridge safe." What is the flaw?',
        choices: [
          'False dilemma: it presents only two possible verdicts on the bridge',
          'Ad hominem (circumstantial): it dismisses the review based on the firm\'s interests rather than engaging its reasoning',
          'Equivocation: it uses "safe" in two different senses',
          'Hasty generalization: it generalizes from one bridge to all bridges',
        ],
        correctIndex: 1,
        explanation:
          'The argument never examines the review\'s methods, data, or reasoning — it dismisses the conclusion purely because of who wrote it and what they stand to gain. That is the circumstantial form of ad hominem: attacking the source\'s motives instead of the argument. There is no forced choice between two options, no shifted word meaning, and no small-to-large generalization; the defect is entirely the substitution of motive-attack for engagement.',
      },
      {
        kind: 'example',
        title: 'Flaws combine',
        body: 'Real arguments often stack flaws. "Nobody I know recycles, so recycling programs obviously fail, and the council member pushing them just wants good press." That is hasty generalization (my circle → everyone), appeal to popularity inverted, and ad hominem (attacking the council member\'s motives) in three sentences. On flaw questions, match the answer choice to the argument\'s central defect — the one the conclusion actually depends on.',
      },
      {
        kind: 'tryit',
        drillIds: ['d-f143', 'd-f144', 'd-f145', 'd-f146'],
      },
      {
        kind: 'summary',
        points: [
          'The classic flaws: ad hominem, straw man, equivocation, circular reasoning, false dilemma, hasty generalization, appeal to popularity/authority, part–whole, necessary–sufficient confusion, correlation–causation.',
          'A flaw is a defect in reasoning — the conclusion may still be true.',
          'Name the defect precisely; vague unease does not answer flaw questions.',
          'Arguments can stack flaws — identify the one the conclusion depends on.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Define "flaw" and name six classic flaws from the library.',
        answer:
          'A flaw is a nameable defect in reasoning — a specific way the premises fail to support the conclusion; it does not mean the conclusion is false. Six classics: ad hominem, straw man, equivocation, circular reasoning, false dilemma, hasty generalization (also: appeal to popularity, part–whole, necessary–sufficient confusion, correlation versus causation).',
      },
      {
        kind: 'next',
        text: 'Foundations complete. Stage 2 puts them to work: each lesson takes one Logical Reasoning question type — flaw, weaken, strengthen, assumption, inference, and more — and teaches you to attack it systematically.',
      },
    ],
  },
];
