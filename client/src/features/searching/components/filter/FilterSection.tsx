import React from 'react';
import { useAtom } from 'jotai';
import { hasQueryFiltersAtom, mediaTypeAtom } from '@/App';
import ButtonComponent from '@/components/generic/ButtonComponent';
import MovieFilterSection from '@/features/searching/components/filter/MovieFilterSection';
import TVFilterSection from './TVFilterSection';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { queryAtom } from '../../atoms';
import { handleQueryInput } from '../query/SearchBar';

const FilterSection: React.FC = () => {
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);
  const [animationParentRef] = useAutoAnimate();

  const [_, setQuery] = useAtom(queryAtom);

  return (
    <div className='order-first srhink p-2  col-start-1 md:col-start-4 md:h-full'>
      <div
        ref={animationParentRef}
        className='md:sticky md:top-[6vh]  md:min-h-1/2 w-full flex flex-col'
      >
        {!hasQueryFilters && (
          <ul>
            {JSON.parse(localStorage.getItem('queries') ?? JSON.stringify([]))
              .reverse()
              .map((query: string | undefined, index: number) => (
                <li
                  className='cursor-pointer hover:bg-gray-100'
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
        )}
        <button onClick={() => setHasQueryFilters((prev) => !prev)}>More options</button>
        {hasQueryFilters && (
          <div className={` overflow-hidden w-full`}>
            <div>
              <ButtonComponent onClick={() => setMediaType('movie')}>Movies</ButtonComponent>
              <ButtonComponent onClick={() => setMediaType('tv')}>TV Shows</ButtonComponent>
            </div>
            {mediaType === 'movie' ? <MovieFilterSection /> : <TVFilterSection />}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
