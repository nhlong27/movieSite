import { MovieType } from '@/types/types';
import React from 'react'
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: MovieType
}
const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  return (
    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
  );
}

export default MovieCard