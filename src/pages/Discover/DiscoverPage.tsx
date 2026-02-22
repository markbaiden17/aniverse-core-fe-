/**
 * DiscoverPage.tsx
 * Discover/Browse page with genre filtering and pagination
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { GenreSidebar } from '../../components/sections/GenreSidebar';
import { AnimeGrid } from '../../components/common/AnimeGrid';
import { AnimeCard } from '../../components/common/AnimeCard';
import { Pagination } from '../../components/common/Pagination';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { kitsuService } from '../../services/kitsuService';
import type { Anime } from '../../types/anime';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const ANIME_PER_PAGE = 30; // 4 columns × 7 rows

export function DiscoverPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [anime, setAnime] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        if (selectedGenre) {
          response = await kitsuService.getAnimeByGenre(selectedGenre, 200);
        } else {
          response = await kitsuService.getTrendingAnime(200);
        }

        setAnime(response.data);
        setCurrentPage(1); // Reset to first page when genre changes
      } catch (err) {
        console.error('Error fetching anime:', err);
        setError('Failed to load anime. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [selectedGenre]);

  const handleAddToWatchlist = (animeId: string) => {
    setWatchlist((prev) =>
      prev.includes(animeId)
        ? prev.filter((id) => id !== animeId)
        : [...prev, animeId]
    );
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the page content
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(anime.length / ANIME_PER_PAGE);
  const startIndex = (currentPage - 1) * ANIME_PER_PAGE;
  const paginatedAnime = anime.slice(startIndex, startIndex + ANIME_PER_PAGE);

  if (error) return <ErrorDisplay message={error} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Main Content */}
      <div className="flex gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Sidebar */}
        <GenreSidebar
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />

        {/* Content Area */}
        <div className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              {selectedGenre ? 'Browse by Genre' : 'Discover Anime'}
            </h1>
            <p className="text-gray-400">
              Showing {paginatedAnime.length} of {anime.length} anime
              {selectedGenre && ` in this category`}
            </p>
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <LoadingSpinner />
          ) : paginatedAnime.length > 0 ? (
            <>
              {/* Anime Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AnimeGrid>
                  {paginatedAnime.map((animeItem) => (
                    <AnimeCard
                      key={animeItem.id}
                      anime={animeItem}
                      onAddToWatchlist={handleAddToWatchlist}
                      isInWatchlist={watchlist.includes(animeItem.id)}
                    />
                  ))}
                </AnimeGrid>
              </motion.div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No anime found for this category.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}