/** @type {import('tailwindcss').Config} */
export default {
  // Define paths to all template files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // AniVerse custom color palette
      colors: {
        primary: "#a855f7",    // Brand Purple
        secondary: "#ec4899",  // Brand Pink
        dark: "#0f0f0f",       // Main background
        darker: "#1a1a1a",     // Surface/Overlay
        card: "#2a2a2a",       // Component containers
      },

      // Typography settings
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      // Extended spacing scale for large layouts
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },

  // Third-party plugins
  plugins: [],
}