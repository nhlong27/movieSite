import React from 'react';
import ProfileInfo from './ProfileInfo';
import AvatarContainer from './AvatarContainer';
import PasswordUpdateRequestContainer from './PasswordUpdateRequestContainer';
import { SignOutContainer } from '@/features/authentication';
import DeactivateRequestContainer from './DeactivateRequestContainer';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { HiOutlineExclamationCircle } from '@/config/icons';

const UserInfoSection = () => {
  const [shouldUserInfoDisplay, setShouldUserInfoDisplay] = React.useState(true);
  const { isMd } = useMediaQueries();
  const [animationParentRef] = useAutoAnimate();
  return (
    <div
      ref={animationParentRef}
      className='order-first shrink p-2 col-start-1 md:col-start-4 md:h-full bg-stone-200 rounded-xl shadow-xl py-4 px-4 font-poppins'
    >
      <ButtonComponent
        className='ml-0 flex w-full uppercase text-2xl font-black tracking-[0.1rem] text-stone-500 py-2 border-b-2 border-stone-300'
        onClick={() => setShouldUserInfoDisplay((prev) => !prev)}
      >
        Account settings
      </ButtonComponent>

      {shouldUserInfoDisplay ? (
        <div
          className={`md:sticky md:top-[6vh]  w-full overflow-hidden transition-full duration-300 `}
        >
          <AvatarContainer />
          <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins border-b-2 border-stone-300 py-4'>
            <h1 className='w-11/12 text-stone-500 tracking-wide text-xl font-bold flex py-2'>
              Profile Info
            </h1>
            <p className='w-11/12 text-stone-400 text-base'>
              Here you can edit public information about yourself.
            </p>
            <ProfileInfo />
          </div>
          <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins border-b-2 border-stone-300 py-4'>
            <h1 className='w-11/12 text-stone-500 tracking-wide text-xl font-bold flex py-2'>
              Change Password
            </h1>
            <p className='w-11/12 text-stone-400 text-base'>
              Confirm your old password to add a new one.
            </p>
            <PasswordUpdateRequestContainer />
          </div>
          <div className='w-full pr-4 flex items-center mt-4 font-poppins border-b-2 border-stone-300 py-4'>
            <SignOutContainer />
          </div>
          <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins'>
            <h1 className='w-11/12 text-red-700 tracking-wide items-center justify-center gap-4  text-xl font-bold flex py-2'>
              <div className='flex gap-2 md:flex-col items-center px-2 py-2 uppercase rounded-lg mt-4 bg-stone-300 ring-2 ring-red-500 text-red-600 text-base hover:bg-red-100'>
                <HiOutlineExclamationCircle className='text-xl' /> Danger -
                <span className='capitalize'>Deactivate Account</span>
              </div>
            </h1>
            <p className='w-11/12 text-stone-400 text-base'>
              Confirm your old password to delete your account.
            </p>
            <DeactivateRequestContainer />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfoSection;
