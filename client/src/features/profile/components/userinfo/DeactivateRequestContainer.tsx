import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDeactivateUserMutation } from '../../hooks/useDeactivateUserMutation';
import { UserDeactivateForm } from '../../types';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Wrapper from '@/components/handling/Wrapper';
import { iconHelper } from '@/config/icons';

const DeactivateRequestContainer = ({
  cancelFunction,
}: {
  cancelFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const deactivateUserMutation = useDeactivateUserMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UserDeactivateForm),
    defaultValues: {
      password: '',
    },
  });
  return (
    <div className='w-full font-poppins text-lg flex flex-col items-center mt-4'>
      <p className='dark:text-yellow-50 text-xl'>Type in your password to deactivate.</p>
      <form
        className='w-full flex flex-col'
        onSubmit={handleSubmit((formInputs) =>
          deactivateUserMutation.mutate(formInputs.password, {
            onError: (e: any) => {
              console.log(e);
              toast.error(e.message + '. ' + e.response.data);
            },
            onSuccess: (response) => {
              try {
                toast.success('Success! Deactivating now');
                console.log(response.data);
                console.log('Deactivated user.');
                navigate('/');
              } catch (e: any) {
                console.log(e);
                toast.error('Server error. Please retry.');
              }
            },
          }),
        )}
      >
        <input
          className='rounded-md pl-2 py-2 mx-auto w-[20rem] ring-2 ring-stone-700 my-4 dark:bg-stone-700 dark:bg-opacity-75  dark:text-stone-50 dark:ring-transparent'
          type='password'
          {...register(`password` as never)}
        />
        {(errors as any)[`password`]?.message && (
          <div className={`flex items-center gap-2 text-red-600 mx-auto`}>
            {iconHelper.exclamation('text-3xl')}
            {(errors as any)[`password`]?.message}
          </div>
        )}

        <div className='bg-stone-300 px-4 py-4 sm:py-6 mt-4 gap-4 flex flex-col sm:flex-row sm:gap-0 sm:px-8 w-full grow dark:bg-yellow-500'>
          <ButtonComponent
            onClick={() => cancelFunction(false)}
            type='button'
            className='ml-auto mt-3 inline-flex w-full justify-center rounded-md bg-stone-100 px-6 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-stone-50 sm:mt-0 sm:w-auto dark:bg-yellow-600 dark:ring-yellow-700 dark:hover:bg-yellow-700'
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            type='submit'
            className='inline-flex w-full justify-center rounded-md bg-red-600 px-6 py-2 text-base tracking-wider font-semibold text-stone-100 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
          >
            Deactivate
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
};

export default ({
  cancelFunction,
}: {
  cancelFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Wrapper>
    <DeactivateRequestContainer cancelFunction={cancelFunction} />
  </Wrapper>
);
