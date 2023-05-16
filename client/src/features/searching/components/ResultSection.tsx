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
        className='flex font-poppins text-xl font-black tracking-[0.1rem] text-stone-600 px-8 items-center gap-4 bg-stone-200 rounded-t-xl py-4 border-b-4 border-stone-400 shadow-xl'
        onClick={() => {
          setHasQueryFilters((prev) => !prev);
          window.scrollTo(0, 0);
        }}
      >
        <div className='flex items-center gap-4'>
          <div>Search Results for </div>
          <div className='px-4 py-2 rounded-lg bg-stone-500 text-stone-200 uppercase font-extrabold'>
            {query ?? '?'}
          </div>
        </div>
        {hasQueryFilters ? (
          <div className='rounded-full bg-stone-300 ring-2 ring-stone-500 grid place-items-center w-[1.4rem] h-[1.4rem]'>
            {iconHelper.down('text-lg text-stone-500')}
          </div>
        ) : (
          <div className='rounded-full bg-stone-300 ring-2 ring-stone-500 grid place-items-center w-[1.4rem] h-[1.4rem]'>
            {iconHelper.up('text-lg text-stone-500')}
          </div>
        )}
      </ButtonComponent>
      {!hasQueryFilters && <SearchResult />}
      <h1 className='mt-8 font-poppins text-xl font-black tracking-[0.1rem] text-stone-600 bg-stone-200 rounded-t-xl py-4 border-b-4 px-8 border-stone-400 shadow-xl flex items-center gap-4 flex-wrap'>
        <span>Filtered Results by</span>
        {mediaType === 'movie'
          ? [
              'Movies',
              movieFiltersStore.sort_by,
              'Genre Ids: ' + [...(movieFiltersStore.with_genres ?? [])].join(','),
              'Year release: ' + movieFiltersStore.year,
            ].map((item, index) => (
              <div
                key={index}
                className='px-4 py-2 rounded-lg bg-stone-500 text-stone-200 capitalize
                text-base'
              >
                {item ?? '?'}
              </div>
            ))
          : [
              'TV Shows',
              tvFiltersStore.sort_by,
              'Genre Ids: ' + [...(tvFiltersStore.with_genres ?? [])].join(','),
              'Year release: ' + tvFiltersStore.first_air_date_year,
              'Status: ' + (tvFiltersStore.with_status ?? 'None'),
              'Type: ' + (tvFiltersStore.with_type ?? 'None'),
            ].map((item, index) => (
              <div
                key={index}
                className='px-4 py-2 rounded-lg bg-stone-500 text-stone-200 capitalize
                text-base'
              >
                {item ?? '?'}
              </div>
            ))}
      </h1>
      <FilterResult />
    </div>
  );
};

export default ResultSection;
