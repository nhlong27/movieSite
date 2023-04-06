import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';

const PosterComponent = () => {
  const { data } = useGetItemDetailQuery();
  return <LazyLoadImageComponent path={data?.poster_path?.toString()} />;
};

export default () => (
  <Wrapper>
    <PosterComponent />
  </Wrapper>
);
