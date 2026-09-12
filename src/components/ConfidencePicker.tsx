import type { KeyboardEvent } from 'react';

export type ConfidenceValue = 1 | 2 | 3 | 4 | 5;

export interface ConfidencePickerProps {
  value: ConfidenceValue | null;
  onChange: (v: ConfidenceValue) => void;
  disabled?: boolean;
}

const OPTIONS: { value: ConfidenceValue; label: string }[] = [
  { value: 1, label: 'Guessing' },
  { value: 2, label: '40%' },
  { value: 3, label: '60%' },
  { value: 4, label: '80%' },
  { value: 5, label: 'Certain' },
];

export default function ConfidencePicker({ value, onChange, disabled = false }: ConfidencePickerProps) {
  const onKeyDown = (e: KeyboardEvent, v: ConfidenceValue) => {
    const idx = OPTIONS.findIndex((o) => o.value === v);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(OPTIONS[(idx + 1) % OPTIONS.length].value);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(OPTIONS[(idx - 1 + OPTIONS.length) % OPTIONS.length].value);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(OPTIONS[0].value);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(OPTIONS[OPTIONS.length - 1].value);
    }
  };

  return (
    <div className="conf" role="radiogroup" aria-label="How confident are you?">
      {OPTIONS.map((opt) => {
        const checked = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={`${opt.value} of 5: ${opt.label}`}
            className={`conf-option${checked ? ' conf-option--active' : ''}`}
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => onKeyDown(e, opt.value)}
          >
            <span className="conf-num" aria-hidden="true">
              {opt.value}
            </span>
            <span className="conf-label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
