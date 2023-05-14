import React from 'react';
import { useItemListQuery } from '../../hooks/useItemListQuery';
import Wrapper from '@/components/handling/Wrapper';
import { useAtom } from 'jotai';
import { hasQueryFiltersAtom } from '@/App';
import LinkMediaCard from '@/components/specific/LinkMediaCard';
import Skeleton from 'react-loading-skeleton';
import { ItemListType } from '../../types';
import { MovieType, TVType } from '@/types/types';
const SearchResult = () => {
  const [hasQueryFilters] = useAtom(hasQueryFiltersAtom);

  const { data: itemList } = useItemListQuery((data: ItemListType) =>
    data?.results?.filter((media) => (media as MovieType | TVType).poster_path),
  );

  return (itemList ?? []).length > 0 ? (
    <div
      className={`${
        hasQueryFilters ? 'max-h-0' : 'max-h-min'
      } transition-all duration-500 overflow-hidden flex flex-col w-full bg-stone-200 rounded-b-xl font-poppins shadow-xl`}
    >
      <h1 className='w-full h-[2rem] bg-stone-500 text-stone-100 grid place-items-center text-xl uppercase font-black tracking-[0.6rem] shadow-lg'>
        Movies
      </h1>
      <div className='flex justify-center items-start w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-4 2xl:gap-4 place-items-center w-full place-content-start py-4'>
          {itemList
            ?.filter((media) => media.media_type === 'movie')
            .map((media, index: number) => {
              return (
                <LinkMediaCard
                  key={index}
                  media={media}
                  role='linkMovieCard'
                  styles={{
                    link: 'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col relative shadow-lg rounded-xl',
                    detail: 'mt-auto min-h-[4rem] flex flex-col w-11/12',
                    size: (media as any).poster_path ? 'w200': undefined
                  }}
                />
              );
            })}
        </div>
      </div>
      <h1 className='w-full h-[2rem] bg-stone-500 text-stone-100 grid place-items-center text-xl uppercase font-black tracking-[0.6rem] shadow-lg'>
        TV Shows
      </h1>
      <div className='flex justify-center items-start w-full  place-content-start'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1  2xl:grid-cols-6 gap-y-4 2xl:gap-4 place-items-center w-full py-4'>
          {itemList
            ?.filter((media) => media.media_type === 'tv')
            .map((media, index: number) => {
              return (
                <LinkMediaCard
                  key={index}
                  media={media}
                  role='linkTVCard'
                  styles={{
                    link: 'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col relative shadow-lg rounded-xl',
                    detail: 'mt-auto min-h-[4rem] flex flex-col w-11/12',
                    size: (media as any).poster_path ? 'w200': undefined
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <div className='bg-stone-300 rounded-b-xl shadow-xl grid place-items-center  font-poppins text-lg py-4'>
      <div className='ring-stone-600 ring-2 text-stone-900 bg-stone-400 rounded-xl px-8 py-2 font-bold'>
        No Movie or TV Show exists with that name
      </div>
    </div>
  );
};
const SuspenseState = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen bg-stone-200 rounded-b-xl shadow-xl'>
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
