
import React from 'react';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import Wrapper from '@/components/handling/Wrapper';

const BackdropComponent = () => {
  const { data } = useGetItemDetailQuery();
  return (
    <div className='absolute aspect-[18/9] top-0 w-full flex items-top overflow-hidden'>
      <LazyLoadImageComponent
        path={data?.backdrop_path ?? data?.poster_path}
        styles={{image:'w-full lg:object-left object-cover lg:h-[100%] aspect-[18/9] mix-blend-overlay',
        size:'original'}}
      />
      <div className='absolute  md:bg-gradient-radial-top-right ring-2 ring-black from-transparent via-black to-black w-full aspect-[18/9]' />
    </div>
  );
};

export default () => (
  <Wrapper>
    <BackdropComponent />
  </Wrapper>
);
