/**
 * GenreSidebar.tsx
 * Left sidebar with genre list for filtering
 */

import type { Genre } from '../../types/genre';
import { ANIME_GENRES } from '../../types/genre';
import { motion } from 'framer-motion';

interface GenreSidebarProps {
  selectedGenre: string | null;
  onSelectGenre: (genreId: string | null) => void;
}

export function GenreSidebar({ selectedGenre, onSelectGenre }: GenreSidebarProps) {
  return (
    <aside className="hidden lg:block w-40 flex-shrink-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-20 bg-card rounded-lg p-6 max-h-[calc(100vh-100px)] overflow-y-auto"
      >
        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
          Genres
        </h3>

        <div className="space-y-0">
          {/* All Genres Button */}
          <button
            onClick={() => onSelectGenre(null)}
            className={`w-full text-left px-4 py-3 transition-all text-sm font-medium border-l-2 ${
              selectedGenre === null
                ? 'bg-primary/10 border-primary text-primary'
                : 'border-transparent text-gray-300 hover:text-white hover:border-primary/50'
            }`}
          >
            All Genres
          </button>

          {/* Genre List */}
          {ANIME_GENRES.map((genre, index) => (
            <div key={genre.id}>
              <button
                onClick={() => onSelectGenre(genre.id)}
                className={`w-full text-left px-4 py-3 transition-all text-sm font-medium border-l-2 ${
                  selectedGenre === genre.id
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-primary/50'
                }`}
              >
                {genre.name}
              </button>

              {/* Divider */}
              {genre.id === '7' && (
                <div className="h-px bg-gradient-to-r from-primary to-transparent my-3" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </aside>
  );
}