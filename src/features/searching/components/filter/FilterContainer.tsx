import React from 'react';
import MovieFilterResult from './MovieFilterResult';
import FilterSection from './FilterSection';
import TVFilterResult from './TVFilterResult';
import ToggleMediaType from '../home/ToggleMediaType';
import { useAtom } from 'jotai';
import { mediaTypeAtom } from '@/App';

const FilterContainer = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  return (
    <div>
      <ToggleMediaType />

      <FilterSection />
      {mediaType === 'movie' ? <MovieFilterResult /> : <TVFilterResult />}
    </div>
  );
};

export default FilterContainer;
