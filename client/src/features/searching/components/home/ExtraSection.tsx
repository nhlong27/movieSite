import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import SwiperContainer from './SwiperContainer';
import Wrapper from '@/components/handling/Wrapper';

const ExtraSection = () => {
  const { data: popular, mediaType } = useFilteredItemListQuery('popular');
  const { data: top_rated } = useFilteredItemListQuery('top_rated');

  return (
    <>
      <div className='relative w-full flex justify-center items-center '>
        <div className='w-11/12 flex flex-col'>
          <div className='z-10 grow w-full'>Popular</div>
          <SwiperContainer
            className='relative'
            role='link'
            sliderName={'slider4'}
            data={popular}
            mediaType={mediaType}
          />
        </div>
      </div>
      <div className='relative w-full flex justify-center items-center'>
        <div className='w-11/12 flex flex-col'>
          <div className='z-10 grow w-full'>Top Rated</div>
          <SwiperContainer
            className='relative'
            role='link'
            sliderName={'slider5'}
            data={top_rated}
            mediaType={mediaType}
          />
        </div>
      </div>
    </>
  );
};

export default () => (
  <Wrapper>
    <ExtraSection />
  </Wrapper>
);
