import { MovieType } from '@/types/types';
import React from 'react'
import { Link } from 'react-router-dom';
import LazyLoadImageComponent from '../ui/LazyLoadImageComponent';

interface MovieCardProps {
  movie: MovieType
}
const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <LazyLoadImageComponent path={movie.poster_path} />
    </Link>
  );
}

export default MovieCard