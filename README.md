# AniVerse - Anime Discovery Platform

A full-stack anime discovery application built with React, TypeScript, and Tailwind CSS. Discover, track, and manage your anime watchlist with real-time data from the AniList GraphQL API.

## Features

✅ **Core Functionality**
- Real-time anime data from AniList GraphQL API
- Offline support with mock data fallback
- Dynamic anime carousel (swipeable on mobile)
- Genre filtering (40+ genres)
- Advanced search with relevance sorting
- Persistent watchlist with status tracking (watching/plan/completed)
- Responsive design (mobile, tablet, desktop)
- Resume watching hero section
- Detailed anime pages with related recommendations

✅ **User Experience**
- Dark mode design with purple/pink gradient accents
- Smooth animations and transitions (Framer Motion)
- Mobile collapsible navbar with menu
- Touch gestures on carousels
- Pagination with dynamic items per page (20 mobile, 30 desktop)
- Title truncation with ellipsis for consistency
- Watchlist button state persistence

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **API**: AniList GraphQL (with Fetch API)
- **State**: React Hooks + localStorage
- **Build**: Vite
- **Deployment**: Vercel

## Project Structure
```
src/
├── components/
│   ├── layout/           (Navbar, Footer, Container, HeroSection)
│   ├── common/           (Cards, Carousel, Grid, Pagination, Loaders)
│   └── sections/         (FeaturedCarousel, GenreSidebar)
├── pages/
│   ├── Home/
│   ├── Discover/
│   ├── Watchlist/
│   ├── AnimeDetail/
│   └── Search/
├── services/
│   ├── kitsuService.ts   (AniList GraphQL API integration)
│   └── mockData.ts       (32 curated anime entries)
├── hooks/
│   ├── useLocalStorage.ts
│   └── useFetch.ts
├── types/
│   └── anime.ts          (TypeScript interfaces)
├── assets/               (SVG images)
├── App.tsx               (Router configuration)
└── main.tsx              (Entry point)
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/markbaiden17/aniverse-core.git
cd aniverse-core

# Install dependencies
npm install
```

### Development
```bash
# Terminal 1: Start CORS proxy (for local API calls)
node src/server/proxy.cjs

# Terminal 2: Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build
```bash
npm run build
```

Output will be in the `dist/` directory.

## API Integration

### AniList GraphQL API
- **Endpoint**: `https://graphql.anilist.co`
- **Authentication**: None required (public API)
- **Features**: 
  - Trending anime
  - Search by title
  - Genre filtering
  - Detailed anime information

### Mock Data Fallback
If the API fails or you're offline, the app automatically falls back to 32 curated anime entries with a 300ms simulated delay.

## Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Featured and popular anime |
| `/discover` | DiscoverPage | Browse by genre with filtering |
| `/watchlist` | WatchlistPage | Your saved anime with filters |
| `/anime/:id` | AnimeDetailPage | Full anime details |
| `/search?q=query` | SearchResultsPage | Search results |

## Key Components

### FeaturedAnimeCarousel
- Full-width carousel with poster, title, rating, synopsis
- Navigation arrows + indicator dots
- Swipeable on mobile
- Fixed height for consistency
- Watchlist toggle with state persistence

### DiscoverPage
- 40+ genre sidebar filter
- Responsive anime grid
- Pagination (20 mobile, 30 desktop)
- Auto-scroll on page change

### WatchlistPage
- Resume watching hero section
- Filter by status (All/Watching/Plan/Completed)
- Dynamic watchlist management
- Same grid layout as Discover

### AnimeDetailPage
- Full anime synopsis and metadata
- Related anime carousel
- Direct watchlist integration
- Share and navigation options

## Styling

Built with Tailwind CSS with custom configuration:
- **Fonts**: Oswald (headings), Inter (body)
- **Colors**: Dark background with purple/pink accents
- **Responsive**: Mobile-first approach
- **Custom**: Scrollbar styling, gradient overlays, smooth transitions

## Deployment

### Live App
🌐 **https://aniverse-core-fe.vercel.app**

### Deploying to Vercel
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Client-side routing configured in vercel.json
```

## Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test locally
3. Commit with descriptive messages
4. Push to GitHub
5. Vercel auto-deploys on merge to main

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Image optimization (Tailwind backgrounds)
- Efficient pagination
- Memoized callbacks with useCallback
- Dynamic imports where applicable

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Future Enhancements

- [ ] User authentication
- [ ] Personal anime ratings/reviews
- [ ] Social sharing features
- [ ] Advanced filtering (year, season, studio)
- [ ] Anime recommendations engine
- [ ] Dark/Light theme toggle
- [ ] Anime schedule/calendar view

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Author

Built with ❤️ by Mark Baiden

## Support

For issues, questions, or feedback, please open an issue on GitHub.