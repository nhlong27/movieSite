import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import ButtonComponent from '../generic/ButtonComponent';
import { iconHelper } from '@/config/icons';

interface ErrorComponentProps extends FallbackProps {
  errorConfigs?: Record<string, any>;
}

const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
  const { errorConfigs, error } = props;
  return (
    <div
      className={
        errorConfigs?.styles?.wrapper ??
        'grid place-content-center place-items-center h-[10rem] w-full bg-stone-200 dark:bg-stone-900 font-poppins shadow-xl rounded-b-xl'
      }
    >
      <h1 className='text-base ring-stone-600 ring-2 text-stone-900 bg-stone-400 rounded-xl px-8 py-2 font-semibold flex gap-2 items-center dark:bg-yellow-50 '>
      {iconHelper.exclamation('text-2xl')}
        {error.message ?? 'Failed to load resources'}
      </h1>
      <ButtonComponent
        className='px-4 py-[2px] bg-primary rounded-md text-stone-900 text-lg mt-4 hover:bg-yellow-200  transition duration-300 flex gap-2 items-center dark:bg-yellow-500 font-black dark:hover:bg-stone-900 dark:hover:text-yellow-500 dark:hover:ring-2 dark:hover:ring-yellow-500'
        onClick={() => {
          console.log('reloading the page..');
          window.location.reload();
        }}
      >
        {iconHelper.reload('text-lg')}
        Reload
      </ButtonComponent>
    </div>
  );
};

export default ErrorComponent;
