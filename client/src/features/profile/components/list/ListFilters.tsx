import ButtonComponent from '@/components/generic/ButtonComponent';
import React, { Dispatch } from 'react';

import {
  TfiGallery,
  AiOutlineHeart,
  AiOutlineHistory,
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  BsTrash,
} from '@/config/icons';

const ListFilters = ({
  listFilter,
  setListFilter,
}: {
  listFilter: string;
  setListFilter: Dispatch<string>;
}) => {
  return (
    <div className='flex flex-col w-full md:justify-between items-center '>
      <div className='flex flex-wrap md:flex-row w-full gap-4 md:mt-0 border-b-2 border-stone-300 py-4'>
        <ButtonComponent
          className={` py-2 px-4 text-stone-700 font-bold ring-2 ring-stone-500 hover:bg-stone-400 hover:text-stone-800 hover:ring-stone-600 rounded-xl shadow-xl flex gap-2 items-center ${
            listFilter === 'All' ? 'bg-stone-400' : 'bg-stone-300'
          }`}
          onClick={() => setListFilter('All')}
        >
          <TfiGallery className='text-xl' />
          All Media
        </ButtonComponent>
        <ButtonComponent
          className={` py-2 px-4 text-stone-700 font-bold ring-2 ring-stone-500 hover:bg-stone-400 hover:text-stone-800 hover:ring-stone-600 rounded-xl shadow-xl flex gap-2 items-center ${
            listFilter === 'isFavorited' ? 'bg-stone-400' : 'bg-stone-300'
          }`}
          onClick={() => setListFilter('isFavorited')}
        >
          <AiOutlineHeart className='text-xl' />
          Favorited
        </ButtonComponent>
      </div>
      <div className='flex md:flex-row w-full flex-wrap gap-4 py-4 border-b-2 border-stone-300'>
        <ButtonComponent
          className={` py-2 px-4 bg-yellow-500  hover:bg-opacity-100 text-stone-700 font-bold ring-2 ring-stone-500 hover:bg-stone-400 hover:text-stone-800 hover:ring-stone-600 rounded-xl shadow-xl flex gap-2 items-center ${
            listFilter === 'Watching' ? 'bg-opacity-100' : 'bg-opacity-50'
          }`}
          onClick={() => setListFilter('Watching')}
        >
          <AiOutlineHistory className='text-xl' />
          Watching
        </ButtonComponent>
        <ButtonComponent
          className={` py-2 px-4 bg-yellow-500  hover:bg-opacity-100 text-stone-700 font-bold ring-2 ring-stone-500 hover:bg-stone-400 hover:text-stone-800 hover:ring-stone-600 rounded-xl shadow-xl flex gap-2 items-center ${
            listFilter === 'Plan to Watch' ? 'bg-opacity-100' : 'bg-opacity-50'
          }`}
          onClick={() => setListFilter('Plan to Watch')}
        >
          <AiOutlineCalendar className='text-xl' />
          Plan to Watch
        </ButtonComponent>
        <ButtonComponent
          className={` py-2 px-4 bg-yellow-500  hover:bg-opacity-100 text-stone-700 font-bold ring-2 ring-stone-500 hover:bg-stone-400 hover:text-stone-800 hover:ring-stone-600 rounded-xl shadow-xl flex gap-2 items-center ${
            listFilter === 'Completed' ? 'bg-opacity-100' : 'bg-opacity-50'
          }`}
          onClick={() => setListFilter('Completed')}
        >
          <AiOutlineCheckCircle className='text-xl' />
          Completed
        </ButtonComponent>
        <ButtonComponent
          className={` py-2 px-4 bg-yellow-500  hover:bg-opacity-100 text-stone-700 font-bold ring-2 ring-stone-500 hover:bg-stone-400 hover:text-stone-800 hover:ring-stone-600 rounded-xl shadow-xl flex gap-2 items-center ${
            listFilter === 'Dropped' ? 'bg-opacity-100' : 'bg-opacity-50'
          }`}
          onClick={() => setListFilter('Dropped')}
        >
          <BsTrash className='text-xl' />
          Dropped
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ListFilters;
