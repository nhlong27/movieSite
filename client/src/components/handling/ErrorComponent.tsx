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
        'grid place-content-center place-items-center h-[10rem] w-full bg-slate-50 dark:bg-stone-900 font-poppins shadow-xl rounded-b-xl'
      }
    >
      <h1 className='text-base text-stone-900 bg-slate-200 rounded-md px-4 py-[3px] flex gap-2 items-center dark:bg-stone-800 dark:text-white'>
      {iconHelper.exclamation('text-1xl')}
        {error.message ?? 'Failed to load resources'}
      </h1>
      <ButtonComponent
        className='px-4 py-[2px] bg-primary rounded-md text-slate-800 hover:text-slate-900 text-base mt-4 hover:bg-slate-200 transition duration-300 flex gap-2 items-center dark:bg-yellow-500 dark:hover:text-stone-900 dark:hover:bg-yellow-600'
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
