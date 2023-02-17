import TVCard from '@/components/tv/TVCard';
import { TVType } from '@/types/types';
import React from 'react';
import { useHomeTVListQuery } from '../../hooks/useHomeTVListQuery';

const HomeTVResult = ({ status }: { status: string }) => {
  const { data: homeTVList } = useHomeTVListQuery({ period: 'day', status: status });

  return (
    <div>
      <div className='text-red-500 uppercase'>{status}</div>
      {homeTVList?.results?.map((tv: TVType, index: number) => {
        return <TVCard key={index} tv={tv} />;
      })}
    </div>
  );
};

export default HomeTVResult;
