import { convertToBase64 } from '@/utils/covertToBase64';
import React, { ChangeEvent, useRef } from 'react';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';
import toast from 'react-hot-toast';
import { UserUpdateResponse } from '../../types';
import AvatarComponent from '@/components/generic/AvatarComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import Wrapper from '@/components/handling/Wrapper';
import Skeleton from 'react-loading-skeleton';
import { iconHelper } from '@/config/icons';

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
            toast.error(e.message + '. ' + e.response.data);
          },
          onSuccess: (response) => {
            try {
              UserUpdateResponse.parse(response.data);
              toast.success('Success!');
              console.log('Update avatar success!');
            } catch (e: any) {
              console.log(e);
              toast.error('Server error. Please retry.');
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
          toast.error(e.message + '. ' + e.response.data);
        },
        onSuccess: (response) => {
          try {
            UserUpdateResponse.parse(response.data);
            toast.success('Success!');
            console.log('Update avatar success!');
          } catch (e: any) {
            console.log(e);
            toast.error('Server error. Please retry.');
          }
        },
      },
    );
  };

  return (
    <div className='w-full flex flex-col justify-center items-center font-poppins px-4 py-4'>
      <h1 className='w-11/12 text-stone-500 tracking-wide text-lg flex py-2 font-bold dark:text-stone-900'>Avatar</h1>
      <Wrapper
        suspenseComponent={
          <div className='rounded-full object-cover overflow-hidden'>
            <Skeleton className='h-full w-full' />
          </div>
        }
      >
        <div className='w-full py-2 ring-2 ring-stone-400 grid place-items-center rounded-xl dark:ring-stone-800 bg-stone-300 dark:bg-yellow-600'>
          <AvatarComponent
            styles={{
              image: 'rounded-full object-cover overflow-hidden',
              height: '140px',
              width: '150px',
            }}
          />
          <div className='flex items-center gap-4 justify-center divide-stone-400 divide-x-2 pt-4 h-[3rem] dark:divide-stone-800 px-4 text-sm'>
            <ButtonComponent
              className='flex gap-2 items-center hover:border-b-2 justify-center hover:border-stone-400 dark:hover:border-stone-800'
              onClick={handleUploadClick}
            >
              {iconHelper.upload('text-stone-700 text-xl')}
              Upload new
            </ButtonComponent>
            <input
              type='file'
              accept='.jpg,.jpeg,.png'
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <ButtonComponent
              className='hover:border-b-2 hover:border-stone-400 dark:hover:border-stone-800 px-4'
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
