import React from 'react';
import { useItemListQuery } from '../../hooks/useItemListQuery';
import { MovieType, TVType } from '@/types/types';
import Wrapper from '@/components/handling/Wrapper';
import MediaCard from '@/components/specific/MediaCard';
import { useAtom } from 'jotai';
import { hasQueryFiltersAtom } from '@/App';

const SearchResult = () => {
  const [hasQueryFilters] = useAtom(hasQueryFiltersAtom);

  const { data: itemList } = useItemListQuery();
  return itemList ? (
    (itemList.results ?? []).length > 0 ? (
      <div data-testid='result' className={`${hasQueryFilters ? 'max-h-0' : 'max-h-screen'} transition-all duration-500 overflow-hidden flex flex-col w-full`}>
        Movie:
        <div className='flex justify-center items-start w-full'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-4 2xl:gap-4 place-items-center w-full'>
          {itemList?.results
            ?.filter((media) => media.media_type === 'movie' && media.poster_path)
            .map((media, index: number) => {
              return (
                <MediaCard
                  key={index}
                  media={media as MovieType}
                  mediaType='movie'
                  options={{
                    wrapperComponent: {
                      className: 'w-[200px] overflow-hidden flex justify-center items-center flex-col',
                    },
                    lazyImageComponent: {
                      size: 'w200',
                    },
                  }}
                />
              );
            })}
          </div>
        </div>
        TV:
        <div className='flex justify-center items-start w-full'>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-y-4 2xl:gap-4 place-items-center w-full'>
          {itemList?.results
            ?.filter((media) => media.media_type === 'tv' && media.poster_path)
            .map((media, index: number) => {
              return (
                <MediaCard
                  key={index}
                  media={media as TVType}
                  mediaType='tv'
                  options={{
                    wrapperComponent: {
                      className: 'w-[200px] overflow-hidden flex justify-center items-center flex-col',
                    },
                    lazyImageComponent: {
                      size: 'w200',
                    },
                  }}
                />
              );
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
