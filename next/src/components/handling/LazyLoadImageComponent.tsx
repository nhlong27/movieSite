import React from 'react';
import { Effect, LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { resizeImage } from '@/utils/resizeImage';

type LazyLoadImageComponentProps = {
  path?: string;
  styles?: Record<string, string | undefined>;
  effect?: Effect;
};

const LazyLoadImageComponent: React.FC<LazyLoadImageComponentProps> = ({
  path,
  styles,
  effect,
}) => {
  return (
    <div className={styles?.image}>
      <LazyLoadImage
        src={styles?.size ? resizeImage(path, styles?.size) : path}
        height={styles?.height}
        width={styles?.width}
        alt='Error getting image'
        effect={effect ?? 'blur'}
      />
    </div>
  );
};

export default LazyLoadImageComponent;
