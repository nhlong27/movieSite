import React from 'react';
import { Link } from 'react-router-dom';
import { currentURLPathAtom, mediaTypeAtom, shouldDropdownDisplayAtom } from '@/App';
import { useAtom } from 'jotai';
import SearchBar from '@/features/searching/components/query/SearchBar';
import { GiHamburgerMenu } from 'react-icons/gi';
import ButtonComponent from './generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import AvatarComponent from './generic/AvatarComponent';

const NavBar = () => {
  const [_, setCurrentURLPath] = useAtom(currentURLPathAtom);
  const [__, setMediaType] = useAtom(mediaTypeAtom);
  const [___, setShouldDropdownDisplay] = useAtom(shouldDropdownDisplayAtom);
  const { isMd } = useMediaQueries();

  return isMd ? (
    <nav className='grid grid-cols-3 w-11/12 max-w-[1920px] min-w-[300px]'>
      <Link
        className='flex justify-start items-center'
        to='/'
        onClick={() => {
          setCurrentURLPath('home');
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
            setCurrentURLPath('home');
            setMediaType('movie');
          }}
        >
          Movies
        </Link>
        <Link
          className='flex justify-center items-center'
          to='/'
          onClick={() => {
            setCurrentURLPath('home');
            setMediaType('tv');
          }}
        >
          TV Shows
        </Link>

        <Link className='flex justify-center items-center' to='/profile'>
          <AvatarComponent className='w-[2rem] h-[2rem]' />
        </Link>
      </div>
      <Link
        className='flex justify-end items-center'
        onClick={() => {
          setCurrentURLPath('discover');
        }}
        to='/discover'
      >
        <SearchBar />
      </Link>
    </nav>
  ) : (
    <nav className='grid grid-cols-4 w-11/12 min-w-[300px]'>
      <Link
        className='flex justify-start items-center'
        to='/'
        onClick={() => {
          setCurrentURLPath('home');
          setMediaType('movie');
        }}
      >
        Logo
      </Link>
      <Link
        className='flex justify-center items-center col-span-2'
        onClick={() => {
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
        <GiHamburgerMenu className=' h-5 w-5 text-gray-400' />
      </ButtonComponent>
    </nav>
  );
};

export default NavBar;
