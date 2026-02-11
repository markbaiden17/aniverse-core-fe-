/**
 * kitsuService.ts
 * Service for all Kitsu API calls
 * Currently using mock data - will integrate real API once issues are resolved
 * API Endpoint: https://kitsu.app/api/edge (updated from kitsu.io)
 */

import type { KitsuResponse, Anime } from '../types/anime';
import { mockAnimeData } from './mockData';

const KITSU_API_BASE = 'https://kitsu.app/api/edge'; // Updated domain

/**
 * Fetch trending anime sorted by user count (popularity)
 * Currently returns mock data - ready to switch to real API
 */
export const getTrendingAnime = async (
  limit: number = 20,
  offset: number = 0
): Promise<KitsuResponse> => {
  try {
    // Try real API first
    const url = `${KITSU_API_BASE}/anime?page[limit]=${limit}&page[offset]=${offset}&sort=-userCount`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url);

    if (response.ok) {
      const data: KitsuResponse = await response.json();
      console.log('Real API Response:', data);
      return data;
    }

    // Fallback to mock data if API fails
    console.warn('API failed, using mock data');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const sliced = mockAnimeData.data.slice(offset, offset + limit);
    return {
      data: sliced,
      meta: {
        count: mockAnimeData.data.length,
      },
    };
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    // Return mock data on error
    const sliced = mockAnimeData.data.slice(0, limit);
    return {
      data: sliced,
      meta: {
        count: mockAnimeData.data.length,
      },
    };
  }
};

/**
 * Search for anime by title
 */
export const searchAnime = async (
  query: string,
  limit: number = 20
): Promise<KitsuResponse> => {
  try {
    const url = `${KITSU_API_BASE}/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=${limit}`;
    
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    }

    // Fallback to mock search
    const filtered = mockAnimeData.data.filter(anime =>
      anime.attributes.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      data: filtered.slice(0, limit),
      meta: {
        count: filtered.length,
      },
    };
  } catch (error) {
    console.error('Error searching anime:', error);
    throw new Error(`Failed to search anime: ${query}`);
  }
};

/**
 * Fetch detailed information about a specific anime
 */
export const getAnimeById = async (id: string): Promise<Anime> => {
  try {
    const url = `${KITSU_API_BASE}/anime/${id}`;
    
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data.data;
    }

    // Fallback to mock data
    const anime = mockAnimeData.data.find(a => a.id === id);
    if (!anime) {
      throw new Error('Anime not found');
    }
    return anime;
  } catch (error) {
    console.error(`Error fetching anime ${id}:`, error);
    throw new Error('Failed to fetch anime details');
  }
};

/**
 * Fetch anime by specific genre
 */
export const getAnimeByGenre = async (
  genreId: string,
  limit: number = 20
): Promise<KitsuResponse> => {
  try {
    const url = `${KITSU_API_BASE}/anime?filter[genres]=${genreId}&page[limit]=${limit}&sort=-userCount`;
    
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    }

    // Fallback to mock data
    return {
      data: mockAnimeData.data.slice(0, limit),
      meta: {
        count: mockAnimeData.data.length,
      },
    };
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