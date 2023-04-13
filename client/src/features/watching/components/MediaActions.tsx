import React from 'react';
import SelectComponent from '@/components/generic/SelectComponent';
import { useGetShowQuery, useUpdateShowMutation } from '@/features/profile';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import { MovieDetailType, TVDetailType } from '../types';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useGetUserQuery } from '@/features/profile/hooks/useGetUserQuery';

interface MediaActionsProps {
  options?: { [key: string]: any };
}

const MediaActions: React.FC<MediaActionsProps> = (props) => {
  const { options } = props;
  const [isFavorited, setIsFavorited] = React.useState(false);

  const updateShowMutation = useUpdateShowMutation();
  const { data: tmdbDetail, params } = useGetItemDetailQuery();
  const { data: serverDetail } = useGetShowQuery(params.id!);
  const { data: userData } = useGetUserQuery();

  const handleMediaUpdate = (type: string, val: any) => {
    return updateShowMutation.mutate({
      id: params.id!,
      payload: {
        [type]: val?.value,
        [(tmdbDetail as any)?.title ? 'title' : 'name']:
          (tmdbDetail as MovieDetailType)?.title ?? (tmdbDetail as TVDetailType)?.name,
        poster_path: tmdbDetail?.poster_path,
      },
    });
  };

  return (
    <div className={`${options?.wrapper?.className} flex gap-4`}>
      <ButtonComponent
        role='trueFalse'
        // className={`${
        //   (serverDetail as any)?.isFavorited
        //     ? 'text-pink-300 font-bold hover:bg-gray-200'
        //     : 'text-blue-300 font-normal hover:bg-gray-200'
        // }`}
        onClick={() => {
          handleMediaUpdate('status', { value: 'Watching' });

          options?.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      >
        Watch
      </ButtonComponent>
      <SelectComponent
        options={[
          { value: 'Plan to Watch', label: 'Plan to Watch' },
          { value: 'Completed', label: 'Completed' },
          { value: 'Dropped', label: 'Dropped' },
        ]}
        name={'status'}
        className='ring-2 ring-blue-300'
        placeholder={(serverDetail as any)?.status ?? 'Add status'}
        extras={{ isSearchable: false, isClearable: true, isDisabled: !!!userData }}
        handleOnChange={(val: any) => handleMediaUpdate('status', val)}
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
        className='ring-2 ring-blue-300'
        placeholder={(serverDetail as any)?.score ?? 'Add score'}
        extras={{ isSearchable: false, isClearable: true, isDisabled: !!!userData }}
        handleOnChange={(val: any) => handleMediaUpdate('score', val)}
      />
      <ButtonComponent
        role='trueFalse'
        className={`${
          (serverDetail as any)?.isFavorited
            ? 'text-pink-300 font-bold hover:bg-gray-200'
            : 'text-blue-300 font-normal hover:bg-gray-200'
        }`}
        onClick={() => {
          handleMediaUpdate('isFavorited', { value: !isFavorited });
          setIsFavorited((prev) => !prev);
        }}
      >
        Favorite
      </ButtonComponent>
    </div>
  );
};

export default MediaActions;
