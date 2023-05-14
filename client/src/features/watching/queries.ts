import { apiClient } from '@/lib/apiClient';
import {
  CreditListSchema,
  ItemDetailOptionsProps,
  MovieDetailSchema,
  ReviewListSchema,
  SeasonSchema,
  SimilarMovieListSchema,
  SimilarTVListSchema,
  TVDetailSchema,
  VideoListSchema,
} from './types';

const keys = {
  getItemDetailKey: (
    mediaType: 'movie' | 'tv',
    itemId?: string,
    moreType: keyof ItemDetailOptionsProps['movie'] = 'default',
  ) =>
    moreType !== 'default'
      ? ([mediaType, itemId, moreType] as const)
      : ([mediaType, itemId] as const),

  getSeasonKey: (season_number?: string, tvId?: string) => [
    ...(keys.getItemDetailKey('tv', tvId) ?? []),
    { season: season_number },
  ],
};

// This object serves the purpose: Reducing fetcher, useQuery hook repetitions
const itemDetailOptions: ItemDetailOptionsProps = {
  movie: {
    default: async (movieId?: string) =>
      MovieDetailSchema.parse((await apiClient.get(`/movie/${movieId}`)).data),
    videos: async (movieId?: string) =>
      VideoListSchema.parse((await apiClient.get(`/movie/${movieId}/videos`)).data),
    credits: async (movieId?: string) =>
      CreditListSchema.parse((await apiClient.get(`/movie/${movieId}/credits`)).data),
    reviews: async (movieId?: string) =>
      ReviewListSchema.parse((await apiClient.get(`/movie/${movieId}/reviews`)).data),
    similar: async (movieId?: string) =>
      SimilarMovieListSchema.parse((await apiClient.get(`/movie/${movieId}/similar`)).data),
  },
  tv: {
    default: async (tvId?: string) =>
      TVDetailSchema.parse((await apiClient.get(`/tv/${tvId}`)).data),
    videos: async (tvId?: string) =>
      VideoListSchema.parse((await apiClient.get(`/tv/${tvId}/videos`)).data),
    credits: async (tvId?: string) =>
      CreditListSchema.parse((await apiClient.get(`/tv/${tvId}/credits`)).data),
    reviews: async (tvId?: string) =>
      ReviewListSchema.parse((await apiClient.get(`/tv/${tvId}/reviews`)).data),
    similar: async (tvId?: string) =>
      SimilarTVListSchema.parse((await apiClient.get(`/tv/${tvId}/similar`)).data),
  },
};

const getItemDetail = async (
  mediaType: 'movie' | 'tv',
  itemId?: string,
  moreType: keyof ItemDetailOptionsProps['movie'] = 'default',
) => {
  return await itemDetailOptions[`${mediaType}`][`${moreType}`](itemId);
};

const getItemDetailQuery = (
  mediaType: 'movie' | 'tv',
  itemId?: string,
  moreType: keyof ItemDetailOptionsProps['movie'] = 'default',
) => {
  return {
    queryKey: keys.getItemDetailKey(mediaType, itemId, moreType),
    queryFn: () => getItemDetail(mediaType, itemId, moreType),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    suspense: true,
    useErrorBoundary: true,
  };
};

const getSeason = async (season_number?: string, tvId?: string) => {
  return SeasonSchema.parse((await apiClient.get(`/tv/${tvId}/season/${season_number}`)).data);
};

const getSeasonQuery = (season_number?: string, tvId?: string) => {
  return {
    queryKey: keys.getSeasonKey(season_number, tvId),
    queryFn: () => getSeason(season_number, tvId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!tvId,
    suspense: true,
    useErrorBoundary: true,
  };
};

export { getSeasonQuery, getItemDetailQuery };
