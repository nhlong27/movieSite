import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import App from '@/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { getMovieGenresQuery, getTVGenresQuery } from '@/queries';
import { watch_queries } from '@/features/watching';
import { Params } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import { SkeletonTheme } from 'react-loading-skeleton';
import LoadingPage from '@/pages/LoadingPage';

const queryClient = new QueryClient();

const ExplorePage = React.lazy(() => import('@/pages/ExplorePage'));
const MediaPage = React.lazy(() => import('@/pages/MediaPage'));
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage'));
const ErrorPage = React.lazy(() => import('@/pages/ErrorPage'));

export const appLoader = async (queryClient: QueryClient) => {
  return await Promise.all(
    [getMovieGenresQuery, getTVGenresQuery].map((query) => {
      return queryClient.ensureQueryData(query());
    }),
  );
};

export const itemLoader = async ({
  params,
  queryClient,
}: {
  params: Readonly<Params<string>>;
  queryClient: QueryClient;
}) => {
  return await queryClient.ensureQueryData(
    watch_queries.getItemDetailQuery((params as any).mediaType, params.id),
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SkeletonTheme baseColor='#1c1917' highlightColor='#737373'>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Provider>
      </SkeletonTheme>
    ),
    loader: () => appLoader(queryClient),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/discover/',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: '/:mediaType/:id',
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <MediaPage />
          </Suspense>
        ),
        loader: ({ params }) => itemLoader({ queryClient, params }),
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
