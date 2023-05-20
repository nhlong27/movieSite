import { CommentSection } from '@/features/commenting';
import React from 'react';

const AboutPage = () => {
  return (
    <div className='w-5/6 max-w-[1920px] min-w-[300px] flex flex-col justify-center items-center gap-8 py-8'>
      <div className='bg-stone-200 dark:bg-stone-800 w-full min-h-screen rounded-xl'>AboutPage
      <CommentSection />
      </div>
    </div>
  );
};

export default AboutPage;
