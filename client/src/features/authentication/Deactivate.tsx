import { serverClient } from '@/lib/serverClient';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast';
const Deactivate = () => {
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (password: {password: string}) => {
      return serverClient.delete('/api/v1/user/', {data: {password}});
    },
    onError: (error: any) => {
      console.log(error);
      toast(error.message + '. ' + error.response.data);
    },
    onSuccess: (response) => {
      console.log(response);
      navigate(0)
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
          mutate({password});
        }}
        className='ring-2 ring-black bg-red-300 p-4'
        disabled={!password}
      >
        Deactivate
      </button>
    </div>
  );
};

export default Deactivate;
