import FormComponent from '@/components/generic/FormComponent';
import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';
import { UserPasswordUpdateForm, UserUpdateResponse } from '../../types';

const PasswordUpdateRequestContainer = () => {
  const updatePasswordMutation = useUpdateUserMutation();

  return (
    <div className='w-11/12 py-2'>
      <FormComponent
        styles={{
          form: 'bg-stone-200 gap-2 flex flex-col dark:bg-transparent',
          input: 'bg-stone-300 rounded-md py-[3px] pl-2 text-stone-400 dark:bg-stone-700 dark:text-white shadow-inner outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-500 text-base w-full',
          button:
            'ml-auto py-3 rounded-lg mt-4 text-sm bg-stone-300 ring-2 ring-stone-400 text-stone-500 hover:bg-stone-400 dark:bg-stone-600 dark:ring-transparent shadow-xl dark:text-amber-300 px-4 font-bold dark:hover:text-amber-400 dark:hover:bg-stone-700 transition-full duration-200',
          inputName:
            'font-bold text-stone-500 text-base flex items-center justify-between gap-4 pr-2 dark:text-white mt-4 font-normal',
        }}
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
                toast.error(e.message + '. ' + e.response.data);
              },
              onSuccess: (response) => {
                try {
                  UserUpdateResponse.parse(response.data);
                  toast.success('Success!');

                  console.log('Update password success!');
                } catch (e: any) {
                  console.log(e);
                  toast.error('Server error. Please retry.');
                }
              },
            },
          )
        }
        options={[
          { extras: { type: 'password' }, name: 'newPassword' },
          { extras: { type: 'password' }, name: 'confirmPassword' },
        ]}
        submitBn={'Change Password'}
      />
    </div>
  );
};

export default PasswordUpdateRequestContainer;
