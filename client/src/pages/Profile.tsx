import { SignIn, SignOut, SignUp } from '@/features/authentication';
import Avatar from '@/features/authentication/Avatar';
import PasswordUpdate from '@/features/authentication/PasswordUpdate';
import { serverClient } from '@/lib/serverClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
// import { SearchProto } from '@/features/searching';

const Profile = () => {
  const { data } = useQuery({
    queryKey: ['userinfo'],
    queryFn: async () => {
      return (await serverClient.get('/api/v1/user/')).data;
    },
  });
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  console.log('refresh!');

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (payload: { name: string; email: string }) => {
      return serverClient.patch('/api/v1/user/', payload, {
        params: {
          type: 'info',
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
    <>
      <SignUp />
      <SignIn />
      <SignOut />
      {data ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            mutate({
              name: name != '' ? name : data?.name,
              email: email != '' ? email : data?.setEmail,
            });
          }}
        >
          Name:
          <input
            type='text'
            value={name}
            placeholder={data?.name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          Email:
          <input
            type='text'
            placeholder={data?.email}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
          <button type='submit'>Update</button>
        </form>
      ) : null}
      <Avatar />
      <PasswordUpdate />
    </>
  );
};

export default Profile;
