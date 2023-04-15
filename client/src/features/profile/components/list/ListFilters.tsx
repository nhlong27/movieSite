import ButtonComponent from '@/components/generic/ButtonComponent';
import React, { Dispatch } from 'react';

const ListFilters = ({ setListFilter }: { setListFilter: Dispatch<string> }) => {
  return (
    <div className='flex w-full justify-center items-center '>
      <div className='flex justify-center items-center'>
        <ButtonComponent onClick={() => setListFilter('Watching')}>Watching</ButtonComponent>
        <ButtonComponent onClick={() => setListFilter('Plan to Watch')}>
          Plan to Watch
        </ButtonComponent>
        <ButtonComponent onClick={() => setListFilter('Completed')}>Completed</ButtonComponent>
        <ButtonComponent onClick={() => setListFilter('Dropped')}>Dropped</ButtonComponent>
      </div>
      <ButtonComponent onClick={() => setListFilter('isFavorited')}>Favorited</ButtonComponent>
      <ButtonComponent onClick={() => setListFilter('All')}>All</ButtonComponent>
    </div>
  );
};

export default ListFilters;
