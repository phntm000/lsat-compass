import { useNavigate } from 'react-router-dom';
import { useStudy } from '../../state/study';
import { Button, LoadingSkeleton, Screen, SegmentedControl } from '../../components';
import { useState } from 'react';
import { TEST_STRUCTURE } from '../../config/lsatFacts';
import './exam.css';

const TS = TEST_STRUCTURE.value;

export default function ExamSetupScreen() {
  const { ready } = useStudy();
  const navigate = useNavigate();
  const [sectionKind, setSectionKind] = useState<'LR' | 'RC'>('LR');

  if (!ready) {
    return (
      <Screen title="Exam">
        <LoadingSkeleton lines={8} />
      </Screen>
    );
  }

  return (
    <Screen title="Exam">
      <p className="ex-lede">
        Test-day conditions: strict 35-minute sections, no feedback until the
        end, and a navigator to review flagged questions before time runs out.
      </p>

      <section className="ex-card" aria-labelledby="ex-sim-title">
        <h2 id="ex-sim-title">Full simulation</h2>
        <ul className="ex-list">
          <li>
            {TS.sections} timed sections × {TS.minutesPerSection} minutes ({TS.scoredLR} scored LR, {TS.scoredRC} scored RC, plus 1 hidden unscored variable section)
          </li>
          <li>{TS.intermissionMinutes}-minute intermission after {TS.intermissionAfter}</li>
          <li>
            One section is an unscored experimental (variable) section. It is
            <strong> not identified during the test</strong> — treat every
            section as if it counts.
          </li>
        </ul>
        <Button fullWidth onClick={() => navigate('/exam/run?mode=sim')}>
          Start full simulation
        </Button>
      </section>

      <section className="ex-card" aria-labelledby="ex-section-title">
        <h2 id="ex-section-title">Single timed section</h2>
        <p className="ex-muted">One 35-minute section, scored at the end.</p>
        <SegmentedControl
          options={[
            { value: 'LR', label: 'Logical Reasoning' },
            { value: 'RC', label: 'Reading Comprehension' },
          ]}
          value={sectionKind}
          onChange={(v) => setSectionKind(v as 'LR' | 'RC')}
          ariaLabel="Section type"
        />
        <div className="ex-actions">
          <Button fullWidth onClick={() => navigate(`/exam/run?mode=section&kind=${sectionKind}`)}>
            Start {sectionKind === 'LR' ? 'LR' : 'RC'} section
          </Button>
        </div>
      </section>

      <p className="ex-note">
        Original practice material — not an official LSAT. Scores shown after
        the exam are practice accuracy, never a 120–180 scaled score.
      </p>
    </Screen>
  );
}
