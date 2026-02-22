import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bookmark, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              アニメAniVerse
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-card border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-secondary transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/discover"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Discover
            </Link>

            {/* Icons */}
            <Link
              to="/watchlist"
              className="text-gray-300 hover:text-primary transition-colors"
              aria-label="Watchlist"
            >
              <Bookmark size={24} />
            </Link>
            <button
              className="text-gray-300 hover:text-primary transition-colors"
              aria-label="Profile"
            >
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}