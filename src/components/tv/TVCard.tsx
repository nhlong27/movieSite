import { TVType } from '@/types/types';
import React from 'react'

interface TVCardProps {
  tv: TVType
}
const TVCard: React.FC<TVCardProps> = ({tv}) => {
  return (
    <div>{tv.name}</div>
  );
}

export default TVCard