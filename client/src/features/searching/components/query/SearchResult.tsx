import React from 'react';
import { useItemListQuery } from '../../hooks/useItemListQuery';
import Wrapper from '@/components/handling/Wrapper';
import { useAtom } from 'jotai';
import { hasQueryFiltersAtom } from '@/App';
import LinkMediaCard from '@/components/specific/LinkMediaCard';

const SearchResult = () => {
  const [hasQueryFilters] = useAtom(hasQueryFiltersAtom);

  const { data: itemList } = useItemListQuery();
  return itemList ? (
    (itemList.results ?? []).length > 0 ? (
      <div
        data-testid='result'
        className={`${
          hasQueryFilters ? 'max-h-0' : 'max-h-screen'
        } transition-all duration-500 overflow-hidden flex flex-col w-full`}
      >
        Movie:
        <div className='flex justify-center items-start w-full'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-4 2xl:gap-4 place-items-center w-full'>
            {itemList?.results
              ?.filter((media) => media.media_type === 'movie' && media.poster_path)
              .map((media, index: number) => {
                return <LinkMediaCard key={index} media={media} role='linkMovieCard' />;
              })}
          </div>
        </div>
        TV:
        <div className='flex justify-center items-start w-full'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-4 2xl:gap-4 place-items-center w-full'>
            {itemList?.results
              ?.filter((media) => media.media_type === 'tv' && media.poster_path)
              .map((media, index: number) => {
                return <LinkMediaCard key={index} media={media} role='linkTVCard' />;
              })}
          </div>
        </div>
      </div>
    ) : (
      <div>Item not available</div>
    )
  ) : null;
};

export default () => (
  <Wrapper>
    <SearchResult />
  </Wrapper>
);
