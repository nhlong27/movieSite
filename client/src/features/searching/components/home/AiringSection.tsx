import { mediaTypeAtom } from '@/App';
import Wrapper from '@/components/handling/Wrapper';
import { useAtom } from 'jotai';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import { mediaTypeConfig } from '../../queries';
import SwiperContainer from './SwiperContainer';
import SectionBackdrop from './SectionBackdrop';
import { useMediaQueries } from '@/hooks/useMediaQueries';

const AiringSection = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const { data } = useFilteredItemListQuery(mediaTypeConfig[`${mediaType}`].home.paramList.airing);

  const { isXs } = useMediaQueries();

  return (
    <div className='relative 4k:aspect-[18/9] xl:aspect-[15/5] xs:aspect-[9/6] w-full flex justify-center items-center'>
      <div className='w-11/12 flex flex-col'>
        <div className='z-10 grow xl:aspect-[22/14] lg:aspect-[12/9] xs:aspect-square w-full'>Now Airing</div>
        <SwiperContainer
          sliderName={'slider3'}
          data={data}
          section='airing'
          mediaType={mediaType}
        />
      </div>
      {isXs ? <SectionBackdrop section='airing' mediaType={mediaType} /> : null}
    </div>
  );
};

export default () => (
  <Wrapper>
    <AiringSection />
  </Wrapper>
);
