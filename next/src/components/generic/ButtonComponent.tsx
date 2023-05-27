import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {}

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  const { children } = props;
  return <button {...props}>{children}</button>;
};

export default ButtonComponent;
