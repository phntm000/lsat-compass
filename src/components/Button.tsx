import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'ghost' | 'danger';

export interface ButtonProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
}: ButtonProps) {
  const className = ['btn', `btn-${variant}`, fullWidth ? 'btn-full' : '']
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
