import { mediaTypeAtom } from '@/App';
import MovieCard from '@/components/movie/MovieCard';
import TVCard from '@/components/tv/TVCard';
import Wrapper from '@/components/ui/Wrapper';
import { MovieType, TVType } from '@/types/types';
import { useAtom } from 'jotai';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import { mediaTypeConfig } from '../../queries';

const AiringSection = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const { data } = useFilteredItemListQuery(mediaTypeConfig[`${mediaType}`].home.paramList.airing);
  return (
    <div>
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
    <AiringSection />
  </Wrapper>
);
