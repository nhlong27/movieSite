import React from 'react';
import ProfileInfo from './ProfileInfo';
import AvatarContainer from './AvatarContainer';
import PasswordUpdateRequestContainer from './PasswordUpdateRequestContainer';
import { SignOutContainer } from '@/features/authentication';
import DeactivateRequestContainer from './DeactivateRequestContainer';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';

const UserInfoSection = () => {
  const [shouldUserInfoDisplay, setShouldUserInfoDisplay] = React.useState(true);
  const { isMd } = useMediaQueries();
  return (
    <div className='order-first shrink p-2  col-start-1 md:col-start-4 md:h-full'>
      {!isMd ? (
        <ButtonComponent onClick={() => setShouldUserInfoDisplay((prev) => !prev)}>
          User info
        </ButtonComponent>
      ) : null}
      <div
        className={`md:sticky md:top-[6vh]  w-full overflow-hidden transition-full duration-300 ${
          shouldUserInfoDisplay ? 'max-h-[50rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* <AvatarContainer /> */}
        {isMd ? <h1>User info</h1> : null}
        <AvatarContainer />
        <ProfileInfo />
        <PasswordUpdateRequestContainer />
        <SignOutContainer />
        <DeactivateRequestContainer />
      </div>
    </div>
  );
};

export default UserInfoSection;
