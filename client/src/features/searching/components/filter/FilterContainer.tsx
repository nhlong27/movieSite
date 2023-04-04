import React from 'react';
import FilterSection from './FilterSection';
import Wrapper from '@/components/ui/Wrapper';
import FilterResult from './FilterResult';
import { useQueryClient } from '@tanstack/react-query';
import { getFilteredItemListQuery } from '../../queries';

const FilterContainer = () => {
  const queryClient = useQueryClient();
  const data = queryClient.ensureQueryData({
    ...getFilteredItemListQuery('tv', 'discover', { sort_by: 'popularity.desc' }),
  });
  return (
    <div>
      Filter section:
      <FilterSection />
      <FilterResult />
    </div>
  );
};

export default () => (
  <Wrapper>
    <FilterContainer />
  </Wrapper>
);
