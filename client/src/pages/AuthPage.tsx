import { imageHelper } from '@/config/images';
import { SignInContainer, SignUpContainer } from '@/features/authentication';
import React from 'react';
import '@/styles/index2.css'

const AuthPage = () => {
  const [shouldSignInDisplay, setShouldSignInDisplay] = React.useState(true);
  return (
    <div className='w-full max-w-[1920px] min-w-[300px]  min-h-screen flex relative top-0 bottom-0 z-0 grow'>
      <div
        className={`screen text-white grid place-items-center border-2 grow border-yellow-600 bg-yellow-500 relative`}
      >
        <div
          className='screen-image'
          style={{ backgroundImage: `url(${imageHelper.forest2})` }}
        ></div>
        <div className='screen-overlay'></div>
        <div className='w-full h-full flex justify-center items-start z-10'>
          <div className='w-11/12 max-w-[1920px] min-w-[300px] h-auto flex flex-col md:justify-center items-center mt-[5rem]'>
            {shouldSignInDisplay ? (
              <div className=' min-w-[300px] max-w-[600px] w-full md:w-3/4 z-10 '>
                <SignInContainer setShouldSignInDisplay={setShouldSignInDisplay} />
              </div>
            ) : (
              <div className=' min-w-[300px] max-w-[600px] w-full md:w-3/4  z-10 '>
                <SignUpContainer setShouldSignInDisplay={setShouldSignInDisplay} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
