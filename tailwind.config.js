/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AniVerse custom colors
        primary: "#a855f7",      // Purple
        secondary: "#ec4899",     // Pink
        dark: "#0f0f0f",          // Near black background
        darker: "#1a1a1a",        // Slightly lighter dark
        card: "#2a2a2a",          // Card backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  plugins: [],
}