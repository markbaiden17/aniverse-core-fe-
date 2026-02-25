/**
 * kitsuService.ts
 * Using ONLY mock data - API integration will be added after routing is fixed
 */

import type { KitsuResponse, Anime } from '../types/anime';
import { mockAnimeData } from './mockData';

/**
 * Get trending anime from mock data
 */
export const getTrendingAnime = async (
  limit: number = 20
): Promise<KitsuResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    data: mockAnimeData.data.slice(0, limit),
    meta: {
      count: mockAnimeData.data.length,
    },
  };
};

/**
 * Search anime by title from mock data
 */
export const searchAnime = async (
  query: string,
  limit: number = 20
): Promise<KitsuResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const queryLower = query.toLowerCase();
  const filtered = mockAnimeData.data.filter(anime =>
    anime.attributes.title.toLowerCase().includes(queryLower)
  );

  return {
    data: filtered.slice(0, limit),
    meta: {
      count: filtered.length,
    },
  };
};

/**
 * Get anime by ID from mock data
 */
export const getAnimeById = async (id: string): Promise<Anime> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const anime = mockAnimeData.data.find(a => a.id === id);
  
  if (!anime) {
    throw new Error(`Anime with ID ${id} not found in mock data`);
  }
  
  return anime;
};

/**
 * Get anime by genre from mock data
 */
export const getAnimeByGenre = async (
  genreId: string,
  limit: number = 20
): Promise<KitsuResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    data: mockAnimeData.data.slice(0, limit),
    meta: {
      count: mockAnimeData.data.length,
    },
  };
};

export const kitsuService = {
  getTrendingAnime,
  searchAnime,
  getAnimeById,
  getAnimeByGenre,
};