export type MasteryState = 'new' | 'learning' | 'developing' | 'stable' | 'mastered' | 'lapsed';

export interface MasteryBadgeProps {
  state: MasteryState;
}

const META: Record<MasteryState, { label: string; icon: string }> = {
  new: { label: 'New', icon: '✦' },
  learning: { label: 'Learning', icon: '◐' },
  developing: { label: 'Developing', icon: '▲' },
  stable: { label: 'Stable', icon: '●' },
  mastered: { label: 'Mastered', icon: '★' },
  lapsed: { label: 'Lapsed', icon: '↺' },
};

export default function MasteryBadge({ state }: MasteryBadgeProps) {
  const { label, icon } = META[state];
  return (
    <span className={`badge badge--${state}`}>
      <span className="badge-icon" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  );
}
