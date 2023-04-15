import React from 'react';
import { useGetMultipleShowsQuery } from '../../hooks/useGetMultipleShowsQuery';
import MediaList from './MediaList';
import { MultipleShowsQueryResponseType } from '../../types';
import ListFilters from './ListFilters';

const listFilters: { [key: string]: any } = {
  Watching: (list: MultipleShowsQueryResponseType, status: string) => (
    <MediaList status={status} mediaList={list} />
  ),
  'Plan to Watch': (list: MultipleShowsQueryResponseType, status: string) => (
    <MediaList status={status} mediaList={list} />
  ),
  Completed: (list: MultipleShowsQueryResponseType, status: string) => (
    <MediaList status={status} mediaList={list} />
  ),
  Dropped: (list: MultipleShowsQueryResponseType, status: string) => (
    <MediaList status={status} mediaList={list} />
  ),
  isFavorited: (list: MultipleShowsQueryResponseType, status: string) => (
    <MediaList status={status} mediaList={list} />
  ),
  All: (list: MultipleShowsQueryResponseType, status: string) => (
    <MediaList status={status} mediaList={list} />
  ),
};

const UserListSection = () => {
  const [listFilter, setListFilter] = React.useState('Watching');
  const { data: mediaList } = useGetMultipleShowsQuery();

  return (
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col items-center'>
      <ListFilters setListFilter={setListFilter} />
      <div className='grid place-items-center'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-items-center w-full gap-y-4 2xl:gap-4'>
          {listFilters[`${listFilter}`](mediaList, listFilter)}
        </div>
      </div>
    </div>
  );
};

export default UserListSection;
