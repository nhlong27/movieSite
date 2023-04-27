import { SignInContainer, SignUpContainer } from '@/features/authentication';
import React from 'react';

const AuthPage = () => {
  const [shouldSignInDisplay, setShouldSignInDisplay] = React.useState(true);
  return (
    <div className='w-11/12 max-w-[1920px] min-w-[300px] flex flex-col md:justify-center items-center min-h-screen'>
      <div className='mt-20 md:mt-0 min-w-[300px] max-w-[600px] w-1/2 h-[400px] lg:h-[500px] max-h-[700px]'>
        {shouldSignInDisplay ? <SignInContainer setShouldSignInDisplay={setShouldSignInDisplay} /> : <SignUpContainer setShouldSignInDisplay={setShouldSignInDisplay} />}
      </div>
    </div>
  );
};

export default AuthPage;
