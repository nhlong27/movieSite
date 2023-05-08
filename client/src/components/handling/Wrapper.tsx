import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import React from 'react';
import ErrorComponent from './ErrorComponent';
import { ComponentType, Suspense } from 'react';
import SkeletonComponent from './SkeletonComponent';

const Wrapper = ({
  children,
  errorComponent,
  suspenseComponent,
  errorConfigs,
}: {
  children: JSX.Element;
  errorComponent?: ComponentType<FallbackProps>;
  suspenseComponent?: JSX.Element;
  errorConfigs?: Record<string, any>;
}) => {
  return (
    <ErrorBoundary
      FallbackComponent={
        errorComponent ?? ((props) => <ErrorComponent {...props} errorConfigs={errorConfigs} />)
      }
    >
      <Suspense fallback={suspenseComponent ?? <SkeletonComponent />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default Wrapper;
