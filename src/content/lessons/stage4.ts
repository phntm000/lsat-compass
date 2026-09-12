/**
 * Stage 4 — Reading Comprehension foundations (lessons 4.1–4.16).
 * All passage excerpts, examples, and explanations are original.
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

export const LESSONS_4: Lesson[] = [
  {
    id: '4.1',
    stage: 4,
    title: 'What LSAT Reading Comprehension Tests',
    estimatedMinutes: 10,
    skills: ['rc-passage-structure'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Reading Comprehension is one of the three scored sections on the LSAT — two Logical Reasoning sections and one Reading Comprehension section, each 35 minutes. The RC section gives you about 27 questions across four passage sets: three single passages and one comparative set with two shorter passages. That is roughly a third of your score, and it tests something different from LR.\n\nLR tests your reasoning on short arguments. RC tests whether you can read like a lawyer: enter an unfamiliar, dense text cold, extract its structure, track who believes what, and answer precise questions about it — all without any outside knowledge. Nobody expects you to know archaeology or tax policy. They expect you to show, in 35 minutes, that you can take a text apart and put it back together correctly.`,
      },
      {
        kind: 'keyterm',
        term: 'Reading Comprehension (LSAT)',
        definition:
          'The scored section that tests your ability to understand dense, unfamiliar prose under time pressure. It rewards structural reading — knowing what each paragraph is doing, whose viewpoint it expresses, and how the parts fit together — not memory, speed-reading, or prior knowledge of the topic.',
      },
      {
        kind: 'example',
        title: 'What an RC passage actually asks of you',
        body: `Read this short passage the way the test wants you to read:\n\n"When the city of Harrow released its tree-canopy survey, the headline number was encouraging: canopy cover had grown from 19 to 24 percent in a decade. The forestry department credited its street-tree program and declared the city's shade crisis over.\n\nThe celebration was premature. The survey counted every tree on public and private land, and nearly all the growth came from private backyards in two wealthy wards. In the dense rental districts where summer heat harms the most residents, canopy cover had actually fallen — from 11 to 9 percent. The department's own data, read carefully, told the opposite story of the one it announced."\n\nAn RC question will not ask you to recite "19 to 24 percent." It will ask things like: What is the author's attitude toward the department's announcement? (Skeptical — "the celebration was premature.") What is the function of the second paragraph? (To undermine the first paragraph's conclusion with a closer look at the data.) What can be inferred? (The street-tree program did not cause most of the measured growth.) Every one of those is answered by structure, not memory.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what does LSAT Reading Comprehension primarily reward — memory, speed, prior knowledge, or structural reading?',
        answer:
          'Structural reading: the ability to identify what each part of a passage is doing, whose viewpoint it expresses, and how the parts fit together. Memory, speed, and prior knowledge are not what is tested — detail questions give you line references, and no outside knowledge is ever required.',
      },
      {
        kind: 'worked',
        title: 'How an RC section is built, step by step',
        steps: [
          {
            label: 'Step 1 — Four passage sets, one clock',
            body: `You get 35 minutes for four sets: three single passages (roughly 450–650 words each) and one comparative set (two shorter passages on the same topic). That is about 8–9 minutes per set, reading plus questions. The pacing implication is immediate: you cannot afford to read a passage twice. Your first read has to be a structural read — one pass that captures the skeleton.`,
          },
          {
            label: 'Step 2 — Passages come from four domains',
            body: `Law, humanities, social science, and natural science. The domains rotate, and your comfort with the topic is irrelevant by design — a physics passage and a poetry passage are built from the same structural parts and ask the same families of questions. If a topic intimidates you, that is useful information: it means you are reading for content instead of structure.`,
          },
          {
            label: 'Step 3 — Questions come in families',
            body: `Every RC question belongs to a family you will master in this stage: big-picture questions (main point, primary purpose, organization), viewpoint questions (author's view, others' views, attitude and tone), evidence questions (detail, inference), and job questions (function of a paragraph or detail, application, analogy). Comparative sets add one more family: how the two passages relate. When you know the families, no question surprises you.`,
          },
          {
            label: 'Step 4 — The skill this stage builds',
            body: `Stage 4 teaches you to read for structure first and detail second. Lessons 4.2 through 4.4 give you the structural toolkit: passage structure, paragraph roles, and the passage map. Lessons 4.5 through 4.16 then teach each question family as an application of that toolkit. The through-line never changes: structure first, and the questions answer themselves.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Reading Comprehension tests how much of the passage you can remember and how fast you can read. I should memorize details as I go.',
        right: 'RC tests whether you understand the passage, not whether you memorized it. Detail questions tell you where to look — they cite lines or distinctive phrases — so memorizing details wastes the time you need for structure. Read once for the skeleton: thesis, viewpoints, and how the paragraphs connect. The details will still be there when a question sends you back for them.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which of the following best describes what LSAT Reading Comprehension primarily tests?',
        choices: [
          'How many specific details you can recall from a passage after one reading',
          'How quickly you can read through dense academic prose',
          'Your prior knowledge of the passage topic, such as science or law',
          'Your ability to grasp a passage\'s structure, viewpoints, and precise meaning',
        ],
        correctIndex: 3,
        explanation:
          'RC primarily tests structural understanding: what the passage argues, how it is organized, whose viewpoints appear, and what precisely follows from the text. It does not test recall — detail questions give line references so you can look back — and it does not test reading speed or prior knowledge, since every passage is self-contained and no outside facts are ever required. Students who treat it as a memory or speed test misallocate their effort: they memorize details no question asks about, or rush past the structural signals that the actual questions target.',
      },
      {
        kind: 'example',
        title: 'Deeper: your roadmap for Stage 4',
        body: `Here is where each lesson fits:\n\n- **Structure toolkit:** 4.2 Passage Structure (the recurring parts: thesis, competing view, evidence, concession, transition, application, unresolved issue), 4.3 Paragraph Roles ("why is this paragraph here?"), 4.4 Passage Map (lightweight notes, not a transcript).\n- **Big picture:** 4.5 Main Point (what the author claims), 4.6 Primary Purpose (why the author wrote), 4.15 Organization (how the passage is built).\n- **Viewpoints:** 4.7 Author Viewpoint, 4.8 Other Viewpoints, 4.9 Attitude and Tone.\n- **Evidence:** 4.10 Detail and Reference, 4.11 Inference.\n- **Jobs:** 4.12 Function (why is this detail here?), 4.13 Application (use the passage's idea elsewhere), 4.14 Analogy (match the relationship).\n- **Comparative:** 4.16 Comparative Reading (agreement, disagreement, shared assumptions, how A would respond to B).\n\nEvery family is a different lens on the same skill: reading for structure. Learn the toolkit first; the families become straightforward.`,
      },
      { kind: 'tryit', drillIds: ['d-c041', 'd-c043', 'd-c046'] },
      {
        kind: 'summary',
        points: [
          'RC is one of three scored sections: ~27 questions, four passage sets, 35 minutes — about 8–9 minutes per set.',
          'It tests structural reading of unfamiliar prose: thesis, viewpoints, organization, precise meaning.',
          'No outside knowledge is ever required; detail questions give you line references.',
          'Read once for the skeleton, not for memorized details — questions send you back for specifics.',
          'Stage 4 order: structure toolkit first (4.2–4.4), then each question family as an application of it.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Your study partner says, "I am bad at science, so I always miss the science passage." What is the flaw in that framing, and what should they focus on instead?',
        answer:
          'The flaw is treating RC as a content test: the topic is irrelevant by design, and science passages are built from the same structural parts as humanities passages. Instead of the topic, they should focus on structure — the thesis, the competing views, what each paragraph is doing — which is identical across all four domains.',
      },
      {
        kind: 'next',
        text: 'You know what RC tests. Next, lesson 4.2: Passage Structure — the seven recurring parts that nearly every LSAT passage is built from.',
      },
    ],
  },
  {
    id: '4.2',
    stage: 4,
    title: 'Passage Structure',
    estimatedMinutes: 12,
    skills: ['rc-passage-structure'],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `LSAT passages look different on the surface — one is about lichen on Andean stonework, the next about congestion pricing — but underneath, they are built from the same small set of parts. Authors introduce a thesis, acknowledge a competing view, offer evidence, concede a point, transition to the stakes, apply the idea, or leave an issue unresolved. Learn to recognize these seven moves and every passage becomes familiar on first read.\n\nThis matters because RC questions are written against structure. "The author mentions the critics in order to…" is a question about the competing-view move. "Which best states the main point?" is a question about the thesis move. When you can name the parts, the questions are asking about things you already labeled.`,
      },
      {
        kind: 'keyterm',
        term: 'Passage structure',
        definition:
          'The recurring argumentative parts of an LSAT passage: the thesis (the author\'s central claim), competing views, evidence, concessions, transitions, applications, and unresolved issues. Identifying these parts while reading — rather than just following the topic — is structural reading.',
      },
      {
        kind: 'example',
        title: 'The seven moves, in miniature',
        body: `Watch all seven moves in three sentences: "Cities should replace downtown parking minimums with maximums. **(thesis)** Developers object that tenants need cars **(competing view)**, and they are right that transit-poor neighborhoods are different **(concession)** — but in transit-rich cores, every mandated space induces another car **(evidence)**. The real question is whether councils will act before the next garage is poured **(unresolved issue)**."\n\nThe moves have signal words: "should" and verdict language mark the thesis; "object," "argue," "critics" mark competing views; "they are right that" marks concessions; data and studies mark evidence; "the real question" marks what is left unresolved. You do not need to memorize a list — you need to hear these signals while reading.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: name the seven structural moves and give the signal words for two of them.',
        answer:
          'Thesis, competing view, evidence, concession, transition, application, and unresolved issue. Signals include "should" or verdict language for the thesis, "critics argue" or "object" for competing views, "admittedly" or "they are right that" for concessions, and "the question remains" for unresolved issues.',
      },
      {
        kind: 'worked',
        title: 'Labeling the structure of a full passage',
        steps: [
          {
            label: 'Step 1 — Read the passage once, hunting for moves',
            body: `"For decades, archaeologists dated the stone terraces of the high Andes by the pottery shards buried at their bases. The method was convenient but circular: the shards were dated by the terraces, and the terraces by the shards. In the 1990s, researchers began using lichenometry — measuring the slow growth of lichen colonies on exposed stone — to date the terraces directly. The results suggested the terraces were centuries older than the pottery implied.\n\nNot everyone accepted the revision. Critics noted that lichen grows faster in the damp lower valleys than on the exposed ridges, and no single growth rate could be assumed across the whole terrace system. The lichenometrists conceded the point but argued that their calibration sites, chosen across different elevations, controlled for the variation. They published growth curves for three elevation bands, and the revised dates held.\n\nThe dispute matters beyond one valley. If the terraces are as old as the lichen suggests, the region's agricultural history must be rewritten: large-scale terracing began before, not after, the rise of the valley chiefdoms. Whether that rewriting survives will depend on a second, independent dating method — probably optically stimulated luminescence of the terrace soils — now underway."`,
          },
          {
            label: 'Step 2 — Find the thesis',
            body: `The thesis is the author's central claim: **the terraces are centuries older than the old pottery-based dating suggested**. It arrives at the end of paragraph 1, after the setup (the circular old method) and the new method (lichenometry). Note the placement: LSAT theses often appear at the end of the first paragraph or the start of the second, once the background is laid. The verdict-like language — "the results suggested" — is the signal.`,
          },
          {
            label: 'Step 3 — Mark the competing view, the concession, and the evidence',
            body: `Paragraph 2 opens with the **competing view**: "Not everyone accepted the revision" — the critics' objection about varying growth rates. Then comes a **concession**: "The lichenometrists conceded the point" — the author grants the critics something. Immediately followed by the rebuttal with **evidence**: calibration sites across elevations, published growth curves for three bands, and the revised dates holding. This concession-plus-rebuttal shape is one of the most common paragraph structures on the test: grant the objection, then answer it with evidence.`,
          },
          {
            label: 'Step 4 — Mark the transition, application, and unresolved issue',
            body: `Paragraph 3 opens with a **transition** to the stakes: "The dispute matters beyond one valley." Then the **application**: if the dates hold, the region's agricultural history must be rewritten — the idea applied to a wider consequence. Finally the **unresolved issue**: "Whether that rewriting survives will depend on a second, independent dating method… now underway." The passage does not end with a verdict; it ends with an open question. Recognizing that open ending protects you from inference questions that ask you to conclude more than the author did.`,
          },
          {
            label: 'Step 5 — See what the labels buy you',
            body: `With the moves labeled, the question families become easy to anticipate. Main point? The thesis from step 2. Author's attitude toward the critics? Respectful but unpersuaded — the concession was genuine, the rebuttal held. Function of the growth-curve detail? Evidence answering the objection. What can be inferred about the agricultural history? Only the conditional: *if* the dates hold, it must be rewritten — not that it has been. Structure first; the questions follow.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Passage structure means outlining the topics — paragraph 1 is about pottery, paragraph 2 is about lichen, paragraph 3 is about history.',
        right: 'A topic outline tells you what the passage mentions; structure tells you what each part is doing. "Paragraph 2 is about lichen" will not answer a single question. "Paragraph 2 presents the critics\' objection, concedes part of it, and rebuts it with evidence" answers function questions, attitude questions, and inference questions. Always label the job, not the topic.',
      },
      {
        kind: 'checkpoint',
        prompt: 'In the terraces passage, consider this sentence: "The lichenometrists conceded the point but argued that their calibration sites, chosen across different elevations, controlled for the variation." What structural move is this?',
        choices: [
          'The thesis — the author\'s central claim about the terraces\' age',
          'A concession followed by a rebuttal supported with evidence',
          'A transition to the broader stakes of the dispute',
          'An unresolved issue left open for future research',
        ],
        correctIndex: 1,
        explanation:
          'This is a concession followed by a rebuttal: "conceded the point" explicitly grants the critics\' objection about varying growth rates, and "but argued that…" answers it with the evidence of elevation-varied calibration sites. It is not the thesis, which is the claim that the terraces are centuries older (established in paragraph 1). It is not a transition to the stakes — that is paragraph 3\'s "The dispute matters beyond one valley" — and it is not an unresolved issue, because the sentence resolves the objection rather than leaving it open. The concession-plus-rebuttal shape is worth recognizing instantly: it signals an author who is fair-minded but unpersuaded.',
      },
      {
        kind: 'example',
        title: 'Deeper: three skeletons the moves combine into',
        body: `Most passages are one of three skeletons built from the seven moves:\n\n1. **Problem → new solution → defense.** An old method fails (problem), a new approach is proposed (thesis), objections are raised and answered (competing view, concession, evidence). The terraces passage is this skeleton.\n2. **Phenomenon → competing explanations → verdict.** Something puzzling is described, two or more explanations compete, and the author favors one — or declares the issue unresolved.\n3. **Received view → complication → revised view.** The conventional wisdom is stated, new evidence complicates it, and the author offers a qualified revision (often ending with an application or an open question).\n\nYou do not need to name the skeleton on test day. You need to feel, by paragraph 2, which shape you are in — because each shape tells you where the thesis lives and what the final paragraph will do.`,
      },
      { kind: 'tryit', drillIds: ['d-c042', 'd-c044', 'd-c048'] },
      {
        kind: 'summary',
        points: [
          'Every passage is built from seven moves: thesis, competing view, evidence, concession, transition, application, unresolved issue.',
          'Learn the signal words: verdict language, "critics argue," "conceded," data and studies, "the question remains."',
          'Label the job each part is doing, not its topic — jobs are what the questions ask about.',
          'The concession-plus-rebuttal shape (grant, then answer with evidence) is extremely common.',
          'Three skeletons cover most passages: problem→solution→defense, phenomenon→explanations→verdict, received view→complication→revision.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Explain the difference between a concession and a competing view, and why an author would include a concession.',
        answer:
          'A competing view is an objection or alternative position the author does not hold; a concession is the author granting that the other side has a point — before rebutting it or limiting its damage. Authors concede to appear fair-minded and to defuse objections on their own terms: "conceded the point but argued…" lets the author acknowledge the criticism while showing it does not defeat the thesis.',
      },
      {
        kind: 'next',
        text: 'You can name the parts. Next, lesson 4.3: Paragraph Roles — the question you ask of every paragraph: "Why is this paragraph here?"',
      },
    ],
  },
  {
    id: '4.3',
    stage: 4,
    title: 'Paragraph Roles',
    estimatedMinutes: 10,
    skills: ['rc-paragraph-roles'],
    prerequisites: ['rc-passage-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Lesson 4.2 gave you the seven structural moves. Now zoom in one level: every paragraph has a **role** — a reason the author put it exactly where it is. Strong readers ask of each paragraph, as they finish it, a single question: "Why is this paragraph here? What work is it doing for the passage?"\n\nThis question is directly tested. Function questions ask why a detail or paragraph was included; organization questions ask how the passage is built; even main-point questions get easier when you know which paragraph carries the thesis and which ones merely support it. Paragraph roles are the bridge between passage structure and the questions.`,
      },
      {
        kind: 'keyterm',
        term: 'Paragraph role',
        definition:
          'The argumentative job a paragraph performs in the passage — for example, introducing the thesis, presenting an objection, conceding and rebutting, providing evidence, or drawing out implications. A paragraph\'s role is its function in the author\'s reasoning, not its topic.',
      },
      {
        kind: 'example',
        title: 'One paragraph, one role',
        body: `Recall paragraph 2 of the terraces passage: "Not everyone accepted the revision. Critics noted that lichen grows faster in the damp lower valleys than on the exposed ridges, and no single growth rate could be assumed across the whole terrace system. The lichenometrists conceded the point but argued that their calibration sites, chosen across different elevations, controlled for the variation. They published growth curves for three elevation bands, and the revised dates held."\n\nTopic summary: "This paragraph is about lichen growth rates." Role: "This paragraph presents the critics' objection to the new dating, concedes its force, and rebuts it with the elevation-band evidence — defending the thesis against its strongest challenge." The first version answers nothing; the second answers function, attitude, and inference questions. Ask "why is it here?" and the answer is always a job.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what is the difference between a paragraph\'s topic and its role? Give an example of each for the same paragraph.',
        answer:
          'The topic is what the paragraph is about; the role is what the paragraph is doing for the passage\'s argument. For the terraces passage paragraph 2: topic — "lichen growth rates and the critics\' objection"; role — "presents the objection, concedes its force, and rebuts it with evidence, defending the thesis."',
      },
      {
        kind: 'worked',
        title: 'Assigning roles to all three paragraphs',
        steps: [
          {
            label: 'Step 1 — Paragraph 1: setup and thesis',
            body: `Paragraph 1 describes the old circular dating method, introduces lichenometry, and ends with the finding that the terraces are centuries older than thought. Its role: **establish the problem and introduce the thesis**. Signal: the paragraph moves from background ("For decades…") to a verdict-like claim ("The results suggested…"). First paragraphs very often do exactly this: background, then thesis. When you finish paragraph 1, you should be able to state the thesis — if you cannot, re-read before continuing.`,
          },
          {
            label: 'Step 2 — Paragraph 2: objection, concession, rebuttal',
            body: `Paragraph 2 opens with "Not everyone accepted the revision" — the classic objection signal — states the critics' case, concedes it ("conceded the point"), and rebuts with the calibration evidence. Its role: **defend the thesis against the strongest objection**. Notice the paragraph does three jobs in sequence, which is normal: a paragraph's role can be a small arc (object → concede → rebut) rather than a single move. The role question still has one answer: this paragraph exists to show the thesis survives its best challenge.`,
          },
          {
            label: 'Step 3 — Paragraph 3: stakes and open question',
            body: `Paragraph 3 opens "The dispute matters beyond one valley" — a scope-widening transition — applies the finding to agricultural history, and ends with the unresolved question of the second dating method. Its role: **draw out the implications and leave the final verdict open**. Final paragraphs on the LSAT very often do one of three things: apply the idea, qualify it, or point to unresolved issues. Expect one of those three; you will rarely be surprised.`,
          },
          {
            label: 'Step 4 — Check each role against the "why here?" test',
            body: `For each paragraph, verify the role explains its placement. Paragraph 1 must come first because the thesis needs the background. Paragraph 2 must come second because the objection only makes sense after the thesis. Paragraph 3 must come last because implications and open questions close a discussion. If a paragraph's role does not explain why it sits where it sits, your role label is probably describing the topic instead of the job — revise it.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Each paragraph has one simple role, like "background" or "evidence," and my job is to pick the right label from a list.',
        right: 'Paragraphs often perform a small arc of jobs — object, then concede, then rebut — and the role is the arc\'s overall purpose, not a single vocabulary word. Do not hunt for the perfect label; ask what work the paragraph does for the passage and phrase it as a job: "defends the thesis against its strongest objection." The phrasing can be yours — what matters is that it captures the function.',
      },
      {
        kind: 'checkpoint',
        prompt: 'What is the role of paragraph 2 in the terraces passage ("Not everyone accepted the revision…")?',
        choices: [
          'It introduces the thesis that the terraces are older than previously thought',
          'It presents background on how lichenometry works as a dating method',
          'It raises the critics\' objection, concedes its force, and rebuts it with evidence',
          'It concludes the passage by applying the findings to agricultural history',
        ],
        correctIndex: 2,
        explanation:
          'Paragraph 2 exists to defend the thesis against its strongest challenge: it states the critics\' objection about varying growth rates, concedes the point ("The lichenometrists conceded the point"), and then rebuts it with the elevation-band calibration evidence. It does not introduce the thesis — that happened at the end of paragraph 1. It is not background on the method, since its focus is the dispute over the method\'s reliability, not how the method works. And it does not conclude or apply the findings; the application to agricultural history and the open question belong to paragraph 3. The object-concede-rebut arc is the paragraph\'s role.',
      },
      {
        kind: 'example',
        title: 'Deeper: a working vocabulary of roles',
        body: `You do not need fixed labels, but these verbs cover nearly every paragraph you will meet: **introduces** (thesis, phenomenon, or problem), **describes** (background the argument needs), **presents** (a view, an objection, or evidence), **concedes** (grants the other side a point), **rebuts** (answers the objection), **qualifies** (limits or narrows a claim), **applies** (extends the idea to a new case), **compares** (sets two things side by side), **transitions** (shifts scope or stakes), **concludes** (delivers the verdict), and **leaves open** (points to the unresolved issue).\n\nPractice by tagging each paragraph of anything you read — news articles, essays — with one of these verbs plus its object: "rebuts the growth-rate objection," "applies the finding to agricultural history." After a dozen passages the tagging becomes silent and instant, which is exactly the speed the section demands.`,
      },
      { kind: 'tryit', drillIds: ['d-c043', 'd-c045', 'd-c049'] },
      {
        kind: 'summary',
        points: [
          'Ask of every paragraph: "Why is this paragraph here? What work is it doing?"',
          'A paragraph\'s role is its argumentative job, not its topic.',
          'Paragraphs often perform small arcs (object → concede → rebut); the role is the arc\'s purpose.',
          'First paragraphs usually set up and state the thesis; final paragraphs apply, qualify, or leave open.',
          'Check each role against placement: the role should explain why the paragraph sits where it does.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A study partner summarizes paragraph 2 of the terraces passage as "about the critics and lichen growth." What is missing, and how should they fix it?',
        answer:
          'That is a topic summary, not a role — it says what the paragraph mentions, not what work it does. The fix is to phrase it as a job: the paragraph presents the critics\' objection to the revised dates, concedes its force, and rebuts it with the elevation-band evidence, thereby defending the thesis against its strongest challenge.',
      },
      {
        kind: 'next',
        text: 'You can name what each paragraph is doing. Next, lesson 4.4: Passage Map — capturing those roles in lightweight notes instead of a transcript.',
      },
    ],
  },
  {
    id: '4.4',
    stage: 4,
    title: 'Passage Map',
    estimatedMinutes: 10,
    skills: ['rc-passage-map'],
    prerequisites: ['rc-paragraph-roles'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `You now know how to identify passage structure and paragraph roles. The passage map is how you **keep** that work — a few lines of notes, one per paragraph, written as you read. Its purpose is narrow and practical: when a question asks about paragraph 2's objection or the author's attitude in paragraph 3, your map tells you exactly where to look instead of re-reading the whole passage.\n\nThe most common mapping failure is writing too much. A map is an index, not a transcript. If your notes take longer to write than the paragraph took to read, they are hurting you, not helping. This lesson teaches the lightweight map: role, viewpoint, and attitude marker per paragraph, nothing more.`,
      },
      {
        kind: 'keyterm',
        term: 'Passage map',
        definition:
          'Lightweight notes taken while reading — typically one short line per paragraph recording its role, whose viewpoint it presents, and any attitude signals. A map is an index for finding things during questions, not a summary of the passage\'s content.',
      },
      {
        kind: 'example',
        title: 'A complete map of the terraces passage',
        body: `Here is the entire map — three lines for three paragraphs:\n\n- **P1:** setup (circular old method) → thesis: terraces centuries older via lichenometry. Author: presenting.\n- **P2:** critics object (growth rates vary) → author concedes, rebuts w/ elevation-band evidence. Viewpoints: critics vs. lichenometrists; author sides with lichenometrists.\n- **P3:** stakes — rewrite agricultural history IF dates hold → open Q: second dating method pending. Tone: conditional, forward-looking.\n\nThat is all. No full sentences, no copied phrases, no dates memorized. With this map, "the author mentions the critics in order to…" sends you to P2's role line; "the author's attitude toward the revised dates" sends you to P1 and P3. The map answers "where do I look?" — the passage itself answers the question.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what three things go on each line of a passage map, and what is the map\'s purpose?',
        answer:
          'Each line records the paragraph\'s role, whose viewpoint it presents, and any attitude signals — in shorthand, not full sentences. The map\'s purpose is to tell you where to look when a question sends you back into the passage; it is an index, not a transcript or summary.',
      },
      {
        kind: 'worked',
        title: 'Building a map live on a new passage',
        steps: [
          {
            label: 'Step 1 — Read paragraph 1 and write one line',
            body: `Paragraph: "The standard justification for congestion pricing — charging drivers to enter busy city centers — is efficiency: the fee forces drivers to account for the delays they impose on others. When London adopted the policy in 2003, traffic inside the zone fell by nearly a third, and the revenue funded bus improvements. The efficiency story seemed complete."\n\nMap line: **P1:** received view — congestion pricing justified by efficiency; London evidence supports it. Note "seemed complete" — that word "seemed" is doing quiet work, hinting a complication is coming. Jot attitude markers like that; they predict paragraph 2.`,
          },
          {
            label: 'Step 2 — Paragraph 2: track the turn and the viewpoints',
            body: `Paragraph: "It was not. Follow-up studies found that the traffic had not disappeared so much as moved: arterial roads just outside the zone absorbed much of it, and residents there — typically poorer than those inside the zone — bore longer commutes and worse air. Defenders of the policy reply that citywide emissions still fell, and that the outer-borough effect fades as transit options expand. The data on that last claim are thin."\n\nMap line: **P2:** complication — traffic moved to boundary, poorer residents hurt; defenders reply (emissions fell, effect fades) but evidence "thin." Viewpoints: critics of the policy vs. defenders; author skeptical of defenders ("thin"). The turn word "It was not" tells you this paragraph exists to complicate P1.`,
          },
          {
            label: 'Step 3 — Paragraph 3: capture the verdict and its scope',
            body: `Paragraph: "The lesson is narrower than either side admits. Congestion pricing does reduce congestion where it is applied; whether it improves a city's welfare overall depends on what happens at the boundary, a question each city must answer for itself before it copies London."\n\nMap line: **P3:** author's verdict — pricing works locally; overall benefit depends on boundary effects; each city must assess. Tone: measured, qualifying ("narrower than either side admits"). Note the scope discipline: the author claims less than either side. That scope note will matter for inference questions.`,
          },
          {
            label: 'Step 4 — Use the map, do not admire it',
            body: `Now test it. "The author's attitude toward the defenders' reply is…" — your P2 line says "skeptical ('thin')": answer without re-reading. "The function of the London example…" — P1 line: evidence for the received efficiency view. "What would the author say about a city copying London without studying its boundary roads?" — P3 line: it should answer that question first. Three questions, zero re-reading. That is what the map is for.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Good notes mean thorough notes. I should write down the key facts, figures, and names from each paragraph so I do not have to go back.',
        right: 'Thorough notes are the trap. Copying facts into your map duplicates the passage — which you can already re-read — while consuming the time you need for questions. Facts are cheap to relocate (detail questions give line references); structure is expensive to reconstruct. Map the structure: roles, viewpoints, turns. Let the passage hold the facts.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which of the following is the best passage-map line for paragraph 2 of the congestion-pricing passage?',
        choices: [
          '"It was not. Follow-up studies found that the traffic had not disappeared so much as moved: arterial roads just outside the zone absorbed much of it…"',
          'Traffic moved outside the zone; poorer residents affected; defenders say emissions fell but data thin; author skeptical of defenders',
          'P2 complicates P1: boundary effects hurt poorer residents; defenders\' reply is weak ("thin"); author skeptical — the paragraph\'s job is to undermine the efficiency story',
          'Studies, arterial roads, commutes, air quality, emissions, transit options, London, 2003, one-third',
        ],
        correctIndex: 2,
        explanation:
          'The third option is the best map line because it records the paragraph\'s role (complicate P1\'s efficiency story), the viewpoints (critics vs. defenders), and the author\'s attitude signal ("thin," skeptical) — exactly the three things a map is for, in shorthand. The first option merely copies the text, duplicating the passage at full cost. The second lists facts without roles or viewpoints, so it cannot answer function or attitude questions. The fourth is a keyword dump with no structure at all. A map is an index: it should tell you where to look and what job each part does, never restate content you can re-read.',
      },
      {
        kind: 'example',
        title: 'Deeper: what to capture and what to skip',
        body: `**Always capture:** the thesis (in your own few words), each paragraph's role, viewpoint tags (who says what — "critics:", "author:", "defenders:"), turn signals ("but," "however," "it was not"), attitude words ("thin," "premature," "striking"), and the final paragraph's verdict or open question.\n\n**Always skip:** statistics, dates, names, and technical terms — these are locatable on demand. Full sentences. Anything you are writing "just in case." If your map for a 60-line passage is longer than five short lines, stop and compress.\n\n**For comparative passages** (lesson 4.16), add one line per passage plus a relationship line: "A: for trials, cites results. B: against generalizing, cites selection bias. Relation: disagree on generalizability, agree trials occurred." The relationship line is the highest-value line on a comparative set.`,
      },
      { kind: 'tryit', drillIds: ['d-c044', 'd-c046', 'd-c050'] },
      {
        kind: 'summary',
        points: [
          'A passage map is a lightweight index: one short line per paragraph — role, viewpoint, attitude marker.',
          'Its job is to tell you where to look when questions send you back, not to restate the passage.',
          'Map structure (roles, turns, viewpoints), never facts — facts are cheap to relocate, structure is not.',
          'Capture turn signals and attitude words; they predict questions.',
          'If mapping costs more time than reading, you are writing too much: compress to five short lines or fewer.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Your map line for a paragraph reads: "P2: discusses the 1997 study, 42 percent, Dr. Alvarez, methodology details." What is wrong with it, and what should it say instead?',
        answer:
          'It records facts instead of structure — names, numbers, and details that are cheap to relocate in the passage and answer no question by themselves. It should instead record the paragraph\'s role, viewpoints, and attitude signals, e.g.: "P2: presents the 1997 study as evidence for the thesis; author endorses it; answers the skeptics\' objection from P1."',
      },
      {
        kind: 'next',
        text: 'Structure toolkit complete: structure, roles, map. Next, lesson 4.5: Main Point — the big-picture question every passage asks.',
      },
    ],
  },
  {
    id: '4.5',
    stage: 4,
    title: 'Main Point',
    estimatedMinutes: 10,
    skills: ['rc-main-point'],
    prerequisites: ['rc-passage-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Nearly every passage set asks some version of "Which of the following best states the main point of the passage?" It is the highest-value RC question: get the main point right and half the other questions get easier, because every paragraph's role is defined by its relationship to that point.\n\nThe main point is the author's central claim — the thesis you learned to find in lesson 4.2. The difficulty is never in understanding the passage; it is in the answer choices, which are engineered with three classic traps: the true-but-narrow choice (a real detail, not the point), the true-but-broad choice (the topic, not the claim), and the wrong-viewpoint choice (someone else's view presented as the author's).`,
      },
      {
        kind: 'keyterm',
        term: 'Main point',
        definition:
          'The author\'s central claim — the single assertion the passage as a whole is driving toward. It is narrower than the topic (which is just the subject area) and broader than any single detail. If the passage vanished and one sentence had to survive, the main point is that sentence.',
      },
      {
        kind: 'example',
        title: 'Main point vs. topic vs. detail',
        body: `For the congestion-pricing passage:\n\n- **Topic:** congestion pricing in cities. (Too broad — this is what the passage is *about*, not what it *claims*.)\n- **Detail:** Traffic inside London's zone fell by nearly a third after 2003. (True, but it is evidence for the received view in paragraph 1 — not the author's point.)\n- **Wrong viewpoint:** Congestion pricing is an unambiguous success that every city should copy. (That is closer to the defenders' view; the author explicitly narrows it.)\n- **Main point:** Congestion pricing does reduce congestion where applied, but whether it improves a city's overall welfare depends on boundary effects each city must assess for itself.\n\nNotice the main point has the author's characteristic move in it: the qualification ("narrower than either side admits"). Main-point answers almost always carry the author's distinctive stance, not just the subject matter.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: name the three classic main-point traps and give a one-phrase example of each.',
        answer:
          'True-but-narrow (a real detail that is not the point, e.g. "London traffic fell by a third"); true-but-broad (the topic restated, e.g. "congestion pricing in cities"); and wrong-viewpoint (another party\'s claim presented as the author\'s, e.g. the defenders\' unqualified endorsement).',
      },
      {
        kind: 'worked',
        title: 'Choosing the main point under trap pressure',
        steps: [
          {
            label: 'Step 1 — State the thesis in your own words before looking at choices',
            body: `From your map of the congestion-pricing passage: P1 sets up the efficiency justification, P2 complicates it with boundary effects, P3 delivers the author's verdict — pricing works locally, overall benefit depends on the boundary, each city must assess. Your prephrase: "Congestion pricing reduces local congestion, but its overall value depends on boundary effects that each city must evaluate." Write or say this before reading the choices. Students who skip the prephrase end up shopping among traps instead of matching.`,
          },
          {
            label: 'Step 2 — Eliminate the true-but-narrow choices',
            body: `Choice A: "After London adopted congestion pricing, traffic in the zone fell by nearly a third." True — and it is the paragraph-1 evidence. But it supports the received view the author goes on to complicate; it is not what the passage is driving toward. Eliminate anything that is merely a detail, however true and however prominently placed.`,
          },
          {
            label: 'Step 3 — Eliminate the true-but-broad and wrong-viewpoint choices',
            body: `Choice B: "Cities are increasingly adopting congestion pricing." Broad topic statement — true in the background, but it claims nothing, and the passage is not about the trend. Choice C: "Congestion pricing is a proven policy that cities should adopt without hesitation." This is the defenders' stance, and the author explicitly rejects its unqualified form ("narrower than either side admits"). Wrong viewpoint — the most dangerous trap, because it uses the passage's own vocabulary.`,
          },
          {
            label: 'Step 4 — Confirm the survivor carries the author\'s stance',
            body: `Choice D: "While congestion pricing reliably reduces congestion where it is imposed, its overall desirability for a city turns on boundary effects that must be assessed city by city." Check it against your prephrase: local effectiveness plus boundary-dependent overall value plus each-city-must-assess. It matches — and crucially, it contains the author's distinctive qualifying move. When two choices both look right, pick the one that carries the author's stance, not just the topic.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The main point is usually stated in a single sentence I can find — often the first or last sentence — so I should hunt for that sentence.',
        right: 'Sometimes the thesis sits in one sentence, but often the main point is assembled across paragraphs: a setup, a complication, and a qualified verdict. Hunting for one magic sentence leads to choosing the first paragraph\'s claim (the received view) instead of the author\'s final position. Build the main point from your map — thesis plus the author\'s distinctive qualification — rather than lifting a sentence.',
      },
      {
        kind: 'checkpoint',
        prompt: 'A passage argues that a proposed dam will generate needed power (paragraph 1), acknowledges that it will flood farmland (paragraph 2), and concludes that the power is worth the cost only if farmers are fully compensated (paragraph 3). Which best states the main point?',
        choices: [
          'The proposed dam will generate needed electrical power for the region',
          'Dams and their effects on surrounding communities',
          'The dam should be built regardless of its effects on farmland',
          'The dam\'s power is worth its cost only if displaced farmers are fully compensated',
        ],
        correctIndex: 3,
        explanation:
          'The fourth choice is the main point because it captures the author\'s final, qualified verdict — the position the whole passage drives toward, including the paragraph-3 condition. The first choice is the classic true-but-narrow trap: it is paragraph 1\'s claim, which the author goes on to qualify rather than endorse outright. The second is true-but-broad: it names the topic while claiming nothing. The third is the wrong-viewpoint trap in reverse — it states an unqualified pro-dam position the author explicitly conditioned on compensation. The correct answer carries the author\'s distinctive stance: support, but only under the stated condition.',
      },
      {
        kind: 'example',
        title: 'Deeper: the verdict-locating habit',
        body: `Train yourself to find the author's verdict — the sentence where they stop describing and start judging. Verdict language includes: "the lesson is," "what matters is," "the real question," "should," "must," evaluative adjectives ("premature," "thin," "striking"), and explicit comparisons of views ("narrower than either side admits").\n\nIn the congestion passage the verdict is paragraph 3's "The lesson is narrower than either side admits." In the terraces passage there is no full verdict — the passage ends on an open question — which is itself the answer to "what is the author's final position?": conditional and unresolved. Not every passage delivers a clean verdict; when it does not, the main point includes that openness ("the evidence suggests X, but a second test is needed"). Do not manufacture certainty the author withheld.`,
      },
      { kind: 'tryit', drillIds: ['d-c031', 'd-c034', 'd-c037'] },
      {
        kind: 'summary',
        points: [
          'The main point is the author\'s central claim — narrower than the topic, broader than any detail.',
          'Prephrase it from your map before reading the choices; match, don\'t shop.',
          'Three traps: true-but-narrow (a detail), true-but-broad (the topic), wrong-viewpoint (someone else\'s claim).',
          'The right answer carries the author\'s distinctive stance — usually a qualification.',
          'Build the point from the whole passage (setup → complication → verdict), not from one lifted sentence.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Explain why "the first paragraph\'s claim" is a dangerous shortcut for the main point, using the congestion-pricing passage.',
        answer:
          'Because the first paragraph often states the received view the author goes on to complicate — in the congestion passage, paragraph 1 presents the efficiency justification that paragraphs 2 and 3 qualify. Lifting the paragraph-1 claim ("congestion pricing is efficient and successful") gives you the defenders\' view, not the author\'s final position, which is narrower: pricing works locally but its overall value depends on boundary effects.',
      },
      {
        kind: 'next',
        text: 'Main point down — that is what the author claims. Next, lesson 4.6: Primary Purpose — why the author wrote the passage at all.',
      },
    ],
  },
  {
    id: '4.6',
    stage: 4,
    title: 'Primary Purpose',
    estimatedMinutes: 10,
    skills: ['rc-primary-purpose'],
    prerequisites: ['rc-main-point'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Right next to every main-point question sits its close cousin: "The primary purpose of the passage is to…" Students confuse the two constantly, and the test counts on it. The distinction is simple once stated: the **main point** is *what* the author claims; the **primary purpose** is *why* the author wrote — the job the passage is doing.\n\nPurpose answers are phrased as actions: to argue, to criticize, to explain, to evaluate, to reconcile, to qualify. The trap choices get the action wrong: they say the author "advocates" when she merely "assesses," or "refutes" when she "qualifies." Getting purpose right is mostly about choosing the verb with the correct strength.`,
      },
      {
        kind: 'keyterm',
        term: 'Primary purpose',
        definition:
          'The author\'s reason for writing the passage, expressed as an action: to argue for a claim, criticize a view, explain a phenomenon, evaluate a policy, or qualify a received opinion. It describes the job the passage performs, not the claim it makes.',
      },
      {
        kind: 'example',
        title: 'Point vs. purpose on the same passage',
        body: `Congestion-pricing passage once more:\n\n- **Main point (what):** Congestion pricing reduces congestion where applied, but its overall value for a city depends on boundary effects each city must assess.\n- **Primary purpose (why):** To **qualify** the efficiency justification for congestion pricing — to show it is narrower than its defenders claim without rejecting it outright.\n\nSee the difference? The point is a claim you could argue about. The purpose is a job description: the author wrote in order to narrow an overbroad justification. A purpose answer like "to argue that congestion pricing always fails" would be wrong on the verb ("argue… always fails" is far stronger than the author's actual job of qualifying). When torn between two purpose choices, ask: which verb matches what the author actually did?`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: state the difference between main point and primary purpose in one sentence each.',
        answer:
          'The main point is what the author claims — the central assertion the passage drives toward. The primary purpose is why the author wrote — the job the passage performs, expressed as an action like "to qualify," "to criticize," or "to explain."',
      },
      {
        kind: 'worked',
        title: 'Selecting the purpose by verb strength',
        steps: [
          {
            label: 'Step 1 — Name the job from your map',
            body: `Your map of the congestion passage: P1 presents the received efficiency view, P2 complicates it with boundary evidence, P3 delivers a narrowed verdict ("narrower than either side admits"). The job: take an overbroad justification and shrink it to its proper size — without endorsing the critics' wholesale rejection either. Candidate verbs: qualify, assess, evaluate, criticize. Not: advocate, refute, prove, celebrate.`,
          },
          {
            label: 'Step 2 — Eliminate verbs that are too strong',
            body: `Choice A: "to refute the claim that congestion pricing can ever be beneficial." "Refute" and "ever" are far stronger than the author's actual move — she grants that pricing reduces congestion where applied. Eliminate. Choice B: "to advocate the universal adoption of congestion pricing." The author explicitly says each city must assess for itself — the opposite of universal advocacy. Eliminate. Strength mismatch is the number-one purpose trap.`,
          },
          {
            label: 'Step 3 — Eliminate verbs that describe the wrong job',
            body: `Choice C: "to explain how congestion-pricing systems are administered." The passage never describes administration — no mechanics, no implementation details. This is the answers-a-different-question trap: a plausible-sounding job the passage simply does not perform. Even if every word in it were true of the world, it is wrong about the passage.`,
          },
          {
            label: 'Step 4 — Confirm the survivor\'s verb and object',
            body: `Choice D: "to qualify the efficiency justification for congestion pricing by calling attention to its boundary effects." Verb: qualify — matches the narrowing move. Object: the efficiency justification — matches P1's target. Mechanism: boundary effects — matches P2's evidence. When a purpose choice's verb, object, and mechanism all match your map, you are done.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Primary purpose and main point are basically the same question, so I can answer them the same way.',
        right: 'They test different things and the choices exploit the confusion. Main point asks for the claim (a sentence you could debate); primary purpose asks for the job (an action the author performed). A choice can state the main point correctly yet fail as a purpose answer because its verb is wrong — "to prove" instead of "to suggest," "to refute" instead of "to qualify." Read purpose choices for the verb first.',
      },
      {
        kind: 'checkpoint',
        prompt: 'A passage describes a new teaching method (paragraph 1), presents two studies with conflicting results about it (paragraph 2), and concludes that the method works only for students above a certain age (paragraph 3). What is the primary purpose?',
        choices: [
          'To advocate the adoption of the new teaching method in all schools',
          'To refute the studies that found no benefit from the new method',
          'To reconcile conflicting findings by qualifying the method\'s effectiveness',
          'To explain the administrative details of the two studies',
        ],
        correctIndex: 2,
        explanation:
          'The passage\'s job is to reconcile the conflicting studies by narrowing the method\'s claimed effectiveness to older students — "reconcile" and "qualifying" match exactly what the author does. The first choice fails on verb strength: "advocate… in all schools" is far stronger than a qualified, age-limited conclusion. The second fails because the author does not refute the negative study but accommodates it within a narrower claim. The fourth describes a job the passage never performs — no administrative details appear. Note how the correct choice names both the action (reconcile) and the mechanism (qualifying the effectiveness), which is the signature of a right purpose answer.',
      },
      {
        kind: 'example',
        title: 'Deeper: the purpose-verb scale',
        body: `Keep this scale in mind when judging purpose verbs, from weakest to strongest:\n\n**describe → explain → assess → qualify → criticize → argue → advocate → refute → prove**\n\nLSAT authors live in the middle of this scale. They rarely "prove" or "refute outright"; they "suggest," "question," "qualify," and "assess." When two purpose choices differ only in verb strength — "to criticize the policy" vs. "to question one justification for the policy" — the weaker, more precise verb is usually right, because passages are almost always narrower than the strong verb claims.\n\nAlso watch the object of the verb: "to criticize congestion pricing" vs. "to criticize the efficiency justification for congestion pricing." The author did the second, not the first. A right verb with the wrong object is still wrong.`,
      },
      { kind: 'tryit', drillIds: ['d-c032', 'd-c035', 'd-c039'] },
      {
        kind: 'summary',
        points: [
          'Main point is what the author claims; primary purpose is why she wrote — the job, phrased as an action.',
          'Read purpose choices verb-first: the verb\'s strength must match what the author actually did.',
          'LSAT authors live mid-scale: "qualify," "assess," "question" — rarely "prove" or "refute outright."',
          'Check the verb\'s object too: criticizing a justification is not criticizing the policy.',
          'Eliminate choices describing jobs the passage never performs, however true they sound.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A purpose choice reads "to prove that congestion pricing harms the poor." Name two independent reasons it is wrong.',
        answer:
          'First, the verb "prove" is too strong — the author suggests and qualifies, she does not prove. Second, the object is wrong: the passage is about qualifying the efficiency justification via boundary effects, not about proving harm to the poor (which is one piece of evidence, not the passage\'s job). Either flaw alone is fatal.',
      },
      {
        kind: 'next',
        text: 'Big-picture questions handled. Next, lesson 4.7: Author Viewpoint — tracking what the author actually believes, separate from everyone she quotes.',
      },
    ],
  },
  {
    id: '4.7',
    stage: 4,
    title: 'Author Viewpoint',
    estimatedMinutes: 12,
    skills: ['rc-author-viewpoint'],
    prerequisites: ['f-premise-conclusion'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Passages are crowded with voices: critics, researchers, defenders, "some scholars." The author's own voice is only one of them, and questions constantly test whether you can tell them apart. "The author would most likely agree with…" and "Which view is attributed to the author?" are asking for a clean separation between what the author believes and what she merely reports.\n\nThe skill is attribution discipline. Every evaluative claim in a passage belongs to someone, and your job is to keep a running ledger: who said it, and does the author endorse it, reject it, or just report it? Readers who blur this ledger end up attributing the critics' view to the author — exactly the trap the questions set.`,
      },
      {
        kind: 'keyterm',
        term: 'Author viewpoint',
        definition:
          'The author\'s own position on the passage\'s subject, as distinct from the viewpoints she reports. It is found in verdict language, evaluative adjectives, concessions and rebuttals, and final-paragraph judgments — not in sentences attributed to others.',
      },
      {
        kind: 'example',
        title: 'Whose view is it? A translation passage',
        body: `Read this passage with the ledger in mind:\n\n"For most of the twentieth century, critics treated literary translation as a transparent window: the best translation, they assumed, was the one the reader forgot was a translation at all. This ideal — the invisible translator — dominated reviews, prizes, and the way translated books were marketed.\n\nThe ideal has a cost, and it is the translator who pays it. When fluency is the only virtue, the hard choices a translator makes — which ambiguity to preserve, which rhythm to sacrifice — disappear from critical conversation. Worse, the original language is treated as a mere obstacle: something the translator politely removes so the reader need not stumble over it.\n\nNone of this is to say that translations should be deliberately difficult. But a translation that occasionally lets the foreignness of its source show through reminds the reader of something true: that the book was written in another language, by someone who thought in it. The invisible translator performs a service; the visible one tells the truth."\n\nLedger: the "invisible translator" ideal belongs to **the critics** (paragraph 1 — "they assumed"). The attack on that ideal — "has a cost," "worse," "mere obstacle" — belongs to the **author** (paragraph 2). The closing verdict — the visible translator "tells the truth" — is the **author's** position. A question asking what "the author" believes about fluent translations must pull from paragraphs 2–3, never paragraph 1.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: where in a passage do you look for the author\'s own viewpoint, and what is the most common attribution error?',
        answer:
          'Look in verdict language, evaluative adjectives, concessions and rebuttals, and final-paragraph judgments — never in sentences attributed to others ("critics argue," "they assumed"). The most common error is attributing a reported view to the author, e.g. taking paragraph 1\'s "invisible translator" ideal (the critics\' view) as the author\'s position when she spends paragraphs 2–3 attacking it.',
      },
      {
        kind: 'worked',
        title: 'Extracting the author\'s position, step by step',
        steps: [
          {
            label: 'Step 1 — List every voice in the passage',
            body: `From the translation passage: (1) the twentieth-century critics, who prized the invisible translator; (2) the author, who criticizes that ideal; (3) implicitly, translators themselves, whose "hard choices" the author defends. Three voices. Before answering any viewpoint question, name the voices — it takes ten seconds and prevents the single costliest error in this family.`,
          },
          {
            label: 'Step 2 — Collect the author\'s evaluative language',
            body: `"Has a cost," "worse," "mere obstacle," "something true," "tells the truth." Every one of these is the author judging, not reporting. Evaluative adjectives and adverbs are the author's fingerprints: when the prose starts grading things, the grader is the author. Contrast paragraph 1, which reports the critics' view in neutral descriptive language ("dominated reviews, prizes"). Description reports; evaluation endorses.`,
          },
          {
            label: 'Step 3 — Find the verdict and check its scope',
            body: `The verdict: "The invisible translator performs a service; the visible one tells the truth." The author's position: translation should sometimes show its foreignness; the invisibility ideal is impoverished. But note the scope discipline — "None of this is to say that translations should be deliberately difficult." The author qualifies. Any answer choice claiming the author wants difficult translations overstates the verdict. The author's view includes her own limits.`,
          },
          {
            label: 'Step 4 — Test a question against the ledger',
            body: `"The author would most likely agree that…" (A) "The best translation is one the reader forgets is a translation." — That is the critics' view (P1); the author attacks it. Eliminate. (B) "Translation prizes have always rewarded the wrong ideal." — "Always" overstates; the author discusses the twentieth century and never claims "always." Eliminate. (C) "A translation can be excellent while occasionally revealing its foreign origins." — Matches the verdict with its qualification intact ("occasionally"). Correct. The ledger plus scope discipline answers it.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If a view appears in the passage and is never explicitly denied, the author probably agrees with it.',
        right: 'Authors report views they reject all the time — usually in paragraph 1, precisely to set up the rejection. Silence is not endorsement; endorsement looks like evaluative language, concessions, and verdicts. In the translation passage the author never says "the critics are wrong" outright, yet everything in paragraphs 2–3 is a rejection. Read the evaluation, not the explicit denial.',
      },
      {
        kind: 'checkpoint',
        prompt: 'In the translation passage, which of the following best captures the author\'s viewpoint?',
        choices: [
          'The invisible-translator ideal correctly identifies fluency as translation\'s highest virtue',
          'Translations should be deliberately difficult so readers notice the translator\'s work',
          'The invisibility ideal impoverishes translation by hiding the translator\'s real choices, though difficulty for its own sake is not the goal',
          'Literary translation is impossible to evaluate because every translation loses something',
        ],
        correctIndex: 2,
        explanation:
          'The third choice captures the author\'s actual position: paragraph 2 argues the invisibility ideal "has a cost" and hides "the hard choices a translator makes," while paragraph 3 explicitly limits the claim with "None of this is to say that translations should be deliberately difficult." Both the criticism and its boundary are the author\'s. The first choice is the wrong-viewpoint trap — it states the critics\' paragraph-1 ideal that the author attacks. The second ignores the author\'s explicit qualification and overstates the verdict. The fourth is an unsupported leap: the author never suggests evaluation is impossible; she evaluates translations throughout.',
      },
      {
        kind: 'example',
        title: 'Deeper: the endorsement spectrum',
        body: `Authors relate to reported views in degrees, not just agree/disagree:\n\n- **Endorses:** evaluative agreement, building on the view, using it as evidence for the thesis.\n- **Reports neutrally:** background views, described without grading — often just scene-setting.\n- **Concedes then limits:** "they are right that…, but…" — grants part, rejects the rest.\n- **Rejects:** rebuttal, counter-evidence, dismissive evaluation ("thin," "premature").\n\nQuestions exploit the middle of this spectrum. "The author mentions the critics' view in order to…" is usually concede-then-limit or reject, not neutral report — if the author merely wanted background, she would not spend a paragraph rebutting it. And "the author would agree with the critics that…" is only correct for the conceded part. Precision about the degree of endorsement is what separates right answers from tempting ones.`,
      },
      { kind: 'tryit', drillIds: ['d-c051', 'd-c053', 'd-c055'] },
      {
        kind: 'summary',
        points: [
          'Keep a voice ledger: every evaluative claim belongs to someone — author, critic, researcher.',
          'The author\'s view lives in evaluative language, concessions, rebuttals, and final verdicts.',
          'Description reports; evaluation endorses. Neutral reporting of a view is not agreement.',
          'The author\'s view includes her qualifications — do not overstate past her own limits.',
          'Endorsement comes in degrees: endorse, report, concede-then-limit, reject. Match the degree.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why is "the author never explicitly denies it" a bad reason to attribute a view to the author? Use the translation passage.',
        answer:
          'Because authors routinely report a view in order to reject it — the translation passage states the critics\' invisibility ideal in paragraph 1 precisely to attack it in paragraphs 2–3, without ever writing "the critics are wrong." Endorsement is shown by evaluative language and verdicts, not by the absence of explicit denial; silence about a reported view means nothing.',
      },
      {
        kind: 'next',
        text: 'You can isolate the author\'s voice. Next, lesson 4.8: Other Viewpoints — tracking everyone else in the passage with equal precision.',
      },
    ],
  },
  {
    id: '4.8',
    stage: 4,
    title: 'Other Viewpoints',
    estimatedMinutes: 12,
    skills: ['rc-other-viewpoints'],
    prerequisites: ['rc-author-viewpoint'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Lesson 4.7 taught you to isolate the author's voice. Now the other side of the ledger: the critics, researchers, defenders, and historical figures whose views fill the passage. Questions ask about them directly — "The ranchers would most likely agree…," "The biologists cite Yellowstone in order to…" — and the trap is always the same: handing one party's view to another party, or to the author.\n\nTracking other viewpoints is a bookkeeping skill. For each voice, record three things: what they claim, what evidence they offer, and how the author treats their claim (endorses, concedes, rebuts, ignores). Do that and viewpoint questions become lookup exercises.`,
      },
      {
        kind: 'keyterm',
        term: 'Viewpoint tracking',
        definition:
          'The practice of recording, for each voice in a passage besides the author: the claim they make, the evidence they offer for it, and the author\'s stance toward it. Precise tracking prevents the classic error of attributing one party\'s claim to another.',
      },
      {
        kind: 'example',
        title: 'Four voices, one ledger',
        body: `Read this passage and build the ledger:\n\n"When the state proposed reintroducing wolves to the northern highlands, the ranchers' association objected that predation losses would ruin small operations. Their economists projected losses of up to eight percent of calves in the first years — a margin many ranchers cannot absorb.\n\nConservation biologists counter that the projections ignore the wolves' effect on elk, whose overgrazing has stripped the highland streams of willow. In Yellowstone, they note, wolf reintroduction coincided with the return of beavers and songbirds to restored riparian zones. The ranchers reply that Yellowstone is a poor comparison: it has no working ranches inside the park boundary.\n\nThe state's compromise — compensation payments for confirmed wolf kills, plus funding for guard dogs and fencing — has satisfied neither side fully. Ranchers call the payments slow and undervalued; biologists call the fencing subsidies a concession to an industry that should adapt. The deeper disagreement, however, is not about numbers at all but about which landscape the highlands should be: a working one, a wild one, or — the hardest option — both."\n\nThe ledger:\n\n- **Ranchers:** claim — reintroduction will ruin small operations; evidence — 8% calf-loss projection; also: Yellowstone is a poor comparison (no ranches in the park).\n- **Biologists:** claim — projections ignore ecological benefits; evidence — Yellowstone (beavers, songbirds returned); stance toward ranchers — their numbers miss the elk effect.\n- **The state:** claim — compromise (compensation + fencing) can work; treatment — "satisfied neither side fully" (author reports it as failed).\n- **The author:** claim — the real dispute is not the numbers but which landscape the highlands should be. The author's verdict reframes everyone else's.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: for each non-author voice in a passage, what three things do you record?',
        answer:
          'What they claim, what evidence they offer for it, and how the author treats their claim (endorses, concedes, rebuts, or merely reports it). All three matter: the claim answers "what would they agree with" questions, the evidence answers "why do they cite X" questions, and the author\'s treatment prevents misattribution.',
      },
      {
        kind: 'worked',
        title: 'Answering viewpoint questions from the ledger',
        steps: [
          {
            label: 'Step 1 — "The biologists would most likely agree that…"',
            body: `Go to the biologists' ledger line: claim — projections ignore ecological benefits; evidence — Yellowstone's recovered riparian zones. Candidate: "Wolf reintroduction can produce ecological gains that predation-loss projections omit." That matches their claim plus their evidence. Reject: "Compensation payments are too slow" — that is the ranchers' complaint about the state's compromise, a different voice entirely. Voice-swapping is the trap; the ledger blocks it.`,
          },
          {
            label: 'Step 2 — "The ranchers cite the absence of ranches in Yellowstone in order to…"',
            body: `Find the claim in the ledger: "Yellowstone is a poor comparison: it has no working ranches inside the park boundary." Its job: to undermine the biologists' key evidence by disqualifying the comparison. So the answer: to challenge the relevance of the biologists' Yellowstone example. Note this is a function question about a viewpoint's evidence — the families combine. The ledger's "evidence" column is what answers it.`,
          },
          {
            label: 'Step 3 — "The author\'s attitude toward the state\'s compromise is…"',
            body: `The state's ledger line: compromise of compensation plus fencing. The author's treatment: "has satisfied neither side fully" — reported as a failure, followed by the author's reframing ("the deeper disagreement… is not about numbers"). So the author views the compromise as inadequate because it addresses the numbers while missing the real values dispute. Do not confuse the state's view (compromise can work) with the author's (it misses the point).`,
          },
          {
            label: 'Step 4 — "The ranchers and the biologists would disagree about whether…"',
            body: `Disagreement questions need both ledgers. Ranchers: the 8% projection shows ruin; Yellowstone is irrelevant. Biologists: projections ignore elk/willow/beaver effects; Yellowstone shows the upside. They disagree about whether the economic projections capture the full effects of reintroduction — and about whether Yellowstone is a valid comparison. When a question asks what two parties disagree about, state each side's position from the ledger before looking at choices; the disagreement is where the two lines contradict.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If two parties are on opposite sides of an issue, they disagree about everything — so any difference between their claims is a safe answer.',
        right: 'Opposing parties often agree on background facts and disagree on narrow points. Ranchers and biologists both accept that wolves kill calves; they disagree about whether the projections capture the full picture and whether Yellowstone generalizes. Disagreement questions demand the precise point of conflict, not just any difference. Check both ledger lines and find where they actually contradict.',
      },
      {
        kind: 'checkpoint',
        prompt: 'In the wolves passage, the ranchers\' economists project calf losses of up to eight percent. The biologists would most likely respond to this projection by saying that it…',
        choices: [
          'overstates predation because compensation payments will offset the losses',
          'ignores the ecological effects of wolves, such as reduced elk overgrazing',
          'is irrelevant because Yellowstone has no working ranches inside the park',
          'proves that the highlands should be managed as a working landscape',
        ],
        correctIndex: 1,
        explanation:
          'The biologists\' ledger line is that the projections "ignore the wolves\' effect on elk, whose overgrazing has stripped the highland streams of willow" — their objection is precisely that the economic projection omits ecological effects. The first choice is wrong because compensation payments are the state\'s compromise, and the ranchers (not the biologists) call those payments slow and undervalued. The third choice is voice-swapped: the "Yellowstone has no ranches" reply belongs to the ranchers, used against the biologists\' example. The fourth choice belongs to no one — the "working vs. wild landscape" framing is the author\'s, and the biologists never claim the projection proves anything about landscape management.',
      },
      {
        kind: 'example',
        title: 'Deeper: nested viewpoints and reported speech',
        body: `Watch for viewpoints inside viewpoints — "The ranchers reply that Yellowstone is a poor comparison." That is the ranchers' characterization of the biologists' evidence, reported by the author. Two attribution layers. Questions love these: "The ranchers believe the biologists' Yellowstone example is flawed because…" requires you to hold the ranchers' view *about* the biologists' view.\n\nSignal words mark the layers: "counter," "reply," "respond," "object" indicate a voice answering another voice. When you see them, update the ledger with an arrow: ranchers → (against) biologists' Yellowstone evidence. And keep the author's layer separate: "has satisfied neither side fully" is the author judging the state's compromise, not the state judging itself. Three layers, three owners — the ledger keeps them straight.`,
      },
      { kind: 'tryit', drillIds: ['d-c052', 'd-c054', 'd-c056', 'd-c058'] },
      {
        kind: 'summary',
        points: [
          'For each non-author voice, record: their claim, their evidence, and the author\'s treatment of it.',
          'Viewpoint questions are lookup exercises once the ledger is built — build it while reading.',
          '"What would X agree with" = X\'s claim column. "Why does X cite Y" = X\'s evidence column.',
          'Disagreement questions need both parties\' lines: find where they actually contradict, not just any difference.',
          'Track nested views (X\'s reply to Y\'s evidence) with arrows; keep the author\'s judgments on their own layer.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A choice says "The biologists believe compensation payments are slow and undervalued." Using the wolves ledger, explain the exact error.',
        answer:
          'It is a voice-swap: "slow and undervalued" is the ranchers\' complaint about the state\'s compensation payments, not the biologists\' view. The biologists\' ledger line concerns ecological effects the projections ignore (elk, willow, Yellowstone); they criticize the fencing subsidies as a concession to industry. Attributing the ranchers\' grievance to the biologists crosses two ledger lines at once.',
      },
      {
        kind: 'next',
        text: 'All voices tracked. Next, lesson 4.9: Attitude and Tone — how the author feels about what she describes, and how precisely you must name it.',
      },
    ],
  },
  {
    id: '4.9',
    stage: 4,
    title: 'Attitude and Tone',
    estimatedMinutes: 10,
    skills: ['rc-attitude'],
    prerequisites: ['rc-author-viewpoint'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `You know what the author believes (lesson 4.7). Attitude questions ask something subtler: *how* she feels about it — her tone. Is she enthusiastic or cautiously favorable? Dismissive or measuredly critical? The choices will offer adverbs like "strongly," "mildly," "reluctantly," "wholeheartedly," and your job is to match the passage's actual temperature.\n\nThis family punishes imprecision more than any other. Students routinely pick a tone word that is one notch too strong — "hostile" for an author who is merely "critical," "enthusiastic" for one who is "guardedly positive." The fix is a calibrated scale and the habit of checking tone words against the author's actual evaluative language.`,
      },
      {
        kind: 'keyterm',
        term: 'Tone calibration',
        definition:
          'Matching the strength of a tone description to the strength of the author\'s actual evaluative language. LSAT authors are usually measured — qualified praise, restrained criticism — so tone answers that are one notch too strong ("hostile," "ecstatic") are the standard trap.',
      },
      {
        kind: 'example',
        title: 'Calibrating on the translation passage',
        body: `Recall the author's evaluative language: "has a cost," "worse," "mere obstacle," "something true," "tells the truth." This is real criticism of the invisibility ideal — but notice what is absent: no mockery, no outrage, no personal attack on the critics. And the author qualifies her own position: "None of this is to say that translations should be deliberately difficult."\n\nSo which tone fits? "Hostile and dismissive" — too strong; nothing in the prose is hostile. "Enthusiastic endorsement" — wrong direction entirely. "Measured criticism" or "respectful disagreement" — matches: the criticism is substantive but restrained, and the qualification shows fairness. The calibration rule: find the author's strongest evaluative word, and the correct tone is the mildest description that still covers it.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: state the calibration rule for choosing between two tone choices in one sentence.',
        answer:
          'Find the author\'s strongest evaluative language in the passage, then choose the mildest tone description that still covers it — never a notch stronger, because LSAT authors are almost always more measured than the extreme choices suggest.',
      },
      {
        kind: 'worked',
        title: 'Judging tone choices word by word',
        steps: [
          {
            label: 'Step 1 — Collect the evidence: the author\'s evaluative words',
            body: `Question: "The author's attitude toward the twentieth-century critics' ideal of the invisible translator is best described as…" First, gather the author's own grading language about that ideal: "has a cost," "the translator who pays it," "worse," "mere obstacle." The attitude is negative — that eliminates every positive or neutral choice immediately. Half the work is direction; the other half is degree.`,
          },
          {
            label: 'Step 2 — Eliminate by direction',
            body: `(A) "admiring" — wrong direction. (B) "neutral and detached" — wrong direction; "worse" and "mere obstacle" are not detached. Remaining: (C) "scornful and contemptuous" and (D) "critically disapproving but measured." Both are negative. Now it is purely a degree question.`,
          },
          {
            label: 'Step 3 — Eliminate by degree',
            body: `"Scornful and contemptuous" requires mockery or disdain — language like "absurd," "foolish," or personal ridicule. The passage has none of that; its criticism is substantive ("hides the translator's real choices") and it even grants the critics' position a fair statement in paragraph 1 plus a self-qualification in paragraph 3 ("None of this is to say…"). "Scornful" is one notch too strong. (D) "critically disapproving but measured" covers "has a cost" and "worse" while respecting the qualification. Correct.`,
          },
          {
            label: 'Step 4 — Generalize: adverbs are the test',
            body: `In tone choices, the adjective sets the direction and the adverb sets the degree — and the adverb is where traps live. "Strongly critical" vs. "mildly critical," "wholeheartedly endorses" vs. "cautiously favors." When you are torn, ask: does the passage contain language as strong as this adverb? If the author never reaches the adverb's intensity, the choice is wrong no matter how right the direction feels.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If the author criticizes something, a strongly negative tone word like "hostile" or "dismissive" is a safe pick — criticism is criticism.',
        right: 'Criticism comes in degrees, and the test prices the degrees. An author can criticize a view while treating its holders fairly — stating their position accurately, conceding its appeal, qualifying her own counterclaim. That author is "measuredly critical," not "hostile." Picking the strong word for a measured author is the single most common attitude error. Match the degree, not just the direction.',
      },
      {
        kind: 'checkpoint',
        prompt: 'An author writes that a policy\'s defenders "overstate their case," calls one key study "unrepresentative," but concludes the policy "deserves a limited trial." Her attitude toward the policy is best described as…',
        choices: [
          'hostile and contemptuous',
          'enthusiastically supportive',
          'cautiously favorable despite reservations',
          'neutral and purely descriptive',
        ],
        correctIndex: 2,
        explanation:
          '"Cautiously favorable despite reservations" matches both the direction and the degree: the author criticizes the defenders\' overstatement and the study (reservations), yet concludes the policy deserves a trial (favorable, but limited — hence cautious). "Hostile and contemptuous" is a degree too strong — nothing suggests contempt, and she endorses a trial. "Enthusiastically supportive" is wrong in both direction and degree: she criticizes the defense and limits her endorsement. "Neutral and purely descriptive" ignores the evaluative language entirely ("overstate," "unrepresentative," "deserves"). The correct tone always covers the author\'s actual evaluative words at their actual strength.',
      },
      {
        kind: 'example',
        title: 'Deeper: the tone scale',
        body: `Keep this scale handy, from most positive to most negative:\n\n**ecstatic → enthusiastic → favorable → guardedly positive → neutral/descriptive → skeptical → critical → sharply critical → hostile/contemptuous**\n\nThree facts about how the test uses it:\n\n1. Authors cluster in the middle: "guardedly positive," "skeptical," "measuredly critical." Extreme ends are usually traps.\n2. Tone can shift by paragraph — respectful toward the evidence, critical toward one interpretation. Answer for the object the question names.\n3. "Neutral" is a real answer sometimes, but only when the passage genuinely grades nothing. If you found evaluative language while mapping (lesson 4.4), the author is not neutral about that object.\n\nWhen in doubt between adjacent notches, choose the milder one. The test punishes overstatement far more often than understatement.`,
      },
      { kind: 'tryit', drillIds: ['d-c051', 'd-c054', 'd-c057'] },
      {
        kind: 'summary',
        points: [
          'Tone questions test degree, not just direction: match the strength of the tone word to the author\'s actual language.',
          'Calibration rule: the mildest description that still covers the author\'s strongest evaluative word.',
          'In tone choices, the adverb carries the trap — check whether the passage ever reaches its intensity.',
          'LSAT authors cluster mid-scale; extreme tone words ("hostile," "ecstatic") are usually wrong.',
          'Answer for the object named: tone can differ toward the evidence, the critics, and the thesis.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why is "the author criticizes X, so the tone is hostile" a flawed inference? Give the corrected reasoning.',
        answer:
          'Because criticism has degrees, and "hostile" asserts the maximum degree — contempt or personal attack — which requires mocking or dismissive language the passage may not contain. The corrected reasoning: note the criticism\'s direction (negative), then check its degree against the author\'s actual words and qualifications; a substantive but restrained critique with fair statement of the other side is "measuredly critical," not hostile.',
      },
      {
        kind: 'next',
        text: 'Viewpoints and tone complete. Next, lesson 4.10: Detail and Reference — the lookup questions, and how to answer them without re-reading the passage.',
      },
    ],
  },
  {
    id: '4.10',
    stage: 4,
    title: 'Detail and Reference',
    estimatedMinutes: 10,
    skills: ['rc-detail'],
    prerequisites: ['rc-passage-map'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Detail questions are the most straightforward questions on the test — and students still miss them, usually by answering from memory instead of looking back. The stem gives you a location: a line reference, a distinctive phrase, a named study. Your job is a lookup, not a recollection: go to the spot, read the surrounding sentences, and match.\n\nThe traps are built for memory-answerers. One choice states something true about the passage but answers a different question. Another states something plausible that the passage never says. Both collapse the moment you check the actual lines — which is why the method here is almost entirely procedural: locate, read around, match exactly.`,
      },
      {
        kind: 'keyterm',
        term: 'Reference discipline',
        definition:
          'The habit of answering detail questions by returning to the cited location and reading the surrounding sentences, rather than answering from memory. The correct choice matches what the passage actually says at that spot — in context, not as an isolated fact.',
      },
      {
        kind: 'example',
        title: 'A lookup done right',
        body: `Question: "According to the passage, the defenders of congestion pricing respond to the boundary-effect criticism by arguing that…"\n\nYour map says: P2, defenders' reply. Go there: "Defenders of the policy reply that citywide emissions still fell, and that the outer-borough effect fades as transit options expand. The data on that last claim are thin."\n\nThe defenders make two claims: (1) citywide emissions still fell, (2) the outer-borough effect fades as transit expands. The correct choice will state one of these — probably the second, since questions favor the more specific. A trap might say "the defenders cite London's traffic drop" — true of the passage (P1), but it is the received view's evidence, not the defenders' reply to the criticism. Location plus context kills it: you are in P2's reply sentence, not P1.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what are the three steps of reference discipline?',
        answer:
          'Locate — go to the cited lines or the map position for the distinctive phrase. Read around — take in the surrounding sentences for context, not just the single line. Match exactly — choose the answer that states what the passage says there, rejecting true-but-elsewhere and plausible-but-unsaid choices.',
      },
      {
        kind: 'worked',
        title: 'Defeating the three detail traps',
        steps: [
          {
            label: 'Step 1 — The true-but-elsewhere trap',
            body: `Question: "The passage mentions the three elevation bands in order to…" Choices include: (A) "show that lichenometry proved the terraces' exact age." Go to the lines: "They published growth curves for three elevation bands, and the revised dates held." The bands were published to answer the critics' growth-rate objection — evidence in the rebuttal. Choice (A) is true-ish (the dates held) but misstates the job: the bands were not about exactness, they were the rebuttal's evidence. It also smuggles "exact age," which the passage never claims. True-but-elsewhere dies when you read the surrounding sentences for context.`,
          },
          {
            label: 'Step 2 — The plausible-but-unsaid trap',
            body: `Choice (B): "demonstrate that lichen grows at the same rate at all elevations." This directly contradicts the passage — the critics' whole objection was that growth rates vary, and the bands were created because of that variation. Plausible to a careless reader (it sounds scientific), flatly unsaid — indeed, denied — by the text. The defense: match the choice against the actual sentences, word by word. If a key word ("same rate") has no support in the lines, the choice is out.`,
          },
          {
            label: 'Step 3 — The half-right trap',
            body: `Choice (C): "answer the critics' objection by showing the variation was controlled for." Check each half: "answer the critics' objection" — yes, the sentence sits in the rebuttal ("conceded the point but argued…"). "Showing the variation was controlled for" — yes, "calibration sites, chosen across different elevations, controlled for the variation." Both halves match the lines. Correct. Detail answers are often conjunctions; verify every clause, not just the first.`,
          },
          {
            label: 'Step 4 — Make it a habit, not a decision',
            body: `The procedure never varies: locate via the reference or your map, read the full surrounding sentences, and require the choice to match the text at that spot. Do not answer detail questions from memory even when you are sure — "sure" is exactly the state the true-but-elsewhere trap is designed to exploit. The lookup costs fifteen seconds; the miss costs the question.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If I read carefully, I can answer detail questions from memory — going back wastes time.',
        right: 'Memory is approximate and the traps are built for approximate memory: true statements from the wrong paragraph, plausible claims the passage never made. The lookup is not wasted time; it is the entire method. Fifteen seconds at the cited lines converts a memory gamble into a text match — and the line reference is the test handing you the location for free.',
      },
      {
        kind: 'checkpoint',
        prompt: 'A question asks: "According to the passage, the forestry department\'s survey counted trees on…" (from the Harrow tree-canopy passage in lesson 4.1). Which approach is correct?',
        choices: [
          'Answer from memory — you remember it counted public parks, so choose that',
          'Return to the sentence, read it in context, and match the choice to the text',
          'Choose the answer that sounds most consistent with the passage\'s main point',
          'Eliminate the choices that mention wealthy wards, since those are details from later',
        ],
        correctIndex: 1,
        explanation:
          'Return to the sentence and match it: the passage says "The survey counted every tree on public and private land" — the correct choice must say public and private land, verified at the location. Answering from memory ("public parks") is exactly the gamble the traps exploit; the text says public and private land, not parks. Choosing by consistency with the main point is wrong because detail questions ask what the text says, not what fits the thesis — a choice can fit the thesis and still misstate the detail. And eliminating "wealthy wards" is irrelevant filtering: the wards appear in the next sentence about where growth occurred, which has nothing to do with what the survey counted.',
      },
      {
        kind: 'example',
        title: 'Deeper: when there is no line reference',
        body: `Some detail stems give no line number — "The author mentions the valley chiefdoms in order to…" or "According to the passage, the lichenometrists…". Then your map is the reference: it tells you the chiefdoms appear in P3's application line, the lichenometrists in P1–P2. Go there and read around.\n\nDistinctive phrases are locators too: "growth curves," "eight percent," "invisible translator." Scan for the phrase, then read the full sentence plus one on each side. The sentence before often contains the claim the detail supports; the sentence after often contains the author's evaluation. Both are frequently what the question is actually asking about — which is why "read around" is part of the discipline, not optional.`,
      },
      { kind: 'tryit', drillIds: ['d-c041', 'd-c043', 'd-c047'] },
      {
        kind: 'summary',
        points: [
          'Detail questions are lookups: locate the reference, read the surrounding sentences, match exactly.',
          'Never answer from memory — the traps (true-but-elsewhere, plausible-but-unsaid) are built for it.',
          'Read around the cited lines: the sentence before holds the claim, the sentence after the evaluation.',
          'Verify every clause of a choice; detail answers are often conjunctions with one false half.',
          'With no line reference, your map and distinctive phrases are the locators.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A choice correctly quotes a phrase from the passage but answers a different question than the stem asked. Name the trap and explain how reference discipline defeats it.',
        answer:
          'That is the true-but-elsewhere (answers-a-different-question) trap: the statement is textually accurate but belongs to a different part of the passage or a different voice. Reference discipline defeats it because you read the choice against the specific cited location and its context — the quote matches some lines, but not the lines the question asks about, so it fails the "match exactly at that spot" requirement.',
      },
      {
        kind: 'next',
        text: 'Details you can look up. Next, lesson 4.11: Inference — the questions where the answer is not stated, but follows.',
      },
    ],
  },
  {
    id: '4.11',
    stage: 4,
    title: 'Inference',
    estimatedMinutes: 12,
    skills: ['rc-inference'],
    prerequisites: ['f-deduction', 'rc-passage-map'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Inference questions ask what follows from the passage without being stated: "It can be inferred that…," "The passage suggests…," "Which is most strongly supported?" The correct answer is a careful step from the text — something the author is committed to, whether she said it outright or not. That step is usually small, but legitimate inferences sometimes synthesize across nonadjacent paragraphs; do not reject a choice merely because it connects distant parts of the passage — check whether the author is truly committed to it.\n\nThe discipline is borrowed from your foundations: an inference must be something that *has* to be true given the passage, not something that *could* be true. The traps offer the merely-possible dressed as the necessary — usually by going one notch too strong, or by importing outside knowledge that feels obvious but is not in the text.`,
      },
      {
        kind: 'keyterm',
        term: 'Textual inference',
        definition:
          'A claim that must be true given what the passage states — a small, careful step the author is committed to, not merely a claim that could be true. Valid inferences stay within the passage\'s scope; they never add outside facts or strengthen the author\'s qualifiers.',
      },
      {
        kind: 'example',
        title: 'One step, not two',
        body: `From the terraces passage: "They published growth curves for three elevation bands, and the revised dates held."\n\nValid inference: "The lichenometrists took the variation in growth rates into account in their analysis." This has to be true — you cannot publish elevation-specific growth curves to answer a variation objection without taking variation into account. One small step.\n\nInvalid: "Lichenometry is now the most reliable dating method available." Nothing in the passage ranks methods, and the passage ends awaiting a second method — this adds an outside judgment. Invalid: "The revised dates are correct." The passage says the dates "held" against the objection and that confirmation is pending — "correct" removes the author's own conditional. Each invalid choice takes one step too many: beyond the text, or past the author's qualifiers.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what distinguishes a valid textual inference from an invalid one?',
        answer:
          'A valid inference must be true given the passage — a small step the author is committed to, staying inside the text\'s scope and preserving its qualifiers. An invalid inference goes further: it states something merely possible, adds outside knowledge, strengthens the author\'s hedges ("suggests" → "proves"), or drops her conditions.',
      },
      {
        kind: 'worked',
        title: 'Testing inference choices against the text',
        steps: [
          {
            label: 'Step 1 — Fix the exact textual basis',
            body: `Question: "It can be inferred from the passage that the author believes the pottery-based dating was…" Textual basis: "The method was convenient but circular: the shards were dated by the terraces, and the terraces by the shards." Also relevant: the author presents lichenometry as the correction. Before looking at choices, state the commitment: the author regards the old method as unreliable — circular reasoning cannot date anything. That is the one-step inference.`,
          },
          {
            label: 'Step 2 — Reject the too-strong choice',
            body: `(A) "The pottery-based method was deliberately fraudulent." "Circular" does not mean fraudulent — it means logically flawed. "Deliberately fraudulent" adds intent the passage never mentions and goes a full notch past "convenient but circular." Too-strong choices are the most common inference trap: they take a real textual signal and amplify it past what the author committed to.`,
          },
          {
            label: 'Step 3 — Reject the outside-knowledge choice',
            body: `(B) "Pottery shards cannot be dated by any scientific method." The passage says nothing about dating pottery in general — only that this particular use was circular. This imports a general scientific claim from outside the text. The test: could the author consistently believe the choice is false? Yes — she could believe pottery is datable by other means. If yes, it is not an inference from the passage.`,
          },
          {
            label: 'Step 4 — Accept the choice the text commits to',
            body: `(C) "The pottery-based dating rested on flawed reasoning." Check: "circular" is the author's own word for the method, and circular reasoning is flawed reasoning. This must be true given the text — the author is committed to it. It adds nothing, strengthens nothing, imports nothing. Correct. When torn, prefer the choice that stays closest to the author's own vocabulary: paraphrases of stated commitments beat novel formulations.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: '"Most strongly supported" and "suggests" mean the inference can be a stretch — the stem is inviting me to go beyond the text.',
        right: 'The softer stem language ("suggests," "most strongly supported") reflects the passage\'s own softness, not permission to leap. It means: among the choices, pick the one the text best supports — which is still a small, committed step, not a creative one. A choice that requires adding facts or removing qualifiers is wrong under "suggests" just as surely as under "must be true."',
      },
      {
        kind: 'checkpoint',
        prompt: 'From the congestion-pricing passage: "The data on that last claim are thin" (about the defenders\' claim that the outer-borough effect fades as transit expands). What can be properly inferred?',
        choices: [
          'The defenders\' claim about fading effects has been proven false',
          'The author believes the evidence for the defenders\' fading-effect claim is weak',
          'Transit expansion never reduces the outer-borough effect',
          'The author has conducted her own study of outer-borough traffic',
        ],
        correctIndex: 1,
        explanation:
          'The second choice is the one-step inference: "the data… are thin" is the author\'s own evaluation, and calling data "thin" commits her to regarding the evidence as weak — that must be true given the sentence. The first choice goes too strong: "thin data" does not mean "proven false," and the author never claims falsity. The third choice makes a universal claim ("never") about transit that the passage never supports — outside knowledge dressed as inference. The fourth invents an action by the author (conducting a study) that no sentence describes. Valid inference stays inside what the author actually committed to.',
      },
      {
        kind: 'example',
        title: 'Deeper: inference and authorial qualifiers',
        body: `The author's qualifiers are load-bearing for inference questions. "The results suggested the terraces were centuries older" — an inference that upgrades "suggested" to "proved" is wrong. "Whether that rewriting survives will depend on a second method" — an inference that the rewriting *has* survived is wrong; one that it *may not* survive is valid.\n\nMake this mechanical: when you locate the textual basis for an inference question, circle the qualifiers ("suggests," "probably," "if," "may," "thin," "premature"). Then require the choice to preserve every one of them. Choices that drop a qualifier ("if the dates hold" → "the dates hold") fail no matter how tempting. This one habit eliminates the majority of wrong inference answers.`,
      },
      { kind: 'tryit', drillIds: ['d-c042', 'd-c045', 'd-c048', 'd-c050'] },
      {
        kind: 'summary',
        points: [
          'A valid inference must be true given the passage — a small step the author is committed to.',
          'Traps: too-strong (amplifies the text), outside-knowledge (adds facts), qualifier-dropping.',
          '"Suggests" and "most strongly supported" do not permit leaps — they reflect the text\'s own softness.',
          'Circle the qualifiers in the textual basis; the right choice preserves every one.',
          'Prefer choices close to the author\'s own vocabulary: paraphrases of commitments beat novel claims.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'The passage says "The results suggested the terraces were centuries older." A choice says "The terraces are centuries older than previously thought." Valid inference? Explain.',
        answer:
          'No — it drops the qualifier. "Suggested" commits the author only to the evidence pointing that way, while the flat "are" asserts it as established fact; the passage even ends awaiting a second dating method, showing the author herself has not closed the question. A valid version would preserve the hedge: "The evidence suggests the terraces may be centuries older."',
      },
      {
        kind: 'next',
        text: 'Evidence questions done. Next, lesson 4.12: Function — why the author included that detail, that example, that concession.',
      },
    ],
  },
  {
    id: '4.12',
    stage: 4,
    title: 'Function',
    estimatedMinutes: 10,
    skills: ['rc-function'],
    prerequisites: ['rc-paragraph-roles'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Function questions ask why something is in the passage: "The author mentions the growth curves in order to…," "The reference to the valley chiefdoms serves primarily to…." The answer is never about the detail's content — it is about the detail's **job** in the author's reasoning.\n\nThis is paragraph-roles thinking (lesson 4.3) applied at the sentence level. Every example, statistic, concession, and quotation was included to do work: support a claim, answer an objection, illustrate a point, or set up a turn. Function questions test whether you see the work behind the words.`,
      },
      {
        kind: 'keyterm',
        term: 'Function (of a detail)',
        definition:
          'The argumentative job a specific sentence, example, or reference performs in the passage — what it does for the author\'s reasoning (supports, rebuts, illustrates, concedes, transitions). Function is about purpose within the argument, never about the detail\'s standalone content.',
      },
      {
        kind: 'example',
        title: 'Content vs. function',
        body: `Detail: "They published growth curves for three elevation bands, and the revised dates held."\n\n- **Content question** (detail family): "What did the lichenometrists publish?" → Growth curves for three elevation bands. The answer is in the sentence.\n- **Function question:** "The author mentions the growth curves primarily in order to…" → To show that the lichenometrists answered the critics' growth-rate objection with evidence — the rebuttal's support. The answer is not in the sentence; it is in the sentence's relationship to the surrounding argument.\n\nTo answer function questions, zoom out one level: find the detail, then ask what the enclosing paragraph is doing (lesson 4.3) and what role the detail plays inside that job. The growth curves sit inside paragraph 2's object-concede-rebut arc, on the rebuttal side. That placement is the answer.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what is the two-step method for answering a function question?',
        answer:
          'First, locate the detail and identify its enclosing paragraph\'s role (what job the paragraph is doing). Second, ask what work the detail performs inside that job — supporting a claim, answering an objection, illustrating a point, conceding, or transitioning. The answer describes the job, never the detail\'s content.',
      },
      {
        kind: 'worked',
        title: 'Three function questions on one passage',
        steps: [
          {
            label: 'Step 1 — "The author mentions the circular dating method in order to…"',
            body: `Locate: paragraph 1 — "The method was convenient but circular: the shards were dated by the terraces, and the terraces by the shards." Enclosing job: paragraph 1 sets up the problem that lichenometry will solve. The detail's work: establish why a new method was needed — the old one could not date anything. Correct function: to explain the flaw in the old approach that motivates the new method. Trap to reject: "to prove archaeologists were careless" — the passage never judges the archaeologists' character; "convenient" is not an accusation.`,
          },
          {
            label: 'Step 2 — "The reference to the valley chiefdoms serves primarily to…"',
            body: `Locate: paragraph 3 — "large-scale terracing began before, not after, the rise of the valley chiefdoms." Enclosing job: paragraph 3 draws out the stakes ("The dispute matters beyond one valley"). The detail's work: illustrate what is at stake — a concrete consequence of the revised dates for agricultural history. Correct: to show the wider historical significance of the dating revision. Trap: "to explain who built the terraces" — the passage never says who built them; content confusion.`,
          },
          {
            label: 'Step 3 — "The author concedes the critics\' point about growth rates in order to…"',
            body: `Locate: paragraph 2 — "The lichenometrists conceded the point but argued…" Enclosing job: the object-concede-rebut arc defending the thesis. The concession's work: acknowledge the objection's force before rebutting it, which makes the rebuttal credible — a fair-minded author who grants what is grantable. Correct: to show the objection was taken seriously before being answered with evidence. Trap: "to admit the revised dates are unreliable" — the concession grants the variation premise, not the conclusion; the dates "held." Concessions grant premises, never the verdict.`,
          },
          {
            label: 'Step 4 — Extract the pattern',
            body: `All three answers were found the same way: locate the detail, name the enclosing job, state the detail's contribution to that job. And all three traps failed the same way: they described the detail's content, judged something the passage never judges, or confused a granted premise with a granted conclusion. Function answers are always phrased as jobs — "to show," "to illustrate," "to answer" — never as facts.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'A function question is just a detail question in disguise — I should answer with what the sentence says.',
        right: 'Detail questions ask what the text says; function questions ask what the text is doing. "What did they publish?" is answered inside the sentence. "Why mention it?" is answered by the sentence\'s place in the argument — the rebuttal\'s evidence, the setup\'s motivation, the stakes\' illustration. Answering a function question with content is the designed trap; it will always be among the choices, and it will always be wrong.',
      },
      {
        kind: 'checkpoint',
        prompt: 'In the terraces passage, the author mentions that the old method was "convenient but circular." The primary function of this description is to…',
        choices: [
          'prove that the archaeologists who used the old method were incompetent',
          'establish the flaw in the old method that the new lichen-based dating is meant to remedy',
          'show that pottery shards are useless for all archaeological purposes',
          'concede that the critics\' objection to lichenometry has merit',
        ],
        correctIndex: 1,
        explanation:
          'The description sits in paragraph 1\'s setup job: it establishes why the old dating cannot be trusted (circular reasoning), which motivates the introduction of lichenometry as the remedy. The first choice fails because the passage never judges the archaeologists\' competence — "convenient" describes the method\'s appeal, not its users\' ability. The third overgeneralizes wildly: the passage criticizes one circular use of shards, not all uses of pottery. The fourth misplaces the concession entirely — the concession to the critics appears in paragraph 2 and concerns lichen growth rates, not the old method. Function follows placement: setup details motivate what comes next.',
      },
      {
        kind: 'example',
        title: 'Deeper: the function vocabulary',
        body: `Function answers use a small set of job verbs. Learn them and you will recognize right answers on sight:\n\n- **Supports / provides evidence for** — the detail backs a claim.\n- **Answers / rebuts** — the detail responds to an objection.\n- **Illustrates / exemplifies** — the detail is a concrete case of an abstract point.\n- **Concedes** — the detail grants the other side something (a premise, never the verdict).\n- **Motivates / sets up** — the detail creates the need for what follows.\n- **Qualifies / limits** — the detail narrows a claim's scope.\n- **Transitions** — the detail pivots the passage to new stakes or scope.\n\nWhen stuck between two function choices, ask which one fits the enclosing paragraph's role from your map. The paragraph's job constrains the detail's job: a detail inside a rebuttal paragraph rebuts; a detail inside a setup paragraph motivates. The map you built in lesson 4.4 is doing the work again.`,
      },
      { kind: 'tryit', drillIds: ['d-c031', 'd-c033', 'd-c038'] },
      {
        kind: 'summary',
        points: [
          'Function asks what a detail does in the argument, never what it says.',
          'Method: locate the detail, name the enclosing paragraph\'s job, state the detail\'s contribution.',
          'Concessions grant premises, never the verdict — do not let them leak into the conclusion.',
          'Right function answers use job verbs: supports, rebuts, illustrates, concedes, motivates, qualifies.',
          'The paragraph\'s role constrains the detail\'s function: check your map when torn.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Explain why "to provide an interesting fact about lichen" can never be the right answer to a function question.',
        answer:
          'Because function answers must describe argumentative work — what the detail does for the author\'s reasoning — and "interesting fact" describes no job at all. Every included detail supports, rebuts, illustrates, concedes, motivates, or transitions; a choice that treats the detail as decoration misunderstands why LSAT passages include anything.',
      },
      {
        kind: 'next',
        text: 'You can name the job of any detail. Next, lesson 4.13: Application — taking the passage\'s idea somewhere new.',
      },
    ],
  },
  {
    id: '4.13',
    stage: 4,
    title: 'Application',
    estimatedMinutes: 10,
    skills: ['rc-application'],
    prerequisites: ['rc-passage-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Application questions take the passage's central idea somewhere new: "Which of the following scenarios best illustrates the author's view…," "The author's reasoning would most support which policy?" You are not being asked what the passage says — you are being asked what it *commits* the author to in a case she never discussed.\n\nThe method is principle extraction. Strip the author's position down to its abstract rule — the general claim that does not mention congestion, lichen, or translators — then test each new scenario against that rule. Students who skip the extraction step end up matching surface topics ("this choice is also about traffic") instead of matching the underlying principle.`,
      },
      {
        kind: 'keyterm',
        term: 'Principle extraction',
        definition:
          'Reducing an author\'s position to its abstract, topic-free rule before applying it to new scenarios. The extracted principle preserves the author\'s qualifiers and scope; scenarios are then tested against the principle, not against the passage\'s surface details.',
      },
      {
        kind: 'example',
        title: 'Extracting the congestion principle',
        body: `The author's position: congestion pricing reduces congestion where applied, but its overall value depends on boundary effects that each city must assess — the justification is narrower than either side admits.\n\nExtracted principle (no mention of congestion): **A policy's local success does not establish its overall desirability; the effects at the policy's boundary must be assessed case by case, and broad justifications should be narrowed to what the evidence supports.**\n\nNow the principle travels. A scenario about a school district banning phones — test scores rise in classrooms, but hallway incidents spike — matches: local success, boundary effects, case-by-case assessment needed. A scenario about two cities with identical traffic patterns does not need the principle at all. Extraction first, matching second — that order is the whole method.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what is principle extraction, and why must it come before looking at the scenarios?',
        answer:
          'Principle extraction is reducing the author\'s position to its abstract, topic-free rule, preserving her qualifiers and scope. It must come first because without it you match surface topics ("also about traffic") instead of the underlying rule — and the traps are built from surface matches.',
      },
      {
        kind: 'worked',
        title: 'Applying the principle to four scenarios',
        steps: [
          {
            label: 'Step 1 — State the extracted principle precisely',
            body: `From the congestion passage: "A locally successful intervention should not be judged by its local results alone; its spillover effects at the boundary must be assessed case by case, and sweeping justifications narrowed accordingly." Check the qualifiers: "case by case" (no universal verdicts), "narrowed" (the author qualifies, she does not reject). The principle must carry both — they are what distinguish it from nearby rules.`,
          },
          {
            label: 'Step 2 — Reject the surface-topic match',
            body: `Scenario A: "A second city adopts congestion pricing and also sees traffic fall in its zone." Same topic — traffic, pricing, zones. But it tells us nothing about boundary effects or case-by-case assessment; it merely repeats the local success the author already grants. Surface match, principle miss. This is the most common application trap: the choice about the same subject that applies nothing.`,
          },
          {
            label: 'Step 3 — Reject the principle-violation match',
            body: `Scenario B: "A mayor cites London's success to impose congestion pricing nationwide without studying any city's boundary roads." This does the opposite of the principle: it universalizes from local success and skips the case-by-case assessment the author demands. The author would criticize this, not support it. Application questions include choices the author would oppose — read the stem's direction ("would support" vs. "would criticize") before matching.`,
          },
          {
            label: 'Step 4 — Accept the structural match',
            body: `Scenario C: "A hospital finds a new triage protocol shortens ER waits, but patient advocates note longer waits in the urgent-care clinic next door; the hospital studies the clinic before expanding the protocol." Different topic entirely — no congestion, no pricing. But the structure matches perfectly: local success acknowledged, boundary spillover identified, case-by-case assessment before expansion, no sweeping claim. That is the principle at work in new clothes. Correct.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The best application answer is the scenario most similar to the passage — same topic, same kind of situation.',
        right: 'Topic similarity is irrelevant and often the trap. The right scenario matches the abstract structure of the author\'s position — the qualifiers, the scope discipline, the relationship between local and overall effects — even when the topic is completely different. A hospital triage protocol can instantiate the congestion-pricing principle; a second congestion-pricing story that ignores boundary effects cannot.',
      },
      {
        kind: 'checkpoint',
        prompt: 'The translation-passage author\'s principle: "An art\'s standards should not hide the real choices its practitioners make, though difficulty for its own sake is not the goal." Which scenario best illustrates this principle?',
        choices: [
          'A film studio requires all movies to be shot on digital cameras for efficiency',
          'A restaurant critic praises only dishes whose preparation is invisible to the diner',
          'A museum labels restored paintings with notes on what was repainted and why, without making the labels the exhibit',
          'A novelist writes an intentionally confusing novel to prove her skill',
        ],
        correctIndex: 2,
        explanation:
          'The museum scenario matches the principle\'s full structure: it reveals the practitioner\'s real choices (what was repainted and why) while keeping that revelation subordinate — the labels do not become the exhibit, just as the author wants foreignness to show "occasionally" without making difficulty the goal. The film-studio choice is about efficiency standards, not hidden choices. The restaurant critic inverts the principle: praising invisible preparation is the "invisible translator" ideal the author attacks. The novelist matches only the rejected half — "deliberately difficult" is exactly what the author\'s "None of this is to say…" qualification rules out. The right scenario honors both the principle and its qualifier.',
      },
      {
        kind: 'example',
        title: 'Deeper: direction matters — support vs. undermine',
        body: `Application stems point two ways, and the direction flips the matching:\n\n- **"Would most support / is most consistent with"**: find the scenario that instantiates the author's principle.\n- **"Would most undermine / the author would most likely criticize"**: find the scenario that violates it — the overgeneralization, the dropped qualifier, the ignored boundary.\n\nFor "undermine" stems, the traps invert: the surface-topic match now *supports* the principle and is wrong, while the scenario that drops the author's qualifier is right. Always read the stem's direction word before extracting — it tells you whether to hunt for an instantiation or a violation. And keep the author's qualifiers in the extracted principle either way: most violations consist of dropping exactly one qualifier.`,
      },
      { kind: 'tryit', drillIds: ['d-c044', 'd-c047', 'd-c049'] },
      {
        kind: 'summary',
        points: [
          'Application = extract the principle (abstract, topic-free, qualifiers intact), then match scenarios to it.',
          'Extract before looking at choices; surface-topic matches are the designed trap.',
          'The right scenario matches the principle\'s structure — qualifiers and scope discipline included.',
          'Read the stem\'s direction: "support" hunts instantiations, "undermine" hunts violations.',
          'Most violations drop exactly one of the author\'s qualifiers — keep them in the extraction.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why does extracting the principle in topic-free language protect you from the surface-topic trap? Explain with the congestion example.',
        answer:
          'Because the trap choice shares the passage\'s topic (a second city adopting congestion pricing) while ignoring the principle (boundary effects assessed case by case). A topic-free extraction — "local success does not establish overall desirability; boundary effects must be assessed case by case" — contains no mention of congestion, so a same-topic scenario with no boundary assessment visibly fails to match, while a different-topic scenario with the right structure visibly matches.',
      },
      {
        kind: 'next',
        text: 'You can carry ideas into new cases. Next, lesson 4.14: Analogy — matching relationships, not content.',
      },
    ],
  },
  {
    id: '4.14',
    stage: 4,
    title: 'Analogy',
    estimatedMinutes: 10,
    skills: ['rc-analogy'],
    prerequisites: ['f-analogy'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Analogy questions ask which scenario is "most analogous to" a situation in the passage. Like application questions, they test structure rather than content — but where application carries the author's *principle* into a new case, analogy carries a *relationship* from the passage into a new case. Your job: abstract the relationship precisely, then find the choice with the same relationship wearing different clothes.\n\nThe classic failure is matching the nouns instead of the verbs — picking the choice about the same subject while the relationship points elsewhere. The defense is to state the relationship as a bare skeleton before reading the choices.`,
      },
      {
        kind: 'keyterm',
        term: 'Relationship abstraction',
        definition:
          'Reducing a passage situation to its bare relational skeleton — who does what to what, with what ironic or structural twist — stripped of all topic-specific nouns. The analogous choice is the one that re-instantiates that skeleton, regardless of subject matter.',
      },
      {
        kind: 'example',
        title: 'Abstracting the archivists\' dilemma',
        body: `Read this passage situation:\n\n"In the 1980s, the national film archive began transferring its nitrate films to safety stock. Archivists soon discovered a cruel irony: the heat of the copying lamps was accelerating the decay of the very originals they were trying to preserve. Every preservation pass cost the original a little of its remaining life.\n\nThe archive's solution was to slow down — fewer lamps, cooler light, longer exposures — accepting a slower transfer rate to protect the source. Preservation, the archivists learned, is not the opposite of loss; it is loss, managed."\n\nThe relationship, stripped of film: **a process intended to save X inevitably damages X, so the practitioners must deliberately slow the process, trading speed for reduced harm.**\n\nNow judge: "A conservator restoring a fresco must remove grime, but each cleaning strips a thin layer of original pigment, so she cleans less aggressively and accepts a longer restoration." Same skeleton — saving damages, slow down to limit harm. Analogous. Contrast: "A library scans books quickly to preserve them" — same topic (preservation), but no damaging irony, no deliberate slowing. Topic match, relationship miss — the trap.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: what is relationship abstraction, and what error does it prevent?',
        answer:
          'Relationship abstraction is reducing a passage situation to its bare relational skeleton — who does what to what, with what structural twist — with all topic nouns removed. It prevents the noun-matching error: choosing the scenario about the same subject (preservation, films) while its actual relationship differs from the passage\'s.',
      },
      {
        kind: 'worked',
        title: 'Testing four candidates against the skeleton',
        steps: [
          {
            label: 'Step 1 — Write the skeleton before reading choices',
            body: `Skeleton: "An agent's preservation process inherently damages the thing preserved; the agent responds by deliberately slowing the process, accepting reduced efficiency to minimize the damage." Three required elements: (1) the damage comes from the saving process itself, not an outside threat; (2) the irony is recognized; (3) the response is deliberate slowing with an accepted cost. Any candidate missing an element fails.`,
          },
          {
            label: 'Step 2 — Reject the same-topic non-analogy',
            body: `(A) "A museum digitizes its photo collection rapidly before the prints fade." Preservation topic, but the process does not damage the photos, there is no irony, and nothing is slowed. It matches the nouns (archive, preservation) and none of the verbs. Eliminate — this is the trap the abstraction step exists to kill.`,
          },
          {
            label: 'Step 3 — Reject the partial skeleton',
            body: `(B) "A doctor prescribes a drug that cures an infection but weakens the patient's immune system, so she lowers the dose." Closer: a helpful process causes harm (element 1), and the response is deliberate reduction (element 3). But the harm is a side effect on something else (the immune system), not damage to the very thing being saved — the irony element (2) is structurally different: the drug still cures the infection it targets. Partial skeletons are the hardest traps; require all elements.`,
          },
          {
            label: 'Step 4 — Accept the full re-instantiation',
            body: `(C) "A paper conservator deacidifying manuscripts finds the treatment itself brittles the paper fibers, so she treats fewer pages per day with weaker solutions, accepting a years-longer project." Check: the saving process damages the thing saved (1), the irony is the situation's core (2), the response is deliberate slowing at accepted cost (3). Every element re-instantiated in new nouns. Correct. When a candidate matches the full skeleton, stop — additional "better" matches do not exist.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The most analogous scenario is the one closest to the passage — same field, same kind of people, same objects.',
        right: 'Analogy is about relationships, and relationships are topic-independent. The fresco conservator is more analogous to the film archivists than the photo-digitizing museum is, despite sharing fewer nouns — because she re-instantiates the damaging-preservation irony and the deliberate slowing. Judge the verbs and the structure; let the nouns vary freely.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Passage situation: "The lichenometrists conceded the critics\' objection about varying growth rates, then answered it with elevation-specific calibration." Which is most analogous?',
        choices: [
          'A chef who admits a dish is too salty and then adds more salt',
          'A debater who grants her opponent\'s premise and then shows it supports her own conclusion',
          'A scientist who ignores criticism and repeats her experiment unchanged',
          'Two historians who disagree about the date of an ancient battle',
        ],
        correctIndex: 1,
        explanation:
          'The debater re-instantiates the full skeleton: grant the objection\'s premise (concede the point), then turn it into support for your own position (the variation, once measured per elevation, becomes the evidence that saves the dates). The chef keeps the concession but inverts the response — adding salt surrenders rather than rebuts. The scientist drops the concession entirely, missing the skeleton\'s first element. The historians share the topic (dating disputes) but no structural relationship at all — the pure noun-match trap. Analogy rewards the re-instantiated relationship, never the shared subject.',
      },
      {
        kind: 'example',
        title: 'Deeper: analogy vs. application',
        body: `These two families are easy to confuse because both leave the passage's topic behind. The difference:\n\n- **Application** carries the author's *principle or position* into a new case: "What would the author say about this scenario?" The anchor is the author's view.\n- **Analogy** carries a *situation's structure* into a new case: "Which scenario works like this passage situation?" The anchor is a relationship, and the author's view of it is irrelevant.\n\nIn the checkpoint above, the author's opinion of the lichenometrists does not matter — what matters is the concede-then-rebut structure. If the stem asks what the author would think, you are in application; if it asks what is most analogous, you are in analogy. Name the family from the stem before abstracting, and you will abstract the right thing.`,
      },
      { kind: 'tryit', drillIds: ['d-c043', 'd-c046', 'd-c050'] },
      {
        kind: 'summary',
        points: [
          'Analogy = abstract the relationship skeleton (verbs and structure), then find its re-instantiation.',
          'Write the skeleton before reading choices; require every element to match.',
          'Noun-matching is the trap: same topic with a different relationship is always wrong.',
          'Partial skeletons (missing one element) are the hardest distractors — check all elements.',
          'Analogy carries a situation\'s structure; application carries the author\'s principle. Stem decides.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'A choice shares the passage\'s topic and one structural element but inverts another (like the chef adding more salt). Why is it wrong, and what should you have done?',
        answer:
          'It is wrong because analogy requires the full relational skeleton, and an inverted element breaks the structure — conceding-then-surrendering is not conceding-then-rebutting. You should have written the complete skeleton first (concede premise + turn it into support), which makes the inversion visible on comparison instead of letting the shared topic and partial match seduce you.',
      },
      {
        kind: 'next',
        text: 'Relationships over nouns. Next, lesson 4.15: Organization — describing how the whole passage is built.',
      },
    ],
  },
  {
    id: '4.15',
    stage: 4,
    title: 'Organization',
    estimatedMinutes: 10,
    skills: ['rc-organization'],
    prerequisites: ['rc-passage-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Organization questions ask you to describe the passage's architecture: "Which of the following best describes the organization of the passage?" The choices are compressed narratives — "A phenomenon is described, two explanations are considered, and one is endorsed" — and your job is to pick the narrative that matches your map.\n\nThese are among the most mechanical RC questions, because you already did the work while reading. If your map has one role line per paragraph, the organization answer is just those lines joined into a sentence. Students miss them by choosing narratives that describe a passage they wish they had read — usually one with a cleaner verdict than the author actually delivered.`,
      },
      {
        kind: 'keyterm',
        term: 'Organizational description',
        definition:
          'A compressed narrative of the passage\'s architecture: what each major part does and how the parts connect (e.g. "a proposal is introduced, objections are raised and answered, and implications are drawn"). It describes the argument\'s shape, not its content.',
      },
      {
        kind: 'example',
        title: 'From map to organization answer',
        body: `Your map of the wolves passage:\n\n- **P1:** ranchers' objection (8% loss projection) — problem framed as economic threat.\n- **P2:** biologists counter (elk/willow/Yellowstone); ranchers reply (Yellowstone a poor comparison) — competing views clash.\n- **P3:** state's compromise fails both sides; author reframes — the real dispute is values, not numbers.\n\nJoin the lines: "A policy dispute is presented through two opposing views, a compromise is described and found wanting, and the author reframes the disagreement as deeper than the stated terms." That sentence *is* the organization answer. Notice it mentions no wolves, no percentages — organization descriptions are topic-free, like analogy skeletons. If a choice is full of content details, it is probably describing content, not organization.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: how do you build an organization answer from your passage map?',
        answer:
          'Join your one-line-per-paragraph role notes into a single compressed narrative describing what each part does and how they connect — keeping it topic-free. The map already holds the architecture; the organization answer is just the map\'s role lines fused into one sentence.',
      },
      {
        kind: 'worked',
        title: 'Eliminating organization choices',
        steps: [
          {
            label: 'Step 1 — Draft your own description first',
            body: `Before reading the choices, write the narrative from your map: "Two opposing views on wolf reintroduction are presented (ranchers' economic objection, biologists' ecological counter with Yellowstone evidence, ranchers' reply); the state's compromise is described; the author concludes the compromise fails because the dispute is really about values." Your draft is the standard — now match, don't shop.`,
          },
          {
            label: 'Step 2 — Reject the cleaner-verdict narrative',
            body: `(A) "A problem is identified, a solution is proposed, and its success is demonstrated." This describes a tidy problem-solution passage — but the wolves passage ends with a failed compromise and a reframed, unresolved values dispute. No solution's success is demonstrated. The most common organization trap: a narrative with a cleaner arc than the passage actually has. Check the ending first — it discriminates fastest.`,
          },
          {
            label: 'Step 3 — Reject the wrong-shape narrative',
            body: `(B) "A scientific hypothesis is advanced and then confirmed by experimental results." Wrong shape entirely: no hypothesis is advanced by the author, no experiment confirms anything. This trap works on readers who mapped topics ("science-y passage") instead of roles. Your role lines — objection, counter, reply, failed compromise, reframing — match nothing here. Eliminate on shape alone.`,
          },
          {
            label: 'Step 4 — Confirm the match, including the ending',
            body: `(C) "Competing positions on a proposed policy are examined, an attempted compromise is shown to satisfy neither side, and the underlying disagreement is recast in broader terms." Check each clause against the map: competing positions (P1–P2) ✓; compromise satisfying neither (P3) ✓; disagreement recast broadly (author's values reframing) ✓. The ending matches — "recast in broader terms" captures the author's final move. Correct.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Organization choices are too long to check carefully — I should pick the one whose first half sounds right and move on.',
        right: 'Organization choices are conjunctions, and the test hides the falsehood in the second half. A choice can nail paragraphs 1–2 and then invent a verdict the passage never delivers. Check every clause against your map, especially the final clause — the ending is where passages differ most and where traps concentrate. Thirty seconds of clause-checking beats a fast wrong pick.',
      },
      {
        kind: 'checkpoint',
        prompt: 'A passage: P1 introduces a new theory of dinosaur extinction; P2 presents fossil evidence supporting it; P3 acknowledges a rival theory\'s strongest evidence and argues it is compatible with the new theory. Which best describes the organization?',
        choices: [
          'A theory is proposed, supporting evidence is presented, and a rival theory is refuted',
          'A theory is proposed, supporting evidence is presented, and an apparent objection is accommodated',
          'Two rival theories are described and the more parsimonious one is endorsed',
          'A phenomenon is described and left unexplained pending further research',
        ],
        correctIndex: 1,
        explanation:
          'The second choice matches all three paragraphs: proposal (P1), supporting evidence (P2), and — crucially — the rival evidence is shown to be *compatible* with the new theory, which is accommodation, not refutation. The first choice fails on its final clause: the passage does not refute the rival theory but absorbs it. The third misdescribes the shape: the author never endorses one theory over the other as "more parsimonious." The fourth invents an unresolved ending the passage does not have. As always, the final clause discriminates: refuted vs. accommodated vs. unresolved are three different passages.',
      },
      {
        kind: 'example',
        title: 'Deeper: the five shapes and their endings',
        body: `Most organization answers are variants of five shapes — learn their endings, since endings discriminate:\n\n1. **Problem → solution → defense:** ends with the solution vindicated.\n2. **Received view → complication → revision:** ends with a qualified new view.\n3. **Phenomenon → competing explanations → verdict:** ends endorsing one explanation (or declaring a tie).\n4. **Dispute → compromise → reframing:** ends recasting the disagreement (the wolves passage).\n5. **Thesis → objection → rebuttal → open question:** ends unresolved, awaiting more evidence (the terraces passage).\n\nWhen stuck, ask: "How did it end?" A passage ending in an open question cannot be shape 1; a passage ending in a reframing cannot be shape 3's clean verdict. The ending cuts the choices in half before you check anything else.`,
      },
      { kind: 'tryit', drillIds: ['d-c032', 'd-c036', 'd-c040'] },
      {
        kind: 'summary',
        points: [
          'Organization answers are your map\'s role lines joined into one topic-free narrative.',
          'Draft the description from your map before reading choices; match, don\'t shop.',
          'Check every clause — traps hide the falsehood in the second half, especially the ending.',
          'The ending discriminates fastest: vindicated, revised, verdict, reframed, or unresolved.',
          'Choices full of content details are describing content, not organization — prefer the structural one.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Two organization choices both describe your passage\'s first two paragraphs correctly but differ in the final clause: "the rival theory is refuted" vs. "the rival theory is accommodated." How do you decide?',
        answer:
          'Go to the final paragraph (or the passage\'s treatment of the rival theory) and check what the author actually did with it: refutation requires the author to show the rival view false or untenable, while accommodation shows its evidence is compatible with the author\'s position. In the dinosaur example the author argues the rival evidence is compatible — accommodation — so "refuted" overstates the move. The final clause is decisive because it describes the author\'s last and most distinctive action.',
      },
      {
        kind: 'next',
        text: 'Single passages fully mapped. Next, lesson 4.16: Comparative Reading — two passages, one topic, and the relationship between them.',
      },
    ],
  },
  {
    id: '4.16',
    stage: 4,
    title: 'Comparative Reading',
    estimatedMinutes: 14,
    skills: ['rc-comparative'],
    prerequisites: ['rc-other-viewpoints'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `The fourth passage set is different: two shorter passages on the same topic, followed by questions about each passage *and* about their relationship. Comparative Reading tests everything Stage 4 taught — structure, viewpoints, attitude, inference — plus one new skill: precisely characterizing how two texts relate.\n\nThe relationship questions come in five flavors: what the passages **agree** on, what they **disagree** about, how their **scopes** differ, how their **methods** differ, what **assumptions** they share, and how one passage would **respond** to the other. This lesson teaches a two-map method that makes all six straightforward.`,
      },
      {
        kind: 'keyterm',
        term: 'Comparative relationship',
        definition:
          'The precise way two passages on a shared topic relate: their points of agreement and disagreement, differences in scope (how broadly each claims) and method (what kind of evidence each uses), assumptions they share, and how each would respond to the other\'s argument.',
      },
      {
        kind: 'example',
        title: 'Two passages, two maps, one relationship line',
        body: `Read both passages, then build the relationship:\n\n**Passage A:** "The results of the six-month four-day-week trial, involving sixty-one companies and nearly three thousand workers, were striking: revenue rose slightly, sick days fell by two-thirds, and most firms kept the schedule after the trial ended. The trial's organizers conclude that reduced hours do not reduce output — they concentrate it. If these results generalize, the five-day week may soon look like a relic of the industrial era, maintained by habit rather than evidence."\n\n**Passage B:** "Enthusiasm for the four-day-week trials should be tempered by who volunteered for them. The participating firms opted in, which means the sample was tilted toward companies already confident they could manage — precisely the firms least likely to struggle. Moreover, most trials ran with the support of advocacy organizations that had a stake in positive results. None of this proves the four-day week fails; it proves the trials cannot tell us what would happen at firms that did not volunteer, which is where the policy would actually bite."\n\n- **Map A:** reports trial results (revenue up, sick days down); endorses generalizing — five-day week is habit, not evidence. Scope: broad, forward-looking.\n- **Map B:** attacks generalizability — self-selected sample, advocacy involvement; the trials cannot speak for non-volunteers. Scope: narrow, methodological. Note B's qualifier: "None of this proves the four-day week fails."\n- **Relationship line:** Agree the trials occurred with positive results; disagree on whether results generalize beyond volunteers. Shared assumption: both treat firm-level output as measurable and relevant. B's method is methodological critique; A's is empirical reportage.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Without looking back: name the six comparative-relationship question flavors.',
        answer:
          'Agreement (what both passages accept), disagreement (the precise point of conflict), scope (how broadly each passage claims), method (what kind of evidence or argument each uses), shared assumptions (what both take for granted), and cross-response (how one passage would respond to the other).',
      },
      {
        kind: 'worked',
        title: 'Answering all six flavors from two maps',
        steps: [
          {
            label: 'Step 1 — Agreement: find the shared ground',
            body: `"Both passages agree that…" Check each map for overlap. A reports the trials' positive results; B never disputes them — B disputes what follows from them ("None of this proves the four-day week fails" concedes the results while denying the inference). So they agree the trials took place and showed positive results for participants. Trap: "Both agree the four-day week should be adopted" — A leans that way, B explicitly withholds judgment pending better evidence. Agreement requires both maps to contain it.`,
          },
          {
            label: 'Step 2 — Disagreement: state it as a proposition one affirms and the other denies',
            body: `"The passages disagree about whether…" Formulate precisely: A affirms that the trial results generalize to firms at large ("If these results generalize…"); B denies exactly that ("the trials cannot tell us what would happen at firms that did not volunteer"). The disagreement is about generalizability — not about whether the trials happened, not about whether shorter hours are desirable. Precision matters: choices will offer nearby-but-wrong disagreements, and only the proposition both passages address in opposite ways is correct.`,
          },
          {
            label: 'Step 3 — Scope and method: how broadly, and how argued',
            body: `Scope: A claims broadly — an era-ending verdict on the five-day week. B claims narrowly — a methodological caution about one inference. Method: A argues from empirical results (revenue, sick days); B argues from sampling logic (self-selection, advocacy involvement). A scope question ("Passage A's conclusion is broader than Passage B's in that…") and a method question ("The two passages differ in that…") both fall out of the maps' scope and evidence lines. Map scope and method while reading — they are question magnets.`,
          },
          {
            label: 'Step 4 — Shared assumptions: what neither questions',
            body: `"Which assumption do both passages share?" Look for what both take for granted: both treat company-level output (revenue, productivity) as measurable and as the relevant yardstick — A cites revenue gains, B never questions that output can be measured, only whether the sample generalizes. Neither passage questions whether firms' results are quantifiable. Shared assumptions hide in the unquestioned background both maps accept; find them by asking what would have to be false for both arguments to collapse.`,
          },
          {
            label: 'Step 5 — Cross-response: how would A answer B?',
            body: `"Passage A's author would most likely respond to Passage B's criticism by…" Put A's voice in dialogue with B's objection. A's strongest reply from its own materials: the results include objective measures (revenue rose, sick days fell) that do not depend on volunteers' confidence — and most firms kept the schedule afterward, suggesting the gains were real, not volunteered optimism. A would not concede generalizability outright; A would argue the objective data survive the selection worry. Build the response from the responding passage's own claims, not from your own opinions about who is right.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'In Comparative Reading, the two passages always take opposite sides, so every relationship question is about their disagreement.',
        right: 'Passages often agree on significant ground — here, both accept the trials\' positive results — and disagree narrowly (on generalizability). Some pairs even agree on the conclusion and differ only in method or scope. Assuming total opposition makes you miss agreement questions, shared-assumption questions, and the precise (narrow) disagreement the test actually asks about. Map each passage independently, then compare — never assume the shape of the relationship in advance.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Passage B says: "None of this proves the four-day week fails." What does this sentence tell you about Passage B\'s relationship to Passage A\'s position?',
        choices: [
          'B concedes A\'s results while disputing the inference A draws from them',
          'B agrees with A that the five-day week is maintained by habit',
          'B argues the trials were fraudulent and their results should be discarded',
          'B takes no position on anything A claims',
        ],
        correctIndex: 0,
        explanation:
          'The sentence is a textbook concession-then-limit: B grants that the trials do not show failure (conceding A\'s reported results) while denying that they show generalizable success (disputing A\'s inference). This is exactly the narrow-disagreement structure: shared ground on the results, conflict on what follows. The second choice is wrong because "maintained by habit" is A\'s distinctive forward-looking claim, which B never endorses. The third overstates wildly — B questions the sample, not the honesty of the results. The fourth ignores the sentence\'s clear engagement: B takes a precise position on A\'s inference, which is the opposite of no position.',
      },
      {
        kind: 'example',
        title: 'Deeper: the dialogue habit',
        body: `For cross-response questions, run a mental dialogue: let B speak its objection, then answer *as A*, using only A's materials. B: "Your sample was self-selected." A: "But revenue and sick days are objective, and most firms kept the schedule — volunteers' confidence cannot fake those." Then check the reverse: A: "The five-day week is habit." B: "Your trials cannot speak for firms that did not volunteer — which is where the policy would bite."\n\nTwo rules keep the dialogue honest. First, the responder may only use ammunition from their own passage — inventing new replies ("A would cite a bigger study") is outside knowledge. Second, respect each passage's qualifiers: B's "none of this proves it fails" means B cannot be made to say the policy is doomed, and A's "if these results generalize" means A already hedged. The dialogue answers cross-response questions; the qualifiers keep it accurate.`,
      },
      { kind: 'tryit', drillIds: ['d-c052', 'd-c055', 'd-c057', 'd-c060'] },
      {
        kind: 'summary',
        points: [
          'Map each passage independently (thesis, scope, method, attitude), then write one relationship line.',
          'Six flavors: agreement, disagreement, scope, method, shared assumptions, cross-response.',
          'Disagreement must be a proposition one affirms and the other denies — keep it as narrow as the texts.',
          'Shared assumptions live in the unquestioned background both passages accept.',
          'Cross-response: answer as the passage, using only its materials and respecting its qualifiers.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why must you map each comparative passage independently before comparing them? What goes wrong if you read B as "the anti-A passage"?',
        answer:
          'Because the relationship\'s shape is what you are trying to discover, not assume: reading B as "anti-A" blinds you to agreement (both accept the trial results), to shared assumptions (measurable firm output), and to the disagreement\'s true narrowness (generalizability, not the results). Independent maps let the comparison emerge from the texts; pre-framing manufactures an opposition the questions will punish.',
      },
      {
        kind: 'next',
        text: 'Stage 4 complete — you now read structurally, track every voice, calibrate tone, handle evidence, and compare passages. Next, Stage 5 turns these foundations into full timed-section strategy.',
      },
    ],
  },
];