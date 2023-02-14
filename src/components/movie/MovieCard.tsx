import { MovieType } from '@/types/types';
import React from 'react'

interface MovieCardProps {
  movie: MovieType
}
const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  return (
    <div>{movie.title}</div>
  );
}

export default MovieCard