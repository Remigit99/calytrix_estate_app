import {
  forwardRef,
  type InputHTMLAttributes,
} from 'react';

import { cn } from '../../lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-body-sm font-medium text-(--color-text)"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${inputId}-error`
              : hint
                ? `${inputId}-hint`
                : undefined
          }
          className={cn(
            'h-11 w-full',
            'rounded-(--radius-control)',
            'border bg-(--color-surface)',
            'px-3.5',
            'text-body-sm text-(--color-text)',
            'placeholder:text-(--color-text-subtle)',
            'transition-colors duration-200',
            'focus:border-(--color-primary)',
            'focus:outline-none',
            'focus:ring-2 focus:ring-(--color-primary-soft)',
            'disabled:cursor-not-allowed disabled:bg-(--color-surface-muted)',
            error
              ? 'border-(--color-error)'
              : 'border-(--color-border-strong)',
            className,
          )}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-body-sm text-(--color-error)"
          >
            {error}
          </p>
        )}

        {!error && hint && (
          <p
            id={`${inputId}-hint`}
            className="mt-1.5 text-body-sm text-(--color-text-muted)"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';