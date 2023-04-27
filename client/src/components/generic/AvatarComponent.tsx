import { useGetUserQuery } from '@/features/profile';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import defaultAvatar_1 from '/assets/defaultAvatar_1.png';

interface AvatarComponentProps {
  styles?: Record<string, any>;
}
const AvatarComponent: React.FC<AvatarComponentProps> = (props) => {
  const { data } = useGetUserQuery();
  const { styles } = props;
  return (
      <div className={styles?.image}>
        <LazyLoadImage
          src={data && data?.avatar !== '' ? data?.avatar : defaultAvatar_1}
          height={styles?.height}
          width={styles?.width}
          alt={styles?.alt ?? 'image'}
          effect={styles?.effect ?? 'blur'}
        />
      </div>
  );
};

export default AvatarComponent;
