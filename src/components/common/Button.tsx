/**
 * Button.tsx
 * High-level reusable button component.
 * Supports multiple visual variants, sizing scales, and loading states.
 */

import type { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  
  // --- Style Definitions ---
  
  // Core layout and transition behavior
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';

  // Color-specific themes
  const variantStyles = {
    primary: 'bg-primary hover:bg-secondary text-white disabled:bg-gray-600',
    secondary: 'bg-secondary hover:bg-primary text-white disabled:bg-gray-600',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-600',
  };

  // Dimensional scales
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      // Logic: Disable interaction if either disabled prop or loading state is true
      disabled={disabled || isLoading}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Conditional Rendering: Spinner vs Button Content */}
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}