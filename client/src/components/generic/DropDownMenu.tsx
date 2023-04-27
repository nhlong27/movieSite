import { currentURLPathAtom, mediaTypeAtom, shouldDropdownDisplayAtom } from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import { Link } from 'react-router-dom';
import AvatarComponent from './AvatarComponent';
import Wrapper from '../handling/Wrapper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import defaultAvatar_1 from '/assets/defaultAvatar_1.png';

const DropDownMenu = () => {
  const [_, setCurrentURLPath] = useAtom(currentURLPathAtom);
  const [__, setMediaType] = useAtom(mediaTypeAtom);
  const [shouldDropdownDisplay] = useAtom(shouldDropdownDisplayAtom);

  return (
    <div className='overflow-hidden w-11/12 min-w-[300px]'>
      <div
        className={` ${
          shouldDropdownDisplay ? 'h-10' : 'h-0'
        } transition-all relative top-0 duration-300 md:hidden w-full text-black`}
      >
        <ul className='grid grid-cols-3 h-full w-full list-none'>
          <li>
            <Link
              className='h-full w-full whitespace-nowrap grid place-items-center text-sm font-normal'
              to='/'
              onClick={() => {
                setCurrentURLPath('home');
                setMediaType('movie');
              }}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              className='h-full w-full whitespace-nowrap grid place-items-center text-sm font-normal'
              to='/'
              onClick={() => {
                setCurrentURLPath('home');
                setMediaType('tv');
              }}
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Wrapper
              errorComponent={() => {
                return (
                  <div className='h-[3rem] group flex justify-center items-center'>
                    <div className='w-[2rem] max-h-[2rem] max-w-[5rem] group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0'>
                      <LazyLoadImage src={defaultAvatar_1} alt='default_avatar' effect='blur' />
                    </div>
                    <Link
                      className=' max-w-0 overflow-hidden group-hover:max-w-[10rem] opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-items-center'
                      to='/profile'
                    >
                      Sign Up / Sign In
                    </Link>
                  </div>
                );
              }}
            >
              <Link
                className='w-full h-full flex justify-center items-center overflow-hidden'
                to='/profile'
              >
                <AvatarComponent styles={{ image: 'w-[2rem] max-h-[2rem]' }} />
              </Link>
            </Wrapper>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
