import { serverClient } from '@/lib/serverClient';
import { convertToArrayBuffer, convertToBase64 } from '@/utils/covertToBase64';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const Avatar = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (file: any) => {
      return serverClient.post(
        '/api/v1/user/avatar',
        file,
        // {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // }
      );
    },
    onSuccess: (response) => {
      console.log(response.data);
      queryClient.invalidateQueries({ queryKey: ['userinfo'] });
    },
    onError: (error) => console.error(error),
  });

  const { data } = useQuery({
    queryKey: ['userinfo'],
    queryFn: async () => {
      return (await serverClient.get('/api/v1/user/')).data;
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e?.target?.files?.[0];

    let base64 = await convertToBase64(file);
    console.log(base64);
    mutate({base64});

    // const arrayBuffer = await convertToArrayBuffer(file);
    // console.log(arrayBuffer);
    // mutate({arrayBuffer});

    // mutate({imageData: file})
  };

  return data ? (
    <div>
      <label htmlFor='file-upload' className='custom-file-upload'>
        <img
          src={`${data?.avatar}`}
          alt='?'
        />
      </label>

      <input
        type='file'
        name='myFile'
        id='file-upload'
        accept='.jpeg, .png, .jpg'
        onChange={(e) => handleFileUpload(e)}
      />
    </div>
  ) : (
    <div>
      <input
        type='file'
        name='myFile'
        id='file-upload'
        accept='.jpeg, .png, .jpg'
        onChange={(e) => handleFileUpload(e)}
      />
    </div>
  );
};

export default Avatar;
