import { useEffect, useMemo, useRef, useState } from 'react';
import type { AttemptMode } from '../../engine/types';
import { allSkills, getDrill, getPassage, getQuestion } from '../../content';
import type { Drill, Passage, Question } from '../../content';
import { useStudy } from '../../state/study';
import {
  Button,
  ChoiceButton,
  ConfidencePicker,
  EmptyState,
  LoadingSkeleton,
  SegmentedControl,
  useSafeToast,
} from '../../components';
import type { ShowToast } from '../../components';

/* ------------------------------------------------------------------ */
/* Export contract (consumed by the Exam builder — keep exact)         */
/* ------------------------------------------------------------------ */

export interface RunnerResult {
  questionId: string;
  correct: boolean;
  revealed: boolean;
  flagged: boolean;
  confidence: number | null;
  changedAnswer: boolean;
  changedDirection?: 'wrong-to-right' | 'right-to-wrong';
  responseTimeMs: number;
  hintsUsed: number;
}

export interface QuestionRunnerProps {
  questionId: string;
  mode: AttemptMode;
  sessionId?: string | null;
  deferred?: boolean;
  flagged?: boolean;
  defaultFlagged?: boolean;
  onFlagChange?: (f: boolean) => void;
  initialChoice?: number | null;
  onAnswer: (r: RunnerResult) => void;
  onExit?: () => void;
  compact?: boolean;
  /** Discrimination branch (Part XXXVI): name the question type after
   *  answering, before seeing feedback. */
  typeLabelProof?: boolean;
  /** Proof-based review (Part XLV): on a miss, name the trap before
   *  continuing. */
  trapProof?: boolean;
}

export interface DrillRunnerProps {
  drillId: string;
  onAnswer: (correct: boolean) => void;
  onExit?: () => void;
}

export interface ContrastRunnerProps {
  drillIds: string[];
  sessionId?: string | null;
  onDone: (correctCount: number, total: number) => void;
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const HINT_MODES: AttemptMode[] = ['learning', 'drill', 'review', 'mixed'];

function relDue(ts: number): string {
  const days = Math.round((ts - Date.now()) / 86_400_000);
  if (days <= 0) return 'due now';
  if (days === 1) return 'due tomorrow';
  return `due in ${days} days`;
}

function showXpAndAchievements(
  toast: ShowToast,
  outcome: { xpGained: number; newAchievements: { title: string; description: string }[] },
) {
  if (outcome.xpGained > 0) toast(`+${outcome.xpGained} XP`, { title: 'Progress' });
  for (const a of outcome.newAchievements) toast(a.description, { title: a.title });
}

/* ------------------------------------------------------------------ */
/* QuestionRunner                                                      */
/* ------------------------------------------------------------------ */

type Phase = 'answer' | 'typelabel' | 'feedback';

/** Human-readable trap labels for the proof step (Part XLV). */
const TRAP_LABELS: Record<string, string> = {
  opposite: 'Opposite — says the reverse of what was needed',
  unsupported: 'Unsupported — goes beyond the evidence',
  'too-strong': 'Too strong — overclaims',
  'scope-shift': 'Scope shift — subtly changes the subject',
  'irrelevant-true': 'True but irrelevant',
  'half-right': 'Half right — right idea, wrong detail',
  'wrong-viewpoint': 'Wrong viewpoint — wrong side’s view',
  'too-weak': 'Too weak — doesn’t do the job',
  'answers-different-question': 'Answers a different question',
  'supported-nonresponsive': 'Supported but nonresponsive',
  'keyword-match': 'Keyword match — repeats words, misses logic',
  'reverses-conditional': 'Reverses the conditional',
  'wrong-conclusion': 'Wrong conclusion',
  'restates-premise': 'Restates a premise',
  'causal-alternative': 'Causal alternative — another cause fits',
  'nec-suff-confusion': 'Confuses necessary and sufficient',
};

type ParaTag = 'none' | 'thesis' | 'evidence' | 'counterview' | 'concession';
const TAG_ORDER: ParaTag[] = ['none', 'thesis', 'evidence', 'counterview', 'concession'];
const TAG_LABEL: Record<ParaTag, string> = {
  none: 'None',
  thesis: 'Thesis',
  evidence: 'Evidence',
  counterview: 'Counterview',
  concession: 'Concession',
};
const TAG_KEY = (qid: string) => `compass-passage-tags:${qid}`;

function loadTags(qid: string): Record<number, ParaTag> {
  try {
    const raw = localStorage.getItem(TAG_KEY(qid));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    const out: Record<number, ParaTag> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (TAG_ORDER.includes(v as ParaTag) && v !== 'none') out[Number(k)] = v as ParaTag;
    }
    return out;
  } catch {
    return {};
  }
}

export function QuestionRunner({
  questionId,
  mode,
  sessionId = null,
  deferred = false,
  flagged,
  defaultFlagged = false,
  onFlagChange,
  initialChoice = null,
  onAnswer,
  onExit,
  compact = false,
  typeLabelProof = false,
  trapProof = false,
}: QuestionRunnerProps) {
  const { ready, recordQuestionAttempt, mastery } = useStudy();
  const toast = useSafeToast();

  const q: Question | undefined = useMemo(() => getQuestion(questionId), [questionId]);
  const passage: Passage | undefined = useMemo(
    () => (q && q.sectionType === 'RC' && q.passageId ? getPassage(q.passageId) : undefined),
    [q],
  );

  // Per-question state (reset when questionId changes).
  const [phase, setPhase] = useState<Phase>('answer');
  const [selected, setSelected] = useState<number | null>(initialChoice);
  const [eliminated, setEliminated] = useState<Set<number>>(new Set());
  const [eliminateMode, setEliminateMode] = useState(false);
  const [flagInternal, setFlagInternal] = useState(defaultFlagged);
  const [hintsShown, setHintsShown] = useState(0);
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [revealArmed, setRevealArmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<RunnerResult | null>(null);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [choiceTab, setChoiceTab] = useState(0);
  // Proof steps (Parts XXXVI, XLV).
  const [typePick, setTypePick] = useState<string | null>(null);
  const [typeRevealed, setTypeRevealed] = useState(false);
  const [trapPick, setTrapPick] = useState<string | null>(null);

  // RC passage pane.
  const [pane, setPane] = useState<'passage' | 'question'>('question');
  const [tags, setTags] = useState<Record<number, ParaTag>>(() => loadTags(questionId));

  const mountedAt = useRef(Date.now());
  const firstSelected = useRef<number | null>(initialChoice);

  useEffect(() => {
    setPhase('answer');
    setSelected(initialChoice);
    setEliminated(new Set());
    setEliminateMode(false);
    setFlagInternal(defaultFlagged);
    setHintsShown(0);
    setConfidence(null);
    setRevealArmed(false);
    setSubmitting(false);
    setResult(null);
    setWalkthroughOpen(false);
    setChoiceTab(0);
    setTypePick(null);
    setTypeRevealed(false);
    setTrapPick(null);
    setPane('question');
    setTags(loadTags(questionId));
    mountedAt.current = Date.now();
    firstSelected.current = initialChoice;
  }, [questionId, initialChoice, defaultFlagged]);

  const isFlagged = onFlagChange ? flagged ?? false : flagInternal;
  const setFlagged = (f: boolean) => {
    if (onFlagChange) onFlagChange(f);
    else setFlagInternal(f);
  };

  const canUseTools = !deferred && HINT_MODES.includes(mode);
  const showConfidence = !deferred;

  const flatParas = useMemo(() => {
    if (!passage) return [];
    const out: { partLabel?: string; index: number; text: string }[] = [];
    let i = 0;
    for (const part of passage.parts) {
      for (const text of part.paragraphs) {
        out.push({ partLabel: part.label, index: i, text });
        i += 1;
      }
    }
    return out;
  }, [passage]);

  /** Type-label proof options (Part XXXVI): correct type + 3 same-section distractors, shuffled. */
  const typeOptions = useMemo(() => {
    if (!q || !typeLabelProof) return null;
    const prefix = q.sectionType === 'RC' ? 'rc-' : 'lr-';
    const correct = allSkills.find((s) => s.id === q.questionType);
    const others = allSkills.filter((s) => s.id.startsWith(prefix) && s.id !== q.questionType);
    // Deterministic Fisher-Yates shuffle per question so options don't jump around.
    let h = 0;
    for (const c of q.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const rand = () => {
      h = (h * 1664525 + 1013904223) >>> 0;
      return h / 0xffffffff;
    };
    const shuffled = [...others];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const opts = [
      { id: q.questionType, label: correct?.title ?? q.questionType },
      ...shuffled.slice(0, 3).map((s) => ({ id: s.id, label: s.title })),
    ];
    let h2 = 7;
    for (const c of q.id) h2 = (h2 * 31 + c.charCodeAt(0)) >>> 0;
    return [...opts].sort(() => {
      h2 = (h2 * 1664525 + 1013904223) >>> 0;
      return h2 / 0xffffffff - 0.5;
    });
  }, [q, typeLabelProof]);

  /** Trap-proof options (Part XLV): item traps + 2 decoys, shuffled. */
  const trapOptions = useMemo(() => {
    if (!q || !trapProof) return null;
    const tags = [...new Set(q.trapTypes)].filter((t) => TRAP_LABELS[t]);
    if (tags.length === 0) return null;
    const decoys = Object.keys(TRAP_LABELS)
      .filter((t) => !tags.includes(t))
      .slice(0, 2);
    const opts = [...tags, ...decoys].map((t) => ({ id: t, label: TRAP_LABELS[t] }));
    let h = 13;
    for (const c of q.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return [...opts].sort(() => {
      h = (h * 1664525 + 1013904223) >>> 0;
      return h / 0xffffffff - 0.5;
    });
  }, [q, trapProof]);

  if (!ready) return <LoadingSkeleton lines={6} />;
  if (!q) {
    return (
      <EmptyState
        title="Question not found"
        body="This question couldn't be loaded. It may have been removed from the content bank."
        actionLabel={onExit ? 'Go back' : undefined}
        onAction={onExit}
      />
    );
  }

  const cycleTag = (idx: number) => {
    setTags((prev) => {
      const cur = prev[idx] ?? 'none';
      const next = TAG_ORDER[(TAG_ORDER.indexOf(cur) + 1) % TAG_ORDER.length];
      const n = { ...prev };
      if (next === 'none') delete n[idx];
      else n[idx] = next;
      try {
        localStorage.setItem(TAG_KEY(questionId), JSON.stringify(n));
      } catch {
        /* storage unavailable — tags simply won't persist */
      }
      return n;
    });
  };

  const onChoiceClick = (i: number) => {
    if (phase !== 'answer' || submitting) return;
    if (eliminateMode) {
      setEliminated((prev) => {
        const n = new Set(prev);
        if (n.has(i)) n.delete(i);
        else n.add(i);
        return n;
      });
      return;
    }
    if (eliminated.has(i)) return;
    if (firstSelected.current == null) firstSelected.current = i;
    setSelected(i);
  };

  const choiceState = (i: number) => {
    if (phase === 'feedback' && result) {
      if (i === q.correctIndex) return 'correct';
      if (i === selected) return result.correct ? 'correct' : 'incorrect';
      if (eliminated.has(i)) return 'eliminated';
      return 'default';
    }
    if (eliminated.has(i)) return 'eliminated';
    if (i === selected) return 'selected';
    return 'default';
  };

  const buildResult = (opts: {
    correct: boolean;
    revealed: boolean;
    conf: 1 | 2 | 3 | 4 | 5 | null;
    choice: number | null;
    rt: number;
  }): RunnerResult => {
    const changed = firstSelected.current != null && firstSelected.current !== opts.choice;
    let changedDirection: RunnerResult['changedDirection'];
    if (changed && opts.choice === q.correctIndex && firstSelected.current !== q.correctIndex) {
      changedDirection = 'wrong-to-right';
    } else if (changed && firstSelected.current === q.correctIndex && opts.choice !== q.correctIndex) {
      changedDirection = 'right-to-wrong';
    }
    return {
      questionId,
      correct: opts.correct,
      revealed: opts.revealed,
      flagged: isFlagged,
      confidence: opts.conf,
      changedAnswer: changed,
      changedDirection,
      responseTimeMs: opts.rt,
      hintsUsed: hintsShown,
    };
  };

  const submitAnswer = async (choice: number | null, conf: 1 | 2 | 3 | 4 | 5 | null) => {
    if (submitting || phase !== 'answer') return;
    setSubmitting(true);
    const rt = Date.now() - mountedAt.current;
    const correct = choice != null && choice === q.correctIndex;
    const r = buildResult({ correct, revealed: false, conf, choice, rt });
    try {
      const outcome = await recordQuestionAttempt({
        questionId,
        selectedChoice: choice ?? -1,
        responseTimeMs: rt,
        confidence: conf,
        mode,
        hintsUsed: hintsShown,
        revealedSolution: false,
        changedAnswer: r.changedAnswer,
        changedDirection: r.changedDirection,
        sessionId: sessionId ?? null,
        flagged: isFlagged,
      });
      showXpAndAchievements(toast, outcome);
      setResult(r);
      // Discrimination branch: name the type before seeing feedback.
      setPhase(typeLabelProof && !deferred ? 'typelabel' : 'feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const submitDeferred = async () => {
    if (submitting || phase !== 'answer' || selected == null) return;
    setSubmitting(true);
    const rt = Date.now() - mountedAt.current;
    const correct = selected === q.correctIndex;
    const r = buildResult({ correct, revealed: false, conf: null, choice: selected, rt });
    try {
      await recordQuestionAttempt({
        questionId,
        selectedChoice: selected,
        responseTimeMs: rt,
        confidence: null,
        mode,
        hintsUsed: hintsShown,
        revealedSolution: false,
        changedAnswer: r.changedAnswer,
        changedDirection: r.changedDirection,
        sessionId: sessionId ?? null,
        flagged: isFlagged,
      });
    } finally {
      setSubmitting(false);
    }
    onAnswer(r);
  };

  const revealAnswer = async () => {
    if (submitting || phase !== 'answer') return;
    if (!revealArmed) {
      setRevealArmed(true);
      return;
    }
    setSubmitting(true);
    const rt = Date.now() - mountedAt.current;
    const r = buildResult({ correct: false, revealed: true, conf: null, choice: null, rt });
    try {
      const outcome = await recordQuestionAttempt({
        questionId,
        selectedChoice: -1,
        responseTimeMs: rt,
        confidence: null,
        mode,
        hintsUsed: hintsShown,
        revealedSolution: true,
        changedAnswer: r.changedAnswer,
        changedDirection: r.changedDirection,
        sessionId: sessionId ?? null,
        flagged: isFlagged,
      });
      showXpAndAchievements(toast, outcome);
      setResult(r);
      setPhase('feedback');
    } finally {
      setSubmitting(false);
      setRevealArmed(false);
    }
  };

  const dueNote = mastery[q.questionType]?.dueAt
    ? `Scheduled for review — ${relDue(mastery[q.questionType].dueAt)}`
    : null;

  const isRC = q.sectionType === 'RC';

  return (
    <div className={`pr-runner${compact ? ' pr-runner--compact' : ''}`}>
      {/* Toolbar */}
      <div className="pr-toolbar" role="toolbar" aria-label="Question tools">
        <button
          type="button"
          className={`pr-tool${isFlagged ? ' pr-tool--active' : ''}`}
          aria-pressed={isFlagged}
          onClick={() => setFlagged(!isFlagged)}
        >
          <span aria-hidden="true">{isFlagged ? '⚑' : '⚐'}</span> Flag
        </button>
        <button
          type="button"
          className={`pr-tool${eliminateMode ? ' pr-tool--active' : ''}`}
          aria-pressed={eliminateMode}
          disabled={phase !== 'answer'}
          onClick={() => setEliminateMode((v) => !v)}
        >
          <span aria-hidden="true">✕</span> Eliminate
        </button>
        {onExit && (
          <button type="button" className="pr-tool pr-tool--exit" onClick={onExit}>
            Exit
          </button>
        )}
      </div>

      {/* RC passage / question toggle */}
      {isRC && passage && phase === 'answer' && (
        <div className="pr-rc-toggle">
          <SegmentedControl
            options={[
              { value: 'passage', label: 'Passage' },
              { value: 'question', label: 'Question' },
            ]}
            value={pane}
            onChange={(v) => setPane(v as 'passage' | 'question')}
            ariaLabel="Switch between passage and question"
          />
        </div>
      )}

      {isRC && passage && pane === 'passage' && phase === 'answer' ? (
        <div className="pr-passage">
          <h2 className="pr-passage-title">{passage.title}</h2>
          {flatParas.map((p) => {
            const tag = tags[p.index] ?? 'none';
            return (
              <div key={p.index} className={`pr-para${tag !== 'none' ? ' pr-para--tagged' : ''}`}>
                <div className="pr-para-head">
                  <button
                    type="button"
                    className={`pr-pmark${tag !== 'none' ? ' pr-pmark--tagged' : ''}`}
                    aria-label={`Paragraph ${p.index + 1}, tagged ${TAG_LABEL[tag]}. Tap to change role tag.`}
                    onClick={() => cycleTag(p.index)}
                  >
                    ¶{p.index + 1}
                  </button>
                  {tag !== 'none' && <span className="pr-tag-chip">{TAG_LABEL[tag]}</span>}
                </div>
                <p className="pr-para-text">{p.text}</p>
              </div>
            );
          })}
          <p className="pr-para-hint">Tap ¶ to tag each paragraph: Thesis · Evidence · Counterview · Concession.</p>
        </div>
      ) : (
        <>
          {/* Stimulus (LR only — RC questions carry an empty stimulus) */}
          {!isRC && q.stimulus.trim() !== '' && (
            <div className="pr-stimulus">
              <p>{q.stimulus}</p>
            </div>
          )}

          <h2 className="pr-stem">{q.stem}</h2>

          <div className="pr-choices" role="radiogroup" aria-label="Answer choices">
            {q.choices.map((c, i) => (
              <ChoiceButton
                key={i}
                letter={LETTERS[i]}
                text={c.text}
                state={choiceState(i)}
                disabled={phase !== 'answer' || submitting}
                onClick={() => onChoiceClick(i)}
                name={`Question ${questionId}`}
              />
            ))}
          </div>

          {/* Hints */}
          {canUseTools && phase === 'answer' && (
            <div className="pr-hints">
              {Array.from({ length: hintsShown }, (_, i) => (
                <div key={i} className="pr-hint">
                  <strong>Hint {i + 1}.</strong> {q.hints[i]}
                </div>
              ))}
              {hintsShown < q.hints.length && (
                <Button variant="ghost" onClick={() => setHintsShown((n) => Math.min(n + 1, q.hints.length))}>
                  Hint ({hintsShown + 1} of {q.hints.length})
                </Button>
              )}
            </div>
          )}

          {/* Answer actions */}
          {phase === 'answer' && !deferred && (
            <div className="pr-actions">
              {showConfidence && selected != null && (
                <div className="pr-conf">
                  <span className="pr-conf-label">How confident are you?</span>
                  <ConfidencePicker value={confidence} onChange={setConfidence} disabled={submitting} />
                </div>
              )}
              <div className="pr-action-row">
                <Button
                  variant="primary"
                  fullWidth
                  disabled={selected == null || submitting}
                  onClick={() => submitAnswer(selected, confidence)}
                >
                  {submitting ? 'Checking…' : 'Check answer'}
                </Button>
                <Button variant="ghost" disabled={submitting} onClick={() => submitAnswer(null, null)}>
                  Skip
                </Button>
              </div>
              {canUseTools && (
                <button
                  type="button"
                  className={`pr-reveal${revealArmed ? ' pr-reveal--armed' : ''}`}
                  disabled={submitting}
                  onClick={revealAnswer}
                >
                  {revealArmed ? 'Tap again to confirm — reveal the answer' : "I don't know — reveal answer"}
                </button>
              )}
            </div>
          )}

          {phase === 'answer' && deferred && (
            <div className="pr-actions">
              <Button variant="primary" fullWidth disabled={selected == null || submitting} onClick={submitDeferred}>
                {submitting ? 'Saving…' : 'Next'}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Sticky passage shortcut on narrow screens */}
      {isRC && passage && pane === 'question' && phase === 'answer' && (
        <div className="pr-passage-fab">
          <Button variant="ghost" onClick={() => setPane('passage')}>
            📖 View passage
          </Button>
        </div>
      )}

      {/* Feedback panel */}
      {phase === 'typelabel' && result && typeOptions && (
        <section className="pr-feedback" aria-live="polite" aria-label="Name the question type">
          <div className="pr-feedback-head">
            <span className="pr-feedback-icon" aria-hidden="true">🏷️</span>
            <h3>Recognition check</h3>
          </div>
          <p className="pr-feedback-choices">
            Before you see the answer: what type of question was this?
            {result.correct ? ' You got it right' : ' You missed it'} — now prove
            you can recognize the skill it tested.
          </p>
          <div className="pr-typelabel-options" role="group" aria-label="Question type options">
            {typeOptions.map((o) => {
              const isCorrect = o.id === q.questionType;
              const picked = typePick === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  disabled={typeRevealed}
                  onClick={() => {
                    setTypePick(o.id);
                    setTypeRevealed(true);
                  }}
                  className={
                    `pr-typelabel-opt` +
                    (typeRevealed && isCorrect ? ' pr-typelabel-opt--correct' : '') +
                    (typeRevealed && picked && !isCorrect ? ' pr-typelabel-opt--wrong' : '') +
                    (picked && !typeRevealed ? ' pr-typelabel-opt--picked' : '')
                  }
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          {typeRevealed && (
            <p className="pr-typelabel-result" role="status">
              {typePick === q.questionType
                ? '✓ Correct — recognition is exactly what transfers to test day.'
                : `Not quite — this was ${typeOptions.find((o) => o.id === q.questionType)?.label}. Noticing the type before you solve is the skill being trained here.`}
            </p>
          )}
          <Button
            variant="primary"
            fullWidth
            disabled={!typeRevealed}
            onClick={() => setPhase('feedback')}
          >
            See feedback
          </Button>
        </section>
      )}

      {phase === 'feedback' && result && (
        <section className="pr-feedback" aria-live="polite" aria-label="Answer feedback">
          <div className={`pr-feedback-head${result.correct ? ' pr-feedback-head--good' : ''}`}>
            <span className="pr-feedback-icon" aria-hidden="true">
              {result.correct ? '✓' : result.revealed ? '👁' : '✗'}
            </span>
            <h3>
              {result.correct ? 'Correct' : result.revealed ? 'Answer revealed' : 'Not quite'}
            </h3>
          </div>
          <p className="pr-feedback-choices">
            {result.revealed
              ? `Correct answer: ${LETTERS[q.correctIndex]}`
              : selected == null
                ? `You skipped this one · Correct: ${LETTERS[q.correctIndex]}`
                : `You chose ${LETTERS[selected]} · Correct: ${LETTERS[q.correctIndex]}`}
          </p>
          <p className="pr-feedback-quick">{q.explanationQuick}</p>

          <button
            type="button"
            className="pr-disclosure"
            aria-expanded={walkthroughOpen}
            onClick={() => setWalkthroughOpen((v) => !v)}
          >
            {walkthroughOpen ? '▾' : '▸'} Walkthrough
          </button>
          {walkthroughOpen && <p className="pr-walkthrough">{q.explanationWalkthrough}</p>}

          <div className="pr-choice-tabs">
            <span className="pr-choice-tabs-label">Each choice</span>
            <div className="pr-choice-tabrow" role="tablist" aria-label="Per-choice explanations">
              {q.choices.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={choiceTab === i}
                  className={`pr-choice-tab${choiceTab === i ? ' pr-choice-tab--active' : ''}${i === q.correctIndex ? ' pr-choice-tab--correct' : ''}`}
                  onClick={() => setChoiceTab(i)}
                >
                  {LETTERS[i]}
                </button>
              ))}
            </div>
            <p className="pr-choice-exp" role="tabpanel">
              <strong>{LETTERS[choiceTab]}.</strong> {q.choiceExplanations[choiceTab]}
            </p>
          </div>

          {q.generalLesson.trim() !== '' && (
            <div className="pr-rule">
              <h4>General rule</h4>
              <p>{q.generalLesson}</p>
            </div>
          )}

          {q.misconceptionTags.length > 0 && (
            <div className="pr-chips" aria-label="Common traps">
              {q.misconceptionTags.map((t) => (
                <span key={t} className="pr-chip">
                  {t}
                </span>
              ))}
            </div>
          )}

          {dueNote && <p className="pr-due">📅 {dueNote}</p>}

          {/* Proof-based review (Part XLV): name the trap before moving on. */}
          {trapProof && !result.correct && !result.revealed && trapOptions && (
            <div className="pr-proof" aria-label="Prove it">
              <h4>Prove it — which trap caught you?</h4>
              <p className="pr-proof-sub">
                Reading the explanation isn’t enough. Name the trap your wrong
                answer set before continuing.
              </p>
              <div className="pr-typelabel-options" role="group" aria-label="Trap options">
                {trapOptions.map((o) => {
                  const isTrap = q.trapTypes.includes(o.id);
                  const picked = trapPick === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      disabled={trapPick !== null}
                      onClick={() => setTrapPick(o.id)}
                      className={
                        `pr-typelabel-opt` +
                        (trapPick !== null && isTrap ? ' pr-typelabel-opt--correct' : '') +
                        (picked && !isTrap ? ' pr-typelabel-opt--wrong' : '')
                      }
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
              {trapPick !== null && (
                <p className="pr-typelabel-result" role="status">
                  {q.trapTypes.includes(trapPick)
                    ? '✓ Proved — you can name the error, which means you can catch it next time.'
                    : 'Not this time — the highlighted trap is the one to watch for. Re-read its explanation above.'}
                </p>
              )}
            </div>
          )}

          <Button
            variant="primary"
            fullWidth
            disabled={trapProof && !result.correct && !result.revealed && trapOptions !== null && trapPick === null}
            onClick={() => onAnswer(result)}
          >
            Continue
          </Button>
        </section>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DrillRunner                                                         */
/* ------------------------------------------------------------------ */

export function DrillRunner({ drillId, onAnswer, onExit }: DrillRunnerProps) {
  const { ready, recordDrillAttempt } = useStudy();
  const toast = useSafeToast();

  const d: Drill | undefined = useMemo(() => getDrill(drillId), [drillId]);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('answer');
  const [correct, setCorrect] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    setSelected(null);
    setPhase('answer');
    setCorrect(false);
    setSubmitting(false);
    mountedAt.current = Date.now();
  }, [drillId]);

  if (!ready) return <LoadingSkeleton lines={5} />;
  if (!d) {
    return (
      <EmptyState
        title="Drill not found"
        body="This drill couldn't be loaded. It may have been removed from the content bank."
        actionLabel={onExit ? 'Go back' : undefined}
        onAction={onExit}
      />
    );
  }

  const check = async () => {
    if (selected == null || submitting || phase !== 'answer') return;
    setSubmitting(true);
    const isCorrect = selected === d.correctIndex;
    const rt = Date.now() - mountedAt.current;
    try {
      const outcome = await recordDrillAttempt({ drillId, correct: isCorrect, responseTimeMs: rt });
      showXpAndAchievements(toast, outcome);
      setCorrect(isCorrect);
      setPhase('feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const letters = LETTERS.slice(0, d.choices.length);

  return (
    <div className="pr-runner">
      <div className="pr-drill-prompt">
        <p>{d.prompt}</p>
      </div>

      <div className="pr-choices" role="radiogroup" aria-label="Drill choices">
        {d.choices.map((c, i) => {
          const state =
            phase === 'feedback'
              ? i === d.correctIndex
                ? 'correct'
                : i === selected
                  ? 'incorrect'
                  : 'default'
              : i === selected
                ? 'selected'
                : 'default';
          return (
            <ChoiceButton
              key={i}
              letter={letters[i]}
              text={c}
              state={state}
              disabled={phase !== 'answer' || submitting}
              onClick={() => setSelected(i)}
              name={`Drill ${drillId}`}
            />
          );
        })}
      </div>

      {phase === 'answer' && (
        <div className="pr-actions">
          <Button variant="primary" fullWidth disabled={selected == null || submitting} onClick={check}>
            {submitting ? 'Checking…' : 'Check'}
          </Button>
        </div>
      )}

      {phase === 'feedback' && (
        <section className="pr-feedback" aria-live="polite" aria-label="Drill feedback">
          <div className={`pr-feedback-head${correct ? ' pr-feedback-head--good' : ''}`}>
            <span className="pr-feedback-icon" aria-hidden="true">
              {correct ? '✓' : '✗'}
            </span>
            <h3>{correct ? 'Correct' : 'Not quite'}</h3>
          </div>
          <p className="pr-feedback-quick">{d.explanation}</p>
          {d.contrastNote && (
            <div className="pr-contrast-note">
              <h4>Contrast note</h4>
              <p>{d.contrastNote}</p>
            </div>
          )}
          <Button variant="primary" fullWidth onClick={() => onAnswer(correct)}>
            Continue
          </Button>
        </section>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ContrastRunner — iterate drills, surfacing contrast notes           */
/* ------------------------------------------------------------------ */

export function ContrastRunner({ drillIds, sessionId = null, onDone }: ContrastRunnerProps) {
  const { ready, recordDrillAttempt } = useStudy();
  const toast = useSafeToast();

  const [idx, setIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('answer');
  const [correct, setCorrect] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useRef(Date.now());

  const drill: Drill | undefined = drillIds[idx] ? getDrill(drillIds[idx]) : undefined;

  // Skip missing drills.
  useEffect(() => {
    if (ready && drillIds[idx] && !getDrill(drillIds[idx])) {
      if (idx + 1 >= drillIds.length) onDone(correctCount, drillIds.length);
      else setIdx(idx + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, idx]);

  useEffect(() => {
    setSelected(null);
    setPhase('answer');
    setCorrect(false);
    setSubmitting(false);
    mountedAt.current = Date.now();
  }, [idx]);

  if (!ready) return <LoadingSkeleton lines={5} />;
  if (drillIds.length === 0) {
    return <EmptyState title="No contrast drills" body="There's nothing in this contrast set." />;
  }
  if (!drill) return <LoadingSkeleton lines={5} />;

  const check = async () => {
    if (selected == null || submitting || phase !== 'answer') return;
    setSubmitting(true);
    const isCorrect = selected === drill.correctIndex;
    const rt = Date.now() - mountedAt.current;
    try {
      const outcome = await recordDrillAttempt({ drillId: drill.id, correct: isCorrect, responseTimeMs: rt, sessionId });
      showXpAndAchievements(toast, outcome);
      setCorrect(isCorrect);
      setPhase('feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    const newCorrect = correctCount + (correct ? 1 : 0);
    if (idx + 1 >= drillIds.length) {
      onDone(newCorrect, drillIds.length);
    } else {
      setCorrectCount(newCorrect);
      setIdx(idx + 1);
    }
  };

  const letters = LETTERS.slice(0, drill.choices.length);

  return (
    <div className="pr-runner">
      <p className="pr-step">
        Contrast {idx + 1} of {drillIds.length}
      </p>
      <div className="pr-drill-prompt">
        <p>{drill.prompt}</p>
      </div>

      <div className="pr-choices" role="radiogroup" aria-label="Contrast drill choices">
        {drill.choices.map((c, i) => {
          const state =
            phase === 'feedback'
              ? i === drill.correctIndex
                ? 'correct'
                : i === selected
                  ? 'incorrect'
                  : 'default'
              : i === selected
                ? 'selected'
                : 'default';
          return (
            <ChoiceButton
              key={i}
              letter={letters[i]}
              text={c}
              state={state}
              disabled={phase !== 'answer' || submitting}
              onClick={() => setSelected(i)}
              name={`Contrast drill ${drill.id}`}
            />
          );
        })}
      </div>

      {phase === 'answer' && (
        <div className="pr-actions">
          <Button variant="primary" fullWidth disabled={selected == null || submitting} onClick={check}>
            {submitting ? 'Checking…' : 'Check'}
          </Button>
        </div>
      )}

      {phase === 'feedback' && (
        <section className="pr-feedback" aria-live="polite" aria-label="Contrast feedback">
          <div className={`pr-feedback-head${correct ? ' pr-feedback-head--good' : ''}`}>
            <span className="pr-feedback-icon" aria-hidden="true">
              {correct ? '✓' : '✗'}
            </span>
            <h3>{correct ? 'Correct' : 'Not quite'}</h3>
          </div>
          <p className="pr-feedback-quick">{drill.explanation}</p>
          {drill.contrastNote && (
            <div className="pr-contrast-note pr-contrast-note--highlight">
              <h4>⚖️ Contrast note</h4>
              <p>{drill.contrastNote}</p>
            </div>
          )}
          <Button variant="primary" fullWidth onClick={next}>
            {idx + 1 >= drillIds.length ? 'Finish set' : 'Next contrast'}
          </Button>
        </section>
      )}
    </div>
  );
}
