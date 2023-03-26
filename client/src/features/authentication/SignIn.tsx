import Wrapper from '@/components/ui/Wrapper';
import { serverClient } from '@/lib/serverClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Deactivate from './Deactivate';
import toast, { Toaster } from 'react-hot-toast';

const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const queryClient = useQueryClient()

  const { mutate, data } = useMutation({
    mutationFn: (info: { email: string; password: string }) => {
      return serverClient.post('/api/v1/user/SignIn', info);
    },
      onError: (error: any) => {console.log(error)
      toast(error.message +'. '+ error.response.data)},
      onSuccess: (response) => {
        console.log(response);
        queryClient.invalidateQueries({ queryKey: ['userinfo'] });
      }, 
  });

  return (
    <div className='ring-2 ring-black p-4'>
      <Toaster />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ email, password });
        }}
      >
        Email:
        <input type='text' value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type='submit' className='bg-cyan-100'>
          Sign in
        </button>
      </form>
    {data && <Deactivate />}
    </div>
  );
};

export default () => {
  return (
    // <Wrapper>
      <SignIn />
    // </Wrapper>
  );
};
