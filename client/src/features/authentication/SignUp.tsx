import { serverClient } from '@/lib/serverClient';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import Deactivate from './Deactivate';

const SignUp = () => {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCon, setPasswordCon] = React.useState('');
  const [email, setEmail] = React.useState('');
  const {
    mutate,
    data: userData,
    error: userError,
  } = useMutation({
    mutationFn: (newUser: {
      name: string;
      password: string;
      passwordConfirmation: string;
      email: string;
    }) => {
      return serverClient.post('/api/v1/user/SignUp', newUser);
    },
    onError: (err) => console.log(err),
    onSuccess: () => {
      console.log('Client Side SignUp');
    }, // Toast?
  });
  return (
    <div className='ring-2 ring-black p-4 mb-4'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutate({ name, password, passwordConfirmation: passwordCon, email });
        }}
      >
        Name:
        <input type='text' value={name} onChange={(e) => setName(e.currentTarget.value)} />
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        Pass Con
        <input
          type='password'
          value={passwordCon}
          onChange={(e) => setPasswordCon(e.currentTarget.value)}
        />
        Email:
        <input type='text' value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <button type='submit' className='bg-cyan-100'>
          Sign up
        </button>
        {userData ? (
          <>
            <pre>{JSON.stringify(userData?.data, null, '\t')}</pre>
            <Deactivate />
          </>
        ) : userError instanceof Error ? (
          <pre>{JSON.stringify(userError, null, '\t')}</pre>
        ) : (
          <div>Data here</div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
