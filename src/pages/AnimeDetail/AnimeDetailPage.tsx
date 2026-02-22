/**
 * AnimeDetailPage.tsx
 * Detailed view for a single anime with synopsis, details, and recommendations
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Share2, BookmarkPlus } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/layout/Container';
import { Carousel } from '../../components/common/Carousel';
import { CarouselAnimeCard } from '../../components/common/CarouselAnimeCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { kitsuService } from '../../services/kitsuService';
import type { Anime } from '../../types/anime';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [similarAnime, setSimilarAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);

        // Always fetch Naruto (ID '1') regardless of which anime was clicked
        const animeData = await kitsuService.getAnimeById('1');
        setAnime(animeData);

        // Fetch similar anime
        const allAnime = await kitsuService.getTrendingAnime(100);
        const similar = allAnime.data
          .filter((a) => a.id !== '1')
          .slice(0, 10);
        setSimilarAnime(similar);
      } catch (err) {
        console.error('Error fetching anime details:', err);
        setError('Failed to load anime details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const handleAddToWatchlist = () => {
    if (!anime) return;
    setWatchlist((prev) =>
      prev.includes(anime.id)
        ? prev.filter((animeId) => animeId !== anime.id)
        : [...prev, anime.id]
    );
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={handleRetry} />;
  if (!anime) return <ErrorDisplay message="Anime not found." onRetry={handleRetry} />;

  const {
    attributes: {
      title,
      description,
      averageRating,
      episodeCount,
      status,
    },
  } = anime;

  const rating = averageRating ? Math.round(averageRating) : 'N/A';
  const isInWatchlist = watchlist.includes(anime.id);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero Section - Title Centered */}
      <div className="relative py-16 sm:py-24 bg-gradient-to-b from-primary/20 to-transparent border-b border-primary/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8">
              {title}
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors"
            >
              <Play size={24} />
              Start Watching
            </motion.button>
          </motion.div>
        </Container>
      </div>

      {/* Main Content Section */}
      <Container className="py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Left: Poster Placeholder and Actions */}
          <div className="flex flex-col gap-6">
            {/* Poster Placeholder - Taller */}
            <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-2 border-primary/30 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Poster</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToWatchlist}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                  isInWatchlist
                    ? 'bg-primary text-white hover:bg-secondary'
                    : 'bg-card border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                <BookmarkPlus size={20} />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-card border-2 border-gray-600 text-gray-300 hover:text-white hover:border-primary rounded-lg font-bold transition-all">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>

          {/* Right: Synopsis and Details (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Synopsis Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-primary">▶</span> Synopsis
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                {description}
              </p>

              {/* Rating */}
              {rating !== 'N/A' && (
                <p className="text-gray-300 mt-4">
                  <span className="text-gray-400">Rating:</span>{' '}
                  <span className="font-bold text-white">{rating}%</span>
                </p>
              )}
            </div>

            {/* Details - Horizontal List */}
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Type</p>
                <p className="text-white font-bold">Anime</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Episodes</p>
                <p className="text-white font-bold">{episodeCount || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Status</p>
                <p className="text-white font-bold capitalize">{status}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Source</p>
                <p className="text-white font-bold">Manga</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* More Like This Section */}
      {similarAnime.length > 0 && (
        <Container className="py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                More Like This
              </h2>
              <Link
                to="/discover"
                className="text-primary hover:text-secondary transition-colors"
              >
                View All
              </Link>
            </div>

            <Carousel showControls={true}>
              {similarAnime.map((animeItem) => (
                <CarouselAnimeCard key={animeItem.id} anime={animeItem} />
              ))}
            </Carousel>
          </motion.div>
        </Container>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}