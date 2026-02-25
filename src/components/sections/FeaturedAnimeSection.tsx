/**
 * FeaturedAnimeCarousel.tsx
 * Carousel for featured anime with navigation buttons
 * Displays one featured anime at a time with details
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentAnime = animeList[currentIndex];
  const { id, attributes: { title, posterImage, description, averageRating, episodeCount } } = currentAnime;

  const isInWatchlist = watchlist.includes(id);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const difference = touchStartX.current - touchEndX.current;

    // Swiped left (show next)
    if (difference > 50) {
      handleNext();
    }
    // Swiped right (show previous)
    else if (difference < -50) {
      handlePrevious();
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 sm:p-12 items-center">
            {/* Left: Poster Image */}
            <div className="flex justify-center md:justify-start">
              <div className="w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 rounded-lg overflow-hidden shadow-2xl">
                {posterImage?.original && (
                  <img
                    src={posterImage.original}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Right: Information */}
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
                  {title}
                </h3>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6 text-sm sm:text-base">
                  {episodeCount && (
                    <div className="bg-primary/20 px-4 py-2 rounded-lg">
                      <span className="text-gray-300">Episodes: </span>
                      <span className="text-white font-bold">{episodeCount}</span>
                    </div>
                  )}
                  {averageRating && (
                    <div className="bg-secondary/20 px-4 py-2 rounded-lg">
                      <span className="text-gray-300">Rating: </span>
                      <span className="text-white font-bold">
                        {Math.round(averageRating)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Description - Hidden on mobile */}
                {description && (
                  <p className="hidden sm:block text-gray-300 text-sm sm:text-base mb-8 line-clamp-4">
                    {description}
                  </p>
                )}

                {/* Buttons - Desktop: Full buttons, Mobile: Icons only */}
                <div className="flex gap-2 sm:gap-4 justify-center md:justify-start mb-8">
                  <Link
                    to={`/anime/${id}`}
                    className="flex items-center gap-2 px-3 sm:px-8 py-2 sm:py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors"
                  >
                    <Play size={18} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Start Watching</span>
                  </Link>
                  <button
                    onClick={handleAddToWatchlist}
                    className={`flex items-center gap-2 px-3 sm:px-8 py-2 sm:py-3 font-bold rounded-lg transition-all ${
                      isInWatchlist
                        ? 'bg-primary text-white hover:bg-secondary'
                        : 'bg-card border-2 border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {isInWatchlist ? (
                      <>
                        <Check size={18} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">In Watchlist</span>
                      </>
                    ) : (
                      <>
                        <Plus size={18} className="sm:w-5 sm:h-5" />
                        <span className="hidden sm:inline">Add to Watchlist</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          className="p-3 bg-primary hover:bg-secondary text-white rounded-full transition-colors z-10"
          aria-label="Previous anime"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Indicator dots */}
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