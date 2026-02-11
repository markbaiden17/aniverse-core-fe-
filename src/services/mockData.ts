/**
 * mockData.ts
 * Mock anime data for development
 * Replace with real Kitsu API data once API issues are resolved
 */

import type { KitsuResponse } from '../types/anime';

export const mockAnimeData: KitsuResponse = {
  data: [
    {
      id: '1',
      type: 'anime',
      attributes: {
        title: 'Naruto',
        description:
          'Naruto Uzumaki, a hyperactive and knuckle-headed ninja, lives in Konohagakure Village at the periphery of the land.',
        posterImage: {
          original:
            'https://media.kitsu.io/anime/poster_images/1/large.jpg',
        },
        averageRating: 78,
        episodeCount: 220,
        status: 'finished',
        startDate: '2002-10-03',
        endDate: '2007-02-08',
        ageRating: 'PG',
        ageRatingGuide: null,
      },
    },
    {
      id: '5',
      type: 'anime',
      attributes: {
        title: 'Cowboy Bebop',
        description:
          'In 2071, space travel is routine, and Interstellar Police is busy chasing criminals around the solar system.',
        posterImage: {
          original:
            'https://media.kitsu.io/anime/poster_images/5/large.jpg',
        },
        averageRating: 88,
        episodeCount: 26,
        status: 'finished',
        startDate: '1998-04-03',
        endDate: '1999-04-24',
        ageRating: 'PG',
        ageRatingGuide: null,
      },
    },
    {
      id: '6',
      type: 'anime',
      attributes: {
        title: 'Trigun',
        description:
          'Vash the Stampede is the man with a price on his head. The bad news is they call him the "Human Typhoon" and on the desert planet he lives on.',
        posterImage: {
          original:
            'https://media.kitsu.io/anime/poster_images/6/large.jpg',
        },
        averageRating: 76,
        episodeCount: 26,
        status: 'finished',
        startDate: '1998-04-01',
        endDate: '1999-09-30',
        ageRating: 'PG',
        ageRatingGuide: null,
      },
    },
    {
      id: '7',
      type: 'anime',
      attributes: {
        title: 'One Piece',
        description:
          'As a child, Monkey D. Luffy was inspired to become a pirate by listening to the tales of the buccaneer "Red-Haired" Shanks.',
        posterImage: {
          original:
            'https://media.kitsu.io/anime/poster_images/7/large.jpg',
        },
        averageRating: 84,
        episodeCount: 1100,
        status: 'current',
        startDate: '1999-10-20',
        endDate: null,
        ageRating: 'PG',
        ageRatingGuide: null,
      },
    },
    {
      id: '8',
      type: 'anime',
      attributes: {
        title: 'Neon Genesis Evangelion',
        description:
          'In the year 2015, the world stands on the brink of destruction. Humanity has created giant robots known as Evangelions to fight.',
        posterImage: {
          original:
            'https://media.kitsu.io/anime/poster_images/8/large.jpg',
        },
        averageRating: 74,
        episodeCount: 26,
        status: 'finished',
        startDate: '1995-10-04',
        endDate: '1996-03-27',
        ageRating: 'R',
        ageRatingGuide: null,
      },
    },
    {
      id: '9',
      type: 'anime',
      attributes: {
        title: 'Attack on Titan',
        description:
          'Shingeki no Kyojin, many years ago, the last remnants of humanity were forced to retreat behind the towering walls of a walled city.',
        posterImage: {
          original:
            'https://media.kitsu.io/anime/poster_images/9/large.jpg',
        },
        averageRating: 85,
        episodeCount: 139,
        status: 'finished',
        startDate: '2013-04-07',
        endDate: '2023-04-04',
        ageRating: 'R',
        ageRatingGuide: null,
      },
    },
    {
      id: '11',
      type: 'anime',
      attributes: {
        title: 'Death Note',
        description:
          'Light Yagami is a shinigami who finds a notebook that allows him to kill anyone by writing their name.',
        posterImage: {
          original:
            'https://media.kitsu.io/anime/poster_images/11/large.jpg',
        },
        averageRating: 88,
        episodeCount: 37,
        status: 'finished',
        startDate: '2006-10-04',
        endDate: '2007-06-27',
        ageRating: 'R',
        ageRatingGuide: null,
      },
    },
    {
      id: '12',
      type: 'anime',
      attributes: {
        title: 'Fullmetal Alchemist',
        description:
          'Two brothers, Edward and Alphonse Elric, are the sons of Trisha Elric. After their mother is killed, they attempt a forbidden alchemical.',
        posterImage: {
          original:
            'https://media.kitsu.io/anime/poster_images/12/large.jpg',
        },
        averageRating: 86,
        episodeCount: 51,
        status: 'finished',
        startDate: '2005-07-09',
        endDate: '2010-07-04',
        ageRating: 'PG',
        ageRatingGuide: null,
      },
    },
  ],
  meta: {
    count: 30,
  },
};