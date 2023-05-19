import React from 'react';
import { Link } from 'react-router-dom';
import {
  currentURLPathAtom,
  loadingBarProgress,
  mediaTypeAtom,
  shouldDropdownDisplayAtom,
} from '@/App';
import { useAtom } from 'jotai';
import SearchBar from '@/features/searching/components/query/SearchBar';
import ButtonComponent from './generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import AvatarComponent from './generic/AvatarComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Wrapper from './handling/Wrapper';
import Skeleton from 'react-loading-skeleton';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { themeAtom } from '@/App';
import { iconHelper } from '@/config/icons';
import { imageHelper } from '@/config/images';

const NavBar = () => {
  const [currentPath, setCurrentURLPath] = useAtom(currentURLPathAtom);
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);
  const [shouldDropdownDisplay, setShouldDropdownDisplay] = useAtom(shouldDropdownDisplayAtom);
  const [____, setProgress] = useAtom(loadingBarProgress);
  const [theme, setTheme] = useAtom(themeAtom);

  const [animationParentRef] = useAutoAnimate();

  const { isMd } = useMediaQueries();

  return isMd ? (
    <nav className='grid lg:grid-cols-6 grid-cols-4 w-11/12 max-w-[1920px] min-w-[300px] '>
      <Link
        className='flex col-span-1 lg:col-span-2 justify-start items-center font-poppins font-extrabold text-3xl gap-4'
        to='/'
        onClick={() => {
          setProgress(100);
          setCurrentURLPath('home');
          setMediaType('movie');
        }}
      >
        <img
          src={imageHelper.logo_md}
          className=' overflow-hidden object-full h-[4rem] rounded-full min-w-[4rem]'
        />
        <span className='text-stone-500 dark:text-yellow-400 font-extrabold tracking-wider text-2xl lg:text-3xl font-serif'>
          Fir Media
        </span>
      </Link>
      <div className='grid grid-cols-4 lg:col-start-3 col-span-2 place-items-center'>
        <Link
          className={`col-span-1 h-full w-3/4 whitespace-nowrap grid place-items-center tracking-wider font-poppins text-2xl transition-full duration-500 ${
            currentPath === 'home' && mediaType === 'movie'
              ? 'text-stone-600 dark:text-yellow-500 border-b-4 border-stone-500 dark:border-yellow-500 font-bold'
              : 'dark:text-yellow-500 text-xl'
          }`}
          to='/'
          onClick={() => {
            setProgress(100);
            setCurrentURLPath('home');
            setMediaType('movie');
          }}
        >
          Movies
        </Link>
        <Link
          className={`col-span-1 h-full w-full whitespace-nowrap grid place-items-center tracking-wider font-poppins text-2xl transition-full duration-500 ${
            currentPath === 'home' && mediaType === 'tv'
              ? 'text-stone-600 dark:text-yellow-400 border-b-4 border-stone-500 dark:border-yellow-500 font-bold'
              : 'dark:text-yellow-500 text-xl'
          }`}
          to='/'
          onClick={() => {
            setProgress(100);
            setCurrentURLPath('home');
            setMediaType('tv');
          }}
        >
          TV Shows
        </Link>
        <Wrapper
          suspenseComponent={
            <div className='col-span-1 w-full h-full grid place-items-center'>
              <div className='rounded-full overflow-hidden grid place-items-center xs:w-1/3 xl:w-1/4   aspect-square'>
                <Skeleton className='h-full w-full' />
              </div>
            </div>
          }
          errorComponent={() => (
            <div className='col-span-1 h-full group flex justify-center items-center w-full overflow-hidden'>
              <div className='rounded-full grid place-items-center w-12  group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0'>
                <LazyLoadImage src={imageHelper.logo_better} alt='default_avatar' effect='blur' />
              </div>
              <Link
                className='h-0 max-w-0 group-hover:max-w-full overflow-hidden group-hover:h-3/4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 grid place-items-center  font-poppins text-base px-4 py-2 rounded-lg dark:bg-yellow-400
                dark:text-yellow-900 bg-stone-600 text-stone-50 shadow-lg font-bold  whitespace-nowrap'
                to='/profile'
                onClick={() => {
                  setProgress(100);
                  setCurrentURLPath('profile');
                }}
              >
                Sign In
              </Link>
            </div>
          )}
        >
          <Link
            className={`col-span-1 h-3/4 w-12 max-w-[2.8rem] whitespace-nowrap grid place-items-center rounded-full`}
            onClick={() => {
              setProgress(100);
              setCurrentURLPath('profile');
            }}
            to='/profile'
          >
            <AvatarComponent
              styles={{
                image: `rounded-full overflow-hidden grid w-12 place-items-center object-cover aspect-square ${
                  currentPath === 'profile'
                    ? 'text-stone-500 border-b-4 border-stone-400 dark:border-yellow-500'
                    : ''
                }`,
              }}
            />
          </Link>
        </Wrapper>
        <div className='ml-16 h-3/4 my-auto w-full whitespace-nowrap flex items-center col-span-1 justify-center gap-6 rounded-lg px-2 bg-stone-400   dark:bg-stone-700  dark:bg-opacity-70 shadow-inner z-10'>
          <ButtonComponent
            className={`w-6 h-6  rounded-full grid place-items-center ${
              theme === 'light' ? 'text-yellow-500' : 'text-stone-300'
            }`}
            onClick={() => setTheme('light')}
          >
            {iconHelper.light('text-3xl')}
          </ButtonComponent>

          <ButtonComponent
            className={`w-6 h-6  rounded-full  grid place-items-center ${
              theme === 'dark' ? 'text-yellow-500' : 'text-stone-300'
            }`}
            onClick={() => setTheme('dark')}
          >
            {iconHelper.dark('text-2xl')}
          </ButtonComponent>
        </div>
      </div>
      <Link
        className='flex col-span-1 lg:col-start-5 lg:col-span-2 justify-end items-center mr-4'
        onClick={() => {
          setProgress(100);
          setCurrentURLPath('discover');
        }}
        to='/discover'
      >
        <SearchBar />
      </Link>
    </nav>
  ) : (
    <nav className='grid grid-cols-5 w-11/12 min-w-[300px] '>
      <Link
        ref={animationParentRef}
        className={`flex justify-center items-center gap-2 ${
          currentPath === 'home' ? 'col-span-2' : 'col-span-1'
        }`}
        to='/'
        onClick={() => {
          setProgress(100);
          setCurrentURLPath('home');
          setMediaType('movie');
        }}
      >
        <img src={imageHelper.logo_better} className=' overflow-hidden object-full h-[4rem] w-[4rem]' />
        {currentPath === 'home' && (
          <span className='text-stone-500 dark:text-yellow-500 font-extrabold tracking-wider uppercase font-poppins text-[17px]'>
            Fir Media
          </span>
        )}
      </Link>
      <div className='h-1/2 rounded-lg my-auto w-full whitespace-nowrap flex items-center col-span-1 justify-center bg-stone-300 dark:bg-stone-700 gap-4 z-10'>
        <ButtonComponent
          className={`w-4 h-4 rounded-full grid place-items-center  ${
            theme === 'light' ? 'text-yellow-600' : 'text-stone-800 '
          }`}
          onClick={() => setTheme('light')}
        >
          {iconHelper.light('text-lg')}
        </ButtonComponent>

        <ButtonComponent
          className={`w-4 h-4 rounded-full grid place-items-center   ${
            theme === 'dark' ? 'text-yellow-600' : 'text-stone-800'
          }`}
          onClick={() => setTheme('dark')}
        >
          {iconHelper.dark('text-base')}
        </ButtonComponent>
      </div>
      <Link
        className={`flex justify-center items-center ${
          currentPath === 'home' ? 'col-span-1' : 'col-span-2'
        }`}
        onClick={() => {
          setProgress(100);
          setCurrentURLPath('discover');
        }}
        to='/discover'
      >
        <SearchBar />
      </Link>

      <ButtonComponent
        onClick={() => setShouldDropdownDisplay((prev) => !prev)}
        className='flex justify-end items-center'
      >
        {iconHelper.menu(
          `h-6 w-6 mr-4 text-stone-400 dark:text-yellow-500 ${
            shouldDropdownDisplay && 'rotate-90'
          } transition-transform duration-300`,
        )}
      </ButtonComponent>
    </nav>
  );
};

export default NavBar;
