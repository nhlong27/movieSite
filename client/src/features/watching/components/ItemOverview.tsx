import ErrorComponent from '@/components/handling/ErrorComponent';
import SuspenseComponent from '@/components/handling/SuspenseComponent';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';

const ItemOverView = () => {
  const { data } = useGetItemDetailQuery();
  return (
    <div>
      {/* {[
        'title',
        'overview',
        'vote_average',
        'vote_count',
        'runtime',
        'status',
        'tagline',
        'release_date',
      ].map((each, index) => {
        return <div key={index}>{each}: {movieDetail?.[each]}</div>;
      })} */}
      <div>
        Genres:
        {data?.genres?.map((genre, index) => {
          return <div key={index}>{genre.name}</div>;
        })}
        <div>Language: {data?.spoken_languages?.map((language) => language.name)}</div>
      </div>
    </div>
  );
};

export default () => (
  <ErrorBoundary FallbackComponent={ErrorComponent}>
    <Suspense fallback={<SuspenseComponent />}>
      <ItemOverView />
    </Suspense>
  </ErrorBoundary>
);
