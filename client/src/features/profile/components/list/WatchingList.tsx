import React from 'react'
import { useGetMultipleShowsQuery } from '../../hooks/useGetMultipleShowsQuery';
import ShowContainer from './ShowContainer';

const WatchingList = () => {
  const { data: shows } = useGetMultipleShowsQuery();
  return shows ? (
    <div>
      WatchingList:
      {shows.filter(show=>show.status==='Watching').map((show, index) => {
        return <ShowContainer key={index} {...show} />;
      })}
    </div>
  ) : null;
};


export default WatchingList