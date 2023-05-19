import React from 'react';
import ProfileInfo from './ProfileInfo';
import AvatarContainer from './AvatarContainer';
import PasswordUpdateRequestContainer from './PasswordUpdateRequestContainer';
import { SignOutContainer } from '@/features/authentication';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { iconHelper } from '@/config/icons';
import DeactivateModalComponent from '@/components/generic/modals/DeactivateModalComponent';
import { imageHelper } from '@/config/images';

const UserInfoSection = () => {
  const [shouldUserInfoDisplay, setShouldUserInfoDisplay] = React.useState(true);
  const [animationParentRef] = useAutoAnimate();
  const [shouldDeactivateModalDisplay, setShouldDeactivateModalDisplay] = React.useState(false);
  return (
    <div
      ref={animationParentRef}
      className={`order-first  col-start-1 md:col-start-4   h-full bg-stone-200 dark:bg-amber-300 rounded-xl shadow-xl py-4 font-poppins z-20 ${shouldUserInfoDisplay ? '' : 'bg-gradient-to-t from-transparent via-stone-900 to-stone-900'}`}
    >
      <ButtonComponent
        className={`ml-0 flex items-center gap-2 w-full uppercase text-2xl font-black tracking-[0.1rem] text-stone-500 py-2 px-4  border-b-2 border-stone-300 dark:border-stone-800  grow ${!shouldUserInfoDisplay ? 'dark:text-yellow-500' : 'dark:text-stone-900'}`}
        onClick={() => setShouldUserInfoDisplay((prev) => !prev)}
      >
        {iconHelper.setting('text-3xl')}
        Account settings
      </ButtonComponent>

      {!shouldUserInfoDisplay && (
        <div className=' bg-stone-900 w-full overflow-hidden grow'>
          <img src={imageHelper.background2} alt='background' className='object-cover' />
        </div>
      )}

      {shouldUserInfoDisplay ? (
        <div
          className={`md:sticky md:top-[6vh]  w-full overflow-hidden transition-full duration-300 dark:bg-amber-400`}
        >
          <AvatarContainer />
          <div className='w-full dark:border-stone-500 border-b-2 border-stone-300'></div>
          <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins py-4 px-4'>
            <h1 className='w-11/12 text-stone-500 tracking-wide text-xl font-bold flex py-2 dark:text-stone-900'>
              Profile Info
            </h1>
            <p className='w-11/12 text-stone-400 text-base dark:text-stone-900'>
              Here you can edit public information about yourself.
            </p>
            <ProfileInfo />
          </div>
          <div className='w-full dark:border-stone-500 border-b-2 border-stone-300'></div>
          <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins py-4'>
            <h1 className='w-11/12 text-stone-500 tracking-wide text-xl font-bold flex py-2 dark:text-stone-900'>
              Change Password
            </h1>
            <p className='w-11/12 text-stone-400 text-base dark:text-stone-900'>
              Confirm your old password to add a new one.
            </p>
            <PasswordUpdateRequestContainer />
          </div>
          <div className='w-full dark:border-stone-500 border-b-2 border-stone-300'></div>
          <div className='w-full pr-4 flex items-center font-poppins py-8 dark:bg-amber-500 shadow-inner'>
            <SignOutContainer />
          </div>
          <div className='w-full dark:border-stone-500 border-b-2 border-stone-300'></div>

          <div className='w-full  font-poppins grow  dark:bg-amber-400'>
            <ButtonComponent
              onClick={() => setShouldDeactivateModalDisplay(true)}
              className='w-full grow tracking-wide text-xl font-bold py-2'
            >
              <div className='flex gap-2 md:flex-col items-center px-2 py-2 uppercase text-stone-700  hover:text-red-600 text-base'>
                <span className='flex gap-2 items-center'>
                  {iconHelper.exclamation('text-3xl')}
                  Danger ! ! !
                </span>
                <span className='capitalize'>Deactivate Account</span>
              </div>
            </ButtonComponent>
            {shouldDeactivateModalDisplay ? (
              <DeactivateModalComponent cancelFunction={setShouldDeactivateModalDisplay} />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfoSection;
