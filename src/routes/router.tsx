import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { getMovieGenresQuery, getTVGenresQuery } from '@/queries';
import Explore from '@/pages/Explore';
import { search_queries } from '@/features/searching';
import { watch_queries } from '@/features/watching';
import { Params } from 'react-router-dom';
import Media from '@/pages/Media';

const queryClient = new QueryClient();

export const appLoader = async (queryClient: QueryClient) => {
  return await Promise.all(
    [getMovieGenresQuery, getTVGenresQuery].map((query) => {
      return queryClient.ensureQueryData(query());
    }),
  );
};

export const exploreLoader = async (queryClient: QueryClient) => {
  return await queryClient.ensureQueryData(
    search_queries.getFilteredTVListQuery({ sort_by: 'popularity.desc' }),
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
    watch_queries.getItemDetailQuery((params as any).type, params.id),
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
        element: <Home />,
      },
      {
        path: '/discover',
        element: <Explore />,
        loader: () => exploreLoader(queryClient),
      },
      {
        path: '/profile',
        element: <Profile />,
        // loader: () => homeLoader(queryClient),
      },
      {
        path: '/:type/:id',
        element: <Media />,
        loader: ({ params }) => itemLoader({ queryClient, params }),
      },
    ],
  },
]);
