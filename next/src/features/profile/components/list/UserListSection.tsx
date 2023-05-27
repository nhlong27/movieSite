import React from 'react';
import { useGetMultipleShowsQuery } from '../../hooks/useGetMultipleShowsQuery';
import MediaList from './MediaList';
import { MultipleShowsQueryResponseType } from '../../types';
import ListFilters from './ListFilters';
import ButtonComponent from '@/components/generic/ButtonComponent';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { listFilterPrompts } from '@/config/constants';
import { iconHelper } from '@/config/icons';
import { imageHelper } from '@/config/images';


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
  const [listFilter, setListFilter] = React.useState<string>('All');
  const { data: mediaList, error } = useGetMultipleShowsQuery(queryTitle);
  const [animationParentRef] = useAutoAnimate();

  return mediaList ? (
    <div className='lg:row-start-1 lg:col-start-1 lg:col-span-3 w-full flex flex-col items-center min-h-screen bg-stone-200 rounded-xl shadow-xl py-4 px-4 font-poppins dark:bg-stone-900'>
      <div className='ml-0 flex w-full uppercase text-xl font-black tracking-[0.1rem] text-stone-500 py-2 border-b-2 border-stone-300 dark:text-yellow-500 dark:border-yellow-500'>
        My List
      </div>
      <ListFilters listFilter={listFilter} setListFilter={setListFilter} />
      <div
        className={`flex flex-col md:flex-row justify-start w-full px-4  rounded-xl shadow-xl my-4 bg-gradient-to-r from-stone-900 py-4 ${
          listFilter === 'All' || listFilter === 'Plan to Watch' ? 'via-stone-800' : 'via-stone-900'
        } to-stone-900  text-base  flex-col items-center gap-4 font-bold`}
      >
        <img
          className={`w-[10rem] h-[10rem] object-cover`}
          src={listFilterPrompts[listFilter]['image']}
          alt='img'
        />
        <div className='flex flex-col text-stone-100 items-center md:items-start dark:text-lime-400'>
          <div className='uppercase font-black tracking-[0.3rem] text-xl py-4'>
            {listFilterPrompts[listFilter]['title']}
          </div>
          <p className='text-base py-2 text-stone-400 '>{listFilterPrompts[listFilter]['text']}</p>
        </div>
      </div>
      <div className='flex justify-start w-full px-4 py-2 rounded-lg my-4 bg-stone-100 shadow-lg text-lg text-stone-600 gap-4 font-bold dark:bg-stone-900  dark:rounded-none dark:text-yellow-400 h-[4rem]'>
        <ButtonComponent className='' onClick={() => setShouldQueryDisplay((prev) => !prev)}>
          <h1 className='flex px-4 py-2 text-base hover:bg-stone-300 rounded-xl gap-2 items-center dark:hover:bg-stone-900 dark:hover:text-yellow-500 dark:shadow-yellow-200 transition-full duration-200 dark:shadow-sm dark:hover:shadow-none'>
            Search
            {iconHelper.next('text-2xl')}
          </h1>
        </ButtonComponent>
        <div
          className={`transition-full grow duration-300 overflow-hidden flex ${
            shouldQueryDisplay ? 'max-w-[20rem] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <input
            type='text'
            className='grow bg-stone-300 shadow-inner rounded-2xl pl-4 dark:bg-stone-900 dark:rounded-none dark:border-b-2 dark:border-yellow-400'
            value={queryTitle}
            onChange={(e) => {
              setQueryTitle(e.currentTarget.value);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <ButtonComponent
          className={`transition-full duration-300   overflow-hidden flex gap-2 items-center ${
            shouldQueryDisplay ? 'max-w-[10rem] opacity-100' : 'max-w-0 opacity-0'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setShouldQueryDisplay(false);
            setQueryTitle('');
          }}
        >
          <h1 className='grid place-items-center hover:text-yellow-500 rounded-full w-[1.4rem] h-[1.4rem]'>
            {' '}
            {iconHelper.before('text-2xl')}
          </h1>
          <p className={`${shouldQueryDisplay ? '' : 'hidden'} dark:text-yellow-500 whitespace-nowrap text-sm md:visible invisible`}>Type a name</p>
        </ButtonComponent>
      </div>
      <div className='relative flex flex-col justify-center items-center grow w-full bg-stone-900 rounded-xl overflow-hidden'>
        <img src={imageHelper.backdrop} alt='my_list' className='opacity-50 absolute top-0' />
        {mediaList && mediaList?.length === 0 ? (
          <div
            className={
              'flex flex-col justify-center items-center gap-4 w-11/12 md:w-1/2 bg-stone-200 h-[8rem] rounded-xl shadow-xl z-20 dark:bg-amber-300'
            }
          >
            <h1 className='text-base font-semibold text-stone-500 tracking-wide dark:text-stone-900'>
              Media doesn't exist in database.
            </h1>
            <Link
              className='w-3/4 px-4 py-2 font-poppins rounded-xl bg-stone-300 grid place-items-center ring-2 ring-stone-400 text-stone-400 hover:bg-stone-400 hover:text-stone-600 text-base hover:ring-stone-600 dark:bg-stone-900 dark:ring-transparent dark:text-yellow-500 dark:hover:bg-yellow-400 dark:hover:text-stone-900 dark:hover:ring-stone-800'
              href='/discover'
              onClick={() => {
                console.log('navigating to exploring page..');
              }}
            >
              Find something else to watch
            </Link>
          </div>
        ) : (
          <div
            ref={animationParentRef}
            className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-stone-200 rounded-b-xl shadow-xl py-4 dark:bg-stone-900'
          >
            {listFilters[`${listFilter}`](
              mediaList!.sort((a, b) => {
                return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
              }),
              listFilter,
            )}
          </div>
        )}
      </div>
    </div>
  ) : error instanceof Error ? (
    <div
      className={
        'grid place-content-center place-items-center h-[10rem] w-full bg-stone-200 dark:bg-stone-900 font-poppins shadow-xl rounded-b-xl'
      }
    >
      <h1 className='text-base ring-stone-600 ring-2 text-stone-900 bg-stone-400 rounded-xl px-8 py-2 font-semibold flex gap-2 items-center dark:bg-yellow-50 '>
      {iconHelper.exclamation('text-2xl')}
        {error.message ?? 'Failed to load resources'}
      </h1>
      <ButtonComponent
        className='px-4 py-[2px] bg-primary rounded-md text-stone-900 text-lg mt-4 hover:bg-yellow-200  transition duration-300 flex gap-2 items-center dark:bg-yellow-500 font-black dark:hover:bg-stone-900 dark:hover:text-yellow-500 dark:hover:ring-2 dark:hover:ring-yellow-500'
        onClick={() => {
          console.log('reloading the page..');
          window.location.reload();
        }}
      >
        {iconHelper.reload('text-lg')}
        Reload
      </ButtonComponent>
    </div>
  ) : (
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col items-center min-h-screen bg-stone-200 dark:bg-stone-900'>
      <div className='w-full h-[2rem]'></div>
      <div className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4k:grid-cols-6 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-stone-200 rounded-b-xl shadow-xl py-4 dark:bg-stone-900'>
        {Array(20)
          .fill('')
          .map((media, index) => (
            <div className='rounded-md aspect-[10/14] w-[200px]' key={index}>
              <Skeleton className='h-full w-full' />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserListSection;
