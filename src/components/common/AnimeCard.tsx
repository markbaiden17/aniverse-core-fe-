/**
 * AnimeCard.tsx
 * Reusable card component for displaying anime in grid
 * Shows poster, title, rating, and action buttons
 */

import type { Anime } from '../../types/anime';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnimeCardProps {
  anime: Anime;
  onAddToWatchlist?: (animeId: string) => void;
  isInWatchlist?: boolean;
}

export function AnimeCard({
  anime,
  onAddToWatchlist,
  isInWatchlist = false,
}: AnimeCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const {
    id,
    attributes: { title, posterImage, averageRating },
  } = anime;

  const posterUrl = posterImage?.original;
  const rating = averageRating ? Math.round(averageRating) : 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/anime/${id}`}>
        <div className="relative overflow-hidden rounded-lg bg-card h-64 sm:h-72 md:h-80 cursor-pointer">
          {/* Image */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
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
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          {/* Overlay with info on hover */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-white font-bold text-sm line-clamp-2">{title}</h3>
            {rating !== 'N/A' && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm text-gray-200">{rating}%</span>
              </div>
            )}
          </div>

          {/* Rating Badge (static) */}
          {rating !== 'N/A' && (
            <div className="absolute top-3 right-3 bg-primary px-2.5 py-1 rounded text-xs sm:text-sm font-bold text-white">
              {rating}%
            </div>
          )}
        </div>
      </Link>

      {/* Card Info Below */}
      <div className="mt-3">
        <h3 className="font-bold text-sm text-white line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Watchlist Button */}
        {onAddToWatchlist && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToWatchlist(id);
            }}
            className={`mt-2 w-full py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              isInWatchlist
                ? 'bg-secondary text-white'
                : 'bg-card border border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
          </button>
        )}
      </div>
    </motion.div>
  );
}