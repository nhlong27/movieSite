import { hasQueryFiltersAtom } from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import SearchResult from './query/SearchResult';
import FilterResult from './filter/FilterResult';
import ButtonComponent from '@/components/generic/ButtonComponent';

const ResultSection = () => {
  const [_, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);

  return (
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col'>
      <ButtonComponent onClick={()=>setHasQueryFilters(prev=>!prev)}>
        Search Results
        </ButtonComponent>
      <SearchResult />
      Filter Resutls:
      <FilterResult />
    </div>
  );
};

export default ResultSection;
