/**
 * CarouselAnimeCard.tsx
 * Specialized anime card for carousel display
 * Details show only on hover
 */

import type { Anime } from '../../types/anime';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface CarouselAnimeCardProps {
  anime: Anime;
}

export function CarouselAnimeCard({ anime }: CarouselAnimeCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    attributes: { title, posterImage, averageRating },
  } = anime;

  const posterUrl = posterImage?.original;
  const rating = averageRating ? Math.round(averageRating) : 'N/A';

  return (
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

        {/* Details overlay - only on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 z-10 flex flex-col justify-end p-4"
          >
            <h3 className="text-white font-bold mb-3 line-clamp-2 text-sm sm:text-base">
              {title}
            </h3>
            {rating !== 'N/A' && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">⭐</span>
                <span className="text-sm text-gray-200 font-semibold">
                  {rating}%
                </span>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}