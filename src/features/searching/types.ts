
import {z} from 'zod'
import { MovieSchema, TVSchema } from '@/types/types';

interface MovieFilterList {
  sort_by: "popularity.asc" | "popularity.desc" | "release_date.desc" | "vote_average.desc" | "vote_average.asc" | "vote_count.desc" | "vote_count.asc";
  year?:number; 
  with_genres?: Array<number | undefined>;
  include_adult?: boolean
}

interface TVFilterList {
  sort_by: "popularity.asc" | "popularity.desc" | "first_air_date.desc" | "vote_average.desc" | "vote_average.asc" | "vote_count.desc" | "vote_count.asc";
  first_air_date_year?:number; 
  with_genres?: Array<number | undefined>;
  with_status?: string;
  with_type?: string;
}

const FilteredMovieList = z.object({
  page: z.number().optional(),
  results: z.array(MovieSchema).nullable().optional()
})

const FilteredTVList = z.object({
  page: z.number().optional(),
  results: z.array(TVSchema).nullable().optional()
})

export {MovieFilterList, TVFilterList, FilteredMovieList, FilteredTVList}