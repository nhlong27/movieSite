import React from 'react';
import { useItemListQuery } from '../../hooks/useItemListQuery';
import { MovieType, TVType } from '@/types/types';
import Wrapper from '@/components/handling/Wrapper';
import SimpleShowCard from '@/components/specific/SimpleShowCard';

const SearchResult = () => {
  const { data: itemList } = useItemListQuery();
  return itemList ? (
    (itemList.results ?? []).length > 0 ? (
      <div data-testid='result' className='flex flex-col w-full'>
        Movie:
        <div aria-label='movie' className='flex flex-wrap gap-4 w-full'>
          {itemList?.results
            ?.filter((item) => item.media_type === 'movie' && item.poster_path)
            .map((item, index: number) => {
              return (
                <SimpleShowCard
                  key={index}
                  item={item as MovieType}
                  mediaType='movie'
                  options={{
                    buttonComponent: {
                      className: `max-w-[20rem] w-[10rem] flex justify-center items-center flex-col 
                    transition-all
                    ease-in-out
                    aspect-[9/16]
                      duration-500
                      `,
                    },
                    lazyImageComponent: {
                      size: 'original',
                    },
                  }}
                />
              );
            })}
        </div>
        TV:
        <div aria-label='tv' className='flex flex-wrap gap-4 w-full'>
          {itemList?.results
            ?.filter((item) => item.media_type === 'tv' && item.poster_path)
            .map((item, index: number) => {
              return (
                <SimpleShowCard
                  key={index}
                  item={item as TVType}
                  mediaType='tv'
                  options={{
                    buttonComponent: {
                      className: `max-w-[20rem] w-[10rem] flex justify-center items-center flex-col 
                    transition-all
                    ease-in-out
                    aspect-[9/16]
                      duration-500
                      `,
                    },
                    lazyImageComponent: {
                      size: 'original',
                    },
                  }}
                  // <div>{(item as MovieType | TVType).vote_average}</div>
                  // <div>{(item as TVType).first_air_date}</div>
                  // <div className='truncate w-full'>{(item as TVType).name}</div>
                />
              );
            })}
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
