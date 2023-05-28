
import React from 'react';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import Wrapper from '@/components/handling/Wrapper';
import { imageHelper } from '@/config/images';


const BackdropComponent = () => {
  const { data } = useGetItemDetailQuery();
  return (
    <div className='absolute aspect-[18/9] top-0 w-full flex items-top overflow-hidden'>
      <LazyLoadImageComponent
        path={data?.backdrop_path ?? imageHelper.backdrop}
        styles={{image:'w-full lg:object-left object-cover lg:h-[100%] aspect-[18/9]',
        size: data?.backdrop_path ? 'original' : undefined}}
      />
      <div className='absolute  md:bg-gradient-radial-top-right ring-2 ring-stone-800 from-transparent via-stone-900 to-stone-900 w-full aspect-[18/9]' />
    </div>
  );
};

export default () => (
  <Wrapper>
    <BackdropComponent />
  </Wrapper>
);
