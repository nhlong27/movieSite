import { currentURLPathAtom, mediaTypeAtom,  shouldDropdownDisplayAtom } from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';

const DropDownMenu = () => {
  const [_, setCurrentURLPath] = useAtom(currentURLPathAtom);
  const [__, setMediaType] = useAtom(mediaTypeAtom);
  const [shouldDropdownDisplay] = useAtom(shouldDropdownDisplayAtom);

  return (
    <div className='z-20 overflow-hidden top-0 absolute w-11/12 min-w-[300px]'>
      <div
        className={` ${
          shouldDropdownDisplay ? 'h-10' : 'h-0'
        } transition-all duration-300 relative md:hidden w-full text-black`}
      >
        <ul className='grid grid-cols-4 h-full w-full list-none'>
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
            <Link
              className='h-full w-full whitespace-nowrap grid place-items-center text-sm font-normal '
              to='/profile'
            >
              Profile
            </Link>
          </li>
          <li>
            <ButtonComponent className='h-full w-full whitespace-nowrap grid place-items-center text-sm font-normal '>
              Sign Out
            </ButtonComponent>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
