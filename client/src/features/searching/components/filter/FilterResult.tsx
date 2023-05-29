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
      <div className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6 place-items-center w-full gap-4 lg:gap-6 xl:gap-8 min-h-screen  place-content-start bg-slate-50 rounded-b-xl shadow-xl py-4 dark:bg-stone-900'>
        {data!.pages.map((page: any) => {
          return page?.results?.map((media: MovieType | TVType, index: number) => (
            <LinkMediaCard
              key={index}
              media={media}
              role={(media as MovieType)?.title ? 'linkMovieCard' : 'linkTVCard'}
              styles={{
                link: 'relative h-[20rem] w-[200px] overflow-hidden flex justify-center items-center flex-col rounded-xl  bg-gradient-to-t from-stone-900 to-yellow-500  transition-full duration-200 hover:transform hover:scale-110 shadow-lg',
                image: 'overflow-hidden bg-gradient-to-tr  from-white to-black dark:from-stone-900 dark:to-yellow-500 grow',
                size: (media as any).poster_path ? 'w200': undefined
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
    <div className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-slate-50 rounded-b-xl shadow-xl py-4 dark:bg-stone-900'>
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
