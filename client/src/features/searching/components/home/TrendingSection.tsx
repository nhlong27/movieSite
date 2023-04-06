import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import SwiperContainer from './SwiperContainer';
import SectionBackdrop from './SectionBackdrop';
import { useMediaQueries } from '@/hooks/useMediaQueries';

const TrendingSection = () => {
  const [period, setPeriod] = React.useState('day');

  const { data, mediaType } = useFilteredItemListQuery('trending', period);
  const { isXs } = useMediaQueries();
  return (
    <div className='relative 4k:aspect-[18/9] xl:aspect-[15/5] md:aspect-[9/6] w-full flex justify-center items-center'>
      <div className='w-11/12 flex flex-col'>
        <div className='z-10 grow xl:aspect-[22/14] lg:aspect-[12/9] md:aspect-square w-full'>
          Trending
          <div>
            <button onClick={() => setPeriod('day')}>today</button>
            <button onClick={() => setPeriod('week')}>this week</button>
          </div>
        </div>
        <SwiperContainer
          sliderName={'slider1'}
          data={data}
          section='trending'
          mediaType={mediaType}
        />
      </div>
      {isXs ? <SectionBackdrop section='trending' mediaType={mediaType} /> : null}
    </div>
  );
};

export default () => (
  <Wrapper>
    <TrendingSection />
  </Wrapper>
);
