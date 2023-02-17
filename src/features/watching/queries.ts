import { apiClient } from '@/lib/apiClient';
import Movie from '@/pages/Movie';
import { Key } from 'react';
import MovieFilterResult from '../searching/components/filter/MovieFilterResult';
import {
  CreditListSchema,
  CreditListType,
  MovieDetailSchema,
  MovieDetailType,
  PersonDetailSchema,
  PersonDetailType,
  ReviewListSchema,
  ReviewListType,
  SeasonSchema,
  SimilarListSchema,
  SimilarListType,
  TVDetailSchema,
  TVDetailType,
  VideoListSchema,
  VideoListType,
} from './types';

const keys = {
  getMovieDetailKey: (movieId?: string) => ['movie', movieId] as const,
  getTVDetailKey: (tvId?: string) => ['tv', tvId] as const,
  getPersonDetailKey: (personId?: string) => ['person', personId] as const,
  getVideoListKey: (itemId?: number, mediaType?: string) => [mediaType, itemId, 'videos'] as const,
  getCreditListKey: (itemId?: number, mediaType?: string) =>
    [mediaType, itemId, 'credits'] as const,
  getReviewListKey: (itemId?: number, mediaType?: string) =>
    [mediaType, itemId, 'reviews'] as const,
  getSimilarListKey: (itemId?: number, mediaType?: string) =>
    [mediaType, itemId, 'similar'] as const,
  getSeasonKey: (season_number?: string, tvId?: string) => [
    ...(keys.getTVDetailKey(tvId) ?? []),
    { season: season_number },
  ],

  getItemDetailKey: (
    mediaType: 'movie' | 'tv',
    itemId?: string,
    moreType: keyof ItemDetailOptionsProps['movie'] = 'default',
  ) =>
    moreType !== 'default'
      ? ([mediaType, itemId, moreType] as const)
      : ([mediaType, itemId] as const),
};

type ItemDetailOptionsProps = {
  movie: {
    default: (movieId?: string) => Promise<MovieDetailType>;
    videos: (movieId?: string) => Promise<VideoListType>;
    credits: (movieId?: string) => Promise<CreditListType>;
    reviews: (movieId?: string) => Promise<ReviewListType>;
    similar: (movieId?: string) => Promise<SimilarListType>;
  };
  tv: {
    default: (tvId?: string) => Promise<TVDetailType>;
    videos: (tvId?: string) => Promise<VideoListType>;
    credits: (tvId?: string) => Promise<CreditListType>;
    reviews: (tvId?: string) => Promise<ReviewListType>;
    similar: (tvId?: string) => Promise<SimilarListType>;
  };
};

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
      SimilarListSchema.parse((await apiClient.get(`/movie/${movieId}/similar`)).data),
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
      SimilarListSchema.parse((await apiClient.get(`/tv/${tvId}/similar`)).data),
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


const getVideoList = async (itemId?: number, mediaType?: string) => {
  return VideoListSchema.parse((await apiClient.get(`/${mediaType}/${itemId}/videos`)).data);
};

const getMovieDetail = async (movieId?: string) => {
  return MovieDetailSchema.parse((await apiClient.get(`/movie/${movieId}`)).data);
};

const getTVDetail = async (tvId?: string) => {
  return TVDetailSchema.parse((await apiClient.get(`/tv/${tvId}`)).data);
};
const getPersonDetail = async (personId?: string) => {
  return PersonDetailSchema.parse((await apiClient.get(`/person/${personId}`)).data);
};
const getSimilarList = async (itemId?: number, mediaType?: string) => {
  return SimilarListSchema.parse((await apiClient.get(`/${mediaType}/${itemId}/similar`)).data);
};

const getSeason = async (season_number?: string, tvId?: string) => {
  return SeasonSchema.parse((await apiClient.get(`/tv/${tvId}/season/${season_number}`)).data);
};

const getCreditList = async (itemId?: number, mediaType?: string) => {
  return CreditListSchema.parse((await apiClient.get(`/${mediaType}/${itemId}/credits`)).data);
};
const getReviewList = async (itemId?: number, mediaType?: string) => {
  return ReviewListSchema.parse((await apiClient.get(`/${mediaType}/${itemId}/reviews`)).data);
};

const getCreditListQuery = (itemId?: number, mediaType?: string) => {
  return {
    queryKey: keys.getCreditListKey(itemId, mediaType),
    queryFn: () => getCreditList(itemId, mediaType),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!itemId,
    // suspense: true,
    // useErrorBoundary: true
  };
};
const getSimilarListQuery = (itemId?: number, mediaType?: string) => {
  return {
    queryKey: keys.getSimilarListKey(itemId, mediaType),
    queryFn: () => getSimilarList(itemId, mediaType),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!itemId,
    // suspense: true,
    // useErrorBoundary: true
  };
};
const getReviewListQuery = (itemId?: number, mediaType?: string) => {
  return {
    queryKey: keys.getReviewListKey(itemId, mediaType),
    queryFn: () => getReviewList(itemId, mediaType),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!itemId,
    // suspense: true,
    // useErrorBoundary: true
  };
};

const getSeasonQuery = (season_number?: string, tvId?: string) => {
  return {
    queryKey: keys.getSeasonKey(season_number, tvId),
    queryFn: () => getSeason(season_number, tvId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!tvId,
    // suspense: true,
    // useErrorBoundary: true
  };
};

const getVideoListQuery = (itemId?: number, mediaType?: string) => {
  return {
    queryKey: keys.getVideoListKey(itemId, mediaType),
    queryFn: () => getVideoList(itemId, mediaType),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!itemId,
    // suspense: true,
    // useErrorBoundary: true
  };
};
const getMovieDetailQuery = (movieId?: string) => {
  return {
    queryKey: keys.getMovieDetailKey(movieId),
    queryFn: () => getMovieDetail(movieId),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    // suspense: true,
    // useErrorBoundary: true
  };
};
const getTVDetailQuery = (tvId?: string) => {
  return {
    queryKey: keys.getTVDetailKey(tvId),
    queryFn: () => getTVDetail(tvId),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    // suspense: true,
    // useErrorBoundary: true
  };
};
const getPersonDetailQuery = (personId?: string) => {
  return {
    queryKey: keys.getPersonDetailKey(personId),
    queryFn: () => getPersonDetail(personId),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    // suspense: true,
    // useErrorBoundary: true
  };
};

export {
  getMovieDetailQuery,
  getTVDetailQuery,
  getPersonDetailQuery,
  getVideoListQuery,
  getSeasonQuery,
  getReviewListQuery,
  getCreditListQuery,
  getSimilarListQuery,
  getItemDetailQuery,
};
