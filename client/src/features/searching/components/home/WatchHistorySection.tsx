import React from 'react';
import SwiperContainer from './SwiperContainer';
import Wrapper from '@/components/handling/Wrapper';
import { useGetMultipleShowsQuery } from '@/features/profile';
import { Link } from 'react-router-dom';

const WatchHistorySection = () => {
  const { data: historyList } = useGetMultipleShowsQuery();

  return historyList?.length && historyList.length > 0 ? (
    <div className='relative w-full flex justify-center items-center'>
      <div className='w-full flex flex-col relative'>
        <div className='z-10 grow w-full'>Continue Watching</div>
        <SwiperContainer
          styles={{ swiper: 'relative' }}
          sliderName={'slider4'}
          sectionName='popular'
          data={{
            results: historyList
              ?.sort((a, b) => {
                return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
              })
              .filter((media) => media.status === 'Watching'),
          }}
          mediaType={'tv'}
        />
      </div>
    </div>
  ) : (
    <div className='relative w-full flex justify-center items-center gap-8'>
      <h1>No movies or TV shows in watch history</h1>
      <Link
        to='/discover'
        onClick={() => {
          console.log('navigating to exploring page..');
        }}
      >
        Find something to watch
      </Link>
    </div>
  );
};

export default () => (
  <Wrapper
    errorComponent={() => (
      <div className='h-[3rem] w-full group flex justify-center items-center'>
        <div className='min-w-[20rem] max-h-[2rem] group-hover:max-w-0 transition-all duration-300 overflow-hidden opacity-100 group-hover:opacity-0'>
          Create an account to access watch history!
        </div>
        <Link
          className='ml-8 group-hover:ml-0 overflow-hidden group-hover:max-w-[10rem] opacity-0 group-hover:opacity-100 transition-all duration-300 grid place-items-center'
          to='/profile'
        >
          Sign Up / Sign In
        </Link>
      </div>
    )}
  >
    <WatchHistorySection />
  </Wrapper>
);
