import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import ErrorComponent from './ErrorComponent';
import { ComponentType, Suspense } from 'react';
import SkeletonComponent from './SkeletonComponent';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

const Wrapper = ({
  children,
  errorComponent,
  suspenseComponent,
}: {
  children: JSX.Element;
  errorComponent?: ComponentType<FallbackProps>;
  suspenseComponent?: JSX.Element;
}) => {
  return (
    // <QueryErrorResetBoundary>
    //   {({ reset }) => (
    <ErrorBoundary
      // onReset={reset}
      FallbackComponent={errorComponent ?? ErrorComponent}
    >
      <Suspense fallback={suspenseComponent ?? <SkeletonComponent />}>{children}</Suspense>
    </ErrorBoundary>
    //   )}
    // </QueryErrorResetBoundary>
  );
};

export default Wrapper;
