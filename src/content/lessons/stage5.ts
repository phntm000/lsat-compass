/**
 * Stage 5 — Advanced Reading Comprehension (lessons 5.1–5.3).
 * All passages snippets, examples, and explanations are original.
 * Contract: content-schema.md §§0, 1, 4, 7, 9.
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

export const LESSONS_5: Lesson[] = [
  {
    id: '5.1',
    stage: 5,
    title: 'Reading Across Domains',
    estimatedMinutes: 9,
    skills: ['rc-application', 'rc-inference'],
    prerequisites: ['rc-passage-structure', 'rc-passage-map'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Reading Comprehension passages are drawn from four broad domains: **law, the humanities, the social sciences, and the natural sciences**. Almost every test-taker has a domain that makes their stomach drop — a dense paragraph about statutory interpretation, or a study of foraging behavior in ants. That anxiety is understandable, but it rests on a misunderstanding.

Every passage, whatever its subject, is built from the same small set of structural moves: a main point, supporting evidence, a competing view, a concession, a shift in the author's stance. Your job was never to be an expert in the topic. Your job is to track the argument — and arguments work the same way in every domain.`,
      },
      {
        kind: 'keyterm',
        term: 'Passage domain',
        definition:
          'The subject area a passage is drawn from — law, humanities, social science, or natural science. The domain changes the vocabulary and the examples, but not the underlying structure of the passage or the skills being tested.',
      },
      {
        kind: 'prose',
        md: `Each domain has habits worth recognizing, so the surface features stop distracting you:

- **Law:** rules, cases, and competing interpretations of a statute or doctrine. Ask: what does the author think the law *should* be, and who disagrees?
- **Humanities:** debates about meaning — an artwork, a text, a historical episode. Watch for interpretive claims ("the novel is really about…") and the evidence offered for them.
- **Social science:** studies and hypotheses about human behavior. Keep the study's *results* separate from the author's *interpretation* of those results — questions love the gap between the two.
- **Natural science:** phenomena and competing explanations. Track which explanation the author favors, and what evidence tips the balance.

In all four, ask the same three questions: What is the main point? Whose views are presented? Where does the author stand?`,
      },
      {
        kind: 'example',
        title: 'A law-domain paragraph, read structurally',
        body: `Section 12 of the Harbor Act bars "unreasonable" mooring fees. Harbor masters read "unreasonable" as any fee above operating cost; marina operators read it as any fee the market will bear. Professor Hale argues that both readings miss the statute's purpose, which was to keep small fishing boats — not luxury yachts — in the harbor.`,
        note: `You do not need to know maritime law to handle this. The structure — a rule, two rival readings, the author's critique — is all you need. The domain is decoration; the structure is the test.`,
      },
      {
        kind: 'worked',
        title: 'Reading a natural-science paragraph without a science background',
        steps: [
          {
            label: 'Step 1 — Find the phenomenon',
            body: `The first sentence introduces what needs explaining: certain deep-water corals glow green under blue light. You do not need to know why yet. Just label it: "phenomenon = coral glow." Naming the phenomenon gives the rest of the paragraph somewhere to attach.`,
          },
          {
            label: 'Step 2 — Find the competing explanations',
            body: `The paragraph offers two hypotheses: the glow attracts symbiotic algae, or it shields the coral from harmful light. Mark them as Rival A and Rival B. Natural-science passages almost always stage a contest between explanations — spotting the contest is half the battle.`,
          },
          {
            label: 'Step 3 — Mark the author\'s lean',
            body: `Phrases like "more plausibly" or "the evidence favors" tell you which explanation the author backs. Here the author favors the shielding hypothesis, citing an experiment where shaded corals glowed less. Your margin note: "Author → shielding."`,
          },
          {
            label: 'Step 4 — Note the concession',
            body: `The author admits the experiments do not rule out the algae hypothesis entirely. Concessions are favorite question targets ("The author would most likely agree that…"). A one-word note — "concedes: algae still possible" — captures it.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If a passage covers something I studied in college, I have an advantage.',
        right:
          'Outside knowledge is neutral at best and dangerous at worst. Every correct answer must be supported by the passage itself. Test-takers with background knowledge sometimes answer from memory instead of the text — and the test is designed to punish exactly that. Treat every passage as if you know nothing about the topic; the passage contains everything you need.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'You open a natural-science passage about a topic you have never heard of. What is the most productive first move?',
        choices: [
          'Skim quickly and hope the questions turn out to be easy.',
          'Read twice as fast as usual to bank time for the questions.',
          'Slow down slightly and map the structure: the phenomenon, the competing explanations, and where the author stands.',
          'Skip the passage entirely and return only if time remains.',
        ],
        correctIndex: 2,
        explanation:
          'Unfamiliar content tempts you to rush, but rushing is what makes hard passages expensive: you finish the paragraph with no map and have to re-read everything when the questions arrive. The productive move is to invest a little extra reading time mapping the structure — phenomenon, rival explanations, the author\'s lean — because nearly every question will point back to those elements. Skimming or skipping surrenders points you could earn; structure-mapping earns them back.',
      },
      {
        kind: 'example',
        title: 'A social-science paragraph: results vs. interpretation',
        body: `A 2019 survey of 400 remote workers found that those with dedicated home offices reported 22 percent fewer interruptions than those working from shared rooms. The researchers conclude that physical workspace, not personality, drives the productivity gap — a claim the passage's author calls "stronger than the data."`,
        note: `Two layers here: what the study found (fewer interruptions with home offices) and what the researchers claim it means (workspace drives productivity). The author's skepticism targets the second layer, not the first. Questions will probe whether you kept them separate.`,
      },
      {
        kind: 'retrieval',
        prompt:
          'Without looking back: name the four RC domains, and state the single structural question you should ask of every passage regardless of domain.',
        answer:
          'The four domains are law, humanities, social science, and natural science. Of every passage, ask: what is the main point, whose views are presented, and where does the author stand relative to those views?',
      },
      {
        kind: 'summary',
        points: [
          'RC passages rotate through four domains, but all four are built from the same structural moves: main point, evidence, competing views, concessions.',
          'Each domain has surface habits (statutes in law, studies in social science, rival explanations in natural science) — recognize them so they stop distracting you.',
          'In social-science and natural-science passages, keep results separate from interpretations, and phenomena separate from explanations.',
          'Outside knowledge is not required and can actively hurt: answer from the passage, never from memory.',
          'On unfamiliar topics, slow down slightly and map structure — it is faster than skimming and re-reading.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why can background knowledge in a passage\u2019s topic actually hurt your score?',
        answer:
          'Because it tempts you to answer from what you already know instead of what the passage says. Correct answers must be supported by the passage text, and the test includes traps that punish test-takers who rely on outside knowledge.',
      },
      {
        kind: 'next',
        text: 'Next, you will meet the one RC set that breaks the single-passage pattern: comparative passages, and the specific strategy they demand.',
      },
    ],
  },
  {
    id: '5.2',
    stage: 5,
    title: 'Single vs. Comparative Passages',
    estimatedMinutes: 9,
    skills: ['rc-comparative'],
    prerequisites: ['rc-other-viewpoints', 'rc-passage-map'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `One of the four Reading Comprehension sets is different: instead of a single passage, you get **two shorter passages** on related topics, followed by five to seven questions. This is the comparative set — and it punishes test-takers who treat it like a normal passage.

The reason is simple. In a single-passage set, most questions ask about *that passage*: its main point, its details, its inferences. In a comparative set, many questions ask about the **relationship between the passages**: where they agree, where they disagree, how one responds to the other. If you read both passages as one continuous argument, you will blend viewpoints together — and the questions are designed to catch exactly that.`,
      },
      {
        kind: 'keyterm',
        term: 'Comparative passage set',
        definition:
          'A pair of shorter passages (roughly half the length of a single passage each) on related topics, followed by 5–7 questions. Many of those questions test the relationship between the passages — agreement, disagreement, or different angles on the same issue — rather than either passage alone.',
      },
      {
        kind: 'prose',
        md: `The strategy has three parts. First, read Passage A for its **main point** — resist the urge to memorize details; you are after the headline. Second, read Passage B for its **main point**, the same way. Third, before touching the questions, state the relationship between the passages in **one sentence** of your own.

Common relationships to listen for:

- **B disagrees with A** — the most direct kind: same topic, opposite conclusions.
- **B agrees but adds** — same side, new evidence or a new reason.
- **B applies A** — A states a general idea; B tests it on a specific case.
- **B qualifies A** — B accepts A's point but limits it: "true, except when…"
- **Different angles** — the passages discuss related topics but do not directly engage each other.

Writing that one sentence — "A says X, but B says Y" — is the single highest-value move in a comparative set. Most of the questions will be answered from it.`,
      },
      {
        kind: 'example',
        title: 'A direct-disagreement pair',
        body: `Passage A argues that community murals preserve neighborhood identity: painted by residents, they record local history and resist the visual sameness of redevelopment. Passage B argues that celebrated mural districts accelerate gentrification: the artwork raises the area's profile, rents follow, and the very residents the murals depict are priced out.`,
        note: `One-sentence relationship: "Both passages discuss the social effects of community murals, but A sees them as preserving community while B sees them as driving residents out." Hold that sentence; the questions will orbit it.`,
      },
      {
        kind: 'worked',
        title: 'Mapping a comparative pair in four steps',
        steps: [
          {
            label: 'Step 1 — Headline Passage A',
            body: `After reading A, cover the details and state the headline: "Murals preserve neighborhood identity." If you cannot state it in one clause, re-read the first and last sentences — the headline usually lives there.`,
          },
          {
            label: 'Step 2 — Headline Passage B',
            body: `Same treatment for B: "Mural districts accelerate gentrification and displacement." Note whose view each headline represents — these are the passages' positions, and you must not mix them up later.`,
          },
          {
            label: 'Step 3 — Find the overlap',
            body: `Ask what both passages are talking about: the social impact of community murals. The overlap is the ground they share; the questions about "both passages" will stand on it. Be precise here — vague overlap ("art") produces vague answers.`,
          },
          {
            label: 'Step 4 — Name the divergence in one sentence',
            body: `"Both passages discuss the social impact of community murals, but A sees them as preserving community while B sees them as displacing residents." Write it or say it aloud. This sentence is your answer key for every relationship question in the set.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Read both passages as one continuous argument — it is faster.',
        right:
          'Blending the passages is the classic comparative-set error. The questions test whether you know who said what: which passage would agree with a new claim, where exactly they diverge, what one author would say about the other\'s evidence. Keep each passage\'s viewpoint in its own labeled container — "A says / B says" — and the relationship questions become straightforward.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'Which of the following questions would you expect in a comparative set but rarely in a single-passage set?',
        choices: [
          'Which of the following best states the main point of the passage?',
          'The two passages disagree most directly about whether…',
          'The author\u2019s attitude toward the proposal is best described as…',
          'The passage is primarily organized by…',
        ],
        correctIndex: 1,
        explanation:
          'Main point, author attitude, and organization questions appear in both formats — every passage has a main point and an attitude. What is distinctive about comparative sets is the relationship between the passages: agreement, disagreement, and how one passage bears on the other. "The two passages disagree most directly about…" cannot be asked of a single passage, and questions in this family are the reason comparative sets need their own strategy.',
      },
      {
        kind: 'example',
        title: 'A subtler pair: partial agreement, different diagnosis',
        body: `Passage A argues that urban tree-planting programs fail because cities choose fast-growing species that die young. Passage B does not dispute the mortality figures — but argues the real cause is maintenance funding: even hardy species die without watering, pruning, and protection in their first three years.`,
        note: `One-sentence relationship: "Both passages agree the programs fail, but A blames species choice while B blames maintenance funding." Notice B does not deny A's facts; it reassigns the cause. Comparative questions love this move — "Passage B's argument is most vulnerable to which criticism from Passage A's author?" only works if you kept the diagnoses separate.`,
      },
      {
        kind: 'retrieval',
        prompt:
          'After reading both passages of a comparative set, what three things should you be able to state before looking at the questions?',
        answer:
          'Passage A\u2019s main point, Passage B\u2019s main point, and the relationship between the passages expressed in a single sentence (e.g., "A says X, but B says Y").',
      },
      {
        kind: 'summary',
        points: [
          'One RC set is comparative: two shorter passages, 5–7 questions, many testing the relationship between the passages.',
          'Strategy: headline each passage separately, then state the relationship in one sentence before answering questions.',
          'Learn the common relationships: direct disagreement, agree-and-add, application, qualification, and different angles.',
          'Keep viewpoints in separate labeled containers ("A says / B says") — blending them is the classic error.',
          'Subtle pairs may agree on facts but differ on diagnosis; name the exact point of divergence.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why is blending the two passages\u2019 viewpoints dangerous?',
        answer:
          'Because comparative questions specifically test whether you know who said what — where the passages agree, where they diverge, and what one author would say about the other\u2019s claims. If the viewpoints are blended in your head, every relationship question becomes a guess.',
      },
      {
        kind: 'next',
        text: 'Next: timed RC execution — how to split your minutes between reading and questions, and why different passages deserve different reading budgets.',
      },
    ],
  },
  {
    id: '5.3',
    stage: 5,
    title: 'Timed RC Execution',
    estimatedMinutes: 10,
    skills: ['rc-inference'],
    prerequisites: ['rc-passage-map', 'f-deduction'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Reading Comprehension is where timing plans go to die. Thirty-five minutes, four passage sets — about **8 minutes 45 seconds per set** — and every set contains a passage that rewards careful reading plus questions that punish careless reading. Most timing disasters in RC share one root cause: the reader treated reading time and question time as enemies, and starved one to feed the other.

The truth is that reading and answering are allies. A well-read passage makes its questions fast; a skimmed passage makes its questions slow, because you re-read every hard paragraph under pressure. Timed RC execution means budgeting deliberately — and accepting that different passages deserve different budgets.`,
      },
      {
        kind: 'keyterm',
        term: 'Reading budget',
        definition:
          'How you split your roughly 8–9 minutes per passage set between reading the passage and answering its questions. There is no single correct split — dense passages earn a larger reading budget, straightforward ones a smaller one.',
      },
      {
        kind: 'prose',
        md: `Start from these baselines, then adjust to the passage in front of you:

- **Straightforward passage:** ~3 minutes reading, ~5 minutes on questions. The structure is clear; invest in accuracy on the questions.
- **Dense passage** (law, heavy science, tangled viewpoints): ~4 to 4.5 minutes reading, ~4 minutes on questions. The extra reading pays for itself — questions go twice as fast when you already hold the map.
- **Comparative set:** ~2.5 minutes on Passage A, ~2 minutes on Passage B, ~3.5 minutes on questions. Remember the one-sentence relationship before you start.

Two more rules. First, **line-referenced questions are fast**: when a question points you to lines, go back to the text — do not answer from memory. Second, **flag and move**: if a question resists after about 90 seconds, choose your best answer, flag it, and return only if time remains. One stubborn question must never eat a whole set.`,
      },
      {
        kind: 'example',
        title: 'Two passages, two budgets',
        body: `Passage 1: a law passage on competing interpretations of a takings-clause doctrine, with three scholars cited and the author's position emerging only in the final paragraph. Budget: 4+ minutes reading — map every viewpoint or the questions will ambush you.

Passage 2: a humanities passage narrating how one painter's reputation rose, fell, and rose again. Clear timeline, one thesis. Budget: 2.5 minutes reading — the structure is visible at a glance, so spend your minutes on the questions.`,
        note: `Same section, different budgets. The skill is reading the passage's density in the first paragraph and setting the budget accordingly — not applying one fixed split to all four sets.`,
      },
      {
        kind: 'worked',
        title: 'Planning a 35-minute RC section',
        steps: [
          {
            label: 'Step 1 — Set per-set checkpoints',
            body: `Before you begin, note three clock times: roughly 8:45, 17:30, and 26:15 elapsed. Each marks the end of one passage set. These are checkpoints, not alarms — they tell you where you stand, nothing more.`,
          },
          {
            label: 'Step 2 — Read with a map, not a memory',
            body: `As you read, track viewpoints and structure in the margin or in your head: main point, rival views, the author's stance, concessions. You are building the thing the questions will query. Detail memorization is a waste; structure mapping is the investment.`,
          },
          {
            label: 'Step 3 — Answer line-referenced questions first',
            body: `Within a set, the questions that cite specific lines are usually the fastest — the passage does the work. Clearing them first banks time and re-exposes you to key paragraphs, which quietly helps with the harder inference questions.`,
          },
          {
            label: 'Step 4 — Flag and move past the stubborn ones',
            body: `Any question that survives 90 seconds of honest work gets your best current answer, a flag, and your absence. Return to flagged questions only after the set's other questions are answered. Protect the set's easy points before spending on its hard ones.`,
          },
          {
            label: 'Step 5 — Close out the section deliberately',
            body: `With about two minutes left, return to flagged questions. With thirty seconds left, stop solving: fill every remaining blank with your best guess. An unanswered question is a guaranteed miss; a guess is a chance.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'To finish on time, read every passage as fast as possible and save the minutes for questions.',
        right:
          'Skimmed passages generate re-reading: you will read the hard paragraphs three times under pressure instead of once with composure. A careful first read is the fastest way through a difficult passage, because the questions then take seconds instead of minutes. Speed up on easy passages; slow down on dense ones. Uniform speed is the enemy.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'You are four minutes into reading a dense law passage and still have its questions — plus three more sets — ahead of you. What should you do?',
        choices: [
          'Abandon the passage and guess on its questions to protect the clock.',
          'Rush the remaining paragraphs so you can catch up to your planned pace.',
          'Finish reading carefully — the investment pays off in faster questions — then keep a brisker pace on the next, easier set.',
          'Skip to the questions now and answer them from what you remember.',
        ],
        correctIndex: 2,
        explanation:
          'Four careful minutes on a dense passage is not falling behind; it is the correct budget for that passage, and it will make the questions dramatically faster than a rushed read would. Abandoning or rushing surrenders the set\'s points to save minutes you would then spend re-reading anyway. The right adjustment is forward-looking: finish this passage properly, then recover time on a future set whose passage is straightforward enough for a smaller reading budget.',
      },
      {
        kind: 'example',
        title: 'Triage within a set: which questions first?',
        body: `Many strong readers answer a set's questions in this order: specific detail and line-reference questions first (fast, and they re-anchor you in the text), then function and viewpoint questions, then main-point and primary-purpose questions last. By the time you reach the main-point question, you have effectively re-read the whole passage through its questions — and the answer is obvious.`,
        note: `This is one viable order, not a law. The principle behind it: let the easy, text-anchored questions build your command of the passage before you spend on the big-picture ones.`,
      },
      {
        kind: 'retrieval',
        prompt:
          'Write your personal per-set time budget: how many minutes for reading, how many for questions, and your flag-and-move rule — then say when you would deviate from it.',
        answer:
          'Example: 3–4 minutes reading (more for dense passages, less for clear ones), 4–5 minutes on questions; flag any question that resists after ~90 seconds and move on. Deviate when the passage\u2019s density demands it — dense law or science passages earn a larger reading budget.',
      },
      {
        kind: 'summary',
        points: [
          'Budget about 8:45 per RC set, split deliberately between reading and questions — the split depends on the passage, not on a fixed formula.',
          'Dense passages earn 4+ minutes of careful reading; the investment returns as faster, more accurate questions.',
          'Comparative sets split reading across both passages (~2.5 + ~2 minutes) plus the one-sentence relationship before questions.',
          'Answer line-referenced questions first; they are fast and re-anchor you in the text.',
          'Flag any question that resists after ~90 seconds; never let one question consume a set. Fill every blank before time expires.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why is a careful first read faster than skimming on a hard passage?',
        answer:
          'Because skimming leaves you without a structural map, so every hard question forces a re-read of the difficult paragraphs under time pressure. One careful read builds the map once, and the questions then take seconds instead of minutes.',
      },
      {
        kind: 'next',
        text: 'Stage 6 turns to Logical Reasoning under the clock: pacing awareness, performance tracking, and the art of the strategic skip.',
      },
    ],
  },
];

