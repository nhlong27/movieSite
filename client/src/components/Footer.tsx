import { iconHelper } from '@/config/icons';
import React from 'react';

const Footer = () => {
  return (
    <footer className='w-full min-h-[10rem] grid place-items-center bg-slate-50 font-poppins text-slate-900 dark:bg-stone-900 dark:border-t-2 dark:border-yellow-600 dark:text-yellow-500'>
      <div className='h-full w-full md:w-11/12 max-w-[1920px] min-w-[300px] grid place-items-center'>
        <div className='flex flex-col justify-center items-center gap-6 min-h-[15rem] md:h-3/4 w-5/6'>
          <div className='flex flex-col md:flex-row w-1/2 gap-2'>
            {/* <a href='/about' target='_blank' className='grow flex items-center gap-2 text-base cursor-pointer'>
              {' '}
              {iconHelper.question('text-2xl')}
              About this project
            </a> */}
            <a className='text-center grow text-base hover:underline cursor-pointer' target="_blank" href='https://github.com/nhlong27/movieSite'>
              About this project
            </a>
          </div>
          <div>
            <div className='grid grid-flow-col gap-4'>
              <a className='grid place-items-center ' target="_blank" href='https://github.com/nhlong27/movieSite'>{iconHelper.github('text-4xl')}</a>
              <a className='grid place-items-center' target="_blank" href='https://www.facebook.com/profile.php?id=100027682059129'>
                {iconHelper.facebook('text-3xl')}
              </a>
              <a className='grid place-items-center' target="_blank" href='https://www.linkedin.com/in/long-nguyen-95517b250/'>
                {iconHelper.linkedin('text-4xl')}
              </a>
            </div>
          </div>
          <div className='w-5/6'>
            <p className='text-center text-sm'>Copyright © 5/2023 N.H.Long </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
