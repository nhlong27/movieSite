import Wrapper from '@/components/ui/Wrapper';
import { MovieType, TVType } from '@/types/types';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import SwiperContainer from './SwiperContainer';
import HeroSection from './HeroSection';

const TrendingSection = () => {
  const [period, setPeriod] = React.useState('day');

  const [heroIndex, setHeroIndex] = React.useState<MovieType | TVType | null>(null);

  const { data, mediaType } = useFilteredItemListQuery('trending', period);


  return (
    <div className='relative lg:aspect-[16/10] md:aspect-[9/6] w-full lg:h-[70vh] md:h-[50vh] h-[30vh]'>
      <div className='absolute left-0 top-0'>
      Trending{' '}
      <div>
        <button onClick={() => setPeriod('day')}>today</button>
        <button onClick={() => setPeriod('week')}>this week</button>
      </div>
      </div>
      <HeroSection heroIndex={heroIndex} mediaType = {mediaType}/>
      <SwiperContainer sliderName={'slider1'} heroIndex={heroIndex} data={data} setHeroIndex={setHeroIndex} mediaType={mediaType} />
    </div>)
};

export default () => (
  <Wrapper>
    <TrendingSection />
  </Wrapper>
);
