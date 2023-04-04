import { MovieType } from '@/types/types';
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoadImageComponent from '../ui/LazyLoadImageComponent';

interface MovieCardProps {
  movie: MovieType;
}
const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className='h-full max-w-[calc(100%_/_var(--items-per-screen))] flex justify-center items-center flex-col aspect-[9/16] flex-[0_0_calc(100%_/_var(--items-per-screen))]'
    >
      <LazyLoadImageComponent path={movie.poster_path} />
      <div className='w-full truncate '>{movie.title}</div>
    </Link>
  );
};

export default MovieCard;
