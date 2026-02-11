/**
 * Footer.tsx
 * Application footer with links and branding
 */

import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darker border-t border-primary/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            {/* Added font-oswald to match your design requirements */}
            <h3 className="text-2xl font-oswald font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              アニメAniVerse 
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed font-inter">
              Your gateway to endless anime adventures. Discover, track, and
              enjoy your favorite series.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-oswald font-bold mb-4">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-primary transition-colors text-sm font-inter"
                >
                  Browse Popular
                </Link>
              </li>
              <li>
                <Link
                  to="/discover"
                  className="text-gray-400 hover:text-primary transition-colors text-sm font-inter"
                >
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/watchlist"
                  className="text-gray-400 hover:text-primary transition-colors text-sm font-inter"
                >
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links Column */}
          <div>
            <h4 className="text-white font-oswald font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-primary transition-colors text-sm font-inter"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-400 hover:text-primary transition-colors text-sm font-inter"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-400 hover:text-primary transition-colors text-sm font-inter"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links Column */}
          <div>
            <h4 className="text-white font-oswald font-bold mb-4">Connect with us</h4>
            <div className="flex gap-4">
              <a
                href="#facebook"
                className="p-2 hover:bg-primary rounded-lg transition-colors text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#twitter"
                className="p-2 hover:bg-primary rounded-lg transition-colors text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#youtube"
                className="p-2 hover:bg-primary rounded-lg transition-colors text-gray-400 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#instagram"
                className="p-2 hover:bg-primary rounded-lg transition-colors text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20 pt-8">
          {/* Bottom Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm font-inter">
              © {currentYear} AniVerse. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs font-inter">
              Data provided by{' '}
              <a
                href="https://kitsu.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors"
              >
                Kitsu API
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}