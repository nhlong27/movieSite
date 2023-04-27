import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SignInForm, SignInResponse } from '../types';
import { useSignInMutation } from '../hooks/useSignInMutation';
import FormComponent from '@/components/generic/FormComponent';
import { useQueryClient } from '@tanstack/react-query';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';

const SignInContainer = ({
  setShouldSignInDisplay,
}: {
  setShouldSignInDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const signInMutation = useSignInMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  return (
    <div className='w-full h-full p-4 flex flex-col justify-start items-center'>
      <div className='flex flex-col justify-center items-center'>
        <h1>Sign In To Dawn Break</h1>
        <p>Or use your email account</p>
      </div>
      <FormComponent
        styles={{
          form: 'w-full mt-4 flex flex-col justify-center items-center',
          input: 'w-4/5 mt-4',
          button: 'rounded-xl px-4 py-2 my-4',
        }}
        submitBn='Sign In'
        schema={SignInForm}
        submitFn={(formInputs: any) =>
          signInMutation.mutate(formInputs, {
            onError: (e: any) => {
              console.log(e);
              toast(e.message + '. ' + e.response.data);
            },
            onSuccess: async (response) => {
              try {
                SignInResponse.parse(response.data);
                console.log('Sign in success!');
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                queryClient.invalidateQueries({ queryKey: ['shows'] });
                navigate(0)
                // setTimeout(()=>navigate('/'), 1000);
              } catch (e: any) {
                console.log(e);
                toast('Server error. Please retry.');
              }
            },
          })
        }
        options={[
          { extras: { type: 'text', placeholder: 'Email' }, name: 'email' },
          { extras: { type: 'password', placeholder: 'Password' }, name: 'password' },
        ]}
      />
      <div className='mt-auto flex justify-center items-center w-full'>
        <h2>Not a member?</h2>
        <ButtonComponent className='text-blue-400' onClick={() => setShouldSignInDisplay(false)}>
          Sign Up
        </ButtonComponent>
      </div>
      <Link to='/'>Or back to home page</Link>
    </div>
  );
};

export default SignInContainer;
