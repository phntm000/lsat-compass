export type ChoiceState = 'default' | 'selected' | 'correct' | 'incorrect' | 'eliminated';

export interface ChoiceButtonProps {
  letter: string;
  text: string;
  state?: ChoiceState;
  disabled?: boolean;
  onClick?: () => void;
  name?: string;
}

const STATE_SR: Record<ChoiceState, string | null> = {
  default: null,
  selected: 'Selected',
  correct: 'Correct answer',
  incorrect: 'Incorrect answer',
  eliminated: 'Eliminated',
};

const STATE_ICON: Record<ChoiceState, string | null> = {
  default: null,
  selected: '●',
  correct: '✓',
  incorrect: '✗',
  eliminated: null,
};

export default function ChoiceButton({
  letter,
  text,
  state = 'default',
  disabled = false,
  onClick,
  name,
}: ChoiceButtonProps) {
  const checked = state === 'selected' || state === 'correct';
  const srNote = STATE_SR[state];
  const icon = STATE_ICON[state];
  const accessibleName = `${name ? `${name}, ` : ''}choice ${letter}: ${text}`;
  const className = ['choice', `choice--${state}`].join(' ');

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={accessibleName}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="choice-letter" aria-hidden="true">
        {letter}
      </span>
      <span className="choice-text">{text}</span>
      {icon && (
        <span className="choice-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {srNote && <span className="sr-only">{srNote}</span>}
    </button>
  );
}
