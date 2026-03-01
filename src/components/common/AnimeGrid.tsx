/**
 * AnimeGrid.tsx
 * Layout container that organizes anime cards into a responsive grid system.
 * Automatically adjusts column counts from 2 (mobile) to 5 (desktop).
 */

import type { ReactNode } from 'react';

interface AnimeGridProps {
  children: ReactNode;
}

export function AnimeGrid({ children }: AnimeGridProps) {
  return (
    <div className="
      /* Grid System: 2 cols on mobile, scaling up to 5 on large screens */
      grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
      
      /* Spacing: Tighter gap on mobile, relaxed on larger displays */
      gap-4 sm:gap-6
    ">
      {children}
    </div>
  );
}