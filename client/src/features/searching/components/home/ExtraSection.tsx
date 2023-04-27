import React from 'react';
import { useFilteredItemListQuery } from '../../hooks/useFilteredItemListQuery';
import SwiperContainer from './SwiperContainer';
import Wrapper from '@/components/handling/Wrapper';
import Skeleton from 'react-loading-skeleton';
import { useMediaQueries } from '@/hooks/useMediaQueries';

const ExtraSection = () => {
  const { data: popular, mediaType } = useFilteredItemListQuery('popular');
  const { data: top_rated } = useFilteredItemListQuery('top_rated');

  return popular && top_rated ? (
    <>
      <div className='relative w-full flex justify-center items-center'>
        <div className='w-full flex flex-col relative'>
          <div className='z-10 grow w-full'>Popular</div>
          <SwiperContainer
            styles={{ swiper: 'relative' }}
            sliderName={'slider4'}
            sectionName='popular'
            data={popular.pages[0]}
            mediaType={mediaType}
          />
        </div>
      </div>
      <div className='relative w-full flex justify-center items-center'>
        <div className='w-full flex flex-col'>
          <div className='z-10 grow w-full'>Top Rated</div>
          <SwiperContainer
            styles={{ swiper: 'relative' }}
            sliderName={'slider5'}
            sectionName='top_rated'
            data={top_rated.pages[0]}
            mediaType={mediaType}
          />
        </div>
      </div>
    </>
  ) : (
    <div>loading..</div>
  );
};

const SuspenseState = () => {
  return (
    <>
      <div className='w-full xs:h-[20rem] lg:h-[24rem]'>
        <Skeleton className='h-full w-full' />
      </div>
      <div className='w-full xs:h-[20rem] lg:h-[24rem]'>
        <Skeleton className='h-full w-full' />
      </div>
      {/* <div className='relative w-full flex justify-center items-center'>
        <div className='w-full flex flex-col relative'>
          <div className='z-10 grow w-full'>
            <Skeleton className='h-full w-full' />
          </div>
          <div
          className={`z-20 w-full xs:h-[20rem] lg:h-[24rem] absolute bottom-0 left-0 right-0
      `}
        >
          <div className='relative bottom-0 left-0 right-0 w-full h-full'>
            <div className='w-20 h-full bottom-0 left-0 cursor-pointer z-30 bg-opacity-50 bg-gray-300 absolute  rounded-xl'>
              <Skeleton className='h-full w-full' />
            </div>
            <div className={`w-full justify-between absolute bottom-0 flex slider ml-20 h-full`}>
              {Array(is4k ? 8 : isLg ? 6 : 4)
                .fill(0)
                .map((item, index: number) => {
                  return (
                    <div
                      className='
                          w-[10rem] 
                          h-full
                          shadow-lg
                        '
                      key={index}
                    >
                      <Skeleton className='h-full w-full' />
                    </div>
                  );
                })}
            </div>
            <div className='w-20 z-30 h-full absolute bottom-0 right-0 cursor-pointer  bg-opacity-50 bg-gray-300 rounded-xl '>
              <Skeleton className='h-full w-full' />
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className='relative w-full flex justify-center items-center'>
        <div className='w-full flex flex-col'>
          <div className='z-10 grow w-full'>
            <Skeleton className='h-full w-full' />
          </div>
          <div
          className={`z-20 w-full xs:h-[20rem] lg:h-[24rem] absolute bottom-0 left-0 right-0
      `}
        >
          <div className='relative bottom-0 left-0 right-0 w-full h-full'>
            <div className='w-20 h-full bottom-0 left-0 cursor-pointer z-30 bg-opacity-50 bg-gray-300 absolute  rounded-xl'>
              <Skeleton className='h-full w-full' />
            </div>
            <div className={`w-full justify-between absolute bottom-0 flex slider ml-20 h-full`}>
              {Array(is4k ? 8 : isLg ? 6 : 4)
                .fill(0)
                .map((item, index: number) => {
                  return (
                    <div
                      className='
                          w-[10rem] 
                          h-full
                          shadow-lg
                        '
                      key={index}
                    >
                      <Skeleton className='h-full w-full' />
                    </div>
                  );
                })}
            </div>
            <div className='w-20 z-30 h-full absolute bottom-0 right-0 cursor-pointer  bg-opacity-50 bg-gray-300 rounded-xl '>
              <Skeleton className='h-full w-full' />
            </div>
          </div>
        </div>
        </div>
      </div> */}
    </>
  );
};

export default () => (
  <Wrapper suspenseComponent={<SuspenseState />}>
    <ExtraSection />
  </Wrapper>
);
