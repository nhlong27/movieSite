import { mediaTypeAtom } from '@/App';
import Wrapper from '@/components/ui/Wrapper';
import { MovieType, TVType } from '@/types/types';
import { useAtom } from 'jotai';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import { mediaTypeConfig } from '../../queries';
import SwiperContainer from './SwiperContainer';
import HeroSection from './HeroSection';

const AiringSection = () => {
  const [heroIndex, setHeroIndex] = React.useState<MovieType | TVType | null>(null);

  const [mediaType] = useAtom(mediaTypeAtom);
  const { data } = useFilteredItemListQuery(mediaTypeConfig[`${mediaType}`].home.paramList.airing);

  return (
    <div className='relative lg:aspect-[16/10] md:aspect-[9/6] w-full lg:h-[70vh] md:h-[50vh] h-[30vh]'>
      {mediaTypeConfig[`${mediaType}`].home.paramList.airing === 'now_playing'
        ? 'Now playing'
        : 'Airing now'}
      <HeroSection heroIndex={heroIndex} mediaType={mediaType} />
      <SwiperContainer sliderName={'slider3'}heroIndex={heroIndex} setHeroIndex={setHeroIndex} data={data} mediaType={mediaType} />
    </div>
  );
};

export default () => (
  <Wrapper>
    <AiringSection />
  </Wrapper>
);
