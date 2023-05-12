import { hasQueryFiltersAtom } from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import SearchResult from './query/SearchResult';
import FilterResult from './filter/FilterResult';
import ButtonComponent from '@/components/generic/ButtonComponent';
import {useAutoAnimate} from '@formkit/auto-animate/react'

const ResultSection = () => {
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);
  const [animationParentRef] = useAutoAnimate()
  return (
    <div ref={animationParentRef} className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col'>
      <ButtonComponent onClick={()=>setHasQueryFilters(prev=>!prev)}>
        Search Results
      </ButtonComponent>
      {!hasQueryFilters && <SearchResult />}
      Filter Resutls:
      <FilterResult />
    </div>
  );
};

export default ResultSection;
