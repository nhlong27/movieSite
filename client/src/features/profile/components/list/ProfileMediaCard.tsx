import ButtonComponent from '@/components/generic/ButtonComponent';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteShowMutation } from '../../hooks/useDeleteShowMutation';
import { ShowQueryResponseType } from '../../types';
import SelectComponent from '@/components/generic/SelectComponent';
import { useUpdateShowMutation } from '../../hooks/useUpdateShowMutation';
import MediaCard from '@/components/specific/LinkMediaCard';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';

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
      },
    });
  };

  return (
    <Link
      to={`/${media.title ? 'movie' : 'tv'}/${media.id}`}
      className='w-[200px] overflow-hidden flex justify-center items-center flex-col'
    >
      <LazyLoadImageComponent
        className='object-cover
                  rounded-md 
                  w-full
                  aspect-[10/14]'
        path={media?.poster_path}
        size={'w200'}
      />
      <div className={`flex flex-col w-full `}>
        <h1 className='truncate'>{media.title ? media.title : media.name}</h1>
      </div>
    </Link>

    // <div className='flex flex-col'>
    //   <SelectComponent
    //     options={[
    //       { value: 'Watching', label: 'Watching' },
    //       { value: 'Plan to Watch', label: 'Plan to Watch' },
    //       { value: 'Completed', label: 'Completed' },
    //       { value: 'Dropped', label: 'Dropped' },
    //     ]}
    //     name={'status'}
    //     className='ring-2 ring-blue-300'
    //     placeholder={props.status ?? 'Add status'}
    //     extras={{ isSearchable: false, isClearable: true }}
    //     handleOnChange={(val: any) => handleUpdateShow('status', val)}
    //   />
    //   Score
    //   <SelectComponent
    //     options={[
    //       { value: 1, label: '1' },
    //       { value: 2, label: '2' },
    //       { value: 3, label: '3' },
    //       { value: 4, label: '4' },
    //       { value: 5, label: '5' },
    //       { value: 6, label: '6' },
    //       { value: 7, label: '7' },
    //       { value: 8, label: '8' },
    //       { value: 9, label: '9' },
    //       { value: 10, label: '10' },
    //     ]}
    //     name={'score'}
    //     className='ring-2 ring-blue-300'
    //     placeholder={props.score?.toString() ?? 'Select score'}
    //     extras={{ isSearchable: false, isClearable: true }}
    //     handleOnChange={(val: any) => handleUpdateShow('score', val)}
    //   />
    //   <ButtonComponent
    //     role='trueFalse'
    //     className={`${
    //       props.isFavorited
    //         ? 'text-pink-300 font-bold hover:bg-gray-200'
    //         : 'text-blue-300 font-normal hover:bg-gray-200'
    //     }`}
    //     onClick={() => {
    //       handleUpdateShow('isFavorited', { value: !isFavorited });
    //       setIsFavorited((prev) => !prev);
    //     }}
    //   >
    //     Favorite
    //   </ButtonComponent>
    //   <ButtonComponent
    //     role='delete'
    //     onClick={() => {
    //       deleteShowMutation.mutate(props.id);
    //     }}
    //   >
    //     Delete
    //   </ButtonComponent>
    // </div>
  );
};

export default ProfileMediaCard;
