import { TVType } from '@/types/types';
import React from 'react'
import { Link } from 'react-router-dom';

interface TVCardProps {
  tv: TVType
}
const TVCard: React.FC<TVCardProps> = ({tv}) => {
  return (
    <Link to={`/tv/${tv.id}`}>{tv.name}</Link>
  );
}

export default TVCard