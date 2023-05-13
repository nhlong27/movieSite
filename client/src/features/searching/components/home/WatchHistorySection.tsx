import React from 'react';
import SwiperContainer from './SwiperContainer';
import Wrapper from '@/components/handling/Wrapper';
import { useGetMultipleShowsQuery } from '@/features/profile';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdOpen, IoMdClose } from 'react-icons/io';

const WatchHistorySection = () => {
  const { data: historyList } = useGetMultipleShowsQuery();
  const [shouldWatchHistoryDisplay, setShouldWatchHistoryDisplay] = React.useState(true);

  const [animationParentRef] = useAutoAnimate();

  return historyList?.length && historyList.length > 0 ? (
    <div className='relative w-full flex justify-center items-center bg-stone-200 py-4 shadow-lg ring-8 ring-offset-8 ring-offset-stone-300 ring-stone-400'>
      <div className='w-full flex flex-col relative items-center' ref={animationParentRef}>
        <strong className='z-10 grow w-11/12 flex gap-4 font-poppins text-xl font-black tracking-[0.1rem] text-stone-600 uppercase py-2'>
          Continue Watching
          <button
            className='rounded-lg bg-stone-300 px-2 hover:bg-stone-400 text-base ml-auto'
            onClick={() => setShouldWatchHistoryDisplay((prev) => !prev)}
          >
            {shouldWatchHistoryDisplay ? (
              <div className='flex gap-2 items-center'>
                Hide{' '}
                <div className='w-[1rem] h-[1rem] grid place-items-center rounded-full ring-2 ring-stone-500'>
                  <IoMdClose className='text-base' />
                </div>
              </div>
            ) : (
              <div className='flex gap-2 items-center'>
                Show
                <IoMdOpen className='text-lg' />
              </div>
            )}
          </button>
        </strong>
        {shouldWatchHistoryDisplay && (
          <SwiperContainer
            styles={{ swiper: 'relative z-20 w-full h-[24rem] overflow-hidden bg-stone-400 shadow-inner' }}
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
    <div className='relative w-full flex h-[5rem] justify-center items-baseline pt-4 gap-4 bg-stone-300 shadow-inner border-2 border-stone-400 font-poppins text-normal font-bold px-8'>
      <h1 className='text-stone-400 text-sm'>No movies or TV shows in watch history</h1>
      <Link
        className='text-stone-600 hover:text-stone-800 hover:underline flex items-start justify-center relative'
        to='/discover'
        onClick={() => {
          console.log('navigating to exploring page..');
        }}
      >
        <span> Find something to watch</span>
        <div className='rounded-full w-[1.5rem] grid place-items-center h-[1.5rem] bg-stone-400 absolute bottom-0 right-16'>
          <AiOutlineSearch className='text-lg text-stone-700' />
        </div>
      </Link>
    </div>
  );
};

export default () => (
  <Wrapper
    errorComponent={() => (
      <div className='h-[5rem] w-full group flex justify-center items-center bg-stone-300 shadow-inner border-2 border-stone-400 font-poppins text-normal font-bold text-stone-800 px-8 '>
        <div className='xs:min-w-[20rem] min-w-[15rem] group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0 flex justify-start items-start gap-2'>
          <AiOutlineQuestionCircle className='text-4xl' />
          <span>Create an account to access watch history</span>
        </div>
        <Link
          className='ml-8 group-hover:ml-0 overflow-hidden group-hover:max-w-[10rem] opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-items-center px-4 py-2 rounded-lg bg-stone-600 text-stone-50 shadow-lg'
          to='/profile'
        >
          Sign in
        </Link>
      </div>
    )}
  >
    <WatchHistorySection />
  </Wrapper>
);
