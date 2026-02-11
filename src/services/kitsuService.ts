/**
 * kitsuService.ts
 * Service for all Kitsu API calls
 * Handles fetching trending anime, search, and details
 */

import axios from 'axios';
import { KitsuResponse, Anime } from '../types/anime';

// Kitsu API base URL
const KITSU_API_BASE = 'https://kitsu.io/api/edge';

/**
 * Create axios instance with default config for Kitsu API
 * Kitsu requires Content-Type header for API calls
 */
const kitsuAPI = axios.create({
  baseURL: KITSU_API_BASE,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  },
});

/**
 * Fetch trending anime sorted by user count (popularity)
 * @param limit - Number of results to return (default: 20)
 * @param offset - Pagination offset (default: 0)
 * @returns Promise with array of anime and metadata
 */
export const getTrendingAnime = async (
  limit: number = 20,
  offset: number = 0
): Promise<KitsuResponse> => {
  try {
    const response = await kitsuAPI.get<KitsuResponse>('/anime', {
      params: {
        'page[limit]': limit,
        'page[offset]': offset,
        sort: '-userCount', // Descending order (most popular first)
        fields: {
          anime: 'title,description,posterImage,averageRating,episodeCount,status,startDate,endDate,ageRating',
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    throw new Error('Failed to fetch trending anime');
  }
};

/**
 * Search for anime by title
 * @param query - Search query string
 * @param limit - Number of results (default: 20)
 * @returns Promise with matching anime
 */
export const searchAnime = async (
  query: string,
  limit: number = 20
): Promise<KitsuResponse> => {
  try {
    const response = await kitsuAPI.get<KitsuResponse>('/anime', {
      params: {
        'filter[text]': query,
        'page[limit]': limit,
        fields: {
          anime: 'title,description,posterImage,averageRating,episodeCount,status,startDate,endDate,ageRating',
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw new Error(`Failed to search anime: ${query}`);
  }
};

/**
 * Fetch detailed information about a specific anime
 * @param id - Anime ID
 * @returns Promise with anime details
 */
export const getAnimeById = async (id: string): Promise<Anime> => {
  try {
    const response = await kitsuAPI.get<{ data: Anime }>(`/anime/${id}`, {
      params: {
        fields: {
          anime: 'title,description,posterImage,coverImage,averageRating,episodeCount,status,startDate,endDate,ageRating,ageRatingGuide',
        },
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching anime ${id}:`, error);
    throw new Error(`Failed to fetch anime details`);
  }
};

/**
 * Fetch anime by specific genre
 * @param genreId - Genre ID from Kitsu
 * @param limit - Number of results
 * @returns Promise with anime in that genre
 */
export const getAnimeByGenre = async (
  genreId: string,
  limit: number = 20
): Promise<KitsuResponse> => {
  try {
    const response = await kitsuAPI.get<KitsuResponse>('/anime', {
      params: {
        'filter[genres]': genreId,
        'page[limit]': limit,
        sort: '-userCount',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    throw new Error('Failed to fetch anime by genre');
  }
};

export const kitsuService = {
  getTrendingAnime,
  searchAnime,
  getAnimeById,
  getAnimeByGenre,
};