import React from 'react';
import { Effect, LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { resizeImage } from '@/utils/resizeImage';
// import {BsFillFileImageFill} from 'react-icons/bs'


type LazyLoadImageComponentProps = {
  path?: string | null;
  styles?: Record<string, string|undefined>;
  effect?: Effect;
};

const LazyLoadImageComponent: React.FC<LazyLoadImageComponentProps> = ({
  path,
  styles,
  effect
}) => {
  return (
    <div className={styles?.image}>
      <LazyLoadImage
        src={resizeImage(path, styles?.size)}
        height={styles?.height}
        width={styles?.width}
        alt='image'
        effect={effect ?? 'blur'}
      />
    </div>
  );
};

export default LazyLoadImageComponent;
