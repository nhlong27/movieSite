import React, { LegacyRef, createRef, useRef } from 'react';
import { useAtom } from 'jotai';
import { queryAtom } from '../../atoms';
import { AiOutlineSearch } from 'react-icons/ai';
import { featureAtom, isFilterAtom } from '@/App';
import ButtonComponent from '@/components/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';

const SearchBar = () => {
  const [query, setQuery] = useAtom(queryAtom);
  const [isFilter, setIsFilter] = useAtom(isFilterAtom);

  const [feature] = useAtom(featureAtom);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isMd } = useMediaQueries();
  return (
    <ButtonComponent
      onClick={() => {
        inputRef.current?.select();
        setIsFilter(false);
      }}
      className='flex align-baseline h-[2.5rem] w-11/12 md:w-3/4'
    >
      {isMd ? (
        <>
          <div className='overflow-hidden w-full h-full '>
            <input
              ref={inputRef}
              type='text'
              className={`${
                feature === 'discover' && !isFilter ? 'mr-0' : '-mr-[40rem]'
              } transition-all w-full h-full duration-300 ring-2 ring-black`}
              value={query ?? ''}
              onBlur={() => setQuery('')}
              // onClick={()=>setQuery('')}
              onChange={(e) => {
                setQuery(() => e.currentTarget.value);
              }}
              placeholder={query ?? 'Search a movie or tv show'}
            />
          </div>
          <div className='rounded'>
            <AiOutlineSearch className='h-[2.5rem] w-[2.5rem]' />
          </div>
        </>
      ) : (
        <>
          <div className='rounded'>
            <AiOutlineSearch className='h-[2.5rem] w-[2.5rem]' />
          </div>
          <div className='overflow-hidden w-full h-full '>
            <input
              ref={inputRef}
              type='text'
              className={`${
                feature === 'discover' && !isFilter ? 'ml-0' : '-ml-[40rem]'
              } transition-all w-full h-full duration-300 ring-2 ring-black`}
              value={query ?? ''}
              onBlur={() => setQuery('')}
              // onClick={()=>setQuery('')}
              onChange={(e) => {
                setQuery(() => e.currentTarget.value);
              }}
              placeholder={query ?? 'Search a movie or tv show'}
            />
          </div>
        </>
      )}
    </ButtonComponent>
  );
};

export default SearchBar;
