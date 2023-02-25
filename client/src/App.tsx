import { Outlet, Link, useLoaderData, useParams } from 'react-router-dom';
import React from 'react';
import { atom, useAtom } from 'jotai';
import { appLoader } from './routes/router';
import { search_queries } from './features/searching';
import ToggleMediaType from './components/ToggleMediaType';

export const mediaTypeAtom = atom<'movie' | 'tv'>('movie');
export const featureAtom = atom<'home' | 'discover'>('home');

function App() {
  const params = useParams();
  const initialData = useLoaderData() as Awaited<ReturnType<typeof appLoader>>;
  const [_, setFeature] = useAtom(featureAtom);

  React.useEffect(() => {
    search_queries.mediaTypeConfig.movie.discover.paramList = {
      ...search_queries.mediaTypeConfig.movie.discover.paramList,
      with_genres: [...initialData[0].genres],
    };
    search_queries.mediaTypeConfig.tv.discover.paramList = {
      ...search_queries.mediaTypeConfig.tv.discover.paramList,
      with_genres: [...initialData[1].genres],
    };
  }, []);

  return (
    <div className='w-screen h-screen'>
      {/*Header Nav begins */}
      <div className='flex gap-4'>
        <Link onClick={() => setFeature('home')} to='/'>
          Home
        </Link>
        <Link onClick={() => setFeature('discover')} to='/discover'>
          Discover
        </Link>

        <Link to='/profile'>profile</Link>
      </div>
      <br />
      {!params.mediaType && <ToggleMediaType />}
      <br />
      {/* Nav ends */}

      <Outlet />

      {/* Footer */}
    </div>
  );
}

export default App;
