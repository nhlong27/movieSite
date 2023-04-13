import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import React from 'react';
import { atom } from 'jotai';
import { appLoader } from './routes/router';
import { search_queries } from './features/searching';
import Header from './components/Header';
import Footer from './components/Footer';
import DropDownMenu from './components/generic/DropDownMenu';

export const mediaTypeAtom = atom<'movie' | 'tv'>('movie');
export const currentURLPathAtom = atom<'home' | 'discover'>('home');
export const shouldDropdownDisplayAtom = atom<boolean>(false);
export const hasQueryFiltersAtom = atom<boolean>(false);

function App() {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof appLoader>>;

  const { pathname } = useLocation();

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

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    // dvw or svw doesn't really work like dvh/svh
    <div className='min-h-dynamic-screen w-screen flex flex-col md:gap-4 z-0'>
      <div className='sticky top-0 w-full z-20 flex flex-col items-center'>
        <Header />
        <DropDownMenu />
      </div>
      <div className='relative w-full flex justify-center items-center grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
