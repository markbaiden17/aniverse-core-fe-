/**
 * Navbar.tsx
 * Main navigation component with logo and search bar
 * Persists at top of every page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bookmark, User } from 'lucide-react';

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              アニメAniVerse
            </motion.div>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center flex-1 max-w-md mx-4 lg:mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 bg-card border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-secondary transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right Side Icons & Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-white hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/discover"
                className="text-white hover:text-primary transition-colors font-medium"
              >
                Discover
              </Link>
            </div>
            {/* Watchlist Button with Bookmark Icon */}
            <Link
              to="/watchlist"
              className="p-2 hover:bg-card rounded-lg transition-colors text-white hover:text-primary"
              title="Watchlist"
            >
              <Bookmark size={20} />
            </Link>

            {/* Profile Icon */}
            <button
              className="p-2 hover:bg-card rounded-lg transition-colors text-white hover:text-primary"
              title="Profile Settings"
              aria-label="Profile"
            >
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anime..."
              className="w-full px-4 py-2 bg-card border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-secondary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}