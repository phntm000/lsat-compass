/**
 * Stage 2 — Logical Reasoning question types (lessons 2.1–2.23).
 * All stimuli, choices, and explanations are original.
 */

type LessonBlock =
  | { kind: 'prose'; md: string }
  | { kind: 'keyterm'; term: string; definition: string }
  | { kind: 'example'; title: string; body: string; note?: string }
  | { kind: 'worked'; title: string; steps: { label: string; body: string }[] }
  | { kind: 'misconception'; wrong: string; right: string }
  | { kind: 'checkpoint'; prompt: string; choices: string[]; correctIndex: number; explanation: string }
  | { kind: 'tryit'; drillIds: string[] }
  | { kind: 'retrieval'; prompt: string; answer: string }
  | { kind: 'summary'; points: string[] }
  | { kind: 'next'; text: string };

interface Lesson {
  id: string;
  stage: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  title: string;
  estimatedMinutes: number;
  skills: string[];
  prerequisites: string[];
  blocks: LessonBlock[];
  version: number;
}

export const LESSONS_2: Lesson[] = [
  {
    id: '2.1',
    stage: 2,
    title: 'Main Conclusion',
    estimatedMinutes: 10,
    skills: ['lr-main-conclusion'],
    prerequisites: ['f-premise-conclusion'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Every argument is an attempt to convince you of one thing. That one thing is the **main conclusion**: the claim all the other sentences are working to support. Until you can point to it precisely, every other Logical Reasoning question type is harder than it needs to be. Flaw questions ask what is wrong with the route to the conclusion. Weaken and Strengthen questions attack or defend the route to the conclusion. Assumption questions ask what the route to the conclusion quietly depends on. So this lesson is not a small warm-up; it is the targeting system for the entire section.`,
      },
      {
        kind: 'keyterm',
        term: 'Main conclusion',
        definition:
          'The single claim the argument is trying to get you to believe — the point the premises are offered to support. Every other sentence in the argument either supports it directly, supports something that supports it, or is background.',
      },
      {
        kind: 'prose',
        md: `These questions announce themselves clearly. Watch for stems like:

- "The main point of the argument is that…"
- "Which of the following best expresses the main conclusion of the argument?"
- "The argument's conclusion is best stated as…"
- "The primary purpose of the argument is to establish that…"

Your job is selection, not agreement. You do not need to believe the conclusion, like it, or find it well supported. You need to identify which sentence the author is driving toward. A useful habit: after reading the stimulus, cover the answer choices and state the conclusion in your own words first. Then match, don't shop.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: in one sentence, what is a main conclusion?',
        answer:
          'The main conclusion is the claim everything else in the argument is trying to get you to believe — the point the premises are offered to support.',
      },
      {
        kind: 'example',
        title: 'A tiny argument, fully labeled',
        body: `Consider this: "The ferry to Harbor Island has been late every morning this month. Commuters cannot rely on a service that is never on time. The transit authority should add a second morning ferry."

The conclusion is the last sentence: the transit authority should add a second morning ferry. The first two sentences are evidence for it — they answer *why* you should believe a second ferry is needed. Notice the conclusion is a recommendation ("should"), while the premises are observations. That pattern — observations pointing to a recommendation — appears constantly on the LSAT.`,
      },
      {
        kind: 'worked',
        title: 'Finding the conclusion in a longer stimulus',
        steps: [
          {
            label: 'Step 1 — Read for the point, not the details',
            body: `"The city council voted last night to shorten weekend library hours. Council members say the change will save money, but the library's weekend budget is already tiny — the real expense is the new downtown arena approved in the same meeting. Cutting weekend hours will not fix the budget shortfall, and it will cost hundreds of families their only reliable internet access. The council should reverse the vote." Ask yourself: what is the author trying to get me to do or believe?`,
          },
          {
            label: 'Step 2 — Collect the conclusion candidates',
            body: `Two sentences sound conclusion-like: "Cutting weekend hours will not fix the budget shortfall" and "The council should reverse the vote." Both use strong, final language. When two candidates compete, do not guess — test them against each other in the next step.`,
          },
          {
            label: 'Step 3 — Run the why-test',
            body: `Ask: does the author believe the council should reverse the vote *because* cutting hours will not fix the budget? Yes. Now reverse it: does the author believe cutting hours will not fix the budget *because* the council should reverse the vote? No — that makes no sense. The "will not fix the budget" claim supports the "reverse the vote" claim, so "reverse the vote" is the main conclusion and the budget claim is a stepping-stone (an intermediate conclusion).`,
          },
          {
            label: 'Step 4 — Confirm nothing else outranks it',
            body: `The arena sentence and the internet-access sentence both give reasons for reversal — money saved is negligible, harm is real. Everything points one direction. The main conclusion: the council should reverse the vote. The correct answer will paraphrase that, not any single piece of evidence.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The conclusion is always the first or the last sentence of the stimulus.',
        right:
          'The conclusion can sit anywhere — first, last, or buried in the middle. Position is a hint, never a rule. Trust the why-test instead: premises answer why you should believe the conclusion, and the test only runs one way.',
      },
      {
        kind: 'checkpoint',
        prompt: `Read the argument, then answer: "Marie's Diner switched to locally sourced eggs last spring. Since then, breakfast sales are up 40 percent. Regulars say the omelets taste noticeably better, and the farm delivers every morning without fail. Clearly, the switch to local eggs caused the sales increase." Which of the following best expresses the main conclusion?`,
        choices: [
          'Breakfast sales at Marie\u2019s Diner are up 40 percent since last spring.',
          'Locally sourced eggs taste noticeably better than the eggs the diner used before.',
          'The switch to locally sourced eggs caused the increase in breakfast sales.',
          'The farm that supplies the diner delivers every morning without fail.',
        ],
        correctIndex: 2,
        explanation:
          'The author is driving toward a causal claim: the egg switch caused the sales increase. The word "clearly" flags it, and the why-test confirms it — the sales figures, the taste reports, and the reliable deliveries are all offered as reasons to believe the switch caused the increase. The other choices merely restate individual premises. A common trap on Main Conclusion questions is an answer that repeats a vivid premise word-for-word; always check which sentence the rest of the argument is working for.',
      },
      {
        kind: 'example',
        title: 'Deeper: when a conclusion supports another conclusion',
        body: `"The new highway bypass opened in June. Since then, downtown traffic has fallen by a third. Less traffic means cleaner air downtown, so the bypass has improved downtown air quality. The city should therefore keep the bypass open permanently."

Here "the bypass has improved downtown air quality" is a conclusion (supported by the traffic facts) — but it is not the *main* conclusion. It is a stepping-stone: the author cites cleaner air as a reason the city should keep the bypass open. That final recommendation is the main conclusion. On test day, wrong answers love to offer you the stepping-stone. When two conclusion-like sentences compete, the one supported by the other is the main one.`,
      },
      { kind: 'tryit', drillIds: ['d-c031', 'd-c033', 'd-c035'] },
      {
        kind: 'summary',
        points: [
          'The main conclusion is the claim the rest of the argument is trying to get you to believe.',
          'Identify it before looking at choices: restate it in your own words, then match.',
          'When two sentences compete, run the why-test — the conclusion is the one the other supports.',
          'Watch out for intermediate conclusions (stepping-stones) offered as trap answers.',
          'Conclusion indicator words like "therefore," "thus," "clearly," and "should" are hints, not proof.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'What two checks separate a conclusion from a premise?',
        answer:
          'First, conclusion indicator words (therefore, thus, clearly, should) flag candidates. Second, the why-test: premises answer why you should believe the conclusion, and the test runs in only one direction.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.2: Argument Part and Role. You can find the conclusion; now you will learn to name the job every sentence does inside an argument — premise, stepping-stone, background, or counterpoint.',
      },
    ],
  },
  {
    id: '2.2',
    stage: 2,
    title: 'Argument Part and Role',
    estimatedMinutes: 10,
    skills: ['lr-argument-part'],
    prerequisites: ['f-premise-conclusion', 'f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Finding the conclusion is step one. Step two is understanding the whole machine: every sentence has a job. Some sentences are premises doing direct support work. Some are stepping-stone conclusions. Some are background scene-setting that supports nothing. Some acknowledge an opposing point before the author answers it. Argument Part questions hand you one specific sentence and ask: what is its job? Students who try to answer from memory of the sentence's content get these wrong. Students who ask "what work does this sentence do for the argument?" get them right.`,
      },
      {
        kind: 'keyterm',
        term: 'Argument part (role)',
        definition:
          'The function a particular claim performs in the reasoning: main conclusion, intermediate (stepping-stone) conclusion, premise, background information, or an opposing consideration the author concedes or rebuts.',
      },
      {
        kind: 'prose',
        md: `The stems name a claim and ask for its function:

- "The claim that the old exhibits have not changed plays which of the following roles in the argument?"
- "In the argument, the statement that attendance has doubled serves to…"
- "Which of the following most accurately describes the role played in the argument by the claim that…?"

The correct answer describes the job in abstract terms: "a premise offered in support of the conclusion," "an intermediate conclusion used to support the main conclusion," "background information," or "a concession the author then argues against." Learn this vocabulary now; the answer choices are written in it.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Name four possible roles a sentence can play in an argument.',
        answer:
          'Main conclusion, intermediate (stepping-stone) conclusion, premise, and background information — plus a fifth common one: an opposing consideration the author concedes or rebuts.',
      },
      {
        kind: 'example',
        title: 'Tiny example: ruling out a rival explanation',
        body: `"The Riverside Museum opened its new science wing in March. Since then, weekday attendance has nearly doubled. The old exhibits have not changed in two years. Clearly, the new wing is responsible for the attendance surge."

What is the role of "The old exhibits have not changed in two years"? It rules out a rival explanation — maybe the old exhibits got better. By eliminating that alternative, it supports the conclusion that the new wing caused the surge. Its role: a premise offered in support of the conclusion. Notice the sentence looks like a mere fact. Role questions do not care what a sentence looks like; they care what it does.`,
      },
      {
        kind: 'worked',
        title: 'Classifying a stepping-stone conclusion',
        steps: [
          {
            label: 'Step 1 — Read the whole argument and mark the main conclusion',
            body: `"The city extended bar closing times to 2 a.m. last year. Since then, late-night noise complaints near downtown bars have tripled. More noise means more sleepless residents, and sleepless residents file complaints with the city. The extension was a mistake, so the council should restore the old closing time." The main conclusion is the final recommendation: restore the old closing time.`,
          },
          {
            label: 'Step 2 — Locate the sentence the question asks about',
            body: `Suppose the question asks about "More noise means more sleepless residents." First, notice it is itself supported — by the complaint statistics — and that it in turn supports the claim that the extension was a mistake. A sentence that is both supported and supporting is an intermediate conclusion.`,
          },
          {
            label: 'Step 3 — Describe the job in the test\'s vocabulary',
            body: `The correct answer will say something like: "an intermediate conclusion that is used to support the main conclusion." Wrong answers will call it a premise (it is supported, so it is not a mere premise), the main conclusion (it supports a further claim, so it is not the final stop), or background (it does real argumentative work).`,
          },
          {
            label: 'Step 4 — Double-check with the why-test',
            body: `Why should we believe there are more sleepless residents? Because noise complaints tripled. Why should the council restore the old closing time? Because, among other things, there are more sleepless residents. Supported and supporting — intermediate conclusion confirmed.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If a sentence states a true fact, it must be a premise; conclusions are opinions.',
        right:
          'Role is about function, not about truth or about fact-versus-opinion. A true factual claim can be an intermediate conclusion if the argument first argues for it and then uses it to argue further. Ask what the sentence does, not what kind of sentence it is.',
      },
      {
        kind: 'checkpoint',
        prompt: `"Critics predicted the new night market would drive away longtime shoppers. Instead, foot traffic on market nights is up 25 percent, and two-thirds of the vendors are businesses that opened in the last year. The night market has clearly been good for the district, which is why the merchants' association should expand it to two nights a week." What role does "The night market has clearly been good for the district" play?`,
        choices: [
          'It is the main conclusion of the argument.',
          'It is a premise offered as direct evidence for the main conclusion.',
          'It is background information that supports no claim in the argument.',
          'It is an intermediate conclusion that supports the main conclusion.',
        ],
        correctIndex: 3,
        explanation:
          'The sentence is both supported (by the foot-traffic and vendor facts) and supporting (it is the reason given for expanding to two nights). That two-way position defines an intermediate conclusion. It is not the main conclusion, because the argument does not stop there — the final recommendation about expanding is. It is not a mere premise, because the argument argues for it rather than just asserting it. And it plainly does argumentative work, so it is not background.',
      },
      {
        kind: 'example',
        title: 'Deeper: the concession that looks like a premise',
        body: `"Although the new water tower cost more than projected, it has ended the summer pressure drops that plagued the north side for a decade. The town got its money's worth."

The first clause concedes an opposing point (the cost overrun) — its job is to acknowledge the other side before the author answers it with the pressure-drop evidence. On a role question, "a concession the author acknowledges" is a distinct answer from "a premise supporting the conclusion." Concessions usually appear with words like although, while, despite, or admittedly. When you see one, expect the author's real support to arrive in the next sentence.`,
      },
      { kind: 'tryit', drillIds: ['d-c036', 'd-c038', 'd-c040'] },
      {
        kind: 'summary',
        points: [
          'Role questions ask what job a sentence does: main conclusion, intermediate conclusion, premise, background, or concession.',
          'Answer in the test\u2019s vocabulary — choices describe functions, not content.',
          'The why-test in both directions identifies intermediate conclusions: supported and supporting.',
          'Concessions (although, despite, admittedly) acknowledge the other side; they are not premises.',
          'A sentence\u2019s role is its function in the reasoning, not whether it states a fact or an opinion.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'How do you tell an intermediate conclusion apart from a plain premise?',
        answer:
          'Run the why-test both ways. A premise is only supporting — nothing in the argument argues for it. An intermediate conclusion is both supported (the argument gives reasons for it) and supporting (it is used as a reason for the main conclusion).',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.3: Method of Reasoning. You can now name every part; next you will learn to describe what the argument is doing — its technique — in the abstract terms the test uses.',
      },
    ],
  },
  {
    id: '2.3',
    stage: 2,
    title: 'Method of Reasoning',
    estimatedMinutes: 11,
    skills: ['lr-method'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Imagine watching two chess games and being asked: "Which of these other games was won the same way?" You would ignore who played, what opening was used, even who won — you would look at the *pattern of moves*. Method of Reasoning questions do exactly this with arguments. They ask you to describe the author's technique abstractly: arguing by analogy, offering a counterexample, ruling out alternatives, drawing a general rule from examples. The topic is camouflage. The method is the answer.`,
      },
      {
        kind: 'keyterm',
        term: 'Method of reasoning',
        definition:
          'The abstract technique an argument uses to move from premises to conclusion — for example, analogy, counterexample, elimination of alternatives, or generalizing from a sample — described without reference to the argument\u2019s subject matter.',
      },
      {
        kind: 'prose',
        md: `Typical stems:

- "The argument proceeds by…"
- "Which of the following most accurately describes the method of reasoning used in the argument?"
- "The technique of reasoning employed in the argument is to…"

The correct choice will sound general — it could describe an argument about farming, astronomy, or office policy. Before looking at the choices, finish this sentence in your own words: "The author tries to prove the conclusion by ___." If your fill-in mentions the topic ("by talking about bike fees"), it is too specific. Push one level up ("by attacking an analogy between two programs").`,
      },
      {
        kind: 'retrieval',
        prompt: 'What should your description of an argument\u2019s method leave out?',
        answer:
          'The subject matter. A good method description could apply to an argument about any topic — it names the technique (analogy, counterexample, ruling out alternatives) without mentioning what the argument is about.',
      },
      {
        kind: 'example',
        title: 'Tiny example: argument by analogy',
        body: `"A community garden is like a neighborhood watch. Just as the watch works only when residents take turns patrolling, the garden will thrive only if members take turns watering. So the garden association should set up a watering schedule."

The method: arguing by analogy — the author supports a claim about gardens by comparing them to a similar case (neighborhood watches) where the pattern is already accepted. A correct answer choice would say something like "draws an analogy between two similar situations." A trap choice would mention gardens or watering schedules — content, not method.`,
      },
      {
        kind: 'worked',
        title: 'Naming the method: attacking an analogy',
        steps: [
          {
            label: 'Step 1 — Strip the argument to its skeleton',
            body: `"Critics say the city's new bike-share program cannot succeed here because it failed in the neighboring town of Fairview. But Fairview's program charged triple the fees and offered no stations downtown. Pointing to Fairview proves nothing about our program." Skeleton: critics use an analogy (Fairview) to predict failure; the author lists relevant differences and rejects the analogy's force.`,
          },
          {
            label: 'Step 2 — Describe the move in your own words',
            body: `Finish the sentence: "The author tries to prove the conclusion by ___." Candidate: "by showing the comparison the critics rely on breaks down because of important differences." That is a method description — no mention of bikes needed.`,
          },
          {
            label: 'Step 3 — Match at the right level of abstraction',
            body: `The correct choice will say something like "undermines an analogy by pointing to relevant dissimilarities between the cases compared." Reject any choice that merely summarizes the bike-share facts, and reject choices describing methods the author never used — for instance, the author offers no counterexample of a successful program and cites no statistics.`,
          },
          {
            label: 'Step 4 — Check the conclusion the method serves',
            body: `The author's conclusion is that the Fairview comparison proves nothing. The method (exposing disanalogy) directly serves that conclusion. If a choice describes a real technique but one aimed at a different conclusion, it is wrong. Method and target must line up.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The right answer is the one that mentions the most details from the stimulus.',
        right:
          'Detail-matching is the trap. The correct answer describes the reasoning pattern at a level where the topic could be swapped out entirely. If a choice could not describe an argument about a different subject, it is describing content, not method.',
      },
      {
        kind: 'checkpoint',
        prompt: `"The claim that strict attendance policies always raise grades is false. At Northside High, enforcement of the attendance policy was tightened three years ago, yet average grades have fallen every year since. One failing case is enough to refute a claim about what always happens." Which best describes the method of reasoning?`,
        choices: [
          'It generalizes from a large sample of schools to a conclusion about all schools.',
          'It refutes a universal claim by presenting a counterexample.',
          'It argues by analogy between attendance policies and grading policies.',
          'It attacks the motives of those who support strict attendance policies.',
        ],
        correctIndex: 1,
        explanation:
          'The argument takes a claim with the word "always" and defeats it with a single case where the pattern fails — the textbook counterexample method. The author even names the move: "one failing case is enough." The first choice is wrong because one school is not a large sample and the author is not generalizing. The third is wrong because no comparison between two similar cases is drawn. The fourth is wrong because the author never discusses anyone\u2019s motives; keep method answers tied to what the author actually did.',
      },
      {
        kind: 'example',
        title: 'Deeper: elimination of alternatives',
        body: `"The library's rare-book room is either too humid, too bright, or poorly ventilated — those are the only factors that damage old bindings. Humidity and light levels both tested normal this week. So the ventilation must be the problem."

The method here is elimination of alternatives: list the possible explanations, rule out all but one, and conclude the survivor. Recognizing this pattern matters because several flaw types are failed eliminations ("the author overlooks a fourth possibility"). When you see "either…or" followed by knockouts, label the method immediately — it will pay off in Flaw and Parallel Reasoning lessons later.`,
      },
      { kind: 'tryit', drillIds: ['d-f143', 'd-f144', 'd-f145'] },
      {
        kind: 'summary',
        points: [
          'Method questions ask how the argument moves from premises to conclusion, described abstractly.',
          'Prephrase in your own words first: "The author tries to prove it by ___."',
          'The correct answer works if you swap the topic; trap answers merely restate content.',
          'Common methods: analogy, counterexample, elimination of alternatives, generalization from a sample.',
          'Check that the described method serves the author\u2019s actual conclusion, not some other claim.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Your friend says the method answer "discusses the bike-share program\u2019s fees" sounds right because fees were in the stimulus. What is the mistake?',
        answer:
          'That choice describes content, not method. The correct method answer must be abstract enough to describe an argument about any topic — for example, "undermines an analogy by citing relevant differences" — with no mention of bikes or fees.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.4: Point at Issue. You can now describe a single argument\u2019s technique; next you will handle two speakers and determine exactly what — if anything — they genuinely disagree about.',
      },
    ],
  },
  {
    id: '2.4',
    stage: 2,
    title: 'Point at Issue',
    estimatedMinutes: 10,
    skills: ['lr-point-at-issue'],
    prerequisites: ['f-premise-conclusion'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Two people can talk past each other for an hour, each convinced the other is wrong, while disagreeing about nothing. Point at Issue questions test whether you can tell genuine disagreement from mere noise. You get a short dialogue — two speakers, two positions — and you must find the one proposition they actually take opposite sides on. This is a precision skill: you are not asked who is right, who is more persuasive, or what the topic is. You are asked what claim one speaker would endorse and the other would reject.`,
      },
      {
        kind: 'keyterm',
        term: 'Point at issue',
        definition:
          'A proposition on which two speakers take incompatible positions — one is committed to its truth and the other is committed to its falsity. Both must actually commit; talking about different things is not disagreement.',
      },
      {
        kind: 'prose',
        md: `The stems are distinctive:

- "The dialogue provides the most support for the claim that Mara and Theo disagree about whether…"
- "Which of the following is a point at issue between the two speakers?"
- "Mara and Theo disagree over whether…"

Your procedure has three checks. First, find each speaker's conclusion — what is each one driving at? Second, check the disagreement is about the *same proposition*: one says it is true, the other says it is false. Third, verify commitment: a speaker who never takes a stand on the proposition cannot be disagreeing about it. Every trap answer fails one of these checks.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What are the three checks for a genuine point at issue?',
        answer:
          'First, identify each speaker\u2019s conclusion. Second, confirm the disagreement is about the same proposition — one affirms it, the other denies it. Third, verify both speakers actually commit to a position on it; a speaker who takes no stand cannot be disagreeing.',
      },
      {
        kind: 'example',
        title: 'Tiny example: a clean disagreement',
        body: `Mara: "The city should close Elm Street to cars on weekends. Pedestrian zones always increase foot traffic for nearby shops."
Theo: "Closing Elm Street is a mistake. When Oak Avenue went car-free, three shops closed within a year because delivery trucks could not reach them."

The point at issue: whether closing a street to cars helps or harms local businesses. Mara is committed to "helps" (foot traffic increases); Theo is committed to "harms" (shops closed). Same proposition, opposite commitments — a genuine point at issue. Notice you did not need to decide who is right. That is never your job here.`,
      },
      {
        kind: 'worked',
        title: 'Working a dialogue with a trap',
        steps: [
          {
            label: 'Step 1 — Extract each speaker\u2019s conclusion',
            body: `Priya: "The new reservoir will solve the county's water shortages. The engineers' projections show supply exceeding demand for the next thirty years." Sam: "The reservoir's projections assume average rainfall, but rainfall has been below average for six straight years. The reservoir will not solve the shortages." Priya's conclusion: the reservoir will solve the shortages. Sam's conclusion: it will not.`,
          },
          {
            label: 'Step 2 — State the shared proposition',
            body: `Both speakers are taking stands on one proposition: whether the new reservoir will solve the county's water shortages. Priya affirms it; Sam denies it. This is your leading candidate for the point at issue.`,
          },
          {
            label: 'Step 3 — Test the trap answers against the commitment check',
            body: `A trap answer might say: "whether rainfall has been below average for six years." Sam asserts this — but Priya never addresses it. She talks about projections, not past rainfall. Since Priya takes no stand on it, it cannot be a point at issue. Another trap: "whether the engineers' projections are accurate" — Priya relies on them, but Sam questions only one assumption, and neither speaker squarely affirms or denies their overall accuracy.`,
          },
          {
            label: 'Step 4 — Confirm the winner passes all three checks',
            body: `"Whether the reservoir will solve the water shortages" — each speaker's conclusion identified, same proposition, both committed in opposite directions. That is the answer. When in doubt, re-read the exact sentence each speaker is driving toward; the point at issue almost always lives in the conclusions, not the supporting details.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If the two speakers use different reasons or mention different facts, they must disagree about those facts.',
        right:
          'Speakers can cite entirely different evidence while agreeing on the facts and disagreeing only on the conclusion — or they can seem to argue while addressing different questions entirely. Disagreement requires opposite commitments to the same proposition, not merely different words.',
      },
      {
        kind: 'checkpoint',
        prompt: `Lena: "The community pool should stay open year-round. Heated pools operate fine through winter in colder cities than ours." Marco: "Keeping the pool open all winter would be wonderful for swimmers, but the heating bill would bankrupt the parks budget. The pool should close in November as usual." What is the point at issue?`,
        choices: [
          'Whether heated pools can operate through winter in cold climates.',
          'Whether the parks budget can afford the winter heating bill.',
          'Whether the pool should remain open year-round.',
          'Whether swimmers would enjoy a year-round pool.',
        ],
        correctIndex: 2,
        explanation:
          'Lena concludes the pool should stay open year-round; Marco concludes it should close in November. That is the same proposition with opposite commitments — the genuine point at issue. The first choice fails the commitment check: Marco never disputes that heated pools can operate in winter; he grants swimmers would love it. The second choice is close but subtly off: Marco asserts the bill would bankrupt the budget, but Lena never takes a stand on the budget at all, so they do not disagree about it. The fourth is something both speakers effectively agree on.',
      },
      {
        kind: 'example',
        title: 'Deeper: talking past each other',
        body: `Ana: "The proposed skate park will be too noisy for the neighborhood." Ben: "The skate park will give teenagers a safe place to gather after school."

Do they disagree? Not necessarily. Ana's proposition is about noise; Ben's is about safety. It is entirely possible for the park to be both noisy and safe — the two claims are compatible. Unless one of them denies the other's proposition, there is no point at issue, only two people emphasizing different considerations. On the test, "the speakers merely talk past each other" is a real outcome the correct answer can describe — do not force a disagreement where none exists.`,
      },
      { kind: 'tryit', drillIds: ['d-c039', 'd-c040', 'd-f146'] },
      {
        kind: 'summary',
        points: [
          'A point at issue needs opposite commitments to the same proposition from both speakers.',
          'Your job is never to decide who is right — only what they disagree about.',
          'Run three checks: each speaker\u2019s conclusion, same proposition, both committed.',
          'Trap answers name claims only one speaker addresses.',
          'Speakers who address different compatible considerations are talking past each other, not disagreeing.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'One speaker says rainfall was low; the other never mentions rainfall. Can "whether rainfall was low" be the point at issue? Why not?',
        answer:
          'No. A point at issue requires both speakers to take opposite stands on the same proposition. If the second speaker never addresses rainfall, there is no commitment and therefore no disagreement about it — that answer fails the commitment check.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.5: Mapping Argument Structure — the capstone of Group A, where you will assemble everything from lessons 2.1 through 2.4 into a full map of an argument.',
      },
    ],
  },
  {
    id: '2.5',
    stage: 2,
    title: 'Mapping Argument Structure',
    estimatedMinutes: 12,
    skills: ['lr-argument-part'],
    prerequisites: ['lr-main-conclusion', 'lr-argument-part'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `You can find the conclusion. You can name each sentence's role. Now put it together: read an argument the way an electrician reads a wiring diagram — every claim labeled, every support arrow drawn. This is the capstone skill of Group A, and it is also the single most transferable habit in Logical Reasoning. Every Flaw, Weaken, Strengthen, and Assumption question becomes easier when you can see, at a glance, which claims are load-bearing and which are decoration. Strong test-takers do not just read arguments; they map them.`,
      },
      {
        kind: 'keyterm',
        term: 'Argument map',
        definition:
          'A complete labeling of an argument\u2019s claims — main conclusion, intermediate conclusions, premises, background, and concessions — showing which claims support which. The map reveals the argument\u2019s structure independent of its topic.',
      },
      {
        kind: 'prose',
        md: `Structure questions wear a few disguises:

- "Which of the following best describes the structure of the argument?"
- "The argument proceeds by…" (a structure question in method clothing)
- Any Argument Part or Main Conclusion stem applied to a longer, layered stimulus

Your mapping procedure: first, bracket the main conclusion. Second, mark every claim that is itself supported — those are intermediate conclusions. Third, for each conclusion, gather the claims offered as reasons for it. Fourth, set aside scene-setting sentences that support nothing; they are background, and background is never the answer. Draw the arrows mentally: premise → intermediate → main. If you cannot draw the arrows, you do not yet understand the argument.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What are the four steps of the mapping procedure?',
        answer:
          'First, bracket the main conclusion. Second, mark every claim that is itself supported — the intermediate conclusions. Third, gather the reasons offered for each conclusion. Fourth, set aside scene-setting sentences that support nothing as background.',
      },
      {
        kind: 'example',
        title: 'Tiny example: a fully mapped argument',
        body: `"Ridership on the crosstown bus has fallen 20 percent in two years (premise). A survey found that most former riders switched to the new light rail (premise). The light rail is therefore drawing riders away from the bus (intermediate conclusion — supported by the first two sentences). Since the bus now runs half-empty, the transit agency is wasting fuel (intermediate conclusion — supported by the ridership fact plus the rail conclusion). The agency should cut crosstown bus service in half (main conclusion — supported by the waste claim)."

Five sentences, three levels. Notice how the conclusion of one step becomes a premise of the next. That chaining is the hallmark of layered arguments — and the reason mapping matters: a flaw at any link breaks everything downstream.`,
      },
      {
        kind: 'worked',
        title: 'Mapping a stimulus with background and a concession',
        steps: [
          {
            label: 'Step 1 — Bracket the main conclusion',
            body: `"The Harborview farmers' market opened five years ago as a pilot project. Last season it drew 40,000 visitors. Although parking near the market is limited, shuttle buses from downtown run every fifteen minutes. Vendors report that market days are now their most profitable of the week. The market has clearly been a success, so the city should make it permanent." The final recommendation — make it permanent — is what everything drives toward. Bracket it.`,
          },
          {
            label: 'Step 2 — Find the intermediate conclusion',
            body: `"The market has clearly been a success" is supported (by visitors and vendor profits) and supporting (it is the reason given for making it permanent). Mark it as intermediate. The "clearly" is the author's own flag that a conclusion is being drawn here.`,
          },
          {
            label: 'Step 3 — Gather the premises and spot the concession',
            body: `Premises for the success claim: 40,000 visitors, vendors' most profitable days. The shuttle-bus sentence answers a worry (parking is limited) — it defends the success claim against an objection, so it functions as a supporting premise via rebuttal. "Opened five years ago as a pilot project" is scene-setting background: it supports nothing and nothing supports it. "Although parking near the market is limited" is a concession — an opposing consideration the author acknowledges and then answers.`,
          },
          {
            label: 'Step 4 — Read the finished map',
            body: `Background (pilot project) stands alone. Concession (parking limited) is answered by the shuttle premise. Visitor numbers + vendor profits + shuttle rebuttal → intermediate (market is a success) → main (make it permanent). On a structure question, the correct answer describes this shape: evidence for an evaluative claim, which then justifies a recommendation. Any answer mentioning the pilot-project history as load-bearing is wrong — background is never structural.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Mapping means summarizing what the argument says.',
        right:
          'A summary retells content; a map shows function. Two arguments about totally different topics can have identical maps, and the test exploits that. Map the jobs and the arrows, not the story — the story is camouflage.',
      },
      {
        kind: 'checkpoint',
        prompt: `"The county's recycling rate has stalled at 30 percent for three years. Neighboring counties that introduced curbside composting all saw recycling rates climb above 45 percent. Composting clearly boosts recycling, so our county should introduce curbside composting too." Which best describes the structure?`,
        choices: [
          'It presents two independent reasons for introducing curbside composting.',
          'It refutes the claim that recycling rates cannot be raised, then proposes composting.',
          'It generalizes from the county\u2019s own history to a prediction about neighboring counties.',
          'It cites a local statistic, then draws an analogy to neighboring counties to support a recommendation.',
        ],
        correctIndex: 3,
        explanation:
          'The map: the stalled 30 percent rate is the problem (background/motivation), the neighboring-county results support the intermediate claim that composting boosts recycling, and that claim supports the recommendation. So the structure is a local fact plus an analogy feeding a recommendation. The first choice is wrong because the two facts are not independent reasons — the county statistic motivates the question, the county results answer it. The second invents a refutation that never happens. The third reverses the direction: the generalization runs from the neighbors to us, not from us to them.',
      },
      {
        kind: 'example',
        title: 'Deeper: why mapping pays off downstream',
        body: `Return to the bus example: "Ridership fell 20 percent. Former riders switched to light rail. So the rail drew riders from the bus. The bus runs half-empty, so the agency wastes fuel. Cut bus service in half."

Now the payoff. A Flaw question might attack the first link (the survey could be unrepresentative). A Weaken question might attack the second (half-empty buses might still serve riders with no rail access). A Necessary Assumption question might target the hidden bridge (cutting service will not strand riders). Each question type aims at a specific arrow in your map. Students who map see the target instantly; students who do not must re-read the stimulus for every question.`,
      },
      { kind: 'tryit', drillIds: ['d-c037', 'd-c039', 'd-f146'] },
      {
        kind: 'summary',
        points: [
          'Map every argument: main conclusion, intermediate conclusions, premises, background, concessions.',
          'Background scene-setting is never load-bearing — never the answer to a structure question.',
          'Conclusions of one step become premises of the next; a flaw at any link breaks everything downstream.',
          'A map shows function and arrows, not a retelling of the story.',
          'Mapping is the master habit: Flaw, Weaken, Strengthen, and Assumption questions all target specific arrows in the map.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'An argument\u2019s first sentence is pure scene-setting. Why can it never be the answer to a Main Conclusion or Argument Part question asking for load-bearing structure?',
        answer:
          'Because background sentences support nothing and are supported by nothing — they stand outside the support arrows. Structure questions ask about the reasoning machinery, and a sentence that does no argumentative work is not part of that machinery.',
      },
      {
        kind: 'next',
        text: 'Group A complete. Next, Group B begins with lesson 2.6: Must Be True — where you stop analyzing how arguments are built and start drawing ironclad inferences from stated facts.',
      },
    ],
  },
  {
    id: '2.6',
    stage: 2,
    title: 'Must Be True',
    estimatedMinutes: 12,
    skills: ['lr-must-be-true'],
    prerequisites: ['f-deduction'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Until now you have studied arguments — claims trying to persuade you. Must Be True questions flip the task: the stimulus is a set of facts, and your job is to find the one answer that *follows* from them with certainty. No persuasion, no gaps, no opinions. Think of the stimulus as locked rooms and the correct answer as the one room you can prove someone is in, given the keys you hold. "Could be true" is worthless here. "Probably true" is worthless. Only "has to be true, no matter what" earns the point.`,
      },
      {
        kind: 'keyterm',
        term: 'Must Be True (inference)',
        definition:
          'A conclusion that follows logically from the stated facts with certainty — it is impossible for the stimulus to be true and this answer false. The correct answer adds no new information beyond what the facts guarantee.',
      },
      {
        kind: 'prose',
        md: `Recognize the stems:

- "If the statements above are true, which of the following must also be true?"
- "Which of the following can be properly inferred from the statements above?"
- "The statements above, if true, most strongly support which of the following?" (sometimes — lesson 2.7 sorts this out)

Your method: treat the stimulus as a small machine. Combine the statements — chain conditionals, apply contrapositives, intersect "all" and "some" claims — and see what pops out. Then find the answer that says exactly that. The correct answer often feels boring or obvious. That is the point: boring means certain. Exciting means the author added something, and added somethings are wrong here.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Why does the correct Must Be True answer often feel boring?',
        answer:
          'Because it adds nothing beyond what the facts guarantee. Certainty comes from staying inside the given information; any answer that feels interesting or surprising has almost certainly smuggled in something new, which disqualifies it.',
      },
      {
        kind: 'example',
        title: 'Tiny example: chaining conditionals',
        body: `"Only registered voters can serve on the jury. Maria is not a registered voter."

Combine: jury service requires registration; Maria lacks it. Therefore Maria cannot serve on the jury. Notice the inference uses the contrapositive: if jury service, then registered; Maria is not registered, so no jury service. The correct answer will state this plainly: "Maria cannot serve on the jury." An answer like "Maria does not want to serve" adds new information — wrong. An answer like "No unregistered voter can serve" merely restates a premise — not an inference, usually wrong.`,
      },
      {
        kind: 'worked',
        title: 'Combining statements into an inference',
        steps: [
          {
            label: 'Step 1 — List the facts as separate pieces',
            body: `"Every novel in the Marlowe Prize shortlist was published by an independent press. Some independent-press novels were written in under a year. The winning novel was on the shortlist." Three facts. Keep them separate before combining — most errors come from blending two facts into something neither says.`,
          },
          {
            label: 'Step 2 — Chain what connects',
            body: `The winning novel was on the shortlist; every shortlisted novel was published by an independent press. Chain them: the winning novel was published by an independent press. That is a valid Must Be True inference — it follows with certainty.`,
          },
          {
            label: 'Step 3 — Check what does NOT connect',
            body: `Can we infer the winning novel was written in under a year? No. We know *some* independent-press novels were written quickly, but "some" does not attach to any particular novel. The winning novel might be one of them or not — we cannot say. This is the classic "some" trap: "some" gives you existence, never identity.`,
          },
          {
            label: 'Step 4 — Match the certain inference',
            body: `The correct answer is the plain chain from Step 2: the winning novel was published by an independent press. It feels almost too obvious — that obviousness is your signal. Any answer about writing speed, prize quality, or other presses reaches beyond the facts and must be rejected.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: '"Could be true" is good enough — if the answer is consistent with the facts, pick it.',
        right:
          'Consistency is far too weak. An answer is correct only if the facts *guarantee* it — if there is no possible world in which the stimulus is true and the answer false. Test each choice by trying to imagine the stimulus true and the choice false; if you can, eliminate it.',
      },
      {
        kind: 'checkpoint',
        prompt: `"All of the clinic's full-time nurses work the night shift at least once a week. Some nurses who work the night shift have requested a transfer to days. Dana is a full-time nurse at the clinic." Which must be true?`,
        choices: [
          'Dana works the night shift at least once a week.',
          'Dana has requested a transfer to the day shift.',
          'Some full-time nurses have requested a transfer to days.',
          'All nurses who work the night shift are full-time.',
        ],
        correctIndex: 0,
        explanation:
          'Chain the first and third facts: every full-time nurse works nights at least weekly, and Dana is a full-time nurse, so Dana works nights at least weekly — guaranteed. The second choice fails because "some night-shift nurses requested transfers" tells us nothing about Dana specifically; "some" gives existence, not identity. The third choice is tempting but invalid: the transfer-requesters are night-shift nurses, and we cannot prove any of them are full-time. The fourth reverses the conditional — the stimulus says full-time implies night shifts, not the reverse.',
      },
      {
        kind: 'example',
        title: 'Deeper: the contrapositive as inference engine',
        body: `"The botanical garden's orchid house is open only on days when a specialist is on duty. The orchid house was closed last Tuesday."

Inference: no specialist was on duty last Tuesday. This is the contrapositive at work: open → specialist on duty; not open → no specialist. Students miss these because the stimulus never mentions specialists being absent — the inference feels like new information. It is not: it is the original conditional wearing different clothes. Whenever a stimulus gives you an "only if" or "only when," immediately write the contrapositive in your head. It is the most frequently tested inference move on the LSAT.`,
      },
      { kind: 'tryit', drillIds: ['d-c021', 'd-c023', 'd-c025'] },
      {
        kind: 'summary',
        points: [
          'Must Be True answers follow from the facts with certainty — no new information allowed.',
          'Combine statements: chain conditionals, apply contrapositives, intersect quantifiers carefully.',
          '"Some" proves existence, never identity — it never attaches to a particular individual.',
          'The correct answer often feels boring; exciting answers smuggle in something new.',
          'Test each choice: can you imagine the stimulus true and the choice false? If yes, eliminate.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'You know "some A are B" and "X is an A." Can you infer "X is a B"? Explain the general rule.',
        answer:
          'No. "Some" guarantees that at least one A is B, but it never tells you which A. You cannot attach a "some" claim to any particular individual — this is the existence-without-identity rule, and violating it is one of the most common inference traps.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.7: Most Strongly Supported — the softer sibling of Must Be True, where the answer is not guaranteed but is the best-supported claim in the set.',
      },
    ],
  },
  {
    id: '2.7',
    stage: 2,
    title: 'Most Strongly Supported',
    estimatedMinutes: 10,
    skills: ['lr-most-strongly-supported'],
    prerequisites: ['f-deduction', 'lr-must-be-true'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Must Be True demands certainty. Most Strongly Supported relaxes the grip: the correct answer is not guaranteed by the facts, but it is *better supported* than any other choice. Think of it as inference with humility. The stimulus gives you evidence pointing in a direction; the answer follows that direction without sprinting past the evidence. These questions punish two opposite instincts: the timid student picks an answer so weak it says nothing, and the bold student picks an answer stronger than the evidence allows. The winner sits exactly at the evidence's edge.`,
      },
      {
        kind: 'keyterm',
        term: 'Most strongly supported',
        definition:
          'The answer choice that receives more support from the stated facts than any other choice — strongly suggested by the evidence, though not logically guaranteed. It stays within the direction and strength of the given information.',
      },
      {
        kind: 'prose',
        md: `The signature stem:

- "Which of the following is most strongly supported by the information above?"

(Also: "The statements above most strongly support which of the following?" — same task.)

Contrast this with Must Be True: there, you prove the answer. Here, you weigh it. The correct answer typically uses softened language — "likely," "tends to," "suggests," "probably," "can." A choice that states something with absolute certainty ("all," "always," "never," "must") is almost always too strong for this question type. Your calibration question for each choice: does the evidence point here, and does the choice claim only as much as the evidence gives?`,
      },
      {
        kind: 'retrieval',
        prompt: 'What is the difference in proof standard between Must Be True and Most Strongly Supported?',
        answer:
          'Must Be True requires logical certainty — the facts must guarantee the answer. Most Strongly Supported requires only that the answer be better supported by the facts than any alternative; it is strongly suggested but not guaranteed, and its language is typically softened.',
      },
      {
        kind: 'example',
        title: 'Tiny example: staying at the evidence\u2019s edge',
        body: `"A ten-year study of 4,000 office workers found that those who took a short walk at lunch reported higher afternoon energy than those who did not, even after controlling for age, diet, and sleep."

Which is most strongly supported? "Taking a short walk at lunch is associated with higher afternoon energy among office workers." That is exactly what the study found — no more. "Walking causes higher energy" overclaims (association is not causation). "All workers should walk at lunch" is advice, not support. The winner mirrors the evidence's strength: an association, reported carefully.`,
      },
      {
        kind: 'worked',
        title: 'Calibrating strength choice by choice',
        steps: [
          {
            label: 'Step 1 — Read for direction and strength',
            body: `"Harbor seals in the bay have declined 30 percent over five years. Over the same period, commercial fishing in the bay doubled, and the seals' primary prey species is now classified as overfished. Marine biologists note that seal populations elsewhere in the region, where fishing is restricted, have remained stable." Direction: fishing pressure is implicated in the decline. Strength: correlational and comparative — suggestive, not conclusive.`,
          },
          {
            label: 'Step 2 — Eliminate the too-strong choices',
            body: `"Commercial fishing caused the seal decline" claims causation the evidence only suggests — too strong, eliminate. "Fishing restrictions always prevent seal declines" adds "always" plus a universal rule — far too strong, eliminate. Strength calibration eliminates most wrong answers on this question type before you even find the right one.`,
          },
          {
            label: 'Step 3 — Eliminate the nonresponsive choices',
            body: `"Seals are more intelligent than previously thought" — the stimulus says nothing about intelligence; unsupported, eliminate. "The bay's water temperature has risen" — never mentioned; eliminate. Notice these are true-or-false unknowns: the evidence neither supports nor undermines them, so they cannot be "most strongly supported."`,
          },
          {
            label: 'Step 4 — Confirm the winner\u2019s modesty',
            body: `The surviving choice: "Reduced availability of prey due to fishing pressure may have contributed to the seal decline." Words like "may have contributed" match the evidence's strength exactly — the data suggest a link without proving one. On Most Strongly Supported, the correct answer's humility is its credential.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Most Strongly Supported is just Must Be True with easier answer choices.',
        right:
          'The proof standard is genuinely different. A Must Be True answer must be entailed — impossible to deny given the facts. A Most Strongly Supported answer is merely the best-supported claim, and it can use hedged language ("likely," "suggests") that would be too weak for a Must Be True question. Do not demand certainty here; demand best fit.',
      },
      {
        kind: 'checkpoint',
        prompt: `"Cities that converted downtown parking lots into public plazas saw nearby retail sales grow an average of 12 percent within two years, while comparable cities that kept their lots saw no such growth. Urban economists caution that the plaza cities also invested heavily in transit during the same period." Which is most strongly supported?`,
        choices: [
          'Converting parking lots into plazas causes retail sales to increase.',
          'Public plazas are the only way for a city to increase downtown retail sales.',
          'The plaza cities\u2019 retail growth may be partly explained by factors other than the plazas themselves.',
          'Cities that keep their parking lots will see retail sales decline.',
        ],
        correctIndex: 2,
        explanation:
          'The economists\u2019 caution directly supports the modest claim that other factors — like the transit investment — may partly explain the growth. It stays inside the evidence and hedges appropriately with "may be partly." The first choice overclaims causation from a correlation the stimulus itself qualifies. The second adds "the only way," an absolute the evidence cannot support. The fourth predicts a decline the stimulus never mentions; "no growth" in comparable cities is not a decline, and prediction beyond the data fails the strength test.',
      },
      {
        kind: 'example',
        title: 'Deeper: when the answer is a soft Must Be True',
        body: `Sometimes the best-supported answer *is* entailed, and that is fine — "most strongly supported" includes certainty as a special case. Example: "Every package mailed before noon arrives the next day. Priya's package arrived the next day." Nothing follows with certainty about when it was mailed (affirming the consequent). But "Priya's package may have been mailed before noon" is supported — it is consistent and suggested. Do not reject a choice merely because it is hedged; on this question type, hedging is usually the mark of the winner.`,
      },
      { kind: 'tryit', drillIds: ['d-c022', 'd-c024', 'd-c026'] },
      {
        kind: 'summary',
        points: [
          'Most Strongly Supported asks for the best-supported choice, not a guaranteed one.',
          'Calibrate strength: eliminate choices stronger than the evidence ("always," "causes," "only").',
          'Eliminate choices the evidence does not address at all.',
          'The winner\u2019s language usually hedges: "likely," "suggests," "may," "tends to."',
          'Certainty is allowed but never required — do not demand a proof, demand the best fit.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A choice says "X causes Y" and the stimulus shows only that X and Y are correlated. What is wrong with the choice on a Most Strongly Supported question?',
        answer:
          'It is too strong. Correlation supports an association, not causation. The choice claims more than the evidence gives, so it fails strength calibration — a properly hedged version like "X may contribute to Y" would be the appropriate strength.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.8: Complete the Argument — a special inference format where the stimulus ends mid-thought and you must supply the missing conclusion.',
      },
    ],
  },
  {
    id: '2.8',
    stage: 2,
    title: 'Complete the Argument',
    estimatedMinutes: 8,
    skills: ['lr-must-be-true'],
    prerequisites: ['lr-must-be-true', 'lr-most-strongly-supported'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Some stimuli do not finish their own thought. They lay out premises, build toward a conclusion — and stop, leaving a blank for you to fill. Complete the Argument questions look different (that inviting blank), but they test the same skill you just learned: inference. The blank is almost always the conclusion the premises were driving toward. Your job is to complete the author's thought, not to improve it, extend it, or add a new one.`,
      },
      {
        kind: 'keyterm',
        term: 'Complete the Argument',
        definition:
          'An inference question in which the stimulus ends with a blank; the correct choice supplies the conclusion (occasionally a premise) that follows from the given information, adding nothing new.',
      },
      {
        kind: 'prose',
        md: `The stems are unmistakable:

- "Which of the following most logically completes the argument?"
- "The argument is most logically completed by which of the following?"

Treat the blank as a Must Be True question wearing a costume. Read the stimulus as if the blank were not there, predict the conclusion in your own words, then find the choice that says it. The single biggest error here is treating the blank as an invitation to add evidence. It is not. New information in the blank — however true or plausible — is wrong, because the argument must be completed by what *follows*, not by what *helps*.`,
      },
      {
        kind: 'retrieval',
        prompt: 'The blank in a Complete the Argument stimulus usually asks for what — and what should it never contain?',
        answer:
          'It usually asks for the conclusion the premises point to. It should never contain new information or new evidence — the completion must follow from what is already given, not add to it.',
      },
      {
        kind: 'example',
        title: 'Tiny example: finishing the thought',
        body: `"The downtown theater has sold out every Saturday show this season. The management added a Sunday matinee last month, and it sold out within days. Clearly, demand for weekend performances exceeds the current supply, so the theater should ___."

The premises establish unmet demand. The conclusion they drive toward: add more weekend performances. The correct completion says exactly that — "add another weekend performance." A choice like "raise ticket prices" adds a new idea (pricing was never discussed). A choice like "the theater is popular" merely restates a premise. Predict first, then match.`,
      },
      {
        kind: 'worked',
        title: 'Predicting the completion before looking',
        steps: [
          {
            label: 'Step 1 — Read through the blank as if it were already filled',
            body: `"Migrating songbirds navigate partly by Earth's magnetic field. In a recent experiment, researchers exposed migrating sparrows to a distorted magnetic field at dusk. The next morning, the sparrows departed in scattered directions instead of their usual uniform heading. This suggests that ___." Read the whole thing, blank included, to feel where the reasoning is headed.`,
          },
          {
            label: 'Step 2 — Predict the conclusion in your own words',
            body: `The experiment distorted the magnetic field and the birds lost their heading. The natural conclusion: the magnetic field (or the dusk exposure to it) guides their navigation — the distortion disrupted it. Predict: "magnetic cues play a role in the sparrows' navigation." Keep the prediction modest; the stimulus "suggests," so the conclusion should hedge.`,
          },
          {
            label: 'Step 3 — Match, and reject new information',
            body: `The correct choice: "disruption of magnetic cues can interfere with the sparrows' ability to orient themselves." Now the traps: "researchers should repeat the experiment at dawn" adds a recommendation never discussed. "Sparrows navigate exclusively by magnetism" drops the hedge and overclaims. "Magnetic fields affect all bird species" generalizes beyond the experiment. Each trap violates the no-new-information rule.`,
          },
          {
            label: 'Step 4 — Check the rare alternative: a missing premise',
            body: `Occasionally the blank sits mid-argument and wants a premise rather than a conclusion. The test is the same: does the choice follow from and connect the surrounding claims without adding new ideas? Here the blank is final, so it wants the conclusion — the standard case.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The blank is your chance to strengthen the argument by adding a helpful fact.',
        right:
          'A completion that adds new information — even true, even helpful — is always wrong. The blank asks what follows from the premises, not what would support them. If your candidate completion introduces any idea the stimulus never mentioned, discard it.',
      },
      {
        kind: 'checkpoint',
        prompt: `"The city's new bike lanes were painted in April. By July, bicycle commuting downtown had risen 35 percent, while car traffic on the same streets fell 12 percent. Local bike shops report record sales. It is reasonable to conclude that ___."`,
        choices: [
          'the bike lanes caused the increase in bicycle commuting.',
          'bicycle commuting downtown is likely to keep rising next year.',
          'the bike lanes encouraged some commuters to switch from driving to cycling.',
          'bike shops should open additional downtown locations.',
        ],
        correctIndex: 2,
        explanation:
          'The evidence shows correlated shifts — more cycling, less driving, more bike sales — after the lanes appeared. The modest conclusion "the lanes encouraged some commuters to switch" stays inside that evidence. The first choice claims causation ("caused"), which the correlation alone does not prove — too strong. The second predicts the future, which is new information. The fourth gives business advice, an entirely new idea. On completion questions, the winner is the conclusion the premises were already driving toward, stated with matching modesty.',
      },
      {
        kind: 'example',
        title: 'Deeper: the blank that wants a premise',
        body: `"The museum's new exhibit drew record crowds. ___. Therefore, the exhibit's popularity cannot be explained by the holiday weekend alone."

Here the blank sits before a "therefore," so it likely supplies a premise for the final conclusion. The right completion gives a reason the holiday weekend is insufficient — for example, "attendance stayed high for weeks after the holiday ended." Same rule applies: the completion must connect the surrounding claims using only given ideas. When you see "therefore" or "since" after the blank, shift your prediction from conclusion to supporting reason.`,
      },
      { kind: 'tryit', drillIds: ['d-c027', 'd-c028', 'd-c030'] },
      {
        kind: 'summary',
        points: [
          'Complete the Argument is an inference question in disguise — the blank usually wants the conclusion.',
          'Predict the completion in your own words before reading the choices.',
          'Never add new information: no new ideas, no recommendations, no predictions beyond the evidence.',
          'Match the stimulus\u2019s strength — hedged evidence gets a hedged completion.',
          'If "therefore" or "since" follows the blank, it may want a premise instead; the no-new-information rule still governs.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A completion choice is factually true and would strengthen the argument, but it introduces an idea the stimulus never mentioned. Correct or not? Why?',
        answer:
          'Not correct. The blank asks what follows from the given premises, not what would help them. Any new information — however true or helpful — violates the inference standard and must be rejected.',
      },
      {
        kind: 'next',
        text: 'Group B complete. Next, Group C begins with lesson 2.9: Identifying Flaws — the highest-frequency reasoning skill on the test, where you learn to name exactly what goes wrong between premises and conclusion.',
      },
    ],
  },
  {
    id: '2.9',
    stage: 2,
    title: 'Identifying Flaws',
    estimatedMinutes: 14,
    skills: ['lr-flaw'],
    prerequisites: ['f-flaws'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Every Flaw question hands you a broken argument and asks you to name the break. This is the most heavily tested reasoning skill in Logical Reasoning, and it repays study more than any other: the same few flaws appear again and again, wearing different topics as disguises. Your task has two halves. First, find the gap — the step where the premises stop entailing the conclusion. Second, match the abstract description of that gap. Students fail the second half by choosing answers that describe something true about the argument but not the *flaw*: a choice can accurately describe the stimulus and still be wrong if it does not name the reasoning error.`,
      },
      {
        kind: 'keyterm',
        term: 'Flaw (in the reasoning)',
        definition:
          'A defect in the logical connection between premises and conclusion — a way the evidence fails to establish the claim, even if every premise is true. Naming the flaw means describing the gap abstractly, not disputing the facts.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "The reasoning in the argument is flawed because…"
- "The argument commits which of the following flaws?"
- "The argument is most vulnerable to criticism on the grounds that…"

Your procedure: identify the conclusion, list what is offered for it, and ask "what would have to be true for this evidence to actually prove this conclusion?" — then notice the argument never established that. That missing piece is the flaw. Common families: confusing correlation with causation, unrepresentative samples, equivocation (a key word shifts meaning), part-to-whole and whole-to-part, false dilemmas, ad hominem (attacking the person instead of the claim), and appeals to popularity or authority. You met these in your foundations; now you must spot them at speed.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What is the single question that locates a flaw?',
        answer:
          'Ask: "What would have to be true for this evidence to actually prove this conclusion?" The flaw is the missing piece — the step the argument needs but never establishes.',
      },
      {
        kind: 'example',
        title: 'Tiny example: the unrepresentative sample',
        body: `"A radio host polled callers to her morning show and found that 80 percent oppose the new parking meters. Clearly, most residents oppose the meters."

The flaw: the sample (self-selected callers to one show) may not represent all residents. People with strong opinions call in; the quiet majority does not. The correct answer describes this abstractly: "generalizes from an unrepresentative sample." Notice the flaw is not that the poll number is false — for flaw questions, you grant the premises. The error is the leap from the callers to "most residents."`,
      },
      {
        kind: 'worked',
        title: 'Finding the gap: equivocation',
        steps: [
          {
            label: 'Step 1 — Identify the conclusion and the evidence',
            body: `"The library's new 'free' weekend workshops are a bargain. They cost the library almost nothing to run, and attendees pay no admission. Since the workshops are free in every sense, the city should expand them." Conclusion: expand the workshops. Evidence: they are "free" — cheap to run, no admission fee.`,
          },
          {
            label: 'Step 2 — Ask what must be true for the leap to work',
            body: `For "free in every sense" to justify expansion, the word "free" would have to mean the same thing throughout. But it shifts: "free" as in no admission (true for attendees), "free" as in cheap to run (a different sense — staff time and materials still cost something), and "free" as in without trade-offs (never established). The argument slides between meanings of one word.`,
          },
          {
            label: 'Step 3 — Name the flaw abstractly',
            body: `This is equivocation: using a key term in two or more senses as if it had one meaning. The correct choice will say something like "uses the term 'free' in different senses" or "trades on an ambiguity in a key term." It will not mention libraries — flaw answers are abstract.`,
          },
          {
            label: 'Step 4 — Reject the true-but-not-the-flaw traps',
            body: `A choice like "fails to consider that workshops require staff time" is true about the stimulus but describes a missing premise, not the reasoning error the question asks for — and it is arguably just a detail. Another trap: "the workshops might not stay popular" — speculation about the future, not a flaw in the given reasoning. Always ask of each choice: does this name the *gap between these premises and this conclusion*?`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'To find the flaw, look for a premise that is false or exaggerated.',
        right:
          'On Flaw questions you grant the premises as true — the error is never in the facts, it is in the *leap*. An argument with perfectly true premises can be deeply flawed if the conclusion does not follow. Attack the connection, not the claims.',
      },
      {
        kind: 'checkpoint',
        prompt: `"Everyone I know who switched to a standing desk says their back pain improved. Standing desks must cure back pain, so our office should replace all sitting desks immediately." What is the flaw?`,
        choices: [
          'It assumes that what is true of the people the speaker knows is true of people in general.',
          'It ignores the possibility that sitting desks are cheaper than standing desks.',
          'It fails to prove that back pain is a serious medical problem.',
          'It confuses a sufficient condition for back pain relief with a necessary one.',
        ],
        correctIndex: 0,
        explanation:
          'The evidence is anecdotal — "everyone I know" — and the conclusion leaps to a universal medical claim ("must cure") plus a policy recommendation. That is a hasty generalization from an unrepresentative sample, described abstractly by the first choice. The second choice raises cost, which is irrelevant to whether the reasoning about back pain is valid. The third demands proof of something nobody disputed. The fourth dresses up in conditional-logic vocabulary, but the argument never discusses necessary or sufficient conditions — fancy terminology that does not match the actual gap is a classic flaw trap.',
      },
      {
        kind: 'example',
        title: 'Deeper: correlation versus causation',
        body: `"Towns with more bookstores per capita have higher literacy rates. Therefore, opening more bookstores would raise literacy."

The flaw: correlation is treated as causation. Perhaps literate towns attract bookstores (reverse causation), or wealthy towns have both (a third factor). The correct flaw description: "confuses a correlation with a causal relationship" or "fails to consider alternative explanations for the correlation." This single flaw family appears constantly — whenever you see two things rising and falling together followed by "therefore X causes Y," your flaw radar should sound immediately. Lesson 2.10 will show you how to exploit this same gap to weaken an argument.`,
      },
      { kind: 'tryit', drillIds: ['d-c061', 'd-c063', 'd-c065', 'd-f147'] },
      {
        kind: 'summary',
        points: [
          'A flaw is a defect in the leap from premises to conclusion — grant the premises, attack the connection.',
          'Locate the gap by asking what would have to be true for the evidence to prove the conclusion.',
          'Match the abstract description; trap answers describe true details that are not the reasoning error.',
          'Master the recurring families: bad samples, correlation-causation, equivocation, false dilemmas, ad hominem.',
          'Fancy terminology that does not fit the actual gap is a trap — always verify the match.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'An argument\u2019s premises are all true, but its conclusion does not follow. Your study partner says "then there is no flaw." What is the error?',
        answer:
          'The error is thinking flaws live in the facts. A flaw is a defect in the logical connection — true premises can still fail to establish a conclusion. You grant the premises on Flaw questions and evaluate only whether the conclusion follows from them.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.10: Weaken. You can now name the break in an argument; next you will learn to break it yourself by adding the one fact that does the most damage.',
      },
    ],
  },
  {
    id: '2.10',
    stage: 2,
    title: 'Weaken',
    estimatedMinutes: 12,
    skills: ['lr-weaken'],
    prerequisites: ['f-assumption'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Flaw questions ask you to *name* the break. Weaken questions ask you to *widen* it: you are given a new fact to add to the argument, and you must choose the fact that most damages the conclusion. The relationship is direct — every weaken answer exploits the argument's flaw, usually by attacking an unstated assumption. Find the assumption first (what the argument needs but never says), and the correct weaken answer will be the choice that denies it or shows it false. Students who skip straight to the choices end up picking answers that sound damaging but miss the argument's actual weak point.`,
      },
      {
        kind: 'keyterm',
        term: 'Weaken',
        definition:
          'To reduce the support the premises give the conclusion — not to disprove the conclusion, but to make the argument less convincing, typically by undermining an assumption the reasoning depends on.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "Which of the following, if true, most weakens the argument?"
- "Which of the following, if true, casts the most doubt on the conclusion?"
- "Which of the following would most undermine the reasoning above?"

Note the "if true" — you accept each choice hypothetically and ask what damage it would do. Your calibration matters: weaken does not mean destroy. The correct answer often leaves the conclusion possibly true but the *argument* weaker. An answer that merely shows the conclusion could be false in some far-fetched scenario is too weak; an answer that makes the premises irrelevant or the assumption false is the winner. And crucially: the answer must engage the *reasoning*, not just contradict the conclusion's topic.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What is the relationship between a Flaw answer and a Weaken answer for the same argument?',
        answer:
          'A Flaw answer names the break in the reasoning abstractly; a Weaken answer adds a new fact that exploits that same break — usually by denying or undermining an assumption the argument depends on. Find the flaw and you have found the weaken target.',
      },
      {
        kind: 'example',
        title: 'Tiny example: attacking the assumption',
        body: `Argument: "The new express bus lane cut average commute times by 15 minutes, so the city should expand express lanes to all major routes."
Unstated assumption: what worked on this route will work on other routes.
Weaken: "The pilot route was the only one with no major intersections, which is why buses could maintain speed." This denies the assumption — the success may not transfer. Notice the weaken answer does not prove express lanes are bad; it just damages the leap from one route to all routes. That is all weakening requires.`,
      },
      {
        kind: 'worked',
        title: 'Weakening a causal argument',
        steps: [
          {
            label: 'Step 1 — Map the argument and find the assumption',
            body: `"After the town banned overnight street parking, reports of car break-ins fell 40 percent in six months. The parking ban clearly reduced car crime, so neighboring towns should adopt similar bans." Conclusion: the ban caused the drop. Assumption: nothing else changed that could explain the drop — the ban is the operative cause. (Correlation treated as causation, from lesson 2.9.)`,
          },
          {
            label: 'Step 2 — Predict the kind of fact that would hurt',
            body: `Before reading choices, predict: the winner will offer an alternative cause for the drop, or show the ban did not actually change parking behavior. Something like: "a regional task force arrested a major car-theft ring the same month the ban took effect." Predictions keep you from falling for choices that sound damaging but miss the causal link.`,
          },
          {
            label: 'Step 3 — Evaluate choices by damage to the link',
            body: `Correct: "In the same six months, a county-wide police task force dismantled the region's largest car-theft ring." This alternative cause directly competes with the ban as the explanation. Trap: "Some residents opposed the ban" — opposition does not affect whether the ban worked. Trap: "Car break-ins rose in one neighboring town" — irrelevant to this town's drop. Trap: "The ban was difficult to enforce" — difficulty is not failure; the drop still happened.`,
          },
          {
            label: 'Step 4 — Confirm the standard: damaged, not destroyed',
            body: `The task-force answer does not prove the ban did nothing — perhaps both helped. It does not need to. It makes the ban-to-drop inference substantially less convincing, which is exactly what "most weakens" asks for. If you find yourself demanding total refutation, you are holding weaken answers to a standard the test does not require.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The correct weaken answer must prove the conclusion false.',
        right:
          'Weakening lowers the argument\u2019s credibility; it does not need to demolish the conclusion. An answer that makes the premises support the conclusion *less well* — by undermining an assumption or offering a rival explanation — is enough, even if the conclusion might still be true.',
      },
      {
        kind: 'checkpoint',
        prompt: `"Students who attend review sessions score higher on final exams than those who do not. Therefore, attending review sessions improves exam performance, and the college should make them mandatory." Which most weakens the argument?`,
        choices: [
          'Some students who attend review sessions still perform poorly on finals.',
          'The students who choose to attend review sessions are generally the most motivated and best prepared.',
          'Review sessions are expensive for the college to operate.',
          'Mandatory programs are unpopular with many students.',
        ],
        correctIndex: 1,
        explanation:
          'The argument treats the correlation between attendance and scores as proof that sessions cause improvement. The second choice supplies the classic alternative cause: self-selection — motivated, well-prepared students both attend sessions and score well, so attendance may not cause the higher scores. The first choice is too weak: "some" poor performers are compatible with sessions helping on average. The third and fourth choices attack the mandatory-attendance *policy* (cost, popularity) rather than the *reasoning* that sessions improve performance — a frequent weaken trap is an answer that quarrels with the proposal instead of the argument for it.',
      },
      {
        kind: 'example',
        title: 'Deeper: weakening by breaking a comparison',
        body: `"Our competitor's delivery drones complete routes 20 percent faster than our trucks, so switching to drones would speed up our deliveries."

The reasoning assumes the competitor's conditions match ours. Weaken: "The competitor operates only in flat suburban areas, while our routes cover steep, windy hills where drones cannot maintain speed." This attacks the comparison the argument depends on. Whenever an argument leans on "they did X, so we should too," look for the relevant difference — the disanalogy you learned to spot in lesson 2.3 is now a weapon.`,
      },
      { kind: 'tryit', drillIds: ['d-c062', 'd-c064', 'd-c066'] },
      {
        kind: 'summary',
        points: [
          'Weaken answers add a fact that damages the premises-to-conclusion link, usually by attacking an assumption.',
          'Find the flaw/assumption first, then predict the kind of fact that would hurt before reading choices.',
          'The standard is "less convincing," not "disproven" — partial damage wins.',
          'Beware answers that quarrel with the proposal or topic instead of the reasoning.',
          'Classic weaken moves: alternative cause, broken analogy, unrepresentative sample exposed.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'An answer choice proves the argument\u2019s conclusion is false. Is it automatically the best weaken answer? Explain.',
        answer:
          'Not automatically. Weaken asks which choice most damages the reasoning, and the best answer is the one that most undermines the support link. A choice that disproves the conclusion certainly weakens, but you must still compare — the test asks for "most weakens," so evaluate every choice against the argument\u2019s actual assumption rather than grabbing the first damaging-sounding one.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.11: Strengthen — the mirror image. You have learned to attack the assumption; now you will learn to defend it.',
      },
    ],
  },
  {
    id: '2.11',
    stage: 2,
    title: 'Strengthen',
    estimatedMinutes: 12,
    skills: ['lr-strengthen'],
    prerequisites: ['f-assumption'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Weaken and Strengthen are mirror images: both target the assumption, from opposite sides. Where a weaken answer denies the assumption or offers a rival explanation, a strengthen answer *supports* the assumption or *rules out* the rival explanation. The same preparation applies — map the argument, find the gap, predict the fix — but now you are the defense attorney. A common disappointment: students expect the correct answer to prove the conclusion. It will not. Strengthen means *more convincing*, not *certain*. The winner typically closes one hole, not every hole.`,
      },
      {
        kind: 'keyterm',
        term: 'Strengthen',
        definition:
          'To increase the support the premises give the conclusion — not to prove the conclusion, but to make the argument more convincing, typically by supporting an assumption or eliminating an alternative explanation.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "Which of the following, if true, most strengthens the argument?"
- "Which of the following, if true, provides the most support for the conclusion?"

Again the "if true" — accept each choice and measure the help. The classic strengthen moves: rule out an alternative cause, show the sample was representative, confirm the analogy's relevant similarity, or supply a missing link the argument needs. Warning: do not confuse Strengthen with Sufficient Assumption (lesson 2.14). A strengthen answer *helps* the argument; a sufficient-assumption answer *guarantees* the conclusion. If a choice would make the conclusion follow with certainty, it is too strong for a Strengthen question — and that over-strength is itself a recognizable trap.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What is the difference between strengthening an argument and proving its conclusion?',
        answer:
          'Strengthening makes the argument more convincing — it closes a hole or rules out a rival explanation — but the conclusion still does not follow with certainty. Proving would require the premises to guarantee the conclusion; strengthen answers only add support, they do not complete a proof.',
      },
      {
        kind: 'example',
        title: 'Tiny example: ruling out the rival',
        body: `Argument: "Towns with more bookstores per capita have higher literacy rates. Therefore, opening more bookstores would raise literacy." (The correlation-causation flaw from lesson 2.9.)
Strengthen: "The literacy advantage remains even after accounting for income, education funding, and demographics." This rules out the leading alternative explanations — the third factors — leaving the bookstore explanation stronger. It does not prove bookstores cause literacy. It does not need to. Removing rivals is the highest-yield strengthen move on the test.`,
      },
      {
        kind: 'worked',
        title: 'Strengthening by confirming the assumption',
        steps: [
          {
            label: 'Step 1 — Map the argument and name the gap',
            body: `"The city repaired the potholes on Maple Avenue last spring. Since then, traffic accidents on Maple have fallen 25 percent. The repairs clearly made the street safer." Gap: the argument assumes nothing else changed on Maple Avenue that could explain the drop — no new traffic lights, no reduced speed limit, no change in traffic volume.`,
          },
          {
            label: 'Step 2 — Predict the helpful fact',
            body: `The winner will either confirm the assumption ("no other safety changes were made on Maple Avenue") or knock out a specific rival ("traffic volume on Maple Avenue actually increased slightly"). Predict both forms; the test uses them interchangeably.`,
          },
          {
            label: 'Step 3 — Test each choice against the gap',
            body: `Correct: "No other changes to traffic control or road conditions were made on Maple Avenue during that period." This directly confirms the assumption. Trap: "Potholes damage car suspensions" — true and related, but it does not connect potholes to *accidents*, so it does not touch the gap. Trap: "Residents support the repairs" — popularity is not evidence of safety. Trap: "Accidents fell on Elm Avenue too, where no repairs were made" — this *weakens* by suggesting a broader trend; direction matters, so read carefully.`,
          },
          {
            label: 'Step 4 — Verify the strength is appropriate',
            body: `Does the winner prove the repairs caused the safety gain? No — some unmeasured factor could still be at work. It merely makes the causal claim more convincing by removing the obvious rivals. That partial help is exactly what "most strengthens" asks for. If a choice had guaranteed the conclusion, it would belong to a Sufficient Assumption question instead.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'A strengthen answer that only rules out one alternative is too weak to be correct.',
        right:
          'Ruling out even one serious rival explanation is the classic winning strengthen move. Strengthen answers are partial by design — they add support, not proof. Do not hold them to a certainty standard the question never promised.',
      },
      {
        kind: 'checkpoint',
        prompt: `"A recent study found that employees who use standing desks report fewer back problems than those who use sitting desks. The researchers conclude that standing desks reduce back problems." Which most strengthens the researchers' conclusion?`,
        choices: [
          'Standing desks are becoming increasingly popular in modern offices.',
          'Some employees prefer sitting desks for tasks requiring fine motor control.',
          'The two groups of employees were similar in age, fitness, and prior back problems.',
          'Back problems are a leading cause of workplace absenteeism.',
        ],
        correctIndex: 2,
        explanation:
          'The study\u2019s gap is self-selection: perhaps healthier employees choose standing desks. The third choice rules out that rival by establishing the groups were comparable — the textbook strengthen move of eliminating an alternative explanation. The first choice cites popularity, which says nothing about back problems. The second is about task preference, irrelevant to the health claim. The fourth explains why back problems matter but does nothing to connect standing desks to fewer of them — importance is not evidence.',
      },
      {
        kind: 'example',
        title: 'Deeper: strengthen versus sufficient assumption',
        body: `Argument: "The new fertilizer increased tomato yields on test plots, so it will increase yields on real farms."
A strengthen answer: "The test plots' soil and weather matched typical farm conditions." (Helps — the analogy is safer.)
A sufficient-assumption answer: "Anything that increases yields on test plots necessarily increases yields on real farms." (Guarantees — the conclusion follows with certainty.)
Feel the difference in force. Strengthen *supports*; sufficient assumption *proves*. Lesson 2.14 will train the proof standard, and lesson 2.15 will drill the distinction until it is automatic.`,
      },
      { kind: 'tryit', drillIds: ['d-c011', 'd-c013', 'd-c015'] },
      {
        kind: 'summary',
        points: [
          'Strengthen answers add support — typically by confirming an assumption or ruling out a rival explanation.',
          'Map the argument and predict the helpful fact before reading the choices.',
          'The standard is "more convincing," not "proven" — partial help wins.',
          'Direction matters: a choice that helps a rival explanation weakens, however relevant it sounds.',
          'Do not confuse with Sufficient Assumption: strengthen helps, sufficient assumption guarantees.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Name three classic strengthen moves.',
        answer:
          'One: rule out an alternative cause or third factor. Two: confirm a key assumption the argument depends on. Three: show a sample was representative or an analogy\u2019s relevant similarity holds — in general, remove the rival explanations that threaten the link.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.12: Evaluate the Argument — where Flaw, Weaken, and Strengthen converge. You will learn the question type that asks not for new facts, but for the one question whose answer matters most.',
      },
    ],
  },
  {
    id: '2.12',
    stage: 2,
    title: 'Evaluate the Argument',
    estimatedMinutes: 12,
    skills: ['lr-evaluate'],
    prerequisites: ['f-assumption', 'lr-weaken', 'lr-strengthen'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Flaw names the break. Weaken widens it. Strengthen patches it. Evaluate asks the question that *decides* it. Instead of handing you a new fact, Evaluate questions hand you a *question* — and ask which question's answer would matter most to judging the argument. This is the most strategic question type in Group C, because it forces you to think like the test-maker: every argument has a load-bearing assumption, and the most useful question is always the one that tests it. Master this type and the other three become easier, because you start seeing every argument in terms of "what would I need to know?"`,
      },
      {
        kind: 'keyterm',
        term: 'Evaluate the Argument',
        definition:
          'A question type that asks which question\u2019s answer would be most useful in assessing the argument — the correct choice names the question that probes the argument\u2019s key assumption, such that either a "yes" or a "no" answer would significantly affect the conclusion\u2019s support.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "The answer to which of the following questions would be most useful in evaluating the argument?"
- "Which of the following would it be most important to determine in order to evaluate the reasoning?"
- "In order to evaluate the argument, it would be most useful to know whether…"

The two-direction test is your instrument: for each candidate question, imagine the answer is yes, then imagine it is no. If *both* answers would change how convincing the argument is — yes strengthens, no weakens, or vice versa — you have found the load-bearing question. If only one direction matters, or neither does, keep looking. This is what makes Evaluate the meeting point of the whole family: the right question is the one a Weaken answer and a Strengthen answer would both be fighting over.`,
      },
      {
        kind: 'retrieval',
        prompt: 'State the two-direction test for Evaluate questions.',
        answer:
          'For each candidate question, imagine the answer is yes and then imagine it is no. The correct question is the one where both answers would significantly affect the argument\u2019s strength — one direction strengthens it and the other weakens it.',
      },
      {
        kind: 'example',
        title: 'Tiny example: the question that decides',
        body: `Argument: "The new express bus lane cut average commute times by 15 minutes, so the city should expand express lanes to all major routes."
Candidate evaluate question: "Was the pilot route representative of the city's other major routes, or was it unusually free of intersections?"
Apply the two-direction test. If yes, representative — the argument is stronger (the success should transfer). If no, unusually clear — the argument is weaker (the success may not transfer). Both directions matter, so this is the load-bearing question. A question like "Do residents like express lanes?" fails the test: the answer affects popularity, not whether expansion would cut commute times.`,
      },
      {
        kind: 'worked',
        title: 'The four types, one argument',
        steps: [
          {
            label: 'Step 1 — Map the shared target',
            body: `Argument: "After the town banned overnight street parking, car break-ins fell 40 percent in six months, so the ban reduced car crime." The gap, from lessons 2.9–2.11: the argument assumes no other cause explains the drop. Flaw names it ("treats correlation as causation"). Weaken exploits it ("a theft ring was arrested the same month"). Strengthen defends it ("no other anti-crime measures were introduced"). Evaluate asks the question hovering over all three.`,
          },
          {
            label: 'Step 2 — Generate the load-bearing question yourself',
            body: `Before reading choices, ask: what would I need to know? "Did anything else happen in those six months that could explain the drop in break-ins?" That question is the Evaluate version of the assumption. Notice it is neutral — it does not assert the theft-ring story or deny it. Evaluate choices are questions, not claims; that neutrality is their signature.`,
          },
          {
            label: 'Step 3 — Run the two-direction test on the candidates',
            body: `Winner: "Were any other crime-reduction efforts introduced in the town during the same six-month period?" Yes → the ban's role is doubtful (weakens). No → the ban stands as the best explanation (strengthens). Both directions bite. Reject: "Do residents support the parking ban?" — support levels do not touch the causal claim. Reject: "Have break-ins fallen in neighboring towns?" — interesting, but it does not test *this* ban's effect here.`,
          },
          {
            label: 'Step 4 — See the family resemblance',
            body: `The correct Evaluate question is always the interrogative form of the argument's key assumption. Train yourself to convert: assumption ("nothing else changed") → question ("did anything else change?"). Once this conversion is automatic, you can answer Evaluate questions by first answering a Necessary Assumption question in your head — which is exactly what lesson 2.13 will teach.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The correct Evaluate answer is the question whose answer would prove the conclusion true.',
        right:
          'Proof is not required — usefulness is. The right question is the one whose answer *matters*, in either direction. A question that could only confirm the argument (or only damage it) is less useful than one that decides between the two. Both "yes" and "no" must move the needle.',
      },
      {
        kind: 'checkpoint',
        prompt: `"Dr. Alvarez's clinic prescribed the new migraine drug to 200 patients; 70 percent reported fewer headaches within a month. Dr. Alvarez concludes the drug is effective." The answer to which question would be most useful in evaluating this reasoning?`,
        choices: [
          'Do other clinics also prescribe the new migraine drug?',
          'Is the new migraine drug more expensive than older treatments?',
          'How long has Dr. Alvarez been practicing medicine?',
          'Did the patients make any other changes, such as reducing stress or changing their diets, during the month?',
        ],
        correctIndex: 3,
        explanation:
          'The argument assumes the drug — not something else — caused the improvement. The fourth question probes exactly that: if patients changed their diets or stress levels, the drug gets less credit (weakens); if nothing else changed, the drug looks more responsible (strengthens). Both directions matter. The first choice is about other clinics, which does not test this clinic\u2019s causal claim. The second is about cost, irrelevant to effectiveness. The third asks about the doctor\u2019s experience rather than the reasoning — a question about credentials does not evaluate whether these results support this conclusion.',
      },
      {
        kind: 'example',
        title: 'Deeper: the family map',
        body: `Memorize this map of Group C — all four types orbit the same gap between premises and conclusion:

- **Flaw** asks: what is wrong with the route? (Names the gap.)
- **Weaken** asks: which new fact damages the route? (Attacks the gap.)
- **Strengthen** asks: which new fact repairs the route? (Defends the gap.)
- **Evaluate** asks: which question tests the route? (Probes the gap — both directions.)

When you are stuck on any one of the four, translate it into one of the others. A hard Evaluate question becomes easy when you first ask "what would weaken this?" A hard Weaken question becomes easy when you first name the flaw. They are four doors into the same room.`,
      },
      { kind: 'tryit', drillIds: ['d-c067', 'd-c069', 'd-f148'] },
      {
        kind: 'summary',
        points: [
          'Evaluate asks for the question whose answer would most help judge the argument — the interrogative form of its key assumption.',
          'Apply the two-direction test: both "yes" and "no" must significantly affect the argument\u2019s strength.',
          'The correct choice is neutral — a question, not a claim smuggled in as one.',
          'Group C is one family: Flaw names the gap, Weaken attacks it, Strengthen defends it, Evaluate probes it.',
          'When stuck, translate: turn a hard Evaluate into "what would weaken this?" and solve that instead.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Explain how Flaw, Weaken, Strengthen, and Evaluate relate to each other.',
        answer:
          'All four target the same gap between premises and conclusion. Flaw names the gap abstractly, Weaken adds a fact that attacks it, Strengthen adds a fact that defends it, and Evaluate asks the question whose answer — in either direction — would decide how serious the gap is.',
      },
      {
        kind: 'next',
        text: 'Group C complete. Next, Group D begins with lesson 2.13: Necessary Assumption — where you will learn the negation test, one of the most reliable confirmation tools in Logical Reasoning, along with its limits.',
      },
    ],
  },
  {
    id: '2.13',
    stage: 2,
    title: 'Necessary Assumption',
    estimatedMinutes: 14,
    skills: ['lr-necessary-assumption'],
    prerequisites: ['f-assumption', 'f-translate'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Every argument you have studied leans on something it never says. Those silent load-bearing claims are assumptions, and Necessary Assumption questions ask you to find the one the argument *cannot live without*. This question type appears constantly and rewards a powerful confirmation tool — the negation test — that turns a shaky judgment call into a concrete experiment: negate the answer choice, and if the argument collapses, you have strong evidence you found the necessary assumption. Learn this tool deeply now; it is the closest thing Logical Reasoning has to a skeleton key — but like any tool, it has limits, which this lesson states explicitly.`,
      },
      {
        kind: 'keyterm',
        term: 'Necessary assumption',
        definition:
          'A claim that must be true for the argument\u2019s conclusion to follow from its premises — the argument depends on it. If the assumption is false, the reasoning falls apart. (Contrast with a sufficient assumption, which would guarantee the conclusion but may not be required.)',
      },
      {
        kind: 'prose',
        md: `The stems:

- "The argument depends on assuming which of the following?"
- "The argument requires the assumption that…"
- "Which of the following is an assumption required by the argument?"
- "The conclusion follows only if which of the following is assumed?" / "presupposes"

The negation test: take a candidate answer, state its opposite, and ask whether the argument can survive. If negating the choice destroys the argument, the choice is necessary — it is the load-bearing beam. If the argument survives the negation, the choice was decorative, not structural. Two warnings: negate carefully (the opposite of "all" is "not all," not "none"; the opposite of "some" is "none"), and remember that a necessary assumption can be modest — it only needs to be required, not strong.`,
      },
      {
        kind: 'retrieval',
        prompt: 'State the negation test in one sentence, including how to negate "all" and "some."',
        answer:
          'Negate the candidate choice and see whether the argument collapses: if it does, the choice is a necessary assumption. The negation of "all" is "not all" (not "none"), and the negation of "some" is "none."',
      },
      {
        kind: 'example',
        title: 'Tiny example: the negation test in action',
        body: `Argument: "The new express bus lane cut commute times on Route 9, so the city should expand express lanes to all major routes."
Candidate assumption: "Route 9 is representative of the city's other major routes."
Negate it: "Route 9 is NOT representative of the other routes." Can the argument survive? No — if Route 9 is unusual, its success says nothing about other routes, and the recommendation collapses. The assumption is necessary. Contrast with a non-necessary candidate: "Express lanes are popular with commuters." Negate: "Express lanes are not popular." The argument — about commute times — survives untouched. Popularity was never load-bearing.`,
      },
      {
        kind: 'worked',
        title: 'Applying the negation test step by step',
        steps: [
          {
            label: 'Step 1 — Map the argument and spot the gap',
            body: `"The Harborview night market drew 40,000 visitors last season. Vendors report that market days are now their most profitable of the week. The market has clearly been good for the district, so the city should expand it to two nights a week." Gap: the move from "good so far" to "expand it." The argument needs the success to carry over — that a second night will resemble the first.`,
          },
          {
            label: 'Step 2 — Test the leading candidate by negation',
            body: `Candidate: "Adding a second market night will not substantially reduce per-night attendance." Negate: "Adding a second night WILL substantially reduce per-night attendance." Now the argument collapses — if the crowds split, vendors' profits and the "success" story fall apart, and the case for expansion evaporates. The candidate is necessary.`,
          },
          {
            label: 'Step 3 — Test a tempting distractor by negation',
            body: `Candidate: "No other city event draws crowds as large as the night market." Negate: "Some other city event draws larger crowds." Does the argument collapse? Not at all — the market can be good for the district and worth expanding even if some other event is bigger. The choice compares the market to other events, which the argument never does. Survives negation → not necessary → eliminate.`,
          },
          {
            label: 'Step 4 — Confirm the winner\u2019s modesty',
            body: `Necessary assumptions are often unglamorous: "the second night will resemble the first," "nothing relevant changed," "the sample was not rigged." Do not reject a choice for being boring — required claims are frequently boring. And do not pick a choice merely because it strengthens; lesson 2.11 taught you that strengthening is not the same as being required.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'An assumption is a claim the author believes but forgot to mention.',
        right:
          'An assumption is a claim the *reasoning* needs, whether or not the author believes it or could have mentioned it. The test is structural, not psychological: negate the candidate precisely and watch what happens to the argument. Psychology is irrelevant — but so is careless negation: with ambiguous or conditional choices, an imprecise "opposite" can mislead, so state the negation carefully before judging the collapse.',
      },
      {
        kind: 'checkpoint',
        prompt: `"The county's recycling rate has stalled at 30 percent for three years. Neighboring counties that introduced curbside composting all saw rates climb above 45 percent. Our county should introduce curbside composting." Which is a necessary assumption?`,
        choices: [
          'Curbside composting is the most effective way to raise recycling rates.',
          'The neighboring counties are similar to our county in ways relevant to recycling.',
          'Recycling rates above 45 percent are achievable in every county.',
          'Residents of our county support curbside composting.',
        ],
        correctIndex: 1,
        explanation:
          'Negate the second choice: the neighboring counties are NOT similar in relevant ways. The argument — which infers "it worked there, so it will work here" — collapses, because the analogy\u2019s force depended on comparability. That collapse proves necessity. The first choice is too strong: the argument needs composting to work, not to be the *most* effective method — negate it ("some other method is more effective") and the argument survives. The third overclaims about every county; the argument only concerns ours. The fourth is about popularity, which the reasoning never leans on.',
      },
      {
        kind: 'example',
        title: 'Deeper: defender versus supporter assumptions',
        body: `Necessary assumptions come in two flavors. **Supporter** assumptions build the bridge: "the second market night will resemble the first." **Defender** assumptions guard the bridge: "no road construction will block access to the market next season." Defenders are easy to miss because they rule things out rather than asserting something positive — but the negation test catches both equally. When negating, a defender becomes "road construction WILL block access," and the argument collapses just the same. If you struggle to find the assumption, ask: "what could go wrong that the author is silently assuming will not?"`,
      },
      {
        kind: 'misconception',
        wrong: 'The negation test is mechanical and infallible — negate the choice, check for collapse, and you can never go wrong.',
        right:
          'The negation test is the best *confirmation* tool in Logical Reasoning, not a substitute for finding the gap first. It has real limits: negating a complex or conditional statement can be ambiguous (the "opposite" is unclear); an argument with redundant support can survive a negation even when the choice is still required for the *particular inference* being made; and applying the test to all five choices is slow. Use it to verify your leading candidate and kill your strongest rival — not as a five-choice ritual. First identify the gap in your own words, then negate to confirm.',
      },
      { kind: 'tryit', drillIds: ['d-c071', 'd-c073', 'd-c075', 'd-f079'] },
      {
        kind: 'summary',
        points: [
          'A necessary assumption is a claim the argument cannot live without — if it is false, the reasoning collapses.',
          'The negation test: negate the choice; collapse means necessary, survival means eliminate.',
          'Negate precisely: "all" becomes "not all," "some" becomes "none."',
          'Necessary assumptions are often modest and boring — modesty is not a weakness here.',
          'Watch for defender assumptions, which silently rule out threats rather than asserting positive claims.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'You negate a candidate assumption and the argument is completely unaffected. What do you conclude, and what do you do?',
        answer:
          'The candidate is almost certainly not a necessary assumption — the argument does not depend on it. Eliminate the choice and move on. A negation that collapses the argument is strong confirming evidence of necessity, but remember the test has limits: ambiguous negations and redundant-support arguments can mislead, so confirm with a second read of the gap.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.14: Sufficient Assumption — the mirror image. Where necessary assumptions are about what the argument cannot live without, sufficient assumptions are about what would make the conclusion airtight.',
      },
    ],
  },
  {
    id: '2.14',
    stage: 2,
    title: 'Sufficient Assumption',
    estimatedMinutes: 14,
    skills: ['lr-sufficient-assumption'],
    prerequisites: ['f-assumption', 'f-conditional'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `A necessary assumption is what the argument *needs*. A sufficient assumption is what would *complete* it — the missing puzzle piece that, once added, makes the conclusion follow with absolute certainty. Think of the argument as a proof with one line erased. Your job is to find the erased line. This is the most mechanical question type in Logical Reasoning: you are not judging persuasiveness or weighing evidence, you are closing a logical gap so tightly that no daylight remains. Students who try to "feel" the answer struggle; students who treat it as gap-closure arithmetic excel.`,
      },
      {
        kind: 'keyterm',
        term: 'Sufficient assumption',
        definition:
          'A claim that, if added to the premises, would make the conclusion follow logically with certainty. It need not be true and need not be required by the argument — it only needs to close the gap completely.',
      },
      {
        kind: 'prose',
        md: `The stems sound like proof:

- "The conclusion follows logically if which of the following is assumed?"
- "Which of the following, if assumed, would allow the conclusion to be properly drawn?"
- "The argument\u2019s conclusion can be properly inferred if which of the following is true?"

Your method is gap-closure. First, write the argument's skeleton: premises on one side, conclusion on the other. Second, name exactly what is missing — usually a conditional link ("if P then C") that connects the evidence to the claim. Third, find the choice that supplies that link. The correct answer is almost always a conditional statement, and it is often strikingly strong — "any," "all," "whenever." Strength that would be suspicious on a Strengthen question is exactly what you want here, because only a strong link closes the gap completely.`,
      },
      {
        kind: 'retrieval',
        prompt: 'In one sentence, what does a sufficient assumption do that a strengthen answer does not?',
        answer:
          'A sufficient assumption closes the logical gap completely, so the conclusion follows with certainty; a strengthen answer merely adds support and leaves the conclusion still short of proven.',
      },
      {
        kind: 'example',
        title: 'Tiny example: closing the gap',
        body: `Argument: "The new fertilizer increased tomato yields on test plots. Therefore, it will increase yields on real farms."
The gap: what connects test-plot results to real-farm results? The missing link: "Anything that increases yields on test plots increases yields on real farms."
Add that sentence, and the conclusion follows with certainty: the fertilizer increased test-plot yields → (missing link) → it will increase real-farm yields. That is the sufficient assumption. Notice how strong it is — "anything," no exceptions. That strength is the point: only an airtight link produces an airtight conclusion.`,
      },
      {
        kind: 'worked',
        title: 'Gap-closure with a conditional chain',
        steps: [
          {
            label: 'Step 1 — Skeletonize the argument',
            body: `"Only licensed electricians may perform the theater's rewiring. Jamal performed the theater's rewiring. Therefore, Jamal is licensed." Premises: rewiring requires a license; Jamal did the rewiring. Conclusion: Jamal is licensed. Lay them side by side and look at what does not yet connect.`,
          },
          {
            label: 'Step 2 — Name the missing link precisely',
            body: `We know: if someone performed the rewiring, that person was permitted to do so — no wait, we do not know that. That is exactly the gap. What we need: "Anyone who performed the theater's rewiring is licensed" — or equivalently, "the licensing rule was followed." Without that link, Jamal could have done the work illegally, and the conclusion would not follow.`,
          },
          {
            label: 'Step 3 — Find the choice that supplies the link',
            body: `Correct: "Everyone who performed the theater's rewiring did so in compliance with the licensing requirement." Add it: Jamal performed the rewiring → he complied with the requirement → only licensed electricians may do it → Jamal is licensed. Airtight. Trap: "Jamal is a skilled electrician" — skill is not licensure; the gap is about the license, so this misses. Trap: "Most rewiring work is performed by licensed electricians" — "most" leaves daylight; the conclusion claims certainty about Jamal, so "most" cannot close it.`,
          },
          {
            label: 'Step 4 — Verify airtightness',
            body: `Re-read the argument with the winner inserted and try to break it: is there any way the premises plus the new assumption are true and the conclusion false? No — the chain is complete. That "cannot break it" feeling is your confirmation. If you can still imagine a counterexample, the gap is not closed and the choice is wrong.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The sufficient assumption must be something the author actually believes or something realistic.',
        right:
          'Realism is irrelevant. The sufficient assumption is judged by one criterion only: does it make the conclusion follow with certainty? It can be wildly strong, even implausible — "anything that works on test plots works on real farms" — because its job is logical closure, not believable advice.',
      },
      {
        kind: 'checkpoint',
        prompt: `"The city's new bike-share stations were installed in March. Since then, downtown bike commuting is up 30 percent. The bike-share program deserves the credit." Which assumption would make the conclusion follow logically?`,
        choices: [
          'No other factor contributed to the increase in downtown bike commuting.',
          'Bike-share programs are popular with downtown commuters.',
          'The increase in bike commuting is larger than in previous years.',
          'Most of the new bike commuters use the bike-share stations regularly.',
        ],
        correctIndex: 0,
        explanation:
          'The gap is causal: the argument leaps from "bike-share arrived, then commuting rose" to "bike-share deserves the credit." The first choice closes it airtight — if literally no other factor contributed, the program must deserve the credit. The second is about popularity, which does not establish causation. The third compares years but leaves rival causes open. The fourth is tempting but uses "most," which leaves daylight: if only most (not all) of the increase comes from station users, the conclusion that the program deserves the credit does not follow with certainty. On sufficient assumption, "most" is a hole; only airtight closes.',
      },
      {
        kind: 'example',
        title: 'Deeper: spotting the conditional shape',
        body: `Sufficient-assumption answers are conditionals in disguise. "No other factor contributed" means: if bike commuting rose, then the program caused it. "Anyone who did the rewiring is licensed" means: if someone did the rewiring, then they are licensed. Train yourself to translate choices into if-then form — the correct answer's "if" will match the premises and its "then" will match the conclusion. When you can see the choice as the exact missing conditional, these questions become the most predictable points on the test.`,
      },
      { kind: 'tryit', drillIds: ['d-c012', 'd-c014', 'd-c016', 'd-f067'] },
      {
        kind: 'summary',
        points: [
          'A sufficient assumption is the missing piece that makes the conclusion follow with certainty.',
          'Method: skeletonize the argument, name the exact missing link, find the choice that supplies it.',
          'The correct answer is usually a strong conditional — "any," "all," "whenever," "no."',
          'Verify by trying to break the completed argument; if a counterexample survives, the gap is not closed.',
          'Realism does not matter — only airtight logical closure.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why is "most" almost never the right quantifier in a sufficient-assumption answer?',
        answer:
          'Because "most" leaves logical daylight — it allows exceptions, and any surviving exception means the conclusion does not follow with certainty. Sufficient assumption demands airtight closure, which requires exceptionless links like "all," "any," or "no."',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.15: Necessary versus Sufficient — a dedicated drill session on the distinction students confuse most, until the two question types can never be mistaken for each other again.',
      },
    ],
  },
  {
    id: '2.15',
    stage: 2,
    title: 'Necessary vs Sufficient: The Distinction',
    estimatedMinutes: 12,
    skills: ['lr-nec-vs-suff'],
    prerequisites: ['lr-necessary-assumption', 'lr-sufficient-assumption'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `This is the confusion that costs the most points in Logical Reasoning. Necessary and sufficient assumptions sound alike, appear in similar stems, and both involve unstated claims — but they ask opposite questions, demand opposite tools, and reward opposite answer shapes. Necessary asks: what must be true for the argument to survive? Sufficient asks: what would make the conclusion airtight? Students who blur them apply the negation test to sufficient-assumption choices (wrong tool) or pick modest, boring answers on sufficient questions (wrong shape). This lesson exists to make the two unmistakable — permanently.`,
      },
      {
        kind: 'keyterm',
        term: 'Necessary vs sufficient (assumptions)',
        definition:
          'Necessary: the argument depends on it — deny it and the reasoning collapses. Sufficient: it completes the argument — add it and the conclusion follows with certainty. A claim can be one, both, or neither.',
      },
      {
        kind: 'prose',
        md: `Put the two side by side and the contrast sharpens everything:

**Necessary assumption.** Stems: "depends on assuming," "requires," "presupposes." Tool: the negation test. Answer shape: often modest, boring, defensive — "nothing else changed," "the sample was representative." Test: negate it; collapse proves necessity.

**Sufficient assumption.** Stems: "the conclusion follows logically if," "would allow the conclusion to be properly drawn." Tool: gap-closure — insert the choice and check airtightness. Answer shape: strong, sweeping, conditional — "any," "all," "whenever." Test: can you still imagine a counterexample? If yes, the gap is open.

The same sentence can be both: "Only licensed electricians did the rewiring" is necessary for (the argument needs it) and sufficient for (it guarantees) the Jamal conclusion. But usually the test separates them: the necessary answer is the modest beam, the sufficient answer is the sweeping roof.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Which tool belongs to which type: negation test versus gap-closure?',
        answer:
          'The negation test belongs to necessary assumption: negate the choice, and collapse proves the argument depended on it. Gap-closure belongs to sufficient assumption: insert the choice and verify the conclusion now follows with certainty, no counterexample possible.',
      },
      {
        kind: 'example',
        title: 'Tiny example: one argument, both questions',
        body: `Argument: "The library extended its hours last fall. Since then, evening visits are up 50 percent. The longer hours caused the increase."

Necessary-assumption version: "The argument depends on assuming which of the following?" Winner (modest): "No other change at the library accounts for the rise in evening visits." Negate it — some other change does account for the rise — and the causal claim collapses.

Sufficient-assumption version: "The conclusion follows logically if which of the following is assumed?" Winner (sweeping): "Whenever a library extends its hours and visits then rise, the extension caused the rise." Insert it — the conclusion is now airtight.

Notice: the necessary winner would fail as a sufficient answer (other exceptions could survive), and the sufficient winner would fail the necessity test's modesty expectations. Different jobs, different shapes.`,
      },
      {
        kind: 'worked',
        title: 'Classifying stems and matching tools',
        steps: [
          {
            label: 'Step 1 — Read the stem first, classify immediately',
            body: `Stem A: "Which of the following is an assumption the argument requires?" → necessary. Stem B: "Which of the following, if assumed, enables the conclusion to be properly drawn?" → sufficient. Classify before reading the stimulus. Your classification dictates your tool, and the tool dictates what the right answer looks like. Students who skip this step mix tools and miss.`,
          },
          {
            label: 'Step 2 — Apply the right tool to the same argument',
            body: `Argument: "The new dam will provide enough water for the valley's farms for decades, because the reservoir is the largest ever built in the region." For Stem A (necessary), negate candidates: "The reservoir's size guarantees adequate supply" — wait, that is too strong to be required. The necessary version is modest: "A larger reservoir will actually deliver more usable water to the farms" (negate: it will not — collapse). For Stem B (sufficient), go sweeping: "The largest reservoir ever built in a region always provides adequate water for decades" (insert: airtight).`,
          },
          {
            label: 'Step 3 — Cross-check: run the wrong tool to feel the difference',
            body: `Apply the negation test to the sufficient winner ("the largest reservoir always provides…"): negate → "the largest reservoir does not always provide adequate water." Does our argument collapse? Not entirely — the dam might still suffice; "always" was stronger than needed. So the sufficient winner is NOT necessary — and that is fine, even expected. Now gap-close the necessary winner ("a larger reservoir will deliver more usable water"): insert it — does the conclusion follow with certainty? No; usable water might still fall short of "enough for decades." Not sufficient — also fine. Each tool validates only its own type.`,
          },
          {
            label: 'Step 4 — Lock in the habit',
            body: `Every assumption question from now on: stem → classify → tool → shape. Necessary: negate, expect modest. Sufficient: close the gap, expect sweeping. If you catch yourself negating on a "follows logically if" stem, stop — you have picked up the wrong instrument.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'A sufficient assumption is just a stronger version of a necessary assumption, so the negation test works for both.',
        right:
          'They are different logical jobs, not different strengths of one job. The negation test identifies dependence (necessary); gap-closure identifies completeness (sufficient). A sufficient assumption is often NOT necessary — the argument might survive its negation via some other route — so negating it proves nothing about its sufficiency.',
      },
      {
        kind: 'checkpoint',
        prompt: `Argument: "The city's new composting program diverted 30 percent of waste from landfills in its first year. Similar programs in other cities kept improving after year one. Our program will keep improving too." Stem: "The argument depends on assuming which of the following?" Which choice fits this stem?`,
        choices: [
          'Whenever a composting program improves in year one, it keeps improving thereafter.',
          'Our city\u2019s program resembles the other cities\u2019 programs in the ways relevant to continued improvement.',
          'Composting programs are the best way for cities to reduce landfill waste.',
          'No composting program has ever gotten worse after its first year.',
        ],
        correctIndex: 1,
        explanation:
          'The stem says "depends on assuming" — this is a necessary-assumption question, so reach for the negation test and expect a modest answer. Negate the second choice: our program does NOT resemble the others in relevant ways. The inference from "they kept improving" to "we will too" collapses — necessity proven. The first choice is the sweeping conditional a *sufficient*-assumption stem would want; here it is too strong to be required (negate it and the argument might still survive via the similarity). The third claims "the best way," which the argument never needs. The fourth is about programs never worsening — irrelevant to whether this one will improve.',
      },
      {
        kind: 'example',
        title: 'Deeper: the stem decoder',
        body: `Train instant classification on these stem fragments:

- "depends on" / "requires" / "presupposes" / "must assume" → **necessary** → negate.
- "follows logically if" / "properly drawn if" / "enables the conclusion" → **sufficient** → close the gap.
- "most strengthens" / "most supports" → **neither** — that is Strengthen (lesson 2.11), which helps without requiring or guaranteeing.

The third line matters because Strengthen stems are the most common misclassification: students treat "strengthens" as sufficient-assumption and hunt for sweeping conditionals, or treat it as necessary and start negating. Three types, three tools, no sharing.`,
      },
      { kind: 'tryit', drillIds: ['d-c001', 'd-c004', 'd-c007', 'd-c010'] },
      {
        kind: 'summary',
        points: [
          'Necessary: what the argument cannot live without — tool is the negation test, answers are modest.',
          'Sufficient: what would make the conclusion airtight — tool is gap-closure, answers are sweeping conditionals.',
          'Classify the stem before reading the stimulus; the classification chooses the tool.',
          'A sufficient assumption is usually not necessary — negating it proves nothing.',
          'Do not file Strengthen questions here: "strengthens" is its own type with its own standard.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Your friend negates every answer choice on a "the conclusion follows logically if" question. What is the mistake, and what should they do instead?',
        answer:
          'They are using the necessary-assumption tool on a sufficient-assumption stem. The negation test identifies dependence, not completeness — a sufficient answer is often not necessary, so the test misfires. Instead they should gap-close: insert each choice and check whether the conclusion then follows with certainty.',
      },
      {
        kind: 'next',
        text: 'Group D complete. Next, Group E begins with lesson 2.16: Principle Support — where arguments are justified by general rules, and you learn to find the rule that fits.',
      },
    ],
  },
  {
    id: '2.16',
    stage: 2,
    title: 'Principle: Justifying an Argument',
    estimatedMinutes: 10,
    skills: ['lr-principle-support'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Some arguments are really about rules. A principle is a general rule — "people should keep their promises," "public funds should not subsidize private luxury" — and Principle Support questions ask which rule would justify the argument's reasoning. The direction matters: the argument is the *case*, and you are looking for the *rule* that covers it. This is the reverse of applying a rule to a case (lesson 2.17). Here you reason upward, from the specific argument to the general principle that would make it legitimate. The trap is always the same: a principle that sounds noble but does not actually cover this argument's move.`,
      },
      {
        kind: 'keyterm',
        term: 'Principle (support)',
        definition:
          'A general rule or standard that, if accepted, would justify an argument\u2019s reasoning — the principle must cover the argument\u2019s specific move from its premises to its conclusion, not merely sound agreeable.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "Which of the following principles most helps to justify the reasoning in the argument?"
- "The argument conforms to which of the following principles?"
- "Which principle, if valid, would most support the argument?"

Your method: first, state the argument's move in plain words — "the author goes from *these* premises to *this* conclusion." Second, test each candidate principle by asking: if this rule were true, would this argument's move be legitimate? The correct principle bridges the exact gap. A principle can be true, wise, and relevant to the topic yet still wrong, if it justifies a *different* move than the one the author made. Match the move, not the mood.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What is the direction of reasoning in a Principle Support question?',
        answer:
          'Upward: from the specific argument to the general rule. The argument is the case, and you are looking for the principle that would justify its particular move from premises to conclusion.',
      },
      {
        kind: 'example',
        title: 'Tiny example: matching the move',
        body: `Argument: "The town paid for the mayor's luxury car with public funds. Public money should serve public purposes, not private comfort. The purchase was wrong."

The move: from "public funds were used for private comfort" to "the purchase was wrong." The justifying principle: "It is wrong to use public funds for private benefit." A competing principle like "Public officials should be modest" sounds related but justifies a different move — it is about officials' character, not about funds. The correct principle must cover the *funds-for-private-benefit* step specifically.`,
      },
      {
        kind: 'worked',
        title: 'Testing principles against the argument\u2019s move',
        steps: [
          {
            label: 'Step 1 — State the move plainly',
            body: `"The community garden charges members a small fee, and it uses the money to buy shared tools. Since everyone who pays benefits from the tools, and no one is forced to join, the fee is fair." Move: from "payers benefit" plus "joining is voluntary" to "the fee is fair." Two premises, one evaluative conclusion — the principle must cover both halves.`,
          },
          {
            label: 'Step 2 — Test each candidate principle',
            body: `Candidate A: "A fee is fair when those who pay it benefit from it and no one is compelled to pay." If valid, the argument's move is legitimate — both premises are covered, and the conclusion follows. Candidate B: "Community projects should be free to all." This contradicts the argument rather than justifying it. Candidate C: "Fees are fair when they are small." This covers only the "small fee" detail and ignores the benefit and voluntariness the argument leans on — a partial match is a wrong match.`,
          },
          {
            label: 'Step 3 — Check for overbreadth and underbreadth',
            body: `A principle that is broader than the argument can still be correct, as long as it covers the move — generality is the nature of principles. But a principle that covers *less* than the move (Candidate C) or justifies a *different* move (a principle about tool-sharing rather than fee fairness) fails. The test: does this rule, if true, make *this* step from *these* premises legitimate?`,
          },
          {
            label: 'Step 4 — Confirm no topic-seduction',
            body: `A trap principle might say "Community gardens strengthen neighborhoods." Lovely, true-ish, and entirely about the topic — but it justifies nothing about fee fairness. Whenever a principle choice makes you nod along without connecting to the premises-to-conclusion step, it is seduction, not support.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The correct principle is the one that best expresses the argument\u2019s general moral.',
        right:
          'The correct principle is the one that *justifies the reasoning move* — the step from these premises to this conclusion. A principle can capture the argument\u2019s spirit and still be wrong if it does not license the specific inference the author made.',
      },
      {
        kind: 'checkpoint',
        prompt: `"The newspaper published the council member's private emails. The emails revealed that she had been accepting gifts from developers voting on her zoning decisions. Since the public had a right to know about the corruption, publishing the emails was justified." Which principle most helps justify the reasoning?`,
        choices: [
          'Journalists should always publish information in the public interest.',
          'Public officials should not accept gifts from anyone.',
          'Publishing private communications is justified when doing so exposes wrongdoing the public has a right to know about.',
          'Newspapers should avoid invading anyone\u2019s privacy.',
        ],
        correctIndex: 2,
        explanation:
          'The argument\u2019s move is from "the emails exposed corruption the public had a right to know about" to "publishing was justified." The third choice covers exactly that move: exposure of wrongdoing plus the public\u2019s right to know jointly justify publication. The first choice is close but drops the wrongdoing condition — "always publish" would justify publishing anything interesting, which is a different and broader move than the argument makes. The second condemns the gifts but says nothing about publishing emails. The fourth opposes the conclusion outright.',
      },
      {
        kind: 'example',
        title: 'Deeper: principle support versus strengthen',
        body: `These look alike but differ in generality. Strengthen (lesson 2.11) adds a *specific fact*: "No other safety changes were made on Maple Avenue." Principle Support adds a *general rule*: "A safety improvement should be credited with an accident decline when no other changes occurred." The principle version could justify many arguments; the strengthen version helps only this one. If the correct-looking choice is a specific fact about the stimulus, you are probably looking at a Strengthen question wearing principle clothing — check the stem.`,
      },
      { kind: 'tryit', drillIds: ['d-f079', 'd-f080', 'd-f081'] },
      {
        kind: 'summary',
        points: [
          'Principle Support reasons upward: from the specific argument to the general rule that would justify it.',
          'State the argument\u2019s move plainly, then test each principle: would this rule make this move legitimate?',
          'The principle must cover the exact premises-to-conclusion step — partial matches and topic-matches fail.',
          'A principle can be true and agreeable yet wrong if it justifies a different move.',
          'Distinguish from Strengthen: principles are general rules, strengthen answers are specific facts.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A principle choice is wise, true, and about the argument\u2019s topic — but it justifies a step the author never took. Right or wrong?',
        answer:
          'Wrong. The principle must justify the argument\u2019s actual move from its premises to its conclusion. Topic relevance and general wisdom are not enough; only coverage of the specific inferential step counts.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.17: Principle Application — the direction reverses. Instead of finding the rule for a case, you will take a given rule and find the case it covers.',
      },
    ],
  },
  {
    id: '2.17',
    stage: 2,
    title: 'Principle: Applying to New Cases',
    estimatedMinutes: 10,
    skills: ['lr-principle-application'],
    prerequisites: ['f-structure', 'lr-principle-support'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Lesson 2.16 went from case to rule. Now the direction flips: the stimulus *gives* you the rule, and the choices offer five new cases. Your job is to find the case the rule covers. This is one of the most mechanical question types on the test once you see the structure: extract the principle's conditions, then check each choice against them like a bouncer with a guest list. The principle says who gets in; most choices fail at least one condition. Precision beats intuition — read the principle the way a lawyer reads a contract, because the test writes it that way.`,
      },
      {
        kind: 'keyterm',
        term: 'Principle application',
        definition:
          'Given a general principle, identifying the new situation that the principle covers (or the judgment the principle supports) — the case whose facts satisfy all of the principle\u2019s conditions.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "Which of the following situations best illustrates the principle stated above?"
- "The principle stated above is most closely conformed to by which of the following?"
- "Which of the following judgments most closely conforms to the principle?"

Your method: break the principle into its conditions — usually an "if" part (the trigger) and a "then" part (the verdict). Then test each choice: does it satisfy every condition in the "if" part? The correct choice matches all of them. The traps each violate exactly one condition, or satisfy the trigger but deliver the wrong verdict. Read every word of the principle; the test hides the decisive qualifier in adjectives you want to skim.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What are the two parts of a principle, and how do you use them?',
        answer:
          'The "if" part (the trigger conditions) and the "then" part (the verdict). Break the principle into these parts, then test each choice: the correct case satisfies every trigger condition and receives the principle\u2019s verdict.',
      },
      {
        kind: 'example',
        title: 'Tiny example: the bouncer method',
        body: `Principle: "A restaurant should be closed by health inspectors only if it has failed two consecutive inspections."
Conditions: trigger = failed two consecutive inspections; verdict = should be closed (and "only if" means closure requires the trigger — it does not require closure whenever the trigger holds).

Choice: "Bistro Nova failed its last two inspections, and the inspector ordered it closed." Satisfies the trigger; verdict matches — this illustrates the principle. Trap: "Café Luna failed one inspection and was closed" — trigger not met, so the principle does not cover it. Trap: "Deli Mare failed two straight inspections but stayed open" — the principle permits closure; it does not mandate it ("only if" runs one way).`,
      },
      {
        kind: 'worked',
        title: 'Applying a two-condition principle',
        steps: [
          {
            label: 'Step 1 — Extract the conditions exactly',
            body: `Principle: "A city may justifiably restrict a business's operating hours when the business generates sustained noise complaints from nearby residents and no less restrictive measure would solve the problem." Conditions: (1) sustained noise complaints from nearby residents; (2) no less restrictive measure would work. Verdict: restriction is justifiable. Both conditions must hold.`,
          },
          {
            label: 'Step 2 — Eliminate choices that miss a condition',
            body: `Choice A: a bar with sustained complaints, but the city never tried limiting outdoor seating first. Fails condition (2) — a less restrictive measure might have worked, and the principle requires that none would. Eliminate. Choice B: a bookstore restricted for traffic reasons. Fails condition (1) — no noise complaints at all. Eliminate. Read conditions conjunctively: the principle says "and," so one missing condition is fatal.`,
          },
          {
            label: 'Step 3 — Check the verdict, not just the trigger',
            body: `Choice C: a nightclub with sustained complaints where warnings and fines already failed, and the city restricts its hours. Both conditions met, verdict matches — this is the winner. Choice D trap: same nightclub, but the city shuts it down permanently. The trigger holds, but the verdict ("restrict hours") does not cover permanent closure — the principle justifies a specific measure, and exceeding it breaks the match.`,
          },
          {
            label: 'Step 4 — Watch the qualifiers',
            body: `"Sustained" (not one complaint), "nearby residents" (not across town), "no less restrictive measure" (tried or shown futile). Each adjective is a filter. The correct choice survives every filter; each trap trips on exactly one. When two choices both look close, re-read the principle word by word — the difference is always in a qualifier you skimmed.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The right case is the one most similar in topic to the principle\u2019s example.',
        right:
          'Topic similarity is irrelevant — a principle about restaurants can be illustrated by a case about factories. What matters is structural fit: the case\u2019s facts must satisfy every condition the principle states. Match the logic, not the subject matter.',
      },
      {
        kind: 'checkpoint',
        prompt: `Principle: "An employee should be promoted only if the employee has both exceeded performance targets and mentored junior colleagues." Which situation best illustrates the principle?`,
        choices: [
          'Rosa exceeded her targets and mentored two junior analysts, and she was promoted.',
          'James exceeded his targets but never mentored anyone, and he was promoted.',
          'Priya mentored junior colleagues but missed her targets, and she was denied promotion.',
          'Sam exceeded his targets, mentored juniors, and was denied promotion for budget reasons.',
        ],
        correctIndex: 0,
        explanation:
          'The principle has two conjunctive conditions — exceeding targets AND mentoring — with "only if" running one way: promotion requires both, but both do not require promotion. Rosa satisfies both conditions and receives the verdict, illustrating the principle. James violates it (promoted without mentoring), which would be a counterexample, not an illustration. Priya\u2019s denial is consistent with the principle but does not illustrate it — the principle governs when promotion is justified, and a denial case shows nothing about the "only if" direction. Sam is the subtle trap: both conditions hold yet he was denied, which the principle permits ("only if" does not mandate promotion), so it fails to illustrate the verdict.',
      },
      {
        kind: 'example',
        title: 'Deeper: "only if" versus "if"',
        body: `The most tested qualifier in principle questions is the direction of the conditional. "A should be closed only if it failed twice" means: closure → failed twice. It does NOT mean: failed twice → closure. So a restaurant that failed twice and stayed open does not violate the principle, but a restaurant closed after one failure does. Before testing choices, rewrite the principle as an arrow in your head and check which direction it points. Half of all principle-application errors are direction errors.`,
      },
      { kind: 'tryit', drillIds: ['d-f082', 'd-f083', 'd-f067'] },
      {
        kind: 'summary',
        points: [
          'Principle Application reasons downward: the rule is given, and you find the case it covers.',
          'Break the principle into trigger conditions and verdict; test each choice against every condition.',
          'Read qualifiers like a contract — "sustained," "nearby," "only if" are filters, not decoration.',
          'Match structure, not topic: the case must satisfy the logic, whatever its subject matter.',
          'Check conditional direction: "only if" permits but does not mandate; violating the trigger direction breaks the match.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Principle: "X is justified only if Y." A case has Y but not X. Does it illustrate the principle? Explain.',
        answer:
          'Not necessarily — "only if" means X requires Y (X → Y), not that Y requires X. A case with Y but not X is permitted by the principle, but it does not illustrate the verdict. To illustrate, the case needs the trigger satisfied and the verdict applied.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.18: Generalizations and Rule Matching — where principles meet everyday reasoning, and you learn to handle rules with exceptions and qualified scope.',
      },
    ],
  },
  {
    id: '2.18',
    stage: 2,
    title: 'Generalizations and Rule Matching',
    estimatedMinutes: 9,
    skills: ['lr-principle-application'],
    prerequisites: ['lr-principle-application', 'lr-principle-support'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Much of real reasoning runs on generalizations: rules of thumb with soft edges. "Loyal customers deserve flexibility." "Deadlines matter, but emergencies come first." The LSAT tests these in stems like "The principle above, if valid, most strongly supports which of the following?" — a hybrid where the principle is given and you must find the judgment it best supports. The twist: generalizations have scope and exceptions, and the test probes exactly where the rule bends. A choice can match the rule's words yet fall outside its scope, or look like an exception yet be covered.`,
      },
      {
        kind: 'keyterm',
        term: 'Generalization (rule matching)',
        definition:
          'A broadly stated rule applied to a specific judgment: the correct answer is the case or claim the rule most strongly supports, respecting the rule\u2019s scope, qualifiers, and any stated exceptions.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "The principle stated above, if valid, most strongly supports which of the following?"
- "Which of the following is most consistent with the principle above?"
- "The generalization above best supports which of the following judgments?"

Unlike pure application questions, these ask what the rule *supports* — sometimes a case, sometimes a further general claim. Your method is the same bouncer discipline from lesson 2.17, plus scope awareness: does the choice fall inside the rule's stated domain? A principle about "employees" does not cover contractors. A rule with an explicit exception ("unless safety is at stake") does not cover the excepted case. And "most strongly supports" means you are weighing fit, not demanding entailment — the best-supported judgment wins even if the rule does not guarantee it.`,
      },
      {
        kind: 'retrieval',
        prompt: 'How does "most strongly supports" change the standard compared to pure principle application?',
        answer:
          'Pure application demands that the case satisfy the principle\u2019s conditions. "Most strongly supports" relaxes this to best fit: the winning judgment is the one the rule supports more strongly than any alternative, even if the rule does not strictly entail it.',
      },
      {
        kind: 'example',
        title: 'Tiny example: scope matters',
        body: `Principle: "A university should grant deadline extensions to students facing documented emergencies."
Which judgment is most strongly supported? "The dean should extend Mara's deadline because her documented hospitalization kept her from finishing." That is inside the scope: student, documented emergency, deadline.
Trap: "The dean should extend the deadline for the whole class because the assignment was hard." A hard assignment is not a documented emergency — outside the rule's scope. Trap: "Employers should grant extensions to workers with emergencies." The rule is about universities and students; stretching it to employers exceeds its stated domain.`,
      },
      {
        kind: 'worked',
        title: 'Matching a rule with an exception',
        steps: [
          {
            label: 'Step 1 — Map the rule, including its exception',
            body: `Principle: "Loyal customers who raise a complaint deserve a good-faith effort to resolve it, unless the complaint concerns a clearly stated nonrefundable policy." Structure: trigger (loyal customer + complaint) → verdict (good-faith resolution effort), with an exception (nonrefundable policy complaints are excluded). The exception is part of the rule — choices touching it must be handled with care.`,
          },
          {
            label: 'Step 2 — Test each candidate judgment',
            body: `Choice A: "The store should try to resolve longtime customer Ana's complaint about a defective blender." Loyal customer, complaint, no nonrefundable policy mentioned — inside the rule, verdict supported. Choice B: "The store should refund Ben's nonrefundable concert ticket because he is a loyal customer." This hits the exception squarely — the rule explicitly excludes it. Eliminate.`,
          },
          {
            label: 'Step 3 — Weigh the remaining contenders',
            body: `Choice C: "The store should resolve every complaint from every customer." Too broad — the rule covers loyal customers, not every customer. Choice D: "New customer Carla deserves a good-faith effort on her complaint." The rule's trigger requires loyalty; Carla is new, so the rule does not cover her — though it does not forbid helping her either. Between A (directly covered) and D (merely not forbidden), A is far more strongly supported.`,
          },
          {
            label: 'Step 4 — Confirm the winner\u2019s fit',
            body: `Choice A satisfies the trigger, avoids the exception, and receives the verdict — the strongest fit available. Note what the question did not require: the rule need not *guarantee* the store will resolve Ana's complaint, only that it most strongly supports the judgment among the options. Best fit wins.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If a case is not covered by the rule, the rule must oppose it.',
        right:
          'A rule\u2019s silence is not opposition. The principle about loyal customers says nothing for or against helping new customer Carla — it simply does not cover her. "Not supported by the rule" and "contradicted by the rule" are different verdicts; only the excepted case (Ben\u2019s nonrefundable ticket) is actually excluded.',
      },
      {
        kind: 'checkpoint',
        prompt: `Principle: "A city should preserve any historic building that can be maintained at a reasonable cost, unless keeping it blocks essential public infrastructure." Which judgment is most strongly supported?`,
        choices: [
          'The city should preserve the 1890 courthouse, which needs only minor repairs and blocks nothing.',
          'The city should preserve every building older than fifty years.',
          'The city should demolish the old depot, which is cheap to maintain but sits where the new hospital must go.',
          'The city should never demolish any historic building.',
        ],
        correctIndex: 0,
        explanation:
          'The courthouse satisfies the trigger (historic, reasonable maintenance cost) and avoids the exception (blocks nothing), so the rule directly supports preserving it. The second choice overgeneralizes: the rule covers buildings maintainable at reasonable cost, not every old building. The third is the exception case — the depot blocks essential infrastructure (a hospital), so the rule does not support preserving it. The fourth states an absolute the rule never asserts; the exception alone disproves "never." Scope discipline — trigger, exception, no stretching — selects the winner.',
      },
      {
        kind: 'example',
        title: 'Deeper: rules about rules',
        body: `Sometimes the "case" is itself a general claim: "The principle above most strongly supports which of the following generalizations?" The method does not change — you are still checking fit — but now you must avoid overclaiming. If the principle covers loyal customers' complaints, it supports "loyal customers can expect good-faith complaint handling" but not "all customers always get what they want." The supported generalization must stay inside the rule's scope. When the choices are themselves rules, pick the one the principle entails most strongly, and reject any that add conditions the principle never stated.`,
      },
      { kind: 'tryit', drillIds: ['d-f084', 'd-f085'] },
      {
        kind: 'summary',
        points: [
          'Rule-matching asks what a given generalization most strongly supports — a case or a further judgment.',
          'Map the rule\u2019s trigger, verdict, scope, and any stated exceptions before testing choices.',
          'A rule\u2019s silence is not opposition: uncovered cases are merely uncovered, not contradicted.',
          'Do not stretch the domain — a rule about students does not cover employees.',
          '"Most strongly supports" means best fit wins; entailment is not required.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A rule covers "loyal customers." A choice concerns a new customer and the rule neither supports nor forbids the outcome. What is the correct verdict on that choice?',
        answer:
          'The choice is merely uncovered by the rule — not supported, but not contradicted either. It cannot be the best-supported answer when another choice falls squarely inside the rule\u2019s trigger, but its status is "silent," not "opposed."',
      },
      {
        kind: 'next',
        text: 'Group E complete. Next, Group F begins with lesson 2.19: Parallel Reasoning — the longest stems on the test, where you match the skeleton of an argument, never its subject matter.',
      },
    ],
  },
  {
    id: '2.19',
    stage: 2,
    title: 'Parallel Reasoning',
    estimatedMinutes: 14,
    skills: ['lr-parallel-reasoning'],
    prerequisites: ['f-structure', 'f-conditional'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Parallel Reasoning questions have the longest stimuli on the test — a full argument plus five more, each a paragraph. Students panic at the wall of text and start comparing topics: "this one is about dogs, the stimulus is about hiring… skip." That instinct is exactly backwards. The question asks which argument *reasons the same way*, and the topic is the least relevant thing about it. Your job is to strip each argument to its skeleton — the logical shape of premises and conclusion — and find the skeleton that matches. Done right, these are among the most predictable questions on the test.`,
      },
      {
        kind: 'keyterm',
        term: 'Parallel reasoning',
        definition:
          'An argument that shares the stimulus argument\u2019s logical structure: the same pattern of premises leading to the same kind of conclusion — including whether the reasoning is valid or flawed — regardless of subject matter.',
      },
      {
        kind: 'prose',
        md: `The stem:

- "The pattern of reasoning in the argument above is most similar to that in which of the following?"
- "Which of the following arguments is most similar in its pattern of reasoning to the argument above?"

Your method has three passes. First, skeletonize the stimulus: write its abstract shape ("All A are B; X is A; therefore X is B") and note whether the reasoning is valid or flawed, and what kind of conclusion it draws (a prediction, a recommendation, a causal claim). Second, eliminate choices whose skeletons obviously differ — wrong conclusion type or wrong premise structure. Third, compare survivors move by move. Two non-negotiable matching rules: the *validity* must match (a valid argument is never parallel to a flawed one), and the *conclusion type* must match (a prediction is never parallel to a recommendation).`,
      },
      {
        kind: 'retrieval',
        prompt: 'What are the two non-negotiable matching rules for Parallel Reasoning?',
        answer:
          'First, validity must match: a valid argument is never parallel to a flawed one, and vice versa. Second, the conclusion type must match: a prediction, a recommendation, and a causal claim are different skeletons even when the premise pattern looks similar.',
      },
      {
        kind: 'example',
        title: 'Tiny example: skeletons, not topics',
        body: `Stimulus: "Every employee who met the sales target received a bonus. Jamal received a bonus. Therefore, Jamal met the sales target."
Skeleton: All A are B; X is B; therefore X is A. This is the fallacy of affirming the consequent — flawed.
Parallel choice: "Every package mailed before noon arrives the next day. Priya's package arrived the next day. Therefore, it was mailed before noon." Different topic, identical skeleton, identically flawed — parallel. A choice about sales targets with valid reasoning would not match, however tempting the topic overlap. Topic is camouflage; skeleton is identity.`,
      },
      {
        kind: 'worked',
        title: 'Three-pass matching on a longer pair',
        steps: [
          {
            label: 'Step 1 — Skeletonize the stimulus',
            body: `Stimulus: "The city's two tallest office towers both installed rooftop gardens last year, and both report lower summer cooling costs. The gardens must be reducing heat absorption. Therefore, installing rooftop gardens on the remaining towers would lower their cooling costs too." Skeleton: two observed cases with a shared feature and a shared outcome → causal claim about the feature → prediction that extending the feature extends the outcome. Flawed (small sample, possible confounds). Conclusion type: prediction/recommendation about new cases.`,
          },
          {
            label: 'Step 2 — First pass: eliminate by conclusion type and validity',
            body: `Choice A: an argument concluding that a policy *should* be adopted — recommendation, but built on a survey, not on two-case causal generalization. Different skeleton. Choice B: "Both of the harbor's new ferries use the same engine design, and both have had engine trouble. The design must be faulty. So the third ferry, which uses the same design, will likely have trouble too." Two cases → causal claim → prediction about a new case. Same conclusion type, same flawed generalization. Survivor. Choice C: a valid deductive argument — validity mismatch, eliminate regardless of topic.`,
          },
          {
            label: 'Step 3 — Second pass: move-by-move comparison',
            body: `Compare the stimulus and Choice B element by element. Two observed instances: towers / ferries — match. Shared feature: gardens / engine design — match. Shared outcome: lower cooling costs / engine trouble — match. Causal attribution: gardens reduce heat / design is faulty — match. Extension to new cases: remaining towers / third ferry — match. Same number of premises, same inferential moves, same flaw (generalizing from two cases with possible confounds).`,
          },
          {
            label: 'Step 4 — Confirm nothing else survives',
            body: `Choices D and E: one generalizes from a single case, the other argues by analogy between dissimilar domains. Neither reproduces the two-case-to-prediction skeleton. Choice B stands alone. Notice how little the topics mattered — towers versus ferries never entered the analysis. When you stop reading for content and start reading for shape, these questions get faster, not slower.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Start with the choices whose topic resembles the stimulus — similar subjects reason similarly.',
        right:
          'Topic resemblance is the test-maker\u2019s favorite decoy. Arguments about the same subject routinely use different logical structures, and arguments about wildly different subjects can share a skeleton exactly. Always skeletonize the stimulus first and match on structure, validity, and conclusion type — never on subject matter.',
      },
      {
        kind: 'checkpoint',
        prompt: `Stimulus: "Whenever the night market runs, downtown parking fills by 8 p.m. The market is running tonight. So downtown parking will fill by 8 p.m. tonight." Which argument is most similar in its pattern of reasoning?`,
        choices: [
          'Whenever the pool is open, the lifeguard is on duty. The lifeguard is on duty today. So the pool is open today.',
          'Whenever the library hosts story hour, the children\u2019s room is noisy. The library is hosting story hour now. So the children\u2019s room is noisy now.',
          'The night market usually draws big crowds. Big crowds fill downtown parking. So tonight\u2019s market will fill the parking.',
          'Downtown parking fills by 8 p.m. on market nights because residents move their cars early.',
        ],
        correctIndex: 1,
        explanation:
          'The stimulus skeleton is: whenever P, Q; P is the case; therefore Q — a valid application of a conditional (modus ponens). The second choice reproduces it exactly: whenever story hour, noisy room; story hour now; therefore noisy now — same structure, same validity, different topic. The first choice affirms the consequent (Q, therefore P) — the same topic family but a flawed skeleton, so validity mismatch eliminates it. The third generalizes from "usually" — a different, weaker structure. The fourth explains rather than argues; it has no parallel inferential skeleton at all.',
      },
      {
        kind: 'example',
        title: 'Deeper: matching flawed skeletons',
        body: `Parallel questions do not require valid reasoning — they require *matching* reasoning. A stimulus that confuses correlation with causation must be matched by a choice that confuses correlation with causation, not by a choice with sound causal reasoning. When the stimulus is flawed, your first elimination pass should discard every valid argument, however similar its topic. Name the stimulus's flaw during skeletonizing (lesson 2.9's skill pays off here): "this is a bad generalization from two cases" becomes your search template for the choices.`,
      },
      { kind: 'tryit', drillIds: ['d-f067', 'd-f069', 'd-f071'] },
      {
        kind: 'summary',
        points: [
          'Parallel Reasoning matches logical skeletons, never subject matter — topic overlap is the decoy.',
          'Skeletonize the stimulus first: premise pattern, conclusion type, and whether the reasoning is valid or flawed.',
          'Two non-negotiables: validity must match, and conclusion type must match.',
          'Use three passes: skeletonize, eliminate by structure, compare survivors move by move.',
          'A flawed stimulus must match a flawed choice with the same flaw — name the flaw while skeletonizing.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'The stimulus is a flawed causal generalization about office towers. A choice is a flawless deductive argument about office towers. Parallel? Why not?',
        answer:
          'Not parallel. Validity must match: a flawed argument can never be parallel to a valid one, no matter how closely the topics overlap. The topic match is a decoy; the skeleton — including its flaw — is what must be shared.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.20: Parallel Flaw — where the stimulus\u2019s error is the whole point, and you must match both the flaw and the structure that carries it.',
      },
    ],
  },
  {
    id: '2.20',
    stage: 2,
    title: 'Parallel Flaw',
    estimatedMinutes: 12,
    skills: ['lr-parallel-flaw'],
    prerequisites: ['f-flaws', 'f-structure', 'lr-parallel-reasoning'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Parallel Flaw is Parallel Reasoning with the error as the star. The stimulus argues badly, and you must find the choice that argues badly in exactly the same way. This is a two-lock door: the choice must share the stimulus's *flaw* and its *structure*. Students typically pick one lock and ignore the other — they find a choice with the same flaw but a different skeleton, or the same skeleton with a different flaw. Both are wrong. The discipline from lesson 2.19 still applies, but now the flaw is not just a matching constraint; it is the primary thing you are hunting.`,
      },
      {
        kind: 'keyterm',
        term: 'Parallel flaw',
        definition:
          'An argument that commits the same reasoning error as the stimulus, carried by the same logical structure — the flaw type and the argument\u2019s skeleton must both match, regardless of subject matter.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "The flawed pattern of reasoning in the argument above is most similar to that in which of the following?"
- "Which of the following contains flawed reasoning most similar to that in the argument above?"

Your method: first, name the stimulus's flaw precisely (lesson 2.9's vocabulary — equivocation, bad generalization, affirming the consequent, part-to-whole, and so on). Second, skeletonize the flawed move: what kind of premises lead to what kind of conclusion through the error? Third, eliminate choices that are valid (a valid argument cannot parallel a flawed one), then choices with a different flaw, then choices with a different skeleton. The most dangerous trap is the *same-flaw-different-skeleton* choice: it feels right because the error rings a bell, but the bell is not enough — the structure carrying it must match too.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What are the two locks on the Parallel Flaw door?',
        answer:
          'The choice must share the stimulus\u2019s flaw type AND its logical skeleton. Same flaw with a different structure is wrong; same structure with a different flaw is wrong. Both must match.',
      },
      {
        kind: 'example',
        title: 'Tiny example: affirming the consequent, twice',
        body: `Stimulus: "Every employee who met the sales target received a bonus. Jamal received a bonus. Therefore, Jamal met the sales target." Flaw: affirming the consequent (B, therefore A, from "if A then B"). Skeleton: conditional premise, observation of the consequent, invalid inference of the antecedent.

Parallel: "Every package mailed before noon arrives the next day. Priya's package arrived the next day. Therefore, it was mailed before noon." Same flaw, same skeleton, different topic — the answer. A choice that instead argued "Jamal did not receive a bonus, therefore he missed the target" would be *denying the consequent* — a different flaw — and would fail despite the topic match.`,
      },
      {
        kind: 'worked',
        title: 'Matching flaw and skeleton together',
        steps: [
          {
            label: 'Step 1 — Name the stimulus\u2019s flaw precisely',
            body: `Stimulus: "The new traffic app reduced commute times for drivers in the pilot neighborhood. Clearly the app improves traffic flow everywhere, so the city should roll it out citywide." Flaw: hasty generalization — one neighborhood's result is projected onto the whole city, ignoring possible differences. Precision matters: this is not affirming the consequent or equivocation; it is generalization from an inadequate sample.`,
          },
          {
            label: 'Step 2 — Skeletonize the flawed move',
            body: `Skeleton: one observed case with a positive outcome → causal credit to the intervention → recommendation to extend it everywhere. Conclusion type: recommendation based on a single-case generalization. Any parallel choice must reproduce this shape: single case, causal leap, universal recommendation.`,
          },
          {
            label: 'Step 3 — Eliminate by validity, then by flaw',
            body: `Choice A: a valid statistical argument for citywide rollout — valid, eliminate (validity must match). Choice B: "The new fertilizer doubled yields on one test farm. The fertilizer obviously boosts yields generally, so all farms should switch." Same flaw (single-case generalization), same skeleton (case → causal leap → universal recommendation). Survivor. Choice C: also a bad generalization, but from a survey with a biased sample — same flaw family, different mechanism and skeleton (no causal leap to a recommendation). The same-flaw-different-skeleton trap: eliminate.`,
          },
          {
            label: 'Step 4 — Confirm the survivor move by move',
            body: `Stimulus: pilot neighborhood → app gets credit → roll out citywide. Choice B: one test farm → fertilizer gets credit → all farms should switch. Single case, causal attribution, universal recommendation — flaw and skeleton both match. Topic (traffic versus farming) never mattered. When you can narrate both arguments with the same abstract sentence, you have your answer.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If the choice commits the same named flaw, the structures are close enough.',
        right:
          'The flaw type alone is not enough. Two arguments can both "generalize badly" through completely different skeletons — one from a biased survey, one from a single case. Parallel Flaw demands the same error traveling through the same logical shape. Match both, or it is not parallel.',
      },
      {
        kind: 'checkpoint',
        prompt: `Stimulus: "The library's weekend workshops are free, in the sense that no admission is charged. They are also free in the sense that they cost the library little. Since they are free in every sense, the city should expand them." (The equivocation from lesson 2.9.) Which contains the most similar flawed reasoning?`,
        choices: [
          'The bridge is sound, in the sense that its cables hold. It is sound in the sense that it makes no noise. Since it is sound in every sense, it needs no inspection.',
          'The new policy is popular with voters and popular with the council. Since it is popular in every sense, it will succeed.',
          'The soup is hot in temperature and hot in spiciness. Since it is hot in every sense, it should be served immediately.',
          'The report is long in pages and long in the time it took to write. Since it is long in every sense, no one will read it.',
        ],
        correctIndex: 0,
        explanation:
          'The stimulus flaw is equivocation: "free" shifts meaning (no admission versus low cost) and the conclusion treats the senses as one. The first choice reproduces both locks: "sound" shifts meaning (structurally solid versus silent) and the conclusion ("needs no inspection") rests on treating the senses as identical — same flaw, same skeleton. The second choice uses "popular" in one consistent sense; there is no equivocation, only repetition. The third shifts "hot" but draws no inference that depends on merging the senses — the serving recommendation does not exploit the ambiguity. The fourth is the closest trap: it shifts "long" and draws a conclusion, but the conclusion (no one will read it) does not depend on treating the two senses as one, so the flaw is not actually the same.',
      },
      {
        kind: 'example',
        title: 'Deeper: abstract structure, not subject matter',
        body: `The test-writers deliberately pair the stimulus topic with a wrong choice: a stimulus about medicine gets a choice about medicine with a different flaw, while the correct choice is about plumbing with the identical flaw and skeleton. Train the reflex: when a choice's topic matches the stimulus, raise your suspicion, not your confidence. Cover the topics with your thumb, read only the logical moves, and ask: "same error, same shape?" That question — asked coldly, without topic loyalty — is the entire skill.`,
      },
      { kind: 'tryit', drillIds: ['d-f143', 'd-f145', 'd-f149'] },
      {
        kind: 'summary',
        points: [
          'Parallel Flaw is a two-lock door: the choice must share the flaw type AND the logical skeleton.',
          'Name the stimulus\u2019s flaw precisely before touching the choices — vague flaw labels produce vague matches.',
          'Eliminate in order: valid arguments first, then different flaws, then different skeletons.',
          'The same-flaw-different-skeleton choice is the signature trap — the error must travel the same shape.',
          'Topic matches are decoys: read for moves, not subject matter.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A choice commits the same flaw as the stimulus but reaches its conclusion through a different inferential route. Parallel or not? Why?',
        answer:
          'Not parallel. Parallel Flaw requires both locks: the same flaw type and the same logical skeleton. A matching flaw traveling through a different structure is the signature trap — the error must be carried by the same shape of reasoning.',
      },
      {
        kind: 'next',
        text: 'Group F complete. Next, Group G begins with lesson 2.21: Resolve the Paradox — where two true facts seem to collide, and your job is to show how both can stand.',
      },
    ],
  },
  {
    id: '2.21',
    stage: 2,
    title: 'Resolve the Paradox',
    estimatedMinutes: 11,
    skills: ['lr-resolve-paradox'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Two facts. Both true. They cannot both be true — and yet they are. That tension is the paradox, and Resolve questions ask you to dissolve it: find the new fact that lets both original facts stand together. This is not about proving one side wrong. The stimulus facts are given as true, and the correct answer never contradicts either of them. Instead it adds the missing context — the distinction, the hidden factor, the different timeframe — that makes the apparent contradiction evaporate. Think of yourself as a mediator: both sides keep their claims, and you supply the understanding that reconciles them.`,
      },
      {
        kind: 'keyterm',
        term: 'Resolve / explain the paradox',
        definition:
          'To account for an apparent contradiction between two accepted facts by supplying a new fact or distinction under which both original facts can be true simultaneously — without denying or explaining away either one.',
      },
      {
        kind: 'prose',
        md: `The stems:

- "Which of the following, if true, most helps to resolve the apparent discrepancy?"
- "Which of the following, if true, most helps to explain the apparent paradox?"
- "Which of the following best reconciles the information above?"

Your method: first, state the two facts crisply and name the tension ("Fact 1 says X, but Fact 2 says Y, which seems incompatible because…"). Second, predict the kind of resolver: usually a distinction (different groups, different times, different meanings of a key word) or a hidden third factor. Third, test each choice with the both-true check: does this new fact let *both* original facts remain true? Any choice that denies one fact, explains only one side, or merely restates the tension fails. The correct answer makes you say "oh — of course both can be true."`,
      },
      {
        kind: 'retrieval',
        prompt: 'What is the both-true check, and what does it rule out?',
        answer:
          'The both-true check asks whether a candidate answer lets both original facts remain true. It rules out any choice that denies or undermines either fact, any choice that explains only one side, and any choice that merely restates the apparent contradiction.',
      },
      {
        kind: 'example',
        title: 'Tiny example: the hidden distinction',
        body: `Paradox: "The city's new bike-share program is hugely popular — stations are always empty. Yet the program loses money every month."
Tension: popularity should mean revenue, but the program bleeds cash.
Resolver: "The program charges a flat annual fee, so heavy use increases maintenance costs without increasing revenue." Now both facts stand: stations are empty because riders love the flat fee; the program loses money because each ride costs more than it earns. The distinction between usage and revenue dissolves the paradox. Neither original fact was wrong — the picture was just incomplete.`,
      },
      {
        kind: 'worked',
        title: 'Resolving step by step',
        steps: [
          {
            label: 'Step 1 — State the two facts and the tension',
            body: `Fact 1: "The Harborview library extended its hours last year and hired more staff." Fact 2: "Total operating costs fell 15 percent." Tension: more hours plus more staff should mean higher costs, not lower ones. Write the tension as a "should": given Fact 1, you would expect costs to rise — Fact 2 defies that expectation.`,
          },
          {
            label: 'Step 2 — Predict the resolver\u2019s shape',
            body: `Something must have changed that the two facts do not mention — a hidden factor affecting costs, or a distinction in what "costs" or "staff" means here. Predict loosely: "the library also did something that cut costs more than the new hours added." Do not over-predict specifics; predict the *kind* of missing piece.`,
          },
          {
            label: 'Step 3 — Apply the both-true check to each choice',
            body: `Correct: "The library replaced its aging heating system the same year, cutting energy bills by far more than the extended hours added." Both facts stand: hours and staff rose (Fact 1), total costs fell because energy savings outweighed the new spending (Fact 2). Trap: "The reported cost figures are inaccurate" — denies Fact 2, fails the check. Trap: "Other libraries also cut costs" — explains nothing about this library. Trap: "Extended hours attracted more visitors" — true maybe, but visitors do not lower costs; it addresses neither side of the tension.`,
          },
          {
            label: 'Step 4 — Feel the click',
            body: `The right resolver produces a small "of course" moment: once you hear about the heating system, the paradox was never a paradox — it was an incomplete picture. If a choice leaves you still puzzled about how both facts coexist, it has not resolved anything. Trust the click, but verify it with the both-true check; the click alone can be seduced by an interesting-but-one-sided choice.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'To resolve the paradox, show that one of the two facts is misleading or wrong.',
        right:
          'The stimulus facts are given as true — attacking either one violates the question\u2019s terms. Resolution never denies; it *accommodates*. The correct answer adds context under which both facts coexist, leaving each fully intact.',
      },
      {
        kind: 'checkpoint',
        prompt: `"Marie's Diner raised its prices 20 percent last year. The diner also served 15 percent more customers than the year before." Which most helps resolve the apparent discrepancy?`,
        choices: [
          'The diner\u2019s price increases were widely criticized in online reviews.',
          'Other diners in the neighborhood also raised their prices last year.',
          'The diner\u2019s reported customer counts may include takeout orders.',
          'A major office complex opened across the street, bringing hundreds of new lunch customers.',
        ],
        correctIndex: 3,
        explanation:
          'The tension: higher prices should reduce customers, yet customers rose. The office complex supplies the missing factor: a surge of new nearby workers increased demand enough to outweigh the price effect — both facts remain fully true. The first choice deepens the mystery rather than resolving it (criticism should hurt business). The second is about other diners and explains nothing about this one\u2019s customer growth. The third is the classic fact-attacking trap: it suggests the customer counts might be inflated, which denies rather than accommodates the given information — resolution never works by undermining a stated fact.',
      },
      {
        kind: 'example',
        title: 'Deeper: the scope-shift resolver',
        body: `Many paradoxes dissolve on scope: the two facts are about different groups, times, or senses of a word. "The town's population grew, but school enrollment fell" resolves with: "the growth was entirely among retirees." "The drug works, but patients report no improvement" resolves with: "it prevents future episodes rather than relieving current symptoms." When you state the tension, listen for the word doing double duty — population, improvement, costs — and ask whether it means the same thing in both facts. Often it does not, and the paradox was verbal all along.`,
      },
      { kind: 'tryit', drillIds: ['d-f149', 'd-f151'] },
      {
        kind: 'summary',
        points: [
          'Resolve questions ask for the new fact under which both given facts can be true — never deny either one.',
          'State the tension crisply: Fact 1, Fact 2, and why they seem incompatible.',
          'Predict the resolver\u2019s shape: a hidden factor, a scope distinction, or a word doing double duty.',
          'Apply the both-true check to every choice; explaining one side is not resolving.',
          'The correct answer produces an "of course" moment — the paradox was an incomplete picture, not a real contradiction.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A choice explains Fact 1 beautifully but leaves Fact 2 mysterious. Does it resolve the paradox?',
        answer:
          'No. Resolution requires accommodating both facts — the both-true check fails if either side is left unexplained. A choice that accounts for only one fact is the most common trap on these questions.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.22: Reconciling Inconsistent Facts — the advanced companion, where the contradiction runs deeper and the resolution demands more careful distinctions.',
      },
    ],
  },
  {
    id: '2.22',
    stage: 2,
    title: 'Reconciling Inconsistent Facts',
    estimatedMinutes: 10,
    skills: ['lr-resolve-paradox'],
    prerequisites: ['lr-resolve-paradox'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Lesson 2.21 taught you to dissolve apparent contradictions. Now the contradictions get tougher: facts that look flatly incompatible, where the resolution requires a subtler distinction — different timeframes, different subgroups, different causal pathways — or a hidden third factor both facts depend on. The skill is the same both-true discipline, applied under pressure. The test-writers also love a particular cruelty here: choices that resolve the *tension you feel* while quietly contradicting one of the facts. Your defense is mechanical — check both facts, every choice, every time — because under pressure, "this feels resolving" is not the same as "both facts survive."`,
      },
      {
        kind: 'keyterm',
        term: 'Reconcile (inconsistent facts)',
        definition:
          'To show how apparently incompatible facts can all be true by identifying the distinction — of scope, time, group, or mechanism — or the third factor that accommodates each of them without weakening any.',
      },
      {
        kind: 'prose',
        md: `The stems overlap with lesson 2.21's — "resolve the apparent discrepancy," "reconcile the information," "explain how both can be true" — because this is the same question type at higher difficulty. The added difficulty comes from three sources. First, the facts may be three or more, not two, so your tension statement must track all of them. Second, the key distinction is buried: the word doing double duty is one you would not naturally question. Third, the traps are more artful — especially the *partial resolver* (accommodates two facts, contradicts the third) and the *tension restater* (says "both can be true because situations are complex" without supplying the mechanism). Your upgrade: be exhaustive. List every fact. Check every fact.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What are the two signature traps of advanced reconcile questions?',
        answer:
          'The partial resolver, which accommodates some facts while quietly contradicting another, and the tension restater, which claims both can be true without supplying any mechanism. The defense is exhaustive: list every fact and check every fact against each choice.',
      },
      {
        kind: 'example',
        title: 'Tiny example: three facts, one distinction',
        body: `Facts: (1) "The town's recycling rate rose to 60 percent." (2) "The town's landfill waste did not decrease." (3) "Total waste produced by the town grew sharply."
Tension: more recycling should mean less landfill — unless there is more waste overall. Resolver: "The town's population boomed, so total waste grew faster than recycling could offset." All three facts stand: the rate rose (a percentage), landfill held steady (absolute tons), because the denominator exploded. The distinction is rate versus absolute amount — the word doing double duty is "more." With three facts, write all three down; the resolver must accommodate the whole set.`,
      },
      {
        kind: 'worked',
        title: 'Catching the partial resolver',
        steps: [
          {
            label: 'Step 1 — List every fact and the full tension',
            body: `Fact 1: "The new migraine drug outperformed the placebo in clinical trials." Fact 2: "Patients taking the drug report no more headache relief than patients taking the placebo." Fact 3: "Doctors prescribing the drug report high patient satisfaction." Tension: trials say it works, patients feel nothing, yet doctors are satisfied — three claims pulling in different directions. Do not reduce this to two facts; the third is load-bearing.`,
          },
          {
            label: 'Step 2 — Hunt the hidden distinction',
            body: `What could "outperformed" mean that "headache relief" does not capture? Trials might measure something patients do not feel — like reduced frequency of future episodes, or a biomarker. And doctors might be satisfied for a different reason — fewer emergency visits, say. Predict: the resolver will split "works" into a clinical measure versus felt relief, and explain the doctors separately.`,
          },
          {
            label: 'Step 3 — Test choices against ALL three facts',
            body: `Correct: "The trials measured reduction in migraine frequency over six months, which patients do not notice visit to visit; doctors value the drug because it sharply reduces emergency-room visits." All three facts stand. Partial-resolver trap: "Patients' reports are unreliable" — accommodates Facts 1 and 3 but contradicts Fact 2 (given as true). Tension-restater trap: "Drug effectiveness is a complex matter involving many factors" — says nothing that lets the three facts coexist.`,
          },
          {
            label: 'Step 4 — Verify no fact was weakened',
            body: `Re-read the winner against each fact in turn. Fact 1 (trials): intact — frequency reduction is a real measured effect. Fact 2 (no felt relief): intact — patients genuinely feel no visit-to-visit difference. Fact 3 (doctor satisfaction): intact — explained by fewer ER visits. Weakening is not resolving: any choice that makes a fact "less true" rather than "compatible" fails, however elegant it sounds.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If a choice resolves the main tension between the two biggest facts, the smaller details do not matter.',
        right:
          'Every stated fact is load-bearing. A choice that accommodates two facts while contradicting — or even just weakening — a third is the partial-resolver trap, and it is designed exactly for students who stop checking early. Check every fact, every choice.',
      },
      {
        kind: 'checkpoint',
        prompt: `Facts: (1) "The city's emergency rooms treated 20 percent more patients this year." (2) "Average ER wait times fell." (3) "The number of ER doctors did not increase." Which most helps reconcile all three?`,
        choices: [
          'ER wait times are measured differently this year than last year.',
          'Doctors are working longer shifts than they did last year.',
          'More patients are visiting ERs for minor issues than before.',
          'The city opened two new urgent-care clinics that handle minor cases, leaving ERs with fewer low-priority patients.',
        ],
        correctIndex: 3,
        explanation:
          'The urgent-care clinics explain everything: ERs treat more patients overall (Fact 1) because total demand rose, yet wait times fell (Fact 2) because the clinics siphoned off minor cases, leaving ER doctors (Fact 3, unchanged in number) with a faster-moving caseload. All three facts stand intact. The first choice attacks Fact 2\u2019s measurement — denying rather than reconciling. The second contradicts Fact 3\u2019s spirit by effectively increasing doctor capacity through hours, and it does not explain the wait-time drop cleanly. The third deepens the paradox: more minor cases should lengthen waits, not shorten them.',
      },
      {
        kind: 'example',
        title: 'Deeper: genuinely inconsistent versus merely surprising',
        body: `Not every tension is a true contradiction. "The restaurant raised prices and gained customers" is merely surprising — economics has ready explanations (new demand, better reputation). A genuinely inconsistent pair would be "the restaurant raised prices, gained no new customers, lost no old ones, and revenue fell" — which is arithmetically impossible, signaling a bad fact rather than a paradox. The LSAT deals in the merely surprising: the facts are true, and your job is the missing context. If you ever find yourself thinking "one of these must be false," re-read the question — on Resolve questions, that thought is always the trap talking.`,
      },
      { kind: 'tryit', drillIds: ['d-f150', 'd-f152'] },
      {
        kind: 'summary',
        points: [
          'Advanced reconciliation uses the same both-true discipline as basic paradox resolution, applied exhaustively.',
          'List every fact — with three or more facts, the partial-resolver trap is waiting.',
          'Hunt the word doing double duty: rate versus amount, clinical measure versus felt relief.',
          'Reject tension restaters: "it is complex" is not a mechanism.',
          'Weakening a fact is not reconciling it — every stated fact must survive fully intact.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'What is the difference between a merely surprising pair of facts and a genuinely inconsistent pair?',
        answer:
          'A merely surprising pair seems incompatible but can coexist given missing context — this is what Resolve questions test. A genuinely inconsistent pair cannot coexist under any context (it would be arithmetically or logically impossible). The LSAT tests the former; if you think a fact must be false, you are falling for the trap.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 2.23: Rare LR Formulations — the grab-bag finale, where you learn to translate unfamiliar stems into the question types you have already mastered.',
      },
    ],
  },
  {
    id: '2.23',
    stage: 2,
    title: 'Rare LR Formulations',
    estimatedMinutes: 9,
    skills: ['lr-method'],
    prerequisites: ['lr-main-conclusion', 'lr-argument-part', 'lr-point-at-issue'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Most Logical Reasoning questions wear familiar uniforms — you have learned twenty-two of them. But a handful of questions arrive in disguise: odd stems, unusual formats, hybrids of two types. Students panic at the unfamiliar wording and abandon everything they know. Do not. There are no new reasoning skills hiding in these questions — only familiar tasks described in unfamiliar words. Your entire strategy for rare formulations is translation: read the odd stem, ask "which familiar job is this really asking for?", and then do that job. This lesson is a field guide to the disguises.`,
      },
      {
        kind: 'keyterm',
        term: 'Stem translation',
        definition:
          'The habit of converting an unfamiliar question stem into the familiar question type it is actually testing — then applying that type\u2019s standard method unchanged.',
      },
      {
        kind: 'prose',
        md: `Meet the rare formulations and their translations:

- "The author mentions the shuttle buses in order to…" → **Argument Part**: what job does that sentence do? (Lesson 2.2.)
- "Which of the following best describes the author's argumentative strategy?" → **Method of Reasoning**: name the technique abstractly. (Lesson 2.3.)
- "The statements above best support the claim that the author would agree with…" → a soft **Must Be True** about the author's commitments. (Lesson 2.6.)
- "Which of the following is the best criticism of the argument?" → **Flaw**: name the break. (Lesson 2.9.)
- "The dialogue suggests that the speakers would agree that…" → the mirror of **Point at Issue**: find the shared commitment. (Lesson 2.4.)
- "Which of the following, if true, would best explain the author's reasoning in…" → a **Resolve**-flavored accommodation of the argument's own claims. (Lesson 2.21.)

The pattern: strip the novel phrasing, find the familiar verb — mentions *in order to*, *strategy*, *would agree*, *criticism* — and match it to the type whose method you already own.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Translate: "Which of the following is the best criticism of the argument?" Which lesson\u2019s method do you apply?',
        answer:
          'That is a Flaw question in disguise (lesson 2.9). "Criticism of the argument" means the reasoning\u2019s defect — find the gap between premises and conclusion and match its abstract description, exactly as on a standard flaw stem.',
      },
      {
        kind: 'example',
        title: 'Tiny example: "in order to"',
        body: `Stimulus: "The Harborview night market drew 40,000 visitors. Although parking is limited, shuttle buses run every fifteen minutes. The market has been a success."
Question: "The author mentions the shuttle buses in order to…"

Translation: this is an Argument Part question (lesson 2.2) about one sentence's job. The shuttle sentence answers the parking worry — it defends the success claim against an anticipated objection. Correct: "to rebut a potential objection to the claim that the market has been a success." A choice like "to describe the market's transportation options" states the sentence's content, not its job — the classic role-question trap. Translate first, and the familiar method handles it.`,
      },
      {
        kind: 'worked',
        title: 'Translating a hybrid stem',
        steps: [
          {
            label: 'Step 1 — Read the stem twice and find the familiar verb',
            body: `Stem: "Which of the following claims would the author of the passage be most likely to agree with?" The familiar verb is "agree with" — this is about the author's commitments. Translation: a soft Must Be True (lesson 2.6/2.7) — which claim is best supported by what the author said? The stimulus: "The city's bike-share program is popular, but popularity is a poor measure of transportation value. What matters is whether the program reduces car trips, and the city's own data show it does not."`,
          },
          {
            label: 'Step 2 — Determine what the author is committed to',
            body: `The author is committed to: popularity ≠ value, and the program fails the real test (reducing car trips). So the author would likely agree that the program is not a transportation success — or more carefully, that its popularity does not show it is valuable. Note the softness: "most likely to agree with" invites the best-supported claim, not a guaranteed one — lesson 2.7's calibration.`,
          },
          {
            label: 'Step 3 — Test choices against the commitments',
            body: `Correct: "A popular transportation program is not necessarily a valuable one." Directly supported. Trap: "The bike-share program should be shut down" — the author never recommends shutdown; this exceeds the commitments. Trap: "Car trips are the only measure of transportation value" — "what matters is whether" is strong but "the only measure" overclaims; the author names one key measure, not the sole one. Translation kept you in inference mode instead of drifting into recommendation mode.`,
          },
          {
            label: 'Step 4 — Generalize the habit',
            body: `Whenever a stem feels alien, ask two questions: "What is this asking me to produce — a conclusion, a flaw name, a role, a commitment?" and "Which lesson taught me to produce exactly that?" Answer those, and the disguise falls away. Rare stems test composure, not new content. The LSAT has a finite set of reasoning moves; you now own all of them.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'An unfamiliar stem means an unfamiliar task requiring a new technique.',
        right:
          'Unfamiliar stems test familiar tasks. The LSAT\u2019s reasoning moves are finite, and you have studied every one. When the wording surprises you, translate — do not invent. A new technique improvised under pressure is almost always worse than the standard method you already trust.',
      },
      {
        kind: 'checkpoint',
        prompt: `Stimulus: "The new dam will provide water for decades because the reservoir is the largest ever built. But the region's rainfall has declined every year for a decade." Question: "Which of the following best describes the author's argumentative strategy?" What type is this, and which choice fits?`,
        choices: [
          'Flaw: it confuses the size of the reservoir with the adequacy of the water supply.',
          'Method: it supports a prediction with a single consideration, then notes a fact that undermines that consideration.',
          'Weaken: declining rainfall undermines the dam\u2019s usefulness.',
          'Point at Issue: the author disagrees with the engineers about the dam.',
        ],
        correctIndex: 1,
        explanation:
          'The stem asks for the "argumentative strategy" — that is Method of Reasoning (lesson 2.3) in disguise: describe the technique abstractly. The author offers one supporting consideration (largest reservoir) for a prediction, then introduces a concession-like fact (declining rainfall) that cuts against it — the second choice describes exactly that structure. The first choice names a flaw, but the stem did not ask for a criticism; answering a different question than asked is a classic rare-stem trap. The third weakens the dam proposal, which is not the author\u2019s job here. The fourth invents a dialogue with engineers that does not exist.',
      },
      {
        kind: 'example',
        title: 'Deeper: when two translations compete',
        body: `Occasionally a stem sits between two types: "Which of the following, if true, would most help to explain why the author's conclusion might still be correct despite the rainfall data?" Is this Strengthen or Resolve? Both translations are defensible — and that is fine, because both methods converge here: find the fact that accommodates the rainfall decline while preserving the dam's promise (a hidden water source, say). When translations compete, pick the method whose tools fit the stimulus best and proceed with confidence. The types are a map, not a cage.`,
      },
      { kind: 'tryit', drillIds: ['d-f146', 'd-f152'] },
      {
        kind: 'summary',
        points: [
          'Rare stems test familiar tasks in unfamiliar words — translate, do not invent.',
          'Find the familiar verb in the stem ("in order to," "strategy," "would agree," "criticism") and match it to its lesson.',
          'Apply the matched type\u2019s standard method unchanged — the disguise changes nothing about the work.',
          'Answer the question actually asked: a Method stem wants a technique description, not a flaw name.',
          'When two translations compete, choose the method whose tools fit the stimulus and proceed confidently.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'You meet a stem you have never seen before. What are the two questions to ask yourself?',
        answer:
          'First: "What is this asking me to produce — a conclusion, a flaw name, a role, a commitment?" Second: "Which lesson taught me to produce exactly that?" Answering those translates the disguise into a familiar task with a trusted method.',
      },
      {
        kind: 'next',
        text: 'Stage 2 complete. You can now identify, dissect, and evaluate every Logical Reasoning question type: finding conclusions, mapping structure, drawing inferences, spotting flaws, weakening and strengthening, handling assumptions, applying principles, matching parallel arguments, and resolving paradoxes. Stage 3 will put these skills under timed, mixed-set pressure.',
      },
    ],
  },
];
