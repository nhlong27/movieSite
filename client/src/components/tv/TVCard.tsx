import { TVType } from '@/types/types';
import React from 'react'
import { Link } from 'react-router-dom';
import LazyLoadImageComponent from '../ui/LazyLoadImageComponent';

interface TVCardProps {
  tv: TVType
}
const TVCard: React.FC<TVCardProps> = ({tv}) => {
  return (
    <Link to={`/tv/${tv.id}`}>
      <LazyLoadImageComponent path={tv.poster_path} />
    </Link>
  );
}

export default TVCard