import React from 'react';
import SwiperContainer from './SwiperContainer';
import { useGetMultipleShowsQuery } from '@/features/profile';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Skeleton from 'react-loading-skeleton';
import { iconHelper } from '@/config/icons';

const WatchHistorySection = () => {
  const { data: historyList, error } = useGetMultipleShowsQuery();
  const [shouldWatchHistoryDisplay, setShouldWatchHistoryDisplay] = React.useState(true);

  const [animationParentRef] = useAutoAnimate();

  return historyList ? (
    historyList?.filter((each) => each.status === 'Watching').length ?? 0 > 0 ? (
      <div className='relative w-full flex justify-center items-center bg-slate-50 py-4 dark:bg-stone-900 dark:shadow-yellow-400 shadow-sm rounded-lg'>
        <div className='w-full flex flex-col relative items-center' ref={animationParentRef}>
          <strong className='z-10 grow w-11/12 flex gap-4 font-poppins text-xl tracking-[0.1rem] text-slate-900 uppercase py-2 dark:text-yellow-500'>
            Continue Watching
            <button
              className='rounded-lg mt-4 bg-slate-300 px-2 hover:bg-slate-400 text-lg ml-auto dark:bg-stone-900'
              onClick={() => setShouldWatchHistoryDisplay((prev) => !prev)}
            >
              {shouldWatchHistoryDisplay ? (
                <div className='flex gap-2 font-normal items-center'>
                  Hide{' '}
                  <div className='ring-2 ring-stone-600 rounded-sm'>
                    {iconHelper.close('text-lg')}
                  </div>
                </div>
              ) : (
                <div className='flex gap-2 font-normal items-center'>
                  Show
                  {iconHelper.open('text-xl')}
                </div>
              )}
            </button>
          </strong>
          {shouldWatchHistoryDisplay && (
            <SwiperContainer
              styles={{
                swiper: 'bg-opacity-0 relative z-20 w-full h-[18rem] overflow-hidden bg-slate-400 shadow-inner dark:bg-stone-900',
              }}
              sliderName='slider7'
              data={{
                results: historyList
                  ?.sort((a, b) => {
                    return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
                  })
                  .filter((media) => media.status === 'Watching'),
              }}
              mediaType={'multiple'}
              sectionName='history'
            />
          )}
        </div>
      </div>
    ) : (
      <div className='relative w-full flex h-[5rem] justify-center items-baseline pt-4 gap-4 bg-slate-300 dark:bg-stone-300 md:bg-gradient-to-r dark:md:from-stone-900 dark:md:via-stone-700 dark:md:to-stone-900 md:from-slate-900 md:via-slate-700 md:to-slate-900 md:bg-opacity-50 md:text-white md:font-normal md:items-center md:pt-0 rounded-lg font-poppins text-normal font-bold px-8 dark:border-transparent dark:shadow-yellow-400 shadow-sm '>
        <h1 className='text-stone-400 text-base dark:text-yellow-500'>
          No movies or TV shows in watch history
        </h1>
        <Link
          className='text-slate-900 flex items-start justify-center relative md:bg-slate-100 md:px-4 md:py-[3px] md:text-lg gap-2 md:rounded-lg md:shadow-xl md:hover:bg-slate-300 transition-full duration-300 dark:bg-amber-300 dark:hover:bg-amber-400 dark:text-stone-900'
          to='/discover'
          onClick={() => {
            console.log('navigating to exploring page..');
          }}
        >
          <span> Find something to watch</span>
          {/* <div className='rounded-full w-[1.8rem] grid place-items-center h-[1.8rem] bg-stone-400 dark:bg-stone-700 '>
            {iconHelper.search('text-lg text-stone-700 dark:text-yellow-500')}
          </div> */}
        </Link>
      </div>
    )
  ) : error instanceof Error ? (
    <div className='h-[5rem] w-full group flex justify-center items-center bg-slate-200 font-poppins text-normal font-bold text-stone-800 px-8 dark:bg-gradient-to-r rounded-lg dark:from-stone-900 dark:via-stone-800 dark:to-stone-900  dark:text-yellow-500 shadow-sm dark:shadow-yellow-400'>
      <div className='xs:min-w-[20rem] min-w-[15rem] group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0 flex justify-start items-start gap-2 md:items-center '>
        {iconHelper.question('text-4xl md:text-2xl')}
        <span className='text-base whitespace-nowrap'>Create an account to access watch history</span>
      </div>
      <Link
        className='ml-8 group-hover:ml-0 overflow-hidden group-hover:max-w-[10rem] opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-items-center px-4 py-2 rounded-lg bg-slate-500 hover:bg-slate-600 text-white shadow-lg dark:hover:bg-yellow-600 dark:bg-yellow-500 dark:text-stone-900 whitespace-nowrap'
        to='/profile'
      >
        Sign in
      </Link>
    </div>
  ) : (
    <div className='h-[5rem] w-full group flex justify-center items-center bg-slate-200 font-poppins text-normal font-bold text-stone-800 px-8 dark:bg-gradient-to-r rounded-lg dark:from-stone-900 dark:via-stone-800 dark:to-stone-900  dark:text-yellow-500 shadow-sm dark:shadow-yellow-400'>
      <div className='xs:min-w-[20rem] min-w-[15rem] group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0 flex justify-start items-start gap-2 md:items-center'>
        <Skeleton className='h-full w-full'/>
      </div>
    </div>
  );
};

export default WatchHistorySection;
