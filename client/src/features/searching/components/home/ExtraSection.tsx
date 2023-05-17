import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import SwiperContainer from './SwiperContainer';
import Wrapper from '@/components/handling/Wrapper';
import Skeleton from 'react-loading-skeleton';

const ExtraSection = () => {
  const { data: popular, mediaType } = useFilteredItemListQuery('popular');
  const { data: top_rated } = useFilteredItemListQuery('top_rated');

  return popular && top_rated ? (
    <>
      <div className='relative w-full flex justify-center items-center bg-stone-200 dark:bg-stone-900 py-4 rounded-lg shadow-lg'>
        <div className='w-full flex flex-col relative font-poppins text-2xl font-black tracking-[0.3rem] text-stone-500 dark:text-yellow-400 items-center'>
          <div className='z-10 w-11/12 py-2 border-b-2 border-stone-300 mb-4 uppercase dark:border-yellow-600'>
          Popular</div>
          <SwiperContainer
            styles={{ swiper: 'relative' }}
            sliderName={'slider4'}
            sectionName='popular'
            data={popular.pages[0]}
            mediaType={mediaType}
          />
        </div>
      </div>
      <div className='relative w-full flex justify-center items-center bg-stone-200 dark:bg-stone-900 py-4 rounded-lg shadow-lg '>
        <div className='w-full flex flex-col font-poppins text-2xl font-black tracking-[0.3rem] text-stone-500 dark:text-yellow-400 items-center'>
          <div className='z-10 grow w-11/12 py-2 border-b-2 border-stone-300 mb-4 uppercase  dark:border-yellow-600'>Top Rated</div>
          <SwiperContainer
            styles={{ swiper: 'relative' }}
            sliderName={'slider5'}
            sectionName='top_rated'
            data={top_rated.pages[0]}
            mediaType={mediaType}
          />
        </div>
      </div>
    </>
  ) : (
    <SuspenseState />
  );
};

const SuspenseState = () => {
  return (
    <>
      <div className='w-full xs:h-[20rem] lg:h-[24rem]'>
        <Skeleton className='h-full w-full' />
      </div>
      <div className='w-full xs:h-[20rem] lg:h-[24rem]'>
        <Skeleton className='h-full w-full' />
      </div>
    </>
  );
};

export default () => (
  <Wrapper suspenseComponent={<SuspenseState />}>
    <ExtraSection />
  </Wrapper>
);
