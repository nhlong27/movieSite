import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';

const BackdropComponent = () => {
  const { data } = useGetItemDetailQuery();
  return (
    <div className='absolute aspect-[18/9] top-0 w-full flex items-top overflow-hidden'>
      <LazyLoadImageComponent
        path={data?.backdrop_path ?? data?.poster_path}
        className='w-full lg:object-cover md:object-scale-down object-cover lg:object-left lg:h-[100%] aspect-[18/9] mix-blend-overlay'
        size='original'
        effect='blur'
      />
      <div className='absolute  lg:bg-gradient-radial-top-right ring-2 ring-black from-transparent via-black to-black w-full aspect-[18/9]' />
    </div>
  );
};

export default () => (
  <Wrapper>
    <BackdropComponent />
  </Wrapper>
);
