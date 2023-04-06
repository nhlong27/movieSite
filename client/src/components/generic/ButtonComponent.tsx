import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
    }

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  const { children, role } = props;
  return role === 'update' ? (
    <button className='text-blue-500 ' {...props}>
      {children}
    </button>
  ) : role === 'delete' ? (
    <button className='text-red-500 ' {...props}>
      {children}
    </button>
  ) : (
    <button {...props}>{children}</button>
  );
};

export default ButtonComponent