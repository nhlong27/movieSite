import { mediaTypeAtom } from '@/App';
import { useAtom } from 'jotai';
import { useMovieFiltersStore, useTVFiltersStore } from '../stores';
import { useFilteredItemListQuery } from './useFilteredItemListQuery';
import { MovieFilterList, TVFilterList } from '../types';

const useFilteredByStore = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const movieFiltersStore = useMovieFiltersStore();
  const tvFiltersStore = useTVFiltersStore();
  const movieFilters = {
    sort_by: movieFiltersStore.sort_by ?? 'popularity.desc',
    with_genres:
      (movieFiltersStore.with_genres ?? []).length > 0
        ? encodeURIComponent(movieFiltersStore.with_genres!.join(','))
        : undefined,
    year: movieFiltersStore.year ?? new Date().getFullYear(),
    with_original_language: 'en',
  };
  const tvFilters = {
    sort_by: tvFiltersStore.sort_by ?? 'popularity.desc',
    with_genres:
      (tvFiltersStore.with_genres ?? []).length > 0
        ? encodeURIComponent(tvFiltersStore.with_genres!.join(','))
        : undefined,
    first_air_date_year: tvFiltersStore.first_air_date_year ?? new Date().getFullYear(),
    with_status: tvFiltersStore.with_status ?? undefined,
    with_type: tvFiltersStore.with_type ?? undefined,
    with_original_language: 'en',
  };

  const { data, hasNextPage, fetchNextPage } = useFilteredItemListQuery(
    {
      ...(mediaType === 'movie' ? (movieFilters as MovieFilterList) : (tvFilters as TVFilterList)),
    },
    // undefined,
    // { suspense: false, useErrorBoundary: false },
  );

  console.log(fetchNextPage)

  return { data, hasNextPage, fetchNextPage, mediaType };
};

export { useFilteredByStore };
