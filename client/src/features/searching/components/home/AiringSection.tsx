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
import { BsPlayFill } from 'react-icons/bs';

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
    <div className='relative 4k:aspect-[18/9] xl:aspect-[15/5] xs:aspect-[9/6] w-full flex justify-center items-center z-0 bg-stone-200 py-4 rounded-lg shadow-lg'>
      <div className='w-11/12 flex flex-col z-10'>
        <div className='z-10 grow xl:aspect-[22/14] lg:aspect-[12/9] xs:aspect-square w-full font-poppins text-2xl font-black tracking-[0.3rem] text-stone-500 uppercase'>
          <div className='py-2 border-b-2 border-stone-300 mb-4'>Now Airing</div>
          <div className='w-full py-2 flex gap-4 text-lg'>
            {isXs ? (
              <Link
                to={`/${mediaType}/${sectionBackdropItem?.id}`}
                className='text-stone-100 flex ml-auto justify-center items-center gap-4 px-4 py-2 hover:bg-gradient-to-r from-transparent to-stone-100  hover:bg-opacity-20 bg-opacity-0 cursor-pointer'
              >
                <div
                  className='rounded-full bg-stone-200 h-[2.5rem] w-[2.5rem] grid pl-[3px]
              place-content-center text-stone-600 shadow-lg hover:bg-stone-300'
                >
                  <BsPlayFill className=' text-[2.8rem]' />
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
