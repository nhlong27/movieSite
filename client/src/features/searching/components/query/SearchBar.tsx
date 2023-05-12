import React from 'react';
import { useAtom } from 'jotai';
import { queryAtom } from '../../atoms';
import { AiOutlineSearch } from 'react-icons/ai';
import { currentURLPathAtom, hasQueryFiltersAtom } from '@/App';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';

export const handleQueryInput = (input: string) => {
  if (input !== '') {
    let queryHistorySet = new Set(
      JSON.parse(localStorage.getItem('queries') ?? JSON.stringify([])),
    );
    if (queryHistorySet.has(input)) {
      queryHistorySet.delete(input);
    }
    queryHistorySet.add(input);

    let queryHistory = [...queryHistorySet];

    if (queryHistory.length > 5) {
      queryHistory?.shift();
    }

    localStorage.setItem('queries', JSON.stringify(queryHistory));
  }
};
const SearchBar = () => {
  const [query, setQuery] = useAtom(queryAtom);
  const [hasQueryFilters, setHasQueryFilters] = useAtom(hasQueryFiltersAtom);

  const [inputValue, setInputValue] = React.useState('');

  

  const [currentURLPath] = useAtom(currentURLPathAtom);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { isMd } = useMediaQueries();
  return (
    <ButtonComponent
      onClick={() => {
        inputRef.current?.focus();
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
              value={inputValue ?? ''}
              // onBlur={() => setQuery('')}
              onChange={(e) => {
                setInputValue(() => e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleQueryInput(inputValue);
                  setQuery(() => inputValue);
                }
              }}
              placeholder={inputValue ?? 'Search a movie or tv show'}
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
              value={inputValue ?? ''}
              // onBlur={() => setQuery('')}
              onChange={(e) => {
                setInputValue(() => e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleQueryInput(inputValue);
                  setQuery(() => inputValue);

                }
              }}
              placeholder={inputValue ?? 'Search a movie or tv show'}
            />
          </div>
        </>
      )}
    </ButtonComponent>
  );
};

export default SearchBar;
