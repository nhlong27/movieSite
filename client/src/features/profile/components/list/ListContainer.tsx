import React from 'react';
import ShowContainer from './ShowContainer';
import { MultipleShowsQueryResponseType } from '../../types';

const ListContainer = ({
  items,
  status,
}: {
  items: MultipleShowsQueryResponseType;
  status: string;
}) => {
  return status === 'isFavorited' ? (
    <div className='w-full flex flex-wrap gap-2'>
      {items?.filter((item) => item.isFavorited)
        .map((item, index) => {
          return <ShowContainer key={index} {...item} />;
        })}
    </div>
  ) : status === 'All' ? (
    <div className='w-full flex flex-wrap gap-2'>
      {items?.map((item, index) => {
          return <ShowContainer key={index} {...item} />;
        })}
    </div>
  ) : (
    <div className='w-full flex flex-wrap gap-2'>
      {items?.filter((item) => item.status === status)
        .map((item, index) => {
          return <ShowContainer key={index} {...item} />;
        })}
    </div>
  );
};

export default ListContainer;
