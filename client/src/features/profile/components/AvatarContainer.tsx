import { convertToBase64 } from '@/utils/covertToBase64';
import React from 'react';
import { useUpdateUserMutation } from '../hooks/useUpdateUserMutation';
import toast, { Toaster } from 'react-hot-toast';
import { UserUpdateResponse } from '../types';
import { useGetUserQuery } from '../hooks/useGetUserQuery';
import { useForm } from 'react-hook-form';

const AvatarContainer = () => {
  const updateUserMutation = useUpdateUserMutation();
  const { data: profileAvatar } = useGetUserQuery();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const file = data.image[0];
    const base64 = await convertToBase64(file);
    return updateUserMutation.mutate(
      { payload: { avatar_url: base64 as string }, type: 'avatar' },
      {
        onError: (e: any) => {
          console.log(e);
          toast(e.message + '. ' + e.response.data);
        },
        onSuccess: (response) => {
          try {
            UserUpdateResponse.parse(response.data);
            console.log('Update avatar success!');
          } catch (e: any) {
            console.log(e);
            toast('Server error. Please retry.');
          }
        },
      },
    );
  };

  return (
    <div>
      {profileAvatar ? (
        <img src={`${profileAvatar?.avatar}`} alt='?' className='h-40 w-28' />
      ) : null}
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('image')} type='file' />
        <button type='submit'>Upload</button>
      </form>
      {/* <FormComponent
        schema={UserAvatarUpdateForm}
        submitFn={(formInputs: any) =>{
          console.log(formInputs)
          return 1
          return (async (formInputs) => {
            const newFormInputs = (await convertToBase64(formInputs.image[0])) as string;
            console.log(newFormInputs)
            return updateUserMutation.mutate(
              { payload: { avatar_url: newFormInputs }, type: 'avatar' },
              {
                onError: (e: any) => {
                  console.log(e);
                  toast(e.message + '. ' + e.response.data);
                },
                onSuccess: (response) => {
                  try {
                    UserUpdateResponse.parse(response.data);
                    console.log('Update avatar success!');
                  } catch (e: any) {
                    console.log(e);
                    toast('Server error. Please retry.');
                  }
                },
              },
            );
          })(formInputs)
        }
        }
        submitBn={'Upload'}
        options={[{ extras: { type: 'file', accept:'.jpeg, .png, .jpg' }, name: 'image' }]}
      /> */}
    </div>
  );
};

export default AvatarContainer;
