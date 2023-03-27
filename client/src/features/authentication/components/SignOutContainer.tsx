import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../utils/signOutUser';

const SignOutContainer = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
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
      </button>
    </>
  );
};

export default SignOutContainer;
