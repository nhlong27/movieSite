import React, { Suspense } from 'react';
import { useItemListQuery } from '../../hooks/useItemListQuery';
import { queryAtom } from '../../atoms';
import { useAtom } from 'jotai';
import { ErrorBoundary } from 'react-error-boundary';
import { useDebounce } from 'use-debounce';
import { MovieType, TVType, PersonType } from '@/types/types';
import MovieCard from '@/components/movie/MovieCard';
import TVCard from '@/components/tv/TVCard';
import PersonCard from '@/components/person/PersonCard';

const SearchResult = () => {
  const [query] = useAtom(queryAtom);
  const debouncedQuery = useDebounce(query, 500);
  const { data: itemList } = useItemListQuery(debouncedQuery[0] ?? '');
  return itemList ? (
    (itemList.results ?? []).length > 0 ? (
      <div>
        <div>
          Movie:{' '}
          {itemList?.results
            ?.filter((item) => item.media_type === 'movie')
            .map((item, index: number) => {
              return <MovieCard key={index} movie={item as MovieType} />;
            })}
        </div>
        <div>
          TV:{' '}
          {itemList?.results
            ?.filter((item) => item.media_type === 'tv')
            .map((item, index: number) => {
              return <TVCard key={index} tv={item as TVType} />;
            })}
        </div>
        <div>
          People:{' '}
          {itemList?.results
            ?.filter((item) => item.media_type === 'person')
            .map((item, index: number) => {
              return <PersonCard key={index} person={item as PersonType} />;
            })}
        </div>
      </div>
    ) : (
      <div>Item not available</div>
    )
  ) : (
    <div>Type something</div>
  );
};

export default () => (
  <ErrorBoundary fallback={<div>Error..</div>}>
    <Suspense fallback={<div>Loading..</div>}>
      <SearchResult />
    </Suspense>
  </ErrorBoundary>
);
