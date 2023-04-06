import React from 'react';
import { useAtom } from 'jotai';
import { queryAtom } from '../../atoms';
import { AiOutlineSearch } from 'react-icons/ai';
import { currentURLPathAtom, hasQueryFiltersAtom } from '@/App';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';

const SearchBar = () => {
  const [query, setQuery] = useAtom(queryAtom);
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);

  const [currentURLPath] = useAtom(currentURLPathAtom);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isMd } = useMediaQueries();
  return (
    <ButtonComponent
      onClick={() => {
        inputRef.current?.select();
        setHasQueryFilters(false);
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
                currentURLPath === 'discover' && !hasQueryFilters
                  ? 'mr-0 opacity-100'
                  : '-mr-[200%] opacity-0'
              } transition-all w-full h-full duration-300 ring-2 bg-blue-200 ring-black`}
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
                currentURLPath === 'discover' && !hasQueryFilters
                  ? 'ml-0 visible'
                  : '-ml-[200%] invisible'
              } transition-all w-full h-full duration-500 ring-2 bg-blue-200 ring-black`}
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
