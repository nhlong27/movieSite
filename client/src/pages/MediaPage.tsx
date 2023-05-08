import { MediaContainer } from '@/features/watching';
import React from 'react';

const MediaPage = () => {
  return (
    <div className='relative w-full max-w-[1920px] min-w-[300px] flex min-h-screen justify-center items-center'>
      <MediaContainer />
    </div>
  );
};

export default MediaPage
