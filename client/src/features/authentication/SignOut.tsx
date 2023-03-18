import { serverClient } from '@/lib/serverClient';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const [isSignOut, setIsSignOut] = React.useState(false);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['SignOut'],
    queryFn: async () => {
      return (await serverClient.get('/api/v1/user/SignOut')).data;
    },
    enabled: !!isSignOut,
    onSuccess: () => {
      console.log('Client Side SignOut');
      navigate(0);
    },
    onError: (error: any) => {
      console.log(error.response);
    },
  });

  return (
    <button className='mt-4 bg-cyan-100'
      onClick={() => {
        setIsSignOut(true);
      }}
    >
      Sign out
    </button>
  );
};

export default SignOut;
