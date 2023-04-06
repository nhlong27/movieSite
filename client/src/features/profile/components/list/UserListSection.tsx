import React from 'react';
import ListOptionsContainer from './ListOptionsContainer';
import { useGetMultipleShowsQuery } from '../../hooks/useGetMultipleShowsQuery';
import ListContainer from './ListContainer';
import { MultipleShowsQueryResponseType } from '../../types';

const listOptions: { [key: string]: any } = {
  Watching: (list: MultipleShowsQueryResponseType, status: string) => (
    <ListContainer status={status} items={list} />
  ),
  'Plan to Watch': (list: MultipleShowsQueryResponseType, status: string) => (
    <ListContainer status={status} items={list} />
  ),
  Completed: (list: MultipleShowsQueryResponseType, status: string) => (
    <ListContainer status={status} items={list} />
  ),
  Dropped: (list: MultipleShowsQueryResponseType, status: string) => (
    <ListContainer status={status} items={list} />
  ),
  isFavorited: (list: MultipleShowsQueryResponseType, status: string) => (
    <ListContainer status={status} items={list} />
  ),
  All : (list: MultipleShowsQueryResponseType, status: string) => (
    <ListContainer status={status} items={list} />
  ),
};

const UserListSection = () => {
  const [listOption, setListOption] = React.useState('Watching');
  const { data: items } = useGetMultipleShowsQuery();

  return (
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col'>
      <ListOptionsContainer setListOption={setListOption} />
      {listOptions[`${listOption}`](items, listOption)}
    </div>
  );
};

export default UserListSection;
