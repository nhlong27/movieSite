import Wrapper from '@/components/ui/Wrapper';
import { serverClient } from '@/lib/serverClient';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { mutate, data, error } = useMutation({
    mutationFn: (info: { email: string; password: string }) => {
      return serverClient.post('/api/v1/user/SignIn', info)
    },
    useErrorBoundary: true,
    onError: (e) => {
      console.log('mutation' + e);
    },
    onSuccess: ()=>{
      console.log('Client Side SignIn');
    } // Toast?
  });

  console.log(error)
  return (
    <div className='ring-2 ring-black p-4'>
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
        <button type='submit' className='bg-cyan-100'>Sign in</button>
      </form>
      <ErrorBoundary fallback={<pre>{JSON.stringify(error, null, '\t')}</pre>}>
        {data ? <pre>{JSON.stringify(data.data, null, '\t')}</pre> : <div>Data here</div>}
      </ErrorBoundary>
    </div>
  );
};

export default ()=>{
  return <Wrapper>
    <SignIn />
  </Wrapper>
};
