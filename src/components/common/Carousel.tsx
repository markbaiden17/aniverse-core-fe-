/**
 * Carousel.tsx
 * Reusable carousel component for horizontal scrolling anime lists
 * Used for featured anime and popular shows sections
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Title */}
      {title && (
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
          {title}
        </h2>
      )}

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Arrow */}
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

        {/* Carousel */}
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

        {/* Right Arrow */}
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

      {/* Hide Scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}