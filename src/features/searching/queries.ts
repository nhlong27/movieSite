import { apiClient } from '@/lib/apiClient';
import { MovieFilterList, TVFilterList, FilteredMovieList, FilteredTVList, ItemList, HomeMovieList, MovieStatusList, TVStatusList, HomeTVList } from './types';

const keys = {
  getItemListKey: (query?: string) => ['search', 'multi', {query: query}] as const,
  getFilteredMovieKey: (paramList: MovieFilterList) => ['discover','movie', {...paramList}] as const,
  getFilteredTVKey: (paramList: TVFilterList) => ['discover','tv', {...paramList}] as const,
  getHomeMovieKey: (paramList: MovieStatusList) => paramList.status === 'trending'? ['trending','movie', paramList.period === 'day' ? 'day' : 'week'] : ['movie', paramList.status ] as const,
  getHomeTVKey: (paramList: TVStatusList) => paramList.status === 'trending'? ['trending','tv', paramList.period === 'day' ? 'day' : 'week'] : ['tv', paramList.status ] as const,
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

const getItemList = async (query?: string) => {
  return ItemList.parse((await apiClient.get('/search/multi', { params: { query: query } })).data);
};

const getItemListQuery = (query?: string) => {
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

const getHomeMovieList = async (paramList: MovieStatusList) => {
  if (paramList.status === 'trending'){
    return HomeMovieList.parse((await apiClient.get(`/trending/movie${'/'+paramList.period}`)).data);
  }
  else {
    return HomeMovieList.parse((await apiClient.get(`/movie${'/'+ paramList.status}`)).data);
  }
};
const getHomeTVList = async (paramList: TVStatusList) => {
  if (paramList.status === 'trending'){
    return HomeTVList.parse((await apiClient.get(`/trending/tv${'/'+paramList.period}`)).data);
  }
  else {
    return HomeTVList.parse((await apiClient.get(`/tv${'/'+ paramList.status}`)).data);
  }
};

const getHomeMovieListQuery = (paramList: MovieStatusList) => {
  return {
    queryKey: keys.getHomeMovieKey(paramList),
    queryFn: getHomeMovieList(paramList),
    enabled: !!paramList,
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    suspense: true,
    useErrorBoundary: true
  }
}
const getHomeTVListQuery = (paramList: TVStatusList) => {
  return {
    queryKey: keys.getHomeTVKey(paramList),
    queryFn: getHomeTVList(paramList),
    enabled: !!paramList,
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    suspense: true,
    useErrorBoundary: true
  }
}

export { getItemList, getItemListQuery, getFilteredMovieList, getFilteredMovieListQuery, getFilteredTVList, getFilteredTVListQuery, getHomeMovieListQuery, getHomeTVListQuery};
