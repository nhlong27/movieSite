import ButtonComponent from '@/components/generic/ButtonComponent';
import React, { Dispatch } from 'react';

const ListFilters = ({ setListFilter }: { setListFilter: Dispatch<string> }) => {
  return (
    <div className='flex md:flex-row flex-col w-full md:justify-between items-center '>
      <div className='flex flex-col md:flex-row'>
        <ButtonComponent onClick={() => setListFilter('Watching')}>Watching</ButtonComponent>
        <ButtonComponent onClick={() => setListFilter('Plan to Watch')}>
          Plan to Watch
        </ButtonComponent>
        <ButtonComponent onClick={() => setListFilter('Completed')}>Completed</ButtonComponent>
        <ButtonComponent onClick={() => setListFilter('Dropped')}>Dropped</ButtonComponent>
      </div>
      <div className='flex flex-col md:flex-row'>
        <ButtonComponent onClick={() => setListFilter('isFavorited')}>Favorited</ButtonComponent>
        <ButtonComponent onClick={() => setListFilter('All')}>All</ButtonComponent>
      </div>
    </div>
  );
};

export default ListFilters;
