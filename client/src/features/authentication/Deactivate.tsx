import { serverClient } from '@/lib/serverClient';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Deactivate = () => {
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate()
  const { mutate, data } = useMutation({
    mutationFn: (confirmationPassword: string) => {
      return serverClient.post('/api/v1/user/deactivate', confirmationPassword);
    },
    onSuccess: () => {
      console.log('Client Side SignOut');
      navigate(0);
    },
  });
  return (
    <div>
      Confirm your password
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          mutate(password);
        }}
        className='ring-2 ring-black bg-red-300 p-4'
        disabled={!password}
      >
        Deactivate
      </button>
      <pre>{JSON.stringify(data, null, '\t')}</pre>
    </div>
  );
};

export default Deactivate;
