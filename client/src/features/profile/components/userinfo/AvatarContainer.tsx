import { convertToBase64 } from '@/utils/covertToBase64';
import React, { ChangeEvent, useRef } from 'react';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';
import toast, { Toaster } from 'react-hot-toast';
import { UserUpdateResponse } from '../../types';
import AvatarComponent from '@/components/generic/AvatarComponent';
import { HiOutlineUpload } from 'react-icons/hi';
import ButtonComponent from '@/components/generic/ButtonComponent';
import Wrapper from '@/components/handling/Wrapper';
import Skeleton from 'react-loading-skeleton';

const AvatarContainer = () => {
  const updateUserMutation = useUpdateUserMutation();

  const [file, setFile] = React.useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    await setFile(e.target.files[0]);

    // 🚩 do the file upload here normally...
    if (e.target.files[0]) {
      const base64 = await convertToBase64(e.target.files[0]);
      await updateUserMutation.mutate(
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
    }
  };
  const setToDefault = () => {
    updateUserMutation.mutate(
      { payload: { avatar_url: '' }, type: 'avatar' },
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
    <div className='w-full flex flex-col justify-center items-center mt-4 font-poppins'>
      <h1 className='w-11/12 text-stone-500 tracking-wide text-xl font-normal flex py-2'>Avatar</h1>
      <Wrapper
        suspenseComponent={
          <div className='rounded-full object-cover overflow-hidden'>
            <Skeleton className='h-full w-full' />
          </div>
        }
      >
        <div className='w-11/12 py-2 ring-2 ring-stone-400 grid place-items-center rounded-xl'>
          <AvatarComponent
            styles={{
              image: 'rounded-full object-cover overflow-hidden',
              height: '140px',
              width: '150px',
            }}
          />
          <div className='flex items-center gap-4 justify-center divide-stone-400 divide-x-2 pt-4'>
            <ButtonComponent
              className='flex gap-2 items-center hover:border-b-2 hover:border-stone-400'
              onClick={handleUploadClick}
            >
              <HiOutlineUpload className='text-stone-700 text-lg' /> Upload new
            </ButtonComponent>
            <input
              type='file'
              accept='.jpg,.jpeg,.png'
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <ButtonComponent
              className='hover:border-b-2 hover:border-stone-400 px-4'
              onClick={setToDefault}
            >
              Set default
            </ButtonComponent>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default AvatarContainer;
