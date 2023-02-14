import React from 'react';
import { useAtom } from 'jotai';
import { queryAtom } from '../../atoms';

const SearchBar = () => {
  const [query, setQuery] = useAtom(queryAtom);

  return (
    <div>
      <label htmlFor='search'>Search</label>
      <input
        id='search'
        type='text'
        className='ml-4 ring-2 ring-black'
        value={query ?? ''}
        onBlur={() => setQuery(null)}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
