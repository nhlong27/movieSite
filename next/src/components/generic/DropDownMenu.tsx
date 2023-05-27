import {
  currentURLPathAtom,
  loadingBarProgress,
  mediaTypeAtom,
  shouldDropdownDisplayAtom,
} from '@/components/Layout';
import { useAtom } from 'jotai';
import React from 'react';
import Link  from 'next/link';
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

  return (
    <div className='overflow-hidden w-full min-w-[300px] shadow-lg bg-stone-200 dark:bg-stone-800 border-t-2 border-stone-300 dark:border-yellow-500'>
      <div
        className={` ${
          shouldDropdownDisplay ? 'h-12' : 'h-0'
        } transition-all relative top-0 duration-300 md:hidden w-full `}
      >
        <ul className='grid grid-cols-3 h-full w-full list-none font-poppins font-bold text-base text-stone-400 dark:text-yellow-500  tracking-wider'>
          <li className='h-full w-full grid place-items-center'>
            <Link
              className={`h-3/4 w-3/4 whitespace-nowrap grid place-items-center transition-full duration-500 ${
                currentPath === 'home' && mediaType === 'movie'
                  ? 'text-stone-500 dark:text-yellow-400 border-b-4 border-stone-400 dark:border-yellow-500'
                  : ''
              }`}
              href='/'
              onClick={() => {
                setProgress(100);
                setCurrentURLPath('home');
                setMediaType('movie');
              }}
            >
              Movies
            </Link>
          </li>
          <li className='h-full w-full grid place-items-center'>
            <Link
              className={`h-3/4 w-3/4 whitespace-nowrap grid place-items-center transition-full duration-500 mr-2 ${
                currentPath === 'home' && mediaType === 'tv'
                  ? 'text-stone-500 dark:text-yellow-400 border-b-4 border-stone-400 dark:border-yellow-500'
                  : ''
              }`}
              href='/'
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
                    <div className='rounded-full grid place-items-center  w-8  aspect-square group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0'>
                      <LazyLoadImage src={imageHelper.logo_better} alt='default_avatar' effect='blur' />
                    </div>
                    <Link
                      className=' h-0 max-w-0 group-hover:max-w-full overflow-hidden group-hover:h-3/4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 grid place-items-center  font-poppins text-base px-4 py-2 rounded-lg bg-stone-600 dark:bg-yellow-400 text-stone-50 dark:text-yellow-900 shadow-lg font-bold whitespace-nowrap'
                      onClick={() => {
                        setProgress(100);
                        setCurrentURLPath('profile');
                      }}
                      href='/profile'
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
                href='/profile'
              >
                <AvatarComponent
                  styles={{
                    image:
                      `rounded-full overflow-hidden grid place-items-center w-8 max-w-[1.8rem] aspect-square ${
                        currentPath === 'profile' ? 'text-stone-500 border-b-4 border-stone-400 dark:border-yellow-500' : ''
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
