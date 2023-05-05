import { UserInfoSection, UserListSection } from '@/features/profile';
import React from 'react';

const ProfilePage = () => {
  return (
    <div className='w-11/12 max-w-[1920px] min-w-[300px] flex flex-col min-h-screen'>
    <div className='md:grid md:grid-cols-4 flex flex-col gap-2 min-h-screen'>
      <UserListSection />
      <UserInfoSection />
    </div>
    </div>
  );
};

export default ProfilePage;
