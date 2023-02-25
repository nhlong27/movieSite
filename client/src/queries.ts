import { apiClient } from "./lib/apiClient"
import { GenreListSchema } from "./types/types";

const getMovieGenres = async()=>{
  return GenreListSchema.parse((await apiClient.get('/genre/movie/list')).data);
}

const getMovieGenresQuery = () => {
  return {
    queryKey: ['genre', 'movie', 'list'],
    queryFn: getMovieGenres
  }
} 
const getTVGenres = async()=>{
  return GenreListSchema.parse((await apiClient.get('/genre/tv/list')).data);
}

const getTVGenresQuery = () => {
  return {
    queryKey: ['genre', 'TV', 'list'],
    queryFn: getTVGenres,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  }
} 
export {getMovieGenres, getMovieGenresQuery, getTVGenres, getTVGenresQuery};