import { convertToBase64 } from '@/utils/covertToBase64';
import React, { ChangeEvent, useRef } from 'react';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';
import toast, { Toaster } from 'react-hot-toast';
import { UserUpdateResponse } from '../../types';
import AvatarComponent from '@/components/generic/AvatarComponent';
import { HiOutlineUpload } from 'react-icons/hi';
import ButtonComponent from '@/components/generic/ButtonComponent';

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
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <AvatarComponent
        styles={{
          image: ' rounded-full object-cover overflow-hidden',
          height: '150px',
          width: '150px',
        }}
      />

      <Toaster />

      <div>
        <div>Upload a file:</div>

        {/* 👇 Our custom button to select and upload a file */}
        <button onClick={handleUploadClick}>
        <HiOutlineUpload size={25} className="text-primary" />
        {file ? `${file.name}` : 'Click to select'}</button>

        {/* 👇 Notice the `display: hidden` on the input */}
        <input type='file' ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        <ButtonComponent onClick={setToDefault}>Set Default</ButtonComponent>
      </div>

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
