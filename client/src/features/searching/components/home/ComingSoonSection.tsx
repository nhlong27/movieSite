import { mediaTypeAtom } from '@/App';
import Wrapper from '@/components/handling/Wrapper';
import { useAtom } from 'jotai';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import { mediaTypeConfig } from '../../queries';
import SwiperContainer from './SwiperContainer';
import SectionBackdrop from './SectionBackdrop';
import { useMediaQueries } from '@/hooks/useMediaQueries';

const ComingSoonSection = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const { data } = useFilteredItemListQuery(
    mediaTypeConfig[`${mediaType}`].home.paramList.coming_soon,
  );
  const { isXs } = useMediaQueries();

  return (
    <div className='relative 4k:aspect-[18/9] xl:aspect-[15/5] md:aspect-[9/6] w-full flex justify-center items-center'>
      <div className='w-11/12 flex flex-col'>
        <div className='z-10 grow xl:aspect-[22/14] lg:aspect-[12/9] md:aspect-square w-full'>Coming Soon
        </div>
        <SwiperContainer
          sliderName={'slider2'}
          data={data}
          section='comingSoon'
          mediaType={mediaType}
        />
      </div>
      {isXs ? <SectionBackdrop section='comingSoon' mediaType={mediaType} /> : null}
    </div>
  );
};

export default () => (
  <Wrapper>
    <ComingSoonSection />
  </Wrapper>
);
