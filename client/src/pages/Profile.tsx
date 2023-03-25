import { SignIn, SignOut, SignUp } from '@/features/authentication';
import Avatar from '@/features/authentication/Avatar';
import { serverClient } from '@/lib/serverClient';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import { SearchProto } from '@/features/searching';

const Profile = () => {

  console.log('refresh!')

  return  (
    <>
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
      <br/>
      <Avatar />
    </>
  ) 
};

export default Profile;
