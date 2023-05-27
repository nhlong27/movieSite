import ButtonComponent from '@/components/generic/ButtonComponent';
import { iconHelper } from '@/config/icons';
import React, { Dispatch } from 'react';

const ListFilters = ({
  listFilter,
  setListFilter,
}: {
  listFilter: string;
  setListFilter: Dispatch<string>;
}) => {
  return (
    <div className='flex flex-col w-full md:justify-between items-center '>
      <div className='flex flex-wrap md:flex-row w-full gap-4 md:mt-0 pt-4'>
        <ButtonComponent
          className={`py-2 rounded-lg mt-4 text-sm   dark:ring-transparent shadow-xl px-4 font-bold  transition-full duration-200 bg-stone-700 text-amber-300 hover:text-amber-400 hover:bg-stone-800 ${
            listFilter === 'All' ? 'text-lime-400 bg-stone-800' : ''
          }`}
          onClick={() => setListFilter('All')}
        >
          {iconHelper.gallery('text-xl')}
          All Media
        </ButtonComponent>
        <ButtonComponent
          className={` py-2 rounded-lg mt-4 text-sm   dark:ring-transparent shadow-xl px-4 font-bold  transition-full duration-200 bg-stone-700 text-amber-300 hover:text-amber-400 hover:bg-stone-800 ${
            listFilter === 'isFavorited' ? 'text-lime-400 bg-stone-800' : ''
          }`}
          onClick={() => setListFilter('isFavorited')}
        >
          {iconHelper.heart('text-xl')}
          Favorited
        </ButtonComponent>
      </div>
      <div className={`flex md:flex-row w-full flex-wrap gap-4 py-4 ${listFilter === 'isFavorited' ? 'opacity-50' : 'opacity-100'}`}>
        <ButtonComponent
          className={` py-2 rounded-lg mt-4 text-sm   dark:ring-transparent shadow-xl px-4 font-bold  transition-full duration-200 bg-stone-700 text-amber-300 hover:text-amber-400 hover:bg-stone-800 ${
            listFilter === 'Watching' ? 'text-lime-400 bg-stone-800' : ''
          }`}
          onClick={() => setListFilter('Watching')}
        >
          {iconHelper.history('text-xl')}
          Watching
        </ButtonComponent>
        <ButtonComponent
          className={` py-2 rounded-lg mt-4 text-sm   dark:ring-transparent shadow-xl px-4 font-bold  transition-full duration-200 bg-stone-700 text-amber-300 hover:text-amber-400 hover:bg-stone-800 ${
            listFilter === 'Plan to Watch' ? 'text-lime-400 bg-stone-800' : ''
          }`}
          onClick={() => setListFilter('Plan to Watch')}
        >
          {iconHelper.calendar('text-xl')}
          Plan to Watch
        </ButtonComponent>
        <ButtonComponent
          className={` py-2 rounded-lg mt-4 text-sm   dark:ring-transparent shadow-xl px-4 font-bold  transition-full duration-200 bg-stone-700 text-amber-300 hover:text-amber-400 hover:bg-stone-800 ${
            listFilter === 'Completed' ? 'text-lime-400 bg-stone-800' : ''
          }`}
          onClick={() => setListFilter('Completed')}
        >
          {iconHelper.checkCircle('text-xl')}
          Completed
        </ButtonComponent>
        <ButtonComponent
          className={` py-2 rounded-lg mt-4 text-sm   dark:ring-transparent shadow-xl px-4 font-bold  transition-full duration-200 bg-stone-700 text-amber-300 hover:text-amber-400 hover:bg-stone-800 ${
            listFilter === 'Dropped' ? 'text-lime-400 bg-stone-800' : ''
          }`}
          onClick={() => setListFilter('Dropped')}
        >
          {iconHelper.trash('text-xl')}
          Dropped
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ListFilters;
