import MovieCard from '@/components/movie/MovieCard';
import TVCard from '@/components/tv/TVCard';
import Wrapper from '@/components/ui/Wrapper';
import { MovieType, TVType } from '@/types/types';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';

const TrendingSection = () => {
  const [period, setPeriod] = React.useState('day');
  const { data, mediaType } = useFilteredItemListQuery('trending', period);
  return (
    <div>
      <button onClick={() => setPeriod('day')}>Day</button>
      <button onClick={() => setPeriod('week')}>Week</button>
      <div className='flex gap-4'>
        {data?.results?.map((item, index) => {
          return (
            <div key={index}>
              {mediaType === 'movie' ? (
                <MovieCard movie={item as MovieType} />
              ) : (
                <TVCard tv={item as TVType} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default () => (
  <Wrapper>
    <TrendingSection />
  </Wrapper>
);
