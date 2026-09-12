export type TimerMode = 'visible' | 'minimized' | 'hidden';

export interface TimerProps {
  secondsLeft: number;
  mode?: TimerMode;
  urgent?: boolean;
}

function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rest = s % 60;
  return `${m}:${rest.toString().padStart(2, '0')}`;
}

export default function Timer({ secondsLeft, mode = 'visible', urgent = false }: TimerProps) {
  const label = formatTime(secondsLeft);

  if (mode === 'hidden') {
    // Screen-reader announcer only; the runner owns urgent announcements.
    return <span className="sr-only" role="timer" aria-live="polite" />;
  }

  if (mode === 'minimized') {
    return (
      <span className={`timer-chip${urgent ? ' timer-chip--urgent' : ''}`} role="timer">
        <span aria-hidden="true">⏱</span> {label}
      </span>
    );
  }

  return (
    <div
      className={`timer${urgent ? ' timer--urgent' : ''}`}
      role="timer"
      aria-label={`Time remaining: ${label}`}
    >
      {label}
    </div>
  );
}
