import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import FormComponent from '@/components/generic/FormComponent';
import { useGetUserQuery } from '../../hooks/useGetUserQuery';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';
import { UserInfoUpdateForm, UserUpdateResponse } from '../../types';
import Wrapper from '@/components/handling/Wrapper';

const ProfileInfo = () => {
  const updateUserMutation = useUpdateUserMutation();

  const { data: profileInfo } = useGetUserQuery();

  return (
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
  );
};

export default () => (
  <Wrapper>
    <ProfileInfo />
  </Wrapper>
);
