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
    <div className='w-full flex flex-col justify-center items-center'>
      <Wrapper
        suspenseComponent={
          <div className='rounded-full object-cover overflow-hidden'>
            <Skeleton className='h-full w-full' />
          </div>
        }
      >
        <AvatarComponent
          styles={{
            image: 'rounded-full object-cover overflow-hidden ',
            height: '140px',
            width: '150px',
          }}
        />
      </Wrapper>

      <Toaster />

      <div>
        <div>Change your avatar</div>

        <button onClick={handleUploadClick}>
          <HiOutlineUpload size={25} className='text-primary' />
        </button>

        <input type='file' accept='.jpg,.jpeg,.png' ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        <ButtonComponent onClick={setToDefault}>Set back to default</ButtonComponent>
      </div>
    </div>
  );
};

export default AvatarContainer;
