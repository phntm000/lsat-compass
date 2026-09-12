/**
 * LSAT Compass — Stage 0 lessons (orientation).
 *
 * ids "0.1".."0.9". Orientation content per content-schema.md §4 / spec §17.
 * All prose is original. Contract: content-schema.md §§0, 1, 4, 7, 9.
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

export const LESSONS_0: Lesson[] = [
  {
    id: '0.1',
    stage: 0,
    title: 'What the LSAT Actually Tests',
    estimatedMinutes: 8,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Before you study a single question type, it helps to know what game you are playing. The LSAT is not a test of what you know. It does not ask about law, history, science facts, or current events. It is a test of how you think: can you read a short passage carefully, find the argument inside it, and judge whether the reasoning holds up?',
      },
      {
        kind: 'keyterm',
        term: 'Argument (first look)',
        definition:
          'A set of claims in which some are offered as reasons for another. Most of this course is about taking arguments apart: finding the point being made, finding the reasons given for it, and deciding whether the reasons are good enough.',
      },
      {
        kind: 'example',
        title: 'Knowledge versus reasoning',
        body: 'A knowledge question asks: "In what year was the Fourteenth Amendment ratified?" Either you memorized it or you did not. A reasoning question gives you everything you need and asks: "A city councilor argues that widening Main Street will reduce commute times because a nearby town widened its main road and commutes fell. Which of the following most undermines the argument?" The second question needs zero outside facts — only careful thinking.',
        note: 'Every LSAT question works like the second one: the passage contains all the raw material.',
      },
      {
        kind: 'checkpoint',
        prompt: 'A friend says the best LSAT prep is memorizing 500 advanced vocabulary words. What is wrong with this plan?',
        choices: [
          'Nothing — a large vocabulary is the main driver of LSAT scores',
          'It targets knowledge, but the LSAT tests reasoning with provided material; the time is better spent practicing argument analysis',
          'It helps only with Reading Comprehension, not Logical Reasoning',
          'Vocabulary only matters for the experimental section',
        ],
        correctIndex: 1,
        explanation:
          'The LSAT supplies the facts and arguments inside each passage, but precise reading fluency — including vocabulary-in-context and comfort with dense academic prose — is genuinely rewarded, especially in Reading Comprehension inference questions. A pure memorization plan still optimizes for the wrong thing: the highest-return work is practicing argument dissection and precise reading, with vocabulary built *through* that reading rather than from word lists. Vocabulary work is not harmful, but as primary preparation it misses the target.',
      },
      {
        kind: 'prose',
        md: 'More precisely, the LSAT tests three related abilities. First, precise reading: noticing exactly what a sentence says and does not say. Second, structural reading: seeing which claims are reasons and which claim is the point. Third, evaluation: spotting the gap between the reasons and the point, and knowing what would close or widen that gap. Law schools care about these because legal work is, at its core, careful reading and argument evaluation under pressure.',
      },
      {
        kind: 'misconception',
        wrong: 'The LSAT tests what you know — vocabulary, logic formulas, legal concepts.',
        right:
          'The LSAT tests how you reason with what is put in front of you. Students who try to memorize their way through it stall out; students who practice dissecting arguments improve steadily, regardless of background.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which of the following best describes what the LSAT primarily rewards?',
        choices: [
          'Memorizing legal vocabulary, rules, and logic formulas',
          'Carefully evaluating whether the reasons given actually support a claim',
          'Reading as fast as physically possible',
          'Keeping up with current events and general knowledge',
        ],
        correctIndex: 1,
        explanation:
          'The LSAT is a reasoning test, not a knowledge test. Each question supplies all the information you need, so outside facts cannot help you; your job is to judge the argument in front of you. Speed eventually matters, but it is built on top of accuracy, and no question requires legal training or current-events knowledge.',
      },
      {
        kind: 'example',
        title: 'No background knowledge required',
        body: '"Harbor seals haul out onto the sandbar at low tide. Researchers counted more seals on days following heavy rain. They concluded that rainfall attracts seals to the sandbar." To evaluate this, you do not need marine biology. You need to notice the gap: maybe rain washes food into the water, or maybe rainy weeks coincide with calmer seas. That gap-spotting reflex is the whole test.',
      },
      {
        kind: 'prose',
        md: 'The good news is that reasoning is a learnable skill, not a fixed talent. The LSAT draws on a small, finite set of reasoning patterns — about fifteen foundations and a couple dozen question types — and each one can be practiced in isolation until it becomes automatic. This course is organized around exactly that idea: learn one pattern, drill it, then combine it with the others.',
      },
      {
        kind: 'summary',
        points: [
          'The LSAT tests reasoning, not knowledge: no law, facts, or vocabulary to memorize.',
          'The three core abilities are precise reading, structural reading, and evaluating arguments.',
          'Every question contains all the information needed to answer it.',
          'The reasoning patterns on the test are finite and learnable with deliberate practice.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'In one sentence, say what the LSAT tests.',
        answer:
          'The LSAT tests careful reasoning: reading precisely, finding the structure of an argument, and judging whether the reasons given support the conclusion.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 0.2 walks through the actual structure of test day: how many sections, how long each lasts, which ones count, and where the break falls.',
      },
    ],
  },
  {
    id: '0.2',
    stage: 0,
    title: 'The Structure of Test Day',
    estimatedMinutes: 8,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Test day has a fixed, predictable shape. Knowing it in advance removes a whole category of anxiety: there will be no surprises about format, only questions to answer. The LSAT consists of four sections, each 35 minutes long, with a single 10-minute intermission between the second and third sections.',
      },
      {
        kind: 'keyterm',
        term: 'Variable (experimental) section',
        definition:
          'One of the four sections does not count toward your score. It is used to test out future questions. It looks exactly like a normal scored section, so you cannot identify it during the test — treat every section as if it counts.',
      },
      {
        kind: 'prose',
        md: 'Of the four sections, three are scored: two Logical Reasoning sections and one Reading Comprehension section. The fourth is the unscored variable section, which can be either Logical Reasoning or Reading Comprehension. The sections can appear in any order. Because the unscored section is indistinguishable from the scored ones, the only viable strategy is full effort on all four.',
      },
      {
        kind: 'example',
        title: 'A sample test-day timeline',
        body: 'Section 1: 35 minutes. Section 2: 35 minutes. Then a 10-minute intermission — stand up, stretch, drink water, reset. Section 3: 35 minutes. Section 4: 35 minutes. Total testing time is 140 minutes, about two and a half hours door to door. Each section is its own self-contained sprint: when a section ends, it is gone, and the next one starts fresh.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Your test presents sections in this order: Logical Reasoning, Reading Comprehension, Logical Reasoning, Reading Comprehension. Which sections count toward your score?',
        choices: [
          'The first three only — the last section is always the experimental one',
          'All four, since there is no experimental section anymore',
          'Three of them, but you cannot know which three during the test',
          'Only the two Logical Reasoning sections',
        ],
        correctIndex: 2,
        explanation:
          'Three sections count — two Logical Reasoning and one Reading Comprehension — while the fourth is the unscored variable section. But the variable section is deliberately indistinguishable from scored ones and can appear in any position, so you cannot identify it during the test. The only safe strategy is full effort on all four sections.',
      },
      {
        kind: 'misconception',
        wrong: 'You can spot the experimental section by its topic or difficulty and ease off.',
        right:
          'The variable section is designed to be indistinguishable — same format, same difficulty range, same instructions. Test takers who try to guess which section is experimental invariably guess wrong sometimes, and coasting on a scored section is catastrophic. Give all four sections everything.',
      },
      {
        kind: 'checkpoint',
        prompt: 'How many sections of the LSAT count toward your score?',
        choices: ['All four sections', 'Three sections', 'Two sections', 'It varies from test to test'],
        correctIndex: 1,
        explanation:
          'Three sections count: two Logical Reasoning sections and one Reading Comprehension section. The fourth section is the unscored variable section used for testing future questions. Because you cannot tell which one it is while testing, every section must be treated as scored.',
      },
      {
        kind: 'prose',
        md: 'The intermission is short and structured: ten minutes between sections two and three, and only there. Use it the same way every time you practice a full test — move, hydrate, breathe, and let the first half go. Do not spend it replaying questions you already answered; those decisions are made and unchangeable.',
      },
      {
        kind: 'prose',
        md: 'One strategic consequence follows from the structure: pacing is per-section, not per-test. You get 35 minutes for roughly 25 questions in a Logical Reasoning section and 35 minutes for four passages in Reading Comprehension. This course builds your pacing gradually, section by section, so that 35 minutes feels like enough time rather than a threat.',
      },
      {
        kind: 'summary',
        points: [
          'Four sections of 35 minutes each, with one 10-minute intermission between sections 2 and 3.',
          'Three sections count (two Logical Reasoning, one Reading Comprehension); one variable section does not.',
          'The unscored section cannot be identified during the test — give full effort to all four.',
          'Pacing is per-section: each 35-minute block is its own sprint.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Describe the section layout of the LSAT: how many sections, how long, which count, and where the break falls.',
        answer:
          'Four sections of 35 minutes each; three count (two Logical Reasoning, one Reading Comprehension) and one unscored variable section does not; a single 10-minute intermission falls between sections two and three.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 0.3 compares the two section types head to head: what Logical Reasoning and Reading Comprehension each look like and what each demands of you.',
      },
    ],
  },
  {
    id: '0.3',
    stage: 0,
    title: 'Logical Reasoning vs. Reading Comprehension',
    estimatedMinutes: 9,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'The two scored section types feel like different sports, and it helps to know which game you are playing before the whistle blows. Logical Reasoning is a series of short, self-contained puzzles. Reading Comprehension is a smaller number of long, dense passages with several questions each. Both test careful reasoning, but the skills around that core are different.',
      },
      {
        kind: 'keyterm',
        term: 'Logical Reasoning (LR)',
        definition:
          'A section of about 25 short passages, each followed by exactly one question. Each passage is usually a brief argument of a few sentences; your task is to analyze or evaluate that argument — find its flaw, its assumption, what would weaken or strengthen it, or what must follow from it.',
      },
      {
        kind: 'prose',
        md: 'In Logical Reasoning, every question is a fresh start. You read a stimulus of roughly fifty to eighty words, then answer one question about it, then move on and never see that stimulus again. This means LR rewards quick, precise argument dissection repeated many times. A mistake on one question costs you exactly one question — there is no compounding damage.',
      },
      {
        kind: 'keyterm',
        term: 'Reading Comprehension (RC)',
        definition:
          'A section of four long passages (roughly 450–650 words each), each followed by five to eight questions. One of the four is a comparative passage: two shorter passages on the same topic. Questions ask about main points, author viewpoints, passage structure, details, and inferences.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which statement correctly describes the Logical Reasoning section?',
        choices: [
          'Four long passages, each with five to eight questions',
          'About 25 short stimuli, each followed by exactly one question',
          'One comparative passage pair plus three single passages',
          'A mix of long passages and short stimuli in any order',
        ],
        correctIndex: 1,
        explanation:
          'Logical Reasoning consists of about 25 short, self-contained stimuli with one question each — a fresh start every time. The four-long-passage format, including the comparative pair, is Reading Comprehension. Confusing the two formats leads to the wrong reading strategy: LR rewards rapid, repeated argument dissection, while RC rewards one organized reading that supports many questions.',
      },
      {
        kind: 'prose',
        md: 'In Reading Comprehension, your investment compounds. You spend several minutes reading a passage once, and that single reading has to support six or seven questions. This means RC rewards reading with a plan: tracking the author\'s main point, the structure of the passage, and whose viewpoint is whose. A weak initial read damages every question attached to the passage, which is why this course teaches a deliberate passage-mapping method before you ever time yourself.',
      },
      {
        kind: 'example',
        title: 'The two formats side by side',
        body: 'LR: "A recent study found that office workers who stand for part of the day report less back pain. The study\'s authors conclude that employers should provide standing desks. Which of the following most weakens the argument?" One paragraph, one question, done. RC: a 600-word passage on competing theories of coral bleaching, followed by seven questions about the author\'s attitude, the function of paragraph three, and what can be inferred about a mentioned researcher\'s view. One reading, seven questions.',
      },
      {
        kind: 'misconception',
        wrong: 'LR and RC test completely different abilities, so being good at one tells you nothing about the other.',
        right:
          'The core ability is the same — careful reading and argument analysis — applied at different scales. LR applies it to 25 tiny arguments; RC applies it to four long ones while tracking viewpoints and structure. Strength in one transfers to the other; the differences are stamina, organization, and reading strategy, all of which are trainable.',
      },
      {
        kind: 'checkpoint',
        prompt: 'A section gives you four long passages with several questions attached to each passage. Which section is it, and what does that format demand?',
        choices: [
          'Logical Reasoning — it demands answering each question in under a minute',
          'Reading Comprehension — it demands one strong initial reading that supports every question on the passage',
          'Logical Reasoning — it demands memorizing each stimulus for later questions',
          'Reading Comprehension — it demands reading each passage twice before answering',
        ],
        correctIndex: 1,
        explanation:
          'Four long passages with five to eight questions each is Reading Comprehension. Because a single reading must support many questions, the format demands an organized first read — capturing the main point, structure, and viewpoints — rather than speed. Rereading everything twice wastes the time you need for the questions themselves.',
      },
      {
        kind: 'summary',
        points: [
          'Logical Reasoning: about 25 short stimuli, one question each — fresh start every time.',
          'Reading Comprehension: four long passages, five to eight questions each — one careful reading supports many questions.',
          'One RC passage is comparative: two shorter passages on the same topic.',
          'Both test careful argument analysis; RC additionally demands stamina, structure-tracking, and viewpoint-tracking.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Contrast the LR and RC formats in two sentences.',
        answer:
          'Logical Reasoning presents about 25 short, self-contained stimuli with one question each. Reading Comprehension presents four long passages with five to eight questions each, so a single organized reading must support many questions.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 0.4 covers a piece of recent history every test taker should know: the Logic Games section, why it was removed, and what replaced it.',
      },
    ],
  },
  {
    id: '0.4',
    stage: 0,
    title: 'The Logic Games Era Is Over',
    estimatedMinutes: 7,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'If you pick up an LSAT book printed before 2024, you will find a whole section type that no longer exists: Analytical Reasoning, universally called Logic Games. Test takers used to spend a 35-minute section arranging people, schedules, and objects under a set of rules, drawing elaborate diagrams. Understanding what happened to that section — and why — protects you from wasting study time and explains the shape of the modern test.',
      },
      {
        kind: 'prose',
        md: 'Logic Games were removed starting with the June 2024 LSAT. The change followed a settlement with blind test takers, for whom the heavily diagram-based section posed an accessibility barrier that could not be fixed with accommodations alone. Rather than keep a section that could not be administered fairly to everyone, the test makers replaced it with a second scored Logical Reasoning section. The four-section structure stayed; the content changed.',
      },
      {
        kind: 'keyterm',
        term: 'Logic Games (retired)',
        definition:
          'The former Analytical Reasoning section: four logic puzzles per section (scheduling, grouping, ordering) solved with diagrams. Removed from the LSAT in June 2024 and replaced by a second Logical Reasoning section. Any Logic Games material you encounter in older books is obsolete for the current test.',
      },
      {
        kind: 'example',
        title: 'What a game looked like — and what replaced it',
        body: 'A typical game: "Six musicians — two violinists, two cellists, two flutists — will perform in three concerts. Each concert features exactly two musicians..." followed by a thicket of rules and five questions. Test takers built master diagrams and chased deductions. Today that entire skill — spatial diagramming of rule systems — is worth zero points. What replaced it is more of what this course teaches: short arguments to analyze, assumptions to find, flaws to name.',
      },
      {
        kind: 'checkpoint',
        prompt: 'You find a 2021 LSAT prep book at a used bookstore. How should you use it?',
        choices: [
          'Work through it cover to cover, including the Logic Games chapters',
          'Use the Logical Reasoning and Reading Comprehension material, but skip anything labeled Analytical Reasoning or Logic Games',
          'Avoid it entirely — nothing from before 2024 is valid practice',
          'Use only the Logic Games chapters, since those questions are now rare and valuable',
        ],
        correctIndex: 1,
        explanation:
          'The 2024 removal of Logic Games changed one section type, not the underlying reasoning skills. Logical Reasoning and Reading Comprehension questions from older tests remain excellent practice because the argument patterns are unchanged. But Logic Games chapters teach diagramming skills worth zero points on the modern test, so that study time is better spent on argument analysis.',
      },
      {
        kind: 'misconception',
        wrong: 'Old LSAT prep books are useless now because the test changed.',
        right:
          'Only the Logic Games chapters are obsolete. Logical Reasoning and Reading Comprehension questions from older tests are still excellent practice — the reasoning patterns have not changed. If you use old materials, simply skip anything labeled Analytical Reasoning or Logic Games and work the LR and RC sections normally.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Why does the modern LSAT place double weight on Logical Reasoning compared to the pre-2024 test?',
        choices: [
          'Because Logical Reasoning questions were made easier to compensate for the removal',
          'Because the retired Logic Games section was replaced by a second scored Logical Reasoning section',
          'Because Reading Comprehension was shortened to make room',
          'Because law schools requested less emphasis on reading',
        ],
        correctIndex: 1,
        explanation:
          'When Analytical Reasoning (Logic Games) was removed in June 2024 following an accessibility settlement, it was replaced by a second scored Logical Reasoning section, keeping the four-section structure. Reading Comprehension was not shortened, LR was not made easier, and the change was about fair administration, not law school preferences — so argument-analysis skills now decide two of the three scored sections.',
      },
      {
        kind: 'prose',
        md: 'The practical consequence is straightforward and good news for you: every hour you spend in this course learning to dissect arguments pays off twice, once in each LR section. The reading stamina and structural reading you build for Reading Comprehension pay off in the third scored section. There is no fourth skill to learn, no diagrams to master — just careful reasoning, applied relentlessly.',
      },
      {
        kind: 'summary',
        points: [
          'The Logic Games (Analytical Reasoning) section was removed starting June 2024 after an accessibility settlement.',
          'It was replaced by a second scored Logical Reasoning section; the test is now two LR sections plus one RC section.',
          'Logic Games material in older books is obsolete — skip those chapters entirely.',
          'Older LR and RC material is still valid practice; the reasoning patterns have not changed.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'What happened to Logic Games, when, and what replaced the section?',
        answer:
          'Logic Games (Analytical Reasoning) were removed from the LSAT starting June 2024 following a settlement over accessibility for blind test takers, and the section was replaced by a second scored Logical Reasoning section.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 0.5 explains how your performance becomes a number: raw scores, the 120–180 scale, and why there is never a reason to leave a question blank.',
      },
    ],
  },
  {
    id: '0.5',
    stage: 0,
    title: 'Scoring Basics',
    estimatedMinutes: 9,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Your LSAT score is a single number between 120 and 180, and understanding exactly how it is computed changes how you take the test. The mechanics are simple, but they have sharp strategic implications — especially the fact that wrong answers cost you nothing.',
      },
      {
        kind: 'prose',
        md: 'First, the machine counts your correct answers across the three scored sections. That count is your raw score. Every question is worth exactly the same: a gimme you answer in twenty seconds counts precisely as much as the hardest question on the test. The raw score is then converted to the 120–180 scaled score through a conversion table that adjusts slightly for the difficulty of that particular test form. There is no penalty for a wrong answer, and unanswered questions are simply wrong — so a guess is always better than a blank.',
      },
      {
        kind: 'keyterm',
        term: 'Scaled score',
        definition:
          'Your reported LSAT score (120–180), produced by converting your raw number-correct through a per-test conversion table. The table keeps scores comparable across different test administrations: a 165 means roughly the same level of performance no matter which test form you took.',
      },
      {
        kind: 'example',
        title: 'How the math works',
        body: 'Suppose the three scored sections contain 76 questions in total. You answer 58 correctly, miss 12, and guess on 6, getting 2 of the guesses right. Your raw score is 60. The conversion table for that test form turns a raw 60 into, say, a 160. Notice what mattered: total correct, nothing else. Which questions you missed, how long you spent, and whether an answer was a guess or a certainty all vanish from the computation.',
        note: 'The exact conversion varies by test; the principle never does: correct answers are the only currency.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Two test takers each answer 60 questions correctly. One answered every question; the other left 10 blank. Who has the higher raw score?',
        choices: [
          'The one who answered every question, because blanks are penalized extra',
          'They tie — only correct answers count, and blanks and wrong answers both contribute zero',
          'The one who left blanks, because guessing wrong lowers your score',
          'It depends on which questions each got right',
        ],
        correctIndex: 1,
        explanation:
          'Raw score is simply the count of correct answers; every question carries equal weight and there is no penalty for wrong answers. A blank and a wrong answer both contribute zero, so the two test takers tie at 60. This is why you should never leave a question blank — a guess can only add points, never subtract them.',
      },
      {
        kind: 'misconception',
        wrong: 'Hard questions are worth more points, so I should spend my time on the hardest ones.',
        right:
          'Every question counts exactly the same, so time spent is the real currency. An easy question you rush and miss costs you exactly as much as a hard question you cannot solve. The winning allocation is: secure every question you can answer, then spend remaining time on the hard ones — never the reverse.',
      },
      {
        kind: 'checkpoint',
        prompt: 'With one minute left in a section and five questions unanswered, what should you do?',
        choices: [
          'Answer one carefully and leave the rest blank to protect your accuracy',
          'Guess on all five, since a wrong answer costs nothing and a blank is always wrong',
          'Leave them blank — random guesses signal weak preparation to scorers',
          'Spend the minute deciding which two are most guessable and answer only those',
        ],
        correctIndex: 1,
        explanation:
          'There is no guessing penalty: a wrong answer and a blank both contribute zero to your raw score, while a guess has a roughly one-in-five chance of contributing a point. The machine never sees how you arrived at an answer, so "signaling" is not a thing. Filling in every bubble in the final minute is pure expected value with no downside.',
      },
      {
        kind: 'prose',
        md: 'Two more concepts complete the picture. Your percentile rank tells you what share of test takers you outscored — a 160 is roughly the 80th percentile, meaning you beat about four in five test takers. And every score comes with a score band of about three points in each direction: the test makers acknowledge that a single sitting is an estimate, so your 160 represents a true range of roughly 157 to 163. Schools know this; one point is noise, not destiny.',
      },
      {
        kind: 'prose',
        md: 'Finally, keep the number in perspective. It is the starting line of this course, not a verdict on your ability. LSAT scores respond to training the way a distance time responds to running: systematically, over weeks. Your job right now is not to fixate on a target number but to build the reasoning machinery that produces it.',
      },
      {
        kind: 'summary',
        points: [
          'Raw score (total correct) converts to a 120–180 scaled score via a per-test table.',
          'Every question counts equally; there is no penalty for wrong answers — never leave a question blank.',
          'Percentile rank shows where you stand relative to other test takers; the score band (±~3) reflects measurement noise.',
          'The score is trainable: it responds to systematic practice over weeks, not to last-minute tricks.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Explain in two sentences how LSAT scoring works and what it implies about guessing.',
        answer:
          'Your number of correct answers (raw score) is converted to a 120–180 scaled score, with every question weighted equally. Because wrong answers carry no penalty, you should answer — even guess on — every question rather than leaving any blank.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 0.6 covers the single most important study principle in this course: why accuracy must come before speed, and the practice protocol that enforces it.',
      },
    ],
  },
  {
    id: '0.6',
    stage: 0,
    title: 'Accuracy Before Speed',
    estimatedMinutes: 10,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Almost every beginner makes the same error: they start timing themselves immediately, because the test is timed. This feels productive and is exactly backwards. Speed on the LSAT is not a separate skill you train alongside reasoning — it is what accurate reasoning looks like after enough repetition. Train the reasoning first; the speed arrives on its own.',
      },
      {
        kind: 'prose',
        md: 'The mechanism is simple. When you practice untimed, you can afford to do the full job: read every word, identify the conclusion, map the support, check each answer choice deliberately. Each careful repetition strengthens the neural pathway for that reasoning pattern. When you practice timed before the pattern is solid, you rehearse shortcuts, skimming, and guessing — and you get very good at those instead. You become a fast bad reasoner rather than a soon-to-be-fast good one.',
      },
      {
        kind: 'keyterm',
        term: 'Accuracy-first practice',
        definition:
          'The training order this course uses: first master a reasoning pattern with no time pressure, then add mild time pressure, then full timed conditions. You only move a skill to the next stage when your untimed accuracy is consistently high.',
      },
      {
        kind: 'worked',
        title: 'The accuracy-first practice loop',
        steps: [
          {
            label: 'Step 1 — Work untimed',
            body: 'Do a small set of questions (five to eight) with no clock. Aim for complete understanding of every question, not completion. If a question takes six minutes of careful thought, that is fine.',
          },
          {
            label: 'Step 2 — Mark uncertainty',
            body: 'Flag every question where you felt even slightly unsure, even if you got it right. Uncertainty is data: it marks the exact boundary of your current skill.',
          },
          {
            label: 'Step 3 — Review before checking',
            body: 'Before looking at the answers, re-read each flagged question and try to resolve your uncertainty. This second, deliberate pass is where most learning happens.',
          },
          {
            label: 'Step 4 — Diagnose every miss',
            body: 'For each wrong answer, write one sentence naming the error (lesson 0.8 teaches this in detail). "I picked a choice that restated a premise instead of the conclusion." Vague review ("I misread") teaches nothing.',
          },
          {
            label: 'Step 5 — Add time only when ready',
            body: 'When a question type feels automatic untimed — you see the structure without effort — start doing sets with a generous time limit, then tighten it toward test pace.',
          },
        ],
      },
      {
        kind: 'checkpoint',
        prompt: 'You have just learned to identify conclusions. Which study session best applies the accuracy-first principle?',
        choices: [
          'Thirty questions in 35 minutes to build test-day stamina immediately',
          'Six questions with no time limit, each reviewed thoroughly until the reasoning is transparent',
          'Reading answer explanations for 30 difficult questions without attempting them',
          'Alternating one timed and one untimed question to balance speed and accuracy',
        ],
        correctIndex: 1,
        explanation:
          'Accuracy-first practice means mastering the pattern without time pressure before adding any clock. A small untimed set with deep review builds correct technique, while timing too early rehearses shortcuts like skimming and guessing. Reading explanations passively never builds the skill, and mixing timed questions in from day one reintroduces the very habits the method is designed to prevent.',
      },
      {
        kind: 'misconception',
        wrong: 'Timing myself from day one is the fastest way to get faster.',
        right:
          'Timing yourself before your technique is solid trains you to cut the exact corners — skipping the conclusion check, not reading all five choices — that separate high scorers from the pack. Speed built on shaky technique collapses on hard questions. Build the technique slowly, then let repetition make it fast.',
      },
      {
        kind: 'checkpoint',
        prompt: 'You are learning to identify conclusions. Which practice approach follows the accuracy-first principle?',
        choices: [
          'Do 25 questions in 35 minutes daily to simulate test pressure from the start',
          'Do 6 questions untimed, review each thoroughly, and only add timing once the pattern feels automatic',
          'Alternate strictly: one timed day, one untimed day, regardless of accuracy',
          'Skip practice and just read explanations of difficult questions to absorb the patterns',
        ],
        correctIndex: 1,
        explanation:
          'Accuracy-first practice means mastering the reasoning pattern without time pressure before adding any clock. Small untimed sets with thorough review build the correct technique; timing too early rehearses shortcuts and skimming instead. Simulating pressure is valuable, but only after the underlying skill is solid — otherwise you are practicing your mistakes at speed.',
      },
      {
        kind: 'example',
        title: 'Two students, one month',
        body: 'Student A does a timed section every day for a month. Her score wobbles between 152 and 156; she keeps missing the same flaw questions because she never slows down enough to see what she is doing wrong. Student B spends three weeks untimed — six questions a day, each reviewed until the reasoning is transparent — then two weeks adding time pressure. Her accuracy-first foundation transfers: timed scores climb into the mid-160s because the technique was correct before it was fast.',
      },
      {
        kind: 'summary',
        points: [
          'Speed is accurate reasoning after repetition — not a separate skill to train in parallel.',
          'Practicing timed before technique is solid rehearses shortcuts and bad habits.',
          'The loop: small untimed sets → mark uncertainty → review before checking → diagnose misses → add time when ready.',
          'This course gates timed work behind demonstrated accuracy; trust the order.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why does this course insist on accuracy before speed? Give the core reason in one or two sentences.',
        answer:
          'Because practicing under time pressure before your technique is solid trains you to rehearse shortcuts and mistakes at speed. Accurate reasoning becomes fast through repetition, so you build the technique first and let speed follow.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 0.7 shows you how this course itself works: the stages, the lesson-to-drill loop, and how your progress is tracked.',
      },
    ],
  },
  {
    id: '0.7',
    stage: 0,
    title: 'How This Course Works',
    estimatedMinutes: 8,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'This course is built on a simple theory: the LSAT is a finite set of reasoning patterns, and you master it by learning each pattern, drilling it in isolation, combining it with others, and finally performing under time pressure. Everything in the app — lessons, drills, questions, review — serves that sequence. Here is how the pieces fit.',
      },
      {
        kind: 'prose',
        md: 'The curriculum runs in stages. Stage 0 (this stage) orients you. Stage 1 builds reasoning foundations: arguments, premises, conditional logic, causation, flaws. Stage 2 turns those foundations into Logical Reasoning question types: weaken, strengthen, flaw, assumption, inference, and the rest. Later stages cover Reading Comprehension, advanced LR, timing, and full-test performance. Each stage unlocks the next, because each skill rests on earlier ones — you cannot reliably weaken an argument until you can find its assumption.',
      },
      {
        kind: 'keyterm',
        term: 'Mastery-based progression',
        definition:
          'You advance when your accuracy shows a skill is solid, not when you have merely finished reading about it. The app tracks your performance on drills and questions per skill and will tell you when a skill needs more work before you move on.',
      },
      {
        kind: 'prose',
        md: 'Within each skill, the loop is always the same four steps. Learn: read the lesson and work the examples. Drill: do micro-drills — tiny exercises that isolate one pattern, like translating "unless" sentences or spotting conclusions. Apply: answer full LSAT-style questions that use the skill. Review: diagnose every mistake using the method from lesson 0.8. Shortcuts through this loop are an illusion; students who skip drilling and jump to full questions plateau early.',
      },
      {
        kind: 'checkpoint',
        prompt: 'After reading the lesson on conditional logic, where should most of your study time go?',
        choices: [
          'Reading the next lesson to maintain momentum through the curriculum',
          'Micro-drills isolating conditional patterns, then full questions, then mistake review',
          'Memorizing the lesson\'s definitions word for word',
          'Taking a full timed practice test to measure the lesson\'s impact',
        ],
        correctIndex: 1,
        explanation:
          'The course loop is learn, drill, apply, review — and the lesson is only the first step. Micro-drills make the pattern automatic, full questions combine it with other skills, and mistake review converts errors into lasting fixes. Reading ahead builds shallow familiarity that collapses under pressure, memorization is not reasoning, and full tests measure skill rather than building it.',
      },
      {
        kind: 'prose',
        md: 'A few practical notes. The app is local-first: it works offline and your progress lives on your device, so a subway ride is a study session. Sessions are designed for a phone: short lessons, tappable drills, and questions one at a time. And review is spaced — the app resurfaces skills you have not touched recently, because a pattern you could do three weeks ago and cannot do today was never truly learned.',
      },
      {
        kind: 'misconception',
        wrong: 'The fastest path is to read every lesson in order as quickly as possible, then start taking practice tests.',
        right:
          'Reading without drilling builds familiarity, not skill — you will recognize concepts without being able to use them under pressure. The drills and questions are where the learning happens; the lessons just give you the vocabulary. Expect to spend most of your time practicing, not reading.',
      },
      {
        kind: 'checkpoint',
        prompt: 'According to the course design, what should you do after reading a lesson on a new skill?',
        choices: [
          'Move immediately to the next lesson to keep momentum',
          'Do micro-drills isolating the pattern, then full questions using it, then review mistakes',
          'Take a full timed practice test to see if the lesson helped',
          'Reread the lesson until you can recite it from memory',
        ],
        correctIndex: 1,
        explanation:
          'The course loop is learn, drill, apply, review: the lesson gives you the concept, micro-drills isolate the pattern until it is automatic, full questions combine it with everything else, and mistake review (lesson 0.8) converts errors into progress. Skipping straight to the next lesson builds shallow familiarity that collapses under timed conditions, and memorization is no substitute for practiced reasoning.',
      },
      {
        kind: 'example',
        title: 'A sample week in Stage 1',
        body: 'Monday: read lesson 1.7 on conditional logic, work every example. Tuesday: 20 minutes of conditional micro-drills. Wednesday: a mixed set of full questions tagged with conditional reasoning, untimed, with full mistake review. Thursday: lesson 1.8 on translating conditional language. Friday: drills plus a short mixed review of 1.7 and 1.8. Weekend: rest or light review. Notice the ratio: one lesson, four practice sessions.',
      },
      {
        kind: 'summary',
        points: [
          'Stages build on each other: foundations → LR question types → RC → advanced → timed performance.',
          'The per-skill loop is learn → drill → apply → review; most of your time goes to practice, not reading.',
          'Progress is mastery-based: advance when accuracy shows the skill is solid.',
          'The app is local-first and phone-first, with spaced review of older skills.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Name the four steps of the per-skill loop and say where most study time should go.',
        answer:
          'Learn (the lesson), drill (micro-drills isolating the pattern), apply (full questions), review (diagnose every mistake). Most study time should go to practicing — drills, questions, and review — not to reading lessons.',
      },
      {
        kind: 'next',
        text: 'Next, lesson 0.8 teaches the mistake-review method that makes the whole loop work: how to turn a wrong answer into a permanent improvement.',
      },
    ],
  },
  {
    id: '0.8',
    stage: 0,
    title: 'How to Review a Mistake',
    estimatedMinutes: 10,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Here is the uncomfortable truth about LSAT prep: the questions you get right teach you almost nothing, and the questions you get wrong teach you everything — but only if you review them properly. Most students review by reading the explanation, nodding, and moving on. A week later they miss the same question type the same way. There is a better method, and it takes about three minutes per mistake.',
      },
      {
        kind: 'prose',
        md: 'The core insight is that a wrong answer is a symptom, and the explanation tells you the diagnosis — but reading a diagnosis is not treatment. Treatment is reconstructing, in your own words, exactly what went wrong in your thinking and what you will do differently. That reconstruction is what rewires the habit.',
      },
      {
        kind: 'worked',
        title: 'The five-step mistake review',
        steps: [
          {
            label: 'Step 1 — Re-read without the answer key',
            body: 'Cover the correct answer. Re-read the stimulus and the question as if seeing them fresh. Often you will spot your error before any explanation — that self-correction is the most valuable kind.',
          },
          {
            label: 'Step 2 — Find the exact decision point',
            body: 'Pinpoint the moment things went wrong. Was it in reading (you missed a "not")? In structure (you mistook a premise for the conclusion)? In evaluation (you picked a choice that strengthened instead of weakening)? Be specific.',
          },
          {
            label: 'Step 3 — Name the error',
            body: 'Give it a name from your growing vocabulary: "conclusion–premise confusion," "reversed the conditional," "picked a true-but-irrelevant choice." Named errors are trackable; vague ones ("I misread") are not.',
          },
          {
            label: 'Step 4 — Write the correction',
            body: 'Write one sentence in your own words: what you should have done. "I should have checked what the conclusion actually claims before evaluating the choices." This sentence is the lesson you are keeping.',
          },
          {
            label: 'Step 5 — Schedule the redo',
            body: 'Mark the question for redo in a few days. Getting it right on review proves nothing — your memory of the explanation is doing the work. Getting it right cold, days later, proves the fix stuck.',
          },
        ],
      },
      {
        kind: 'keyterm',
        term: 'Error log',
        definition:
          'Your running list of named mistakes and one-sentence corrections. Reviewed weekly, it shows your recurring patterns — the three or four errors responsible for most of your missed points — which is where targeted drilling pays off fastest.',
      },
      {
        kind: 'checkpoint',
        prompt: 'You missed a weaken question and read the explanation. It makes sense now. According to the five-step method, what is still missing?',
        choices: [
          'Nothing — understanding the explanation completes the review',
          'Reconstructing your exact error in your own words, naming it, and scheduling a redo',
          'Doing twenty more weaken questions immediately',
          'Memorizing the correct answer choice',
        ],
        correctIndex: 1,
        explanation:
          'Understanding someone else\'s explanation is passive and produces the illusion of learning — the reasoning is always clear when someone else does it. The five-step method requires you to find your own decision point, name the error specifically, write the correction yourself, and prove the fix with a delayed redo. Without that active reconstruction, you will likely miss the same question type the same way next week.',
      },
      {
        kind: 'example',
        title: 'A filled-in error note',
        body: 'Question: weaken question about a traffic study. My pick: (C) "The study surveyed only downtown drivers." Correct: (E). Decision point: I never identified the conclusion — the argument was about commute times citywide, and I evaluated choices against a vague sense of the topic. Error name: skipped conclusion identification. Correction: "Always state the conclusion in my own words before touching the choices." Redo: Friday.',
      },
      {
        kind: 'misconception',
        wrong: 'Reviewing a mistake means reading the explanation until it makes sense.',
        right:
          'Understanding an explanation is passive — it feels like learning because the reasoning is clear when someone else does it. Real review is active: you reconstruct your error, name it, write the correction yourself, and prove the fix with a later redo. If you cannot explain your error without looking, you have not reviewed it.',
      },
      {
        kind: 'checkpoint',
        prompt: 'You missed a flaw question. Which review sequence actually fixes the underlying problem?',
        choices: [
          'Read the explanation, note the correct answer, move on to keep pace',
          'Re-read the stimulus fresh, pinpoint where your reasoning diverged, name the error, write your own correction sentence, and redo the question in a few days',
          'Memorize the correct answer choice so you recognize it next time',
          'Do ten more flaw questions immediately to overwrite the mistake with volume',
        ],
        correctIndex: 1,
        explanation:
          'Passive review — reading explanations or memorizing answers — produces the illusion of learning without changing the habit that caused the error. The five-step method forces you to reconstruct your exact decision point, name the error so it becomes trackable, articulate the correction in your own words, and verify with a delayed redo. Volume without diagnosis just rehearses the same mistake faster.',
      },
      {
        kind: 'summary',
        points: [
          'Wrong answers are the richest study material — but only with active review.',
          'The five steps: re-read fresh, find the decision point, name the error, write the correction, schedule a redo.',
          'Named, specific errors ("reversed the conditional") are fixable; vague ones ("I misread") are not.',
          'Keep an error log; your recurring patterns reveal your highest-value drills.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'List the five steps of mistake review from memory.',
        answer:
          'Re-read the question without the answer key; find the exact decision point where your reasoning went wrong; name the error specifically; write a one-sentence correction in your own words; schedule a redo of the question in a few days.',
      },
      {
        kind: 'next',
        text: 'Next, the final orientation lesson, 0.9: how official practice tests from LawHub fit into your preparation — and the mistake of using them too early.',
      },
    ],
  },
  {
    id: '0.9',
    stage: 0,
    title: 'How Official LawHub Practice Fits',
    estimatedMinutes: 8,
    skills: [],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: 'Everything in this course is original practice material — written fresh, never recycled from real tests. That is a deliberate choice: it keeps the course legal and lets us target each skill precisely. But at some point you need to face the real thing: actual LSAT questions, in the official interface, under official conditions. That is what LawHub is for.',
      },
      {
        kind: 'prose',
        md: 'LawHub is the test maker\'s own platform, and it includes real, previously administered practice tests in the exact digital interface you will use on test day. A handful of these tests are free; more are available with a subscription. Because the questions are real and the interface is identical, a LawHub practice test is the most faithful rehearsal available — the closest thing to test day without it being test day.',
      },
      {
        kind: 'prose',
        md: 'The key question is when to use them. Official tests are a finite resource — there are only so many, and once you have seen a question, it can never measure you again. So the order matters: build skills in this course first (lessons, drills, original questions), then use official tests to calibrate. A good rhythm is one full official test every few weeks once your foundations are solid, each followed by the same rigorous mistake review from lesson 0.8.',
      },
      {
        kind: 'checkpoint',
        prompt: 'You are in week 2 of preparation and considering your first full official practice test. What is the best advice?',
        choices: [
          'Take it now — official tests are the fastest way to build skills',
          'Wait until foundations are solid, then use official tests as timed calibrations with full mistake review',
          'Take one every day to build endurance as fast as possible',
          'Save every official test for the final week before the exam',
        ],
        correctIndex: 1,
        explanation:
          'Official tests measure skill rather than building it, and the supply of unseen real questions is finite — burning them before your foundations exist wastes the resource while teaching little. Once skills are in place, a timed official test every few weeks calibrates your progress and reveals which patterns still break under pressure. Hoarding them all until the last week leaves no time to fix what they expose.',
      },
      {
        kind: 'misconception',
        wrong: 'The fastest way to improve is to take as many official practice tests as possible, starting now.',
        right:
          'Practice tests measure your skill; they do not build it. Taking tests before your foundations are solid burns your finite supply of real questions while teaching you little — you will simply confirm, repeatedly, that you cannot yet do what you have not learned. Build first with drills and lessons, then measure with official tests.',
      },
      {
        kind: 'checkpoint',
        prompt: 'You have finished Stage 1 foundations and are scoring well on untimed drills. What is the best next use of an official LawHub practice test?',
        choices: [
          'Save all official tests until the final week before the exam',
          'Take one now under timed conditions, then apply the five-step mistake review to every miss',
          'Work through it untimed, one question per day, to make it last',
          'Take three in a row this weekend to build endurance quickly',
        ],
        correctIndex: 1,
        explanation:
          'With foundations in place, an official test is valuable as a timed calibration: it shows how your skills hold up under real conditions and reveals which patterns still break under pressure. Each one then gets the full five-step mistake review, which converts the measurement into learning. Hoarding all tests until the last week leaves no time to fix what they reveal, while burning several at once wastes a finite resource.',
      },
      {
        kind: 'example',
        title: 'A sensible integration over eight weeks',
        body: 'Weeks 1–4: course lessons and drills only; no official tests. Week 5: first official test, timed, Saturday morning, test-like conditions; Sunday is pure mistake review. Weeks 6–7: back to targeted drilling on the weaknesses the test exposed, plus one more official test. Week 8: final official test as a dress rehearsal, light review after. Total official tests used: three — each one fully mined for lessons.',
      },
      {
        kind: 'prose',
        md: 'Two final notes. First, expect score fluctuation between official tests — a few points of noise is normal (remember the score band from lesson 0.5), so judge yourself by the trend, not any single sitting. Second, review official tests blind where you can: re-attempt missed questions before reading explanations, exactly as lesson 0.8 prescribes. The official questions deserve the same discipline as everything else.',
      },
      {
        kind: 'summary',
        points: [
          'LawHub offers real, previously administered tests in the official interface — the most faithful rehearsal available.',
          'Official tests are finite: build skills in this course first, then use tests to calibrate.',
          'One full timed test every few weeks, each followed by rigorous five-step mistake review.',
          'Judge the trend across tests, not single sittings; score noise of a few points is normal.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why should you not start with official practice tests, and when should you use them?',
        answer:
          'Official tests measure skill rather than building it, and the supply of unseen real questions is finite — using them too early burns the resource while teaching little. Use them after foundations are solid, as timed calibrations every few weeks, each followed by full mistake review.',
      },
      {
        kind: 'next',
        text: 'Orientation complete. Stage 1 begins with lesson 1.1: the most fundamental skill in the course — telling an argument apart from a passage that merely reports facts.',
      },
    ],
  },
];
