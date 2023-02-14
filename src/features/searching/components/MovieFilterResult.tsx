import React, { Suspense } from 'react';
import { useFilteredMovieListQuery } from '../hooks/useFilteredMovieListQuery';
import { useAtom } from 'jotai';
import { movieFilterListAtom } from '../atoms';
import { ErrorBoundary } from 'react-error-boundary';
import { MovieType } from '@/types/types';
import MovieCard from '@/components/movie/MovieCard';

const MovieFilterResult = () => {
  const [filterList] = useAtom(movieFilterListAtom);
  const { data: filteredMovieList } = useFilteredMovieListQuery(filterList);
  return (
    <div>
      <pre>{JSON.stringify(filterList, null, '\t')}</pre>
      {filteredMovieList?.results?.map((filteredMovie: MovieType, index: number) => {
        return <MovieCard key={index} movie={filteredMovie} />
      })}
    </div>
  );
};

export default () => (
  <ErrorBoundary fallback={<div>Error Filtered Movie List Result</div>}>
    <Suspense fallback={<div>Loading</div>}>
      <MovieFilterResult />
    </Suspense>
  </ErrorBoundary>
);
