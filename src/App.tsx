/**
 * App.tsx
 * Root component managing routing and global layout.
 * This file defines the entry points for all major application features.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Page Imports ---
import { HomePage } from './pages/Home/HomePage';
import { DiscoverPage } from './pages/Discover/DiscoverPage';
import { WatchlistPage } from './pages/Watchlist/WatchlistPage';
import { AnimeDetailPage } from './pages/AnimeDetail/AnimeDetailPage';
import { SearchResultsPage } from './pages/Search/SearchResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Browse by Genre or Category */}
        <Route path="/discover" element={<DiscoverPage />} />
        
        {/* User's Personal Collection */}
        <Route path="/watchlist" element={<WatchlistPage />} />
        
        {/* Dynamic route for individual Anime Details */}
        <Route path="/anime/:id" element={<AnimeDetailPage />} />
        
        {/* Global Search Results */}
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;