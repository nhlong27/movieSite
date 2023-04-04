import React from 'react';
import NavBar from './NavBar';
import { useAtom } from 'jotai';
import { isDropdownAtom } from '@/App';
import DropDownMenu from './DropDownMenu';

const Header = () => {
  const [isDropdown] = useAtom(isDropdownAtom);

  return (
    <header className='flex-col sticky top-0 flex justify-center items-center w-full h-[10vh] lg:h-[8vh] z-20'>
      <NavBar />
      <div className='overflow-hidden w-full'>
        <DropDownMenu />
      </div>
    </header>
  );
};

export default Header;
