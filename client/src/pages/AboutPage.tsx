import { CommentSection } from '@/features/commenting';
import React from 'react';

const AboutPage = () => {
  return (
    <div className='w-5/6 max-w-[1920px] min-w-[300px] flex flex-col justify-center items-center gap-8 font-poppins py-8'>
      <div className='bg-stone-100 dark:bg-stone-700 w-full min-h-screen rounded-xl text-center pt-4 shadow-md dark:shadow-yellow-800 px-2'>
        <span className='font-black tracking-wider text-2xl dark:text-amber-400'>About This Project</span>
        <CommentSection />
      </div>
    </div>
  );
};

export default AboutPage;
