import React from 'react';
import DeactivateRequestContainer from '@/features/profile/components/userinfo/DeactivateRequestContainer';

const DeactivateModalComponent = ({
  cancelFunction,
}: {
  cancelFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className='relative font-poppins z-30'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-stone-700 dark:bg-stone-900 dark:bg-opacity-75  bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto '>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 '>
          <div className='relative transform overflow-hidden rounded-lg bg-stone-200  text-left shadow-sm transition-all sm:my-8 sm:w-full sm:max-w-lg dark:bg-stone-900 dark:shadow-yellow-500 shadow-stone-50'>
            <div className='bg-stone-200 px-4 pb-4 pt-5 sm:p-8 sm:pr-8 sm:pl-8 sm:pb-4 dark:bg-stone-900'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-rose-300 sm:mx-0 sm:h-10 sm:w-10'>
                  <svg
                    className='h-8 w-8 text-red-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <h3
                    className='text-2xl font-semibold leading-6 text-stone-900 tracking-[0.1rem] dark:text-rose-400'
                    id='modal-title'
                  >
                    Deactivate account
                  </h3>
                  <div className='mt-8'>
                    <p className='text-lg text-stone-900 dark:text-yellow-50'>
                      Are you sure you want to deactivate your account? All of your data will be
                      permanently removed. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DeactivateRequestContainer cancelFunction={cancelFunction} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateModalComponent;
