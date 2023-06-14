import React from 'react';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className='flex-col flex justify-center items-center w-full h-[4rem] md:h-[5rem] shadow-lg bg-slate-50 dark:bg-stone-900 dark:bg-opacity-70 hover:bg-opacity-100 transition-all duration-300'>
      <NavBar />
    </header>
  );
};

export default Header;
