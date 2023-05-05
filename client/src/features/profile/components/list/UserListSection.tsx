import React from 'react';
import { useGetMultipleShowsQuery } from '../../hooks/useGetMultipleShowsQuery';
import MediaList from './MediaList';
import { MultipleShowsQueryResponseType } from '../../types';
import ListFilters from './ListFilters';
import ButtonComponent from '@/components/generic/ButtonComponent';
import Wrapper from '@/components/handling/Wrapper';
import Skeleton from 'react-loading-skeleton';

const listFilters: Record<string, any> = {
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
  const [queryTitle, setQueryTitle] = React.useState('');
  const [shouldQueryDisplay, setShouldQueryDisplay] = React.useState(false);
  const [listFilter, setListFilter] = React.useState('Watching');
  const { data: mediaList } = useGetMultipleShowsQuery(queryTitle);

  return (
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col items-center min-h-screen'>
      <ListFilters setListFilter={setListFilter} />
      <div className='flex justify-start w-full'>
        <ButtonComponent className='' onClick={() => setShouldQueryDisplay(true)}>
          <h1>Search by Title</h1>
        </ButtonComponent>
        <div
          className={`transition-full grow duration-300 overflow-hidden flex ${
            shouldQueryDisplay ? 'max-w-[20rem] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <input
            type='text'
            className='grow'
            value={queryTitle}
            onChange={(e) => {
              setQueryTitle(e.currentTarget.value);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <ButtonComponent
          className={`transition-full duration-300 overflow-hidden ${
            shouldQueryDisplay ? 'max-w-[5rem] opacity-100' : 'max-w-0 opacity-0'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setShouldQueryDisplay(false);
            setQueryTitle('');
          }}
        >
          <h1>Close</h1>
        </ButtonComponent>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-content-start place-items-center w-full gap-y-4 2xl:gap-4 grow'>
        {listFilters[`${listFilter}`](
          mediaList!.sort((a, b) => {
            return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
          }),
          listFilter,
        )}
      </div>
    </div>
  )
};

export default () => (
  <Wrapper
    suspenseComponent={
      <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col items-center min-h-screen'>
        <div className='w-full h-[2rem]'>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-content-start place-items-center w-full gap-y-4 2xl:gap-4 grow'>
          {Array(20)
            .fill('')
            .map((media, index) => (
              <div className='rounded-md aspect-[10/14] w-[200px]' key={index}>
                <Skeleton className='h-full w-full' />
              </div>
            ))}
        </div>
      </div>
    }
  >
    <UserListSection />
  </Wrapper>
);
