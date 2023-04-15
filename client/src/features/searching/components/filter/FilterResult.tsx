import React from 'react';
import { MovieType, TVType } from '@/types/types';
import Wrapper from '@/components/handling/Wrapper';
import { useFilteredByStore } from '../../hooks/useFilteredByStore';
import MediaCard from '@/components/specific/MediaCard';

const FilterResult = () => {
  const { data, mediaType } = useFilteredByStore();
  return (
    <div className='grid place-items-center'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-items-center w-full gap-y-4 2xl:gap-4'>
        {(data?.results as any)
          .filter((item: MovieType | TVType) => item.poster_path)
          .map((item: MovieType | TVType, index: number) => (
            <MediaCard
              options={{
                wrapperComponent: {
                  className: 'w-[200px] overflow-hidden flex justify-center items-center flex-col',
                },
                lazyImageComponent: {
                  size: 'w200',
                },
              }}
              media={item}
              mediaType={mediaType}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default () => (
  <Wrapper>
    <FilterResult />
  </Wrapper>
);
