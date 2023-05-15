import { SignInContainer, SignUpContainer } from '@/features/authentication';
import React from 'react';

const AuthPage = () => {
  const [shouldSignInDisplay, setShouldSignInDisplay] = React.useState(true);
  return (
    <div className='w-11/12 max-w-[1920px] min-w-[300px] flex flex-col md:justify-start items-center min-h-screen pt-[10rem]'>
      {shouldSignInDisplay ? (
        <div className='mt-20 md:mt-0 min-w-[300px] max-w-[600px] w-full md:w-1/2 h-[600px] lg:h-[550px] max-h-[700px]'>
          <SignInContainer setShouldSignInDisplay={setShouldSignInDisplay} />
        </div>
      ) : (
        <div className='mt-20 md:mt-0 min-w-[300px] max-w-[650px] md:w-3/4 w-full h-[750px] md:h-[800px] lg:h-[800px]'>
          <SignUpContainer setShouldSignInDisplay={setShouldSignInDisplay} />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
