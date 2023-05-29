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
          form: 'bg-slate-50 gap-2 flex flex-col dark:bg-transparent',
          input: 'bg-slate-100 rounded-md py-[3px] pl-2 text-slate-900 dark:bg-stone-700 dark:text-white shadow-inner outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-stone-500 text-base w-full',
          button:
            'ml-auto py-2 rounded-lg mt-4 text-sm bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-stone-600 dark:ring-transparent shadow-md dark:text-amber-300 px-3 font-bold dark:hover:text-amber-400 dark:hover:bg-stone-700 transition-full duration-200',
          inputName:
            'font-bold text-slate-900 text-base flex items-center justify-between gap-4 pr-2 dark:text-white mt-4 font-normal',
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
