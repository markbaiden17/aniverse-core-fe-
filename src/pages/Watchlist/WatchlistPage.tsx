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
import { Play, Plus, Check, Search } from 'lucide-react';
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

  const getStatusForAnime = (animeId: string): WatchStatus => {
    return watchlistStatus.find((item) => item.id === animeId)?.status || 'plan';
  };

  const filteredAnime =
    filterStatus === 'all'
      ? watchlistAnime
      : watchlistAnime.filter(
          (anime) => getStatusForAnime(anime.id) === filterStatus
        );

  const totalPages = Math.ceil(filteredAnime.length / ANIME_PER_PAGE);
  const startIndex = (currentPage - 1) * ANIME_PER_PAGE;
  const paginatedAnime = filteredAnime.slice(
    startIndex,
    startIndex + ANIME_PER_PAGE
  );

  const featuredAnime = watchlistAnime.length > 0 ? watchlistAnime[0] : null;

  const stripHtml = (html: string | null | undefined) => {
    if (!html) return ''; 
    return html.replace(/<[^>]*>?/gm, '');
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero Section - Resume Watching */}
      <div className="mb-12 h-[450px] relative w-full bg-dark overflow-hidden">
        {featuredAnime ? (
          <>
            <div 
              className="absolute inset-0 bg-[length:100%_auto] bg-no-repeat bg-top z-0"
              style={{ 
                backgroundImage: `url(${featuredAnime.attributes.coverImage?.original || featuredAnime.attributes.posterImage?.original})`,
              }}
            />
            <div className="absolute inset-0 bg-black/85 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent z-10" />
            
            <Container className="relative z-20 h-full flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl w-full"
              >
                <h2 className="text-sm font-bold text-primary uppercase mb-4 tracking-widest">
                  Continue Watching
                </h2>
                
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {featuredAnime.attributes.title}
                </h1>

                {/* RESTORED SYNOPSIS - Visible on all screens now */}
                <p className="text-gray-300 text-lg mb-8 line-clamp-3 leading-relaxed max-w-2xl">
                  {stripHtml(featuredAnime.attributes.description)}
                </p>

                <div className="flex gap-4">
                  <Link
                    to={`/anime/${featuredAnime.id}`}
                    /* MOBILE REDUCTION: px-6 py-3 for mobile, px-10 py-4 for desktop */
                    className="flex items-center gap-2 sm:gap-3 px-6 py-3 md:px-10 md:py-4 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-all shadow-xl hover:scale-105 text-sm md:text-base"
                  >
                    <Play size={18} fill="currentColor" />
                    Continue Watching...
                  </Link>
                </div>
              </motion.div>
            </Container>
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-dark relative">
            <Container className="text-center z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Search className="mx-auto text-primary/40 mb-4" size={48} />
                <h2 className="text-2xl font-bold text-white/90 mb-2">
                  You haven't started an anime yet
                </h2>
                <p className="text-gray-500 mb-6">Explore the catalog to add items to your watchlist.</p>
                <Link to="/discover" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
                    Discover New Series
                </Link>
              </motion.div>
            </Container>
            <div className="absolute bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full" />
          </div>
        )}
      </div>

      {/* My Watchlist Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-12 overflow-hidden"
        style={{
          backgroundImage: `url(${AnimeCharacters})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '200px',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark z-10" />

        <Container className="relative z-20 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            My Watchlist
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="h-1 w-12 bg-primary rounded-full" />
            <p className="text-gray-400 font-medium">
              {watchlistAnime.length} {watchlistAnime.length !== 1 ? 'Total Entries' : 'Entry'}
            </p>
          </div>
        </Container>
      </motion.div>

      {/* Filters and Content */}
      <Container className="py-12">
        {/* MOBILE REDUCTION & SCROLLBAR HIDE:
            1. No-wrap + horizontal scroll to keep one line on mobile.
            2. scrollbar-hide utility (standard Tailwind plugin) + inline CSS fallback. */}
        <div 
          className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 mb-12 overflow-x-auto pb-2 scrollbar-hide"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} 
        >
          {/* Fallback inline style above covers IE and Firefox; scrollbar-hide usually handles Chrome */}
          {(['all', 'watching', 'plan', 'completed'] as WatchStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold transition-all border-2 text-xs md:text-sm capitalize flex items-center gap-2 shrink-0 ${
                filterStatus === status
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                  : 'bg-transparent border-white/10 text-gray-400 hover:border-primary/50 hover:text-white'
              }`}
            >
              {status === 'watching' && <Play size={14} fill={filterStatus === 'watching' ? "currentColor" : "none"} />}
              {status === 'plan' && <Plus size={14} />}
              {status === 'completed' && <Check size={14} />}
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-gray-500 font-medium animate-pulse">Syncing your list...</p>
          </div>
        ) : filteredAnime.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-semibold text-white/90">Library</h3>
               <p className="text-sm text-gray-500">
                Displaying {paginatedAnime.length} of {filteredAnime.length}
               </p>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

            {totalPages > 1 && (
              <div className="mt-16">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-card/5 rounded-3xl border border-white/5"
          >
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
               <Plus className="text-primary" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              No entries found
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-10">
              {watchlistIds.length === 0
                ? "Your watchlist is currently empty. Start exploring to build your collection!"
                : "No anime matches this specific filter. Try switching categories."}
            </p>
            <Link
              to="/discover"
              className="inline-block px-10 py-4 bg-white text-dark hover:bg-primary hover:text-white font-bold rounded-xl transition-all"
            >
              Browse Catalog
            </Link>
          </motion.div>
        )}
      </Container>

      <Footer />
    </div>
  );
}