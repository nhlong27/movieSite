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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4k:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-stone-200 rounded-b-xl shadow-xl py-4 dark:bg-stone-900'>
        {data!.pages.map((page: any) => {
          return page?.results?.map((media: MovieType | TVType, index: number) => (
            <LinkMediaCard
              key={index}
              media={media}
              role={(media as MovieType)?.title ? 'linkMovieCard' : 'linkTVCard'}
              styles={{
                link: 'h-[22rem] w-[200px] overflow-hidden flex justify-center items-center flex-col relative shadow-lg rounded-xl shadow-stone-900 dark:shadow-yellow-900 bg-gradient-to-t from-stone-300 to-stone-200 dark:from-yellow-500 dark:to-yellow-500 dark:text-stone-900 dark:font-black dark:hover:shadow-xl dark:hover:shadow-yellow-500 hover:shadow-xl hover:shadow-stone-900',
                image: 'overflow-hidden  bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow',
                size: (media as any).poster_path ? 'original': undefined
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
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-stone-200 dark:bg-stone-900 rounded-b-xl shadow-xl py-4'>
      {Array(20)
        .fill(0)
        .map((item, index) => (
          <div key={index} className='min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col relative shadow-lg rounded-xl dark:bg-gradient-to-tr bg-gradient-to-tr from-stone-900 to-stone-100  dark:from-stone-900 dark:to-yellow-500'>
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
