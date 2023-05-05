import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import ErrorComponent from './ErrorComponent';
import { ComponentType, Suspense } from 'react';
import SkeletonComponent from './SkeletonComponent';

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
    <ErrorBoundary
      FallbackComponent={errorComponent ?? ErrorComponent}
    >
      <Suspense fallback={suspenseComponent ?? <SkeletonComponent />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default Wrapper;
