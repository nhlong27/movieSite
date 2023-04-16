import React from 'react';
import { MovieType, TVType } from '@/types/types';
import Wrapper from '@/components/handling/Wrapper';
import { useFilteredByStore } from '../../hooks/useFilteredByStore';
import LinkMediaCard from '@/components/specific/LinkMediaCard';

const FilterResult = () => {
  const { data } = useFilteredByStore();
  return (
    <div className='grid place-items-center'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-items-center w-full gap-y-4 2xl:gap-4'>
        {(data?.results as any)
          .filter((media: MovieType | TVType) => media.poster_path)
          .map((media: MovieType | TVType, index: number) => (
            <LinkMediaCard key={index} media={media} role='linkTVCard' />
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
