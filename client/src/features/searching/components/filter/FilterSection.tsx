import React from 'react';
import { useAtom } from 'jotai';
import { hasQueryFiltersAtom, mediaTypeAtom } from '@/App';
import ButtonComponent from '@/components/generic/ButtonComponent';
import MovieFilterSection from '@/features/searching/components/filter/MovieFilterSection';
import TVFilterSection from './TVFilterSection';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { queryAtom } from '../../atoms';
import { handleQueryInput } from '../query/SearchBar';
import { iconHelper } from '@/config/icons';
import { imageHelper } from '@/config/images';

const FilterSection: React.FC = () => {
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);
  const [animationParentRef] = useAutoAnimate();

  const [_, setQuery] = useAtom(queryAtom);

  return (
    <div className='order-first px-2 col-start-1 lg:col-start-4 h-auto'>
      <div
        ref={animationParentRef}
        className='h-auto lg:w-full w-3/4 mx-auto flex flex-col rounded-xl bg-slate-50 dark:bg-transparent justify-start items-center font-poppins shadow-xl'
      >
        {!hasQueryFilters && (
          <div className=' bg-slate-50 w-full rounded-xl dark:bg-transparent'>
            <h1 className='text-lg border-b-2 border-slate-200  dark:border-yellow-500 text-slate-800 font-bold tracking-wider px-4 py-2 dark:text-yellow-400'>
              Previous searches
            </h1>
            <ul className=' bg-transparent shadow-inner'>
              {JSON.parse(localStorage.getItem('queries') ?? JSON.stringify([]))
                .reverse()
                .map((query: string | undefined, index: number) => (
                  <li
                    className='cursor-pointer tracking-wide text-slate-400 pl-4 hover:text-slate-600 dark:text-stone-300 py-2 dark:hover:text-stone-500'
                    key={index}
                    onClick={(e) => {
                      handleQueryInput(e.currentTarget.innerText);
                      setQuery(e.currentTarget.innerText);
                    }}
                  >
                    {query}
                  </li>
                ))}
            </ul>
          </div>
        )}
        <ButtonComponent
          className='bg-slate-200 hover:bg-slate-300 w-full  grid place-items-center font-poppins  dark:bg-stone-800  text-stone-600  dark:text-yellow-500  '
          onClick={() => {
            setHasQueryFilters((prev) => !prev);
            window.scrollTo(0, 0);
          }}
        >
          <div className='w-11/12 dark:ring-2 dark:hover:bg-yellow-500  dark:ring-yellow-500 dark:hover:text-stone-900 dark:hover:ring-stone-900 px-4 py-2 flex items-center justify-center gap-2  rounded-sm'>
            <span className='text-base tracking-wide '>
              {hasQueryFilters ? 'Hide' : 'Show'} options
            </span>
            {hasQueryFilters ? (
              <div className='ring-2 ring-slate-500 rounded-sm'>{iconHelper.close('text-lg')}</div>
            ) : (
              <div>{iconHelper.open('text-xl')}</div>
            )}
          </div>
        </ButtonComponent>
        {hasQueryFilters && (
          <div className={`w-full font-poppins`}>
            <div className='flex justify-evenly py-4 text-lg font-semibold tracking-wide dark:border-b-2 dark:border-stone-800 dark:bg-stone-800'>
              <ButtonComponent
                className={`${
                  mediaType === 'movie'
                    ? 'border-b-4 border-slate-300 text-slate-900 bg-slate-300 dark:bg-stone-700 dark:text-yellow-400 dark:border-none'
                    : 'text-stone-500 dark:text-stone-300 dark:bg-stone-600'
                } px-8 py-2 transition-all duration-500 rounded-sm`}
                onClick={() => {
                  setMediaType('movie');
                  window.scrollTo(0, 0);
                }}
              >
                Movies
              </ButtonComponent>
              <ButtonComponent
                className={`${
                  mediaType === 'tv'
                    ? 'border-b-4 border-slate-300 text-slate-900 bg-slate-300 dark:bg-stone-700 dark:text-yellow-400 dark:border-none'
                    : 'text-stone-500 dark:text-stone-300 dark:bg-stone-600'
                } px-8 py-2 transition-all duration-500 rounded-sm`}
                onClick={() => {
                  setMediaType('tv');
                  window.scrollTo(0, 0);
                }}
              >
                TV Shows
              </ButtonComponent>
            </div>
            {mediaType === 'movie' ? <MovieFilterSection /> : <TVFilterSection />}
          </div>
        )}
        {!hasQueryFilters && (
          <div className='h-auto w-full hidden lg:flex overflow-hidden'>
            <img src={imageHelper.background2} alt='background' className='object-cover' />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
