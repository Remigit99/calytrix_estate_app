import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { cn } from '../../lib/utils';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-(--color-primary) text-white hover:bg-(--color-primary-hover) active:bg-(--color-primary-active)',

  secondary:
    'bg-(--color-neutral-100) text-(--color-text) hover:bg-(--color-neutral-200)',

  outline:
    'border border-(--color-border-strong) bg-(--color-surface) text-(--color-text) hover:bg-(--color-surface-muted)',

  ghost:
    'text-(--color-text-secondary) hover:bg-(--color-surface-muted) hover:text-(--color-text)',

  danger:
    'bg-(--color-error) text-white hover:bg-(--color-error-700)',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-body-sm',
  md: 'h-10 px-4 text-body-sm',
  lg: 'h-12 px-5 text-body',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'rounded-(--radius-control)',
        'font-medium',
        'transition-colors duration-200',
        'focus-visible:outline-2',
        'focus-visible:outline-(--color-focus-ring)',
        'focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
};