import React, { ReactNode } from 'react';
import SelectComponent from '@/components/generic/SelectComponent';
import { useGetShowQuery, useUpdateShowMutation } from '@/features/profile';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import { MovieDetailType, TVDetailType } from '../types';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useGetUserQuery } from '@/features/profile/hooks/useGetUserQuery';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Wrapper from '@/components/handling/Wrapper';

const defaults: Record<string, (...arg: any[]) => JSX.Element> = {
  play: DefaultPlayComponent,
  isFavorited: DefaultFavoriteComponent,
  status: DefaultStatusComponent,
  score: DefaultScoreComponent,
};

interface MediaActionsProps {
  styles?: Record<string, string>;
  actionType: string;
  children?: string | JSX.Element | JSX.Element[];
  handlingFunctions?: Record<string, Function>;
  refs?: Record<string, React.RefObject<HTMLInputElement>>;
}

const MediaActions: React.FC<MediaActionsProps> = (props) => {
  const { styles, refs, handlingFunctions, actionType, children } = props;
  const [isFavorited, setIsFavorited] = React.useState(false);

  const params = useParams();

  const updateShowMutation = useUpdateShowMutation();
  const { data: serverMediaDetail } = useGetItemDetailQuery();
  const { data: serverMedia } = useGetShowQuery(params.id!);
  const { data: userData } = useGetUserQuery();

  const handleMediaUpdate = (type: string, val: any) => {
    return updateShowMutation.mutate({
      id: params.id!,
      payload: {
        [type]: val?.value,
        [(serverMediaDetail as MovieDetailType)?.title ? 'title' : 'name']:
          (serverMediaDetail as MovieDetailType)?.title ??
          (serverMediaDetail as TVDetailType)?.name,
        poster_path: serverMediaDetail?.poster_path,
        media_type: (serverMediaDetail as MovieDetailType).title ? 'movie' : 'tv',
      },
    });
  };

  if (actionType === 'play') {
    return (
      <ButtonComponent
        onClick={() => {
          handleMediaUpdate('status', { value: 'Watching' });

          refs?.playRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          handlingFunctions?.playFunction(true);
        }}
      >
        {children ?? 'Play'}
      </ButtonComponent>
    );
  }

  if (actionType === 'isFavorited')
    return (
      <ButtonComponent
        role='trueFalse'
        className={`${
          serverMedia?.isFavorited
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
    );

  if (actionType === 'status')
    return (
      <SelectComponent
        options={[
          { value: 'Plan to Watch', label: 'Plan to Watch' },
          { value: 'Completed', label: 'Completed' },
          { value: 'Dropped', label: 'Dropped' },
        ]}
        name={'status'}
        className='ring-2 ring-blue-300'
        placeholder={serverMedia?.status ?? 'Add status'}
        extras={{ isSearchable: false, isClearable: true, isDisabled: !!!userData }}
        handleOnChange={(val: any) => handleMediaUpdate('status', val)}
      />
    );
  if (actionType === 'score')
    return (
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
        placeholder={serverMedia?.score?.toString() ?? 'Add score'}
        extras={{ isSearchable: false, isClearable: true, isDisabled: !!!userData }}
        handleOnChange={(val: any) => handleMediaUpdate('score', val)}
      />
    );
  return <></>;
  // return (
  //   <>
  //     <ButtonComponent
  //       role='trueFalse'
  //       onClick={() => {
  //         handleMediaUpdate('status', { value: 'Watching' });

  //         ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //         handlingFunctions?.playFunction(true);
  //       }}
  //     >
  //       {children ?? 'Play'}
  //     </ButtonComponent>
  //     <SelectComponent
  //       options={[
  //         { value: 'Plan to Watch', label: 'Plan to Watch' },
  //         { value: 'Completed', label: 'Completed' },
  //         { value: 'Dropped', label: 'Dropped' },
  //       ]}
  //       name={'status'}
  //       className='ring-2 ring-blue-300'
  //       placeholder={serverMedia?.status ?? 'Add status'}
  //       extras={{ isSearchable: false, isClearable: true, isDisabled: !!!userData }}
  //       handleOnChange={(val: any) => handleMediaUpdate('status', val)}
  //     />
  //     <SelectComponent
  //       options={[
  //         { value: 1, label: '1' },
  //         { value: 2, label: '2' },
  //         { value: 3, label: '3' },
  //         { value: 4, label: '4' },
  //         { value: 5, label: '5' },
  //         { value: 6, label: '6' },
  //         { value: 7, label: '7' },
  //         { value: 8, label: '8' },
  //         { value: 9, label: '9' },
  //         { value: 10, label: '10' },
  //       ]}
  //       name={'score'}
  //       className='ring-2 ring-blue-300'
  //       placeholder={serverMedia?.score?.toString() ?? 'Add score'}
  //       extras={{ isSearchable: false, isClearable: true, isDisabled: !!!userData }}
  //       handleOnChange={(val: any) => handleMediaUpdate('score', val)}
  //     />
  //     <ButtonComponent
  //       role='trueFalse'
  //       className={`${
  //         serverMedia?.isFavorited
  //           ? 'text-pink-300 font-bold hover:bg-gray-200'
  //           : 'text-blue-300 font-normal hover:bg-gray-200'
  //       }`}
  //       onClick={() => {
  //         handleMediaUpdate('isFavorited', { value: !isFavorited });
  //         setIsFavorited((prev) => !prev);
  //       }}
  //     >
  //       Favorite
  //     </ButtonComponent>
  //   </>
  // );
};

function DefaultPlayComponent({
  handlingFunctions,
  refs,
}: {
  handlingFunctions?: Record<string, Function>;
  refs?: Record<string, React.RefObject<HTMLInputElement>>;
}) {
  return (
    <ButtonComponent
      onClick={() => {
        refs?.playRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        handlingFunctions?.playFunction(true);
      }}
    >
      Play
    </ButtonComponent>
  );
}

function DefaultFavoriteComponent() {
  return (
    <ButtonComponent
      onClick={() => {
        toast('Sign in to favorite');
      }}
    >
      Favorite
    </ButtonComponent>
  );
}
function DefaultStatusComponent() {
  return (
    <ButtonComponent
      onClick={() => {
        toast('Sign in to add status');
      }}
    >
      Status
    </ButtonComponent>
  );
}
function DefaultScoreComponent() {
  return (
    <ButtonComponent
      onClick={() => {
        toast('Sign in to add score');
      }}
    >
      Score
    </ButtonComponent>
  );
}

export default (props: MediaActionsProps) => (
  <Wrapper
    errorComponent={
      props.actionType === 'play'
        ? () => <DefaultPlayComponent handlingFunctions={props.handlingFunctions} refs={props.refs} />
        : defaults[`${props.actionType}`]
    }
  >
    <MediaActions {...props} />
  </Wrapper>
);
