import React from 'react';
import SwiperContainer from './SwiperContainer';
import { useGetMultipleShowsQuery } from '@/features/profile';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Skeleton from 'react-loading-skeleton';
import { iconHelper } from '@/config/icons';
import { imageHelper } from '@/config/images';

const WatchHistorySection = () => {
  const { data: historyList, error } = useGetMultipleShowsQuery();
  const [shouldWatchHistoryDisplay, setShouldWatchHistoryDisplay] = React.useState(true);

  const [animationParentRef] = useAutoAnimate();

  return historyList ? (
    historyList?.filter((each) => each.status === 'Watching').length ?? 0 > 0 ? (
      <div className='relative w-full flex justify-center items-center bg-stone-200 py-4  ring-8 ring-offset-8 ring-offset-stone-300 ring-stone-400 dark:bg-stone-900 dark:ring-transparent dark:ring-offset-transparent dark:shadow-yellow-400 shadow-lg'>
        <div className='w-full flex flex-col relative items-center' ref={animationParentRef}>
          <strong className='z-10 grow w-11/12 flex gap-4 font-poppins text-xl font-black tracking-[0.1rem] text-stone-600 uppercase py-2 dark:text-yellow-500 '>
            Continue Watching
            <button
              className='rounded-lg bg-stone-300 px-2 hover:bg-stone-400 text-lg ml-auto dark:bg-stone-900'
              onClick={() => setShouldWatchHistoryDisplay((prev) => !prev)}
            >
              {shouldWatchHistoryDisplay ? (
                <div className='flex gap-2 items-center'>
                  Hide{' '}
                  <div className='ring-2 ring-stone-600 rounded-sm'>
                    {iconHelper.close('text-lg')}
                  </div>
                </div>
              ) : (
                <div className='flex gap-2 items-center'>
                  Show
                  {iconHelper.open('text-xl')}
                </div>
              )}
            </button>
          </strong>
          {shouldWatchHistoryDisplay && (
            <SwiperContainer
              styles={{
                swiper: 'bg-opacity-0 relative z-20 w-full h-[24rem] overflow-hidden bg-stone-400 shadow-inner dark:bg-stone-900',
              }}
              sliderName={'slider6'}
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
      <div className='relative w-full flex h-[5rem] justify-center items-baseline pt-4 gap-4 bg-stone-300 md:bg-gradient-to-r md:from-stone-900 md:via-stone-700 md:to-stone-900 md:bg-opacity-50 md:text-stone-50 md:font-normal md:items-center md:pt-0  border-2 border-stone-400 font-poppins text-normal font-bold px-8 dark:border-transparent dark:shadow-yellow-400 shadow-lg '>
        <h1 className='text-stone-400 text-sm md:text-2xl dark:text-yellow-500'>
          No movies or TV shows in watch history
        </h1>
        <Link
          className='text-stone-600 hover:text-stone-900 flex items-start justify-center relative md:bg-stone-50 md:px-8 md:py-2 md:text-xl gap-2 md:rounded-lg md:shadow-xl md:hover:bg-stone-200 dark:bg-amber-300 dark:text-stone-900'
          to='/discover'
          onClick={() => {
            console.log('navigating to exploring page..');
          }}
        >
          <span> Find something to watch</span>
          <div className='rounded-full w-[1.8rem] grid place-items-center h-[1.8rem] bg-stone-400 dark:bg-stone-700 '>
            {iconHelper.search('text-lg text-stone-700 dark:text-yellow-500')}
          </div>
        </Link>
      </div>
    )
  ) : error instanceof Error ? (
    <div className='h-[5rem] w-full group flex justify-center items-center bg-stone-300 border-y-2 border-stone-400 font-poppins text-normal font-bold text-stone-800 px-8 dark:bg-gradient-to-r dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 dark:border-yellow-600 dark:text-yellow-500 shadow-lg dark:shadow-yellow-400'>
      <div className='xs:min-w-[20rem] min-w-[15rem] group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0 flex justify-start items-start gap-2 md:items-center '>
        {iconHelper.question('text-4xl md:text-2xl')}
        <span className='md:text-xl whitespace-nowrap'>Create an account to access watch history</span>
      </div>
      <Link
        className='ml-8 group-hover:ml-0 overflow-hidden group-hover:max-w-[10rem] opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-items-center px-4 py-2 rounded-lg bg-stone-600 text-stone-50 shadow-lg dark:bg-yellow-500 dark:text-stone-900 whitespace-nowrap'
        to='/profile'
      >
        Sign in
      </Link>
    </div>
  ) : (
    <div className='h-[5rem] w-full group flex justify-center items-center bg-stone-300 shadow-inner border-2 border-stone-400 font-poppins text-normal font-bold text-stone-800 px-8 '>
      <div className='xs:min-w-[20rem] min-w-[15rem] group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0 flex justify-start items-start gap-2 md:items-center '>
        <Skeleton className='h-full w-full' />
      </div>
    </div>
  );
};

export default WatchHistorySection;
