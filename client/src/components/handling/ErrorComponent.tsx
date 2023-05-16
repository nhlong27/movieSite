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
        'grid place-content-center place-items-center h-[10rem] w-full bg-stone-200 font-poppins shadow-xl rounded-b-xl'
      }
    >
      <h1 className='text-red-700 text-xl font-bold'>
        {error.message ?? 'Failed to load resources'}
      </h1>
      <ButtonComponent
        className='px-8 py-2 bg-primary rounded-md text-stone-700 text-xl mt-8 hover:bg-yellow-200  transition duration-300 flex gap-2 items-center'
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
