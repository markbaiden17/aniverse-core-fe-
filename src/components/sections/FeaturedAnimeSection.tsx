/**
 * FeaturedAnimeCarousel.tsx
 * Hero-style carousel for top-tier anime.
 * Features: Touch gestures for mobile, Framer Motion transitions, 
 * description sanitization, and persistent watchlist syncing.
 */

import type { Anime } from '../../types/anime';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Plus, Check } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface FeaturedAnimeCarouselProps {
  animeList: Anime[];
}

export function FeaturedAnimeCarousel({ animeList }: FeaturedAnimeCarouselProps) {
  // --- State & Refs ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // --- Data Extraction & Sanitization ---
  const currentAnime = animeList[currentIndex];
  const { id, attributes: { title, posterImage, description, averageRating } } = currentAnime;
  const isInWatchlist = watchlist.includes(id);

  // Remove leading line breaks and whitespace from API description
  const cleanDescription = description?.replace(/^(<br\s*\/?>|\s)+/gi, '');

  // --- Navigation Handlers ---
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? animeList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === animeList.length - 1 ? 0 : prev + 1));
  };

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setWatchlist((prev) =>
      prev.includes(id)
        ? prev.filter((animeId) => animeId !== id)
        : [...prev, id]
    );
  };

  // --- Touch Gesture Logic ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const difference = touchStartX.current - touchEndX.current;

    if (difference > 50) {
      handleNext(); // Swipe Left
    } else if (difference < -50) {
      handlePrevious(); // Swipe Right
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 cursor-grab active:cursor-grabbing"
        >
          {/* Main Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 sm:p-12 items-center min-h-[400px] md:min-h-96">
            
            {/* Left Column: Visual Representation */}
            <div className="flex justify-center md:justify-start">
              <div className="w-40 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-lg overflow-hidden shadow-2xl">
                {posterImage?.original && (
                  <img
                    src={posterImage.original}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Right Column: Textual Info & Controls */}
            <div className="text-center md:text-left h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col justify-between h-auto md:h-96"
              >
                <div>
                  <h3 className="text-2xl sm:text-5xl font-bold mb-2 md:mb-4 text-white line-clamp-1">
                    {title}
                  </h3>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4 md:mb-6 text-sm sm:text-base h-10 items-center">
                    {averageRating && averageRating > 0 && (
                      <div className="bg-secondary/20 px-4 py-2 rounded-lg">
                        <span className="text-gray-300">Rating: </span>
                        <span className="text-white font-bold">
                          {Math.round(averageRating)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Short Summary (Desktop Only) */}
                  <div className="hidden sm:block h-24 mb-6 overflow-hidden">
                    {cleanDescription && (
                      <p 
                        className="text-gray-300 text-sm sm:text-base line-clamp-3 md:line-clamp-4"
                        dangerouslySetInnerHTML={{ __html: cleanDescription }}
                      />
                    )}
                  </div>
                </div>

                {/* Bottom Action Group */}
                <div className="flex gap-3 justify-center md:justify-start pb-2">
                  <Link
                    to={`/anime/${id}`}
                    className="flex items-center justify-center gap-2 px-4 md:px-8 h-11 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors min-w-[50px] md:min-w-[140px]"
                  >
                    <Play size={20} className="shrink-0" />
                    <span className="hidden md:inline">Start Watching</span>
                  </Link>

                  <button
                    onClick={handleAddToWatchlist}
                    className={`flex items-center justify-center gap-2 rounded-lg transition-all font-bold px-4 md:px-0 w-auto md:w-[200px] h-11 border-2 ${
                      isInWatchlist
                        ? 'bg-primary border-primary text-white hover:bg-secondary hover:border-secondary'
                        : 'bg-transparent border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {isInWatchlist ? (
                      <>
                        <Check size={20} className="shrink-0" />
                        <span className="hidden md:inline whitespace-nowrap">In Watchlist</span>
                      </>
                    ) : (
                      <>
                        <Plus size={20} className="shrink-0" />
                        <span className="hidden md:inline whitespace-nowrap">Add to Watchlist</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- External Controls & Indicators --- */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          className="p-3 bg-primary hover:bg-secondary text-white rounded-full transition-colors z-10"
          aria-label="Previous anime"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {animeList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to anime ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 bg-primary hover:bg-secondary text-white rounded-full transition-colors z-10"
          aria-label="Next anime"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}