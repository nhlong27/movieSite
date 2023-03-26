import { serverClient } from '@/lib/serverClient';
import { convertToBase64 } from '@/utils/covertToBase64';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const Avatar = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (file: {avatar_url: string}) => {
      return serverClient.patch(
        '/api/v1/user/',
        file,
        {
          params: {
            type:'avatar'
          }
        }
      );
    },
    onSuccess: (response) => {
      console.log(response.data);
      queryClient.invalidateQueries({ queryKey: ['userinfo'] });
    },
    onError: (error) => console.error(error),
  });

  const data = queryClient.getQueryData<{avatar:string}>(['userinfo'])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e?.target?.files?.[0];

    const base64 = await convertToBase64(file);
    mutate({avatar_url: base64 as string});
  };

  return data ? (
    <div>
      <label htmlFor='file-upload' className='custom-file-upload'>
        <img
          src={`${data?.avatar}`}
          alt='?'
          className="h-40 w-28"
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
