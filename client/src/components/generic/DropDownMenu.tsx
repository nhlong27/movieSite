import {
  currentURLPathAtom,
  loadingBarProgress,
  mediaTypeAtom,
  shouldDropdownDisplayAtom,
} from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import { Link } from 'react-router-dom';
import AvatarComponent from './AvatarComponent';
import Wrapper from '../handling/Wrapper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from 'react-loading-skeleton';
import human from '/assets/avatars/human.png';

const DropDownMenu = () => {
  const [currentPath, setCurrentURLPath] = useAtom(currentURLPathAtom);
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);
  const [shouldDropdownDisplay] = useAtom(shouldDropdownDisplayAtom);
  const [____, setProgress] = useAtom(loadingBarProgress);

  return (
    <div className='overflow-hidden w-full min-w-[300px] shadow-lg bg-stone-200 border-t-2 border-stone-300'>
      <div
        className={` ${
          shouldDropdownDisplay ? 'h-12' : 'h-0'
        } transition-all relative top-0 duration-300 md:hidden w-full `}
      >
        <ul className='grid grid-cols-3 h-full w-full list-none font-poppins font-bold text-base text-stone-400  tracking-wider'>
          <li className='h-full w-full grid place-items-center'>
            <Link
              className={`h-3/4 w-3/4 whitespace-nowrap grid place-items-center ${
                currentPath === 'home' && mediaType === 'movie'
                  ? 'text-stone-500 border-b-4 border-stone-400'
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
          </li>
          <li className='h-full w-full grid place-items-center'>
            <Link
              className={`h-3/4 w-3/4 whitespace-nowrap grid place-items-center mr-2 ${
                currentPath === 'home' && mediaType === 'tv'
                  ? 'text-stone-500 border-b-4 border-stone-400'
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
                    <div className='rounded-full grid place-items-center w-1/4 aspect-square group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0'>
                      <LazyLoadImage src={human} alt='default_avatar' effect='blur' />
                    </div>
                    <Link
                      className=' max-w-0 overflow-hidden group-hover:max-w-[10rem] max-h-0 group-hover:max-h-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-items-center'
                      onClick={() => {
                        setProgress(100);
                        setCurrentURLPath('profile');
                      }}
                      to='/profile'
                    >
                      Sign In
                    </Link>
                  </div>
                );
              }}
            >
              <Link
                className={`w-3/4 h-3/4 flex gap-2 justify-center items-center ${
                  currentPath === 'profile' ? 'text-stone-500 border-b-4 border-stone-400' : ''
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
                      'rounded-full overflow-hidden grid place-items-center w-2/5 max-w-[1.8rem] aspect-square',
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
