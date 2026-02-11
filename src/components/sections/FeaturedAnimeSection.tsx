/**
 * FeaturedAnimeCarousel.tsx
 * Carousel for featured anime with navigation buttons
 * Displays one featured anime at a time with details
 */

import type { Anime } from '../../types/anime';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react';

interface FeaturedAnimeCarouselProps {
  animeList: Anime[];
}

export function FeaturedAnimeCarousel({ animeList }: FeaturedAnimeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAnime = animeList[currentIndex];
  const { id, attributes: { title, posterImage, description, averageRating, episodeCount } } = currentAnime;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? animeList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === animeList.length - 1 ? 0 : prev + 1));
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
          className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20"
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

                {/* Description */}
                {description && (
                  <p className="text-gray-300 text-sm sm:text-base mb-8 line-clamp-4">
                    {description}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex gap-4 justify-center md:justify-start mb-8">
                  <Link
                    to={`/anime/${id}`}
                    className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors"
                  >
                    <Play size={20} />
                    Start Watching
                  </Link>
                  <button className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-card border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-lg transition-all">
                    <Plus size={20} />
                    Add to Watchlist
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