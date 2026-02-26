/**
 * WatchlistPage.tsx
 * Displays user's saved watchlist items with filtering and resume functionality
 * Shows anime added to watchlist from other pages
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/layout/Container';
import { AnimeGrid } from '../../components/common/AnimeGrid';
import { AnimeCard } from '../../components/common/AnimeCard';
import { Pagination } from '../../components/common/Pagination';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { kitsuService } from '../../services/kitsuService';
import type { Anime } from '../../types/anime';
import { Play, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimeCharacters from '../../assets/images/AnimeCharacters.svg';


const ANIME_PER_PAGE = typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 30;

type WatchStatus = 'all' | 'watching' | 'plan' | 'completed';

interface WatchlistItem {
  id: string;
  status: WatchStatus;
}

export function WatchlistPage() {
  const [watchlistIds, setWatchlistIds] = useLocalStorage<string[]>(
    'watchlist',
    []
  );
  const [watchlistStatus, setWatchlistStatus] = useLocalStorage<WatchlistItem[]>(
    'watchlist-status',
    []
  );
  const [watchlistAnime, setWatchlistAnime] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<WatchStatus>('all');

  useEffect(() => {
    const fetchWatchlistAnime = async () => {
      try {
        setLoading(true);

        // Get all anime and filter by watchlist IDs
        const response = await kitsuService.getTrendingAnime(200);
        const filtered = response.data.filter((anime) =>
          watchlistIds.includes(anime.id)
        );

        setWatchlistAnime(filtered);
      } catch (error) {
        console.error('Error fetching watchlist anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistAnime();
  }, [watchlistIds]);

  const handleRemoveFromWatchlist = (animeId: string) => {
    setWatchlistIds((prev) => prev.filter((id) => id !== animeId));
    setWatchlistStatus((prev) =>
      prev.filter((item) => item.id !== animeId)
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Filter anime by status
  const getStatusForAnime = (animeId: string): WatchStatus => {
    return watchlistStatus.find((item) => item.id === animeId)?.status || 'plan';
  };

  const filteredAnime =
    filterStatus === 'all'
      ? watchlistAnime
      : watchlistAnime.filter(
          (anime) => getStatusForAnime(anime.id) === filterStatus
        );

  // Pagination logic
  const totalPages = Math.ceil(filteredAnime.length / ANIME_PER_PAGE);
  const startIndex = (currentPage - 1) * ANIME_PER_PAGE;
  const paginatedAnime = filteredAnime.slice(
    startIndex,
    startIndex + ANIME_PER_PAGE
  );

  // Get first anime for hero section (resume watching)
  const featuredAnime = watchlistAnime.length > 0 ? watchlistAnime[0] : null;

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero Section - Resume Watching */}
      {featuredAnime && (
        <div className="relative py-16 sm:py-24 border-b border-primary/20 overflow-hidden">
          {/* Background with overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-dark/40 z-10" />

          <Container className="relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-sm font-bold text-primary uppercase mb-4 tracking-widest">
                Continue Watching
              </h2>
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                {featuredAnime.attributes.title}
              </h1>
              <p className="text-gray-300 max-w-2xl mb-8 line-clamp-3">
                {featuredAnime.attributes.description}
              </p>

              <div className="flex gap-4">
                <Link
                  to={`/anime/${featuredAnime.id}`}
                  className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors"
                >
                  <Play size={18} />
                  Continue Watching...
                </Link>
              </div>
            </motion.div>
          </Container>
        </div>
      )}

      {/* My Watchlist Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative py-8 border-b border-primary/20 overflow-hidden"
        style={{
          backgroundImage: `url(${AnimeCharacters})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '180px',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-dark/50 z-10" />

        {/* Content */}
        <Container className="relative z-20 h-full flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            My Watchlist
          </h1>
          <p className="text-gray-400 mt-2">
            {watchlistAnime.length} {watchlistAnime.length !== 1 ? 'Entries' : 'Entry'}
          </p>
        </Container>
      </motion.div>

      {/* Filters and Content */}
      <Container className="py-12 sm:py-16">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap sm:flex-nowrap gap-2 mb-10 overflow-x-auto"
        >
          <button
            onClick={() => {
              setFilterStatus('all');
              setCurrentPage(1);
            }}
            className={`px-3 sm:px-6 py-2 rounded-lg font-semibold transition-all text-xs sm:text-base whitespace-nowrap ${
              filterStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-card text-gray-300 hover:bg-primary/20'
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilterStatus('watching');
              setCurrentPage(1);
            }}
            className={`px-3 sm:px-6 py-2 rounded-lg font-semibold transition-all text-xs sm:text-base whitespace-nowrap ${
              filterStatus === 'watching'
                ? 'bg-primary text-white'
                : 'bg-card text-gray-300 hover:bg-primary/20'
            }`}
          >
            <Play size={16} />
            Watching
          </button>
          <button
            onClick={() => {
              setFilterStatus('plan');
              setCurrentPage(1);
            }}
            className={`px-3 sm:px-6 py-2 rounded-lg font-semibold transition-all text-xs sm:text-base whitespace-nowrap ${
              filterStatus === 'plan'
                ? 'bg-primary text-white'
                : 'bg-card text-gray-300 hover:bg-primary/20'
            }`}
          >
            <Plus size={16} />
            Plan to Watch
          </button>
          <button
            onClick={() => {
              setFilterStatus('completed');
              setCurrentPage(1);
            }}
            className={`px-3 sm:px-6 py-2 rounded-lg font-semibold transition-all text-xs sm:text-base whitespace-nowrap ${
              filterStatus === 'completed'
                ? 'bg-primary text-white'
                : 'bg-card text-gray-300 hover:bg-primary/20'
            }`}
          >
            <Check size={16} />
            Completed
          </button>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-secondary rounded-full animate-spin" />
          </div>
        ) : filteredAnime.length > 0 ? (
          <>
            {/* Count */}
            <p className="text-gray-400 mb-6">
              Showing {paginatedAnime.length} of {filteredAnime.length} Entries
            </p>

            {/* Anime Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimeGrid>
                {paginatedAnime.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onAddToWatchlist={handleRemoveFromWatchlist}
                    isInWatchlist={true}
                  />
                ))}
              </AnimeGrid>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {watchlistIds.length === 0
                ? 'Your watchlist is empty'
                : 'No anime in this category'}
            </h2>
            <p className="text-gray-400 mb-8">
              {watchlistIds.length === 0
                ? 'Start adding anime to your watchlist to track what you want to watch!'
                : 'Try a different filter to find what you are looking for.'}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/discover"
              className="inline-block px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors"
            >
              Discover Anime
            </motion.a>
          </motion.div>
        )}
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}