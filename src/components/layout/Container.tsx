/**
 * Container.tsx
 * A fundamental layout wrapper that ensures consistent alignment and spacing.
 * Features: Centralized max-width, responsive horizontal padding, and vertical gutters.
 */

import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`
      /* Layout: Center the container and set maximum allowable width */
      max-width-7xl mx-auto 
      
      /* Horizontal Padding: Scales from mobile (4) to desktop (8) */
      px-4 sm:px-6 lg:px-8 
      
      /* Vertical Padding: Standardized gutters for section separation */
      py-8 sm:py-12 
      
      /* Extension: Allows for custom class overrides from parent components */
      ${className}
    `}>
      {children}
    </div>
  );
}