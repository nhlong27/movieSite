import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import React, { useRef } from 'react';
import { atom, useAtom } from 'jotai';
import { appLoader } from './routes/router';
import { search_queries } from './features/searching';
import Header from './components/Header';
import Footer from './components/Footer';
import DropDownMenu from './components/generic/DropDownMenu';
import { Toaster } from 'react-hot-toast';

export const mediaTypeAtom = atom<'movie' | 'tv'>('movie');
export const currentURLPathAtom = atom<'home' | 'discover' | 'profile'>('home');
export const shouldDropdownDisplayAtom = atom<boolean>(false);
export const hasQueryFiltersAtom = atom<boolean>(false);
export const loadingBarProgress = atom<number>(0);

import { useAutoAnimate } from '@formkit/auto-animate/react';
import LoadingBar from 'react-top-loading-bar';

function App() {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof appLoader>>;

  const { pathname } = useLocation();
  const [animationParentRef] = useAutoAnimate();

  const [progress, setProgress] = useAtom(loadingBarProgress);

  React.useEffect(() => {
    search_queries.mediaTypeConfig.movie.discover.paramList = {
      ...search_queries.mediaTypeConfig.movie.discover.paramList,
      with_genres: new Map(initialData[0].genres.map(({ id, name }) => [id, name])),
    };
    search_queries.mediaTypeConfig.tv.discover.paramList = {
      ...search_queries.mediaTypeConfig.tv.discover.paramList,
      with_genres: new Map(initialData[1].genres.map(({ id, name }) => [id, name])),
    };
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className='bg-stone-400 min-h-dynamic-screen w-screen flex flex-col z-0'>
        <LoadingBar
          // className={` transition-all duration-1000 ease-in`}
          height={4}
          color='#292524'
          progress={progress}
          onLoaderFinished={() => {
            setProgress(0);
          }}
          loaderSpeed={1000}
        />
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: 'tracking-wider border-4 border-red-700 ring-2 ring-red-700 font-poppins font-bold shadow-xl',
          duration: 5000,
          style: {
            background: '#e7e5e4',
            color: '#991b1b',
          },

          // Default options for specific types
          // success: {
          //   duration: 3000,
          //   theme: {
          //     primary: 'green',
          //     secondary: 'black',
          //   },
          // },
        }}
      />
      <div className='sticky top-0 w-full z-30 flex flex-col items-center'>
        <Header />
        <DropDownMenu />
      </div>
      <div
        className='relative w-full flex justify-center items-center grow'
        ref={animationParentRef}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
