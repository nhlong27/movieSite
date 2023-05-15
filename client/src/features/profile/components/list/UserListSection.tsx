import React from 'react';
import { useGetMultipleShowsQuery } from '../../hooks/useGetMultipleShowsQuery';
import MediaList from './MediaList';
import { MultipleShowsQueryResponseType } from '../../types';
import ListFilters from './ListFilters';
import ButtonComponent from '@/components/generic/ButtonComponent';
import Wrapper from '@/components/handling/Wrapper';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import backdrop from '/assets/placeholders/backdrop.png';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import { AiOutlineReload } from 'react-icons/ai';
import { listFilterPrompts } from '@/config/constants';

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
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col items-center min-h-screen bg-stone-200 rounded-xl shadow-xl py-4 px-4 font-poppins'>
      <div className='ml-0 flex w-full uppercase text-2xl font-black tracking-[0.1rem] text-stone-500 py-2 border-b-2 border-stone-300'>
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
        <div className='flex flex-col text-stone-100 items-center md:items-start'>
          <div className='uppercase font-black tracking-[0.3rem] text-2xl py-4'>
            {listFilterPrompts[listFilter]['title']}
          </div>
          <p className='text-base py-2 text-stone-400'>{listFilterPrompts[listFilter]['text']}</p>
        </div>
      </div>
      <div className='flex justify-start w-full px-4 py-2 rounded-lg my-4 bg-stone-100 shadow-lg text-base text-stone-600 gap-4 font-bold'>
        <ButtonComponent className='' onClick={() => setShouldQueryDisplay(true)}>
          <h1 className='flex px-4 py-2 hover:bg-stone-300 rounded-xl gap-2 items-center'>
            Search <MdOutlineNavigateNext className='text-2xl' />
          </h1>
        </ButtonComponent>
        <div
          className={`transition-full grow duration-300 overflow-hidden flex ${
            shouldQueryDisplay ? 'max-w-[20rem] opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <input
            type='text'
            className='grow bg-stone-300 shadow-inner rounded-2xl pl-4'
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
          <h1 className='grid place-items-center hover:bg-stone-300 rounded-full w-[1.4rem] h-[1.4rem]'>
            {' '}
            <MdOutlineNavigateBefore className='text-2xl' />
          </h1>
        </ButtonComponent>
      </div>
      <div className='relative flex flex-col justify-center items-center grow w-full bg-stone-900 rounded-xl'>
        <img src={backdrop} alt='my_list' className='opacity-50 absolute top-0' />
        {mediaList && mediaList?.length === 0 ? (
          <div
            className={
              'flex flex-col justify-center items-center gap-8 w-11/12 md:w-1/2 bg-stone-200 h-[10rem] rounded-xl shadow-xl z-20'
            }
          >
            <h1 className='text-base md:text-xl font-bold text-stone-500 tracking-wide'>
              Media doesn't exist in database.
            </h1>
            <Link
              className='w-3/4 px-8 py-2 font-poppins rounded-xl bg-stone-300 grid place-items-center ring-2 ring-stone-400 text-stone-400 hover:bg-stone-400 hover:text-stone-600 font-bold text-xl hover:ring-stone-600'
              to='/discover'
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
            className='grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-content-start place-items-center w-full gap-y-4 2xl:gap-4 py-8'
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
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col justify-start items-center min-h-screen'>
      <div className={'grid place-items-center h-[10rem] w-full'}>
        <h1 className='text-red-700 text-xl font-bold'>{'Failed to load resources'}</h1>
        <ButtonComponent
          className='px-8 py-2 bg-primary rounded-md text-stone-700 text-xl mt-8 hover:bg-yellow-200  transition duration-300 flex gap-2 items-center'
          onClick={() => {
            console.log('reloading the page..');
            window.location.reload();
          }}
        >
          <AiOutlineReload />
          Reload
        </ButtonComponent>
      </div>
    </div>
  ) : (
    <div className='md:row-start-1 md:col-start-1 md:col-span-3 w-full flex flex-col items-center min-h-screen bg-stone-200'>
      <div className='w-full h-[2rem]'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 place-content-start place-items-center w-full gap-y-4 2xl:gap-4 grow'>
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

export default UserListSection
