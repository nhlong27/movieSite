import { mediaTypeAtom } from '@/App';
import Wrapper from '@/components/handling/Wrapper';
import { useAtom } from 'jotai';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import { mediaTypeConfig } from '../../queries';
import SwiperContainer from './SwiperContainer';
import SectionBackdrop from './SectionBackdrop';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { useSectionBackdropItemsStore } from '../../stores';

import { Link } from 'react-router-dom';
import HomeSectionSkeleton from '../skeletons/HomeSectionSkeleton';

const AiringSection = () => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const { data } = useFilteredItemListQuery(mediaTypeConfig[`${mediaType}`].home.paramList.airing);
  const sectionBackdropItemStore = useSectionBackdropItemsStore();
  const sectionBackdropItem = sectionBackdropItemStore.getSectionBackdropItem('airing');

  React.useEffect(() => {
    if (data?.pages[0].results) {
      sectionBackdropItemStore.setSectionBackdropItem(
        'airing',
        data.pages[0].results.sort((a, b) => 0.5 - Math.random())[0],
      );
    }
  }, [data]);
  const { isXs } = useMediaQueries();

  return (
    <div className='relative 4k:aspect-[18/9] xl:aspect-[15/5] xs:aspect-[9/6] w-full flex justify-center items-center z-0'>
      <div className='w-11/12 flex flex-col z-10'>
        <div className='z-10 grow xl:aspect-[22/14] lg:aspect-[12/9] xs:aspect-square w-full'>
          Now Airing
          <Link to={`/${mediaType}/${sectionBackdropItem?.id}`} className='ml-auto text-white'>
            Watch
          </Link>
        </div>
        <SwiperContainer
          sliderName={'slider3'}
          data={data!.pages[0]}
          sectionName='airing'
          mediaType={mediaType}
        />
      </div>
      {isXs ? <SectionBackdrop section='airing' mediaType={mediaType} /> : null}
    </div>
  );
};

export default () => (
  <Wrapper suspenseComponent={<HomeSectionSkeleton />}>
    <AiringSection />
  </Wrapper>
);
