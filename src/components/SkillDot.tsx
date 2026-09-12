import type { MasteryState } from './MasteryBadge';

export interface SkillDotProps {
  state: MasteryState;
  size?: number;
}

const LABELS: Record<MasteryState, string> = {
  new: 'New',
  learning: 'Learning',
  developing: 'Developing',
  stable: 'Stable',
  mastered: 'Mastered',
  lapsed: 'Lapsed',
};

export default function SkillDot({ state, size = 10 }: SkillDotProps) {
  const label = LABELS[state];
  return (
    <span
      className={`skill-dot skill-dot--${state}`}
      style={{ width: size, height: size }}
      title={label}
      role="img"
      aria-label={label}
    />
  );
}
