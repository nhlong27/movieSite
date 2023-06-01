import React from 'react';
import ProfileInfo from './ProfileInfo';
import AvatarContainer from './AvatarContainer';
import PasswordUpdateRequestContainer from './PasswordUpdateRequestContainer';
import { SignOutContainer } from '@/features/authentication';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { iconHelper } from '@/config/icons';
import DeactivateModalComponent from '@/components/generic/modals/DeactivateModalBody';
import { imageHelper } from '@/config/images';
import Modal from '@/components/generic/modals/Modal';
import DeactivateModalBody from '@/components/generic/modals/DeactivateModalBody';

const UserInfoSection = () => {
  const [shouldUserInfoDisplay, setShouldUserInfoDisplay] = React.useState(true);
  const [animationParentRef] = useAutoAnimate();
  const [shouldDeactivateModalDisplay, setShouldDeactivateModalDisplay] = React.useState(false);
  return (
    <div
      ref={animationParentRef}
      className={`order-first  col-start-1 lg:col-start-4   h-full bg-slate-50 dark:bg-transparent rounded-xl shadow-xl py-4 font-poppins z-20 w-3/4 mx-auto lg:w-full ${shouldUserInfoDisplay ? '' : 'bg-gradient-to-t from-transparent via-stone-900 to-stone-900'}`}
    >
      <ButtonComponent
        className={`ml-0 flex items-center gap-2 w-full uppercase text-xl font-black tracking-[0.1rem]  py-2 px-4 border-b-2 border-slate-200 dark:border-yellow-500 grow ${!shouldUserInfoDisplay ? 'dark:text-yellow-500 text-white' : 'dark:text-yellow-300 text-slate-900'}`}
        onClick={() => setShouldUserInfoDisplay((prev) => !prev)}
      >
        {iconHelper.setting('text-3xl')}
        Account settings
      </ButtonComponent>

      {!shouldUserInfoDisplay && (
      <div className=' bg-slate-900 w-full hidden lg:flex overflow-hidden grow'>
          <img src={imageHelper.background2} alt='background' className='object-cover' />
        </div>
      )}

      {shouldUserInfoDisplay ? (
        <div
          className={`md:sticky md:top-[6vh] w-full overflow-hidden transition-full duration-300 bg-transparent`}
        >
          <AvatarContainer />
          <div className='w-full dark:border-none border-b-2 border-slate-200'></div>
          <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins py-4 px-4'>
            <h1 className='w-11/12 text-slate-900 tracking-wide text-lg font-bold flex py-2 dark:text-yellow-500'>
              Profile Info
            </h1>
            <p className='w-11/12 text-slate-600 text-sm dark:text-white py-2'>
              Here you can edit public information about yourself.
            </p>
            <ProfileInfo />
          </div>
          <div className='w-full dark:border-none border-b-2 border-slate-200'></div>
          <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins py-4 px-4'>
            <h1 className='w-11/12 text-slate-900 tracking-wide text-base font-bold flex py-2 dark:text-yellow-400'>
              Change Password
            </h1>
            <p className='w-11/12 text-slate-600 text-sm dark:text-white'>
              Confirm your old password to add a new one.
            </p>
            <PasswordUpdateRequestContainer />
          </div>
          <div className='w-full border-b-2 border-slate-200 dark:border-yellow-500'></div>
          <div className='w-full pr-4 flex items-center font-poppins py-4 dark:bg-transparent shadow-inner'>
            <SignOutContainer />
          </div>
          <div className='w-full dark:border-none border-b-2 border-slate-200'></div>

          <div className='w-full font-poppins grow  dark:bg-transparent'>
            <ButtonComponent
              onClick={() => setShouldDeactivateModalDisplay(true)}
              className='w-full grow tracking-wide text-xl font-bold py-2'
            >
              <div  className='flex gap-2 md:flex-col items-center px-2 py-2 uppercase text-slate-900  hover:text-red-600 text-sm dark:text-stone-500'>
                <span className='flex gap-2 items-center'>
                  {iconHelper.exclamation('text-xl')}
                  Danger ! ! !
                </span>
                <span className='capitalize'>Deactivate Account</span>
              </div>
            </ButtonComponent>
            <Modal open={shouldDeactivateModalDisplay} onRequestClose={() => setShouldDeactivateModalDisplay(false)}>
              <DeactivateModalBody cancelFunction={setShouldDeactivateModalDisplay} />
            </Modal>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfoSection;
