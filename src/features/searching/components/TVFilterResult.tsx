import React, { Suspense } from 'react';
import { useFilteredTVListQuery } from '../hooks/useFilteredTVListQuery';
import { useAtom } from 'jotai';
import { tvFilterListAtom } from '../atoms';
import { ErrorBoundary } from 'react-error-boundary';
import { TVType } from '@/types/types';
import TVCard from '@/components/tv/TVCard';

const TVFilterResult = () => {
  const [filterList] = useAtom(tvFilterListAtom);
  const { data: filteredTVList } = useFilteredTVListQuery(filterList);
  return (
    <div>
      <pre>{JSON.stringify(filterList, null, '\t')}</pre>
      {filteredTVList?.results?.map((filteredTV: TVType, index: number) => {
        return <TVCard key={index} tv={filteredTV} />
      })}
    </div>
  );
};

export default () => (
  <ErrorBoundary fallback={<div>Error Filtered TV List Result</div>}>
    <Suspense fallback={<div>Loading</div>}>
      <TVFilterResult />
    </Suspense>
  </ErrorBoundary>
);
