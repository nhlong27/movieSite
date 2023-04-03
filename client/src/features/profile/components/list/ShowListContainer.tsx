import React from 'react';
import { useGetMultipleShowsQuery } from '../../hooks/useGetMultipleShowsQuery';
import ShowContainer from './ShowContainer';

const ShowListContainer = () => {
  const { data: shows } = useGetMultipleShowsQuery();
  return shows ? (
    <div>
      ShowList:
      {shows?.map((show, index) => {
        return <ShowContainer key={index} {...show} />;
      })}
    </div>
  ) : null;
};

export default ShowListContainer;
