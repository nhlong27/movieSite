import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { getMovieGenresQuery, getTVGenresQuery } from '@/queries';
import { watch_queries } from '@/features/watching';
import { Params } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import MediaPage from '@/pages/MediaPage';
import ProfilePage from '@/pages/ProfilePage';
import AuthPage from '@/pages/AuthPage';

const queryClient = new QueryClient();

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
      <Provider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    ),
    loader: () => appLoader(queryClient),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/discover/',
        element: <ExplorePage />,
      },
      {
        path: '/:mediaType/:id',
        element: <MediaPage />,
        loader: ({ params }) => itemLoader({ queryClient, params }),
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
    ],
  },
]);
