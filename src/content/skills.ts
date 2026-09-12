/**
 * LSAT Compass — full skill catalog.
 *
 * The skill graph is the spine of the curriculum: every lesson, question, and
 * drill references skill ids from this list, and prerequisites form a directed
 * acyclic graph (a skill is always taught after its prerequisites).
 *
 * Contract: content-schema.md §2.
 */

export interface Skill {
  /** e.g. "f-conditional", "lr-necessary-assumption" */
  id: string;
  /** 0|1|2|3|4|5|6|7|8|9|10 — 10 = writing */
  stage: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  /** Formal title, e.g. "Conditional Logic" */
  title: string;
  /** Beginner gloss, e.g. "If-then reasoning" */
  plainTitle: string;
  /** 1–2 sentences, beginner-friendly */
  description: string;
  /** Skill ids; every id must exist in this catalog; the graph must be acyclic */
  prerequisites: string[];
  /** 3 = highest LSAT frequency, 2 = standard, 1 = informational */
  importance: 1 | 2 | 3;
}

export const SKILLS: Skill[] = [
  // ------------------------------------------------------------------
  // Stage 1 — Reasoning Foundations
  // ------------------------------------------------------------------
  {
    id: 'f-argument',
    stage: 1,
    title: 'Arguments',
    plainTitle: 'Spotting an argument',
    description:
      'Learn to tell a real argument — a claim backed by reasons — apart from ' +
      'a passage that merely reports facts, tells a story, or describes a situation.',
    prerequisites: [],
    importance: 2,
  },
  {
    id: 'f-premise-conclusion',
    stage: 1,
    title: 'Premises and Conclusions',
    plainTitle: 'Finding the point being made',
    description:
      'Break any argument into its parts: the conclusion, the point the author is ' +
      'trying to make, and the premises, the reasons offered in support of it.',
    prerequisites: ['f-argument'],
    importance: 2,
  },
  {
    id: 'f-indicators',
    stage: 1,
    title: 'Indicator Words',
    plainTitle: 'Words that signal reasons and conclusions',
    description:
      'Recognize clue words like "because," "therefore," and "since" that often mark ' +
      'premises and conclusions — and learn why those clues can sometimes mislead.',
    prerequisites: ['f-premise-conclusion'],
    importance: 2,
  },
  {
    id: 'f-structure',
    stage: 1,
    title: 'Argument Structure',
    plainTitle: 'How an argument is put together',
    description:
      'Map how premises connect to conclusions, including intermediate conclusions ' +
      'and background sentences that play no argumentative role at all.',
    prerequisites: ['f-premise-conclusion'],
    importance: 2,
  },
  {
    id: 'f-assumption',
    stage: 1,
    title: 'Assumptions',
    plainTitle: "What's being taken for granted",
    description:
      'Identify the unstated ideas an argument depends on — the missing links ' +
      'between its premises and its conclusion that the author never says out loud.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'f-deduction',
    stage: 1,
    title: 'Deduction',
    plainTitle: 'What must follow',
    description:
      'Draw conclusions that are guaranteed by the information given, without ' +
      'sneaking in anything the premises never said.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'f-conditional',
    stage: 1,
    title: 'Conditional Logic',
    plainTitle: 'If-then reasoning',
    description:
      'Work with if-then statements: what follows from them, what their ' +
      'contrapositives say, and the classic mistakes of confusing necessary ' +
      'and sufficient conditions.',
    prerequisites: ['f-premise-conclusion'],
    importance: 2,
  },
  {
    id: 'f-translate',
    stage: 1,
    title: 'Translating Conditionals',
    plainTitle: 'Turning English into if-then',
    description:
      'Convert tricky English phrasings — "only if," "unless," "whenever," ' +
      '"the only" — into clean if-then statements you can reason with reliably.',
    prerequisites: ['f-conditional'],
    importance: 2,
  },
  {
    id: 'f-quantifiers',
    stage: 1,
    title: 'Quantifiers',
    plainTitle: 'Words like some, most, and all',
    description:
      'Reason carefully about how much: "some," "most," "many," "few," and "all" ' +
      'each license different conclusions, and mixing them up breaks an argument.',
    prerequisites: ['f-translate'],
    importance: 2,
  },
  {
    id: 'f-causation',
    stage: 1,
    title: 'Causation',
    plainTitle: 'Cause-and-effect claims',
    description:
      'Evaluate claims that one thing causes another, and learn the classic ways ' +
      'causal arguments go wrong — alternative causes, reversed causation, and ' +
      'mere coincidence.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'f-samples',
    stage: 1,
    title: 'Samples and Generalizations',
    plainTitle: 'When a sample proves a rule',
    description:
      'Judge whether a study, survey, or sample is good evidence for a general ' +
      'conclusion about a whole group — or whether it is too small or too skewed ' +
      'to support the claim.',
    prerequisites: ['f-causation'],
    importance: 2,
  },
  {
    id: 'f-numbers',
    stage: 1,
    title: 'Numbers and Percentages',
    plainTitle: 'Reading numbers carefully',
    description:
      'Spot the difference between raw numbers and percentages, and avoid being ' +
      'misled when a percentage rises while the underlying count falls, or vice versa.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'f-comparison',
    stage: 1,
    title: 'Comparisons',
    plainTitle: 'Comparing two things fairly',
    description:
      'Check that comparisons compare like with like, and catch the hidden ' +
      'differences between the compared items that undermine a comparison-based argument.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'f-analogy',
    stage: 1,
    title: 'Analogies',
    plainTitle: 'Reasoning by comparison',
    description:
      'Assess arguments that conclude something about one case because a similar ' +
      'case works that way — and judge whether the two cases are really similar ' +
      'in the way that matters.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'f-flaws',
    stage: 1,
    title: 'Common Flaws',
    plainTitle: 'The usual ways arguments break',
    description:
      'Name the recurring reasoning mistakes — circular reasoning, false dilemmas, ' +
      'equivocation, and more — so you can spot them quickly when they appear.',
    prerequisites: ['f-assumption', 'f-causation'],
    importance: 2,
  },

  // ------------------------------------------------------------------
  // Stage 2 — Logical Reasoning question types
  // ------------------------------------------------------------------
  {
    id: 'lr-main-conclusion',
    stage: 2,
    title: 'Main Conclusion',
    plainTitle: "Finding the author's main point",
    description:
      'Pinpoint the single main conclusion of an argument, separating it from ' +
      'background information and from intermediate conclusions that serve a ' +
      'larger point.',
    prerequisites: ['f-premise-conclusion'],
    importance: 3,
  },
  {
    id: 'lr-argument-part',
    stage: 2,
    title: 'Argument Part',
    plainTitle: 'What role a sentence plays',
    description:
      'Describe the exact job a highlighted sentence performs in the argument — ' +
      'premise, conclusion, intermediate step, or evidence offered against a claim.',
    prerequisites: ['f-premise-conclusion', 'f-structure'],
    importance: 2,
  },
  {
    id: 'lr-method',
    stage: 2,
    title: 'Method of Reasoning',
    plainTitle: 'Describing how the argument works',
    description:
      'Characterize the technique an argument uses to make its case — analogy, ' +
      'counterexample, dilemma, or drawing out an opponent\'s absurd consequence — ' +
      'in precise abstract language.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'lr-point-at-issue',
    stage: 2,
    title: 'Point at Issue',
    plainTitle: 'What two people disagree about',
    description:
      'Determine the exact point on which two speakers genuinely disagree, ' +
      'rather than a topic they merely both mention.',
    prerequisites: ['f-premise-conclusion'],
    importance: 2,
  },
  {
    id: 'lr-must-be-true',
    stage: 2,
    title: 'Must Be True',
    plainTitle: 'What definitely follows',
    description:
      'Pick the answer that is guaranteed by the stimulus — no more, no less — ' +
      'and resist attractive choices that merely could be true.',
    prerequisites: ['f-deduction'],
    importance: 3,
  },
  {
    id: 'lr-most-strongly-supported',
    stage: 2,
    title: 'Most Strongly Supported',
    plainTitle: 'What probably follows',
    description:
      'Choose the answer best supported by the stimulus, recognizing that these ' +
      'questions tolerate a small, defensible step beyond what is strictly proven.',
    prerequisites: ['f-deduction'],
    importance: 2,
  },
  {
    id: 'lr-flaw',
    stage: 2,
    title: 'Flaw in the Reasoning',
    plainTitle: "What's wrong with the argument",
    description:
      'Diagnose the specific reasoning error an argument commits, described in ' +
      'the LSAT\'s standard abstract vocabulary, and match it to the right answer.',
    prerequisites: ['f-flaws'],
    importance: 3,
  },
  {
    id: 'lr-weaken',
    stage: 2,
    title: 'Weaken',
    plainTitle: 'Undermining the argument',
    description:
      'Find the answer that most undermines the argument — typically by attacking ' +
      'an unstated assumption rather than merely contradicting the conclusion.',
    prerequisites: ['f-assumption'],
    importance: 3,
  },
  {
    id: 'lr-strengthen',
    stage: 2,
    title: 'Strengthen',
    plainTitle: 'Backing up the argument',
    description:
      'Find the answer that most supports the argument — usually by confirming ' +
      'a key assumption or ruling out a way the reasoning could fail.',
    prerequisites: ['f-assumption'],
    importance: 3,
  },
  {
    id: 'lr-evaluate',
    stage: 2,
    title: 'Evaluate the Argument',
    plainTitle: 'What would help you judge it',
    description:
      'Identify the piece of information whose answer would most help you decide ' +
      'whether the argument\'s reasoning succeeds or fails.',
    prerequisites: ['f-assumption'],
    importance: 2,
  },
  {
    id: 'lr-necessary-assumption',
    stage: 2,
    title: 'Necessary Assumption',
    plainTitle: 'What the argument needs',
    description:
      'Find the unstated claim the argument cannot live without — the one that, ' +
      'if false, would make the conclusion fail.',
    prerequisites: ['f-assumption', 'f-translate'],
    importance: 3,
  },
  {
    id: 'lr-sufficient-assumption',
    stage: 2,
    title: 'Sufficient Assumption',
    plainTitle: 'What would prove it',
    description:
      'Find the missing premise that, if added to the argument, would make the ' +
      'conclusion follow with logical certainty.',
    prerequisites: ['f-assumption', 'f-conditional'],
    importance: 2,
  },
  {
    id: 'lr-nec-vs-suff',
    stage: 2,
    title: 'Necessary vs Sufficient',
    plainTitle: 'Telling two ideas apart',
    description:
      'Keep necessary and sufficient conditions straight inside real questions, ' +
      'so a sufficient-assumption answer never tempts you on a necessary-assumption ' +
      'question and vice versa.',
    prerequisites: ['lr-necessary-assumption', 'lr-sufficient-assumption'],
    importance: 2,
  },
  {
    id: 'lr-principle-support',
    stage: 2,
    title: 'Principle: Support',
    plainTitle: 'Matching a rule to a case',
    description:
      'Given a specific situation, choose the general principle that best ' +
      'justifies the judgment made about it.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'lr-principle-application',
    stage: 2,
    title: 'Principle: Application',
    plainTitle: 'Applying a rule to a case',
    description:
      'Given a general principle, choose the specific situation to which it ' +
      'most clearly applies.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'lr-parallel-reasoning',
    stage: 2,
    title: 'Parallel Reasoning',
    plainTitle: 'Finding the same logic elsewhere',
    description:
      'Find the answer choice whose reasoning matches the structure — not the ' +
      'topic — of the argument in the stimulus.',
    prerequisites: ['f-structure', 'f-conditional'],
    importance: 2,
  },
  {
    id: 'lr-parallel-flaw',
    stage: 2,
    title: 'Parallel Flaw',
    plainTitle: 'Finding the same mistake elsewhere',
    description:
      'Match both the flawed reasoning structure and the specific flaw in the ' +
      'stimulus to the answer that reproduces them.',
    prerequisites: ['f-flaws', 'f-structure'],
    importance: 2,
  },
  {
    id: 'lr-resolve-paradox',
    stage: 2,
    title: 'Resolve the Paradox',
    plainTitle: 'Explaining something surprising',
    description:
      'Explain how two apparently contradictory facts can both be true by ' +
      'finding the missing context that reconciles them.',
    prerequisites: ['f-structure'],
    importance: 2,
  },

  // ------------------------------------------------------------------
  // Stage 4 — Reading Comprehension skills
  // ------------------------------------------------------------------
  {
    id: 'rc-passage-structure',
    stage: 4,
    title: 'Passage Structure',
    plainTitle: 'How a passage is built',
    description:
      'See the overall architecture of a passage — where the thesis lands, where ' +
      'the evidence goes, and where the author qualifies or shifts direction.',
    prerequisites: ['f-structure'],
    importance: 2,
  },
  {
    id: 'rc-paragraph-roles',
    stage: 4,
    title: 'Paragraph Roles',
    plainTitle: 'What each paragraph does',
    description:
      'Assign each paragraph its job: introducing a theory, presenting evidence, ' +
      'raising an objection, or drawing a conclusion.',
    prerequisites: ['rc-passage-structure'],
    importance: 2,
  },
  {
    id: 'rc-passage-map',
    stage: 4,
    title: 'Passage Mapping',
    plainTitle: 'Keeping track of a passage',
    description:
      'Build a quick mental map of a passage as you read — main claims, evidence, ' +
      'and viewpoints — so you can locate details fast when questions arrive.',
    prerequisites: ['rc-paragraph-roles'],
    importance: 2,
  },
  {
    id: 'rc-main-point',
    stage: 4,
    title: 'Main Point',
    plainTitle: "The passage's main idea",
    description:
      'State the central claim the whole passage is driving at, distinct from ' +
      'the author\'s purpose in writing and from important-but-secondary details.',
    prerequisites: ['rc-passage-structure'],
    importance: 3,
  },
  {
    id: 'rc-primary-purpose',
    stage: 4,
    title: 'Primary Purpose',
    plainTitle: 'Why the author wrote it',
    description:
      'Describe what the author is doing in the passage — explaining, arguing, ' +
      'evaluating, reconciling — rather than merely what the passage is about.',
    prerequisites: ['rc-main-point'],
    importance: 2,
  },
  {
    id: 'rc-author-viewpoint',
    stage: 4,
    title: "Author's Viewpoint",
    plainTitle: 'What the author thinks',
    description:
      'Pin down the author\'s own position on the passage\'s central issue, ' +
      'especially when it is implied rather than stated outright.',
    prerequisites: ['f-premise-conclusion'],
    importance: 2,
  },
  {
    id: 'rc-other-viewpoints',
    stage: 4,
    title: 'Other Viewpoints',
    plainTitle: 'What other people think',
    description:
      'Track the views attributed to critics, researchers, and other figures in ' +
      'the passage, keeping them separate from what the author believes.',
    prerequisites: ['rc-author-viewpoint'],
    importance: 2,
  },
  {
    id: 'rc-attitude',
    stage: 4,
    title: 'Author Attitude',
    plainTitle: "The author's tone",
    description:
      'Read the author\'s tone — enthusiastic, skeptical, neutral, critical — ' +
      'from word choice and emphasis, without overreading mild language.',
    prerequisites: ['rc-author-viewpoint'],
    importance: 2,
  },
  {
    id: 'rc-detail',
    stage: 4,
    title: 'Detail',
    plainTitle: 'Finding specific facts',
    description:
      'Locate exactly what the passage said about a specific point, and avoid ' +
      'answers that are close to the text but shift its meaning.',
    prerequisites: ['rc-passage-map'],
    importance: 2,
  },
  {
    id: 'rc-inference',
    stage: 4,
    title: 'Inference',
    plainTitle: 'Reading between the lines',
    description:
      'Draw the modest, defensible conclusions a passage supports — the ones the ' +
      'text commits to without quite saying — and reject tempting overreaches.',
    prerequisites: ['f-deduction', 'rc-passage-map'],
    importance: 3,
  },
  {
    id: 'rc-function',
    stage: 4,
    title: 'Function',
    plainTitle: 'Why a detail is there',
    description:
      'Explain the role a sentence, example, or piece of evidence plays in the ' +
      'passage\'s larger argument — why the author included it.',
    prerequisites: ['rc-paragraph-roles'],
    importance: 2,
  },
  {
    id: 'rc-application',
    stage: 4,
    title: 'Application',
    plainTitle: "Using the passage's ideas",
    description:
      'Apply an idea, principle, or framework from the passage to a new ' +
      'situation the passage never discussed.',
    prerequisites: ['rc-passage-structure'],
    importance: 2,
  },
  {
    id: 'rc-analogy',
    stage: 4,
    title: 'Analogy',
    plainTitle: "Comparing the passage's ideas",
    description:
      'Recognize which new situation is most analogous to a relationship or ' +
      'process described in the passage.',
    prerequisites: ['f-analogy'],
    importance: 2,
  },
  {
    id: 'rc-organization',
    stage: 4,
    title: 'Organization',
    plainTitle: 'How the passage is arranged',
    description:
      'Describe the passage\'s overall organization in abstract terms — for ' +
      'example, "a theory is presented, then challenged, then revised."',
    prerequisites: ['rc-passage-structure'],
    importance: 2,
  },
  {
    id: 'rc-comparative',
    stage: 4,
    title: 'Comparative Reading',
    plainTitle: 'Handling two passages',
    description:
      'Work with paired passages: compare the authors\' positions, spot where ' +
      'they agree and disagree, and track how each passage relates to the other.',
    prerequisites: ['rc-other-viewpoints'],
    importance: 2,
  },

  // ------------------------------------------------------------------
  // Stage 10 — Argumentative Writing (informational, light mastery)
  // ------------------------------------------------------------------
  {
    id: 'w-task',
    stage: 10,
    title: 'Understanding the Task',
    plainTitle: 'What the writing section asks for',
    description:
      'Understand exactly what the argumentative writing task asks you to do: ' +
      'take a position on an issue and defend it with reasons — not summarize ' +
      'the prompt.',
    prerequisites: [],
    importance: 1,
  },
  {
    id: 'w-perspectives',
    stage: 10,
    title: 'Seeing the Perspectives',
    plainTitle: 'The two sides of the issue',
    description:
      'Read the prompt\'s competing perspectives carefully and identify what ' +
      'each side is really claiming before you choose your own position.',
    prerequisites: ['w-task'],
    importance: 1,
  },
  {
    id: 'w-thesis',
    stage: 10,
    title: 'Writing a Thesis',
    plainTitle: 'Stating your position clearly',
    description:
      'Write a clear, specific thesis that states your position and previews ' +
      'the reasons you will develop.',
    prerequisites: ['w-perspectives'],
    importance: 1,
  },
  {
    id: 'w-reasons',
    stage: 10,
    title: 'Giving Reasons',
    plainTitle: 'Backing up your position',
    description:
      'Develop concrete reasons and examples that genuinely support your thesis, ' +
      'and explain the connection between each reason and your position.',
    prerequisites: ['w-thesis'],
    importance: 1,
  },
  {
    id: 'w-counterargument',
    stage: 10,
    title: 'Counterargument',
    plainTitle: 'Answering the other side',
    description:
      'Address the strongest objection to your position fairly, then explain ' +
      'why your position still holds — the move that separates strong essays ' +
      'from one-sided ones.',
    prerequisites: ['w-reasons'],
    importance: 1,
  },
  {
    id: 'w-organization',
    stage: 10,
    title: 'Organizing Your Essay',
    plainTitle: 'Putting your essay in order',
    description:
      'Arrange your thesis, reasons, and counterargument into a clear structure ' +
      '— introduction, body, and conclusion — that a reader can follow easily.',
    prerequisites: ['w-counterargument'],
    importance: 1,
  },
  {
    id: 'w-outline',
    stage: 10,
    title: 'Outlining',
    plainTitle: 'Planning before you write',
    description:
      'Build a brief outline of your thesis, reasons, evidence, and ' +
      'counterargument before you start writing, so the essay has a plan to follow.',
    prerequisites: ['w-organization'],
    importance: 1,
  },
  {
    id: 'w-timed',
    stage: 10,
    title: 'Timed Writing',
    plainTitle: 'Writing under time pressure',
    description:
      'Put the whole process together — outline, draft, and revise — inside the ' +
      'real time limit, with a pacing plan for each phase of the response.',
    prerequisites: ['w-outline'],
    importance: 1,
  },
];
