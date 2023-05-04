import React from 'react';
import { MovieType, TVType } from '@/types/types';
import Wrapper from '@/components/handling/Wrapper';
import { useFilteredByStore } from '../../hooks/useFilteredByStore';
import LinkMediaCard from '@/components/specific/LinkMediaCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';

const FilterResult = () => {
  const { data, hasNextPage, fetchNextPage } = useFilteredByStore();
  return (
    <InfiniteScroll
      dataLength={data?.pages.length || 0}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<SuspenseState />}
      endMessage={<></>}
      style={{ width: '100%', display: 'grid', placeItems: 'center' }}
    >
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen'>
        {data!.pages.map((page: any) => {
          return page?.results?.map((media: MovieType | TVType, index: number) => (
            <LinkMediaCard
              key={index}
              media={media}
              role={(media as MovieType)?.title ? 'linkMovieCard' : 'linkTVCard'}
            />
          ));
        })}
      </div>
    </InfiniteScroll>
  );
};

const SuspenseState = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen'>
      {Array(20)
        .fill(0)
        .map((item, index) => (
          <div key={index} className='w-[200px] overflow-hidden h-[320px]'>
            <Skeleton className='h-full w-full' />
          </div>
        ))}
    </div>
  );
};

export default () => (
  <Wrapper suspenseComponent={<SuspenseState />}>
    <FilterResult />
  </Wrapper>
);
