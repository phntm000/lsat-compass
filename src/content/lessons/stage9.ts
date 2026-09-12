/**
 * Stage 9 — Readiness and test week (lessons 9.1–9.2).
 * All scenarios, examples, and explanations are original.
 * Contract: content-schema.md §§0, 1, 4, 7, 9.
 *
 * Note: lesson 9.2 contains no medical advice. It addresses routine and
 * logistics only, and says so explicitly.
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

export const LESSONS_9: Lesson[] = [
  {
    id: '9.1',
    stage: 9,
    title: 'Readiness Gates',
    estimatedMinutes: 10,
    skills: [],
    prerequisites: ['f-structure', 'lr-main-conclusion', 'rc-main-point'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `"Am I ready?" is the most expensive question in test prep, because most people answer it with a feeling or a calendar date. Feelings lie — anxiety feels like unreadiness and overconfidence feels like readiness. Dates are worse: the test happening on Saturday says nothing about whether you should be taking it.

Readiness is **evidence**. This lesson gives you five gates — concrete, checkable standards. You pass a gate with data, or you loop back and keep training. Dates do not open gates; performance does.`,
      },
      {
        kind: 'keyterm',
        term: 'Readiness gate',
        definition:
          'A concrete, checkable standard for test readiness. Each gate is passed with evidence from your timed work — or not passed, in which case you loop back to the relevant training rather than pushing forward.',
      },
      {
        kind: 'prose',
        md: `The five gates, in order:

1. **Fundamentals mastery.** You can state each question type's task cold — what a necessary assumption is, what a flaw question asks, what a comparative set tests — without hesitation. If any type still feels mysterious, the foundation is not done.
2. **Timed stability.** Your last three or four timed sections cluster in a narrow band. A tight cluster at a slightly lower score beats a wide swing around a higher average — stability is what transfers to test day.
3. **Low high-confidence errors.** Confident misses are rare (lesson 6.2). A handful across your recent sections is human; a steady rate means your process still misleads you.
4. **Pacing.** You finish sections with time to review flagged questions — or at worst, you execute your flag-and-move and final-sixty-seconds drills cleanly. Chronic rushing and chronic blanks are gate failures.
5. **Official-test consistency.** Your official practice scores (lesson 8.1) sit in the same band as your practice scores. A persistent gap means calibration is incomplete.

If a gate fails, the prescription is specific: loop back to the stage that owns it — pacing failures return to Stage 6, shaky fundamentals to Stages 1–2, calibration gaps to Stage 8 — with a concrete target and a re-check date. Looping back is not falling behind; it is the mechanism that makes the gates meaningful.`,
      },
      {
        kind: 'example',
        title: 'Two test-takers at the gates',
        body: `Sam passes four gates cleanly but her log still shows a steady rate of high-confidence errors on flaw questions — gate three fails. She postpones her test date by three weeks, drills flaw questions with written pre-phrases, and re-checks. The gate opens.

Riley's scores swing between 158 and 167, averaging 163 — his target. He wants to test because "the date is set and I've been studying for months." The date is not a gate. His stability gate fails, and his average is a mirage built on variance. He is not ready, and the kindest thing his preparation can do is say so.`,
        note: `Sam's delay felt like a setback and was actually the decision that protected her score. Riley's story is the most common readiness failure there is.`,
      },
      {
        kind: 'worked',
        title: 'Run a gate check in five steps',
        steps: [
          {
            label: 'Step 1 — Pull your recent timed work',
            body: `Gather your last three or four timed sections — simulations, not untimed practice. Gate checks run on pressure data only, because readiness is a claim about performance under pressure.`,
          },
          {
            label: 'Step 2 — Check the band, not the average',
            body: `Look at the spread of your scores. A range of two to three points is a stable band; a range of six or more is instability wearing an average as a disguise. Write the band down: "160–163" tells the truth that "161.5 average" hides.`,
          },
          {
            label: 'Step 3 — Count high-confidence misses',
            body: `From your logs (lesson 6.2), count confident errors across the recent sections. Occasional ones are human. A repeating pattern — same type, same trap shape — fails gate three regardless of what the scores say.`,
          },
          {
            label: 'Step 4 — Audit pacing and calibration',
            body: `Do you finish with review time, or with blanks and panic? That is gate four. Then compare official vs. practice scores: same band is gate five; a persistent official-score deficit means more calibration work (lesson 8.1).`,
          },
          {
            label: 'Step 5 — Decide: proceed or loop back',
            body: `All five gates pass: schedule the test with confidence. Any gate fails: name the specific loop-back ("three weeks on pacing, re-check with two timed sections") and put the re-check on the calendar. A failed gate with a plan is progress; a failed gate ignored is a gamble.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'If my average score is at my target, I am ready.',
        right:
          'Averages hide instability. Scores of 165, 158, and 167 average 163 — but they describe a test-taker whose performance swings seven points with the luck of the section draw. Scores of 162, 163, and 161 also sit near 163 — and they describe someone ready. Test day gives you one draw from your distribution; readiness means the whole distribution sits where you need it, not just its middle.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which test-taker is ready to schedule the test?',
        choices: [
          'Maya: scores of 166, 159, 165 on her last three timed sections — average 163, her target.',
          'Devon: scores of 161, 162, 160, rare confident errors, finishes with review time, official practice at 161 — target 162.',
          'Priya: strong fundamentals and a 164 average, but she has never taken a fully timed section.',
          'Jordan: stable at 158, target 165, test date in ten days — "I work well under pressure."',
        ],
        correctIndex: 1,
        explanation:
          'Devon is the only one whose evidence clears all five gates: a tight 160–162 band (stability), rare high-confidence errors, clean pacing with review time, and official scores matching practice (calibration) — all within a point of target. Maya\u2019s average is a mirage over a seven-point swing; Priya has no pressure data at all, so none of the gates can even be checked; Jordan\u2019s stability is real but it stabilizes seven points below target, and "working well under pressure" is a feeling, not a gate.',
      },
      {
        kind: 'example',
        title: 'What "loop back" looks like concretely',
        body: `Gate four fails: you are chronically finishing LR sections with three blanks. The loop-back is not "study more" — it is a prescription: two weeks of Stage 6 work (pacing plans, skip triggers, review logs on every timed section), then a re-check with two fresh timed sections. The re-check date goes on the calendar the day the gate fails. Vague remediation is how gates get quietly ignored; dated, specific remediation is how they get passed.`,
        note: `Every loop-back should name the stage, the work, the duration, and the re-check date. Four details, no vagueness.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Name the five readiness gates, in order.',
        answer:
          '1) Fundamentals mastery — every question type\u2019s task known cold. 2) Timed stability — recent timed sections cluster in a narrow band. 3) Low high-confidence errors — confident misses are rare. 4) Pacing — finishing with review time, no chronic rushing or blanks. 5) Official-test consistency — official practice scores match the practice band.',
      },
      {
        kind: 'summary',
        points: [
          'Readiness is evidence, not feeling and not a calendar date: five gates, each passed with data.',
          'The gates: fundamentals mastery, timed stability, low high-confidence errors, pacing, official-test consistency.',
          'Judge the band, not the average — a tight 160–162 beats a swinging 158–167.',
          'A failed gate prescribes a specific loop-back: the stage, the work, the duration, and a re-check date.',
          'Looping back is not falling behind — it is the mechanism that makes readiness real.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why is a stable 162 better evidence of readiness than an unstable 165 average?',
        answer:
          'Because test day gives you a single draw from your score distribution. A stable 162 means nearly every draw lands near 162; an unstable 165 average means the draw could land anywhere from the high 150s to the high 160s. Readiness is about where the whole distribution sits, not its middle.',
      },
      {
        kind: 'next',
        text: 'Next: test week mode — the low-novelty final week that protects everything you have built. No new techniques.',
      },
    ],
  },
  {
    id: '9.2',
    stage: 9,
    title: 'Test Week Mode',
    estimatedMinutes: 8,
    skills: [],
    prerequisites: ['f-structure'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `The final week before the test is not for getting smarter. Your score was built over months; nothing you learn in the last seven days will move it up, but plenty can move it down — a new technique that misfires, a cramming marathon that exhausts you, a disrupted routine that leaves you foggy. Test week has one goal: **arrive sharp.**

That means low novelty, protected routine, and realistic timing. You are not studying this week. You are maintaining — like an athlete tapering before a race. And one boundary, stated plainly: **this lesson gives no medical advice** — nothing about sleep aids, supplements, medication, or health decisions. If a health concern affects your test, talk to a qualified professional. What follows is routine and logistics only.`,
      },
      {
        kind: 'keyterm',
        term: 'Test week mode',
        definition:
          'A low-novelty final week: realistic timing, light review of your own lessons-learned bank, protected daily routine, logistics handled early. The goal is to arrive rested and familiar — not to learn anything new.',
      },
      {
        kind: 'prose',
        md: `**Do this week:**

- **One or two full simulations, early in the week** (lesson 7.2) — Monday or Tuesday. Realistic timing keeps your pacing honest; doing them early leaves recovery days after.
- **Light daily review, 30–45 minutes** — your lessons-learned bank (lesson 8.2) only. Read your own hard-won sentences; do not open new material.
- **Protect your routine.** Same sleep schedule, same meals, same exercise — whatever "normal" is for you. The week is not the time to optimize your life, only to avoid disrupting it.
- **Handle logistics early.** ID, route to the test center, what to bring, check-in time, backup alarm. Every logistical unknown you resolve this week is anxiety you will not carry into test day.

**Not this week:** new strategies, new question-type techniques, cramming weak areas (they needed weeks, not days), all-nighters, major routine changes, or adopting anything you "discovered" online. Novelty is the enemy of a sharp arrival.`,
      },
      {
        kind: 'example',
        title: 'Two test weeks',
        body: `Priya runs one full simulation on Monday, reviews her lessons-learned bank for 30 minutes each evening, keeps her normal running schedule, and lays out her ID and directions on Friday. She arrives Saturday feeling like herself.

Devon discovers a new diagramming method on Wednesday, stays up late Thursday "fixing" his weakest question type, and changes his morning routine for "optimal test-day performance." He arrives Saturday exhausted, running an untested technique, performing a morning routine he has rehearsed zero times.`,
        note: `Priya's week looks boring. Boring is the entire strategy.`,
      },
      {
        kind: 'worked',
        title: 'Build your test-week plan in four steps',
        steps: [
          {
            label: 'Step 1 — Schedule the simulations',
            body: `Put one full four-section simulation (lesson 7.2) on Monday or Tuesday — and optionally a single timed section mid-week. After Wednesday, no more full simulations: the remaining days are for recovery and familiarity, not for new data.`,
          },
          {
            label: 'Step 2 — Set the daily review cap',
            body: `Thirty to forty-five minutes a day, lessons-learned bank only. Set a timer for the review itself — the cap is the point. When it rings, you are done: the discipline of stopping rehearses the composure you want on test day.`,
          },
          {
            label: 'Step 3 — Write the logistics checklist',
            body: `ID, route, parking or transit, check-in time, what to bring, backup alarm, a snack for the break. Resolve every item by Friday. "I think I know where it is" is an unresolved item — drive the route if you can.`,
          },
          {
            label: 'Step 4 — Plan the day before',
            body: `No heavy prep the day before — a light bank review at most. Normal evening, normal bedtime, materials laid out. The day before is for arriving, not for studying; trust the months behind you.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'The final week is your last chance to fix weak areas.',
        right:
          'Weak areas needed weeks of structured work, not days of cramming — and last-week cramming on new techniques actively adds errors, because untested methods misfire under pressure. The final week protects what you built: realistic timing, light review, routine. Repair happened in the months before; this week is maintenance.',
      },
      {
        kind: 'checkpoint',
        prompt: 'It is three days before the test and you discover a new LR technique online that looks promising. What do you do?',
        choices: [
          'Adopt it immediately and drill it hard for the remaining three days.',
          'Note it for after the test, and change nothing about your approach this week.',
          'Use it on your next practice section as an experiment to see if it helps.',
          'Replace your weakest technique with it, since you have nothing to lose.',
        ],
        correctIndex: 1,
        explanation:
          'Three days is not enough time to test, integrate, and trust a new technique — and an untested method under real pressure is a liability, not an asset. "Experimenting" on a practice section this week still spends your limited pre-test composure on novelty, and replacing a known weakness with an unknown method trades a quantified problem for an unquantified one. The disciplined move is to write the technique down for after the test and keep this week boring: novelty is the enemy of a sharp arrival.',
      },
      {
        kind: 'example',
        title: 'Test-day morning, rehearsed',
        body: `Same wake time as all week. Same breakfast. Arrive early enough that a delay would not matter. During the test: the one-minute reset between sections (lesson 7.2), mile-marker clock checks (lesson 6.1), skip triggers ready (lesson 6.3). Nothing on test day should be new — not the food, not the route, not the procedures. You have rehearsed all of it; today you execute.`,
        note: `Nerves are normal and not a signal that something is wrong. They are the body doing its job before a performance. The procedures carry you regardless.`,
      },
      {
        kind: 'retrieval',
        prompt: 'List three things test week includes and three things it excludes.',
        answer:
          'Includes: one or two full simulations early in the week; 30–45 minutes daily review of the lessons-learned bank; protected routine and early logistics. Excludes: new techniques or strategies; cramming weak areas; all-nighters, major routine changes, or any novelty.',
      },
      {
        kind: 'summary',
        points: [
          'Test week is maintenance, not study: the goal is to arrive sharp, not to get smarter.',
          'One or two full simulations early in the week; light daily review (30–45 min, lessons-learned bank only) after.',
          'Protect your routine — same sleep, meals, exercise. Handle all logistics by Friday.',
          'No new techniques, no cramming, no routine overhauls. Novelty is the enemy of a sharp arrival.',
          'Test-day morning should contain nothing new: same breakfast, early arrival, rehearsed procedures.',
          'This lesson gives no medical advice — health concerns go to a qualified professional.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why no new techniques in the final week?',
        answer:
          'Because a technique needs weeks of practice to become trustworthy under pressure. A method adopted days before the test is untested: it misfires when nerves arrive, competes with your trained habits, and adds errors instead of removing them. The final week protects proven procedures; new ideas wait until after.',
      },
      {
        kind: 'next',
        text: 'With the multiple-choice sections handled, one piece remains: Argumentative Writing — unscored, administered separately, and read by the schools themselves.',
      },
    ],
  },
];

