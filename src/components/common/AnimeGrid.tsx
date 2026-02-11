/**
 * AnimeGrid.tsx
 * Container component for displaying anime cards in a responsive grid
 * Handles layout and spacing automatically
 */

import type { ReactNode } from 'react';

interface AnimeGridProps {
  children: ReactNode;
}

export function AnimeGrid({ children }: AnimeGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {children}
    </div>
  );
}