import FormComponent from '@/components/generic/FormComponent';
import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';
import { UserPasswordUpdateForm, UserUpdateResponse } from '../../types';

const PasswordUpdateRequestContainer = () => {
  const updatePasswordMutation = useUpdateUserMutation();

  return (
    <div>
      <Toaster />
      <FormComponent
        schema={UserPasswordUpdateForm as any}
        submitFn={(formInputs: any) =>
          updatePasswordMutation.mutate(
            {
              payload: {
                confirmPassword: formInputs.confirmPassword,
                newPassword: formInputs.newPassword,
              },
              type: 'password',
            },
            {
              onError: (e: any) => {
                console.log(e);
                toast(e.message + '. ' + e.response.data);
              },
              onSuccess: (response) => {
                try {
                  UserUpdateResponse.parse(response.data);
                  console.log('Update password success!');
                } catch (e: any) {
                  console.log(e);
                  toast('Server error. Please retry.');
                }
              },
            },
          )
        }
        options={[
          { extras: { type: 'password' }, name: 'confirmPassword' },
          { extras: { type: 'password' }, name: 'newPassword' },
        ]}
        submitBn={'Update'}
      />
    </div>
  );
};

export default PasswordUpdateRequestContainer;
