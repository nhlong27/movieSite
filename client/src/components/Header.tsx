import React from 'react';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className='flex-col flex justify-center items-center w-full h-[3rem] lg:h-[5rem]'>
      <NavBar />
    </header>
  );
};

export default Header;
