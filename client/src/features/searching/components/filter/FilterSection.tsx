import React from 'react';
import { useAtom } from 'jotai';
import { hasQueryFiltersAtom, mediaTypeAtom } from '@/App';
import ButtonComponent from '@/components/generic/ButtonComponent';
import MovieFilterSection from '@/features/searching/components/filter/MovieFilterSection';
import TVFilterSection from './TVFilterSection';

const FilterSection: React.FC = () => {
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);
  return (
    <div className='order-first srhink p-2  col-start-1 md:col-start-4 md:h-full'>
      <div className='md:sticky md:top-[6vh]  md:min-h-1/2 w-full flex flex-col'>
        <button onClick={() => setHasQueryFilters(prev=>!prev)}>More options</button>

        <div
          className={`${
            hasQueryFilters ? 'max-h-[30rem]' : 'max-h-0'
          } overflow-hidden transition-all duration-300 w-full`}
        >
          <div>
            <ButtonComponent onClick={() => setMediaType('movie')}>Movies</ButtonComponent>
            <ButtonComponent onClick={() => setMediaType('tv')}>TV Shows</ButtonComponent>
          </div>
          {mediaType === 'movie' ? <MovieFilterSection /> : <TVFilterSection />}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
