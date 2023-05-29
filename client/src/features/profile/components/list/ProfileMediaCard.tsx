import ButtonComponent from '@/components/generic/ButtonComponent';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteShowMutation } from '../../hooks/useDeleteShowMutation';
import { ShowQueryResponseType } from '../../types';
import SelectComponent from '@/components/generic/SelectComponent';
import { useUpdateShowMutation } from '../../hooks/useUpdateShowMutation';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { imageHelper } from '@/config/images';
import { iconHelper } from '@/config/icons';

interface ProfileMediaCardProps {
  media: ShowQueryResponseType;
}
const ProfileMediaCard: React.FC<ProfileMediaCardProps> = (props) => {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const { media } = props;

  const deleteShowMutation = useDeleteShowMutation();
  const updateShowMutation = useUpdateShowMutation();
  const queryClient = useQueryClient();

  const handleUpdateShow = (type: string, val: any) => {
    return updateShowMutation.mutate(
      {
        id: media.id,
        payload: {
          [type]: val?.value,
          [media.title ? 'title' : 'name']: media.title ?? media.name,
          poster_path: media.poster_path,
          backdrop_path: media.backdrop_path,
          media_type: media.title ? 'movie' : 'tv',
        },
      },
      {
        onError: (e: any) => {
          console.log(e);
          toast.error(e.message + '. ' + e.response.data);
        },
        onSuccess: async () => {
          try {
            console.log('Update media successfully!');
            toast.success('Success!');
            queryClient.invalidateQueries({ queryKey: ['shows'] });
          } catch (e: any) {
            console.log(e);
            toast.error('Server error. Please retry.');
          }
        },
      },
    );
  };

  return (
    <div className='w-[200px] rounded-xl shadow-sm shadow-stone-600 flex flex-col justify-center items-center bg-stone-200 dark:bg-stone-800 transition-full duration-200'>
      <Link
        to={`/${media.title ? 'movie' : 'tv'}/${media.id}`}
        className='w-[200px] overflow-hidden flex items-center flex-col rounded-t-xl'
      >
        <LazyLoadImageComponent
          styles={{
            image:
              'overflow-hidden h-[18rem] bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow',
            size: media?.poster_path ? 'w200' : undefined,
          }}
          path={media?.poster_path ?? imageHelper.poster}
        />
        <div className={`w-full px-4 flex flex-col my-4 `}>
          <h1 className='truncate font-poppins text-lg text-stone-600 tracking-wide dark:text-white'>
            {media.title ? media.title : media.name}
          </h1>
          <div className='flex justify-between font-poppins text-stone-300 dark:text-stone-200 text-sm'>
            <p>
              Last updated:{' '}
              <span className='text-stone-400 dark:text-stone-200'>
                {new Date(Date.parse((media as any).updatedAt)).toLocaleString('sv')}
              </span>
            </p>
          </div>
        </div>
      </Link>
      <div className='py-4 w-full flex flex-col justify-start gap-4 items-center border-t-2 border-stone-500'>
        <ButtonComponent
          role='trueFalse'
          className={`flex gap-2 items-center py-2 rounded-lg text-sm  ri shadow-xl px-4 font-bold  transition-full duration-200 bg-stone-600 hover:bg-stone-700 ${
              media?.isFavorited
                ? 'text-rose-300 hover:text-rose-400'
                : ' text-white hover:text-stone-100'
            }`}
          onClick={() => {
            handleUpdateShow('isFavorited', { value: !isFavorited });
            setIsFavorited((prev) => !prev);
          }}
        >
          {iconHelper.heart('text-xl')}
          Favorite
        </ButtonComponent>
      </div>
      <div className='w-full text-base text-stone-400 pt-2'>
        <SelectComponent
          options={[
            { value: 'Watching', label: 'Watching' },
            { value: 'Plan to Watch', label: 'Plan to Watch' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Dropped', label: 'Dropped' },
          ]}
          name={'status'}
          className='bg-stone-50 rounded-md shadow-inner   dark:text-stone-900 text-amber-900 my-2 mx-4'
          placeholder={media.status ?? 'Add status'}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => handleUpdateShow('status', val)}
        />
        <SelectComponent
          options={[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
            { value: 6, label: '6' },
            { value: 7, label: '7' },
            { value: 8, label: '8' },
            { value: 9, label: '9' },
            { value: 10, label: '10' },
          ]}
          name={'score'}
          className='bg-stone-50 rounded-md shadow-inner  dark:bg-yellow-400 dark:text-stone-900 text-amber-900 my-2 mx-4'
          placeholder={media.score?.toString() ?? 'Add score'}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => handleUpdateShow('score', val)}
        />

        <div className='w-full grid place-items-center  bg-gray-600 hover:bg-gray-700 mt-4 dark:text-stone-800 hover:text-stone-200 transition-full duration-200'>
          <ButtonComponent
            className='flex py-2 px-4 gap-2 items-center rounded-lg  '
            role='delete'
            onClick={() => {
              deleteShowMutation.mutate(media.id);
            }}
          >
            {iconHelper.trash('text-lg')}
            Delete
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default ProfileMediaCard;
