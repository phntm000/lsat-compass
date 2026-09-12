/**
 * Stage 8 — Official practice and debriefing (lessons 8.1–8.2).
 * All scenarios, examples, and explanations are original.
 * Contract: content-schema.md §§0, 1, 4, 7, 9.
 *
 * Note: this app stores metadata about practice (scores, question numbers,
 * types, timing) only — never official question text.
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

export const LESSONS_8: Lesson[] = [
  {
    id: '8.1',
    stage: 8,
    title: 'When and How to Use Official LawHub Practice',
    estimatedMinutes: 8,
    skills: [],
    prerequisites: ['lr-main-conclusion'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `Everything you have trained on so far is original practice material — written to build the skills the test demands. That training transfers. But at some point you need to meet the real thing: official LSAC questions, in LSAC's voice, with LSAC's exact habits of phrasing, difficulty curve, and trap design. The free official practice available through **LawHub**, LSAC's own platform, is where that meeting happens.

The purpose is **calibration**: comparing your performance on official questions against your practice performance, so your expectations — and your strategy — are tuned to the actual test rather than to an approximation of it.`,
      },
      {
        kind: 'keyterm',
        term: 'Calibration',
        definition:
          'Comparing your performance on official LSAC questions against your performance on practice material: scores, pacing, and error patterns. The gap between the two is information — it tells you what to adjust before test day.',
      },
      {
        kind: 'prose',
        md: `**When:** after your fundamentals are solid. Official material is a limited resource — there are only so many released questions — and spending it while you are still learning what a necessary assumption is wastes the one thing it is uniquely good for: showing you the real test's voice. A good rule: start official practice once you can complete timed sections comfortably and your errors are mostly strategic rather than conceptual. Your readiness gates (lesson 9.1) will confirm it.

**How:** spaced and simulated, not binged. Take official sections under the full simulation protocol (lesson 7.1) — same timing, same conditions. Debrief each one (lesson 8.2). Then compare: score, pacing per third, error types. Note the *wording differences* you observe — official stems can be wordier, official traps subtler in specific ways — and make small adjustments. Do not overhaul your approach because one official section felt different; you are calibrating an instrument, not rebuilding it.

**What not to do:** do not copy, screenshot, or reproduce official questions anywhere, including into this app's notes. The app stores **metadata only** — scores, question numbers, types, timing — never question text. That boundary protects both LSAC's rights and the integrity of your own practice.`,
      },
      {
        kind: 'example',
        title: 'Calibration in action',
        body: `Devon averages -4 on practice LR sections. His first official timed section comes back -7. His instinct says the training failed. His log says otherwise: the misses cluster on wordy parallel-reasoning and principle questions — official stems he had to read twice. The gap is not failure; it is a calibration reading. Adjustment: on official-style long-stem questions, slow the first read and diagram the structure before touching the choices. Two official sections later, he is at -5 and closing.`,
        note: `Without the comparison, Devon would have either panicked or ignored the signal. Calibration turns a scary number into a work order.`,
      },
      {
        kind: 'worked',
        title: 'Plan your official-material use in four steps',
        steps: [
          {
            label: 'Step 1 — Confirm you are ready for it',
            body: `Check your fundamentals first: timed sections feel manageable, and your misses come from strategy and pacing rather than not understanding the question types. If basics are still shaky, keep training on practice material — official questions will still be there in two weeks.`,
          },
          {
            label: 'Step 2 — Start small and timed',
            body: `Begin with a small free official set — one timed section, full protocol. Resist the urge to "try a few untimed first to see what they are like." Untimed official questions spend the resource without buying the calibration.`,
          },
          {
            label: 'Step 3 — Compare against your practice baseline',
            body: `Lay your recent practice logs next to the official result: score, per-third pacing, error types, confidence pattern. Where do they match? Where do they diverge? The divergences are your calibration findings — write them down explicitly.`,
          },
          {
            label: 'Step 4 — Extract adjustments, not anxieties',
            body: `Convert each finding into one small adjustment: "official flaw stems are longer — budget an extra 15 seconds on the first read." Two or three adjustments per official section is plenty. File them with your lessons-learned bank (lesson 8.2) and test them on the next official section.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Save all official material for the final week before the test.',
        right:
          'The final week is for routine, not surprises (lesson 9.2). If your first official section reveals a calibration gap — wordier stems, a different trap rhythm — you need weeks, not days, to adjust. Start official practice early enough to calibrate (once fundamentals are solid), space it out, and let the last official sections confirm your readiness rather than discover your gaps.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which approach to official LawHub practice is wisest?',
        choices: [
          'Burn through all free official questions untimed this weekend to "see what the real test is like."',
          'Wait until fundamentals are solid, then take official sections spaced out, fully timed and simulated, comparing each against your practice baseline.',
          'Save every official question untouched until the week of the test, for maximum realism.',
          'Do official questions untimed alongside practice material from the very start, mixing everything together.',
        ],
        correctIndex: 1,
        explanation:
          'Official material is a limited calibration resource, so timing and method matter. Using it before fundamentals are solid wastes its unique value (showing you the real voice) on questions you are not ready to learn from; binging it untimed spends it without buying calibration data; saving it all for test week leaves no room to adjust to what it reveals. The wise path is spaced, fully simulated official sections once basics are solid, each compared against your practice baseline so the gaps become specific, actionable adjustments.',
      },
      {
        kind: 'example',
        title: 'What calibration cannot tell you',
        body: `One official section is a noisy measurement. A -7 followed by a -4 does not mean you "fixed" something between them — it may mean the second section happened to favor your strengths. Read trends across three or four official sections before concluding anything: stable patterns are signals, single-section swings are noise. This is why you space official practice out instead of drawing conclusions from one heroic or disastrous sitting.`,
        note: `The same discipline applies to practice sections. Trends are truth; single data points are weather.`,
      },
      {
        kind: 'retrieval',
        prompt: 'When should you start official practice, and why not earlier?',
        answer:
          'Once fundamentals are solid — timed sections feel manageable and errors are strategic rather than conceptual. Not earlier, because official material is limited, and spending it before you can learn from the real test\u2019s voice wastes its unique calibration value.',
      },
      {
        kind: 'summary',
        points: [
          'Official LawHub practice exists for calibration: comparing your official performance against your practice baseline.',
          'Start once fundamentals are solid — official material is limited and should not be spent while basics are shaky.',
          'Take official sections spaced out, fully timed and simulated — never binged, never saved entirely for test week.',
          'Convert gaps into small adjustments (wording, pacing, trap awareness), not overhauls or anxieties.',
          'Read trends across several official sections; single sections are noisy.',
          'Never reproduce official question text anywhere — the app stores metadata only: scores, numbers, types, timing.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'In your own words: what does calibration mean in test prep?',
        answer:
          'Measuring how your performance on official questions differs from your performance on practice material — in score, pacing, and error patterns — and using the differences to make small, specific adjustments before test day.',
      },
      {
        kind: 'next',
        text: 'Next: the post-test debrief protocol — the structured review that turns every simulation, official or practice, into improvement.',
      },
    ],
  },
  {
    id: '8.2',
    stage: 8,
    title: 'Post-Test Debrief Protocol',
    estimatedMinutes: 10,
    skills: [],
    prerequisites: ['f-structure', 'lr-flaw'],
    version: 1,
    blocks: [
      {
        kind: 'prose',
        md: `A test you do not debrief is half a test. The simulation built your stamina and generated data; the debrief converts that data into improvement. Without it, you will repeat the same errors with better endurance — a faster runner on the same wrong route.

The debrief has a fixed protocol, and it happens within **24 hours** of the test — close enough that you remember what you were thinking, far enough (after a real four-section simulation, sleep on it) that you analyze rather than flog yourself. What you record is **metadata only**: sections, question numbers, question types, timing, reasons, lessons. Never question text — not official, not the app's. The app stores metadata only, and your own notes should follow the same rule.`,
      },
      {
        kind: 'keyterm',
        term: 'Error taxonomy',
        definition:
          'Your personal set of categories for why you missed a question: misread the stimulus, fell for a trap answer, time pressure, strategy gap, careless slip. When the same category recurs across tests, it names exactly what to fix.',
      },
      {
        kind: 'prose',
        md: `For each missed question, record six fields:

1. **Section** — which section of the simulation (S1–S4) and its type (LR/RC).
2. **Question number** — the number only. Never copy the question text.
3. **Question type** — flaw, weaken, necessary assumption, main point, inference…
4. **Your error reason** — from your taxonomy, in your own words. Be specific: "chose the trap that weakened a side claim instead of the conclusion" beats "careless."
5. **Time spent** — rough, to the nearest half minute. Flags your time sinks.
6. **Lesson learned** — one sentence per test, not per question: the single most valuable takeaway.

Then aggregate. Tally misses by question type, by third of the section, and by error reason. The tallest bar names your next unit of work. Finally, convert it into **one concrete fix** — a drill, a rule, a trigger — and schedule it. A debrief that ends without a scheduled fix is an autopsy with no prescription.`,
      },
      {
        kind: 'example',
        title: 'A filled debrief entry',
        body: `S2 (LR) · Q14 · weaken · trap — chose the answer that weakened a side claim about costs, not the conclusion about retention · 2:05 · Lesson: pre-phrase what the conclusion's support actually is before reading weaken choices.

S3 (RC) · Q7 · inference · time pressure — rushed the final set, picked the "half-right" choice · 0:40 · (same lesson as above? No — this one is pacing: the section's final set got 5 minutes instead of 8.)`,
        note: `Two entries, two different fixes: a weaken procedure and a pacing adjustment. The numbers-only format keeps it fast — a full debrief should take 20–30 minutes, not all evening.`,
      },
      {
        kind: 'worked',
        title: 'Run a debrief in five steps',
        steps: [
          {
            label: 'Step 1 — Score without emotion',
            body: `Score the test and write the number down. Then set the number aside — it is a measurement, not a verdict. Debriefs conducted as trials ("how could I miss that?!") produce shame, not insight. You are a technician reading dials.`,
          },
          {
            label: 'Step 2 — Log each miss in six fields',
            body: `Section, question number, type, error reason, time spent, lesson. Work briskly; if an error reason is unclear, write your best guess and mark it uncertain. Question numbers only — no text, no screenshots, no paraphrases of official material.`,
          },
          {
            label: 'Step 3 — Tally by type, third, and reason',
            body: `Count: which question types cost the most? Which third of the sections? Which error reasons recur? You are looking for the tallest bar — the pattern, not the anecdotes. One weird miss is weather; four trap-answer misses on weaken questions is climate.`,
          },
          {
            label: 'Step 4 — Name the single biggest pattern',
            body: `Write it as one sentence: "I lose most points to trap answers on weaken and flaw questions when I skip the pre-phrase." Specificity is the whole game — "I need to be more careful" has never fixed anything.`,
          },
          {
            label: 'Step 5 — Prescribe one fix and schedule it',
            body: `Convert the pattern into one concrete action with a date: "This week: 20 weaken questions, pre-phrasing the conclusion's support in writing before viewing choices." Put it on the calendar now. The debrief is complete when the fix is scheduled, not when the log is filled.`,
          },
        ],
      },
      {
        kind: 'misconception',
        wrong: 'Debriefing means redoing every missed question until you get it right.',
        right:
          'Redoing without diagnosis is rehearsal, not repair — of course you get it right the second time; you remember it. The debrief is the log: type, reason, timing, pattern. The re-attempt is optional and secondary. What changes your next test is not having seen the question twice, but having named the flaw in your process and scheduled its fix.',
      },
      {
        kind: 'checkpoint',
        prompt: 'Which debrief record follows the protocol?',
        choices: [
          'Q14: copied the full stimulus and choices into my notes so I can study the exact wording later.',
          'S2 (LR) · Q14 · weaken · trap (weakened side claim, not conclusion) · 2:05 · Lesson: pre-phrase the conclusion\u2019s support before reading choices.',
          'Q14: weaken — I just need to focus more. Will redo it tonight until it feels easy.',
          'S2 · got Q14 wrong · official question, so I screenshotted it for my error log.',
        ],
        correctIndex: 1,
        explanation:
          'The correct record captures all six metadata fields — section, number, type, specific error reason, time, and a one-sentence lesson — using the question number only, never the question text. Copying or screenshotting question text (especially official material) violates the metadata-only rule; vague resolutions like "focus more" name no actionable pattern; and redoing without diagnosis is rehearsal, not repair.',
      },
      {
        kind: 'example',
        title: 'The lessons-learned bank',
        body: `Keep a running list — one line per test — of your "lesson learned" sentences. Before each new simulation, read the last five. This is compound interest on your errors: the bank ensures that a lesson paid for in March is still working for you in May. Review it during test week (lesson 9.2) instead of studying anything new.`,
        note: `Ten honest lines in a lessons-learned bank are worth more than a hundred re-done questions.`,
      },
      {
        kind: 'retrieval',
        prompt: 'List the six fields of a debrief entry, and state the rule about question text.',
        answer:
          'Section (and type), question number, question type, error reason in your own words, time spent, and one lesson-learned sentence. The rule: numbers and metadata only — never copy, screenshot, or paraphrase question text; the app stores metadata only.',
      },
      {
        kind: 'summary',
        points: [
          'Debrief within 24 hours: the simulation generates data, the debrief converts it into improvement.',
          'Log every miss in six fields: section, question number, type, error reason, time spent, lesson learned.',
          'Metadata only — never question text. This protects official material and keeps your notes honest.',
          'Aggregate by type, third, and error reason; the tallest bar names your next unit of work.',
          'Name the single biggest pattern in one specific sentence, then prescribe one fix and schedule it.',
          'Keep a running lessons-learned bank; review it before each simulation and during test week.',
        ],
      },
      {
        kind: 'retrieval',
        prompt: 'Why does the app store only metadata about missed questions, never question text?',
        answer:
          'Two reasons: it respects LSAC\u2019s rights over official material (no copying or reproducing questions), and it keeps your review honest — the debrief works on patterns (types, reasons, timing), which metadata captures fully, rather than on memorizing specific questions.',
      },
      {
        kind: 'next',
        text: 'Stage 9: readiness gates — the evidence-based checklist that tells you whether you are ready — and test week mode.',
      },
    ],
  },
];

