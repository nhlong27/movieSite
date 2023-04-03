import {  SignOutContainer } from '@/features/authentication';
import { DeactivateRequestContainer, ProfileInfo } from '@/features/profile';
import AvatarContainer from '@/features/profile/components/AvatarContainer';
import ShowListContainer from '@/features/profile/components/list/ShowListContainer';
import WatchingList from '@/features/profile/components/list/WatchingList';
import PasswordUpdateRequestContainer from '@/features/profile/components/PasswordUpdateRequestContainer';


import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <>
      <Link to='/auth'>To Auth</Link>
      <ProfileInfo />
      <AvatarContainer />
      <PasswordUpdateRequestContainer />
      <SignOutContainer />
      <DeactivateRequestContainer />
      <WatchingList />
      <ShowListContainer />
    </>
  );
};

export default Profile;
