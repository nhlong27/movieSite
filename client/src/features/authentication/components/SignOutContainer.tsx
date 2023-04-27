import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../utils/signOutUser';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useQueryClient } from '@tanstack/react-query';

const SignOutContainer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <ButtonComponent
      className='mt-4 bg-cyan-100'
      onClick={() => {
        signOutUser()
          .then(async (response) => {
            console.log(response);
            queryClient.invalidateQueries({ queryKey: ['shows'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            navigate(0)
            // setTimeout(()=>navigate('/'), 1000);
          })
          .catch((e) => {
            console.log(e.message);
          });
      }}
    >
      Sign Out
    </ButtonComponent>
  );
};

export default SignOutContainer;
