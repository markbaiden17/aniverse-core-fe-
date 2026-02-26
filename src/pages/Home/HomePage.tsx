/**
 * HomePage.tsx
 * Landing page with hero section, featured anime, and popular shows
 * Main entry point for users
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/layout/Container';
import { Carousel } from '../../components/common/Carousel';
import { CarouselAnimeCard } from '../../components/common/CarouselAnimeCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { HeroSection } from '../../components/sections/HeroSection';
import { FeaturedAnimeCarousel } from '../../components/sections/FeaturedAnimeSection';
import { kitsuService } from '../../services/kitsuService';
import type { Anime } from '../../types/anime';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Import SVG assets
import G5Luffy from '../../assets/images/G5Luffy.svg';
import AnimeBackground from '../../assets/images/AnimeBackground.svg';

export function HomePage() {
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [_watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await kitsuService.getTrendingAnime(30);
        setTrendingAnime(response.data);
      } catch (err) {
        console.error('Error fetching anime:', err);
        setError(
          'Unable to load anime. Please check your connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero Section with SVG Assets */}
      <HeroSection
        characterImage={G5Luffy}
        backgroundImage={AnimeBackground}
      />

      {/* Featured Anime Carousel Section */}
      {trendingAnime.length > 0 && (
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">
              Featured Anime Picks
            </h2>
            <FeaturedAnimeCarousel animeList={trendingAnime.slice(0, 10)} />
          </motion.div>
        </Container>
      )}

      {/* Popular Shows Carousel */}
      {trendingAnime.length > 0 && (
        <Container className="py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Carousel title="Popular Shows" showControls={true}>
              {trendingAnime.map((anime) => (
                <CarouselAnimeCard key={anime.id} anime={anime} />
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