import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SignUpForm, SignUpResponse } from '../types';
import { useSignUpMutation } from '../hooks/useSignUpMutation';
import FormComponent from '@/components/FormComponent';

const SignUpContainer = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<SignUpFormType>({
  //   resolver: zodResolver(SignUpForm),
  // });

  const signUpMutation = useSignUpMutation();

  return (
    <div className='ring-2 ring-black p-4'>
      <Toaster />
      <FormComponent
        schema={SignUpForm as any}
        submitFn={(formInputs: any) =>
          signUpMutation.mutate(formInputs, {
            onError: (e: any) => {
              console.log(e);
              toast(e.message + '. ' + e.response.data);
            },
            onSuccess: (response) => {
              try {
                SignUpResponse.parse(response.data);
                console.log('Sign up success!');
              } catch (e: any) {
                console.log(e);
                toast('Server error. Please retry.');
              }
            },
          })
        }
        options={[
          { extras: { type: 'text' }, name: 'name' },
          { extras: { type: 'text' }, name: 'email' },
          { extras: { type: 'password' }, name: 'password' },
          { extras: { type: 'password' }, name: 'passwordConfirmation' },
        ]}
      />
    </div>
    // <div className='ring-2 ring-black p-4 mb-4'>
    //   <Toaster />

    //   <form
    //     onSubmit={handleSubmit((formInputs) =>
    //       signUpMutation.mutate(formInputs, {
    //         onError: (e: any) => {
    //           console.log(e);
    //           toast(e.message + '. ' + e.response.data);
    //         },
    //         onSuccess: (response) => {
    //           try {
    //             SignUpResponse.parse(response.data)
    //             console.log("Sign up success!")
    //           }
    //           catch(e:any){
    //             console.log(e);
    //             toast('Server error. Please retry.')
    //           }
    //         },
    //       }),
    //     )}
    //   >
    //     <input {...register('name')} />
    //     {errors.name?.message && <p>{errors.name?.message}</p>}
    //     <input type='text' {...register('email')} />
    //     {errors.email?.message && <p>{errors.email?.message}</p>}
    //     <input type='password' {...register('password')} />
    //     {errors.password?.message && <p>{errors.password?.message}</p>}
    //     <input type='password' {...register('passwordConfirmation')} />
    //     {errors.passwordConfirmation?.message && <p>{errors.passwordConfirmation?.message}</p>}
    //     <input type='submit' />
    //   </form>
    // </div>
  );
};

export default SignUpContainer;
