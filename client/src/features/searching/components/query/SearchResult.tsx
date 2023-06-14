import React from 'react';
import { useItemListQuery } from '../../hooks/useItemListQuery';
import Wrapper from '@/components/handling/Wrapper';
import { useAtom } from 'jotai';
import { hasQueryFiltersAtom } from '@/App';
import LinkMediaCard from '@/components/specific/LinkMediaCard';
import Skeleton from 'react-loading-skeleton';
import { ItemListType } from '../../types';
import { MovieType, TVType } from '@/types/types';
import { iconHelper } from '@/config/icons';
const SearchResult = () => {
  const [hasQueryFilters] = useAtom(hasQueryFiltersAtom);

  const { data: itemList } = useItemListQuery((data: ItemListType) =>
    data?.results?.filter((media) => (media as MovieType | TVType).poster_path),
  );

  return (itemList ?? []).length > 0 ? (
    <div
      className={`${
        hasQueryFilters ? 'max-h-0' : 'max-h-min'
      } transition-all duration-500 overflow-hidden flex flex-col w-full bg-slate-50 dark:bg-stone-900 rounded-b-xl font-poppins shadow-xl`}
    >
      <h1 className='w-full bg-slate-300 text-slate-900 grid place-items-center text-xl uppercase font-black tracking-[0.6rem] shadow-lg dark:bg-gradient-to-r dark:from-stone-900 dark:via-yellow-500 dark:to-stone-900 dark:text-stone-900 py-4'>
        Movies
      </h1>
      <div className='flex justify-center items-start w-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-slate-50 rounded-b-xl shadow-xl py-4 dark:bg-stone-900'>
          {itemList
            ?.filter((media) => media.media_type === 'movie')
            .map((media, index: number) => {
              return (
                <LinkMediaCard
                  key={index}
                  media={media}
                  role='linkMovieCard'
                  styles={{
                    link: 'relative h-[20rem] w-[200px] overflow-hidden flex justify-center items-center flex-col rounded-xl  bg-gradient-to-t from-stone-900 to-yellow-500  transition-full duration-200 hover:transform hover:scale-110 shadow-lg',
                    image: 'overflow-hidden  bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow',
                    size: (media as any).poster_path ? 'w200': undefined
                  }}
                />
              );
            })}
        </div>
      </div>
      <h1 className='w-full  bg-slate-300 text-slate-900 grid place-items-center text-xl uppercase font-black tracking-[0.6rem] shadow-lg dark:bg-gradient-to-r dark:from-stone-900 dark:via-yellow-500 dark:to-stone-900 dark:text-stone-900 py-4'>
        TV Shows
      </h1>
      <div className='flex justify-center items-start w-full place-content-start'>
        <div className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-slate-100 rounded-b-xl shadow-xl py-4 dark:bg-stone-900'>
          {itemList
            ?.filter((media) => media.media_type === 'tv')
            .map((media, index: number) => {
              return (
                <LinkMediaCard
                  key={index}
                  media={media}
                  role='linkTVCard'
                  styles={{
                    link: 'relative h-[20rem] w-[200px] overflow-hidden flex justify-center items-center flex-col rounded-xl  bg-gradient-to-t from-stone-900 to-yellow-500  transition-full duration-200 hover:transform hover:scale-110 shadow-lg',
                    image: 'overflow-hidden  bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow',
                    size: (media as any).poster_path ? 'w200': undefined
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <div className='bg-slate-200 rounded-b-xl shadow-xl grid place-items-center font-poppins text-base py-4 dark:bg-stone-900'>
      <div className='ring-slate-300 ring-2 text-slate-900 bg-slate-200 rounded-xl px-8 py-2 font-semibold flex gap-2 items-center dark:bg-yellow-50 '>
        {iconHelper.exclamation('text-xl')}
        No Movie or TV Show exists with that name
      </div>
    </div>
  );
};
const SuspenseState = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-slate-100 rounded-b-xl shadow-xl py-4 dark:bg-stone-900'>
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
    <SearchResult />
  </Wrapper>
);
