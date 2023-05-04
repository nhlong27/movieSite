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

  const { data: itemList } = useItemListQuery((data: ItemListType)=>data?.results?.filter((media)=>(media as MovieType | TVType).poster_path));

  return (itemList ?? []).length > 0 ? (
    <div
      data-testid='result'
      className={`${
        hasQueryFilters ? 'max-h-0' : 'max-h-screen'
      } transition-all duration-500 overflow-hidden flex flex-col w-full`}
    >
      Movie:
      <div className='flex justify-center items-start w-full'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-4 2xl:gap-4 place-items-center w-full'>
          {itemList
            ?.filter((media) => media.media_type === 'movie')
            .map((media, index: number) => {
              return <LinkMediaCard key={index} media={media} role='linkMovieCard' />;
            })}
        </div>
      </div>
      TV:
      <div className='flex justify-center items-start w-full'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-4 2xl:gap-4 place-items-center w-full'>
          {itemList
            ?.filter((media) => media.media_type === 'tv')
            .map((media, index: number) => {
              return <LinkMediaCard key={index} media={media} role='linkTVCard' />;
            })}
        </div>
      </div>
    </div>
  ) : (
    <div>Item not found</div>
  );
};

export default () => (
  <Wrapper
    suspenseComponent={
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen'>
        {Array(20)
          .fill(0)
          .map((item, index) => (
            <div key={index} className='w-[200px] overflow-hidden h-[320px]'>
              <Skeleton className='h-full w-full' />
            </div>
          ))}
      </div>
    }
  >
    <SearchResult />
  </Wrapper>
);
