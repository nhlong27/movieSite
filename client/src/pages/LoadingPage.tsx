import LoaderSpinnerComponent from '@/components/generic/LoaderSpinnerComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import React from 'react';


const LoadingPage= () => {
  const { isMd } = useMediaQueries();
  return (
    <>
      {isMd ? (
        <div className='bg-black min-h-screen flex flex-col justify-center items-center w-full'>
          <div>
            <LoaderSpinnerComponent />
          </div>
        </div>
      ) : (
        <div className='bg-black min-h-screen flex flex-col justify-start items-center w-full '>
          <div className='mt-20'>
            <LoaderSpinnerComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingPage;
