/**
 * Stage 3 — LR integration (lessons 3.1–3.4).
 * All stimuli, stems, choices, and explanations are original.
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

export const LESSONS_3: Lesson[] = [
  {
    id: '3.1',
    stage: 3,
    title: 'Stem Identification Until Automatic',
    estimatedMinutes: 12,
    skills: [
      'lr-main-conclusion',
      'lr-argument-part',
      'lr-method',
      'lr-point-at-issue',
      'lr-must-be-true',
      'lr-most-strongly-supported',
      'lr-flaw',
      'lr-weaken',
      'lr-strengthen',
      'lr-evaluate',
      'lr-necessary-assumption',
      'lr-sufficient-assumption',
      'lr-nec-vs-suff',
      'lr-principle-support',
      'lr-principle-application',
      'lr-parallel-reasoning',
      'lr-parallel-flaw',
      'lr-resolve-paradox',
    ],
    prerequisites: ['f-premise-conclusion', 'f-indicators', 'f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `On test day, no question arrives with a label. Nobody tells you "this one is a Weaken question." The only instruction you get is the **stem** — the question sentence itself. Every lesson in Stage 2 taught you a different tool, but tools only help if you reach for the right one, and the stem is what tells you which tool to pick up.\n\nMisclassifying a stem is one of the most expensive mistakes in Logical Reasoning. Read a Necessary Assumption stem as if it were Sufficient Assumption and you will hunt for a sweeping conditional that the argument never needed. Read a Strengthen stem as a Flaw question and you will eliminate the right answer for the wrong reason. The goal of this lesson: you look at any stem and, within seconds, name its type and its tool. Automatic.`,
      },
      {
        kind: 'keyterm',
        term: 'Question stem',
        definition:
          'The question sentence attached to a stimulus (e.g. "Which of the following most weakens the argument?"). The stem tells you two things: the task (what the correct answer must do) and the standard (how strongly it must do it). Classifying the stem means naming its question type before you read the argument.',
      },
      {
        kind: 'example',
        title: 'Two stems, two different jobs',
        body: `Stem A: "Which of the following, if true, most weakens the argument above?"\n\nStem B: "The argument depends on assuming which of the following?"\n\nBoth stems may sit above very similar arguments about, say, a city's recycling program. But Stem A asks you to **damage** the argument — find new information that makes the conclusion less believable. Stem B asks you to find something the argument **cannot live without** — a hidden load-bearing assumption. Different task, different standard, different correct answer. Same argument, two totally different questions. The stem decides what you are looking for before you read a single line of the stimulus.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what two things does a question stem tell you?',
        answer:
          'The task — what the correct answer must do (weaken, strengthen, identify the conclusion, and so on) — and the standard — how strongly it must do it (e.g. "most weakens" asks for damage, "must be true" demands certainty).',
      },
      {
        kind: 'worked',
        title: 'Classifying four stems, step by step',
        steps: [
          {
            label: 'Step 1 — Hunt the operative words, not the topic',
            body: `Read each stem and circle the words that describe the job:\n\n1. "The main point of the argument is that…"\n2. "The argument requires the assumption that…"\n3. "Which of the following most helps to explain the discrepancy described above?"\n4. "The pattern of reasoning in the argument above is most similar to that in which of the following?"\n\nThe operative words are "main point," "requires the assumption," "explain the discrepancy," and "pattern of reasoning … most similar." The topic (recycling, voting, whatever) is irrelevant to classification.`,
          },
          {
            label: 'Step 2 — Name the type',
            body: `Stem 1 is **Main Conclusion**: it asks you to select the claim the argument is driving toward. Stem 2 is **Necessary Assumption** ("requires," "depends on," "presupposes" are the giveaway words). Stem 3 is **Resolve the Paradox**: "discrepancy" and "explain" signal two facts that seem to clash. Stem 4 is **Parallel Reasoning**: "pattern of reasoning … most similar" asks you to match argument structure, not content.`,
          },
          {
            label: 'Step 3 — Name the tool each type demands',
            body: `Main Conclusion → find the sentence everything else supports. Necessary Assumption → apply the negation test: negate each candidate and see which one the argument cannot survive without. Resolve the Paradox → find the missing fact that lets both surprising statements be true at once. Parallel Reasoning → abstract the structure (premise shape, conclusion shape, key moves) and match it, ignoring the subject matter.`,
          },
          {
            label: 'Step 4 — Notice what classification just bought you',
            body: `Before reading the stimulus, you already know your reading goal for each: for stem 1 you read hunting the conclusion; for stem 2 you read hunting load-bearing gaps; for stem 3 you read holding the two clashing facts side by side; for stem 4 you read mapping the skeleton. Classification does not answer the question — it tells you what to look for while reading, which is half the work.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'I will read the stimulus first and figure out the question type afterward. Understanding the argument is the main work anyway.',
        right: 'Read the stem first, always. The stem sets your reading goal: it tells you whether to hunt for the conclusion, the gap, the flaw, or the structure. Reading the stimulus without a goal means reading it twice — once aimlessly, once with purpose — and that is the slower path, not the faster one.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Classify this stem: "The reasoning in the argument is most vulnerable to criticism on the grounds that it…"',
        choices: [
          'Weaken — find new information that damages the argument',
          'Flaw — name the error already present in the reasoning',
          'Necessary Assumption — find what the argument depends on',
          'Strengthen — find new information that supports the argument',
        ],
        correctIndex: 1,
        explanation:
          'This is a Flaw stem: "vulnerable to criticism on the grounds that it…" asks you to describe the defect already inside the reasoning. Weaken looks similar but adds new information from the answer choices to damage the argument, whereas Flaw points at an error the argument itself committed. Necessary Assumption asks what the argument needs, and Strengthen asks for help — both are different jobs. The phrase "vulnerable to criticism" is one of the standard Flaw signals, alongside "flawed," "questionable," and "fails to consider."',
      },
      {
        kind: 'example',
        title: 'Deeper: the stem-sort map',
        body: `Every LR stem belongs to one of these families. Learn the keywords and the sorting becomes reflex:\n\n- **Describe the argument:** "main point," "main conclusion," "primarily serves to," "role played by," "method of reasoning," "point at issue," "disagree about" → Main Conclusion, Argument Part, Method, Point at Issue.\n- **Must be true:** "must be true," "properly inferred," "most strongly supported," "follows logically" → Must Be True, Most Strongly Supported.\n- **Attack or defend:** "most weakens," "most strengthens," "calls into question," "undermines," "vulnerable to criticism" (flaw, not weaken), "fails to consider" → Flaw, Weaken, Strengthen, Evaluate.\n- **Assumptions:** "depends on assuming," "requires," "presupposes," "must assume" → Necessary; "enables the conclusion to be properly drawn," "follows logically if assumed," "allows the conclusion" → Sufficient.\n- **Principles:** "conforms to the principle," "illustrates the principle," "justified by" → Principle Support, Principle Application.\n- **Match the structure:** "most similar in its pattern of reasoning," "parallel," "most closely parallels the flaw" → Parallel Reasoning, Parallel Flaw.\n- **Resolve:** "explain the discrepancy," "reconcile," "accounts for the apparent paradox" → Resolve the Paradox.\n\nWhen two stems look alike, the keyword decides. "Strengthens" and "sufficient assumption" both add support — but "strengthens" asks only for help, while "follows logically if assumed" demands a guarantee.`,
      },
      { kind: 'tryit', drillIds: ['d-c031', 'd-c033', 'd-c036', 'd-c039'] },
      {
        kind: 'summary',
        points: [
          'Read the stem before the stimulus, every time — the stem sets your reading goal.',
          'A stem tells you the task (what the answer must do) and the standard (how strongly).',
          'Classify by operative keywords, not topic: "requires" signals necessary assumption, "most weakens" signals weaken.',
          'Each type has its own tool (negation test, gap closure, structure matching); the classification chooses the tool.',
          'The costliest errors come from near-neighbors: strengthen vs. sufficient assumption, flaw vs. weaken.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Name the three stems of the "assumption family" and the tool each one demands.',
        answer:
          'Necessary assumption ("depends on," "requires," "presupposes") → the negation test: negate each choice and keep the one the argument cannot survive without. Sufficient assumption ("enables the conclusion to be properly drawn," "follows logically if") → gap closure: insert each choice and check whether the conclusion then follows with certainty. Strengthen is often filed here by mistake, but it is its own type: it only needs to help, not guarantee.',
      },
      {
        kind: 'next',
        text: 'Stem sorting is the foundation. Next, lesson 3.2: Two-Type Discrimination Then Four-Type Discrimination — where you train the boundaries between the most confused pairs until they stop blurring.',
      },
    ],
  },
  {
    id: '3.2',
    stage: 3,
    title: 'Two-Type Discrimination, Then Four-Type',
    estimatedMinutes: 14,
    skills: [
      'lr-necessary-assumption',
      'lr-sufficient-assumption',
      'lr-nec-vs-suff',
      'lr-strengthen',
      'lr-weaken',
      'lr-flaw',
      'lr-evaluate',
      'lr-must-be-true',
      'lr-most-strongly-supported',
    ],
    prerequisites: ['f-assumption', 'f-deduction', 'f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Knowing each question type in isolation is not the same as telling two similar types apart under pressure. Most missed LR questions are not failures of logic — they are failures of discrimination. The student who confuses Necessary with Sufficient Assumption does not lack the negation test; they reach for the wrong tool because the stems blurred together.\n\nDiscrimination is a trainable skill, and the training method is simple: alternate the two confusing types back to back until the boundary between them becomes automatic, then widen to four. This lesson teaches you the method and walks you through the highest-value pairs.`,
      },
      {
        kind: 'keyterm',
        term: 'Discrimination drill',
        definition:
          'A practice set that alternates two (then four) easily confused question types on similar-looking stimuli. The point is not to answer each question but to name, for each one, which type it is and why — training the classification reflex where it is weakest.',
      },
      {
        kind: 'example',
        title: 'The classic pair: necessary vs. sufficient',
        body: `Stem A: "Which of the following is an assumption the argument requires?"\n\nStem B: "The conclusion follows logically if which of the following is assumed?"\n\nStem A asks what the argument **cannot live without** — the negation test is the tool, and the answer will be modest. Stem B asks what would **make the conclusion airtight** — gap closure is the tool, and the answer will typically be a sweeping conditional.\n\nThe tell: "requires" and "depends on" point to necessity. "Follows logically if," "enables the conclusion," and "properly drawn if" point to sufficiency. In a two-type drill you would answer ten of these alternating A, B, A, B — classifying each before reading the stimulus — until the keywords trigger the right tool without thought.`,
      },
      {
        kind: 'retrieval',
        prompt: 'State the tool for a necessary-assumption stem and the tool for a sufficient-assumption stem, in one sentence each.',
        answer:
          'Necessary assumption: the negation test — negate each choice and keep the one whose falsity collapses the argument. Sufficient assumption: gap closure — insert each choice and keep the one that makes the conclusion follow with certainty.',
      },
      {
        kind: 'worked',
        title: 'Running a four-type drill on one argument',
        steps: [
          {
            label: 'Step 1 — Fix one argument, vary the stem',
            body: `Take one argument and hold it constant: "The town's new bike-share program has been running for a year. Membership has doubled, yet downtown traffic congestion is unchanged. Therefore the program has failed to reduce car use."\n\nNow run four stems against it: (1) "most weakens," (2) "most strengthens," (3) "the argument is most vulnerable to criticism because it…," (4) "which of the following would be most useful to know in evaluating the argument?" Classify each before continuing: Weaken, Strengthen, Flaw, Evaluate.`,
          },
          {
            label: 'Step 2 — Weaken: attack the link',
            body: `Weaken wants new information that damages the conclusion. Here: "Most new members previously walked or took the bus rather than driving" — if members were never drivers, unchanged congestion says nothing about the program. Notice the tool: you are looking for an alternate explanation or a broken premise-to-conclusion link.`,
          },
          {
            label: 'Step 3 — Strengthen: defend the link (and notice it is not sufficient)',
            body: `Strengthen wants help, not a guarantee: "Surveys show 40 percent of members sold a car after joining" — supports, but does not prove, reduced car use. This is where discrimination matters: a Strengthen answer that merely helps would be wrong on a Sufficient Assumption stem, which demands certainty. Same direction, different standard.`,
          },
          {
            label: 'Step 4 — Flaw vs. Evaluate: name the error, then the test',
            body: `Flaw asks you to describe the defect already in the reasoning: "it treats unchanged congestion as proof that no members stopped driving, ignoring that other factors may have increased traffic." Evaluate asks what information would discriminate: "Did overall downtown traffic from other sources grow during the year?" If yes, the program may have worked; if no, it likely failed. Flaw looks backward at the error; Evaluate looks forward at the missing test.`,
          },
          {
            label: 'Step 5 — Extract the discrimination rules',
            body: `From one argument you now own four boundaries: Weaken damages with new facts; Strengthen helps without guaranteeing; Flaw names an error already committed; Evaluate identifies the question whose answer would decide the matter. When you drill, say the boundary aloud for each item: "This is Evaluate, not Weaken, because the stem asks what would help determine, not what damages." Saying it is what makes it stick.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If an answer choice strengthens the argument, it is a fine answer to a sufficient-assumption question — both are about supporting the conclusion.',
        right: 'Strengthen and Sufficient Assumption have different standards, and the standard is the whole game. "Most strengthens" needs only to help — a nudge counts. "Follows logically if assumed" demands a guarantee: with the answer added, the conclusion must be airtight. A choice that merely helps will be a tempting wrong answer on a sufficient-assumption question every time.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Classify this stem: "The conclusion of the argument follows logically if which one of the following is assumed?"',
        choices: [
          'Necessary Assumption — apply the negation test',
          'Sufficient Assumption — close the gap so the conclusion is guaranteed',
          'Strengthen — find the choice that most helps the argument',
          'Evaluate — find the question whose answer would decide the matter',
        ],
        correctIndex: 1,
        explanation:
          'This is a Sufficient Assumption stem: "follows logically if … assumed" asks for the missing piece that would make the conclusion airtight, so the tool is gap closure — insert each choice and check whether the conclusion then follows with certainty. It is not Necessary Assumption, because the stem never says the argument requires or depends on the assumption; a sufficient assumption is often stronger than anything the argument strictly needs, so the negation test misfires here. It is not Strengthen, because "most helps" is a lower standard than a logical guarantee. And it is not Evaluate, because the stem does not ask what information would help judge the argument.',
      },
      {
        kind: 'example',
        title: 'Deeper: the pairs worth drilling first',
        body: `Not all confusions are equal. Drill these pairs first, in this order:\n\n1. **Necessary vs. Sufficient Assumption** — the most expensive confusion on the test. Keywords decide: "requires/depends" vs. "follows logically if/enables."\n2. **Weaken vs. Flaw** — both criticize, but Weaken adds new damaging facts while Flaw describes an error already in the reasoning.\n3. **Strengthen vs. Sufficient Assumption** — same direction, different standard: help vs. guarantee.\n4. **Must Be True vs. Most Strongly Supported** — certainty vs. best-supported; the second tolerates a small step beyond the text.\n5. **Method vs. Argument Part** — Method describes the whole argumentative move; Argument Part asks what one sentence is doing.\n6. **Evaluate vs. Weaken/Strengthen** — Evaluate asks what you would want to know; the answer is a question whose resolution could go either way.\n\nFor each pair, the drill format is the same: ten items, alternating types, classify aloud before reading the stimulus. When two-type feels easy — you are classifying in under five seconds with no errors — widen to four types: necessary, sufficient, strengthen, evaluate on the assumption family; or flaw, weaken, strengthen, method on the critique family.`,
      },
      { kind: 'tryit', drillIds: ['d-c041', 'd-c043', 'd-c045', 'd-c047'] },
      {
        kind: 'summary',
        points: [
          'Most LR errors are discrimination errors: the right tool applied to the wrong type.',
          'Drill confusable pairs back to back — classify aloud before reading the stimulus.',
          'Necessary ("requires") = negation test, modest answers; Sufficient ("follows logically if") = gap closure, sweeping answers.',
          'Strengthen helps; Sufficient Assumption guarantees. Weaken adds damage; Flaw names an existing error.',
          'Move from two-type to four-type drills only when classification is instant and error-free.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A study partner says "Weaken, Strengthen, and Evaluate are basically the same — they are all about evidence." Give the two-sentence correction.',
        answer:
          'They differ in task and standard: Weaken asks for new information that damages the conclusion, Strengthen asks for information that helps it, and Evaluate asks for the question whose answer would discriminate between the two. Filing them together means reaching for "find damaging facts" on an Evaluate stem, where the right move is "find the test that could go either way."',
      },
      {
        kind: 'next',
        text: 'Discrimination trained. Next, lesson 3.3: Pacing Introduction — because the right tool used too slowly still loses points, and every question is worth exactly one.',
      },
    ],
  },
  {
    id: '3.3',
    stage: 3,
    title: 'Pacing Introduction',
    estimatedMinutes: 10,
    skills: [
      'lr-main-conclusion',
      'lr-must-be-true',
      'lr-flaw',
      'lr-weaken',
      'lr-strengthen',
      'lr-necessary-assumption',
    ],
    prerequisites: ['f-premise-conclusion', 'f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Logical Reasoning sections are timed, and the clock does not grade on a curve. Every question is worth exactly one point — the two-minute Parallel Reasoning puzzle and the twenty-second Main Conclusion question count the same. That single fact determines all pacing strategy: your job is not to answer every question perfectly, it is to collect the most points the clock allows.\n\nThe math is straightforward. A section gives you about 35 minutes for roughly 25 questions, which is about **85 seconds per question on average** — a minute and a half. Some questions will take 30 seconds; some will take two and a half minutes. Pacing is the discipline of keeping the average honest: never letting one question consume the time that belongs to two others.`,
      },
      {
        kind: 'keyterm',
        term: 'Time sink',
        definition:
          'A question that consumes far more than its share of the clock — typically dense Parallel Reasoning items, long conditional chains, or any question you have re-read three times without progress. The defining feature is not difficulty but the ratio of time spent to points earned: past about two and a half minutes, almost no question is worth continuing.',
      },
      {
        kind: 'example',
        title: 'The two-and-a-half-minute rule',
        body: `You are on a Parallel Flaw question. You have matched the structure against choices A, B, and C, eliminated two, and are now going back and forth between D and E. You glance at the clock: 2 minutes 40 seconds on this question.\n\nThe rule: at 2:30 with no clear answer, you **flag, pick your best guess, and move on**. Here is why the math favors it. The question is worth one point. The 90 seconds you would spend agonizing between D and E could instead answer an easy Main Conclusion question later in the section — also worth one point, with near-certain accuracy. Grinding does not raise your expected score past the two-and-a-half-minute mark; it lowers it, because it steals time from questions you would have gotten right.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what is the recommended average pace per LR question, and what is the bail-out rule?',
        answer:
          'About 85 seconds per question on average (roughly a minute and a half). The bail-out rule: if you have no clear answer by about two and a half minutes, flag the question, record your best guess, and move on — return only if time remains.',
      },
      {
        kind: 'worked',
        title: 'The two-pass strategy, minute by minute',
        steps: [
          {
            label: 'Step 1 — Pass one: collect the easy points (minutes 0–25)',
            body: `Work the section in order, but treat every question as a triage decision, not a commitment. If you can see the path within about 30 seconds of reading, solve it and move on. If the question looks dense — long stimulus, abstract structure, "which of the following most closely parallels" — or if you have read the stimulus twice without a foothold, flag it, enter a provisional answer, and keep moving. The goal of pass one is to bank every point you can get cheaply. Most test-takers find 15–18 questions fall in this bucket.`,
          },
          {
            label: 'Step 2 — Never leave a question blank',
            body: `When you flag a question, always record a best guess before moving on. There is no penalty for wrong answers, so a blank is a guaranteed zero while a guess is a free lottery ticket. More importantly, the provisional answer frees your mind: you are no longer "abandoning" the question, you are deferring it. That psychological difference is what makes the skipping strategy sustainable under pressure.`,
          },
          {
            label: 'Step 3 — Pass two: spend the surplus on flagged questions (minutes 25–32)',
            body: `With the easy points banked, return to flagged questions in order of expected value — the ones where you were closest to an answer first. You now have two advantages you lacked in pass one: the rest of the section is secure, and your subconscious has been working on the flagged items in the background. Many students find that a question that resisted them at minute 8 unravels in 40 seconds at minute 28.`,
          },
          {
            label: 'Step 4 — Reserve the last minutes for review, not new work',
            body: `Aim to finish pass two with 3–5 minutes left. Use that time to check flagged questions once more and to verify any question where you changed an answer — changes made in a panic are a classic score leak. Do not start a brand-new hard question in the final two minutes; the expected value of a rushed Parallel Reasoning item is lower than the expected value of double-checking three answers you already worked.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If I just think harder about each question, I will get it right — so spending as long as it takes on each one maximizes my score.',
        right: 'Thinking harder has diminishing returns and a hard deadline. Past about two and a half minutes, extra time on one question mostly buys you the same coin flip you already had — while costing you a full point on an easy question you never reach. Score maximization is time allocation, not perfection per question.',
      },
      {
        kind: 'checkpoint',
        prompt: 'You have spent 2:30 on a Parallel Reasoning question. Eight questions remain and 10 minutes are left on the clock. What is the best move?',
        choices: [
          'Keep working — Parallel Reasoning questions are worth the time once you crack the structure',
          'Flag the question, record your best guess, and move on to the remaining questions',
          'Re-read the stimulus twice more, slowly, to make sure you understand it fully',
          'Skip the rest of the section and devote the 10 minutes to this one question',
        ],
        correctIndex: 1,
        explanation:
          'Flag it, guess, and move on. With 8 questions and 10 minutes left you are already behind the 85-second average, so every additional minute on this one question is a minute stolen from questions you have not seen yet — each worth the same single point. Parallel Reasoning items are the classic time sink: they reward structure-matching, but past two and a half minutes the return on more grinding collapses. Recording a best guess first means the question is never a zero, and you can return to it if pass two leaves surplus time. The other options all violate the same principle: they spend scarce minutes where the expected payoff is lowest.',
      },
      {
        kind: 'example',
        title: 'Deeper: know your time sinks in advance',
        body: `Time sinks are predictable by type, so you can spot them before they eat your clock:\n\n- **Parallel Reasoning and Parallel Flaw:** five full arguments to structure-match. Budget extra time or defer; never grind past 3 minutes.\n- **Dense conditional chains:** "If A then B, unless C, in which case D…" — diagram once, carefully; if the diagram does not resolve it, flag.\n- **Long principle-application stems:** the answer choices are paragraphs. Read the principle once, paraphrase it in plain words, then match — do not re-read the choices repeatedly.\n- **"Which of the following would be most useful to know" with abstract topics:** these reward a 10-second pause to state the test explicitly ("I need the number of new drivers, because…") before touching the choices.\n\nThe skipping strategy is not weakness; it is triage. Surgeons do it, pilots do it, and high scorers do it. The skill to practice is the *decision* — recognizing at 30 seconds, not 3 minutes, that this question belongs in pass two.`,
      },
      { kind: 'tryit', drillIds: ['d-c032', 'd-c035', 'd-c038'] },
      {
        kind: 'summary',
        points: [
          'Every question is worth one point: allocate time by expected value, not by difficulty.',
          'Target about 85 seconds per question on average; bail out at roughly 2:30 with no clear answer.',
          'Two passes: bank the easy points first (flagging with a provisional guess), then spend the surplus on hard ones.',
          'Never leave a blank — there is no wrong-answer penalty, so every guess is free.',
          'Reserve the final 3–5 minutes for review, not for starting new hard questions.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Describe the two-pass strategy in two sentences, as you would explain it to a study partner.',
        answer:
          'On pass one, work in order but flag anything dense or stuck after about 30 seconds — always recording a best guess — so you bank every cheap point first. On pass two, return to flagged questions with your remaining time, closest-to-solved first, and keep the last few minutes for review rather than new hard questions.',
      },
      {
        kind: 'next',
        text: 'Pacing principles set. Next, lesson 3.4: Removing the Labels — full practice with no type names anywhere, where you diagnose each question yourself under pressure.',
      },
    ],
  },
  {
    id: '3.4',
    stage: 3,
    title: 'Removing the Labels',
    estimatedMinutes: 15,
    skills: [
      'lr-main-conclusion',
      'lr-argument-part',
      'lr-method',
      'lr-point-at-issue',
      'lr-must-be-true',
      'lr-most-strongly-supported',
      'lr-flaw',
      'lr-weaken',
      'lr-strengthen',
      'lr-evaluate',
      'lr-necessary-assumption',
      'lr-sufficient-assumption',
      'lr-nec-vs-suff',
      'lr-principle-support',
      'lr-principle-application',
      'lr-parallel-reasoning',
      'lr-parallel-flaw',
      'lr-resolve-paradox',
    ],
    prerequisites: ['f-premise-conclusion', 'f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Stages 1 and 2 taught you each skill with the label visible. Stage 3 so far has trained classification and discrimination as explicit exercises. Now the labels come off — permanently. From here on, every question you meet looks exactly like test day: a stimulus, a stem, five choices, and no one telling you what kind of question it is.\n\nThis is a distinct skill, not just "more practice." Self-diagnosing under pressure means running a fast, reliable routine — stem, type, tool, then read — when the clock is running and the stem is trying to look like three different types at once. This lesson installs that routine and then makes you run it.`,
      },
      {
        kind: 'keyterm',
        term: 'Self-diagnosis',
        definition:
          'Naming the question type and its required tool from the stem alone, in under ten seconds, before reading the stimulus. The routine is: read the stem → name the type → name the tool and standard → read the stimulus with that goal → prephrase → eliminate.',
      },
      {
        kind: 'example',
        title: 'The ten-second routine on an unlabeled question',
        body: `Stem: "Which of the following, if true, would most help to determine whether the proposed policy will achieve its goal?"\n\nRun the routine. Read the stem: the operative phrase is "most help to determine whether." Name the type: **Evaluate** — it asks for the test, the question whose answer would discriminate. Name the tool and standard: look for a choice phrased as an open question or a fact whose two possible values point in opposite directions; "help" here means discriminate, not merely support. Only now do you read the stimulus — and you read it hunting for the hinge: the one unknown that the policy's success turns on. Ten seconds of diagnosis buys you a focused read instead of a wandering one.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: recite the self-diagnosis routine in order.',
        answer:
          'Read the stem first, name the question type from its keywords, name the tool and standard that type demands, then read the stimulus with that reading goal — and only then prephrase an answer and eliminate choices.',
      },
      {
        kind: 'worked',
        title: 'A full unlabeled question, diagnosed live',
        steps: [
          {
            label: 'Step 1 — Stem first, diagnose before reading',
            body: `The question: "The city's plan to reduce late-night noise by closing downtown bars an hour earlier will fail, because most noise complaints come from construction sites, not bars."\n\nStem: "Which of the following, if true, most seriously calls the argument into question?"\n\nDiagnosis: "calls into question" = **Weaken**. Tool: find new information that damages the conclusion (the plan will fail). Standard: "most seriously" — compare the damage each choice does.`,
          },
          {
            label: 'Step 2 — Read with the Weaken goal: find the link to break',
            body: `The argument's move: most complaints come from construction sites → therefore closing bars early will not reduce noise. The hidden link: complaint counts accurately track actual noise sources. A Weaken answer will attack that link or offer an alternate story — for example, that construction noise already stops at 10 p.m. under existing rules, so bars are in fact the main late-night source. Prephrase before looking: "something showing complaints mismeasure the real noise, or bars are the real late-night problem."`,
          },
          {
            label: 'Step 3 — Eliminate by task, not by topic',
            body: `Suppose the choices include: (A) "Some residents support the earlier closing time" — irrelevant to whether the plan works. (B) "Construction sites are already barred from operating after 10 p.m." — this severs the argument's link: if construction is already silent at night, the complaint data says nothing about late-night noise, and bars may be the true source. (C) "The city has tried noise ordinances before" — background, no damage. (D) "Bar owners oppose the plan" — who opposes it does not affect whether it works. Weaken means damage to the conclusion; only (B) does that work.`,
          },
          {
            label: 'Step 4 — Check the diagnosis, not just the answer',
            body: `Verify you answered the question asked: the stem wanted damage to the argument, and (B) damages it by undermining the evidence. A common self-diagnosis failure here would be filing this as Flaw ("the argument confuses complaint counts with noise") — true as far as it goes, but the stem asked for new damaging information, not a description of the error. Right type, right tool, right answer.`,
          },
          {
            label: 'Step 5 — Generalize the habit',
            body: `Notice what never happened: at no point did anyone announce "this is a Weaken question." You produced that label yourself in step 1, from the keywords "calls into question," and everything downstream — the reading goal, the prephrase, the elimination — followed from it. That is the whole skill. Practice it until the ten seconds feel like one.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'On really hard questions, reading the stimulus first helps me understand what the stem is asking — I can classify after I know what the argument is about.',
        right: 'Hard questions are exactly where stimulus-first reading hurts most. Without a classified stem you have no reading goal, so you absorb details indiscriminately — and the hardest questions are built to punish indiscriminate reading with tempting choices that answer a different question. Diagnose first, especially when it feels hardest.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Unlabeled question. Stimulus: "The library will extend its hours because a survey found that most patrons want evening access." Stem: "Which of the following would be most useful to know in order to evaluate the reasoning above?" What type is this, and what is the correct standard?',
        choices: [
          'Weaken — find the choice that most damages the conclusion',
          'Strengthen — find the choice that most supports the conclusion',
          'Evaluate — find the question or fact whose answer could point either way',
          'Necessary Assumption — find what the reasoning cannot live without',
        ],
        correctIndex: 2,
        explanation:
          'This is an Evaluate question: "most useful to know in order to evaluate" asks for the discriminating test, not for damage or support. The correct standard is a choice whose two possible answers point in opposite directions — for example, "What proportion of the patrons surveyed actually visit the library in the evening?" If most do, the survey supports the extension; if few do, wanting access and using it are different things. Weaken and Strengthen are wrong because the stem does not ask you to take a side; it asks what would help you judge. Necessary Assumption is wrong because the stem asks for useful information, not a load-bearing hidden premise — and the negation test does not apply.',
      },
      {
        kind: 'example',
        title: 'Deeper: a five-stem self-diagnosis set',
        body: `Cover the answers, diagnose each stem in under ten seconds, then check:\n\n1. "The argument's conclusion is best expressed by which of the following?" → **Main Conclusion.** Tool: find the sentence everything else supports.\n2. "Which of the following, if true, most undermines the reasoning above?" → **Weaken.** Tool: new damaging information.\n3. "The statements above, if true, most strongly support which of the following?" → **Most Strongly Supported.** Tool: the safest inference; tolerate a small step, reject leaps.\n4. "Which of the following principles most helps to justify the reasoning above?" → **Principle Support.** Tool: the general rule the argument instantiates.\n5. "The error in the reasoning above is most similar to the error in which of the following?" → **Parallel Flaw.** Tool: abstract the flawed structure, match it, ignore content.\n\nIf any of these took more than ten seconds or felt like a guess, that type goes back into your two-type discrimination drills from lesson 3.2. Self-diagnosis is only finished when every common stem classifies instantly — that is the standard test day demands.`,
      },
      { kind: 'tryit', drillIds: ['d-c042', 'd-c044', 'd-c046'] },
      {
        kind: 'summary',
        points: [
          'Test day has no labels: self-diagnosis — stem, type, tool, then read — is itself the skill.',
          'The ten-second routine: read the stem, name the type from keywords, name the tool and standard, read with that goal.',
          'Diagnose especially on hard questions; stimulus-first reading is most dangerous exactly when it feels most helpful.',
          'Near-neighbor stems ("undermines" vs. "vulnerable to criticism") demand keyword precision, not vibes.',
          'Any stem that does not classify instantly goes back into discrimination drills until it does.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A stem reads "most strongly supported." What do you prephrase, and what trap is waiting?',
        answer:
          'You prephrase the safest inference the statements allow — something that must nearly follow, tolerating only a small step beyond the text. The waiting traps are the too-strong choice (a leap the evidence cannot carry) and the restates-a-premise choice (true but adding nothing, which "most strongly supported" does not ask for).',
      },
      {
        kind: 'next',
        text: 'Stage 3 complete — you can now classify, discriminate, pace, and self-diagnose. Next, Stage 4 begins: Reading Comprehension foundations, starting with lesson 4.1: What LSAT Reading Comprehension Tests.',
      },
    ],
  },
];
