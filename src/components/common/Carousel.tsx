/**
 * Carousel.tsx
 * A horizontal scrolling container for anime lists.
 * Features: Smooth scrolling, dynamic arrow visibility, and hidden scrollbars.
 */

import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode;
  title?: string;
  showControls?: boolean;
}

export function Carousel({
  children,
  title,
  showControls = true,
}: CarouselProps) {
  // --- References & State ---
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // --- Scroll Logic ---
  
  /**
   * Updates arrow visibility based on the current scroll position.
   */
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Show left arrow if scrolled away from the start
      setShowLeftArrow(scrollLeft > 0);
      
      // Show right arrow if there is more content to the right (with 10px buffer)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  /**
   * Manually triggers horizontal scroll by a fixed amount.
   */
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Distance per click
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Optional Section Title */}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
          {title}
        </h2>
      )}

      {/* Main Container */}
      <div className="relative group">
        
        {/* Navigation: Left Arrow */}
        {showControls && showLeftArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-primary rounded-full transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} className="text-white" />
          </motion.button>
        )}

        {/* Scrollable Viewport */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex gap-4 sm:gap-6 pb-4">
            {children}
          </div>
        </div>

        {/* Navigation: Right Arrow */}
        {showControls && showRightArrow && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-primary rounded-full transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} className="text-white" />
          </motion.button>
        )}
      </div>

      {/* Global Style Override: Hide scrollbar across browsers */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Chrome, Safari, and Opera */
        }
      `}</style>
    </div>
  );
}