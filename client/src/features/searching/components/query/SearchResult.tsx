import React from 'react';
import { useItemListQuery } from '../../hooks/useItemListQuery';
import { MovieType, TVType, PersonType } from '@/types/types';
import MovieCard from '@/components/movie/MovieCard';
import TVCard from '@/components/tv/TVCard';
import PersonCard from '@/components/person/PersonCard';
import Wrapper from '@/components/ui/Wrapper';

const SearchResult = () => {
  const { data: itemList } = useItemListQuery();
  return itemList ? (
    (itemList.results ?? []).length > 0 ? (
      <div>
        <div>
          Movie:{' '}
          {itemList?.results
            ?.filter((item) => item.media_type === 'movie')
            .map((item, index: number) => {
              return <MovieCard key={index} movie={item as MovieType} />;
            })}
        </div>
        <div>
          TV:{' '}
          {itemList?.results
            ?.filter((item) => item.media_type === 'tv')
            .map((item, index: number) => {
              return <TVCard key={index} tv={item as TVType} />;
            })}
        </div>
        <div>
          People:{' '}
          {itemList?.results
            ?.filter((item) => item.media_type === 'person')
            .map((item, index: number) => {
              return <PersonCard key={index} person={item as PersonType} />;
            })}
        </div>
      </div>
    ) : (
      <div>Item not available</div>
    )
  ) : (
    <div>Type something</div>
  );
};

export default () => (
  <Wrapper>
    <SearchResult />
  </Wrapper>
);
