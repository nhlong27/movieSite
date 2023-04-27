import React, { ComponentType } from 'react';
import { FallbackProps } from 'react-error-boundary';

const ErrorComponent: ComponentType<FallbackProps> = ({ error }) => {
  return (
    <div>
      <h1>An error occurred: {error.message}</h1>
    </div>
  );
};

export default ErrorComponent;
