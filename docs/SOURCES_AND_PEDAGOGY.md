# SOURCES AND PEDAGOGY

This file documents the authoritative sources used to verify the current LSAT
format (2026–27 testing cycle) and the learning-science literature that
informs this app's instructional design. It exists so that (a) future content
work stays grounded in facts, not memory, and (b) the product never makes
exaggerated scientific claims to users.

All sources below were last checked on **2026-09-11**. No LSAC question text,
PrepTest material, or proprietary explanations were copied or reproduced —
only factual summaries of structure and administration.

---

## Part 1 — Current LSAT Structure (Tier-1: LSAC)

### 1. Multiple-choice test: format

| Fact | Source (title, URL, date checked) |
|---|---|
| The standard LSAT has **four 35-minute multiple-choice sections**: two Logical Reasoning, one Reading Comprehension, and one unscored variable section. | "Specifications of the LSAT and LSAT Argumentative Writing" — https://lsac.org/lsat/register-lsat/accommodations/specifications-lsat-and-lsat-argumentative-writing — checked 2026-09-11 |
| The **three scored sections** are the two LR sections and the one RC section. The fourth, unscored variable section (LR or RC) is used to validate new questions for future tests; test takers cannot identify it during the exam. | Same as above |
| A **10-minute intermission** falls between the second and third sections for all test takers. | "About the 10-Minute Intermission" — https://www.lsac.org/lsat/taking-lsat/about-10-minute-intermission — checked 2026-09-11 |
| Starting with the **August 2026 LSAT**, the multiple-choice portion is moving toward **in-center testing for almost all test takers**, with limited remote exceptions (e.g., certain disability accommodations). | "Specifications of the LSAT and LSAT Argumentative Writing" — checked 2026-09-11 |
| Absent an approved accommodation for an alternative format, the LSAT is delivered on the computer **through the LawHub interface**. | Same as above |
| LSAC publishes **free Official LSAT Prep® practice tests** in the LawHub library (answers and rationales included) for interface familiarization. | Same as above; also "LSAT Update – July 3, 2024" — https://www.lsac.org/blog/lsat-update-july-3-2024 — checked 2026-09-11 |

**Working summary for app design:** a full simulation = 4 × 35-minute sections
(LR, LR, RC, plus one unscored variable LR or RC whose identity is hidden from
the test taker), with a 10-minute intermission after section 2. Analytical
Reasoning / Logic Games were removed starting with the August 2024
administration and are **not** part of the current test.

### 2. Logical Reasoning

| Fact | Source |
|---|---|
| LR questions evaluate the ability to **examine, analyze, and critically evaluate arguments** in ordinary language. | "Logical Reasoning" — https://www.lsac.org/lsat/taking-lsat/test-format/logical-reasoning — checked 2026-09-11 |
| Stimuli are short arguments drawn from varied sources (newspapers, magazines, scholarly publications, advertisements, informal discourse). | Same as above |
| Each question is based on one short passage (typically 20–100 words) with one question about it; a section is roughly 25 questions. | LSAC webinar "Prepping for the LSAT: An Insider's Look" — https://www.lsac.org/lawhub/webinars/prepping-lsat-insiders-look — checked 2026-09-11 |
| Skills LSAC lists include: recognizing parts of an argument and their relationships; recognizing similarities/differences between patterns of reasoning; drawing well-supported conclusions; reasoning by analogy; recognizing misunderstandings or points of disagreement; determining how additional evidence affects an argument; detecting assumptions; identifying and applying principles or rules; identifying flaws. | "Logical Reasoning" page — checked 2026-09-11 |

### 3. Reading Comprehension

| Fact | Source |
|---|---|
| An RC section contains **four reading sets**: either 3 or 4 single passages plus **either one or no comparative reading passage** — a comparative set is *not* guaranteed every section (verified 2026-09-11; earlier drafts of this doc incorrectly stated one is always comparative). | "Reading Comprehension" — https://www.LSAC.org/lsat/prepare/types-lsat-questions/reading-comprehension — checked 2026-09-11 |
| Each set is roughly **450–500 words** with **5–8 questions**. | Same as above; also LSAC webinar "About the LSAT: An Insider's Look" — https://www.lsac.org/lawhub/webinars/about-the-lsat-an-insiders-look — checked 2026-09-11 |
| Passage domains: one each of **humanities, natural science, social science, and law-related**. | LSAC webinar "About the LSAT: An Insider's Look" — checked 2026-09-11 |
| Questions may ask about: main idea or primary purpose; explicitly stated information; inference; meaning of words/phrases in context; organization or structure; application to a new context; principles functioning in the selection; analogies; author attitude/tone; impact of new information. Comparative questions concern relationships between the passages (generalization/instance, principle/application, point/counterpoint). | "Reading Comprehension" page — checked 2026-09-11 |

### 4. LSAT Argumentative Writing

| Fact | Source |
|---|---|
| **Unscored** writing sample, **administered separately** from the multiple-choice sections; a completed and approved writing sample must be on file for the LSAT score to be released. | "Specifications of the LSAT and LSAT Argumentative Writing" — checked 2026-09-11 |
| Structure: **15 minutes prewriting analysis** (test takers may move past it after 5 minutes), then **35 minutes essay writing** = 50 minutes total. | Same as above |
| Test takers receive a debatable issue (Key Question) plus **three or four perspectives** presenting claims within the debate; they write an argumentative essay taking a position while addressing at least one argument/idea from the other perspectives. There are no objectively right or wrong positions. | Same as above |
| Administered **remotely with secure remote-proctoring software** on the candidate's own computer; physical scratch paper is prohibited and the interface provides a **built-in digital scratch paper** section, plus cut/copy/paste and a built-in spell check that underlines misspelled words. | Same as above |
| Opens **8 days prior to each test administration**; candidates have up to 1 year to complete it; one sample on file is sufficient (retakes do not require another). | "Frequently Asked Questions about LSAT Argumentative Writing" — https://WWW.LSAC.ORG/lsat/frequently-asked-questions-about-lsat/frequently-asked-questions-about-lsat-argumentative — checked 2026-09-11 |

### 5. Scoring

| Fact | Source |
|---|---|
| Score is based on the number of questions answered correctly (raw score); all questions weighted equally; **no deduction for incorrect answers** — guessing cannot hurt. | "LSAT Scoring" — https://www.lsac.org/lsat/lsat-scoring — checked 2026-09-11 |
| Raw score is converted to a scaled score from **120 to 180**. Score reports also include percentile rank and a score band. | Same as above |
| Scaled-score conversion **varies by form** — there is no fixed "X% correct = Y score" table. The app must not invent one. | Implied by the raw-to-scaled conversion statement; same source |

### 6. Digital test interface (for the exam-mode approximation)

The official interface (delivered through LawHub) includes: on-screen
highlighting of key information, the ability to rule out ("cross off") answer
choices, a visible countdown timer, a question navigator showing answered /
unanswered questions, and flagging questions to return to. The specs page also
documents built-in accessibility features (adjustable text size and line
spacing, selectable color schemes).

Sources: "Specifications of the LSAT and LSAT Argumentative Writing" (LawHub
interface + accessibility tools) — checked 2026-09-11; "Digital LSAT Screen
Layouts" (interface behaviors: highlighting, ruling out answers, time
remaining, flagging on the answer bar) —
https://www.lsac.org/system/files/inline-files/TestQuestion_Mock_PR_Electronic_Accessible-update.pdf —
checked 2026-09-11 (note: document predates the 2024 format change; interface
behaviors cited only).

### 7. Official practice bridge

LawHub's library contains free Official LSAT PrepTests and an Argumentative
Writing practice prompt for interface familiarization. Because these are
LSAC-copyrighted, the app's built-in bank is **original LSAT-style material**
only, and the app provides an Official Practice Log where learners record
results from real LawHub PrepTests without copying question text.

Sources: "Specifications of the LSAT and LSAT Argumentative Writing" and
"LSAT Update – July 3, 2024" (both above), checked 2026-09-11.

---

## Part 2 — Pedagogy Evidence (plain English, honest summaries)

The following is the general research literature behind the app's design
decisions. Summaries are deliberately modest: the science supports *learning
principles*, not specific LSAT score gains.

### Retrieval practice
Actively recalling information (testing yourself) improves long-term retention
more than simply re-reading or re-studying material. Applied here: end-of-lesson
checkpoints, review drills, and "Second-Pass Review" before revealing answers.
— Roediger, H. L., & Karpicke, J. D. (2006). Test-enhanced learning: Taking
memory tests improves long-term retention. *Psychological Science, 17*(4),
249–255.

### Spaced (distributed) practice
Learning is more durable when practice is spread across time than when it is
crammed into one session; the spacing benefit holds across many retention
intervals. Applied here: the spaced review scheduler, review-queue priority
scores, and recurring retesting of mastered skills.
— Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006).
Distributed practice in verbal recall tasks: A review and quantitative
synthesis. *Psychological Bulletin, 132*(3), 354–380.

### Effective learning techniques (overview)
A major review found strong evidence for practice testing and distributed
practice, and moderate evidence for elaborative interrogation, self-explanation,
and interleaved practice — while highlighting weak evidence for popular tactics
like rereading and highlighting. Applied here: the curriculum leads with the
strong-evidence techniques and treats highlighting as an annotation tool, not a
study strategy.
— Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham,
D. T. (2013). Improving students' learning with effective learning techniques:
Promising directions from cognitive and educational psychology. *Psychological
Science in the Public Interest, 14*(1), 4–58.

### Worked examples and fading scaffolds
Novices learn more efficiently when they first study worked examples with the
reasoning made explicit than when they attempt problems cold; as skill grows,
scaffolding should be gradually removed (fading). Applied here: the lesson
sequence Explain → Model → Guided Practice → Independent Practice, plus staged
Socratic hints.
— Sweller, J. (1988). Cognitive load during problem solving: Effects on
learning. *Cognitive Science, 12*(2), 257–285.
— Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise
reversal effect. *Educational Psychologist, 38*(1), 23–31.

### Self-explanation
Students who explain reasoning steps to themselves while studying examples learn
and transfer more than those who don't; good self-explainers monitor their
understanding as they go. Applied here: post-answer prompts asking the learner
to identify the conclusion, assumption, or flaw before seeing the full
explanation.
— Chi, M. T. H., Bassok, M., Lewis, M. W., Reimann, P., & Glaser, R. (1989).
Self-explanations: How students study and use examples in learning to solve
problems. *Cognitive Science, 13*(2), 145–182.

### Formative feedback
Feedback improves learning when it is specific about what was wrong, why, and
how to fix it; delayed or sparse feedback can let errors persist, and immediate
feedback after multiple-choice attempts has been shown to enhance retention
while reducing the harm of initially choosing a wrong answer. Applied here:
learning-mode explanations with "why each choice succeeds or fails" plus
"general lesson," and structured deep review after timed sections.
— Hattie, J., & Timperley, H. (2007). The power of feedback. *Review of
Educational Research, 77*(1), 81–112.
— Butler, A. C., & Roediger, H. L. (2008). Feedback enhances the positive
effects and reduces the negative effects of multiple-choice testing. *Memory &
Cognition, 36*(3), 604–616.

### Metacognition and calibration
Learners are often poorly calibrated about what they know; training them to
judge their own understanding improves study decisions. Applied here:
confidence ratings on selected questions, overconfidence/underconfidence
tracking, and calibration charts — used educationally, not as a score.
— Pashler, H., Bain, P. M., Bottge, B. A., Graesser, A., Koedinger, K.,
McDaniel, M. A., & Metcalfe, J. (2007). *Organizing instruction and studying to
improve student learning* (IES Practice Guide, NCES 2007-2004). Washington,
DC: National Center for Education Research, Institute of Education Sciences,
U.S. Department of Education.

### Desirable difficulties
Some conditions that slow initial performance — spacing, interleaving, varied
practice — produce better long-term retention and transfer than easy,
massed practice. Applied here: contrastive exercises, interleaved mixed sets,
and transfer items with unfamiliar surface content.
— Bjork, R. A. (1994). Memory and metamemory considerations in the training of
human beings. In J. Metcalfe & A. Shimamura (Eds.), *Metacognition: Knowing
about knowing*. Cambridge, MA: MIT Press.

### Interleaving
Mixing related but distinct problem types improves discrimination and
categorization relative to blocking all items of one type — once learners have
acquired initial schemas. Applied here: blocked practice early in a skill,
interleaved mixed sets later (contrast drills, mixed LR sets).
— Rohrer, D., & Taylor, K. (2007). The shuffling of mathematics problems
improves learning. *Instructional Science, 35*, 481–498.
— Kornell, N., & Bjork, R. A. (2008). Learning concepts and categories: Is
spacing the "enemy of induction"? *Psychological Science, 19*(6), 585–592.

### Transfer
Students often fail to apply learned procedures to new surface forms; studying
multiple examples with varied contexts and explicitly comparing them improves
transfer to unfamiliar problems. Applied here: Phase J "transfer" items with
unfamiliar topics, and general-lesson summaries that abstract the principle
from the example.
— Gick, M. L., & Holyoak, K. J. (1980). Analogical problem solving.
*Cognitive Psychology, 12*(4), 306–355.

### Cognitive load
Working memory is limited; instruction should minimize extraneous load so
mental effort goes toward building schemas. Applied here: concise lessons,
one concept per screen, no dense walls of prose, and notation used only when it
compresses reasoning rather than adding decoration.
— Sweller, J., van Merriënboer, J. J. G., & Paas, F. G. W. C. (1998).
Cognitive architecture and instructional design. *Educational Psychology
Review, 10*(3), 221–296.

### Mastery learning
Learners progress to new material only after demonstrating competence on
prerequisites, with corrective feedback and extra time where needed; the
approach trades uniform pacing for uniform outcomes. Applied here: the
skill graph with explicit prerequisites, mastery states that require evidence
across guided, blocked, delayed, and mixed contexts, and remediation
mini-lessons instead of merely harder questions.
— Bloom, B. S. (1968). Mastery learning. In J. H. Block (Ed.), *Mastery
learning: Theory and practice*. New York: Holt, Rinehart & Winston.

### Tasteful gamification
Reviews of gamification find it can support motivation when rewards are tied to
meaningful achievement, but results are mixed and effects often depend heavily
on design context. Applied here: XP for completed study, reviews, and mastery
— never for rapid guessing or empty engagement; no loot boxes, energy timers,
or streak punishment.
— Hamari, J., Koivisto, J., & Sarsa, H. (2014). Does gamification work? —
A literature review of empirical studies on gamification. In *Proceedings of
the 47th Hawaii International Conference on System Sciences*. Los Alamitos,
CA: IEEE.

---

## Part 3 — Caveats: what the science does NOT support

1. **No guaranteed score gains.** The literature supports general learning
   principles (spacing helps retention; retrieval helps learning); it does not
   prove that any particular feature will raise a specific person's LSAT score
   by a specific number. The app must never claim "spaced repetition guarantees
   a 10-point increase" or similar.
2. **Most studies use classroom/lab tasks, not the LSAT.** Effects demonstrated
   with vocabulary lists or math problems do not transfer automatically to
   high-stakes reasoning tests; the app applies principles by analogy and
   should say so plainly.
3. **Desirable difficulties are not an excuse for bad UX.** Difficulty that aids
   learning is difficulty in the *task itself* (e.g., varied, delayed,
   interleaved practice), not confusion caused by poor instructions, broken
   timers, or unclear stems. If a learner struggles, the app should first check
   whether the struggle is the intended kind.
4. **Gamification evidence is mixed.** Points and streaks can motivate some
   learners and distract others; the app keeps rewards tied to genuine study
   behavior and provides streak-grace mechanics so the system never pressures
   unhealthy study.
5. **Single-user telemetry is not psychometrics.** Per-question statistics
   collected on-device can flag suspicious items for review, but they cannot
   establish item validity the way LSAC's large-sample equating does. The app
   must never equate its internal readiness metric with a predicted official
   LSAT score.
6. **Official questions remain the gold standard for calibration.** The built-in
   bank is original instructional material; only official LawHub PrepTests
   provide calibration to the real exam. The app must label original practice
   and official practice as different metrics and never merge them.
7. **Source freshness.** LSAT format details can change (e.g., the 2024 removal
   of Logic Games; the 2026 shift toward in-center testing). Any format facts in
   this file were verified on 2026-09-11 against LSAC pages and should be
   re-checked before major releases that depend on them.
