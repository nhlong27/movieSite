import { apiClient } from '@/lib/apiClient';
import {
  MovieFilterList,
  TVFilterList,
  FilteredMovieList,
  FilteredTVList,
  ItemList,
  HomeMovieList,
  HomeTVList,
  MediaTypeConfig,
} from './types';

const keys = {
  getItemListKey: (query?: string) => ['search', 'multi', { query: query }] as const,
  getFilteredItemKey: (
    mediaType: 'tv' | 'movie',
    queryType: keyof MediaTypeConfig[`movie` | 'tv'],
    paramList: MovieFilterList | TVFilterList | string,
    period?: string,
  ) =>
    period
      ? [queryType, mediaType, paramList, period]
      : ([queryType, mediaType, paramList] as const),
};

const mediaTypeConfig: MediaTypeConfig = {
  movie: {
    home: {
      fetcher: async (type: string, period?: string) =>
        type === 'trending'
          ? HomeMovieList.parse((await apiClient.get(`/${type}/movie${'/' + period}`)).data)
          : HomeMovieList.parse((await apiClient.get(`/movie${'/' + type}`)).data),
      paramList: {
        trending: '',
        coming_soon: 'upcoming',
        airing: 'now_playing',
      },
    },
    discover: {
      fetcher: async (paramList: MovieFilterList) =>
        FilteredMovieList.parse(
          (await apiClient.get('/discover/movie', { params: { ...paramList } })).data,
        ),
      paramList: {
        sort_by: [
          'popularity.asc',
          'popularity.desc',
          'release_date.desc',
          'vote_average.desc',
          'vote_average.asc',
          'vote_count.desc',
          'vote_count.asc',
        ],
        year: [],
        with_genres: [],
      },
    },
  },
  tv: {
    home: {
      fetcher: async (type: string, period?: string) =>
        type === 'trending'
          ? HomeTVList.parse((await apiClient.get(`/${type}/tv${'/' + period}`)).data)
          : HomeTVList.parse((await apiClient.get(`/tv${'/' + type}`)).data),
      paramList: {
        trending: '',
        coming_soon: 'on_the_air',
        airing: 'airing_today',
      },
    },
    discover: {
      fetcher: async (paramList: TVFilterList) =>
        FilteredTVList.parse(
          (await apiClient.get('/discover/tv', { params: { ...paramList } })).data,
        ),
      paramList: {
        sort_by: [
          'popularity.asc',
          'popularity.desc',
          'first_air_date.desc',
          'vote_average.desc',
          'vote_average.asc',
          'vote_count.desc',
          'vote_count.asc',
        ],
        first_air_date_year: [],
        with_genres: [],
        with_status: ['Planned', 'In Production', 'Ended', 'Cancelled', 'Pilot'],
        with_type: [
          'Documentary',
          'News',
          'Miniseries',
          'Reality',
          'Scripted',
          'Talk Show',
          'Video',
        ],
      },
    },
  },
};

const getFilteredItemList = async (
  mediaType: 'tv' | 'movie',
  queryType: keyof MediaTypeConfig[`movie` | 'tv'],
  paramList: MovieFilterList | TVFilterList | string,
  period?: string,
) => {
  return queryType === 'discover'
    ? mediaTypeConfig[`${mediaType}`].discover.fetcher(paramList as MovieFilterList | TVFilterList)
    : mediaTypeConfig[`${mediaType}`].home.fetcher(paramList as string, period);
};

const getFilteredItemListQuery = (
  mediaType: 'tv' | 'movie',
  queryType: keyof MediaTypeConfig[`movie` | 'tv'],
  paramList: MovieFilterList | TVFilterList | string,
  period?: string,
) => {
  return {
    queryKey: keys.getFilteredItemKey(mediaType, queryType, paramList, period),
    queryFn: () => getFilteredItemList(mediaType, queryType, paramList, period),
    enabled: !!paramList,
    keepPreviousData: true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    suspense: true,
    useErrorBoundary: true,
  };
};

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
    useErrorBoundary: true,
  };
};

export { getItemList, getItemListQuery, getFilteredItemListQuery, mediaTypeConfig };
