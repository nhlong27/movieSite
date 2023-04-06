import { currentURLPathAtom } from '@/App';
import { ResultSection } from '@/features/searching';
import FilterSection from '@/features/searching/components/filter/FilterSection';
import { getFilteredItemListQuery } from '@/features/searching/queries';
import { useQueryClient } from '@tanstack/react-query';

import { useAtom } from 'jotai';
import React from 'react';

const ExplorePage = () => {
  const [currentURLPath, setCurrentURLPath] = useAtom(currentURLPathAtom);

  React.useEffect(() => {
    setCurrentURLPath('discover');
  }, []);

  const queryClient = useQueryClient();
  const data = queryClient.ensureQueryData({
    ...getFilteredItemListQuery('tv', 'discover', {
      sort_by: 'popularity.desc',
      first_air_date_year: new Date().getFullYear(),
    }),
  });
  return currentURLPath === 'discover' ? (
    <div className='w-11/12 max-w-[1920px] min-w-[500px] flex flex-col min-h-screen'>
      <div className='md:grid md:grid-cols-4 flex flex-col gap-2 min-h-screen'>
        <ResultSection />
        <FilterSection />
      </div>
    </div>
  ) : null;
};

export default ExplorePage;
