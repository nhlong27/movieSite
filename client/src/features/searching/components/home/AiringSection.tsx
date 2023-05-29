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
import { iconHelper } from '@/config/icons';

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
    <div className='relative 4k:aspect-[18/9] xl:aspect-[15/5] xs:aspect-[9/6] w-full flex justify-center items-center z-0 bg-stone-200 py-4 rounded-lg shadow-lg dark:bg-stone-900'>
      <div className='w-11/12 flex flex-col z-10'>
        <div className='z-10 grow xl:aspect-[22/14] lg:aspect-[12/9] xs:aspect-square w-full font-poppins text-xl font-black tracking-[0.3rem] text-stone-500 uppercase dark:text-yellow-400'>
          <div className='py-2 border-b-2 border-stone-300 mb-4 dark:border-yellow-600'>Now Airing</div>
          <div className='w-full py-2 flex gap-4 text-lg'>
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
