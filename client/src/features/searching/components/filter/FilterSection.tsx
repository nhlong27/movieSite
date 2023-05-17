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
    <div className='order-first px-2 col-start-1 md:col-start-4 h-auto'>
      <div
        ref={animationParentRef}
        className='md:sticky md:top-[6vh] h-auto w-full flex flex-col rounded-xl bg-stone-200 dark:bg-yellow-500 justify-start items-center font-poppins shadow-xl'
      >
        {!hasQueryFilters && (
          <div className=' bg-stone-300 w-full rounded-xl dark:bg-yellow-500 pt-4'>
            <h1 className='text-lg border-b-2 border-stone-500  dark:border-yellow-600 text-yellow-700 font-bold tracking-wider px-4 py-2 dark:text-stone-900'>
              Previous searches
            </h1>
            <ul className=' bg-yellow-400 shadow-inner'>
              {JSON.parse(localStorage.getItem('queries') ?? JSON.stringify([]))
                .reverse()
                .map((query: string | undefined, index: number) => (
                  <li
                    className='cursor-pointer font-bold tracking-wide text-stone-500 hover:bg-stone-500 pl-4 hover:text-stone-300 dark:text-stone-700 py-2 dark:hover:bg-yellow-500'
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
          className='bg-stone-300 hover:bg-stone-400 w-full  grid place-items-center font-poppins py-4  dark:bg-stone-800  text-stone-600  dark:text-yellow-500  '
          onClick={() => {
            setHasQueryFilters((prev) => !prev);
            window.scrollTo(0, 0);
          }}
        >
          <div className='w-11/12 dark:ring-2 dark:hover:bg-yellow-400  dark:ring-yellow-500 dark:hover:text-stone-900 dark:hover:ring-stone-900 px-4 py-4 flex items-center justify-center gap-2  rounded-sm'>
            <span className='text-xl font-black tracking-wide '>
              {hasQueryFilters ? 'Hide' : 'Show'} options
            </span>
            {hasQueryFilters ? (
              <div className='ring-2 ring-stone-600 rounded-sm'>{iconHelper.close('text-lg')}</div>
            ) : (
              <div>{iconHelper.open('text-2xl')}</div>
            )}
          </div>
        </ButtonComponent>
        {hasQueryFilters && (
          <div className={` overflow-hidden w-full font-poppins `}>
            <div className='flex justify-evenly py-4 text-xl font-bold tracking-wide dark:border-b-2 dark:border-stone-800 dark:bg-amber-400'>
              <ButtonComponent
                className={`${
                  mediaType === 'movie'
                    ? 'border-b-4 border-stone-500 text-stone-600 bg-amber-100 dark:bg-stone-900 dark:text-yellow-500 dark:border-none'
                    : 'text-stone-500 dark:text-stone-900'
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
                    ? 'border-b-4 border-stone-500 text-stone-600 bg-amber-100 dark:bg-stone-900  dark:text-yellow-500 dark:border-none'
                    : 'text-stone-500 dark:text-stone-900'
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
          <div className='h-auto w-full overflow-hidden'>
            <img src={imageHelper.background2} alt='background' className='object-cover' />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
