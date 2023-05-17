import React from 'react';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className='flex-col flex justify-center items-center w-full h-[4rem] md:h-[5rem] shadow-lg bg-stone-200 dark:bg-stone-900 dark:bg-opacity-70 dark:hover:bg-opacity-100 dark:transition-all dark:duration-300'>
      <NavBar />
    </header>
  );
};

export default Header;
