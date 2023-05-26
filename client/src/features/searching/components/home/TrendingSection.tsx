import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import SwiperContainer from './SwiperContainer';
import SectionBackdrop from './SectionBackdrop';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { useSectionBackdropItemsStore } from '../../stores';
import ButtonComponent from '@/components/generic/ButtonComponent';
import HomeSectionSkeleton from '../skeletons/HomeSectionSkeleton';
import { Link } from 'react-router-dom';
import { iconHelper } from '@/config/icons';

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
    <div className='relative 4k:aspect-[18/9] xl:aspect-[15/5] xs:aspect-[9/6] w-full flex justify-center items-center z-0 bg-stone-200 dark:bg-stone-900 py-4 rounded-lg shadow-lg'>
      <div className='w-11/12 flex flex-col z-10'>
        <div className='xl:aspect-[22/14] lg:aspect-[12/9] z-20 xs:aspect-square w-full font-poppins text-xl font-black tracking-[0.3rem] text-stone-500 dark:text-yellow-400 uppercase'>
          <div className='flex py-2 border-b-2 border-stone-300 dark:border-yellow-600'>
            Trending
          </div>

          <div className='py-2 flex gap-4 text-lg  font-poppins'>
            <ButtonComponent
              className={`transition-full duration-300 h-[3rem] ${
                period === 'day'
                  ? 'text-stone-500 border-b-4 dark:text-yellow-400 border-stone-400 dark:border-yellow-500 font-bold'
                  : 'text-stone-400 dark:text-yellow-500'
              }`}
              onClick={() => setPeriod('day')}
            >
              Today
            </ButtonComponent>
            <ButtonComponent
              className={`transition-full duration-300 h-[3rem] ${
                period === 'week'
                  ? 'text-stone-500 border-b-4 dark:text-yellow-400 border-stone-400 dark:border-yellow-500 font-bold'
                  : 'text-stone-400 dark:text-yellow-500'
              }`}
              onClick={() => setPeriod('week')}
            >
              This week
            </ButtonComponent>
            {isXs ? (
              <Link
                to={`/${mediaType}/${sectionBackdropItem?.id}`}
                className='text-stone-900   dark:text-yellow-900 flex ml-auto justify-center items-center gap-2 px-2 h-[2.4rem] py-[3px]  
                bg-gradient-to-r from-yellow-500 hover:from-yellow-600 hover:bg-gradient-to-r transition-full duration-200 hover:to-yellow-200 to-yellow-100  
                  cursor-pointer rounded-lg text-base'
              >
                <div
                  className='rounded-full bg-yellow-500  dark:bg-yellow-500 h-[2rem] w-[2rem] grid pl-[3px]
              place-content-center text-stone-600 dark:text-yellow-900 shadow-lg
              dark:bg-opacity-0'
                >
                  {iconHelper.play('text-[2rem]')}
                </div>
                Watch
              </Link>
            ) : null}
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
