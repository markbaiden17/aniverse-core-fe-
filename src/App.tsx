/**
 * App.tsx
 * Root component managing routing and global layout
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { DiscoverPage } from './pages/Discover/DiscoverPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
      </Routes>
    </Router>
  );
}

export default App;