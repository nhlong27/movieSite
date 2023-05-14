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
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-stone-200 rounded-b-xl shadow-xl py-4'>
        {data!.pages.map((page: any) => {
          return page?.results?.map((media: MovieType | TVType, index: number) => (
            <LinkMediaCard
              key={index}
              media={media}
              role={(media as MovieType)?.title ? 'linkMovieCard' : 'linkTVCard'}
              styles={{
                link: 'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col relative shadow-lg rounded-xl',
                detail: 'mt-auto min-h-[4rem] flex flex-col w-11/12',
                size: media?.poster_path ? 'w200' : undefined
              }}
            />
          ));
        })}
      </div>
    </InfiniteScroll>
  );
};

const SuspenseState = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-stone-200 rounded-b-xl shadow-xl py-4'>
      {Array(20)
        .fill(0)
        .map((item, index) => (
          <div key={index} className='min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col relative shadow-lg rounded-xl'>
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
