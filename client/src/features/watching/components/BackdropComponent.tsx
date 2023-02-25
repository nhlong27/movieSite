import LazyLoadImageComponent from '@/components/ui/LazyLoadImageComponent';
import Wrapper from '@/components/ui/Wrapper';
import React from 'react';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';

const BackdropComponent = () => {
  const { data } = useGetItemDetailQuery();
  return <LazyLoadImageComponent path={data?.backdrop_path?.toString()} />;
};

export default () => (
  <Wrapper>
    <BackdropComponent />
  </Wrapper>
);
