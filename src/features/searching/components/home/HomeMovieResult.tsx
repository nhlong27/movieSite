import MovieCard from '@/components/movie/MovieCard';
import { MovieType } from '@/types/types';
import React from 'react';
import { useHomeMovieListQuery } from '../../hooks/useHomeMovieListQuery';

const HomeMovieResult = ({ status }: { status: string }) => {
  const { data: homeMovieList } = useHomeMovieListQuery({ period: 'day', status: status });

  return (
    <div>
      <div className='text-red-500 uppercase'>{status}</div>
      {homeMovieList?.results?.map((movie: MovieType, index: number) => {
        return <MovieCard key={index} movie={movie} />;
      })}
    </div>
  );
};

export default HomeMovieResult;
