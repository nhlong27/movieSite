import { mediaTypeAtom } from '@/App';
import { mediaTypeConfig } from '@/config/constants';
import { useAtom } from 'jotai';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import HomeResult from './HomeMovieResult';
import HomeTVResult from './HomeTVResult';
import ToggleMediaType from './ToggleMediaType';
import ToggleStatus from './ToggleStatus';

const HomeContainer = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  return (
    <div>
      <ToggleMediaType />
      <ToggleStatus />
      {mediaTypeConfig[mediaType].statusList.map((status: string, index: number) => {
        return (
          <ErrorBoundary key={index} fallback={<div>Error</div>}>
            <Suspense fallback={<div>Loading</div>}>
              {mediaType === 'movie' ? (
                <HomeResult status={status} />
              ) : (
                <HomeTVResult status={status} />
              )}
            </Suspense>
          </ErrorBoundary>
        );
      })}
    </div>
  );
};

export default HomeContainer;
