import { z } from 'zod';
import { MovieSchema, PersonSchema, TVSchema } from '@/types/types';
import { GenreType } from '@/types/types';

interface MovieFilterList {
  sort_by: string;
  year?: number;
  with_genres?: Array<number | undefined>;
  include_adult?: boolean;
}

interface TVFilterList {
  sort_by: string;
  first_air_date_year?: number;
  with_genres?: Array<number | undefined>;
  with_status?: string;
  with_type?: string;
}
const ItemList = z.object({
  page: z.number().optional(),
  results: z.array(z.union([TVSchema, MovieSchema, PersonSchema])).optional(),
});

const FilteredMovieList = z.object({
  page: z.number().optional(),
  results: z.array(MovieSchema).optional(),
});

const FilteredTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).optional(),
});

const HomeMovieList = z.object({
  page: z.number().optional(),
  results: z.array(MovieSchema).optional(),
});

const HomeTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).optional(),
});

type FilteredMovieListType = z.infer<typeof FilteredMovieList>;
type FilteredTVListType = z.infer<typeof FilteredTVList>;
type HomeMovieListType = z.infer<typeof HomeMovieList>;
type HomeTVListType = z.infer<typeof HomeTVList>;
type MediaTypeConfig = {
  movie: {
    home: {
      fetcher: (type: string, period?: string) => Promise<HomeMovieListType>;
      paramList: {
        [key: string]: string;
      };
    };
    discover: {
      fetcher: (paramList: MovieFilterList) => Promise<FilteredMovieListType>;
      paramList: {
        sort_by: Array<string>;
        year: Array<string>;
        with_genres: Array<GenreType>;
      };
    };
  };
  tv: {
    home: {
      fetcher: (type: string, period?: string) => Promise<HomeTVListType>;
      paramList: {
        [key: string]: string;
      };
    };
    discover: {
      fetcher: (paramList: TVFilterList) => Promise<FilteredTVListType>;
      paramList: {
        sort_by: Array<string>;
        first_air_date_year: Array<string>;
        with_genres: Array<GenreType>;
        with_status: Array<string>;
        with_type: Array<string>;
      };
    };
  };
};

export {
  MovieFilterList,
  TVFilterList,
  FilteredMovieList,
  FilteredTVList,
  ItemList,
  HomeMovieList,
  HomeTVList,
  FilteredMovieListType,
  FilteredTVListType,
  HomeMovieListType,
  HomeTVListType,
  MediaTypeConfig
};
