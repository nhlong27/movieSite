import React from 'react';
import { useAtom } from 'jotai';
import { itemFilterListAtom } from '../../atoms';
import { MovieType, TVType } from '@/types/types';
import MovieCard from '@/components/movie/MovieCard';
import Wrapper from '@/components/ui/Wrapper';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import TVCard from '@/components/tv/TVCard';
import { FilteredMovieListType, FilteredTVListType } from '../../types';

const FilterResult = () => {
  const [itemFilterList] = useAtom(itemFilterListAtom);

  const { data, mediaType } = useFilteredItemListQuery(itemFilterList);

  return (
    <div className=''>
      <pre>filters: {JSON.stringify(itemFilterList, null, '\t')}</pre>
      <div>
        {(data as FilteredMovieListType | FilteredTVListType)?.results?.map(
          (item: MovieType | TVType, index) => {
            return mediaType === 'movie' ? (
              <MovieCard key={index} movie={item as MovieType} />
            ) : (
              <TVCard key={index} tv={item as TVType} />
            );
          },
        )}
      </div>
    </div>
  );
};

export default () => (
  <Wrapper>
    <FilterResult />
  </Wrapper>
);
