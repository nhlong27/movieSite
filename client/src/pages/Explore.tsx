import { isFilterAtom } from '@/App';
import FilterResult from '@/features/searching/components/filter/FilterResult';
import FilterSection from '@/features/searching/components/filter/FilterSection';
import SearchResult from '@/features/searching/components/query/SearchResult';
import { getFilteredItemListQuery } from '@/features/searching/queries';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React from 'react';

const Explore = () => {
  const [isFilter] = useAtom(isFilterAtom)
  const queryClient = useQueryClient();
  const data = queryClient.ensureQueryData({
    ...getFilteredItemListQuery('tv', 'discover', { sort_by: 'popularity.desc' }),
  });
  return (
    <div className='min-h-screen w-full flex justify-center items-center grow'>
      <div className='w-11/12 max-w-[1536px] min-w-[500px] min-h-screen grid md:grid-cols-4 grid-rows-2 grid-cols-1 md:grid-rows-1'>
        <div className='row-start-2 md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col'>
          {!isFilter ? <SearchResult /> : null}
          {/* <FilterResult /> */}
          <div>filter result</div>
        </div>
        <FilterSection />
      </div>
    </div>
  );
};

export default Explore;
