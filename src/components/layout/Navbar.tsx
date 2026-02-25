import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bookmark, User, Home, Binoculars, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleMobileMenuItemClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - AV on mobile, full on desktop */}
          <Link to="/" className="text-2xl font-bold flex-shrink-0">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <span className="sm:hidden">AV</span>
              <span className="hidden sm:inline">アニメAniVerse</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
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

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
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

          {/* Mobile View - Search bar and Menu */}
          <div className="sm:hidden flex items-center gap-3">
            {/* Mobile Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-xs"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-card border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary text-xs"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-secondary transition-colors"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-primary transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Collapsible Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-primary/20 bg-dark">
            <div className="px-4 py-4 space-y-3 flex flex-col">
              <Link
                to="/"
                onClick={handleMobileMenuItemClick}
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors py-2"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link
                to="/discover"
                onClick={handleMobileMenuItemClick}
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors py-2"
              >
                <Binoculars size={20} />
                <span>Discover</span>
              </Link>
              <Link
                to="/watchlist"
                onClick={handleMobileMenuItemClick}
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors py-2"
              >
                <Bookmark size={20} />
                <span>Watchlist</span>
              </Link>
              <button
                onClick={handleMobileMenuItemClick}
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors py-2"
              >
                <User size={20} />
                <span>Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}