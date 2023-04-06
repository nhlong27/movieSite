import ButtonComponent from '@/components/generic/ButtonComponent';
import React, { Dispatch } from 'react';

const ListOptionsContainer = ({ setListOption }: { setListOption: Dispatch<string> }) => {
  return (
    <div className='flex w-full justify-center items-center '>
      <div className='flex justify-center items-center'>
        <ButtonComponent onClick={() => setListOption('Watching')}>Watching</ButtonComponent>
        <ButtonComponent onClick={() => setListOption('Plan to Watch')}>
          Plan to Watch
        </ButtonComponent>
        <ButtonComponent onClick={() => setListOption('Completed')}>Completed</ButtonComponent>
        <ButtonComponent onClick={() => setListOption('Dropped')}>Dropped</ButtonComponent>
      </div>
      <ButtonComponent onClick={() => setListOption('isFavorited')}>Favorited</ButtonComponent>
      <ButtonComponent onClick={() => setListOption('All')}>All</ButtonComponent>
    </div>
  );
};

export default ListOptionsContainer;
