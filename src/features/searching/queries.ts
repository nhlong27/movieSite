import { apiClient } from '@/lib/apiClient';
import { MovieFilterList, TVFilterList, FilteredMovieList, FilteredTVList } from './types';

const keys = {
  getItemListKey: (query: string) => ['search', 'multi', {query: query}] as const,
  getFilteredMovieKey: (paramList: MovieFilterList) => ['discover','movie', {...paramList}] as const,
  getFilteredTVKey: (paramList: TVFilterList) => ['discover','tv', {...paramList}] as const,
}

const getFilteredMovieList = async(paramList: MovieFilterList) => {
  return FilteredMovieList.parse((await apiClient.get('/discover/movie', {params: { ...paramList}})).data);
}

const getFilteredTVList = async(paramList: TVFilterList) => {
  return FilteredTVList.parse((await apiClient.get('/discover/tv', {params: { ...paramList}})).data);
}

const getFilteredMovieListQuery = (paramList: MovieFilterList) => {
  return {
    queryKey: keys.getFilteredMovieKey(paramList),
    queryFn: ()=>getFilteredMovieList(paramList),
    enabled: !!paramList,
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    suspense: true,
    useErrorBoundary: true
  }
}

const getFilteredTVListQuery = (paramList: TVFilterList) => {
  return {
    queryKey: keys.getFilteredTVKey(paramList),
    queryFn: ()=>getFilteredTVList(paramList),
    enabled: !!paramList,
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    suspense: true,
    useErrorBoundary: true
  }
}

const getItemList = async (query: string) => {
  return (await apiClient.get('/search/multi', { params: { query: query } })).data;
};

const getItemListQuery = (query: string) => {
  return {
    queryKey: keys.getItemListKey(query),
    queryFn: () => getItemList(query),
    enabled: !!query,
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    suspense: true,
    useErrorBoundary: true
  };
};

export { getItemList, getItemListQuery, getFilteredMovieList, getFilteredMovieListQuery, getFilteredTVList, getFilteredTVListQuery };
