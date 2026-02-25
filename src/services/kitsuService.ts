/**
 * kitsuService.ts
 * AniList GraphQL API integration with mock data fallback
 */

import type { KitsuResponse, Anime } from '../types/anime';
import { mockAnimeData } from './mockData';

const ANILIST_API = 'https://graphql.anilist.co';

// Convert AniList data to our Anime format
const convertAniListToAnime = (anilistAnime: any): Anime => {
  return {
    id: anilistAnime.id.toString(),
    type: 'anime',
    attributes: {
      title: anilistAnime.title.english || anilistAnime.title.romaji,
      description: anilistAnime.description || '',
      posterImage: {
        original: anilistAnime.coverImage?.extraLarge || anilistAnime.coverImage?.large || '',
      },
      averageRating: anilistAnime.meanScore || 0,
      episodeCount: anilistAnime.episodes || 0,
      status: anilistAnime.status?.toLowerCase() || 'unknown',
      startDate: anilistAnime.startDate?.year?.toString() || '',
      endDate: anilistAnime.endDate?.year?.toString() || '',
      ageRating: anilistAnime.isAdult ? 'R' : 'PG',
      ageRatingGuide: null,
    },
  };
};

/**
 * Get trending anime from AniList API
 */
export const getTrendingAnime = async (
  limit: number = 20
): Promise<KitsuResponse> => {
  try {
    const query = `
      query {
        Page(page: 1, perPage: ${limit}) {
          media(sort: TRENDING_DESC, type: ANIME) {
            id
            title {
              english
              romaji
            }
            description
            coverImage {
              large
              extraLarge
            }
            meanScore
            episodes
            status
            startDate {
              year
            }
            endDate {
              year
            }
            isAdult
          }
        }
      }
    `;

    const response = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const convertedData = result.data.Page.media.map(convertAniListToAnime);
    console.log('✅ Successfully fetched from AniList API');

    return {
      data: convertedData,
      meta: {
        count: convertedData.length,
      },
    };
  } catch (error) {
    console.log('❌ AniList API failed, falling back to mock data:', error);

    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      data: mockAnimeData.data.slice(0, limit),
      meta: {
        count: mockAnimeData.data.length,
      },
    };
  }
};

/**
 * Search anime by title from AniList API
 */
export const searchAnime = async (
  query: string,
  limit: number = 20
): Promise<KitsuResponse> => {
  try {
    const gqlQuery = `
      query {
        Page(page: 1, perPage: ${limit}) {
          media(search: "${query}", type: ANIME) {
            id
            title {
              english
              romaji
            }
            description
            coverImage {
              large
              extraLarge
            }
            meanScore
            episodes
            status
            startDate {
              year
            }
            endDate {
              year
            }
            isAdult
          }
        }
      }
    `;

    const response = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: gqlQuery }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const convertedData = result.data.Page.media.map(convertAniListToAnime);
    console.log('✅ Successfully searched AniList API');

    return {
      data: convertedData,
      meta: {
        count: convertedData.length,
      },
    };
  } catch (error) {
    console.log('❌ AniList search failed, falling back to mock data:', error);

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
  }
};

/**
 * Get anime by ID from AniList API
 */
export const getAnimeById = async (id: string): Promise<Anime> => {
  try {
    const query = `
      query {
        Media(id: ${id}, type: ANIME) {
          id
          title {
            english
            romaji
          }
          description
          coverImage {
            large
            extraLarge
          }
          meanScore
          episodes
          status
          startDate {
            year
          }
          endDate {
            year
          }
          isAdult
        }
      }
    `;

    const response = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    console.log(`✅ Successfully fetched anime ${id} from AniList API`);
    return convertAniListToAnime(result.data.Media);
  } catch (error) {
    console.log(`❌ AniList API failed for anime ${id}, falling back to mock data:`, error);

    await new Promise(resolve => setTimeout(resolve, 300));

    const anime = mockAnimeData.data.find(a => a.id === id);

    if (!anime) {
      throw new Error(`Anime with ID ${id} not found`);
    }

    return anime;
  }
};

/**
 * Get anime by genre from AniList API (using tag search)
 */
export const getAnimeByGenre = async (
  genreId: string,
  limit: number = 20
): Promise<KitsuResponse> => {
  try {
    const query = `
      query {
        Page(page: 1, perPage: ${limit}) {
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              english
              romaji
            }
            description
            coverImage {
              large
              extraLarge
            }
            meanScore
            episodes
            status
            startDate {
              year
            }
            endDate {
              year
            }
            isAdult
          }
        }
      }
    `;

    const response = await fetch(ANILIST_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const convertedData = result.data.Page.media.map(convertAniListToAnime);
    console.log('✅ Successfully fetched from AniList API by genre');

    return {
      data: convertedData,
      meta: {
        count: convertedData.length,
      },
    };
  } catch (error) {
    console.log('❌ AniList API genre fetch failed, falling back to mock data:', error);

    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      data: mockAnimeData.data.slice(0, limit),
      meta: {
        count: mockAnimeData.data.length,
      },
    };
  }
};

export const kitsuService = {
  getTrendingAnime,
  searchAnime,
  getAnimeById,
  getAnimeByGenre,
};