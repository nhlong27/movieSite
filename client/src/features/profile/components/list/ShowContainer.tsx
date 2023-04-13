import ButtonComponent from '@/components/generic/ButtonComponent';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteShowMutation } from '../../hooks/useDeleteShowMutation';
import { ShowQueryResponseType } from '../../types';
import SelectComponent from '@/components/generic/SelectComponent';
import { useUpdateShowMutation } from '../../hooks/useUpdateShowMutation';
import MediaCard from '@/components/specific/MediaCard';

const ShowContainer = (props: ShowQueryResponseType) => {
  const [isFavorited, setIsFavorited] = React.useState(false);

  const deleteShowMutation = useDeleteShowMutation();
  const updateShowMutation = useUpdateShowMutation();
  const handleUpdateShow = (type: string, val: any) => {
    return updateShowMutation.mutate({
      id: props.id,
      payload: {
        [type]: val?.value,
        [props.title ? 'title' : 'name']: props.title ?? props.name,
        poster_path: props.poster_path,
      },
    });
  };

  return (
    <div className='flex md:w-[48%] w-full'>
      <Link to={`/${props.title ? 'movie' : 'tv'}/${props.id}`}>
        <MediaCard
          options={{
            lazyImageComponent: {
              size: 'original',
            },
          }}
          media={props}
          mediaType={props.title ? 'movie' : 'tv'}
        />
      </Link>
      <div className='flex flex-col'>
        <SelectComponent
          options={[
            { value: 'Watching', label: 'Watching' },
            { value: 'Plan to Watch', label: 'Plan to Watch' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Dropped', label: 'Dropped' },
          ]}
          name={'status'}
          className='ring-2 ring-blue-300'
          placeholder={props.status ?? 'Add status'}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => handleUpdateShow('status', val)}
        />
        Score
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
          className='ring-2 ring-blue-300'
          placeholder={props.score?.toString() ?? 'Select score'}
          extras={{ isSearchable: false, isClearable: true }}
          handleOnChange={(val: any) => handleUpdateShow('score', val)}
        />
        <ButtonComponent
          role='trueFalse'
          className={`${
            props.isFavorited
              ? 'text-pink-300 font-bold hover:bg-gray-200'
              : 'text-blue-300 font-normal hover:bg-gray-200'
          }`}
          onClick={() => {
            handleUpdateShow('isFavorited', { value: !isFavorited });
            setIsFavorited((prev) => !prev);
          }}
        >
          Favorite
        </ButtonComponent>
        <ButtonComponent
          role='delete'
          onClick={() => {
            deleteShowMutation.mutate(props.id);
          }}
        >
          Delete
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ShowContainer;
