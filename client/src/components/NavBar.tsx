import React from 'react';
import { Link } from 'react-router-dom';
import { featureAtom, isDropdownAtom, isFilterAtom, mediaTypeAtom } from '@/App';
import { useAtom } from 'jotai';
import SearchBar from '@/features/searching/components/query/SearchBar';
import ProfileAvatar from './ProfileAvatar';
import { GiHamburgerMenu } from 'react-icons/gi';
import ButtonComponent from './ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import DropDownMenu from './DropDownMenu';

const NavBar = () => {
  const [_, setFeature] = useAtom(featureAtom);
  const [__, setMediaType] = useAtom(mediaTypeAtom);
  const [___, setIsDropdown] = useAtom(isDropdownAtom);
  const { isMd } = useMediaQueries();

  return isMd ? (
    <nav className='z-10 grid grid-cols-3 w-11/12 max-w-[1536px] min-w-[500px] h-3/4'>
      <Link
        className='flex justify-start items-center'
        to='/'
        onClick={() => {
          setFeature('home');
          setMediaType('movie');
        }}
      >
        Logo
      </Link>
      <div className='grid grid-cols-3 '>
        <Link
          className='flex justify-center items-center'
          to='/'
          onClick={() => {
            setFeature('home');
            setMediaType('movie');
          }}
        >
          Movies
        </Link>
        <Link
          className='flex justify-center items-center'
          to='/'
          onClick={() => {
            setFeature('home');
            setMediaType('tv');
          }}
        >
          TV Shows
        </Link>

        <Link className='flex justify-center items-center' to='/profile'>
          <ProfileAvatar />
        </Link>
      </div>
      <Link
        className='flex justify-end items-center'
        onClick={() => {
          setFeature('discover');
        }}
        to='/discover'
      >
        <SearchBar />
      </Link>
    </nav>
  ) : (
    <nav className='grid grid-cols-4 w-11/12 max-w-[768px] h-3/4 '>
      <Link
        className='flex justify-start items-center'
        to='/'
        onClick={() => {
          setFeature('home');
          setMediaType('movie');
        }}
      >
        Logo
      </Link>
      <Link
        className='flex justify-center items-center col-span-2'
        onClick={() => {
          setFeature('discover');
        }}
        to='/discover'
      >
        <SearchBar />
      </Link>

      <ButtonComponent
        onClick={() => setIsDropdown((pre) => !pre)}
        className='flex justify-end items-center'
      >
        <GiHamburgerMenu className=' h-5 w-5 text-gray-400' />
      </ButtonComponent>
      
    </nav>
  );
};

export default NavBar;
