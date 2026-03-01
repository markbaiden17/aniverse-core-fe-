/**
 * AnimeDetailPage.tsx
 * Detailed view for a single anime with synopsis, details, and recommendations
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Share2, BookmarkPlus, Star } from 'lucide-react'; 
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

        if (!id) throw new Error('No anime ID provided');

        const animeData = await kitsuService.getAnimeById(id);
        setAnime(animeData);

        const allAnime = await kitsuService.getTrendingAnime(100);
        const similar = allAnime.data
          .filter((a) => a.id !== id)
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
  }, [id]);

  const handleAddToWatchlist = () => {
    if (!anime) return;
    setWatchlist((prev) =>
      prev.includes(anime.id)
        ? prev.filter((animeId) => animeId !== anime.id)
        : [...prev, anime.id]
    );
  };

  const stripHtml = (html: string | null | undefined) => {
    if (!html) return ''; 
    return html.replace(/<[^>]*>?/gm, '');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={() => window.location.reload()} />;
  if (!anime) return <ErrorDisplay message="Anime not found." onRetry={() => window.location.reload()} />;

  const {
    attributes: {
      title,
      description,
      averageRating,
      episodeCount,
      status,
      coverImage,
      posterImage,
    },
  } = anime;

  const rating = averageRating ? Math.round(averageRating) : 'N/A';
  const isInWatchlist = watchlist.includes(anime.id);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[500px] w-full overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-[length:100%_auto] bg-no-repeat bg-top z-0"
          style={{ backgroundImage: `url(${coverImage?.original || posterImage?.original})` }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-black/40 z-10" />

        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl">
              {title}
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-all shadow-xl shadow-primary/20"
            >
              <Play size={24} fill="currentColor" />
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
          className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-stretch"
        >
          {/* Left: Poster and Actions */}
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-xl border-2 border-white/5 shadow-2xl">
              <img 
                src={posterImage?.large || posterImage?.original} 
                alt={title}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToWatchlist}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold transition-all ${
                  isInWatchlist
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-card border-2 border-primary/50 text-primary hover:bg-primary/5'
                }`}
              >
                <BookmarkPlus size={20} />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-4 bg-card border-2 border-white/10 text-gray-400 hover:text-white rounded-lg font-bold transition-all">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>

          {/* Right: Synopsis and Details */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="mb-auto">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-primary rounded-full" />
                Synopsis
              </h2>
              <p className="text-gray-300 leading-relaxed text-base">
                {stripHtml(description)}
              </p>
            </div>

            {/* Score and Details Section anchored at bottom */}
            <div className="mt-12">
              {rating !== 'N/A' && (
                <div className="mb-8 inline-flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10 shadow-xl">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Star className="text-primary fill-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Score</p>
                    <p className="text-2xl font-black text-white">{rating}%</p>
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-white/5">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Type</p>
                  <p className="text-white font-bold text-lg">Anime</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Episodes</p>
                  <p className="text-white font-bold text-lg">{episodeCount || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Status</p>
                  <p className="text-white font-bold text-lg capitalize">{status}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Format</p>
                  <p className="text-white font-bold text-lg">TV Series</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Episode List Section */}
      <Container className="pb-16">
        <div className="bg-card/40 rounded-2xl border border-white/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            Episode List
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {[...Array(episodeCount || 12)].map((_, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-mono text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                  <p className="text-white font-medium text-sm group-hover:text-primary transition-colors">Episode {i + 1}</p>
                </div>
                <Play size={14} className="text-gray-600 group-hover:text-primary" />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Recommendations */}
      {similarAnime.length > 0 && (
        <div className="bg-card/20 py-20 border-t border-white/5">
          <Container>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">More Like This</h2>
                <p className="text-gray-500 text-sm">Based on genres you might enjoy</p>
              </div>
              <Link to="/discover" className="text-primary text-xs md:text-sm font-bold hover:underline whitespace-nowrap">
                View All
              </Link>
            </div>

            <Carousel showControls={true}>
              {similarAnime.map((animeItem) => (
                <CarouselAnimeCard key={animeItem.id} anime={animeItem} />
              ))}
            </Carousel>
          </Container>
        </div>
      )}

      <Footer />
    </div>
  );
}