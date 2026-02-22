/**
 * App.tsx
 * Root component managing routing and global layout
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { DiscoverPage } from './pages/Discover/DiscoverPage';
import { WatchlistPage } from './pages/Watchlist/WatchlistPage';
import { AnimeDetailPage } from './pages/AnimeDetail/AnimeDetailPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;