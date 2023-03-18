import { SignIn, SignOut, SignUp } from '@/features/authentication';
import { serverClient } from '@/lib/serverClient';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
// import { SearchProto } from '@/features/searching';

const Profile = () => {
  const { data, error } = useQuery({
    queryKey: ['server-data'],
    queryFn: async () => {
      return (await serverClient.get('/api/v1/user')).data;
    },
  });

  console.log('refresh!')

  return data ? (
    <>
      <div>Profile: {data}</div>
      <SignUp />
      <SignIn />
      <SignOut />
      <br />
      <button 
        onClick={async () => {
          const result = (await serverClient.get('/api/v1/user/test')).data;
          alert(result);
        }}
      >
        Test
      </button>
    </>
  ) : error instanceof Error ? (
    <div>Error..</div>
  ) : (
    <div>Loading..</div>
  );
};

export default Profile;
