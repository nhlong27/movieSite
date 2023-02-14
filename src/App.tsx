import { Outlet, Link, useLoaderData} from 'react-router-dom';
import React from 'react';
import { atom } from 'jotai';
import { mediaTypeConfig } from './config/constants';
import { appLoader } from './routes/router';

export const mediaTypeAtom = atom<string>('movie')

function App() {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof appLoader>>;
  mediaTypeConfig.movie= { ...mediaTypeConfig.movie, 'with_genres': [...initialData[0].genres]}
  mediaTypeConfig.tv= { ...mediaTypeConfig.tv, 'with_genres': [...initialData[1].genres]}

  return (
    <div className='w-screen h-screen'>
      {/*Header Nav begins */}
      <Link to='/'>Home</Link>
      <Link to='discover'>Explore</Link>
      <Link to='profile'>Profile</Link>
      {/* Nav ends */}

      <Outlet />

      {/* Footer */}
    </div>
  );
}

export default App;
