import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { resizeImage } from '@/utils/resizeImage';

// const DefaultLazyLoadImageComponentProps = {
//   size: 'original',
//   className: 'w-full h-full object-cover rounded-md'
// }

type LazyLoadImageComponentProps = {
  path?: string;
  className?: string;
  size?: string;
};

const LazyLoadImageComponent: React.FC<LazyLoadImageComponentProps> = ({
  path,
  className,
  size,
}) => {
  return (
    <LazyLoadImage
      src={resizeImage(path, size ?? 'w154')}
      className={className ?? 'w-full h-full object-cover rounded-md'}
      alt='poster'
      effect='blur'
    />
  );
};

export default LazyLoadImageComponent;
