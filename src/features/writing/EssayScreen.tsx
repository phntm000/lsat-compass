import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  EmptyState,
  Field,
  LoadingSkeleton,
  Screen,
  SegmentedControl,
  Timer,
  useToast,
} from '../../components';
import { useStudy } from '../../state/study';
import { db } from '../../db/db';
import { getWritingPrompt } from './prompts';
import './writing.css';

const ANALYSIS_SECONDS = 15 * 60;
const ESSAY_SECONDS = 35 * 60;

type Stage = 'analysis' | 'essay' | 'assess';

const RUBRIC = [
  { key: 'thesis', label: 'Thesis', hint: 'Clear, specific position on the issue' },
  { key: 'perspectives', label: 'Use of perspectives', hint: 'Engages the viewpoints in the prompt' },
  { key: 'counterargument', label: 'Counterargument', hint: 'Takes the strongest objection seriously' },
  { key: 'organization', label: 'Organization', hint: 'Logical flow from introduction to conclusion' },
  { key: 'clarity', label: 'Clarity', hint: 'Precise, readable sentences' },
] as const;

const RUBRIC_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

function wordCountOf(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function draftKey(promptId: string): string {
  return `compass-essay-draft:${promptId}`;
}

interface Draft {
  notes: string;
  thesis: string;
  body: string;
}

function loadDraft(promptId: string): Draft {
  try {
    const raw = localStorage.getItem(draftKey(promptId));
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Draft>;
      return {
        notes: parsed.notes ?? '',
        thesis: parsed.thesis ?? '',
        body: parsed.body ?? '',
      };
    }
  } catch {
    // Corrupt draft: start fresh.
  }
  return { notes: '', thesis: '', body: '' };
}

/** Countdown in whole seconds. Calls onExpire exactly once when it hits zero. */
function useCountdown(totalSeconds: number, onExpire: () => void): number {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const expireRef = useRef(onExpire);
  expireRef.current = onExpire;
  const firedRef = useRef(false);

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    firedRef.current = false;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [totalSeconds]);

  useEffect(() => {
    if (secondsLeft === 0 && !firedRef.current) {
      firedRef.current = true;
      expireRef.current();
    }
  }, [secondsLeft]);

  return secondsLeft;
}

export default function EssayScreen() {
  const { promptId } = useParams<{ promptId: string }>();
  const { ready, profile } = useStudy();
  const navigate = useNavigate();
  const toast = useToast();

  const prompt = promptId ? getWritingPrompt(promptId) : undefined;

  const [stage, setStage] = useState<Stage>('analysis');
  const [draft, setDraft] = useState<Draft>(() => (promptId ? loadDraft(promptId) : { notes: '', thesis: '', body: '' }));
  const [rubric, setRubric] = useState<Record<string, number>>(() =>
    Object.fromEntries(RUBRIC.map((r) => [r.key, 3])),
  );
  const [saving, setSaving] = useState(false);

  const timerMode = profile?.timerMode ?? 'visible';

  // Auto-save the draft on every change (cleared on submit).
  useEffect(() => {
    if (!promptId || stage === 'assess') return;
    try {
      localStorage.setItem(draftKey(promptId), JSON.stringify(draft));
    } catch {
      // Storage full or unavailable: the essay is still in memory.
    }
  }, [draft, promptId, stage]);

  const analysisLeft = useCountdown(ANALYSIS_SECONDS, () => setStage('essay'));
  const essayLeft = useCountdown(ESSAY_SECONDS, () => setStage('assess'));

  if (!ready) {
    return (
      <Screen title="Timed practice">
        <LoadingSkeleton lines={8} />
      </Screen>
    );
  }

  if (!prompt) {
    return (
      <Screen title="Timed practice">
        <EmptyState
          title="Prompt not found"
          body="This writing prompt doesn't exist."
          actionLabel="Back to Writing"
          onAction={() => navigate('/writing')}
        />
      </Screen>
    );
  }

  const words = wordCountOf(draft.body);

  const saveEssay = async () => {
    if (!promptId || saving) return;
    setSaving(true);
    try {
      await db.essays.add({
        promptId,
        thesis: draft.thesis.trim(),
        body: draft.body,
        wordCount: words,
        selfAssessment: rubric,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      try {
        localStorage.removeItem(draftKey(promptId));
      } catch {
        // Draft already gone or storage blocked; nothing to do.
      }
      toast('Essay saved — nice work.', { title: 'Writing' });
      navigate('/writing');
    } catch {
      toast('Couldn’t save your essay. Try again.', { title: 'Save failed' });
      setSaving(false);
    }
  };

  const disclaimer = (
    <p className="wr-disclaimer">Argumentative Writing is unscored — this is practice only.</p>
  );

  return (
    <Screen title={prompt.title}>
      {stage === 'analysis' && (
        <div className="wr-stage">
          <div className="wr-stage-head">
            <span className="wr-stage-tag">Stage 1 of 3 · Analysis</span>
            <Timer secondsLeft={analysisLeft} mode={timerMode} urgent={analysisLeft <= 60} />
          </div>
          {disclaimer}
          <section className="wr-prompt" aria-label="Prompt">
            <p className="wr-prompt-bg">{prompt.background}</p>
            <div className="wr-perspectives">
              {prompt.perspectives.map((p) => (
                <div key={p.label} className="wr-perspective">
                  <h3 className="wr-perspective-label">{p.label}</h3>
                  <p className="wr-perspective-body">{p.body}</p>
                </div>
              ))}
            </div>
          </section>
          <label className="wr-label" htmlFor="wr-notes">
            Scratchpad — thesis, perspectives, counterargument notes
          </label>
          <textarea
            id="wr-notes"
            className="wr-textarea"
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
            placeholder="What’s the decision? Which perspective is strongest? What’s the best objection to your view?"
            rows={8}
          />
          <div className="wr-actions">
            <Button variant="primary" fullWidth onClick={() => setStage('essay')}>
              Start writing
            </Button>
            <p className="wr-fidelity-note">
              On test day you may move to the essay after 5 minutes of analysis.
            </p>
          </div>
        </div>
      )}

      {stage === 'essay' && (
        <div className="wr-stage">
          <div className="wr-stage-head">
            <span className="wr-stage-tag">Stage 2 of 3 · Essay</span>
            <Timer secondsLeft={essayLeft} mode={timerMode} urgent={essayLeft <= 60} />
          </div>
          {disclaimer}
          <Field
            label="Thesis"
            value={draft.thesis}
            onChange={(v) => setDraft((d) => ({ ...d, thesis: v }))}
            placeholder="One sentence: your position on the issue"
          />
          <div className="wr-essay-bar">
            <span className="wr-wordcount" aria-live="polite">
              {words} {words === 1 ? 'word' : 'words'}
            </span>
            <span className="wr-draft-note">Draft auto-saves on this device</span>
          </div>
          <label className="wr-label wr-sr" htmlFor="wr-essay">
            Essay
          </label>
          <textarea
            id="wr-essay"
            className="wr-textarea wr-textarea--essay"
            value={draft.body}
            onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
            placeholder="Write your essay here…"
            rows={18}
          />
          <div className="wr-actions">
            <Button variant="ghost" onClick={() => setStage('analysis')}>
              Back to analysis
            </Button>
            <Button variant="primary" onClick={() => setStage('assess')} disabled={words === 0}>
              Finish &amp; assess
            </Button>
          </div>
        </div>
      )}

      {stage === 'assess' && (
        <div className="wr-stage">
          <div className="wr-stage-head">
            <span className="wr-stage-tag">Stage 3 of 3 · Self-assessment</span>
          </div>
          {disclaimer}
          <p className="wr-assess-intro">
            Rate your essay honestly, 1 (weak) to 5 (strong). This is for your reflection — it
            doesn’t affect anything else in the app.
          </p>
          <div className="wr-rubric">
            {RUBRIC.map((r) => (
              <div key={r.key} className="wr-rubric-row">
                <div className="wr-rubric-head">
                  <span className="wr-rubric-label">{r.label}</span>
                  <span className="wr-rubric-hint">{r.hint}</span>
                </div>
                <SegmentedControl
                  options={RUBRIC_OPTIONS}
                  value={String(rubric[r.key] ?? 3)}
                  onChange={(v) => setRubric((prev) => ({ ...prev, [r.key]: Number(v) }))}
                  ariaLabel={`${r.label}, 1 to 5`}
                />
              </div>
            ))}
          </div>
          <div className="wr-actions">
            <Button variant="primary" fullWidth onClick={saveEssay} disabled={saving || words === 0}>
              {saving ? 'Saving…' : 'Save essay'}
            </Button>
          </div>
        </div>
      )}
    </Screen>
  );
}
