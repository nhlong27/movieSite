import ButtonComponent from '@/components/generic/ButtonComponent';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteShowMutation } from '../../hooks/useDeleteShowMutation';
import { ShowQueryResponseType } from '../../types';
import SelectComponent from '@/components/generic/SelectComponent';
import { useUpdateShowMutation } from '../../hooks/useUpdateShowMutation';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import { poster } from '@/config/images';
import { AiOutlineHeart, BsTrash } from '@/config/icons';

interface ProfileMediaCardProps {
  media: ShowQueryResponseType;
}
const ProfileMediaCard: React.FC<ProfileMediaCardProps> = (props) => {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const { media } = props;

  const deleteShowMutation = useDeleteShowMutation();
  const updateShowMutation = useUpdateShowMutation();

  const handleUpdateShow = (type: string, val: any) => {
    return updateShowMutation.mutate({
      id: media.id,
      payload: {
        [type]: val?.value,
        [media.title ? 'title' : 'name']: media.title ?? media.name,
        poster_path: media.poster_path,
        media_type: media.title ? 'movie' : 'tv',
      },
    });
  };

  return (
    <div className='w-[200px] rounded-xl shadow-xl shadow-stone-600 flex flex-col justify-center items-center bg-stone-200'>
      <Link
        to={`/${media.title ? 'movie' : 'tv'}/${media.id}`}
        className='w-[200px] overflow-hidden flex items-center flex-col rounded-t-xl'
      >
        <LazyLoadImageComponent
          styles={{ image: 'object-cover bg-gradient-to-tr from-white to-black', size: 'original' }}
          path={media?.poster_path ?? poster}
        />
        <div className={`w-11/12 flex flex-col bg-stone-100 my-4 `}>
          <h1 className='truncate font-poppins font-black text-xl text-stone-600 tracking-wide'>
            {media.title ? media.title : media.name}
          </h1>
          <div className='flex justify-between font-poppins text-stone-500 font-extrabold text-base'>
            <p>
              Last updated:{' '}
              <span className='text-stone-600 font-bold'>
                {new Date(Date.parse((media as any).updatedAt)).toLocaleString('sv')}
              </span>
            </p>
          </div>
        </div>
      </Link>
      <div className='w-11/12 text-base text-stone-400 font-black py-2 border-t-2 border-stone-400'>
        <SelectComponent
          options={[
            { value: 'Watching', label: 'Watching' },
            { value: 'Plan to Watch', label: 'Plan to Watch' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Dropped', label: 'Dropped' },
          ]}
          name={'status'}
          className='bg-stone-50 rounded-sm text-amber-900 my-2'
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
          className='bg-stone-50 rounded-sm text-amber-900 my-2'
          placeholder={media.score?.toString() ?? 'Select score'}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => handleUpdateShow('score', val)}
        />
        <div className='py-2 w-full flex justify-between items-center'>
          <ButtonComponent
            role='trueFalse'
            className={`font-bold flex gap-2 items-center rounded-lg py-[4px] bg-stone-300 ring-2 ring-yellow-600 px-2 text-sm
            hover:bg-yellow-500
            hover:ring-stone-900 hover:text-stone-900 ${
              media.isFavorited
                ? 'text-pink-500 font-black hover:bg-pink-600'
                : 'text-yellow-600 hover:bg-yellow-700'
            }`}
            onClick={() => {
              handleUpdateShow('isFavorited', { value: !isFavorited });
              setIsFavorited((prev) => !prev);
            }}
          >
            <AiOutlineHeart className='text-xl' />
            Favorite
          </ButtonComponent>
          <ButtonComponent
            className='ml-auto flex py-[4px] px-2  rounded-lg bg-stone-300 ring-2 ring-red-400 text-red-500 hover:bg-red-400 hover:ring-stone-900 hover:text-stone-900'
            role='delete'
            onClick={() => {
              deleteShowMutation.mutate(media.id);
            }}
          >
            <BsTrash className='text-lg' />
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default ProfileMediaCard;
