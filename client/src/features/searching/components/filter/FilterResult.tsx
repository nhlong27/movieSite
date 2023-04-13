import React from 'react';
import { MovieType, TVType } from '@/types/types';
import Wrapper from '@/components/handling/Wrapper';
import { useFilteredByStore } from '../../hooks/useFilteredByStore';
import MediaCard from '@/components/specific/MediaCard';

const FilterResult = () => {
  const { data, mediaType } = useFilteredByStore();
  return (
    <div className='flex flex-wrap gap-4'>
      {(data?.results as any)
        .filter((item: MovieType | TVType) => item.poster_path)
        .map((item: MovieType | TVType, index: number) => (
          <MediaCard
            options={{
              buttonComponent: {
                className: `max-w-[20rem] w-[10rem] flex justify-center items-center flex-col 
              transition-all
              ease-in-out
              aspect-[9/16]
                duration-500
                `,
              },
              lazyImageComponent: {
                size: 'original',
              },
            }}
            media={item}
            mediaType={mediaType}
            key={index}
          />
        ))}
    </div>
  );
};

export default () => (
  <Wrapper>
    <FilterResult />
  </Wrapper>
);
