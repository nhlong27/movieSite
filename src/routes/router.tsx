import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { getMovieGenresQuery, getTVGenresQuery } from '@/queries';
import Explore from '@/pages/Explore';

const queryClient = new QueryClient();

export const appLoader = async (queryClient: QueryClient) => {
  return await Promise.all(
    [getMovieGenresQuery, getTVGenresQuery ].map((query) => {
      return queryClient.ensureQueryData(query());
    }),
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
    loader: ()=>appLoader(queryClient),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/discover',
        element: <Explore />,
        // loader: () => homeLoader(queryClient),
      },
      {
        path: '/profile',
        element: <Profile />,
        // loader: () => homeLoader(queryClient),
      },
    ],
  },
]);
