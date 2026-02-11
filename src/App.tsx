/**
 * App.tsx
 * Root component managing routing and global layout
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Additional routes will be added here */}
      </Routes>
    </Router>
  );
}

export default App;