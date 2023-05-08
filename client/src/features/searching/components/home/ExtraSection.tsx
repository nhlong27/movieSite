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
      <div className='relative w-full flex justify-center items-center'>
        <div className='w-full flex flex-col relative'>
          <div className='z-10 grow w-full'>Popular</div>
          <SwiperContainer
            styles={{ swiper: 'relative' }}
            sliderName={'slider4'}
            sectionName='popular'
            data={popular.pages[0]}
            mediaType={mediaType}
          />
        </div>
      </div>
      <div className='relative w-full flex justify-center items-center'>
        <div className='w-full flex flex-col'>
          <div className='z-10 grow w-full'>Top Rated</div>
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
    <div>loading..</div>
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
