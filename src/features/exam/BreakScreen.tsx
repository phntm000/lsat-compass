import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStudy } from '../../state/study';
import { Button, EmptyState, LoadingSkeleton, Screen, Timer } from '../../components';
import { BREAK_SECONDS, loadRunDurable } from './examStore';
import type { ExamRunState } from './examStore';
import './exam.css';

export default function BreakScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { ready, profile } = useStudy();
  const [secondsLeft, setSecondsLeft] = useState(BREAK_SECONDS);
  const doneRef = useRef(false);

  const runId = searchParams.get('runId');
  const [run, setRun] = useState<ExamRunState | null>(null);
  const [runLoaded, setRunLoaded] = useState(false);

  useEffect(() => {
    if (!runId) {
      setRunLoaded(true);
      return;
    }
    let cancelled = false;
    loadRunDurable(runId).then((r) => {
      if (cancelled) return;
      setRun(r);
      setRunLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [runId]);

  const resume = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    navigate(`/exam/run?runId=${runId}`, { replace: true });
  };
  const resumeRef = useRef(resume);
  resumeRef.current = resume;

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          resumeRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!ready || !runLoaded) {
    return (
      <Screen title="Intermission">
        <LoadingSkeleton lines={6} />
      </Screen>
    );
  }

  if (!runId || !run) {
    return (
      <Screen title="Intermission">
        <EmptyState
          title="Break not found"
          body="This intermission doesn't belong to an active exam run. It may have been cleared with site data."
          actionLabel="Back to exam setup"
          onAction={() => navigate('/exam')}
        />
      </Screen>
    );
  }

  const nextSection = run.currentSection + 1;

  return (
    <Screen title="Intermission">
      <div className="ex-break">
        <p className="ex-lede">
          Section {run.currentSection} of {run.sections.length} complete. Stand
          up, stretch, breathe — section {nextSection} starts when the timer
          ends.
        </p>
        <div className="ex-break-timer" role="timer" aria-label="Break time remaining">
          <Timer
            secondsLeft={secondsLeft}
            mode={profile?.timerMode === 'hidden' ? 'visible' : (profile?.timerMode ?? 'visible')}
            urgent={secondsLeft <= 60}
          />
        </div>
        <div className="ex-actions">
          <Button fullWidth onClick={resume}>
            Skip break — start section {nextSection}
          </Button>
          <Button variant="ghost" fullWidth onClick={() => navigate('/exam')}>
            Abandon exam
          </Button>
        </div>
        <p className="ex-note">
          Your progress is saved on this device. If you leave now, you can
          resume from section {nextSection} — the section clock keeps its
          original deadline.
        </p>
      </div>
    </Screen>
  );
}
