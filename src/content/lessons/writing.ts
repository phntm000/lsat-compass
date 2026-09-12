/**
 * Writing — Argumentative Writing curriculum (lessons w.1–w.9).
 * All prompts, examples, and explanations are original.
 * Contract: content-schema.md §§0, 1, 4, 7, 9.
 *
 * Notes: the writing task is unscored and administered separately from the
 * multiple-choice test. Essays are stored locally in the app; there is no
 * auto-grading — lesson w.9 provides a self-assessment rubric.
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

export const WRITING_LESSONS: Lesson[] = [
  {
    id: 'w.1',
    stage: 10,
    title: 'Understanding the Writing Task',
    estimatedMinutes: 8,
    skills: ['w-task'],
    prerequisites: [],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `After the multiple-choice test comes a separate task: **Argumentative Writing**. It is administered separately, it is **not scored**, and it asks you to do something the rest of the test never does — produce an argument of your own.

Here is the shape of it: you receive a prompt describing a debatable issue, along with several perspectives on that issue. Your job is to take a clear position and defend it with reasons, in essay form, within a fixed time limit. Law schools receive your essay with your file. So while no number is attached to it, real readers — admissions readers — will read it as a sample of how you think and write.`,
      },
      {
        kind: 'keyterm',
        term: 'Argumentative Writing',
        definition:
          'The LSAT\u2019s separate written section: you are given an issue with multiple perspectives, take a position on it, and defend that position with reasons in a timed essay. It is unscored, but law schools receive it as a writing sample.',
      },
      {
        kind: 'prose',
        md: `What the readers are looking for is not brilliance — it is competence under time pressure:

- **A clear position.** The reader should never wonder what you think.
- **Reasons that actually support it.** Two or three solid reasons beat a pile of weak ones.
- **Engagement with other views.** The prompt hands you competing perspectives; strong essays take the best opposing view seriously.
- **Organization.** A reader under time pressure herself should be able to follow your structure at a glance.

Two practical notes. First, your essays are **stored locally in this app** — they never leave your device. Second, there is **no auto-grading**: no algorithm scores your essay. In lesson w.9 you will learn a self-assessment rubric, because developing your own judgment about your writing is itself the skill.`,
      },
      {
        kind: 'example',
        title: 'A sample prompt (original)',
        body: `The town of Millbrook must decide whether to convert its downtown parking lot into a public market. Three perspectives are offered: downtown vendors support the conversion, arguing it will triple foot traffic; commuters oppose it, arguing downtown parking is already scarce; the mayor proposes converting half the lot as a compromise. You are asked to write an essay taking a position on the proposal.`,
        note: `Notice what the prompt gives you (the decision, the perspectives) and what it does not (your position — that is the entire task). Every writing prompt in this curriculum follows this shape.`,
      },
      {
        kind: 'worked',
        title: 'Dissecting the task in four steps',
        steps: [
          {
            label: 'Step 1 — Find the decision',
            body: `Strip the prompt to its question: what is being decided? Here: convert the parking lot into a market, or not. Everything in your essay must bear on that decision. If a sentence does not help answer it, the sentence does not belong.`,
          },
          {
            label: 'Step 2 — List the perspectives',
            body: `Name each viewpoint and its core claim: vendors (convert — foot traffic), commuters (keep — parking scarcity), mayor (half-and-half — compromise). You now hold the raw material; lessons w.2 and w.5 will teach you what to do with it.`,
          },
          {
            label: 'Step 3 — Note what is being asked of you',
            body: `The task is to take a position and defend it — not to summarize the perspectives, not to list pros and cons neutrally. An essay that describes all three views beautifully but never chooses is a failed essay, however well written.`,
          },
          {
            label: 'Step 4 — Note what success looks like',
            body: `A successful essay: one clear thesis, two to three reasons, the strongest opposing view engaged fairly, clean organization. That is the whole target — ambitious in execution, modest in scope. You are not writing a dissertation; you are writing a competent timed argument.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Because the writing section is unscored, it does not matter. Save your energy.',
        right:
          'Unscored is not unread. Admissions readers receive your essay as a writing sample, and a sloppy, disorganized, or position-free essay raises questions your multiple-choice score cannot answer. The good news: the bar is competence, not brilliance — a clear, organized, reasoned essay is entirely achievable with the toolkit in these nine lessons.',
      },
      {
        kind: 'checkpoint',
        prompt: 'What is the Argumentative Writing task asking you to do?',
        choices: [
          'Summarize each perspective fairly so the reader understands the whole debate.',
          'Take a clear position on the issue and defend it with reasons, engaging competing views.',
          'List the pros and cons of each perspective without choosing between them.',
          'Write as much as possible in the time allowed to demonstrate fluency.',
        ],
        correctIndex: 1,
        explanation:
          'The task is argument, not summary: you must choose a position on the debatable issue and defend it with reasons. Summarizing all sides without choosing fails the central demand; a neutral pros-and-cons list is the same failure in outline form; and sheer volume without a position is fluency without thought. Engaging the competing perspectives matters — but as material for your argument, not as a substitute for having one.',
      },
      {
        kind: 'example',
        title: 'What a weak response looks like',
        body: `“The vendors make good points about foot traffic. The commuters also raise valid concerns about parking. The mayor's compromise has merit too. This is a difficult issue with strong arguments on multiple sides.” Four sentences, zero position. The reader learns that the writer can summarize — and nothing about what the writer thinks or why. Every lesson from w.3 onward exists to prevent exactly this essay.`,
        note: `If your draft ever reads like this, the diagnosis is simple: you have not chosen yet. Go back to w.3.`,
      },
      {
        kind: 'retrieval',
        prompt: 'In one sentence, what does the writing task require?',
        answer:
          'Take a clear position on a debatable issue and defend it with reasons in a timed essay, engaging the competing perspectives the prompt provides.',
      },
      {
        kind: 'summary',
        points: [
          'Argumentative Writing is unscored and administered separately — but law schools receive your essay as a writing sample.',
          'The task: take a position on the prompt\u2019s issue and defend it with reasons, within a fixed time limit.',
          'Readers look for a clear position, supporting reasons, engagement with other views, and organization.',
          'Summarizing without choosing is the fundamental failure mode — the task demands a position.',
          'Essays are stored locally in the app; there is no auto-grading — lesson w.9 teaches self-assessment.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why does an unscored section still deserve serious preparation?',
        answer:
          'Because unscored does not mean unread: admissions readers see the essay as a sample of your thinking and writing. A disorganized or position-free essay raises doubts your score cannot erase — while a clear, reasoned essay is fully achievable with a modest, learnable toolkit.',
      },
      {
        kind: 'next',
        text: 'Next: identifying the perspectives — how to map every viewpoint in the prompt so none of them ambushes you later.',
      },
    ],
  },
  {
    id: 'w.2',
    stage: 10,
    title: 'Identify the Perspectives',
    estimatedMinutes: 8,
    skills: ['w-perspectives'],
    prerequisites: ['w-task'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Every writing prompt hands you a gift most test-takers waste: the **perspectives**. These are not decoration. They are the debate, pre-loaded — the claims you will borrow from, argue against, and be judged on for understanding. Most writers skim them on the way to their own opinion. Strong writers **map** them first.

Mapping takes three minutes and pays for itself twice: it gives you your reasons (someone in the prompt is already arguing your side, with arguments you can adopt and improve), and it gives you your opposition (the view you must engage in w.5). Skip the map, and the strongest opposing argument will occur to you halfway through your conclusion — too late.`,
      },
      {
        kind: 'keyterm',
        term: 'Perspective',
        definition:
          'One viewpoint offered by the prompt: a claim about what should be done, plus the reasons behind it. Your essay must show you understood each perspective — especially the ones you disagree with.',
      },
      {
        kind: 'prose',
        md: `For each perspective, extract two things in your own words:

1. **The claim** — what this perspective says should be done.
2. **The reasons** — why it says so. Keep the strongest one or two; discard the filler.

Then note the shape of the disagreement: where do the perspectives directly clash, and where do they quietly agree? Two perspectives can oppose each other's *solutions* while agreeing on the *problem* — and that shared ground is useful material for your essay. Finally, identify the **strongest opposing perspective**: the view against yours with the best reasons. That perspective is your future sparring partner. You will meet it again in w.5.`,
      },
      {
        kind: 'example',
        title: 'Mapping the Millbrook perspectives',
        body: `Vendors — claim: convert the lot. Reasons: foot traffic would triple; local businesses, not chains, capture the spending. Commuters — claim: keep the lot. Reasons: downtown parking is already scarce; longer commutes push workers to drive farther, not less. Mayor — claim: convert half. Reasons: captures most of the market's benefit while preserving some parking; compromise is politically viable.`,
        note: `Three claims, six reasons, one map. Notice the hidden agreement: everyone concedes downtown vitality matters — they differ on the means. That shared ground can anchor your essay's framing.`,
      },
      {
        kind: 'worked',
        title: 'Map a new prompt in four steps',
        steps: [
          {
            label: 'Step 1 — Read the new prompt',
            body: `A school district considers moving high-school start times from 7:30 to 8:45. Perspectives: parents support the change (teen sleep science); teachers oppose it (after-school activities and bus schedules would be disrupted); students are split (some want the sleep, others want early release for jobs).`,
          },
          {
            label: 'Step 2 — Extract each claim',
            body: `Parents: start later. Teachers: keep the early start. Students: divided — no single claim, which itself is worth noting: "students are split" means you cannot attribute one position to them. Write each claim in five words or fewer.`,
          },
          {
            label: 'Step 3 — Extract the strongest reason per side',
            body: `Parents: adolescent sleep research shows later starts improve health and learning — the single strongest reason in the prompt. Teachers: the entire transportation and activity schedule is built around the early start; moving it cascades. Keep one reason each; these are the two you will actually use.`,
          },
          {
            label: 'Step 4 — Name your sparring partner',
            body: `Suppose you side with the parents. Your sparring partner is the teachers' perspective — it has the best opposing reason (the cascade of schedule disruptions). Write it down now: "must engage: teachers' disruption argument." In w.5 you will learn exactly how.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'You only need the perspective you agree with. The rest is noise.',
        right:
          'You need all of them — and especially the one you disagree with. Your essay will be judged partly on whether you engaged the best opposing view fairly, and you cannot engage what you never mapped. Worse, unmapped perspectives have a habit of resurfacing mid-essay as objections you have no answer ready for. Three minutes of mapping now prevents ten minutes of scrambling later.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'You side with the parents on later school start times. Which perspective-mapping habit will most improve your essay?',
        choices: [
          'Memorizing the parents\u2019 reasons word-for-word so you can quote them.',
          'Mapping the teachers\u2019 disruption argument carefully, since it is the strongest view against yours.',
          'Ignoring the students\u2019 split view because a divided perspective is useless.',
          'Deciding the perspectives do not matter once you have chosen your side.',
        ],
        correctIndex: 1,
        explanation:
          'The teachers\u2019 perspective is your sparring partner: the strongest opposing view, with the best reason against your position. Mapping it carefully is what lets you engage it fairly in w.5 instead of being ambushed by it mid-essay. Memorizing quotes wastes the map\u2019s purpose (your own words are what go in the essay); the students\u2019 split view is still informative — it tells you the affected group is divided, which shapes how you frame your case; and discarding the perspectives after choosing abandons both your best borrowed reasons and your opposition.',
      },
      {
        kind: 'example',
        title: 'Spotting the hidden agreement',
        body: `In the Millbrook prompt, vendors and commuters seem to disagree about everything — until you notice both assume downtown vitality is the goal. Vendors pursue it through markets; commuters through accessible parking. An essay that opens by naming this shared ground ("everyone wants a thriving downtown; the question is how") sounds more judicious than one that treats the other side as the enemy — and judiciousness is persuasive.`,
        note: `Hidden agreements do not erase disagreements. They frame them — and framing is half of persuasion.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What two things do you extract from each perspective, and what do you do with the strongest opposing one?',
        answer:
          'Each perspective\u2019s claim (what it says should be done) and its strongest one or two reasons, in your own words. The strongest opposing perspective becomes your sparring partner: the view you will engage fairly in w.5.',
      },
      {
        kind: 'summary',
        points: [
          'Map every perspective before writing: claim + strongest reasons, in your own words.',
          'The map gives you borrowed reasons (allies) and your opposition (the view to engage).',
          'Note where perspectives clash — and where they quietly agree; shared ground frames your essay.',
          'Identify your sparring partner now: the strongest perspective against your position.',
          'Never strawman: the essay is judged partly on fair treatment of opposing views.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why map perspectives you disagree with?',
        answer:
          'Because your essay must engage the best opposing view fairly, which is impossible if you never mapped it — and because unmapped objections resurface mid-essay when you have no answer prepared. Mapping is three minutes that prevents ten minutes of scrambling.',
      },
      {
        kind: 'next',
        text: 'Next: forming your thesis — the one-sentence spine your entire essay will hang from.',
      },
    ],
  },
  {
    id: 'w.3',
    stage: 10,
    title: 'Form Your Thesis',
    estimatedMinutes: 9,
    skills: ['w-thesis'],
    prerequisites: ['w-perspectives'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `A thesis is the essay's spine: one or two sentences stating your position and your main reason. Everything else in the essay — every reason paragraph, the counterpoint, the conclusion — hangs from it. Without a thesis, reasons wander; with one, even simple reasons sound purposeful, because the reader always knows what they are *for*.

The good news: a thesis is a small, mechanical thing to build. It has a formula, and it has a test. This lesson gives you both.`,
      },
      {
        kind: 'keyterm',
        term: 'Thesis',
        definition:
          'One or two sentences stating your position and your main reason: what you think should be done, and why. Everything in the essay serves it. If a sentence cannot be disagreed with, it is not a thesis.',
      },
      {
        kind: 'prose',
        md: `The formula: **position + because + your strongest reason.**

- Position: what should be done. ("Millbrook should convert the lot into a public market.")
- Because: the word that turns a preference into an argument.
- Strongest reason: the single most defensible support from your map. ("because a market triples downtown foot traffic, which is the town's stated economic priority.")

Then run the **disagreement test**: could a reasonable person disagree with your sentence? If yes, it is a thesis — it takes a stand. If no ("markets have both benefits and drawbacks"), it is an observation, and observations do not anchor essays.

One refinement: a thesis can acknowledge complexity without straddling. "Millbrook should convert the lot, while reserving the north row for commuter parking" is still a position — a qualified one. Fence-sitting is refusing to choose; qualification is choosing thoughtfully.`,
      },
      {
        kind: 'example',
        title: 'Weak vs. strong thesis (Millbrook)',
        body: `Weak: "The parking lot issue has good arguments on both sides, and the town should consider all perspectives carefully." Fails the disagreement test — nobody could disagree, because it says nothing.

Strong: "Millbrook should convert the downtown lot into a public market, because tripling foot traffic serves the town's economic priority better than preserving scarce parking serves commuters." A commuter could disagree. A vendor could cheer. It takes a stand — and it previews the essay's best reason.`,
        note: `Notice the strong thesis does two jobs: it states the position and it advertises the strongest reason. The reader now knows exactly what the essay must prove.`,
      },
      {
        kind: 'worked',
        title: 'Build a thesis for school start times in four steps',
        steps: [
          {
            label: 'Step 1 — Pick a side',
            body: `Consult your map from w.2 and choose. Suppose you side with the parents: start times move to 8:45. Choosing is the whole task — do not hedge, do not rank the perspectives, choose. Write the position as a bare sentence: "The district should move start times to 8:45."`,
          },
          {
            label: 'Step 2 — Pick your single strongest reason',
            body: `From the map: the adolescent sleep research — later starts improve health and learning. It is specific, evidence-backed, and hard to dismiss. That is your "because" clause. Weaker reasons (students want it) wait for the body paragraphs or get cut in w.4.`,
          },
          {
            label: 'Step 3 — Combine into one sentence',
            body: `"The district should move high-school start times to 8:45, because the sleep research shows later starts measurably improve both student health and learning." One sentence, position plus reason. Read it aloud — a thesis should survive being spoken.`,
          },
          {
            label: 'Step 4 — Run the disagreement test',
            body: `Could a reasonable person disagree? The teachers certainly would — and that is the point. A thesis that no one could dispute is not a thesis; it is a platitude. If your sentence passes, you have a spine. If it fails, sharpen the position until someone could push back.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'A balanced, judicious essay should not take a strong position.',
        right:
          'Balance in this task comes from engaging objections (w.5–w.6), not from refusing to choose. The prompt explicitly asks for your position; an essay without one fails the assignment no matter how even-handed it sounds. Judiciousness is shown by how fairly you treat the other side — after you have taken your stand, not instead of taking it.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which of the following is a real thesis for the Millbrook prompt?',
        choices: [
          'The parking lot question involves vendors, commuters, and the mayor, each with legitimate concerns.',
          'Converting the lot deserves careful study before any decision is made.',
          'Millbrook should convert the lot into a market, because the economic gains from tripled foot traffic outweigh the parking loss.',
          'Both the market and the parking lot have advantages that the town should weigh.',
        ],
        correctIndex: 2,
        explanation:
          'Only the third option states a position plus a reason and passes the disagreement test — a commuter could genuinely dispute it. The first merely lists stakeholders; the second defers the decision ("deserves study" chooses nothing); the fourth observes that trade-offs exist without taking a side. All three failures share one flaw: they say nothing anyone could disagree with, which means they give the essay nothing to prove.',
      },
      {
        kind: 'example',
        title: 'The qualified thesis',
        body: `"Millbrook should convert the lot into a market, while reserving the north row for commuter parking and running a shuttle on market days." Still a position — the town converts the lot — with a condition attached. Qualification is not fence-sitting: it chooses, then answers the strongest objection inside the thesis itself. Use it when the opposing side's best reason is too strong to ignore (a preview of w.6).`,
        note: `Do not qualify reflexively. An unqualified thesis argued well beats a qualified thesis chosen from timidity. Qualify because the objection demands it, not because choosing feels uncomfortable.`,
      },
      {
        kind: 'retrieval',
        prompt: 'State the thesis formula and the disagreement test.',
        answer:
          'Formula: position + because + strongest reason ("Millbrook should convert the lot, because…"). Disagreement test: could a reasonable person disagree with the sentence? If yes, it is a thesis; if no, it is an observation.',
      },
      {
        kind: 'summary',
        points: [
          'The thesis is the essay\u2019s spine: position + because + strongest reason, in one or two sentences.',
          'Run the disagreement test: if nobody could disagree with your sentence, it is not a thesis.',
          'A thesis can acknowledge complexity (a qualified position) without straddling the fence.',
          'Balance comes from engaging objections later — not from refusing to choose now.',
          'Build it mechanically: pick a side, pick the strongest reason, combine, test.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why isn\u2019t "both sides have good points" a thesis?',
        answer:
          'Because it takes no position and fails the disagreement test — nobody could dispute it, so it gives the essay nothing to prove. The task explicitly asks for your position; even-handedness belongs in how you treat objections (w.5–w.6), not in whether you choose.',
      },
      {
        kind: 'next',
        text: 'Next: selecting your strongest reasons — why two or three good reasons beat six weak ones.',
      },
    ],
  },
  {
    id: 'w.4',
    stage: 10,
    title: 'Select Your Strongest Reasons',
    estimatedMinutes: 9,
    skills: ['w-reasons'],
    prerequisites: ['w-thesis'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Your thesis is built. Now it needs support — and here most writers make the same mistake: they pile on every reason they can think of, on the theory that more is stronger. It is not. **Weak reasons dilute strong ones.** Each feeble reason is a target for the reader's doubt, and doubt is contagious: once a reader dismisses one of your reasons, she reads the next one skeptically.

The professional move is generate-then-filter: brainstorm four or five reasons, keep the best two or three, and cut the rest without mercy. An essay with two solid reasons, each defended well, beats an essay with five asserted weakly — every time.`,
      },
      {
        kind: 'keyterm',
        term: 'Reason selection',
        definition:
          'Choosing the two or three strongest supports for your thesis and cutting the rest. A strong reason passes two tests: it directly supports the thesis, and it is specific and defensible rather than vague or easily flipped.',
      },
      {
        kind: 'prose',
        md: `Test every candidate reason twice:

1. **Relevance:** does it directly support *your thesis* — not a neighboring claim, not a general good vibe? A reason can be true and still be useless if it does not push your position forward.
2. **Strength:** is it specific and hard to dismiss? "Markets are nice" is vague; "the vendor survey projects tripled foot traffic, and foot traffic is the town's stated priority" is specific. Easily flipped reasons ("parking is scarce" — true, but it supports the *other* side) must be cut or they will be used against you.

Then **order** the survivors deliberately: strongest first (primacy — it frames everything after) or strongest last (recency — it echoes in the conclusion). Either is defensible; drifting is not. Pick one and commit.`,
      },
      {
        kind: 'example',
        title: 'Ranking Millbrook reasons',
        body: `Keep: "The vendor survey projects tripled foot traffic, directly serving the town's stated economic priority." Specific, evidence-backed, tied to the thesis.

Keep: "Market stalls go to local vendors first under the proposal, so the gains stay in Millbrook rather than leaking to chains." Defensible, concrete.

Cut: "Public markets are pleasant community spaces." Vague — pleasant for whom, and what does it prove about the conversion?

Cut: "Parking downtown is already difficult." True — and it argues for the commuters. Never hand the other side ammunition inside your own reasons.`,
        note: `The cut reasons are not false. They are either weak or dangerous. "True but unhelpful" is the most common reason a reason gets cut.`,
      },
      {
        kind: 'worked',
        title: 'Select reasons for school start times in four steps',
        steps: [
          {
            label: 'Step 1 — Brainstorm without filtering',
            body: `Thesis: move start times to 8:45. Candidates: (a) sleep research shows health and learning gains; (b) students want it; (c) neighboring districts did it successfully; (d) early starts are "traditional but outdated"; (e) fewer tardies were recorded in pilot programs. Five candidates — quantity now, quality next.`,
          },
          {
            label: 'Step 2 — Test each for relevance and strength',
            body: `(a) passes both — it is the thesis's own reason. (b) is weak: student preference is easily dismissed ("students also want no homework"). (c) passes — precedent is defensible evidence. (d) fails — "outdated" is a slogan, not a reason. (e) passes — measured tardy reductions are specific and hard to wave away.`,
          },
          {
            label: 'Step 3 — Cut two',
            body: `Cut (b) and (d) without ceremony. Three survivors: sleep research, neighboring-district precedent, pilot tardy data. Notice what remains: evidence, precedent, measurement — three different *kinds* of support, which makes the case feel broad without being scattershot.`,
          },
          {
            label: 'Step 4 — Order deliberately',
            body: `Strongest first: sleep research opens (it is the moral and scientific core). Precedent second, tardy data third — or flip the last two so the essay closes on hard numbers. Either order is fine; what matters is that the order is a decision, not an accident.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'More reasons always make a stronger essay. Include everything you can think of.',
        right:
          'Each weak reason is a gift to the skeptical reader: dismiss one, and the rest inherit the doubt. Two or three strong reasons, each given a full paragraph of defense, project confidence; six thin reasons project desperation. Selection is the skill — generating is easy, cutting is the craft.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'Your thesis: Millbrook should convert the lot into a market. Which candidate reason should be cut?',
        choices: [
          'The vendor survey projects tripled foot traffic, the town\u2019s stated economic priority.',
          'Stall priority goes to local vendors, so gains stay in Millbrook.',
          'Many residents enjoy browsing markets on weekends.',
          'Pilot markets in two nearby towns increased downtown revenue within a year.',
        ],
        correctIndex: 2,
        explanation:
          'The third option is the cut: "many residents enjoy browsing" is vague, unmeasurable, and proves nothing about whether the town should sacrifice its parking lot — it is the kind of pleasant filler that invites a skeptical reader to dismiss the whole paragraph. The other three are specific and defensible: projected foot traffic tied to the town\u2019s priority, local capture of the gains, and precedent from nearby towns. Cutting is not about truth — the cut reason may be true — it is about strength.',
      },
      {
        kind: 'example',
        title: 'Turning a weak reason into a strong one',
        body: `Weak: "Later start times are popular with students." Strong version: "In the district's pilot program, tardiness fell 31 percent in the first semester — students did not just prefer the later start, they showed up for it." The move is specification: replace the vague claim with the measurable one behind it. If no measurable version exists, that is information — cut the reason.`,
        note: `Before cutting, always ask whether the weak reason is hiding a strong one. Specification rescues more reasons than any other edit.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What are the two tests of a strong reason?',
        answer:
          'Relevance: it directly supports your thesis, not a neighboring claim. Strength: it is specific and defensible — evidence-backed or concrete — rather than vague, easily dismissed, or flippable to the other side.',
      },
      {
        kind: 'summary',
        points: [
          'Generate four or five reasons, keep the best two or three, cut the rest — weak reasons dilute strong ones.',
          'Test each reason for relevance (supports your thesis directly) and strength (specific, defensible, not flippable).',
          '"True but unhelpful" is the most common reason a reason gets cut.',
          'Try specification before cutting: a measurable version of a vague reason may be worth keeping.',
          'Order the survivors deliberately — strongest first or strongest last — never by accident.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why cut weak reasons instead of including everything?',
        answer:
          'Because doubt is contagious: once a reader dismisses one weak reason, she reads the remaining reasons skeptically. Two or three strong reasons defended in full paragraphs project confidence; a pile of thin reasons projects desperation and hands the skeptic targets.',
      },
      {
        kind: 'next',
        text: 'Next: incorporating a competing perspective — why the strongest opposing view belongs inside your essay, stated fairly.',
      },
    ],
  },
  {
    id: 'w.5',
    stage: 10,
    title: 'Incorporate a Competing Perspective',
    estimatedMinutes: 9,
    skills: ['w-counterargument'],
    prerequisites: ['w-reasons'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `You have a thesis and strong reasons. Now comes the move that separates persuasive essays from one-sided ones: **bringing the opposition inside your essay** — deliberately, fairly, and on your terms.

This feels backwards. Why would you give space to the view you are arguing against? Because the reader is already thinking of it. The commuter's parking objection exists in the reader's mind whether you mention it or not. If you raise it yourself, you control the framing; if you ignore it, it sits there unanswered, quietly voting against you. Engaging the best opposing view does not weaken your argument — it proves you chose your position with your eyes open.`,
      },
      {
        kind: 'keyterm',
        term: 'Steelmanning',
        definition:
          'Presenting the opposing view in its strongest form before responding to it — the opposite of a strawman. You state the other side\u2019s best reason fairly, in your own words, so your response answers the real objection rather than a caricature.',
      },
      {
        kind: 'prose',
        md: `The procedure, using the sparring partner you identified in w.2:

1. **Pick the strongest opposing perspective** — not the weakest. Engaging a weak objection proves nothing; engaging the best one proves confidence.
2. **State it fairly**, in your own words, leading with its best reason. No scare quotes, no "some claim." Give the objection its full weight: "Commuters are right that downtown parking is already scarce, and losing 200 spaces will push workers into surrounding neighborhoods."
3. **Place it after your reasons, before your conclusion.** Its own paragraph, clearly signposted: "The strongest objection to this plan is…" Readers expect it there, and the placement says: I have made my case, I know the best counter, and I am not hiding from it.

What you do *with* the objection — concede, pivot, refute — is lesson w.6. This lesson is about the incorporation itself: the fair, full-strength presentation. Get this right and the response writes itself; get it wrong with a strawman and no response can save the paragraph.`,
      },
      {
        kind: 'example',
        title: 'Incorporating the commuters\u2019 objection (Millbrook)',
        body: `"The strongest objection comes from commuters: downtown parking is already scarce, and converting the lot removes 200 spaces. Workers who cannot park downtown will not stop driving — they will circle surrounding neighborhoods, exporting the congestion rather than solving anything. This is a serious concern, because a market that chokes its own streets fails on its own terms."`,
        note: `Notice what this paragraph does not do: it does not mock, hedge, or answer yet. It gives the objection its full strength and stops. The fairness itself is persuasive — the reader now trusts this writer.`,
      },
      {
        kind: 'worked',
        title: 'Incorporate the teachers\u2019 objection in four steps',
        steps: [
          {
            label: 'Step 1 — Retrieve your sparring partner',
            body: `From your w.2 map: the teachers' perspective — moving start times cascades through bus schedules, after-school activities, and sports. This is the strongest reason against your thesis. Confirm it is the best objection available, not merely the first one you thought of.`,
          },
          {
            label: 'Step 2 — Steelman it in your own words',
            body: `Write the objection at full strength: "Teachers warn that the entire school day is engineered around the 7:30 start — bus routes, activity periods, athletics. Moving it does not just shift the morning; it rebuilds the afternoon, at real cost and disruption." No weakening adjectives, no selective quoting.`,
          },
          {
            label: 'Step 3 — Connect it to your thesis honestly',
            body: `Add one bridging sentence that shows why this objection matters to your position: "This concern is real, and any honest case for later starts must answer it." The bridge signals confidence: you are not sneaking past the objection, you are walking up to it. (The answer itself comes in w.6.)`,
          },
          {
            label: 'Step 4 — Place it correctly',
            body: `This paragraph goes after your reason paragraphs and before your conclusion — signposted clearly: "The strongest objection to later starts is…" Read your essay's flow: thesis, reasons, objection, conclusion. The skeleton is taking shape; w.7 will lock it in.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Mentioning the other side weakens your argument. Keep the essay one-sided and confident.',
        right:
          'Ignoring the other side weakens it — the objection is in the reader\u2019s mind regardless, and an unanswered objection votes against you silently. Raising it yourself shows confidence and control: it tells the reader you surveyed the whole debate and still chose your position. One-sided essays read as unaware; engaged essays read as judicious.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which paragraph best incorporates a competing perspective?',
        choices: [
          '“Some people complain about parking, but they are exaggerating the problem.”',
          '“Commuters raise the strongest objection: downtown parking is already scarce, and removing 200 spaces will push circling traffic into surrounding neighborhoods — a serious concern any market plan must answer.”',
          '“The commuters\u2019 view is wrong because markets matter more than parking.”',
          '“While there are many opinions on this complex issue, all deserve respect.”',
        ],
        correctIndex: 1,
        explanation:
          'The second option steelmans: it names the perspective, states its best reason at full strength, and acknowledges the objection\u2019s seriousness without answering it yet. The first dismisses with a wave ("exaggerating"); the third answers with a slogan rather than presenting the objection fairly; the fourth is content-free even-handedness that incorporates nothing. Fair presentation must come before response — otherwise you are refuting a caricature, and readers can tell.',
      },
      {
        kind: 'example',
        title: 'Partial agreement: the bridge to w.6',
        body: `Sometimes the honest move is conceding part of the objection inside the incorporation: "The teachers are right that the transition term would be disruptive — no honest advocate should pretend otherwise." Partial agreement is not surrender; it is the setup for the counterargument handling in w.6, where you will show why the concession does not defeat your thesis. A conceded point, handled well, becomes evidence of your judgment.`,
        note: `Concession without a follow-up is just surrender with better manners. Never concede in w.5 what you have no plan to handle in w.6.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What does it mean to steelman, and where does the competing perspective go in the essay?',
        answer:
          'Steelmanning means presenting the opposing view in its strongest form — its best reason, stated fairly in your own words — rather than a caricature. It goes in its own paragraph after your reason paragraphs and before the conclusion, clearly signposted.',
      },
      {
        kind: 'summary',
        points: [
          'Bring the strongest opposing perspective inside your essay — the reader is already thinking of it.',
          'Steelman: state its best reason at full strength, fairly, in your own words. No strawmen.',
          'Engage the strongest objection, not the weakest — that is what proves confidence.',
          'Place it after your reasons, before your conclusion, clearly signposted.',
          'Present first, respond later: fair incorporation is the setup; the response is w.6.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why state the opposing view in its strongest form?',
        answer:
          'Because responding to a weakened caricature proves nothing and readers detect it — it reads as evasion. Answering the strongest version proves your position survived the best attack available, which is what makes the essay persuasive rather than merely one-sided.',
      },
      {
        kind: 'next',
        text: 'Next: counterargument handling — what to do with the objection now that you have raised it: concede and pivot.',
      },
    ],
  },
  {
    id: 'w.6',
    stage: 10,
    title: 'Counterargument Handling',
    estimatedMinutes: 9,
    skills: ['w-counterargument'],
    prerequisites: ['w-counterargument'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `In w.5 you raised the strongest objection at full strength and stopped. That created an obligation: **now answer it.** An unanswered objection, fairly stated, hangs over the rest of the essay like an unpaid bill. This lesson is the payment: counterargument handling.

The method is **concede-and-pivot**. First, concede the grain of truth in the objection — grant what is genuinely true. Then pivot: show why that truth does not defeat your thesis — because the concern is manageable, outweighed, or solvable. Concession builds credibility; the pivot preserves your position. Together they show the single quality this essay measures above all: judgment.`,
      },
      {
        kind: 'keyterm',
        term: 'Concede-and-pivot',
        definition:
          'The two-move response to an objection. Concede: grant the genuinely true part of the opposing view, which builds credibility. Pivot: show why that truth does not defeat your thesis — the concern is manageable, outweighed by larger gains, or solvable within your proposal.',
      },
      {
        kind: 'prose',
        md: `The pivot has three standard forms — learn them and you will never be stuck:

- **Manageable:** the problem is real but bounded. "Some disruption is inevitable — but it is a one-time transition cost, not a permanent condition."
- **Outweighed:** the problem is real and lasting, but the gains are larger. "The parking loss is genuine; tripled foot traffic for the town's economy outweighs it."
- **Solvable:** the problem is real, and your proposal already answers it. "The shuttle from the north lot and the reserved commuter row absorb the displaced parking."

Choose the pivot that is actually true — readers smell bluffing. One objection handled with an honest concede-and-pivot beats three objections "demolished" with rhetoric. And note the discipline: you only ever handle the objection you steelmanned in w.5. Handling a weaker substitute is strawmanning with extra steps.`,
      },
      {
        kind: 'example',
        title: 'Concede-and-pivot on the commuters\u2019 objection',
        body: `"Commuters are right that parking is already tight, and the first months of construction will be genuinely inconvenient (concede). But the plan reserves the north row for commuter permits and runs a shuttle from the overflow lot on market days — the displaced parking is absorbed, not eliminated (pivot: solvable). What remains is a town with triple the foot traffic and the same number of commuters able to reach it."`,
        note: `The concession is specific (tight parking, messy construction months), not groveling. The pivot answers the exact objection raised — displaced parking — rather than changing the subject. That specificity is what makes it credible.`,
      },
      {
        kind: 'worked',
        title: 'Handle the teachers\u2019 objection in four steps',
        steps: [
          {
            label: 'Step 1 — Restate the steelmanned objection',
            body: `From w.5: moving start times cascades through bus routes, activities, and athletics — real cost, real disruption. Begin your handling paragraph by touching the objection once more, briefly: "The disruption concern is legitimate." This orients the reader; then move.`,
          },
          {
            label: 'Step 2 — Concede the true part, specifically',
            body: `Grant exactly what is true, no more: "The transition semester would be genuinely disruptive — routes and schedules rebuilt from scratch." Specificity matters: a vague "there may be some issues" concedes nothing and earns no credibility. Concede the real cost out loud.`,
          },
          {
            label: 'Step 3 — Pivot: choose your true form',
            body: `Which pivot is honest here? Manageable fits: the disruption is a one-time transition cost, while the sleep and learning gains compound every semester thereafter. Write it: "But transition costs are paid once; the health and learning gains accrue every term. A semester of rescheduling is a fair price for years of better-rested students."`,
          },
          {
            label: 'Step 4 — Link back to the thesis',
            body: `Close the paragraph by reconnecting to your position: "The disruption is the cost of the policy, not a reason against it." The reader should feel the objection has been fully heard and fully answered — the paragraph ends with your thesis standing, not merely surviving.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The counterargument paragraph should demolish the other side completely.',
        right:
          'Demolition attempts usually strawman: they "refute" a weakened version of the objection and leave the real one standing. Concede-and-pivot is stronger because it is honest — it grants the true part, which proves you are a trustworthy narrator, and then shows why the truth does not defeat your thesis. Judgment persuades; demolition postures.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which response best handles the teachers\u2019 disruption objection?',
        choices: [
          '“Teachers are overstating the problem; schedules can be adjusted easily enough.”',
          '“The transition semester would genuinely disrupt bus routes and activities — a real, one-time cost. But it is paid once, while the sleep and learning gains compound every semester after. Disruption is the cost of the policy, not a reason against it.”',
          '“Other districts managed the change, so teachers should stop worrying.”',
          '“The disruption concern is noted, but student health matters more, so we should proceed.”',
        ],
        correctIndex: 1,
        explanation:
          'The second option executes concede-and-pivot properly: it concedes the true part specifically (genuine disruption to routes and activities), then pivots on the "manageable" form — a one-time transition cost versus compounding gains — and links back to the thesis. The first dismisses without engaging; the third hand-waves with precedent and tells the opposition to stop worrying; the fourth gestures at the objection ("noted") without ever granting or answering its substance. Only the correct option treats the objection as real and still prevails.',
      },
      {
        kind: 'example',
        title: 'When the objection is genuinely strong',
        body: `Sometimes concede-and-pivot reveals that the objection cannot be fully answered — the parking loss, say, has no complete solution. The honest move is not to pretend otherwise; it is to qualify the thesis (w.3): "convert the lot, while reserving the north row for commuters." A qualified thesis that survives its strongest objection beats an absolute thesis that does not. Knowing when to qualify, rather than bluff, is the highest form of the judgment this essay measures.`,
        note: `Qualification is a strength move, not a retreat — but only when the objection earns it. Do not qualify preemptively out of nervousness.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Name the two moves of counterargument handling and the three forms of the pivot.',
        answer:
          'Concede: grant the genuinely true part of the objection, specifically. Pivot: show why it does not defeat your thesis. The pivot\u2019s three forms: manageable (bounded or one-time cost), outweighed (real but smaller than the gains), solvable (answered within your proposal).',
      },
      {
        kind: 'summary',
        points: [
          'Raising an objection obligates you to answer it — handle the exact objection you steelmanned, not a weaker substitute.',
          'Concede-and-pivot: grant the true part specifically (credibility), then show why it does not defeat your thesis.',
          'The pivot\u2019s three honest forms: manageable, outweighed, solvable — choose the one that is actually true.',
          'Demolition postures; judgment persuades. Never strawman in the response.',
          'If the objection cannot be fully answered, qualify the thesis honestly rather than bluffing.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why concede anything to the other side?',
        answer:
          'Because a specific, honest concession proves you are a trustworthy narrator — it shows you surveyed the debate clear-eyed rather than cheerleading. That credibility is what makes the pivot believed: a writer who grants the true part of an objection and still prevails has demonstrated judgment, which is exactly what the essay measures.',
      },
      {
        kind: 'next',
        text: 'Next: organization — the five-part skeleton that carries your thesis, reasons, and counterpoint to the reader in order.',
      },
    ],
  },
  {
    id: 'w.7',
    stage: 10,
    title: 'Organization: The Essay Skeleton',
    estimatedMinutes: 8,
    skills: ['w-organization'],
    prerequisites: ['w-counterargument'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `You now own every part of the argument: a thesis (w.3), strong reasons (w.4), a steelmanned objection (w.5), and its handling (w.6). Organization is the discipline of putting them in the order the reader needs — the same order, every time.

Under time pressure, structure is not a cage; it is a **skeleton**: it holds everything up so your attention stays on reasoning instead of on deciding what comes next mid-sentence. Readers decide quickly whether an essay is coherent. A fixed, familiar shape makes that decision easy for them — and easy decisions favor you.`,
      },
      {
        kind: 'keyterm',
        term: 'Essay skeleton',
        definition:
          'The fixed five-part shape your essay follows every time: introduction with thesis, body paragraphs (one reason each), a counterpoint paragraph (objection plus handling), and a conclusion. Same skeleton, every essay.',
      },
      {
        kind: 'prose',
        md: `The five parts:

1. **Introduction** — the issue in one or two sentences, then your thesis. No throat-clearing ("since the dawn of time…"), no dictionary definitions. Issue, thesis, done.
2. **Body paragraphs** — one reason per paragraph, each with explanation. Two to three paragraphs matching your selected reasons (w.4). Open each with the reason stated plainly, then defend it.
3. **Counterpoint paragraph** — the steelmanned objection (w.5) plus your concede-and-pivot (w.6), in that order. Signpost it: "The strongest objection to this plan is…"
4. **Conclusion** — restate the thesis in fresh words, then broaden by one step: why this decision matters beyond the immediate case. Restate, do not repeat — the reader just read your words; give her the idea again in new ones.

Transitions are signposts, not decoration: "The first reason…", "A second consideration…", "The strongest objection…", "In the end…". Under time pressure, explicit signposting is a kindness the reader repays with attention.`,
      },
      {
        kind: 'example',
        title: 'The skeleton, filled for Millbrook (abbreviated)',
        body: `¶1 (intro): "Millbrook must decide the fate of its downtown parking lot. It should convert the lot into a public market, because tripled foot traffic serves the town's economic priority better than preserving scarce parking." ¶2 (reason 1): foot-traffic projection and the town's priority. ¶3 (reason 2): gains captured locally by vendors. ¶4 (counterpoint): the commuters' parking objection, steelmanned — then concede-and-pivot via the reserved row and shuttle. ¶5 (conclusion): restated thesis — "a market town, not a parking town" — broadened: the decision signals what Millbrook wants its downtown to be.`,
        note: `Five paragraphs, each with exactly one job. If you can label every paragraph of your draft with its job, the skeleton is holding.`,
      },
      {
        kind: 'worked',
        title: 'Skeleton-check your plan in four steps',
        steps: [
          {
            label: 'Step 1 — Label each planned paragraph',
            body: `Take your outline (or draft) and write one label per paragraph in the margin: intro, reason 1, reason 2, counterpoint, conclusion. If any paragraph needs two labels, it is doing two jobs — split it. If any label is missing, the skeleton has a hole.`,
          },
          {
            label: 'Step 2 — Verify the thesis placement',
            body: `The thesis must appear at the end of the introduction, stated plainly. Check: can a skimming reader find your position in paragraph one? If the position only emerges in paragraph three, move it up — readers should never wonder what you think.`,
          },
          {
            label: 'Step 3 — Verify one reason per body paragraph',
            body: `Each body paragraph gets exactly one reason, stated in its first sentence, then defended. Two reasons sharing a paragraph blur into each other; one reason split across two paragraphs dilutes. Count reasons, count paragraphs — the numbers should match.`,
          },
          {
            label: 'Step 4 — Verify the counterpoint comes before the conclusion',
            body: `The objection and its handling must land before the conclusion, never inside it and never after. A conclusion that introduces new objections feels unfinished; a counterpoint placed after the conclusion feels like an afterthought. Order is meaning: objection answered, then final word.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Good writers do not need a fixed structure. It makes essays formulaic.',
        right:
          'Under a time limit, structure is what keeps good ideas legible. The skeleton does not dictate what you think — it dictates where the reader finds it, which frees your attention for reasoning instead of for planning mid-sentence. Formulaic is repeating empty phrases; structured is delivering a complete argument where the reader expects each part. Readers reward the second and punish the first.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which paragraph order follows the essay skeleton?',
        choices: [
          'Introduction, counterpoint, reasons, conclusion — address objections while they are fresh.',
          'Introduction with thesis, one reason per body paragraph, counterpoint paragraph (objection + handling), conclusion.',
          'Thesis, conclusion, reasons, counterpoint — state the position, close it, then fill in support.',
          'Reasons first, thesis at the end as a "surprise," counterpoint woven throughout.',
        ],
        correctIndex: 1,
        explanation:
          'The skeleton runs: introduction ending in the thesis, body paragraphs with one reason each, then the counterpoint paragraph (steelmanned objection followed by concede-and-pivot), then the conclusion. Leading with the counterpoint spends your credibility before you have built a case; putting the conclusion second strands the reasons after the essay has already closed; and hiding the thesis until the end forces the reader to guess what every paragraph is for. Order is meaning — each part prepares the next.',
      },
      {
        kind: 'example',
        title: 'The conclusion: restate, then broaden',
        body: `Weak conclusion: "In conclusion, Millbrook should convert the lot because of foot traffic and local vendors, and the commuters' concerns are handled." (Repeats the essay in duller words.)

Stronger: "Millbrook should trade its parking lot for a market — and in doing so, decide what kind of downtown it wants to be: one organized around cars passing through, or people stopping." Restates the thesis in fresh words, then broadens one step to the decision's meaning. One sentence of significance is enough; two is indulgence.`,
        note: `Never introduce new reasons or new objections in the conclusion. Its job is finality: the reader should feel the argument land, not reopen.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Recite the five-part essay skeleton and the job of each part.',
        answer:
          '1) Introduction: the issue in a sentence or two, ending in the thesis. 2–3) Body paragraphs: one reason each, stated then defended. 4) Counterpoint: steelmanned objection plus concede-and-pivot, signposted. 5) Conclusion: thesis restated in fresh words, broadened one step — no new material.',
      },
      {
        kind: 'summary',
        points: [
          'Use the same five-part skeleton every time: intro with thesis, body paragraphs, counterpoint, conclusion.',
          'One paragraph, one job — label each paragraph; split any paragraph doing two jobs.',
          'The thesis belongs at the end of the introduction, findable by a skimming reader.',
          'The counterpoint comes before the conclusion, never inside or after it.',
          'Signpost explicitly ("The strongest objection…") — under time pressure, clarity is kindness.',
          'Conclusions restate in fresh words and broaden one step; they introduce nothing new.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why use the same skeleton every time instead of varying your structure?',
        answer:
          'Because under a time limit, a fixed structure moves decisions out of the writing moment: you never spend mid-sentence attention on what comes next. It also trains the reader — who meets the same shape repeatedly — to find each part instantly. Variation adds risk; the skeleton adds reliability.',
      },
      {
        kind: 'next',
        text: 'Next: timed outline practice — the five-minute drill that turns the whole toolkit into decisions made at speed.',
      },
    ],
  },
  {
    id: 'w.8',
    stage: 10,
    title: 'Timed Outline Practice',
    estimatedMinutes: 8,
    skills: ['w-outline'],
    prerequisites: ['w-organization'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `You know the toolkit: thesis, reasons, objection, handling, skeleton. The gap between knowing it and executing it under a time limit is **decision speed** — and decision speed is trained, not hoped for. The training drill is the **timed outline**: five minutes, a prompt, and every structural decision made before a single essay sentence is written.

Five minutes of outlining saves fifteen minutes of mid-essay restructuring. Unplanned essays stall — the writer reaches paragraph three with no counterpoint planned and either skips it or tacks it on. Planned essays flow, because every hard decision was made while the clock was cheap.`,
      },
      {
        kind: 'keyterm',
        term: 'Timed outline',
        definition:
          'A five-minute planning drill: from a prompt, produce the thesis, two to three reasons, the competing perspective, the counterargument move, and the skeleton labels — in fragments, not sentences. Decisions, not drafts.',
      },
      {
        kind: 'prose',
        md: `The drill: set a timer for five minutes, read a prompt, produce the outline, stop when the timer rings. A complete outline contains:

- **Thesis** — one line, position + because + strongest reason.
- **Reasons** — two or three, as fragments ("foot traffic x3 — town priority").
- **Competing perspective** — the sparring partner and its best reason, in a few words.
- **Counterargument move** — concede what, pivot how ("concede: tight parking / pivot: solvable — north row + shuttle").
- **Skeleton labels** — ¶1 intro/thesis, ¶2–3 reasons, ¶4 counterpoint, ¶5 conclusion.

Fragments, not sentences. The moment you start writing full sentences, you are drafting, not outlining — and drafting in the outline burns the minutes the outline was supposed to save. Your outlines and essays are stored locally in the app, so you can review your decision-making across drills and watch it get faster.`,
      },
      {
        kind: 'example',
        title: 'A complete five-minute outline (Millbrook)',
        body: `Thesis: convert lot → market; because foot traffic x3 = town econ priority.
R1: foot traffic x3 (vendor survey) — town priority.
R2: stalls to locals first — gains stay in Millbrook.
Objection: commuters — 200 spaces lost, spillover circling.
Handle: concede tight parking + messy construction / pivot solvable — north row reserved + shuttle.
Skeleton: ¶1 issue+thesis / ¶2 R1 / ¶3 R2 / ¶4 objection+handle / ¶5 restate + broaden (what downtown is for).`,
        note: `Seven lines, zero complete sentences, every decision made. This is what five good minutes looks like — and it is all the plan a timed essay needs.`,
      },
      {
        kind: 'worked',
        title: 'Outline a new prompt in four steps',
        steps: [
          {
            label: 'Step 1 — Thesis in one line (minute 1)',
            body: `New prompt: a library must choose between extending evening hours and expanding its collection. Pick a side fast — say, extend hours — and attach the strongest reason: "evening hours serve working patrons the collection expansion would not reach." One line. Do not deliberate; your map from w.2 makes this quick.`,
          },
          {
            label: 'Step 2 — Reasons as fragments (minutes 2–3)',
            body: `R1: "shift workers + students — currently unserved." R2: "usage data: peer libraries saw 40% evening circulation gains." Cut the weak ones now ("libraries should be welcoming" — vague, cut). Fragments only — resist the sentence.`,
          },
          {
            label: 'Step 3 — Objection plus handling note (minute 4)',
            body: `Sparring partner: the collection advocates — "a thin collection makes longer hours pointless." Handle note: "concede: breadth matters / pivot: outweighed — digital lending covers breadth; hours cover access." Four fragments capture the whole counterpoint paragraph.`,
          },
          {
            label: 'Step 4 — Skeleton labels (minute 5)',
            body: `¶1 issue+thesis / ¶2 R1 / ¶3 R2 / ¶4 objection+handle / ¶5 restate + broaden. Timer rings. You now hold every decision the essay requires — the writing itself is just expansion. Review: is anything missing? If yes, that gap is your drill target next time.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Outlining wastes writing time. Better to start writing immediately and organize as you go.',
        right:
          'Organizing as you go means making structural decisions with the most expensive minutes — while drafting sentences. The outline makes those decisions when minutes are cheap. Writers who skip outlining do not save five minutes; they spend fifteen restructuring mid-essay, stalling in paragraph three, or discovering in the conclusion that they never answered the objection.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which outline is better for a five-minute drill?',
        choices: [
          'A: full sentences for the introduction and first reason, with the rest to be figured out while writing.',
          'B: fragments covering thesis, two reasons, the objection, the handling move, and skeleton labels — every structural decision made.',
          'C: a long brainstorm list of twelve possible reasons, to have plenty of material.',
          'D: a polished thesis paragraph, since the opening matters most.',
        ],
        correctIndex: 1,
        explanation:
          'The outline\u2019s job is decisions, not drafts: thesis, reasons, objection, handling, and skeleton labels — all of them, in fragments. Full sentences (A, D) burn outlining minutes on drafting; a twelve-item brainstorm (C) generates without selecting, leaving every hard choice for the expensive writing minutes. Five minutes spent deciding everything beats five minutes spent polishing one paragraph, because the essay\u2019s quality comes from complete structure, not from a beautiful opening.',
      },
      {
        kind: 'example',
        title: 'Diagnosing a weak outline',
        body: `Outline: "Thesis: extend library hours. R1: serves workers. R2: peer data. ¶1-¶3 planned." Diagnosis: no objection, no handling move, no conclusion label. This writer will reach paragraph four with nowhere to go — and the missing counterpoint is the difference between a competent essay and a one-sided one. The fix is a checklist habit: thesis, reasons, objection, handling, skeleton — all five, every drill, until the check is automatic.`,
        note: `Most weak outlines are not wrong; they are incomplete. Completeness is a checklist, not a talent.`,
      },
      {
        kind: 'retrieval',
        prompt: 'What are the five elements of a timed outline?',
        answer:
          'Thesis (one line), two to three reasons (fragments), the competing perspective and its best reason, the counterargument move (concede what, pivot how), and the skeleton labels for each paragraph.',
      },
      {
        kind: 'summary',
        points: [
          'The timed outline is a five-minute drill: every structural decision made before drafting begins.',
          'Fragments, not sentences — the outline holds decisions, not prose.',
          'Five elements, every time: thesis, reasons, objection, handling move, skeleton labels.',
          'Five minutes of outlining saves fifteen minutes of mid-essay restructuring.',
          'Diagnose outlines by completeness: the missing element is your next drill target.',
          'Outlines are stored locally in the app — review them to watch your decision speed improve.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why fragments instead of full sentences in an outline?',
        answer:
          'Because full sentences are drafting, and drafting during outlining burns the cheap planning minutes on expensive prose — while leaving structural decisions (the objection, the handling, the conclusion) unmade. Fragments capture every decision fast; the sentences come later, during the writing itself.',
      },
      {
        kind: 'next',
        text: 'Next and last: timed response practice — writing the full essay from your outline, then grading it yourself with a fixed rubric.',
      },
    ],
  },
  {
    id: 'w.9',
    stage: 10,
    title: 'Timed Response Practice and Self-Assessment',
    estimatedMinutes: 12,
    skills: ['w-timed'],
    prerequisites: ['w-outline'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `This is where the whole curriculum comes together: a full timed essay, written from a five-minute outline, followed by the closest thing to a grader this course offers — **your own judgment, structured by a fixed rubric.**

A reminder on how this works here: your essays are **stored locally** in the app — on your device, nowhere else. There is **no auto-grading**: no algorithm scores your writing, and none should. Grading your own essay against a fixed checklist is not a consolation prize for lacking a grader; it is the skill itself. Writers who can diagnose their own essays improve between every attempt. Writers waiting for someone else's verdict improve between verdicts.`,
      },
      {
        kind: 'keyterm',
        term: 'Self-assessment rubric',
        definition:
          'A fixed five-criterion checklist applied to your own essay after writing: thesis clarity, reason strength, counterargument handling, organization, and clarity of language. You score each criterion honestly, then choose one to improve next time.',
      },
      {
        kind: 'prose',
        md: `The practice session runs in three phases. **Write**: five-minute outline (w.8), then the full essay within the fixed time limit — no pausing, no editing as you go. **Cool down**: step away for at least ten minutes. You cannot assess prose you just wrote; you need enough distance to read it like a stranger. **Assess**: apply the rubric, criterion by criterion:

- **Thesis clarity** — is the position unmistakable in paragraph one? Does it pass the disagreement test?
- **Reason strength** — two to three reasons, each relevant and specific? Any weak ones that should have been cut?
- **Counterargument handling** — is the strongest objection steelmanned, then answered with concede-and-pivot?
- **Organization** — does every paragraph have one labeled job, in skeleton order?
- **Clarity** — are the sentences clean? Any paragraph you had to re-read to understand?

Score each honestly — strong, adequate, or weak — with one quoted line as evidence. Then pick **one** criterion to improve next time. One. Improvement compounds; overhauls do not.`,
      },
      {
        kind: 'example',
        title: 'The rubric applied honestly (excerpt)',
        body: `Thesis clarity — adequate: "The district should move start times to 8:45, because the research supports it." Position clear, but "the research supports it" is vague — the disagreement test passes weakly. Next time: name the reason ("because later starts measurably improve health and learning").

Counterargument handling — weak: I mentioned the teachers' concern but answered a softer version of it. Evidence: "schedules can be adjusted." That is dismissal, not concede-and-pivot. Next time: steelman the cascade, concede the transition cost, pivot on manageable.`,
        note: `Notice the format: rating, evidence quoted from the essay, one concrete fix. Vague self-praise ("good flow") and vague self-blame ("needs work") are both banned — specificity is the assessment.`,
      },
      {
        kind: 'worked',
        title: 'Run a full practice session in five steps',
        steps: [
          {
            label: 'Step 1 — Outline (5 minutes)',
            body: `Choose a prompt — reuse the Millbrook, start-time, or library prompts, or invent your own in the same shape (a decision plus perspectives). Set five minutes and produce the complete outline: thesis, reasons, objection, handling, skeleton labels. Stop at the timer.`,
          },
          {
            label: 'Step 2 — Write (the fixed time limit)',
            body: `Expand the outline into the full essay. No pausing, no mid-draft restructuring — the decisions are made; this phase is execution. If time runs short, finish the skeleton (a brief conclusion beats a missing one) rather than perfecting paragraph two.`,
          },
          {
            label: 'Step 3 — Cool down (10+ minutes)',
            body: `Step away. Walk, stretch, do something unrelated. This gap is not optional: assessing hot prose produces either infatuation or despair, neither of which is diagnosis. Return as a stranger to your own essay.`,
          },
          {
            label: 'Step 4 — Assess with the rubric',
            body: `Go criterion by criterion — thesis, reasons, counterargument, organization, clarity. Rate each (strong / adequate / weak), quote one line of evidence per rating, and write the single concrete fix for the weakest criterion. Save the essay and the assessment locally in the app.`,
          },
          {
            label: 'Step 5 — Log the one improvement target',
            body: `Keep a running list: date, prompt, weakest criterion, the fix. Before the next session, read the last entry first. Across five or six sessions, the log shows your trajectory — which criteria stopped being weak, which one is stubborn. That trajectory is your progress report.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Self-assessment is pointless without a real grader. You cannot see your own flaws.',
        right:
          'A fixed rubric makes self-assessment reliable because you are checking specific features, not guessing a holistic score: is the thesis in paragraph one, is the objection steelmanned, does each paragraph have one job. Those are checkable facts, not matters of taste. And the cool-down gap gives you the stranger\u2019s eyes you need. Graders give verdicts; rubrics give diagnoses — and diagnoses are what improve the next essay.',
      },
      {
        kind: 'checkpoint',
        prompt: 'You have just finished a timed practice essay. What is the most useful next step?',
        choices: [
          'Immediately re-read it and fix every weak sentence while it is fresh.',
          'Step away for at least ten minutes, then assess it against the five-criterion rubric with quoted evidence.',
          'Start another essay right away to build stamina while you are warmed up.',
          'Ask someone else to tell you whether it is good or not.',
        ],
        correctIndex: 1,
        explanation:
          'Immediate re-reading produces infatuation or despair, not diagnosis — the cool-down gap is what lets you read the essay as a stranger. The rubric then turns that fresh reading into checkable facts (thesis placement, steelmanning, paragraph jobs) with quoted evidence, ending in one concrete fix. Another essay right away compounds fatigue without learning; outsourcing the judgment to someone else skips the very skill — self-diagnosis — that drives improvement between sessions.',
      },
      {
        kind: 'example',
        title: 'Reading your essay like a stranger',
        body: `After the cool-down, read the essay top to bottom with one question per pass. Pass one: "What does this writer believe?" (thesis clarity). Pass two: "Am I convinced?" (reason strength). Pass three: "What would I object, and did she answer it?" (counterargument). Pass four: "Could I outline this from memory?" (organization). Four passes, four questions — the rubric operationalized. Anything you cannot answer is the diagnosis.`,
        note: `If a pass fails, resist fixing immediately. Finish all four passes first — the weakest criterion gets the single fix, and the rest wait their turn.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Name the five rubric criteria and what each one checks.',
        answer:
          'Thesis clarity (unmistakable position in paragraph one, passes the disagreement test); reason strength (two to three relevant, specific reasons); counterargument handling (strongest objection steelmanned, answered with concede-and-pivot); organization (every paragraph one labeled job, in skeleton order); clarity (clean sentences, no paragraph needing re-reads).',
      },
      {
        kind: 'summary',
        points: [
          'Full sessions run in three phases: timed write from an outline, a 10+ minute cool-down, then rubric assessment.',
          'The rubric\u2019s five criteria: thesis clarity, reason strength, counterargument handling, organization, clarity.',
          'Assess with ratings plus quoted evidence — vague praise and vague blame are both banned.',
          'Each session ends with one improvement target, logged; the log across sessions is your progress report.',
          'Essays are stored locally in the app; there is no auto-grading — your structured judgment is the grader.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why does the app store essays locally with no auto-grading?',
        answer:
          'For privacy, essays never leave your device — and pedagogically, because self-assessment is the skill: a fixed rubric plus the cool-down gap makes your own diagnosis reliable, and writers who diagnose their own work improve between every session rather than waiting for an external verdict.',
      },
      {
        kind: 'next',
        text: 'You now hold the complete writing toolkit: understand the task, map perspectives, thesis, reasons, objection, handling, skeleton, outline, timed execution, self-assessment. The curriculum is complete — the rest is practice.',
      },
    ],
  },
];

