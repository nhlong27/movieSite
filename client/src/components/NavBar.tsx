import React from 'react';
import { Link } from 'react-router-dom';
import { currentURLPathAtom, mediaTypeAtom, shouldDropdownDisplayAtom } from '@/App';
import { useAtom } from 'jotai';
import SearchBar from '@/features/searching/components/query/SearchBar';
import { GiHamburgerMenu } from 'react-icons/gi';
import ButtonComponent from './generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import AvatarComponent from './generic/AvatarComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Wrapper from './handling/Wrapper';
import defaultAvatar_1 from '/assets/defaultAvatar_1.png';

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
        <Wrapper
          errorComponent={()=>(
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
          )
          }
        >
          <Link className='w-full h-full flex justify-center items-center overflow-hidden' to='/profile'>
        <AvatarComponent styles={{ image: 'w-[2rem] max-h-[2rem]' }} />
        </Link>
        </Wrapper>
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
