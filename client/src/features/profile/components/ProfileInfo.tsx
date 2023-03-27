import React from 'react';
import { UserInfoUpdateForm, UserUpdateResponse } from '../types';
import toast, { Toaster } from 'react-hot-toast';
import { useUpdateUserMutation } from '../hooks/useUpdateUserMutation';
import FormComponent from '@/components/FormComponent';
import { useUserQuery } from '../hooks/useUserQuery';

const ProfileInfo = () => {
  const updateUserMutation = useUpdateUserMutation();

  const { data: profileInfo } = useUserQuery();

  return profileInfo ? (
    <div>
      <Toaster />
      <FormComponent
        schema={UserInfoUpdateForm}
        submitFn={(formInputs: any) =>
          updateUserMutation.mutate(
            { payload: formInputs, type: 'info' },
            {
              onError: (e: any) => {
                console.log(e);
                toast(e.message + '. ' + e.response.data);
              },
              onSuccess: (response) => {
                try {
                  UserUpdateResponse.parse(response.data);
                  console.log('Update info success!');
                } catch (e: any) {
                  console.log(e);
                  toast('Server error. Please retry.');
                }
              },
            },
          )
        }
        options={[
          { extras: { type: 'text' }, name: 'name', default: profileInfo?.name },
          { extras: { type: 'text' }, name: 'email', default: profileInfo?.email },
        ]}
      />
    </div>
  ) : null
};

export default ProfileInfo;
