import { serverClient } from '@/lib/serverClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const PasswordUpdate = () => {
  const [newPassword, setNewPassword] = React.useState('');
  const [isPasswordUpdating, setIsPasswordUpdating] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (params: { confirmPassword: string; newPassword: string }) => {
      return serverClient.patch('/api/v1/user/', params, {
        params: {
          type: 'password',
        },
      });
    },
    onSuccess: (response) => {
      console.log(response.data);
      queryClient.invalidateQueries({ queryKey: ['userinfo'] });
    },
    onError: (error) => console.error(error),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        mutate({ confirmPassword, newPassword });
      }}
    >
      {!isPasswordUpdating ? (
        <button
          className='ring-2 ring-black px-2 rounded'
          onClick={() => setIsPasswordUpdating(true)}
        >
          Change password
        </button>
      ) : (
        <>
          Type old password
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />
          <br />
          New password:
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
          />
          <button onClick={() => setIsPasswordUpdating(false)}>cancel</button>
        </>
      )}
      <button type='submit'>Update</button>
    </form>
  );
};

export default PasswordUpdate;
