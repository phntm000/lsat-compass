import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Screen from '../../components/Screen';
import {
  Button,
  SegmentedControl,
  Field,
  LoadingSkeleton,
} from '../../components/index';
import { useStudy } from '../../state/study';
import './onboarding.css';

type Experience = 'brand-new' | 'some-study' | 'retaking';

const EXPERIENCE_OPTIONS: { value: Experience; label: string }[] = [
  { value: 'brand-new', label: 'Brand new' },
  { value: 'some-study', label: 'Some study' },
  { value: 'retaking', label: 'Retaking' },
];

const DAYS_OPTIONS = [2, 3, 4, 5, 6, 7].map((d) => ({
  value: String(d),
  label: String(d),
}));

const SESSION_OPTIONS = [10, 15, 20, 30, 45].map((m) => ({
  value: String(m),
  label: `${m} min`,
}));

const STEP_TITLES = [
  'Welcome',
  'How the LSAT works',
  'Your goal',
  'Your schedule',
  'How Compass works',
];

function parseScore(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  if (!/^\d+$/.test(trimmed)) return NaN;
  return Number(trimmed);
}

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { ready, updateProfile } = useStudy();

  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [targetTestDate, setTargetTestDate] = useState('');
  const [targetScore, setTargetScore] = useState('');
  const [scoreError, setScoreError] = useState<string | null>(null);
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [sessionMinutes, setSessionMinutes] = useState(20);
  const [saving, setSaving] = useState(false);

  if (!ready) {
    return (
      <Screen title="Getting ready">
        <LoadingSkeleton lines={5} />
      </Screen>
    );
  }

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const goalNext = () => {
    const parsed = parseScore(targetScore);
    if (Number.isNaN(parsed) || (parsed !== null && (parsed < 120 || parsed > 180))) {
      setScoreError('Enter a whole number between 120 and 180, or leave it blank.');
      return;
    }
    setScoreError(null);
    next();
  };

  const finish = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await updateProfile({
        onboardingComplete: true,
        isNewToLsat: experience === null ? null : experience === 'brand-new',
        targetTestDate: targetTestDate === '' ? null : targetTestDate,
        targetScore: parseScore(targetScore) ?? null,
        daysPerWeek,
        preferredSessionMinutes: sessionMinutes,
      });
      navigate('/today');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen title={STEP_TITLES[step - 1]}>
      <p className="onboarding-progress" aria-live="polite">
        Step {step} of 5
      </p>

      {step === 1 && (
        <div className="card">
          <h2 className="onboarding-title">Meet LSAT Compass</h2>
          <p className="onboarding-lede">
            A study companion for the LSAT that adapts to you — what you've
            learned, what needs review, and what to do today.
          </p>
          <ul className="onboarding-list">
            <li>
              <strong>Local-first.</strong> No account, no sign-up — everything
              stays on your device.
            </li>
            <li>
              <strong>Original practice content</strong> built for the current
              test format, plus a bridge to official practice on LawHub.
            </li>
            <li>
              <strong>Honest about progress.</strong> We track your mastery of
              each skill — never fake score predictions.
            </li>
          </ul>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h2 className="onboarding-title">The test at a glance</h2>
          <ul className="onboarding-list">
            <li>
              <strong>4 sections, 35 minutes each:</strong> 2 scored Logical
              Reasoning, 1 scored Reading Comprehension, and 1 hidden unscored
              section — you won't know which one it is.
            </li>
            <li>
              <strong>10-minute intermission</strong> after the second section.
            </li>
            <li>
              <strong>Argumentative Writing</strong> is separate and unscored:
              15 minutes to analyze, then 35 minutes to write your essay.
            </li>
          </ul>
          <p className="onboarding-note">
            That's the whole shape of the test. Compass builds your study plan
            around it.
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h2 className="onboarding-title">Where are you headed?</h2>
          <p className="onboarding-lede">
            Everything here is optional — it just helps Compass pace your plan.
          </p>
          <div className="onboarding-fields">
            <Field
              label="Target test date"
              type="date"
              value={targetTestDate}
              onChange={setTargetTestDate}
              hint="Optional — we'll pace your plan around it."
            />
            <Field
              label="Target score"
              value={targetScore}
              onChange={(v) => {
                setTargetScore(v);
                setScoreError(null);
              }}
              inputMode="numeric"
              placeholder="e.g. 165"
              hint="Optional — LSAT scores range from 120 to 180."
            />
            {scoreError && (
              <p className="onboarding-error" role="alert">
                {scoreError}
              </p>
            )}
            <div className="onboarding-segment">
              <span className="onboarding-segment-label">
                How new are you to the LSAT?
              </span>
              <SegmentedControl
                options={EXPERIENCE_OPTIONS}
                value={experience ?? ''}
                onChange={(v) => setExperience(v === '' ? null : (v as Experience))}
                ariaLabel="How new are you to the LSAT?"
              />
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <h2 className="onboarding-title">How much time do you have?</h2>
          <p className="onboarding-lede">
            Compass fits study into your real life — short sessions still move
            you forward.
          </p>
          <div className="onboarding-fields">
            <div className="onboarding-segment">
              <span className="onboarding-segment-label">
                Days per week
              </span>
              <SegmentedControl
                options={DAYS_OPTIONS}
                value={String(daysPerWeek)}
                onChange={(v) => setDaysPerWeek(Number(v))}
                ariaLabel="Days per week"
              />
            </div>
            <div className="onboarding-segment">
              <span className="onboarding-segment-label">
                Minutes per session
              </span>
              <SegmentedControl
                options={SESSION_OPTIONS}
                value={String(sessionMinutes)}
                onChange={(v) => setSessionMinutes(Number(v))}
                ariaLabel="Minutes per session"
              />
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="card">
          <h2 className="onboarding-title">Your daily loop</h2>
          <ul className="onboarding-list">
            <li>
              <strong>Learn</strong> a concept, <strong>practice</strong> it
              right away, then <strong>review</strong> it later — spaced so it
              sticks.
            </li>
            <li>
              <strong>Mastery is internal.</strong> Compass measures what you've
              actually learned — it's never a score prediction.
            </li>
            <li>
              <strong>Everything stays on your device.</strong> Your progress,
              notes, and plan never leave this phone.
            </li>
          </ul>
        </div>
      )}

      <div className="onboarding-nav">
        {step > 1 && (
          <Button variant="ghost" onClick={back} disabled={saving}>
            Back
          </Button>
        )}
        {step === 1 && (
          <Button fullWidth onClick={next}>
            Get started
          </Button>
        )}
        {step === 2 && (
          <Button fullWidth onClick={next}>
            Continue
          </Button>
        )}
        {step === 3 && (
          <>
            <Button variant="ghost" onClick={next}>
              Skip
            </Button>
            <Button fullWidth onClick={goalNext}>
              Continue
            </Button>
          </>
        )}
        {step === 4 && (
          <>
            <Button variant="ghost" onClick={next}>
              Skip
            </Button>
            <Button fullWidth onClick={next}>
              Continue
            </Button>
          </>
        )}
        {step === 5 && (
          <Button fullWidth onClick={finish} disabled={saving}>
            {saving ? 'Saving…' : 'Start learning'}
          </Button>
        )}
      </div>
    </Screen>
  );
}
