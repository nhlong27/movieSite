import {
  currentURLPathAtom,
  loadingBarProgress,
  mediaTypeAtom,
  shouldDropdownDisplayAtom,
  themeAtom,
} from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import { Link } from 'react-router-dom';
import AvatarComponent from './AvatarComponent';
import Wrapper from '../handling/Wrapper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from 'react-loading-skeleton';
import { imageHelper } from '@/config/images';

const DropDownMenu = () => {
  const [currentPath, setCurrentURLPath] = useAtom(currentURLPathAtom);
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);
  const [shouldDropdownDisplay] = useAtom(shouldDropdownDisplayAtom);
  const [____, setProgress] = useAtom(loadingBarProgress);
  const [theme] = useAtom(themeAtom)
  return (
    <div className='overflow-hidden w-full min-w-[300px] shadow-lg dark:bg-stone-800 bg-slate-200 border-t-2 dark:border-yellow-500 border-none'>
      <div
        className={` ${
          shouldDropdownDisplay ? 'h-12' : 'h-0'
        } transition-all relative top-0 duration-300 md:hidden w-full `}
      >
        <ul className='grid grid-cols-3 h-full w-full list-none font-poppins font-bold text-base  tracking-wider'>
          <li className='h-full w-full flex justify-center items-center'>
            <Link
              className={`h-3/4 w-1/2 mx-auto whitespace-nowrap grid place-items-center transition-full duration-500 ${
                currentPath === 'home' && mediaType === 'movie'
                  ? 'text-yellow-400 border-b-4 border-yellow-500'
                  : 'text-yellow-500'
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
          </li>
          <li className='h-full w-full flex justify-center items-center'>
            <Link
              className={`h-3/4 w-1/2 mx-auto  whitespace-nowrap grid place-items-center transition-full duration-500 ${
                currentPath === 'home' && mediaType === 'tv'
                  ? 'text-yellow-400 border-b-4 border-yellow-500'
                  : 'text-yellow-500'
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
          </li>
          <li className='h-full w-full grid place-items-center'>
            <Wrapper
              suspenseComponent={
                <div className='w-full h-full grid place-items-center'>
                  <div className='rounded-full overflow-hidden grid place-items-center w-1/4 aspect-square'>
                    <Skeleton className='h-full w-full' />
                  </div>
                </div>
              }
              errorComponent={() => {
                return (
                  <div className='h-[3rem] group flex justify-center items-center'>
                    <div className='rounded-full grid place-items-center  w-8 aspect-square group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0'>
                      {theme === 'light' ? (
                        <LazyLoadImage
                          src={imageHelper.logo}
                          alt='default_avatar'
                          effect='blur'
                        />
                      ) : (
                        <LazyLoadImage
                          src={imageHelper.logo_better}
                          alt='default_avatar'
                          effect='blur'
                        />
                      )}
                    </div>
                    <Link
                      className=' h-0 max-w-0 group-hover:max-w-full overflow-hidden group-hover:h-3/5 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 grid place-items-center font-poppins  px-3 py-[2px] text-sm rounded-lg bg-slate-500 hover:bg-slate-600 text-white dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-stone-900 shadow-lg font-bold whitespace-nowrap'
                      onClick={() => {
                        setProgress(100);
                        setCurrentURLPath('profile');
                      }}
                      to='/profile'
                    >
                      Sign in
                    </Link>
                  </div>
                );
              }}
            >
              <Link
                className={`h-3/4 flex gap-2 justify-center items-center`}
                onClick={() => {
                  setProgress(100);
                  setCurrentURLPath('profile');
                }}
                to='/profile'
              >
                <AvatarComponent
                  styles={{
                    image: `rounded-full overflow-hidden grid place-items-center w-8 max-w-[1.8rem] aspect-square ${
                      currentPath === 'profile' ? ' border-b-4 border-yellow-500' : ''
                    }`,
                  }}
                />
                Profile
              </Link>
            </Wrapper>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
