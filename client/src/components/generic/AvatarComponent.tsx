import { useGetUserQuery } from '@/features/profile/hooks/useGetUserQuery';
import React from 'react';
import LazyLoadImageComponent from '../handling/LazyLoadImageComponent';
import { Effect } from 'react-lazy-load-image-component';
interface AvatarComponentProps {
  path?: string;
  size?: string;
  effect?: Effect;
  className?: string;
}
const AvatarComponent: React.FC<AvatarComponentProps> = (props) => {
  const { data } = useGetUserQuery();
  const { path, className, size, effect } = props;
  return data? (
    <div>
      <LazyLoadImageComponent
      path={path ?? data?.avatar}
      className={className}
      size={size ?? 'w154'}
      effect={effect ?? 'blur'}
      />
    </div>
  ) : <div>Loading..</div>
};

export default AvatarComponent;
