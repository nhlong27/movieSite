import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './ErrorComponent';
import { Suspense } from 'react';
import SuspenseComponent from './SuspenseComponent';

const Wrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent}>
      <Suspense fallback={<SuspenseComponent />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default Wrapper;
