import React from 'react';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className='flex-col sticky top-0 flex justify-center items-center w-full min-h-[5rem] z-20'>
      <NavBar />
    </header>
  );
};

export default Header;
