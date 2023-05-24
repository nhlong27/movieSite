import React from 'react';
import toast from 'react-hot-toast';
import { SignInForm, SignInResponse } from '../types';
import { useSignInMutation } from '../hooks/useSignInMutation';
import FormComponent from '@/components/generic/FormComponent';
import { useQueryClient } from '@tanstack/react-query';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import Wrapper from '@/components/handling/Wrapper';

const SignInContainer = ({
  setShouldSignInDisplay,
}: {
  setShouldSignInDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const signInMutation = useSignInMutation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return (
    <div className='w-full h-full p-4 flex flex-col justify-start items-center font-poppins bg-transparent'>
      <div className='mb-[1rem] xs:mb-[2rem] text-center md:text-[3rem] text-[2rem] font-black tracking-wide leading-9 text-amber-50'>
        <h1>Sign In to Fir Media</h1>
      </div>
      <FormComponent
        styles={{
          form: 'md:w-3/5 w-11/12  mt-8 flex flex-col justify-center items-center',
          input: 'w-full py-2 px-2 mt-2 text-stone-900 shadow-inner rounded-lg bg-white',
          inputName:
            'text-lg mt-8 block md:text-lg font-bold leading-6 text-stone-50 flex justify-start w-full ',
          button:
            'ml-auto flex justify-center rounded-md bg-stone-900 px-6 py-3 px-6  text-lg leading-6 text-stone-50 shadow-lg mt-8 xs:mt-16 hover:bg-yellow-500 hover:text-stone-900 font-black',
          reset: 'none',
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
      <div className=' flex justify-center items-center w-5/6 px-4 mt-10 gap-4 font-bold text-center text-base md:text-lg text-stone-900 bg-yellow-500 py-4 rounded-xl'>
        <h2>Not a member?</h2>
        <ButtonComponent
          className='font-black leading-6 text-orange-700 hover:text-orange-600 text-lg xs:text-xl'
          onClick={() => setShouldSignInDisplay(false)}
        >
          Create a new account
        </ButtonComponent>
      </div>
      <Link to='/' className='mt-8 text-white text-base xs:text-xl hover:underline  mb-16'>
        Or back to home page
      </Link>
    </div>
  );
};

export default ({
  setShouldSignInDisplay,
}: {
  setShouldSignInDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Wrapper>
    <SignInContainer setShouldSignInDisplay={setShouldSignInDisplay} />
  </Wrapper>
);
