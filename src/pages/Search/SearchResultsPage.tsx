/**
 * SearchResultsPage.tsx
 * Displays search results for anime queries
 * Results are sorted by relevance (title match score)
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/layout/Container';
import { AnimeGrid } from '../../components/common/AnimeGrid';
import { AnimeCard } from '../../components/common/AnimeCard';
import { Pagination } from '../../components/common/Pagination';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { kitsuService } from '../../services/kitsuService';
import type { Anime } from '../../types/anime';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const ANIME_PER_PAGE = 30;

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);

  useEffect(() => {
    const performSearch = async () => {
      try {
        setLoading(true);
        
        if (!query.trim()) {
          setResults([]);
          setLoading(false);
          return;
        }

        // Search anime using the service
        const response = await kitsuService.searchAnime(query, 100);
        
        // Sort by relevance (exact matches first, then partial matches)
        const queryLower = query.toLowerCase();
        const sorted = response.data.sort((a, b) => {
          const aTitle = a.attributes.title.toLowerCase();
          const bTitle = b.attributes.title.toLowerCase();
          
          // Exact match gets highest priority
          if (aTitle === queryLower) return -1;
          if (bTitle === queryLower) return 1;
          
          // Starts with query gets second priority
          if (aTitle.startsWith(queryLower)) return -1;
          if (bTitle.startsWith(queryLower)) return 1;
          
          // Contains query gets third priority
          if (aTitle.includes(queryLower)) return -1;
          if (bTitle.includes(queryLower)) return 1;
          
          return 0;
        });

        setResults(sorted);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error searching anime:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const handleAddToWatchlist = (animeId: string) => {
    setWatchlist((prev) =>
      prev.includes(animeId)
        ? prev.filter((id) => id !== animeId)
        : [...prev, animeId]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(results.length / ANIME_PER_PAGE);
  const startIndex = (currentPage - 1) * ANIME_PER_PAGE;
  const paginatedResults = results.slice(startIndex, startIndex + ANIME_PER_PAGE);

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      {/* Header */}
      <Container className="py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Search Results
          </h1>
          <p className="text-gray-400 mb-8">
            {!query ? (
              'Enter a search term to find anime'
            ) : (
              <>
                Found <span className="text-primary font-bold">{results.length}</span> result{results.length !== 1 ? 's' : ''} for{' '}
                <span className="text-primary font-bold">"{query}"</span>
              </>
            )}
          </p>
        </motion.div>
      </Container>

      {/* Results Section */}
      <Container className="py-12 sm:py-16">
        {loading ? (
          <LoadingSpinner />
        ) : !query.trim() ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              What are you looking for?
            </h2>
            <p className="text-gray-400">
              Use the search bar above to find your favorite anime
            </p>
          </motion.div>
        ) : results.length > 0 ? (
          <>
            {/* Anime Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimeGrid>
                {paginatedResults.map((anime) => (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onAddToWatchlist={handleAddToWatchlist}
                    isInWatchlist={watchlist.includes(anime.id)}
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
              No results found for "{query}"
            </h2>
            <p className="text-gray-400">
              Try searching for a different anime title
            </p>
          </motion.div>
        )}
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}