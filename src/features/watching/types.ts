import { z } from 'zod';

const MovieDetailSchema = z
  .object({
    backdrop_path: z.string().nullable(),
    genres: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    ),
    id: z.number(),
    overview: z.string().nullable(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    production_companies: z.array(
      z.object({
        name: z.string(),
        id: z.number(),
        logo_path: z.string().nullable(),
      }),
    ),
    spoken_languages: z.array(
      z.object({
        name: z.string(),
      }),
    ),
    status: z.string(),
    tagline: z.string().nullable(),
    title: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
  .deepPartial();

const TVDetailSchema = z
  .object({
    backdrop_path: z.string().nullable(),
    created_by: z.array(
      z.object({
        id: z.number(),
        credit_id: z.string(),
        name: z.string(),
        gender: z.number(),
        profile_path: z.string().nullable(),
      }),
    ),
    spoken_languages: z.array(
      z.object({
        name: z.string(),
      }),
    ),
    episode_run_time: z.array(z.number()),
    first_air_date: z.string(),
    genres: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      }),
    ),
    id: z.number(),
    last_air_date: z.string(),
    last_episode_to_air: z.object({
      air_date: z.string(),
      episode_number: z.number(),
      id: z.number(),
      name: z.string(),
      overview: z.string(),
      production_code: z.string(),
      season_number: z.number(),
      still_path: z.string().nullable(),
      vote_average: z.number(),
      vote_count: z.number(),
    }),
    name: z.string(),
    next_episode_to_air: z.object({
      air_date: z.string(),
      episode_number: z.number(),
      id: z.number(),
      name: z.string(),
      overview: z.string(),
      production_code: z.string(),
      season_number: z.number(),
      still_path: z.string().nullable(),
      vote_average: z.number(),
      vote_count: z.number(),
    }).nullable(),
    networks: z.array(
      z.object({
        name: z.string(),
        id: z.number(),
        logo_path: z.string().nullable(),
      }),
    ),
    number_of_episodes: z.number(),
    number_of_seasons: z.number(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    production_companies: z.array(
      z.object({
        name: z.string(),
        id: z.number(),
        logo_path: z.string().nullable(),
      }),
    ),
    season_number: z.number(),
    seasons: z.array(
      z.object({
        air_date: z.string(),
        episode_count: z.number(),
        id: z.number(),
        name: z.string(),
        overview: z.string(),
        poster_path: z.string().nullable(),
        season_number: z.number(),
      }),
    ),
    status: z.string(),
    tagline: z.string().nullable(),
    type: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
  .deepPartial();

const PersonDetailSchema = z
  .object({
    birthday: z.string().nullable(),
    known_for_department: z.string(),
    deathday: z.string().nullable(),
    id: z.number(),
    name: z.string(),
    also_known_as: z.array(z.string()),
    gender: z.number(),
    biography: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
  })
  .deepPartial();

const VideoSchema = z
  .object({
    name: z.string(),
    key: z.string(),
  })
  .partial();

const VideoListSchema = z.object({
  results: z.array(VideoSchema),
});

const SeasonEpisodeSchema = z.object({
  air_date: z.string(),
  name: z.string(),
  episode_number: z.number(),
  still_path: z.string().nullable(),
  id: z.number(),
  overview: z.string(),
  vote_average: z.number(),
}).partial()

const SeasonSchema = z.object({
  air_date: z.string().nullable(),
  episodes: z.array(SeasonEpisodeSchema),
  name: z.string().nullable(),
}).partial()

const CastSchema = z.object({
  name: z.string(),
  profile_path: z.string().nullable(),
  character: z.string(),
}).partial()

const CrewSchema = z.object({
  name: z.string(),
  profile_path: z.string().nullable(),
  job: z.string(),
}).partial()

const CreditListSchema = z.object({
  cast: z.array(CastSchema),
  crew: z.array(CrewSchema)
}).partial()

const AuthorSchema = z.object({
  author_details: z.object({
    username: z.string(),
    avatar_path:z.string().nullable(),
    rating: z.number().nullable(),
  }),
  content: z.string(),
  created_at: z.string()
}).partial()

const ReviewListSchema = z.object({
  results: z.array(
    AuthorSchema
  )
}).partial()

const SimilarMovieSchema = z.object({
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  title: z.string(),
  vote_count: z.number(),
  vote_average: z.number(),
  overview: z.string(),
  release_date: z.string(),
  poster_path: z.string().nullable()
}).partial()

const SimilarTVSchema = z.object({
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  name: z.string(),
  vote_count: z.number(),
  vote_average: z.number(),
  overview: z.string(),
  first_air_date: z.string(),
  poster_path: z.string().nullable()
}).partial()

const SimilarListSchema = z.object({
  results: z.array(z.union([SimilarMovieSchema, SimilarTVSchema]))
}).partial()

type SeasonEpisodeType = z.infer<typeof SeasonEpisodeSchema>
type MovieDetailType = z.infer<typeof MovieDetailSchema>;
type TVDetailType = z.infer<typeof TVDetailSchema>;
type PersonDetailType = z.infer<typeof PersonDetailSchema>;
type VideoType = z.infer<typeof VideoSchema>;
type SeasonType = z.infer<typeof SeasonSchema>;
type CastType = z.infer<typeof CastSchema>;
type CrewType = z.infer<typeof CrewSchema>;
type AuthorType = z.infer<typeof AuthorSchema>;
type SimilarMovieType = z.infer<typeof SimilarMovieSchema>;
type SimilarTVType = z.infer<typeof SimilarTVSchema>;
type VideoListType = z.infer<typeof VideoListSchema>
type CreditListType = z.infer<typeof CreditListSchema>
type SimilarListType = z.infer<typeof SimilarListSchema>
type ReviewListType = z.infer<typeof ReviewListSchema>

export {
  MovieDetailSchema,
  MovieDetailType,
  TVDetailSchema,
  TVDetailType,
  PersonDetailSchema,
  PersonDetailType,
  VideoType,
  VideoListSchema,
  SeasonEpisodeSchema,
  SeasonSchema,
  SeasonEpisodeType,
  SeasonType,
  CreditListSchema,
  CastType,
  CrewType,
  AuthorType,
  ReviewListSchema,
  SimilarListSchema,
  SimilarMovieType,
  SimilarTVType,
  SimilarListType,
  VideoListType,
  CreditListType,
  ReviewListType
};
