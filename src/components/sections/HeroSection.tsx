/**
 * HeroSection.tsx
 * Hero section with background image and call-to-action
 * Uses SVG assets for Luffy and One Piece branding
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  backgroundImage?: string;
  characterImage?: string;
  logoImage?: string;
}

export function HeroSection({
  backgroundImage,
  characterImage,
  logoImage,
}: HeroSectionProps) {
  return (
    <div 
      className="relative py-16 sm:py-24 md:py-32 border-b border-primary/20 overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay on top of background */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-dark/40 z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AniVerse
              </span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Embark on a journey of endless stories and epic adventures.
              Discover, track, and enjoy your favorite anime all in one place.
            </p>
            <Link
              to="/discover"
              className="inline-block px-8 sm:px-10 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors text-lg"
            >
              Start Exploring →
            </Link>
          </motion.div>

          {/* Right: SVG Assets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end items-center h-full"
          >
            <div className="relative w-full max-w-md h-96 sm:h-[500px] md:h-[600px]">
              {/* Character Image (Luffy) */}
              {characterImage && (
                <img
                  src={characterImage}
                  alt="Featured Character"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              )}

              {/* Logo Image (One Piece) */}
              {logoImage && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4">
                  <img
                    src={logoImage}
                    alt="Logo"
                    className="w-full h-auto drop-shadow-lg"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}