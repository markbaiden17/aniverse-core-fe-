/**
 * HomePage.tsx
 * The central hub of AniVerse. 
 * Orchestrates Hero visuals, featured anime spotlights, and popular content sliders.
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

// --- Assets ---
// Using SVGs for character art ensures crisp visuals across all resolutions
import G5Luffy from '../../assets/images/G5Luffy.svg';
import AnimeBackground from '../../assets/images/AnimeBackground.svg';

export function HomePage() {
  // --- State Hooks ---
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Watchlist is initialized here to ensure local storage is ready for child components
  const [_watchlist] = useLocalStorage<string[]>('watchlist', []);

  // --- Data Lifecycle ---
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch 30 items to populate both Featured and Popular sections
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

  // --- Early Returns for Data Fetching States ---
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} onRetry={handleRetry} />;

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* --- Section 1: Visual Identity --- */}
      <HeroSection
        characterImage={G5Luffy}
        backgroundImage={AnimeBackground}
      />

      {/* --- Section 2: Featured Spotlights --- */}
      {trendingAnime.length > 0 && (
        <Container className="mt-[-4rem] relative z-30"> 
          {/* Slight negative margin can help overlap the hero for a modern look */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">
              Featured Anime Picks
            </h2>
            {/* Display the top 10 as the hero carousel */}
            <FeaturedAnimeCarousel animeList={trendingAnime.slice(0, 10)} />
          </motion.div>
        </Container>
      )}

      {/* --- Section 3: Popular Content Row --- */}
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

      <Footer />
    </div>
  );
}