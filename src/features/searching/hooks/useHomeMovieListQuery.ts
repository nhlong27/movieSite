
import { useQuery } from '@tanstack/react-query';
import {  getHomeMovieListQuery } from '../queries';
import { StatusList } from '../types';

export const useHomeMovieListQuery = (paramList: StatusList ) => {
  return useQuery(getHomeMovieListQuery(paramList));
};
