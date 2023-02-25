import { serverClient } from '@/lib/serverClient';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import { SearchProto } from '@/features/searching';

const Profile = () => {
  const { data, error } = useQuery({
    queryKey: ['server-data'],
    queryFn: async () => {
      return (await serverClient.get('/profile')).data;
    },
  });
  return data ? (
    <>Profile: {data}</>
  ) : error instanceof Error ? (
    <div>Error..</div>
  ) : (
    <div>Loading..</div>
  );
};

export default Profile;
