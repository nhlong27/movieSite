import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import SwiperContainer from './SwiperContainer';
import SectionBackdrop from './SectionBackdrop';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { useSectionBackdropItemsStore } from '../../stores';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { Link } from 'react-router-dom';
import HomeSectionSkeleton from '../skeletons/HomeSectionSkeleton';


const TrendingSection = () => {
  const [period, setPeriod] = React.useState('day');

  const { data, mediaType } = useFilteredItemListQuery('trending', period);

  const sectionBackdropItemStore = useSectionBackdropItemsStore();
  const sectionBackdropItem = sectionBackdropItemStore.getSectionBackdropItem('trending');

  React.useEffect(() => {
    if (data?.pages[0].results) {
      sectionBackdropItemStore.setSectionBackdropItem(
        'trending',
        data.pages[0].results.sort((a, b) => 0.5 - Math.random())[0],
      );
    }
  }, [data]);



  const { isXs } = useMediaQueries();
  return (
    <div className='relative 4k:aspect-[18/9] xl:aspect-[15/5] xs:aspect-[9/6] w-full flex justify-center items-center z-0'>
      <div className='w-11/12 flex flex-col z-10'>
        <div className='xl:aspect-[22/14] lg:aspect-[12/9] z-20 xs:aspect-square w-full'>
          Trending
          <div className='w-full flex gap-2'>
            <ButtonComponent onClick={() => setPeriod('day')}>today</ButtonComponent>
            <ButtonComponent onClick={() => setPeriod('week')}>this week</ButtonComponent>
            <Link to={`/${mediaType}/${sectionBackdropItem?.id}`} className='ml-auto text-white'>
              Watch
            </Link>
          </div>
        </div>
        <SwiperContainer
          sliderName={'slider1'}
          data={data!.pages[0]}
          sectionName='trending'
          mediaType={mediaType}
        />
      </div>
      {isXs ? <SectionBackdrop section='trending' mediaType={mediaType} /> : null}
    </div>
  );
};

export default () => (
  <Wrapper suspenseComponent={<HomeSectionSkeleton />}>
    <TrendingSection />
  </Wrapper>
);
