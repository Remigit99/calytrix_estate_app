import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib/utils';

type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  children: ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral:
    'bg-(--color-neutral-100) text-(--color-neutral-700)',

  primary:
    'bg-(--color-primary-soft) text-(--color-primary-700)',

  success:
    'bg-(--color-success-soft) text-(--color-success-700)',

  warning:
    'bg-(--color-warning-soft) text-(--color-warning-700)',

  error:
    'bg-(--color-error-soft) text-(--color-error-700)',

  info:
    'bg-(--color-info-soft) text-(--color-info-700)',
};

export const Badge = ({
  variant = 'neutral',
  className,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'rounded-full',
        'px-2.5 py-1',
        'text-caption font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};