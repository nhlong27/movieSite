import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoaderSpinnerComponent = ({ styles }: { styles?: Record<string, string> }) => {
  return (
    <Oval
      height={styles?.height}
      width={styles?.width}
      color={styles?.color ?? '#4fa94d'}
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor={styles?.colorSecondary ?? '#4fa94d'}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default LoaderSpinnerComponent;
