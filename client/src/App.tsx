import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import React from 'react';
import { atom, useAtom } from 'jotai';
import { appLoader } from './routes/router';
import { search_queries } from './features/searching';
import Header from './components/Header';
import Footer from './components/Footer';
import DropDownMenu from './components/generic/DropDownMenu';
import { Toaster } from 'react-hot-toast';
import { BiArrowFromBottom } from 'react-icons/bi';

export const mediaTypeAtom = atom<'movie' | 'tv'>('movie');
export const currentURLPathAtom = atom<string>('home');
export const shouldDropdownDisplayAtom = atom<boolean>(false);
export const hasQueryFiltersAtom = atom<boolean>(false);
export const loadingBarProgress = atom<number>(0);
export const themeAtom = atom<string>(localStorage.getItem('theme') ?? 'dark');

import { useAutoAnimate } from '@formkit/auto-animate/react';
import LoadingBar from 'react-top-loading-bar';
import { onWindowMatch } from './utils/onWindowMatch';
import ButtonComponent from './components/generic/ButtonComponent';

function App() {
  const initialData = useLoaderData() as Awaited<ReturnType<typeof appLoader>>;

  const { pathname } = useLocation();
  const [animationParentRef] = useAutoAnimate();

  const [progress, setProgress] = useAtom(loadingBarProgress);

  const [theme] = useAtom(themeAtom);
  const { element } = onWindowMatch();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

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
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        element.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        localStorage.removeItem('theme');
        break;
    }
  }, [theme]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className='bg-stone-400 dark:bg-stone-900  min-h-dynamic-screen min-w-[300px] w-screen flex flex-col z-0'>
      <LoadingBar
        height={4}
        color='#292524'
        progress={progress}
        onLoaderFinished={() => {
          setProgress(0);
        }}
        loaderSpeed={1000}
      />
      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          success: {
            className: 'tracking-wider  font-poppins font-bold shadow-xl ',
            duration: 5000,
          },
          error: {
            className: 'tracking-wider  font-poppins font-bold shadow-xl',
            duration: 5000,
            style: {
              background: '#e7e5e4',
              color: '#991b1b',
            },
          },
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
      <ButtonComponent
        type='button'
        onClick={scrollToTop}
        className={` z-40 bg-green-400 fixed bottom-16 max-w-[10rem] right-16 hover:bg-green-500 focus:ring-green-500 inline-flex items-center rounded-full p-3 text- shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <BiArrowFromBottom className='h-6 w-6' aria-hidden='true' />
      </ButtonComponent>
      <Footer />
    </div>
  );
}

export default App;
