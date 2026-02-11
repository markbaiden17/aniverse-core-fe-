/**
 * anime.ts
 * TypeScript interfaces for Kitsu API responses
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

export interface Anime {
  id: string;
  type: string;
  attributes: AnimeAttributes;
}

export interface KitsuResponse {
  data: Anime[];
  meta: {
    count: number;
  };
}

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