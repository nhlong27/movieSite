import { featureAtom, isDropdownAtom, mediaTypeAtom } from '@/App';
import { useAtom } from 'jotai';
import React from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';

const DropDownMenu = () => {
  const [_, setFeature] = useAtom(featureAtom);
  const [__, setMediaType] = useAtom(mediaTypeAtom);
  const [isDropdown] = useAtom(isDropdownAtom);


  return (
    <div className={` ${isDropdown? ' bottom-0 z-20' : 'bottom-[5rem] z-10'}  block transition-all duration-300 relative md:hidden w-full text-black`}>
      
      <ul
        className='grid grid-cols-4 file:float-center m-0 min-w-max list-none overflow-hidden rounded-lg border-none '
      >
        <li>
          <Link
            className='block w-full whitespace-nowrap py-2 px-4 text-sm font-normal'
            to='/'
          onClick={() => {
            setFeature('home');
            setMediaType('movie');
          }}
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            className='block w-full whitespace-nowrap py-2 px-4 text-sm font-normal'
            to='/'
          onClick={() => {
            setFeature('home');
            setMediaType('tv');
          }}
          >
            TV Shows
          </Link>
        </li>
        <li>
          <Link
            className='block w-full whitespace-nowrap py-2 px-4 text-sm font-normal '
            to='/profile'
          >
            Profile
          </Link>
        </li>
        <li>
          <ButtonComponent
            className='block w-full whitespace-nowrap py-2 px-4 text-sm font-normal '
          >
            Sign Out
          </ButtonComponent>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
