import { imageHelper } from '@/config/images';
import { useGetUserQuery } from '@/features/profile';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface AvatarComponentProps {
  styles?: Record<string, any>;
}
const AvatarComponent: React.FC<AvatarComponentProps> = (props) => {
  const { data } = useGetUserQuery();
  const { styles } = props;
  return (
      <div className={`${styles?.image} shadow-inner`}>
        <LazyLoadImage
          src={data && data?.avatar && data?.avatar !== '' ? data?.avatar : imageHelper.logo_better}
          height={styles?.height}
          width={styles?.width}
          alt={styles?.alt ?? 'image'}
          effect={styles?.effect ?? 'blur'}
        />
      </div>
  );
};

export default AvatarComponent;
