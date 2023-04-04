import { Outlet, useLoaderData } from 'react-router-dom';
import React from 'react';
import { atom, useAtom } from 'jotai';
import { appLoader } from './routes/router';
import { search_queries } from './features/searching';
import Header from './components/Header';
import Footer from './components/Footer';
import DropDownMenu from './components/DropDownMenu';

export const mediaTypeAtom = atom<'movie' | 'tv'>('movie');
export const featureAtom = atom<'home' | 'discover'>('home');
export const isDropdownAtom = atom<boolean>(false);
export const isFilterAtom = atom<boolean>(false);

function App() {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof appLoader>>;


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
    <div className='min-h-screen w-screen flex flex-col items-center gap-4 z-0'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
