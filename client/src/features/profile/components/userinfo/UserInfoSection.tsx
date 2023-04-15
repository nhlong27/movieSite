import React from 'react';
import ProfileInfo from './ProfileInfo';
import AvatarContainer from './AvatarContainer';
import PasswordUpdateRequestContainer from './PasswordUpdateRequestContainer';
import { SignOutContainer } from '@/features/authentication';
import DeactivateRequestContainer from './DeactivateRequestContainer';
import AvatarComponent from '@/components/generic/AvatarComponent';

const UserInfoSection = () => {
  return (
    <div className='order-first shrink p-2  col-start-1 md:col-start-4 md:h-full'>
      <div className='md:sticky md:top-[6vh] md:min-h-1/2 w-full'>
        {/* <AvatarContainer /> */}
        <AvatarComponent />
        <ProfileInfo />
        <PasswordUpdateRequestContainer />
        <SignOutContainer />
        <DeactivateRequestContainer />
      </div>
    </div>
  );
};

export default UserInfoSection;
