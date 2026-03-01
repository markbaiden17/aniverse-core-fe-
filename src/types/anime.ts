/**
 * anime.ts
 * TypeScript interfaces for Kitsu API responses.
 * Defines the core data structures used across the application.
 */

export interface AnimeAttributes {
  title: string;
  description: string | null;
  posterImage: {
    original: string;
    large?: string;
  };
  coverImage?: {
    original: string;
    large?: string;
  };
  averageRating: number | null;
  episodeCount: number | null;
  status: 'current' | 'finished' | 'upcoming' | 'tba';
  startDate: string | null;
  endDate: string | null;
  ageRating: string | null;
  ageRatingGuide: string | null;
}

/**
 * Standard Anime Node
 * Represents a single entry in a list or search result.
 */
export interface Anime {
  id: string;
  type: string;
  attributes: AnimeAttributes;
}

/**
 * Top-level API Wrapper
 * Standard response format for collection-based endpoints.
 */
export interface KitsuResponse {
  data: Anime[];
  meta: {
    count: number;
  };
}

/**
 * Extended Details
 * Includes relationship mapping for genres and cast members.
 */
export interface AnimeDetail extends Anime {
  relationships?: {
    genres?: {
      data: Array<{ id: string; type: string }>;
    };
    castings?: {
      data: Array<{ id: string; type: string }>;
    };
  };
}