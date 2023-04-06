import React from 'react';
import { Effect, LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { resizeImage } from '@/utils/resizeImage';

// const DefaultLazyLoadImageComponentProps = {
//   size: 'original',
//   className: 'w-full h-full object-cover rounded-md'
// }

type LazyLoadImageComponentProps = {
  path?: string | null;
  className?: string;
  size?: string;
  effect?: Effect;
};

const LazyLoadImageComponent: React.FC<LazyLoadImageComponentProps> = ({
  path,
  className,
  size,
  effect
}) => {
  return (
      <LazyLoadImage
        src={resizeImage(path, size)}
        className={className ?? 'object-cover  rounded-md'}
        alt='poster'
        effect={effect ?? 'blur'}
      />
  );
};

export default LazyLoadImageComponent;
