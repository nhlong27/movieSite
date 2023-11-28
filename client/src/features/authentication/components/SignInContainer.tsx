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
      <div className='mb-[1rem] xs:mb-[2rem] text-center md:text-[2.5rem] text-[2rem] font-black tracking-wide leading-9 text-amber-50'>
        <h1 role='sign'>Sign In to Fir Media</h1>
      </div>
      <FormComponent
        styles={{
          form: 'md:w-3/5 w-11/12  mt-4 flex flex-col justify-center items-center',
          input: 'w-full py-2 px-4 mt-2 text-stone-900 shadow-inner rounded-lg outline-none focus:ring-2 focus:ring-stone-900 bg-white text-base',
          inputName:
            'text-lg mt-8 block md:text-lg font-semibold leading-6 text-white tracking-wider flex justify-start w-full ',
          button:
            'ml-auto mt-12 py-3 px-4 rounded-lg mt-4 text-sm   bg-stone-700 dark:ring-transparent shadow-xl text-white px-4 dark:hover:text-stone-100 dark:hover:bg-stone-900 transition-full duration-200',
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
                navigate('/');
                navigate(0);
              } catch (e: any) {
                console.log(e);
                toast.error('Server error. Please retry.');
              }
            },
          })
        }
        options={[
          { extras: { type: 'text', placeholder: 'user@mail.com' }, name: 'email' },
          { extras: { type: 'password', placeholder: '********' }, name: 'password' },
        ]}
      />
      <div className=' flex justify-center items-center w-11/12 md:w-3/4 px-4 mt-10 gap-4 md:font-semibold text-center text-base text-stone-900 bg-yellow-500 py-3 rounded-md shadow-lg'>
        <h2>Not a member?</h2>
        <ButtonComponent
          className='leading-6 text-green-700 hover:text-green-600 text-lg'
          onClick={() => setShouldSignInDisplay(false)}
        >
          Create a new account
        </ButtonComponent>
      </div>
      <Link to='/' className='mt-8 text-white text-base  hover:underline  mb-16'>
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
