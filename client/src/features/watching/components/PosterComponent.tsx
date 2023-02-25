import LazyLoadImageComponent from '@/components/ui/LazyLoadImageComponent';
import Wrapper from '@/components/ui/Wrapper';
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
