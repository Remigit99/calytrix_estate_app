import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib/utils';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

export const Card = ({
  children,
  className,
  interactive = false,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-(--radius-card)',
        'border border-(--color-border)',
        'bg-(--color-surface)',
        'shadow-(--shadow-card)',
        interactive &&
          'transition-shadow duration-200 hover:shadow-(--shadow-card-hover)',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};