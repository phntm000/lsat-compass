/**
 * Stage 6 — Logical Reasoning timing and pacing (lessons 6.1–6.3).
 * All scenarios, examples, and explanations are original.
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

export const LESSONS_6: Lesson[] = [
  {
    id: '6.1',
    stage: 6,
    title: 'LR Timing and Pacing Awareness',
    estimatedMinutes: 9,
    skills: ['lr-main-conclusion', 'lr-must-be-true'],
    prerequisites: ['f-premise-conclusion'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `A Logical Reasoning section gives you 35 minutes for about 25 to 26 questions. Do the division and you get roughly **80 seconds per question** — and that number has probably been haunting you already. Here is the liberating truth: the average is not a rule. Some questions take 30 seconds. Some take three minutes. Both are fine, as long as you know where you stand.

This lesson is about **pacing awareness**: knowing, at any point in the section, whether you are ahead of or behind schedule. It is built from a few clock checks, not a stopwatch per question. Runners do not check their pace every step; they check it at mile markers. You will do the same.`,
      },
      {
        kind: 'keyterm',
        term: 'Pacing awareness',
        definition:
          'Knowing, at any point in a section, whether you are ahead of or behind schedule — without timing individual questions. It is built from a few planned clock checks (for example, after question 10 and question 18), not from a per-question timer.',
      },
      {
        kind: 'prose',
        md: `LR sections have a rough shape, and knowing it turns the clock from an enemy into an instrument:

- **Questions 1–10: the opening third.** Generally the gentlest stretch. Straightforward main-conclusion and must-be-true questions live here. Move briskly but not carelessly — this is where you *bank* time, and where rushed errors are the most embarrassing.
- **Questions 11–18: the middle third.** Mixed difficulty. Some quick wins, some traps. This is where most test-takers silently fall behind, one 2.5-minute question at a time.
- **Questions 19–26: the final third.** The hardest cluster on average. Long stimuli, dense conditionals, tempting traps. This is what your banked time is *for*.

Two clock checks carry the whole system. After question 10, about **13 minutes** elapsed is healthy. After question 18, about **24 minutes**. If you are within a couple of minutes of those marks, you are fine — keep going. The checks exist so that drift gets noticed at question 10, not discovered in a panic at question 22.`,
      },
      {
        kind: 'example',
        title: 'Two test-takers, one clock',
        body: `Ana checks the clock twice: after Q10 (12 minutes — fine) and after Q18 (25 minutes — a touch behind, so she flags one sticky question and moves on). She finishes with two minutes to review flagged questions.

Ben times every question with a running stopwatch. At Q14 he notices one question took 2:40, panics, and rushes the next six — missing two he would normally get. His per-question timer manufactured the exact crisis it was supposed to prevent.`,
        note: `The difference is not discipline; it is instrument choice. Mile markers inform. A per-question stopwatch alarms — and alarms cost points.`,
      },
      {
        kind: 'worked',
        title: 'Build your pacing plan in four steps',
        steps: [
          {
            label: 'Step 1 — Learn your thirds',
            body: `Memorize the shape: questions 1–10 gentle, 11–18 mixed, 19–26 hardest. Before your next timed section, write "10 / 18" on your scratch paper. Those are your mile markers. Everything else follows from them.`,
          },
          {
            label: 'Step 2 — Set your two clock checks',
            body: `After Q10: ~13 minutes elapsed is on pace. After Q18: ~24 minutes. Decide these numbers now, while you are calm, so that mid-test you are reading a dial, not making a judgment call under pressure.`,
          },
          {
            label: 'Step 3 — Define "behind"',
            body: `Pick a concrete trigger: more than about 3 minutes over target at a checkpoint means you shift into flag-and-move mode (lesson 6.3) — you do not "try harder," which is how behind becomes further behind. Write the trigger down: "16+ min at Q10 → flag and move."`,
          },
          {
            label: 'Step 4 — Define "ahead"',
            body: `Being ahead is not permission to speed up the easy questions — rushed easy questions are the classic source of careless misses. Banked time belongs to the final third. If you are ahead at Q18, spend the surplus deliberately on the hardest questions, or hold it for review.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Give every question exactly 80 seconds. Equal time for equal points.',
        right:
          'Questions have different natural lengths, and fighting that fact costs points. A 30-second main-conclusion question does not need 80 seconds; a tangled necessary-assumption question cannot be done well in 80 seconds. Budget by thirds and check the clock at mile markers: let easy questions be quick, let hard questions take what they need, and let the checkpoints — not a stopwatch — tell you where you stand.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'After question 10, your clock shows 16 minutes elapsed. What is the right response?',
        choices: [
          'Panic and rush the next five questions to get back on schedule.',
          'You are about 3 minutes behind — switch to flag-and-move on sticky questions rather than grinding through them.',
          'Go back and redo the first 10 questions faster to recover the time.',
          'Ignore it — pacing targets do not really matter as long as you keep working.',
        ],
        correctIndex: 1,
        explanation:
          'Sixteen minutes at Q10 is roughly three minutes behind the 13-minute target — exactly the situation the "behind" trigger was designed for. The correct response is procedural, not emotional: shift to flag-and-move so that sticky questions stop compounding the deficit, and let the easier questions ahead pull you back on pace. Rushing manufactures careless errors, redoing finished work wastes the minutes you are trying to save, and ignoring the signal is how a 3-minute deficit becomes a 10-minute one.',
      },
      {
        kind: 'example',
        title: 'The final third deserves your banked time',
        body: `Questions 19–26 contain the section's highest concentration of long stimuli and layered reasoning. Test-takers who sprint the finish — "almost done, let's go" — convert banked minutes into rushed misses on the hardest, most discriminating questions of the section. Do the opposite: when you reach Q19 with time in the bank, slow down slightly. Read each stimulus fully. These questions reward composure more than any others.`,
        note: `A useful mantra for the final third: "This is what the banked time is for." Say it when you feel the urge to sprint.`,
      },
      {
        kind: 'retrieval',
        prompt:
          'State your two clock-check points, the healthy elapsed times at each, and what "behind schedule" means for you in concrete terms.',
        answer:
          'After Q10: ~13 minutes elapsed. After Q18: ~24 minutes elapsed. "Behind" means more than about 3 minutes over target at a checkpoint — the trigger to switch to flag-and-move on sticky questions instead of grinding through them.',
      },
      {
        kind: 'summary',
        points: [
          '80 seconds per question is an average, not a rule — questions have different natural lengths.',
          'Think in thirds: Q1–10 gentle (bank time), Q11–18 mixed (watch for drift), Q19–26 hardest (spend the bank).',
          'Two clock checks carry the system: ~13 minutes after Q10, ~24 minutes after Q18.',
          'Define "behind" in advance (>3 minutes over target → flag-and-move), so mid-test you read a dial instead of making judgments under pressure.',
          'Being ahead means banking time for the final third — never rushing easy questions.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why does rigid per-question timing backfire?',
        answer:
          'Because it punishes you for spending 2.5 minutes on a hard question you get right, and it creates panic that causes rushed errors on questions you would normally answer correctly. Mile-marker checks give you the same information without the alarm.',
      },
      {
        kind: 'next',
        text: 'Next: turning your review log into a diagnostic instrument — tracking first-10, middle, and final-third performance, and hunting down your time sinks.',
      },
    ],
  },
  {
    id: '6.2',
    stage: 6,
    title: 'Tracking Performance and Finding Time Sinks',
    estimatedMinutes: 10,
    skills: ['lr-flaw'],
    prerequisites: ['f-structure', 'lr-flaw'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Your total score on a timed section tells you *what* happened. It never tells you *why*. Two test-takers can both miss six questions for completely different reasons — one is too slow, the other misreads under pressure — and they need completely different fixes. The instrument that tells them apart is the **review log**: a per-question record you keep after every timed section.

Split that log into thirds — first 10, middle, final — and patterns leap out that a total score hides. This lesson teaches you what to log, how to read it, and how to find your **time sinks**: the questions and habits that consume far more time than their single point is worth.`,
      },
      {
        kind: 'keyterm',
        term: 'Time sink',
        definition:
          'A question — or a habit — that consumes far more time than its one point justifies: re-reading a stimulus four times, oscillating between two answer choices for minutes, or redoing work you already completed.',
      },
      {
        kind: 'prose',
        md: `After each timed section, log every question you missed — and a few you got — with these fields:

- **Question number and type** (flaw, weaken, necessary assumption…)
- **Rough time spent** (to the nearest half minute is fine)
- **Correct or incorrect**
- **Confidence**: high or low — how sure did you *feel*?
- **Error reason**, in your own words: misread the stimulus, fell for a trap, ran out of time, strategy gap

Then read the log in thirds. Misses bunched in the **final third** with low confidence usually mean pacing: you arrived at the hardest questions with no time. Misses spread evenly suggest a strategy gap in specific types. And the single most important line in any log is a **high-confidence error** — a question you felt good about and got wrong. Low-confidence misses are honest; high-confidence misses mean your process is lying to you, and that is the most dangerous pattern there is.`,
      },
      {
        kind: 'example',
        title: 'A log excerpt, annotated',
        body: `Q3 (flaw) — 0:45 — wrong — HIGH confidence — "misread the conclusion; attacked a premise instead."
Q11 (strengthen) — 1:30 — right — low confidence — "guessed between two; got lucky."
Q21 (necessary assumption) — 3:10 — wrong — low confidence — "re-read stimulus 3x, still foggy. Time sink."
Q24 (weaken) — 2:20 — wrong — high confidence — "chose the trap; it weakened a side claim, not the conclusion."`,
        note: `Four lines, three diagnoses: Q3 and Q24 are high-confidence errors (process flaws — priority one). Q21 is a pure time sink (3+ minutes for zero points). Q11 is a warning: a lucky guess that the log caught. None of this is visible in "I missed 4."`,
      },
      {
        kind: 'worked',
        title: 'Diagnose a section log in four steps',
        steps: [
          {
            label: 'Step 1 — Split misses by third',
            body: `Count your misses in Q1–10, Q11–18, Q19–26 separately. A heavy final-third count with low confidence is a pacing signature: you are reaching the hardest questions already depleted. An even spread points at question-type strategy instead.`,
          },
          {
            label: 'Step 2 — Circle every high-confidence error',
            body: `These are your priority, always. A confident miss means you executed your process and your process produced the wrong answer — misread conclusions, trap answers that fit your mental model. Each one gets a written autopsy: what exactly did you believe, and where did the text contradict it?`,
          },
          {
            label: 'Step 3 — List your three slowest questions',
            body: `For each, ask: was the time worth it? A 3-minute question you got right is expensive but defensible; a 3-minute question you got wrong is a time sink that also cost you the next two questions' composure. Slow-and-wrong questions are your skip candidates (lesson 6.3).`,
          },
          {
            label: 'Step 4 — Write one concrete fix',
            body: `The log must end in a single actionable sentence, or it was journaling. Examples: "On flaw questions, I will underline the conclusion before reading the choices." "I will flag any question where I re-read the stimulus twice." One fix per section; fixes compound.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Reviewing means re-doing the questions you missed until you get them right.',
        right:
          'Re-doing without diagnosis is rehearsal, not repair — you will get it right the second time because you remember it, and learn nothing. The log is the review: question type, time, confidence, error reason. A missed question you have autopsied is worth more than ten re-done without diagnosis, because only the autopsy changes what you do next time.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'Your log shows five misses: four in the final third (all low-confidence) plus one high-confidence miss on Q4, a flaw question. What should you fix first?',
        choices: [
          'Do more questions of every type until the total miss count drops.',
          'Fix pacing — you are arriving at the hardest questions with no time left.',
          'Investigate the Q4 high-confidence miss first — confident errors signal a process flaw, not just a clock problem.',
          'Fix pacing, but give the high-confidence error priority: it reveals a flaw in your process, while the rushed misses may only reveal the clock.',
        ],
        correctIndex: 3,
        explanation:
          'Both patterns matter, but they are not equal. The four final-third misses are consistent with a pacing problem — real, but possibly just a symptom of the clock. The Q4 high-confidence miss is different: you felt sure and were wrong, which means your reading or reasoning process itself misled you. Process flaws reproduce on every section regardless of pacing, so they get diagnosed first; then you fix the pacing that produced the rushed misses. Doing "more questions of every type" treats neither cause.',
      },
      {
        kind: 'example',
        title: 'The oscillation time sink',
        body: `You are down to two choices on a weaken question — B and D — and two minutes have passed with no progress. Each re-read makes both look slightly better and slightly worse. This is oscillation, the most common time sink in LR: the feeling of working without the reality of progress.

The fix is procedural: pick the choice that matches the answer you pre-phrased before reading the options, flag the question, and move on. If the section allows a return pass, fresh eyes will usually break the tie in seconds.`,
        note: `Oscillation feels like diligence. It is actually the most expensive way to earn zero additional information. The flag-and-move habit from lesson 6.3 exists largely for this moment.`,
      },
      {
        kind: 'retrieval',
        prompt: 'List the five fields of a useful per-question review log, and say what each one reveals.',
        answer:
          'Question number and type (reveals which types cost you); rough time spent (reveals time sinks); correct/incorrect; confidence high/low (high-confidence errors are the most dangerous pattern); and error reason in your own words (reveals whether the cause is misreading, traps, pacing, or strategy gaps).',
      },
      {
        kind: 'summary',
        points: [
          'A total score tells you what happened; a per-question log tells you why. Log type, time, correctness, confidence, and error reason after every timed section.',
          'Read the log in thirds: final-third misses with low confidence signal pacing; even spreads signal strategy gaps.',
          'High-confidence errors are priority one — they mean your process itself misled you.',
          'Your slowest questions get audited: slow-and-wrong is a time sink and a future skip candidate.',
          'Every log ends in one concrete, actionable fix. Fixes compound across sections.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why are high-confidence errors more dangerous than low-confidence ones?',
        answer:
          'A low-confidence miss is honest — you knew you were unsure. A high-confidence miss means you executed your process, felt good about it, and were wrong anyway: your process itself is misleading you. That flaw reproduces on every section until it is diagnosed, regardless of pacing.',
      },
      {
        kind: 'next',
        text: 'Next: strategic skipping — how to decide, in advance, exactly when to flag a question and move on, so one stubborn question never sinks a section.',
      },
    ],
  },
  {
    id: '6.3',
    stage: 6,
    title: 'Strategic Skipping',
    estimatedMinutes: 10,
    skills: ['lr-necessary-assumption', 'lr-weaken'],
    prerequisites: ['lr-necessary-assumption', 'lr-weaken', 'f-assumption'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Every question on the test is worth exactly one point. The 40-second main-conclusion question and the 3-minute conditional labyrinth pay the same. Once you truly absorb that, skipping stops feeling like surrender and starts looking like what it is: **triage** — the deliberate decision to spend your minutes where they earn the most points.

Strategic skipping is not guessing randomly and moving on. It is a three-part move: **recognize** the trigger, **flag** the question, and **return** with fresh eyes if time allows. The triggers are decided before the test, while you are calm — so that mid-test, you execute instead of agonize.`,
      },
      {
        kind: 'keyterm',
        term: 'Skip trigger',
        definition:
          'A pre-decided condition that tells you to flag a question and move on — chosen before the test, so you do not have to make the decision while frustrated. Examples: the stimulus is still opaque after two careful reads, or you are stuck between two choices with no progress after about 90 seconds.',
      },
      {
        kind: 'prose',
        md: `Adopt three triggers and make them non-negotiable:

1. **Two reads, still opaque.** You have read the stimulus carefully twice and cannot state the conclusion in your own words. Further re-reading has diminishing returns — flag it.
2. **Ninety seconds, no progress.** You are down to two choices (or circling the stimulus) and nothing has changed in the last minute. Flag it.
3. **The clock says so.** A checkpoint from lesson 6.1 shows you behind schedule. Flag the current sticky question and let the easier questions ahead pull you back.

What happens after the flag matters as much as the flag. Finish the section's remaining questions, then return: fresh eyes break ties that tired eyes could not, and a question that was opaque at minute 20 is often transparent at minute 32. And one absolute rule: **never leave a question blank.** If time expires, every flagged question gets your best educated guess — an unanswered question is a guaranteed zero.`,
      },
      {
        kind: 'example',
        title: 'Which questions are your skip candidates? Check your log.',
        body: `Skip candidates are personal — they come from your review log (lesson 6.2), not from a universal list. But two types show up in many test-takers' logs. Dense **necessary-assumption** questions with layered conditionals ("only if… unless…") often become two-reads-still-opaque triggers. Trap-heavy **weaken** questions often become ninety-seconds-no-progress triggers, when two choices both seem to attack the argument and you start oscillating.

Neither type is "too hard for you." They are simply the types where your minutes currently buy the fewest points — which is exactly what triage is about.`,
        note: `Your log may name different types. Trust the log over any list, including this one.`,
      },
      {
        kind: 'worked',
        title: 'Two skip decisions, worked through',
        steps: [
          {
            label: 'Step 1 — The necessary-assumption tangle: first read',
            body: `The stimulus: a city council will approve a transit plan only if federal funding arrives; funding arrives only if the ridership study is favorable; the study, however, was unfavorable — yet the council approved the plan anyway. Question: which assumption is necessary? First read: you catch the shape (a chain with a broken link) but cannot hold all three conditionals at once. That is normal, not failure.`,
          },
          {
            label: 'Step 2 — Second read, then the trigger check',
            body: `Second read, slowly: approval requires funding; funding requires a favorable study; the study was unfavorable; approval happened anyway. The necessary assumption must reconcile this — something like "the council found another funding source" or "approval did not actually require funding." If the chain is still tangled after this read, trigger one fires: two reads, still opaque. Flag and move — no third read.`,
          },
          {
            label: 'Step 3 — The weaken oscillation: pre-phrase first',
            body: `A different question: an argument claims a new hiring test improves retention because trained managers use it. Before reading the choices, pre-phrase: the support linking test to retention is the managers' training — a weakener would break that link (e.g., trained managers were already retaining people before the test). Now two choices both look damaging and you are oscillating. Check the clock: 90 seconds, no progress. Trigger two fires. Pick the choice matching your pre-phrase, flag, move.`,
          },
          {
            label: 'Step 4 — The return pass',
            body: `With three minutes left, you return. Fresh eyes see what tired eyes missed: on the necessary-assumption question, the chain resolves — the assumption must supply the missing funding link. On the weaken question, one of the two choices weakens a side claim about the test's cost, not the conclusion about retention — the classic trap, suddenly visible. The flags did not abandon these questions; they scheduled them for a better moment.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Skipping means giving up points. Strong test-takers power through every question in order.',
        right:
          'Skipping rescues points. The minutes you save by flagging one 4-minute question answer two or three easier questions correctly — a straight trade of zero likely points for two or three banked ones. Strong test-takers do not power through; they triage. The only way skipping loses points is the way everything loses points: burning the minutes and rushing the rest.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'Eight minutes remain and seven questions are left. You hit a necessary-assumption question with a tangled conditional chain. First read: confusing. Second read: still confusing. What is the best action?',
        choices: [
          'Keep working — you have already invested two minutes, so leaving now wastes them.',
          'Flag it, answer the remaining questions, and return only if time permits.',
          'Pick an answer at random now and commit to never returning.',
          'Skip the rest of the section and focus everything on this question.',
        ],
        correctIndex: 1,
        explanation:
          'The two minutes already spent are sunk — they do not get refunded by spending two more, which is the sunk-cost fallacy wearing a test-day disguise. Trigger one has fired cleanly: two careful reads, still opaque. Flagging preserves the question (you will return with fresh eyes if time allows) while protecting the six remaining questions, several of which are likely easier and cheaper. Random-and-never-return abandons a solvable question; camping on it abandons six.',
      },
      {
        kind: 'example',
        title: 'The return pass and the final sixty seconds',
        body: `Return passes work for a real reason: your brain kept processing in the background while you worked other questions, the pressure of "I must solve this now" is gone, and you read with genuinely fresh eyes. Most test-takers find that half their flagged questions resolve within a minute on return.

And the final rule: with sixty seconds left, stop solving. Go down the section and fill every blank — flagged or not — with your best educated guess. Eliminate one choice if you can; if not, guess and move. A guess is a 20 percent chance. A blank is zero.`,
        note: `Practice the final-sixty-seconds drill in timed sections until it is automatic: you should never be deciding what to do with thirty seconds left.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Write your three personal skip triggers in your own words, exactly as you will apply them mid-test.',
        answer:
          'Example triggers: (1) two careful reads and I still cannot state the conclusion — flag; (2) about 90 seconds with no progress, usually oscillating between two choices — flag; (3) a clock checkpoint shows me behind schedule — flag the current sticky question and move on.',
      },
      {
        kind: 'summary',
        points: [
          'Every question pays one point — so minutes should flow to where they earn the most points. That is triage, not surrender.',
          'Three pre-decided triggers: two reads still opaque; ~90 seconds with no progress; a checkpoint shows you behind.',
          'Flag, finish the section, return with fresh eyes — return passes resolve most flagged questions quickly.',
          'Your skip candidates come from your review log; dense necessary-assumption and trap-heavy weaken questions are common ones.',
          'Never leave a blank: the final sixty seconds are for filling every unanswered question with your best guess.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why should you never leave a question blank, even if you are guessing?',
        answer:
          'Because there is no penalty for wrong answers: a blank is a guaranteed zero, while even a pure guess has a 20 percent chance. The final minute of a section should always be spent filling every remaining blank with your best educated guess.',
      },
      {
        kind: 'next',
        text: 'Stage 7 puts it all together: full 35-minute section simulations, then four-section test-day simulations with the real break structure.',
      },
    ],
  },
];

