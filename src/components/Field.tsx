import { useId } from 'react';

export interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  min?: number;
  max?: number;
  hint?: string;
}

export default function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  inputMode,
  min,
  max,
  hint,
}: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="field-input"
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        min={min}
        max={max}
        aria-describedby={hint ? hintId : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
    </div>
  );
}
