import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

const SkeletonComponent = (props: Record<string, any>) => {
  return <Skeleton {...props} />;
};

export default SkeletonComponent;
