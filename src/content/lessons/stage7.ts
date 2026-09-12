/**
 * Stage 7 — Full simulation practice (lessons 7.1–7.2).
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

export const LESSONS_7: Lesson[] = [
  {
    id: '7.1',
    stage: 7,
    title: 'Full 35-Minute Section Practice Protocol',
    estimatedMinutes: 8,
    skills: [],
    prerequisites: ['lr-main-conclusion', 'rc-main-point'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Untimed practice builds skill. Timed sections build **performance** — and the gap between the two is real, measurable, and trainable. Nearly every test-taker scores lower on their first timed section than their untimed work suggested they would. That drop is not a verdict on your ability; it is the pressure gap, and the only way to close it is to practice under the pressure.

A full 35-minute section simulation is the basic unit of that training. But a simulation only works if it actually simulates. A timed section with pauses, phone checks, and looked-up answers is not a simulation — it is untimed practice wearing a costume, and it teaches your nervous system nothing about test day.`,
      },
      {
        kind: 'keyterm',
        term: 'Simulation fidelity',
        definition:
          'How closely your practice matches real test conditions: strict timing, no pauses, no aids you will not have on test day, no interruptions you can control. Higher fidelity means more of what you practice transfers to the real test.',
      },
      {
        kind: 'prose',
        md: `The protocol is strict on purpose. Every rule exists because breaking it breaks the training:

- **Thirty-five minutes, no pauses.** Set a timer. Once it starts, it does not stop — not for a text, not for a hard question, not for anything short of a genuine emergency.
- **Test-day conditions.** Quiet room, phone in another room (not face-down beside you), only the materials you will have on test day.
- **No mid-section aids.** No looking up answers, no checking explanations, no "just this one" pauses. If you would not be allowed to do it on test day, you do not do it here.
- **Score it immediately, log it honestly.** Record your score, your per-third pacing, and your time sinks (lesson 6.2). A simulation you do not log is a workout you did not record — the data is half the value.
- **If you are interrupted, restart — do not resume.** A paused-and-resumed section is still useful practice, but do not file it as a timed result. Your log must distinguish simulations from practice.

One important note on materials: **this app's questions are original practice material, written to train the skills the test demands. They are not official LSAC questions, and they cannot predict your exact official score.** Simulations build stamina, pacing, and process — the things that transfer. For calibration against the real test's voice, you will add official practice later (lesson 8.1).`,
      },
      {
        kind: 'example',
        title: 'Two simulations, only one of them counts',
        body: `Maya puts her phone in the kitchen, closes the door, sets a 35-minute timer, and works straight through — finishing with ninety seconds to review two flagged questions. She scores it, logs her thirds, and writes one fix.

Jordan sets the same timer but pauses it twice: once to answer a text, once to look up whether a weaken answer "counts." He finishes feeling good and records the score alongside Maya's. But his number measures something different — untimed work with interruptions — and comparing it to real simulations will mislead him for weeks.`,
        note: `Jordan's session was not wasted — he still practiced reasoning. It just was not a simulation, and the log must say so.`,
      },
      {
        kind: 'worked',
        title: 'Run your first valid simulation in five steps',
        steps: [
          {
            label: 'Step 1 — Assemble a full section',
            body: `Gather a full section's worth of questions — about 25 LR questions or 4 RC passage sets. Do the assembly before the timer starts: hunting for materials mid-simulation is itself a fidelity break.`,
          },
          {
            label: 'Step 2 — Set up the room',
            body: `Quiet space, phone in another room, water nearby, scratch paper ready. Tell anyone nearby you are unreachable for 40 minutes. Every interruption you prevent now is pressure-training you keep.`,
          },
          {
            label: 'Step 3 — Run the clock',
            body: `Thirty-five minutes, no pauses. Use your mile markers (lesson 6.1), your skip triggers (lesson 6.3), and your final-sixty-seconds drill. Practice the procedures, not just the questions — the procedures are what pressure attacks.`,
          },
          {
            label: 'Step 4 — Score and log immediately',
            body: `Score it while the experience is fresh. Log the score, your thirds, your time sinks, and your confidence pattern (lesson 6.2). Note anything that broke fidelity — honesty here compounds; self-deception does too.`,
          },
          {
            label: 'Step 5 — Schedule the debrief',
            body: `Book your post-test debrief (lesson 8.2) within 24 hours — tomorrow morning is ideal. The simulation generated the data; the debrief converts it into improvement. One without the other is half a workout.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'A timed section with two short pauses still counts as a simulation.',
        right:
          'Pauses destroy exactly what the simulation is training: sustained performance under unbroken pressure. Test day will not pause for you, and your nervous system learns from what you rehearse. An interrupted run is still useful practice — just label it honestly in your log and do not file its score alongside true simulations.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which of the following counts as a valid timed simulation?',
        choices: [
          'A 35-minute section where you paused the timer once to answer an urgent text, then resumed.',
          'A 35-minute section done in a quiet room, phone away, no pauses, scored and logged immediately after.',
          'A section done without a timer, but you estimated it took "about 35 minutes."',
          'A 35-minute section where you checked the explanation for one question midway, then continued timed.',
        ],
        correctIndex: 1,
        explanation:
          'Only the second option preserves simulation fidelity: unbroken timing, test-day conditions, and immediate scoring and logging. Pausing for a text, skipping the timer, or checking an explanation mid-section all break the pressure the simulation exists to train. Those sessions are still useful practice, but filing them as simulations corrupts your log — and your log is the instrument your pacing and readiness decisions depend on.',
      },
      {
        kind: 'example',
        title: 'When the timer surprises you',
        body: `Two endings, two procedures. If you finish early: use the remaining time to review flagged questions only — do not change answers without a concrete reason ("I misread this" beats "this feels off"). If time expires with blanks: that is a pacing datum, not a moral failure — log where the minutes went, and run the final-sixty-seconds drill (lesson 6.3) until filling every blank is automatic.`,
        note: `Both endings produce the same deliverable: an honest log entry and one concrete fix.`,
      },
      {
        kind: 'retrieval',
        prompt: 'List the five non-negotiable rules of a valid 35-minute simulation.',
        answer:
          'Thirty-five minutes with no pauses; test-day conditions (quiet room, phone away); no mid-section aids or answer-checking; score and log immediately and honestly; if interrupted, restart rather than resume — and never file an interrupted run as a simulation.',
      },
      {
        kind: 'summary',
        points: [
          'Timed sections train performance, not just skill — the pressure gap between untimed and timed work only closes under pressure.',
          'Simulation fidelity is everything: 35 unbroken minutes, test-day conditions, no mid-section aids.',
          'Score and log every simulation immediately: score, thirds, time sinks, confidence pattern.',
          'Interrupted runs are still practice, but must be labeled honestly — never filed as simulations.',
          'This app\u2019s questions are original training material, not official LSAC questions; they build transferable skill, not exact score predictions.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why can\u2019t original practice questions predict your exact official score?',
        answer:
          'Because they are written to train the underlying skills — argument analysis, pacing, stamina — not to replicate LSAC\u2019s exact wording, difficulty curve, and voice. They measure your training progress; official practice material (lesson 8.1) is what calibrates you against the real test.',
      },
      {
        kind: 'next',
        text: 'Next: the full test-day rehearsal — a four-section simulation with the real break structure, including the section you cannot identify.',
      },
    ],
  },
  {
    id: '7.2',
    stage: 7,
    title: 'Four-Section Simulation with Break',
    estimatedMinutes: 9,
    skills: [],
    prerequisites: ['lr-main-conclusion', 'rc-main-point'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `A single timed section trains pressure. The real test trains **stamina**: multiple 35-minute sections back to back, with one short break, over roughly two and a half hours. Section four does not care how sharp you were in section one — it measures what is left. That is a trainable capacity, but only if you rehearse the full arc.

The structure to rehearse: **Section 1, Section 2, a 10-minute intermission, Section 3, Section 4.** Each section is 35 minutes. And one of the four is a variable, unscored section — included so you practice the real test's hardest mental discipline: treating every section as if it counts, because you cannot know which one does not.`,
      },
      {
        kind: 'keyterm',
        term: 'Experimental (variable) section',
        definition:
          'An unscored section on the real test, used to trial future questions. It is indistinguishable from the scored sections — same format, same timing — and you are not told which one it is. The discipline it demands: treat every section as scored.',
      },
      {
        kind: 'prose',
        md: `Here is how to run it:

- **Assemble four sections** — a mix of LR and RC, in any order. Mark one as your "mystery" section (have someone else choose, or seal the label). During the simulation, it gets the same effort as the rest.
- **Run the schedule exactly:** S1 (35 min), S2 (35 min), 10-minute intermission, S3 (35 min), S4 (35 min). Use real timers for the break too — a 25-minute "quick break" trains nothing.
- **The intermission has rules.** Stand up. Move. Water, a light snack. No phone, no test talk, no reviewing the sections you just did — rumination during the break spends the energy section three needs. Return to your seat with one minute to spare.
- **One-minute resets between sections.** When a section ends, it is over: thirty seconds of slow breathing, a sip of water, and a deliberate mental clear. Carrying section two's frustration into section three is how one bad section becomes two.

Block about two and a half hours, and do not schedule the debrief immediately after — rest first, debrief within 24 hours (lesson 8.2).`,
      },
      {
        kind: 'example',
        title: 'A sample simulation morning',
        body: `9:00 — Section 1 (LR). 9:35 — Section 2 (RC). 10:10 — intermission: stand, stretch, water, a banana, no phone. 10:20 — Section 3 (LR). 10:55 — Section 4 (RC). 11:30 — done. Lunch, rest, normal day. Tomorrow morning: score review and debrief.

Notice what is absent: no checking answers between sections, no "just one quick look" at the phone, no post-mortem during the break. The simulation rehearses the whole day, not just the questions.`,
        note: `One of the four sections is your designated "mystery" section. You will score it like the rest — the point was never the score, but the discipline of not knowing.`,
      },
      {
        kind: 'worked',
        title: 'Plan your simulation day in four steps',
        steps: [
          {
            label: 'Step 1 — Block the time',
            body: `Reserve an uninterrupted 2.5-hour window, ideally at the same time of day your real test will run. Morning people should simulate in the morning — circadian rhythm is part of stamina, and you want your rehearsal to match the performance.`,
          },
          {
            label: 'Step 2 — Build four sections and a mystery',
            body: `Assemble two LR and two RC sections (order them as you like). Choose one to be the unscored "mystery" section — have a friend pick, or write the four orders on slips and draw. Seal the answer; the not-knowing is the training.`,
          },
          {
            label: 'Step 3 — Run the schedule with real breaks',
            body: `Execute S1, S2, the full 10-minute intermission, S3, S4 — each on its own timer, including the break. Between sections, run your one-minute reset: breathe, water, clear. If something goes wrong (a fire drill, a dead timer), note it and keep going; adapting to disruption is itself test-day training.`,
          },
          {
            label: 'Step 4 — Rest, then debrief',
            body: `Do not debrief immediately — you are depleted, and depleted analysis is harsh analysis. Rest, eat, do something unrelated. Tomorrow, score everything and run the full debrief protocol (lesson 8.2): the four sections give you your richest log yet.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Try to figure out which section is the experimental one, so you can relax during it.',
        right:
          'You cannot reliably identify it — that is the design — and trying burns the mental energy the scored sections need. Worse, the attempt teaches exactly the wrong habit: selective effort. The real test demands full effort on every section because any of them could count. Rehearse that: every section scored, every section full effort, no detective work.',
      },
      {
        kind: 'checkpoint',
        prompt:
          'During the 10-minute intermission of your simulation, what should you do?',
        choices: [
          'Check your phone quickly and look up the answer to a question that bothered you in Section 2.',
          'Stand, move, hydrate, have a light snack — no phone, no reviewing completed sections — and return with a minute to spare.',
          'Use the time to redo the hardest questions from Section 2 while they are fresh.',
          'Lie down with your eyes closed for the full ten minutes to conserve energy.',
        ],
        correctIndex: 1,
        explanation:
          'The intermission has one job: restore you for sections three and four. Movement and hydration do that; phone-checking and reviewing completed sections do the opposite — they spend mental energy on things you cannot change and re-engage the stress response you are trying to discharge. Ten full minutes of lying still is not harmful, but it forfeits the restorative effect of movement and risks grogginess; the balanced routine — stand, move, water, light snack, no test talk — is the one that transfers to test day.',
      },
      {
        kind: 'example',
        title: 'When the simulation goes sideways',
        body: `Your neighbor starts drilling halfway through Section 3. The timer app crashes during the break. You feel a headache arriving in Section 4. None of this ruins the simulation — it improves it, provided you keep going. Test day has its own disruptions, and composure under disruption is a skill. Log what happened, note how you adapted, and finish. The only failed simulation is the one you abandon.`,
        note: `Adaptation is trainable. Every disruption you work through in practice is one you will not meet for the first time on test day.`,
      },
      {
        kind: 'retrieval',
        prompt: 'Recite the four-section simulation structure, including section lengths and the intermission.',
        answer:
          'Section 1 (35 min), Section 2 (35 min), 10-minute intermission, Section 3 (35 min), Section 4 (35 min) — about 2.5 hours total. One section is a designated unscored "mystery" section, treated with full effort like the rest.',
      },
      {
        kind: 'summary',
        points: [
          'The real test is a stamina event: rehearse the full arc — S1, S2, 10-minute intermission, S3, S4 — not just isolated sections.',
          'Include a "mystery" unscored section and treat every section as scored; selective effort is the habit to avoid.',
          'Run the break on a real timer: stand, move, hydrate, light snack — no phone, no reviewing, no test talk.',
          'Use one-minute resets between sections: breathe, water, deliberately clear the previous section.',
          'Disruptions are training, not failure — log them, adapt, and finish. Debrief the next day, not immediately.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why include a "mystery" unscored section in your simulation instead of just doing three sections?',
        answer:
          'Because the real test includes an unscored section you cannot identify, and the discipline it demands — full effort on every section, no detective work, no selective relaxing — can only be rehearsed if you practice not knowing. Three known sections cannot train that.',
      },
      {
        kind: 'next',
        text: 'Stage 8: calibrating with official practice material, and the debrief protocol that turns every simulation into improvement.',
      },
    ],
  },
];

