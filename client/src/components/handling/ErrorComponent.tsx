import React, { ComponentType } from 'react';
import { FallbackProps } from 'react-error-boundary';
import ButtonComponent from '../generic/ButtonComponent';
interface ErrorComponentProps extends FallbackProps {
  errorConfigs?: Record<string, any>;
}
const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {
  const { errorConfigs, error } = props;
  return (
    <div className={errorConfigs?.styles?.wrapper ?? 'grid place-items-center h-[10rem] w-full'}>
      <h1>{error.message ?? 'Failed to load resources'}</h1>
      <ButtonComponent
        onClick={() => {
          console.log('reloading the page..');
          window.location.reload();
        }}
      >
        Reload
      </ButtonComponent>
      {/* <h1>An error occurred: {error.message}</h1> */}
    </div>
  );
};

export default ErrorComponent;
