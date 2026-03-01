/**
 * DiscoverPage.tsx
 * The primary browsing interface of the application.
 * Features: Sidebar-driven genre filtering, dynamic grid layouts, 
 * client-side pagination, and responsive item counts.
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

// --- Configuration ---
// Adjust density based on device screen width
const ANIME_PER_PAGE = typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 30;

export function DiscoverPage() {
  // --- State Management ---
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [anime, setAnime] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        if (selectedGenre) {
          response = await kitsuService.getAnimeByGenre(selectedGenre, 200);
        } else {
          // Fallback to trending if no genre is picked
          response = await kitsuService.getTrendingAnime(200);
        }

        setAnime(response.data);
        setCurrentPage(1); // Reset to first page on filter change
      } catch (err) {
        console.error('Error fetching anime:', err);
        setError('Failed to load anime. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [selectedGenre]);

  // --- Handlers ---
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
    // Visual Polish: Reset scroll position when flipping pages
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

  // --- Client-side Pagination Logic ---
  const totalPages = Math.ceil(anime.length / ANIME_PER_PAGE);
  const startIndex = (currentPage - 1) * ANIME_PER_PAGE;
  const paginatedAnime = anime.slice(startIndex, startIndex + ANIME_PER_PAGE);

  // --- UI Rendering ---
  if (error) return <ErrorDisplay message={error} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Main Layout Grid */}
      <div className="flex gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Sidebar: Persistent Genre Filter */}
        <GenreSidebar
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
        />

        {/* Dynamic Content Area */}
        <div className="flex-1">
          {/* Section Header */}
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

          {/* Result States: Loading -> Results -> Empty */}
          {loading ? (
            <LoadingSpinner />
          ) : paginatedAnime.length > 0 ? (
            <>
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

              {/* Navigation Controls */}
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

      <Footer />
    </div>
  );
}