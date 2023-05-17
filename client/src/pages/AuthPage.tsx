import { imageHelper } from '@/config/images';
import { SignInContainer, SignUpContainer } from '@/features/authentication';
import React from 'react';
import '@/styles/index2.css'

const AuthPage = () => {
  const [shouldSignInDisplay, setShouldSignInDisplay] = React.useState(true);
  return (
    <div className='w-full grid grow  absolute z-0'>
      <div
        className={`screen my-auto text-white w-full flex border-2 h-[70rem] border-yellow-600 bg-yellow-500 overflow-hidden relative`}
      >
        <div
          className='screen-image'
          style={{ backgroundImage: `url(${imageHelper.forest2})` }}
        ></div>
        <div className='screen-overlay'></div>
        <div className='absolute w-full h-full flex  justify-center items-start   z-10 '>
          <div className='w-11/12 max-w-[1920px] min-w-[300px] flex flex-col md:justify-center items-center mt-[5rem]'>
            {shouldSignInDisplay ? (
              <div className=' md:mt-0 min-w-[300px] max-w-[600px] w-full md:w-1/2 h-[600px] lg:h-[550px] max-h-[700px] z-10 '>
                <SignInContainer setShouldSignInDisplay={setShouldSignInDisplay} />
              </div>
            ) : (
              <div className='mt-20 md:mt-0 min-w-[300px] max-w-[650px] md:w-3/4 w-full h-[750px] md:h-[800px] lg:h-[800px] z-10'>
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
