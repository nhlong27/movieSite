import React from 'react';
import { useAtom } from 'jotai';
import { hasQueryFiltersAtom, mediaTypeAtom } from '@/App';
import ButtonComponent from '@/components/generic/ButtonComponent';
import MovieFilterSection from '@/features/searching/components/filter/MovieFilterSection';
import TVFilterSection from './TVFilterSection';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { queryAtom } from '../../atoms';
import { handleQueryInput } from '../query/SearchBar';
import { IoMdOpen, IoMdClose } from 'react-icons/io';

const FilterSection: React.FC = () => {
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);
  const [animationParentRef] = useAutoAnimate();

  const [_, setQuery] = useAtom(queryAtom);

  return (
    <div className='order-first shrink px-2 col-start-1 md:col-start-4 md:h-full'>
      <div
        ref={animationParentRef}
        className='md:sticky md:top-[6vh] md:min-h-1/2 w-full flex flex-col rounded-xl bg-stone-200 justify-center items-center font-poppins shadow-xl pt-4'
      >
        {!hasQueryFilters && (
          <div className=' bg-stone-300 w-11/12 rounded-xl px-4 py-2'>
            <h1 className='text-lg border-b-2 border-stone-500 text-yellow-700 font-bold tracking-wider'>
              Previous searches
            </h1>
            <ul className='py-2'>
              {JSON.parse(localStorage.getItem('queries') ?? JSON.stringify([]))
                .reverse()
                .map((query: string | undefined, index: number) => (
                  <li
                    className='cursor-pointer font-bold tracking-wide text-stone-500 hover:bg-stone-500 pl-4 rounded-2xl hover:text-stone-300'
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
          className='bg-stone-300 hover:bg-stone-400 w-full px-4 py-2 mt-4 flex items-center justify-center gap-2 font-poppins'
          onClick={() => {
            setHasQueryFilters((prev) => !prev);
            window.scrollTo(0, 0);
          }}
        >
          <span className='text-xl font-black tracking-wide text-stone-600'>
            {hasQueryFilters ? 'Hide' : 'Show'} options
          </span>
          {hasQueryFilters ? (
            <div className='ring-2 ring-stone-600 rounded-sm'>
              <IoMdClose className='text-lg' />
            </div>
          ) : (
            <div>
              <IoMdOpen className='text-2xl' />
            </div>
          )}
        </ButtonComponent>
        {hasQueryFilters && (
          <div className={` overflow-hidden w-full font-poppins `}>
            <div className='flex justify-evenly py-4 text-xl  font-bold tracking-wide'>
              <ButtonComponent
                className={`${
                  mediaType === 'movie'
                    ? 'border-b-4 border-stone-500 text-stone-600 bg-amber-100'
                    : 'text-stone-500'
                } px-8 py-2 transition-all duration-500`}
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
                    ? 'border-b-4 border-stone-500 text-stone-600 bg-amber-100'
                    : 'text-stone-500'
                } px-8 py-2 transition-all duration-500`}
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
      </div>
    </div>
  );
};

export default FilterSection;
