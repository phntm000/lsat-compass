export interface ProgressBarProps {
  value: number; // 0..1
  label?: string;
  ariaLabel?: string;
}

export default function ProgressBar({ value, label, ariaLabel }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value));
  const percent = Math.round(clamped * 100);
  const name = ariaLabel ?? label ?? 'Progress';

  return (
    <div className="progress">
      {label && <span className="progress-label">{label}</span>}
      <div
        className="progress-track"
        role="progressbar"
        aria-label={name}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
