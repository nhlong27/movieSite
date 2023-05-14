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
import { BsPlayFill } from 'react-icons/bs';
import { GrStatusInfo } from 'react-icons/gr';
import { AiOutlineHeart } from 'react-icons/ai';

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
        className='text-stone-700 md:text-stone-200 font-extrabold
      uppercase bg-stone-900 bg-opacity-0 rounded-sm ring-2 hover:ring-4 ring-stone-600 md:ring-stone-300 md:h-[3.5rem] text-xl tracking-[0.3rem] px-8 md:px-16 hover:text-stone-50 hover:ring-stone-100
      hover:bg-opacity-100 hover:tracking-[0.4rem] transition-full duration-500 cursor-pointer hover:-ml-2 flex items-center justify-center gap-2 md:py-8 '
        onClick={() => {
          handleMediaUpdate('status', { value: 'Watching' });

          refs?.playRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          handlingFunctions?.playFunction(true);
        }}
      >
        <BsPlayFill className='text-4xl' />
      </ButtonComponent>
    );
  }

  if (actionType === 'isFavorited')
    return (
      <ButtonComponent
        role='trueFalse'
        className={`font-bold h-[2rem] flex gap-2 items-center rounded-lg py-[4px] bg-stone-300 ring-2  px-2 text-sm
            hover:ring-stone-900 hover:text-stone-900 ${
              serverMedia?.isFavorited
                ? 'text-pink-500 font-black hover:bg-pink-500 ring-pink-600'
                : 'text-yellow-600 hover:bg-yellow-500 ring-yellow-600'
            }`}
        onClick={() => {
          handleMediaUpdate('isFavorited', { value: !isFavorited });
          setIsFavorited((prev) => !prev);
        }}
      >
        <AiOutlineHeart className='text-xl' />
        Favorite
      </ButtonComponent>
    );

  if (actionType === 'status')
    return (
      <div className='w-full text-base text-stone-500 font-bold grid grid-cols-6 place-content-center place-items-center '>
        <GrStatusInfo className='text-2xl col-span-1' />
        <span className='col-span-2'>Add status</span>

        <SelectComponent
          options={[
            { value: 'Plan to Watch', label: 'Plan to Watch' },
            { value: 'Completed', label: 'Completed' },
            { value: 'Dropped', label: 'Dropped' },
          ]}
          name={'status'}
          className='bg-stone-100  rounded-sm text-amber-900 my-2 text-base ml-auto col-span-3'
          placeholder={serverMedia?.status ?? 'Add status'}
          extras={{ isSearchable: false, isClearable: true, isDisabled: !!!userData }}
          handleOnChange={(val: any) => handleMediaUpdate('status', val)}
        />
      </div>
    );
  if (actionType === 'score')
    return (
      <div className='w-full text-base text-stone-500 font-bold grid grid-cols-6 place-content-center place-items-center '>
        <svg
          aria-hidden='true'
          className='w-8 h-8 text-amber-400 col-span-1'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Rating star</title>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
        </svg>
        <span className='col-span-2'>Add score</span>

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
          className='bg-stone-100  rounded-sm text-amber-900 my-2 text-base ml-auto col-span-3'
          placeholder={serverMedia?.score?.toString() ?? ''}
          extras={{ isSearchable: false, isClearable: true, isDisabled: !!!userData }}
          handleOnChange={(val: any) => handleMediaUpdate('score', val)}
        />
      </div>
    );
  return <></>;
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
        className='text-stone-700 md:text-stone-200 font-extrabold
      uppercase bg-stone-900 bg-opacity-0 rounded-sm ring-2 hover:ring-4 ring-stone-600 md:ring-stone-300 md:h-[3.5rem] text-xl tracking-[0.3rem] px-8 md:px-16 hover:text-stone-50 hover:ring-stone-100
      hover:bg-opacity-100 hover:tracking-[0.4rem] transition-full duration-500 cursor-pointer hover:-ml-2 flex items-center justify-center gap-2 md:py-8 '
        onClick={() => {
          refs?.playRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          handlingFunctions?.playFunction(true);
        }}
      >
        <BsPlayFill className='text-4xl' />
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
        ? () => (
            <DefaultPlayComponent handlingFunctions={props.handlingFunctions} refs={props.refs} />
          )
        : defaults[`${props.actionType}`]
    }
  >
    <MediaActions {...props} />
  </Wrapper>
);
