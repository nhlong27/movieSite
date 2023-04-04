import { TVType } from '@/types/types';
import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoadImageComponent from '../ui/LazyLoadImageComponent';

interface TVCardProps {
  tv: TVType;
}
const TVCard: React.FC<TVCardProps> = ({ tv }) => {
  return (
    <Link
      to={`/tv/${tv.id}`}
      className='h-full max-w-[calc(100%_/_var(--items-per-screen))] flex flex-shrink justify-center flex-col aspect-[9/16] flex-[0_0_calc(100%_/_var(--items-per-screen))] '
    >
      <LazyLoadImageComponent path={tv.poster_path} />
      <div className='w-full truncate'>{tv.name}</div>
    </Link>
  );
};

export default TVCard;
