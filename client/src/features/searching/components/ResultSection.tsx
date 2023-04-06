import { hasQueryFiltersAtom } from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import SearchResult from './query/SearchResult';
import FilterResult from './filter/FilterResult';

const ResultSection = () => {
  const [hasQueryFilters] = useAtom(hasQueryFiltersAtom);

  return (
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col'>
      Search Results:
      {!hasQueryFilters ? <SearchResult /> : null}
      Filter Resutls:
      <FilterResult />
    </div>
  );
};

export default ResultSection;
