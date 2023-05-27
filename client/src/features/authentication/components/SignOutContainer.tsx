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
      className='ml-auto py-2  rounded-lg mt-4 text-sm bg-stone-300 ring-2 ring-stone-400 text-stone-500 hover:bg-stone-400 dark:bg-stone-600 dark:ring-transparent shadow-xl flex items-center gap-2 dark:text-amber-300 px-4 font-bold dark:hover:text-amber-400 dark:hover:bg-stone-700 transition-full duration-200'
      onClick={() => {
        signOutUser()
          .then(async (response) => {
            console.log(response);
            queryClient.invalidateQueries({ queryKey: ['shows'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            navigate('/');
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
