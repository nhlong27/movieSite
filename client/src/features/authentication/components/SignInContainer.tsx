import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SignInForm, SignInResponse } from '../types';
import { useSignInMutation } from '../hooks/useSignInMutation';
import FormComponent from '@/components/generic/FormComponent';

const SignInContainer = () => {
  const signInMutation = useSignInMutation();

  return (
    <div className='ring-2 ring-black p-4'>
      <Toaster />
      <FormComponent
        schema={SignInForm}
        submitFn={(formInputs: any) =>
          signInMutation.mutate(formInputs, {
            onError: (e: any) => {
              console.log(e);
              toast(e.message + '. ' + e.response.data);
            },
            onSuccess: (response) => {
              try {
                SignInResponse.parse(response.data);
                console.log('Sign in success!');
              } catch (e: any) {
                console.log(e);
                toast('Server error. Please retry.');
              }
            },
          })
        }
        options={[
          { extras: { type: 'text' }, name: 'email' },
          { extras: { type: 'password' }, name: 'password' },
        ]}
      />
    </div>
  );
};

export default SignInContainer;
