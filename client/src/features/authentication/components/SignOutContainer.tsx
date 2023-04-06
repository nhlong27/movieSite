import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../utils/signOutUser';
import ButtonComponent from '@/components/generic/ButtonComponent';

const SignOutContainer = () => {
  const navigate = useNavigate();

  return (
    <ButtonComponent
      className='mt-4 bg-cyan-100'
      onClick={() => {
        signOutUser()
          .then((response) => {
            console.log(response);
            navigate(0);
          })
          .catch((e) => {
            console.log(e.message);
          });
      }}
    >
      Sign out
    </ButtonComponent>
  );
};

export default SignOutContainer;
