import { z } from 'zod';
import { MovieSchema, PersonSchema, TVSchema } from '@/types/types';
import { GenreType } from '@/types/types';

interface MovieFilterList {
  sort_by: string;
  year?: number;
  with_genres?: string;
}

interface TVFilterList {
  sort_by: string;
  first_air_date_year?: number;
  with_genres?: string;
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
  total_pages: z.number().optional(),
});

const FilteredTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).optional(),
  total_pages: z.number().optional(),
});

const HomeMovieList = z.object({
  page: z.number().optional(),
  results: z.array(MovieSchema).optional(),
  total_pages: z.number().optional(),
});

const HomeTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).optional(),
  total_pages: z.number().optional(),
});

type ItemListType = z.infer<typeof ItemList>;
type FilteredMovieListType = z.infer<typeof FilteredMovieList>;
type FilteredTVListType = z.infer<typeof FilteredTVList>;
type HomeMovieListType = z.infer<typeof HomeMovieList>;
type HomeTVListType = z.infer<typeof HomeTVList>;
type MediaTypeConfig = {
  movie: {
    home: {
      fetcher: (type: string, period?: string) => Promise<HomeMovieListType>;
      paramList: Record<string, string>;
    };
    discover: {
      fetcher: (paramList: MovieFilterList, page: number) => Promise<FilteredMovieListType>;
      paramList: {
        sort_by: Array<string>;
        year: Array<string>;
        with_genres?: Map<number | undefined, string | undefined>;
      };
    };
  };
  tv: {
    home: {
      fetcher: (type: string, period?: string) => Promise<HomeTVListType>;
      paramList: Record<string, string>;
    };
    discover: {
      fetcher: (paramList: TVFilterList, page: number) => Promise<FilteredTVListType>;
      paramList: {
        sort_by: Array<string>;
        first_air_date_year: Array<string>;
        with_genres?: Map<number | undefined, string | undefined>;
        with_status: Array<string>;
        with_type: Array<string>;
      };
    };
  };
};

export {
  ItemListType,
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
  MediaTypeConfig,
};
