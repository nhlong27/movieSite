import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SignUpForm, SignUpResponse } from '../types';
import { useSignUpMutation } from '../hooks/useSignUpMutation';
import FormComponent from '@/components/generic/FormComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

const SignUpContainer = ({
  setShouldSignInDisplay,
}: {
  setShouldSignInDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const signUpMutation = useSignUpMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <div className='w-full h-full p-4 flex flex-col justify-start items-center'>
      <div className='flex flex-col justify-center items-center'>
        <h1>Create an Account</h1>
        <p>Or use your email account</p>
      </div>
      <FormComponent
        styles={{
          form: 'w-full mt-4 flex flex-col justify-center items-center',
          input: 'w-4/5 mt-4',
          button: 'rounded-xl px-4 py-2 my-4',
        }}
        submitBn='Register'
        schema={SignUpForm as any}
        submitFn={(formInputs: any) =>
          signUpMutation.mutate(formInputs, {
            onError: (e: any) => {
              console.log(e);
              toast(e.message + '. ' + e.response.data);
            },
            onSuccess: async (response) => {
              try {
                SignUpResponse.parse(response.data);
                console.log('Sign up success!');
                await queryClient.invalidateQueries({ queryKey: ['profile'] });
                await queryClient.invalidateQueries({ queryKey: ['shows'] });
                navigate(0)
              } catch (e: any) {
                console.log(e);
                toast('Server error. Please retry.');
              }
            },
          })
        }
        options={[
          { extras: { type: 'text', placeholder: 'Username' }, name: 'name' },
          { extras: { type: 'text', placeholder: 'Email' }, name: 'email' },
          { extras: { type: 'password', placeholder: 'Password' }, name: 'password' },
          {
            extras: { type: 'password', placeholder: 'Confirm Password' },
            name: 'passwordConfirmation',
          },
        ]}
      />
      <div className='mt-auto flex justify-center items-center w-full'>
        <h2>Already has an account?</h2>
        <ButtonComponent className='text-blue-400' onClick={() => setShouldSignInDisplay(true)}>
          Sign In
        </ButtonComponent>
      </div>
      <Link to='/'>Or back to home page</Link>
    </div>
  );
};

export default SignUpContainer;
