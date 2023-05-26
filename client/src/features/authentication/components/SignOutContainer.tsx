import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../utils/signOutUser';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useQueryClient } from '@tanstack/react-query';
import { iconHelper } from '@/config/icons';

const SignOutContainer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <ButtonComponent
      className='ml-auto text-sm flex px-2 py-2 rounded-sm bg-stone-300 ring-2 ring-stone-500 text-stone-600  font-bold hover:bg-stone-600 hover:text-stone-200 items-center gap-2 dark:bg-yellow-500 dark:hover:ring-stone-800 dark:hover:text-stone-900'
      onClick={() => {
        signOutUser()
          .then(async (response) => {
            console.log(response);
            queryClient.invalidateQueries({ queryKey: ['shows'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            navigate(0);
          })
          .catch((e) => {
            console.log(e.message);
          });
      }}
    >
      {' '}
      {iconHelper.signOut('text-lg')}
      Sign Out
    </ButtonComponent>
  );
};

export default SignOutContainer;
