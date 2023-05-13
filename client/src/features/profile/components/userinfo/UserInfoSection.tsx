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
    <div className='order-first shrink p-2  col-start-1 md:col-start-4 md:h-full bg-stone-200 rounded-xl py-4 px-4 font-poppins'>
      {!isMd ? (
        <ButtonComponent
          className='ml-0 flex w-full uppercase text-2xl font-black tracking-[0.1rem] text-stone-500 py-2 border-b-2 border-stone-300'
          onClick={() => setShouldUserInfoDisplay((prev) => !prev)}
        >
          Account settings
        </ButtonComponent>
      ) : null}
      <div
        className={`md:sticky md:top-[6vh]  w-full overflow-hidden transition-full duration-300 ${
          shouldUserInfoDisplay ? 'max-h-[50rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {isMd ? <h1>User info</h1> : null}
        <AvatarContainer />
        <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins'>
          <h1 className='w-11/12 text-stone-500 tracking-wide text-xl font-normal flex py-2'>
            Profile Info
          </h1>
          <p className='w-11/12'>
            Here you can edit public information about yourself. If you signed in with Google or
            Facebook, you can't change your email and password.
          </p>
          <ProfileInfo />
          <PasswordUpdateRequestContainer />
          <SignOutContainer />
          <DeactivateRequestContainer />
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;
