import type { HTMLAttributes } from 'react';

import { cn } from '../../lib/utils';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export const Container = ({
  className,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn('container-page', className)}
      {...props}
    />
  );
};