import { hasQueryFiltersAtom, mediaTypeAtom } from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import SearchResult from './query/SearchResult';
import FilterResult from './filter/FilterResult';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { queryAtom } from '../atoms';
import { useMovieFiltersStore, useTVFiltersStore } from '../stores';
import { iconHelper } from '@/config/icons';
import { imageHelper } from '@/config/images';

const ResultSection = () => {
  const [query] = useAtom(queryAtom);
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);
  const [animationParentRef] = useAutoAnimate();
  const movieFiltersStore = useMovieFiltersStore();
  const tvFiltersStore = useTVFiltersStore();
  const [mediaType] = useAtom(mediaTypeAtom);
  return (
    <div
      ref={animationParentRef}
      className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col'
    >
      <ButtonComponent
        className='flex font-poppins text-xl font-black tracking-[0.1rem] text-stone-600 px-8 items-center gap-4 bg-stone-200 rounded-t-xl py-4 border-b-4 border-stone-400 shadow-xl dark:bg-stone-900 dark:border-yellow-600 dark:text-yellow-500'
        onClick={() => {
          setHasQueryFilters((prev) => !prev);
          window.scrollTo(0, 0);
        }}
      >
        <div className='flex items-center gap-4'>
          <div>Search Results for </div>
          <div className='px-4 py-2 rounded-lg bg-stone-500 text-stone-200 uppercase font-extrabold dark:bg-yellow-400 dark:text-stone-900'>
            {query ?? '?'}
          </div>
        </div>
        {hasQueryFilters ? (
          <div className='rounded-full bg-stone-300 ring-2 ring-stone-500 grid place-items-center w-[1.8rem] h-[1.8rem] dark:bg-stone-900 dark:ring-yellow-500 dark:text-yellow-500 text-stone-500 ml-auto'>
            {iconHelper.down('text-xl font-black ')}
          </div>
        ) : (
          <div className='rounded-full bg-stone-300 ring-2 ring-stone-500 grid place-items-center w-[1.8rem] h-[1.8rem] dark:bg-stone-900 dark:ring-yellow-500 dark:text-yellow-500 text-stone-500 ml-auto'>
            {iconHelper.up('text-xl ')}
          </div>
        )}
      </ButtonComponent>
      {!hasQueryFilters && <SearchResult />}
      {!hasQueryFilters && (
        <div className='w-full'>
          <img src={imageHelper.background3} alt='background' className='object-contain' />
        </div>
      )}
      <h1 className='mt-8 font-poppins text-xl font-black tracking-[0.1rem] text-stone-600 bg-stone-200 rounded-t-xl py-4 border-b-4 px-8 border-stone-400 shadow-xl flex items-center gap-4 flex-wrap dark:bg-stone-900 dark:text-yellow-500 dark:border-yellow-600'>
        <span>Filtered Results by</span>
        {mediaType === 'movie'
          ? [
              'Movies',
              movieFiltersStore.sort_by,
              'Genre Ids: ' + [...(movieFiltersStore.with_genres ?? [])].join(','),
              'Year release: ' + movieFiltersStore.year,
            ].map((item, index) => (
              <ButtonComponent
                onClick={() => setHasQueryFilters(true)}
                key={index}
                className='px-4 py-2 rounded-lg bg-stone-500 text-lime-200 capitalize
                text-base dark:bg-lime-400 dark:text-stone-900'
              >
                {item ?? '?'}
              </ButtonComponent>
            ))
          : [
              'TV Shows',
              tvFiltersStore.sort_by,
              'Genre Ids: ' + [...(tvFiltersStore.with_genres ?? [])].join(','),
              'Year release: ' + tvFiltersStore.first_air_date_year,
              'Status: ' + (tvFiltersStore.with_status ?? 'None'),
              'Type: ' + (tvFiltersStore.with_type ?? 'None'),
            ].map((item, index) => (
              <ButtonComponent
                onClick={() => setHasQueryFilters(true)}
                key={index}
                className='px-4 py-2 rounded-lg bg-stone-500 text-stone-200 capitalize
                text-base dark:bg-yellow-400 dark:text-stone-900'
              >
                {item ?? '?'}
              </ButtonComponent>
            ))}
      </h1>
      <FilterResult />
    </div>
  );
};

export default ResultSection;
