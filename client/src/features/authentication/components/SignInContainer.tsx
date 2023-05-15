import React from 'react';
import toast from 'react-hot-toast';
import { SignInForm, SignInResponse } from '../types';
import { useSignInMutation } from '../hooks/useSignInMutation';
import FormComponent from '@/components/generic/FormComponent';
import { useQueryClient } from '@tanstack/react-query';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';

const SignInContainer = ({
  setShouldSignInDisplay,
}: {
  setShouldSignInDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const signInMutation = useSignInMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <div className='w-full h-full p-4 flex flex-col justify-start items-center font-poppins bg-stone-50 rounded-xl shadow-xl'>
      <div className='mt-10 text-center text-2xl font-black tracking-wide leading-9 text-stone-900'>
        <h1 >Sign In To Dawn Break</h1>
      </div>
      <FormComponent
        styles={{
          form: 'md:w-3/5 w-11/12  mt-8 flex flex-col justify-center items-center',
          input: 'w-full py-2 px-2 mt-2 ring-2 ring-stone-300 rounded-lg',
          inputName: 'text-base mt-4 block md:text-lg font-bold leading-6 text-gray-900 flex justify-start w-full',
          button: 'ml-auto flex mt-8 justify-center rounded-md bg-blue-600 px-6 py-2 text-lg leading-6 text-stone-50 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
        }}
        submitBn='Sign In'
        schema={SignInForm}
        submitFn={(formInputs: any) =>
          signInMutation.mutate(formInputs, {
            onError: (e: any) => {
              console.log(e);
              toast.error(e.message + '. ' + e.response.data);
            },
            onSuccess: async (response) => {
              try {
                SignInResponse.parse(response.data);
                toast.success('Success!');

                console.log('Sign in success!');
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                queryClient.invalidateQueries({ queryKey: ['shows'] });
                navigate(0);
              } catch (e: any) {
                console.log(e);
                toast.error('Server error. Please retry.');
              }
            },
          })
        }
        options={[
          { extras: { type: 'text', placeholder: 'Email' }, name: 'email' },
          { extras: { type: 'password', placeholder: 'Password' }, name: 'password' },
        ]}
      />
      <div className=' flex justify-center items-center w-full mt-10 gap-4 text-center text-base md:text-xl text-stone-500'>
        <h2>Not a member?</h2>
        <ButtonComponent className='font-semibold leading-6 text-blue-500 hover:text-blue-600' onClick={() => setShouldSignInDisplay(false)}>
          Create a new account
        </ButtonComponent>
      </div>
      <Link to='/' className='mt-8 text-stone-500 hover:underline  mb-16'>Or back to home page</Link>
    </div>
  );
};

export default SignInContainer;
