
import {z} from 'zod'
import { MovieSchema, PersonSchema, TVSchema } from '@/types/types';

interface MovieFilterList {
  sort_by: string;
  year?:number; 
  with_genres?: Array<number | undefined>;
  include_adult?: boolean
}

interface TVFilterList {
  sort_by: string;
  first_air_date_year?:number; 
  with_genres?: Array<number | undefined>;
  with_status?: string;
  with_type?: string;
}

interface MovieStatusList {
  status?: "trending" | "upcoming" | "now_playing";
  period?: "day" | "week";
}

interface TVStatusList {
  status?: "trending" | "on_the_air" | "airing_today";
  period?: "day" | "week";
}

const ItemList = z.object({
  page: z.number().optional(),
  results: z.array(z.union([TVSchema, MovieSchema, PersonSchema])).optional()
})

const FilteredMovieList = z.object({
  page: z.number().optional(),
  results: z.array(MovieSchema).optional()
})

const FilteredTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).optional()
})

const HomeMovieList = z.object({
  page: z.number().optional(),
  results: z.array(MovieSchema).optional()
})

const HomeTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).optional()
})

export {MovieFilterList, TVFilterList, FilteredMovieList, FilteredTVList, ItemList, HomeMovieList, HomeTVList, MovieStatusList, TVStatusList}