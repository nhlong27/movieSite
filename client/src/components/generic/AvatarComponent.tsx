import { useGetUserQuery } from '@/features/profile/hooks/useGetUserQuery';
import React from 'react';
interface AvatarComponentProps {
  source?: string;
  alt?: string;
  className?: string;
}
const AvatarComponent: React.FC<AvatarComponentProps> = (props) => {
  const { data } = useGetUserQuery();
  const { source, alt, className } = props;
  return (
    <div className={className}>
      <img src={source?? data?.avatar} alt={alt} className={`${className ?? 'h-40 w-28'}`} />
    </div>
  );
};

export default AvatarComponent;
