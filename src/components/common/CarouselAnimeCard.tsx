/**
 * CarouselAnimeCard.tsx
 * Carousel card with title always visible below, rating on hover
 */

import type { Anime } from '../../types/anime';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface CarouselAnimeCardProps {
  anime: Anime;
}

export function CarouselAnimeCard({ anime }: CarouselAnimeCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);

  const {
    id,
    attributes: { title, posterImage, averageRating },
  } = anime;

  const posterUrl = posterImage?.original;
  const rating = averageRating ? Math.round(averageRating) : 'N/A';
  const isInWatchlist = watchlist.includes(id);

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWatchlist((prev) =>
      prev.includes(id)
        ? prev.filter((animeId) => animeId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col w-40 sm:w-48 md:w-56">
      <Link to={`/anime/${id}`} className="flex-shrink-0">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-40 sm:w-48 md:w-56 h-56 sm:h-64 md:h-72 overflow-hidden rounded-lg bg-card cursor-pointer"
        >
          {/* Image */}
          {imageLoading && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse z-0" />
          )}
          
          {!imageError && posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          {/* Dark overlay base - always visible */}
          <div className="absolute inset-0 bg-black/40 z-5" />

          {/* Rating overlay - only on hover */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center gap-3"
            >
              {rating !== 'N/A' && (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-yellow-400 text-3xl">⭐</span>
                  <span className="text-lg text-gray-200 font-semibold">
                    {rating}%
                  </span>
                </div>
              )}
              
              {/* Watchlist button on hover */}
              <button
                onClick={handleAddToWatchlist}
                className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-bold transition-all ${
                  isInWatchlist
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-primary hover:text-white'
                }`}
              >
                {isInWatchlist ? (
                  <>
                    <BookmarkCheck size={14} />
                    In List
                  </>
                ) : (
                  <>
                    <BookmarkPlus size={14} />
                    Add to List
                  </>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </Link>

      {/* Title below card - always visible with ellipsis */}
      <div style={{ width: '160px', overflow: 'hidden' }}>
        <h3 className="text-white font-bold text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h3>
      </div>
    </div>
  );
}