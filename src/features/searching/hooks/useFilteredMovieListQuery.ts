
import { useQuery } from '@tanstack/react-query';
import { getFilteredMovieListQuery } from '../queries';
import { MovieFilterList } from '../types';

export const useFilteredMovieListQuery = (paramList : MovieFilterList) => {
  return useQuery(getFilteredMovieListQuery(paramList));
};
