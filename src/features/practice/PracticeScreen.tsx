import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Screen from '../../components/Screen';
import {
  Button,
  LoadingSkeleton,
  SegmentedControl,
  Sheet,
  SkillDot,
} from '../../components';
import { useStudy } from '../../state/study';
import { allSkills } from '../../content';
import SessionScreen from './SessionRunner';
import SingleQuestionScreen from './SingleQuestionScreen';
import './practice.css';

const MINUTES = ['10', '15', '20', '30'];

interface ModeCard {
  id: string;
  title: string;
  desc: string;
  cta: string;
  onStart: (minutes: string) => void;
  disabled?: boolean;
  badge?: string;
}

function PracticeHub() {
  const navigate = useNavigate();
  const { ready, reviewPlan, mastery } = useStudy();
  const [minutes, setMinutes] = useState('15');
  const [drillSheetOpen, setDrillSheetOpen] = useState(false);

  if (!ready) {
    return (
      <Screen title="Practice">
        <LoadingSkeleton lines={6} />
      </Screen>
    );
  }

  const due = reviewPlan?.totalDue ?? 0;
  const reviewCta = due > 0 ? 'Start review' : 'Nothing due';
  const reviewDesc =
    due > 0
      ? `${due} item${due === 1 ? '' : 's'} due${reviewPlan?.capped ? ' (capped for today)' : ''} — spaced review locks in what you've learned.`
      : "Nothing due — you're all caught up. New reviews appear as you practice.";

  const start = (qs: string) => navigate(`/practice/session?${qs}&minutes=${minutes}`);

  const cards: ModeCard[] = [
    {
      id: 'drill',
      title: 'Drill',
      desc: 'Blocked practice on one skill — reps until it clicks.',
      cta: 'Choose skill',
      onStart: () => setDrillSheetOpen(true),
    },
    {
      id: 'mixed',
      title: 'Mixed set',
      desc: 'Interleaved questions across skills, test-style.',
      cta: 'Start mixed set',
      onStart: (m) => start(`mode=mixed&minutes=${m}`),
    },
    {
      id: 'timed',
      title: 'Timed set',
      desc: 'Test pace, countdown clock, no peeking at answers.',
      cta: 'Start timed set',
      onStart: (m) => start(`mode=timed&minutes=${m}`),
    },
    {
      id: 'review',
      title: 'Review queue',
      desc: reviewDesc,
      cta: reviewCta,
      disabled: due === 0,
      onStart: (m) => start(`mode=review&minutes=${m}`),
    },
    {
      id: 'weakness-repair',
      title: 'Weakness repair',
      desc: 'Drills + questions targeting your lowest mastery skills.',
      cta: 'Start repair',
      onStart: (m) => start(`mode=weakness-repair&minutes=${m}`),
    },
    {
      id: 'error-log',
      title: 'Error log',
      desc: 'Retry questions you missed — analogous new ones, same skills.',
      cta: 'Start error log',
      onStart: (m) => start(`mode=error-log&minutes=${m}`),
    },
    {
      id: 'contrast',
      title: 'Contrast training',
      desc: 'Tell confusing skill pairs apart, side by side.',
      cta: 'Start contrast',
      onStart: (m) => start(`mode=contrast&minutes=${m}`),
    },
    {
      id: 'full-section',
      title: 'Full 35-min section',
      desc: 'A complete LR section simulation under exam conditions.',
      cta: 'Go to Exam',
      onStart: () => navigate('/exam'),
    },
  ];

  return (
    <Screen title="Practice">
      <div className="ph-hub">
        <div className="ph-minutes">
          <span className="ph-minutes-label">Session length</span>
          <SegmentedControl
            options={MINUTES.map((m) => ({ value: m, label: `${m} min` }))}
            value={minutes}
            onChange={setMinutes}
            ariaLabel="Session length in minutes"
          />
        </div>

        <div className="ph-cards">
          {cards.map((c) => (
            <article key={c.id} className="ph-card">
              <div className="ph-card-body">
                <h2>{c.title}</h2>
                <p>{c.desc}</p>
              </div>
              <Button variant={c.id === 'timed' || c.id === 'full-section' ? 'primary' : 'ghost'} disabled={c.disabled} onClick={() => c.onStart(minutes)}>
                {c.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>

      <Sheet open={drillSheetOpen} onClose={() => setDrillSheetOpen(false)} title="Choose a skill to drill">
        <div className="ph-skill-list">
          {allSkills.map((s) => (
            <button
              key={s.id}
              type="button"
              className="ph-skill-row"
              onClick={() => {
                setDrillSheetOpen(false);
                start(`mode=drill&skills=${s.id}`);
              }}
            >
              <SkillDot state={mastery[s.id]?.state ?? 'new'} />
              <span className="ph-skill-name">{s.title}</span>
              <span className="ph-skill-mastery" aria-hidden="true">
                {mastery[s.id] ? `${Math.round(mastery[s.id].score)}%` : 'new'}
              </span>
            </button>
          ))}
        </div>
      </Sheet>
    </Screen>
  );
}

export default function PracticeScreen() {
  return (
    <Routes>
      <Route index element={<PracticeHub />} />
      <Route path="session" element={<SessionScreen />} />
      <Route path="q/:id" element={<SingleQuestionScreen />} />
    </Routes>
  );
}
