import React from 'react';
import { useItemListQuery } from '../../hooks/useItemListQuery';
import { MovieType, TVType } from '@/types/types';
import MovieCard from '@/components/movie/MovieCard';
import TVCard from '@/components/tv/TVCard';
import Wrapper from '@/components/ui/Wrapper';

const SearchResult = () => {
  const { data: itemList } = useItemListQuery();
  return itemList ? (
    (itemList.results ?? []).length > 0 ? (
      <div data-testid='result' className=''>
        
        <div aria-label='movie'>
          Movie:{' '}
          {itemList?.results
            ?.filter((item) => item.media_type === 'movie')
            .map((item, index: number) => {
              return <MovieCard key={index} movie={item as MovieType} />;
            })}
        </div>
        <div aria-label='tv'>
          TV:{' '}
          {itemList?.results
            ?.filter((item) => item.media_type === 'tv')
            .map((item, index: number) => {
              return <TVCard key={index} tv={item as TVType} />;
            })}
        </div>
      </div>
    ) : (
      <div>Item not available</div>
    )
  ) : (
    null
  );
};

export default () => (
  <Wrapper>
    <SearchResult />
  </Wrapper>
);
