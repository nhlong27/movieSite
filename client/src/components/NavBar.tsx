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
import { GiHamburgerMenu } from 'react-icons/gi';
import ButtonComponent from './generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import AvatarComponent from './generic/AvatarComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Wrapper from './handling/Wrapper';
import Skeleton from 'react-loading-skeleton';
import logo from '/assets/logos/logo.png';
import logo_md from '/assets/logos/logo-md.png';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import default_avatar from '/assets/avatars/default.png'

const NavBar = () => {
  const [currentPath, setCurrentURLPath] = useAtom(currentURLPathAtom);
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);
  const [shouldDropdownDisplay, setShouldDropdownDisplay] = useAtom(shouldDropdownDisplayAtom);
  const [____, setProgress] = useAtom(loadingBarProgress);

  const [animationParentRef] = useAutoAnimate();

  const { isMd } = useMediaQueries();

  return isMd ? (
    <nav className='grid lg:grid-cols-6 grid-cols-4 w-11/12 max-w-[1920px] min-w-[300px]'>
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
          src={logo_md}
          className=' overflow-hidden object-full h-[4rem] rounded-full min-w-[4rem]'
        />
        <span className='text-stone-500 font-extrabold tracking-wider font-poppins text-2xl lg:text-3xl'>
          Green Dawn
        </span>
      </Link>
      <div className='grid grid-cols-3 lg:col-start-3 col-span-2 place-items-center'>
        <Link
          className={`h-full w-3/4 whitespace-nowrap grid place-items-center tracking-wider font-poppins text-2xl ${
            currentPath === 'home' && mediaType === 'movie'
              ? 'text-stone-600 border-b-4 border-stone-500 font-bold'
              : ''
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
          className={`h-full w-full whitespace-nowrap grid place-items-center tracking-wider font-poppins text-2xl ${
            currentPath === 'home' && mediaType === 'tv'
              ? 'text-stone-600 border-b-4 border-stone-500 font-bold'
              : ''
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
            <div className='w-full h-full grid place-items-center'>
              <div className='rounded-full overflow-hidden grid place-items-center xs:w-1/3 xl:w-1/4   aspect-square'>
                <Skeleton className='h-full w-full' />
              </div>
            </div>
          }
          errorComponent={() => (
            <div className='h-[3rem] group flex justify-center items-center w-full overflow-hidden'>
              <div className='rounded-full grid place-items-center xs:w-1/3 xl:w-1/4 aspect-square group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0'>
                <LazyLoadImage src={default_avatar}
                alt='default_avatar' effect='blur' />
              </div>
              <Link
                className='max-h-0 max-w-0 overflow-hidden group-hover:max-w-[10rem] group-hover:max-h-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-items-center font-poppins text-base text-stone-400 font-bold'
                to='/profile'
                onClick={() => {
                  setProgress(100);
                  setCurrentURLPath('profile');
                }}
              >
                Sign Up / Sign In
              </Link>
            </div>
          )}
        >
          <Link
            className={`aspect-square w-1/3 max-w-[2.8rem] whitespace-nowrap grid place-items-center rounded-full ${
              currentPath === 'profile'
                ? 'ring-black ring-offset-4 ring-offset-stone-300 ring-2'
                : ''
            }`}
            onClick={() => {
              setProgress(100);
              setCurrentURLPath('profile');
            }}
            to='/profile'
          >
            <AvatarComponent
              styles={{
                image:
                  'rounded-full overflow-hidden grid place-items-center object-cover aspect-square',
              }}
            />
          </Link>
        </Wrapper>
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
    <nav className='grid grid-cols-4 w-11/12 min-w-[300px] '>
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
        <img src={logo} className=' overflow-hidden object-full h-[4rem] w-[4rem]' />
        {currentPath === 'home' && (
          <span className='text-stone-500 font-extrabold tracking-wider uppercase font-poppins text-[17px]'>
            Green Dawn
          </span>
        )}
      </Link>
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
        <GiHamburgerMenu
          className={`h-6 w-6 mr-4 text-stone-400 ${
            shouldDropdownDisplay && 'rotate-90'
          } transition-transform duration-300`}
        />
      </ButtonComponent>
    </nav>
  );
};

export default NavBar;
