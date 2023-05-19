import React from 'react';
import { useGetShowQuery, useGetUserQuery, useUpdateShowMutation } from '@/features/profile';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import { MovieDetailType, TVDetailType } from '../types';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useParams } from 'react-router-dom';
import Wrapper from '@/components/handling/Wrapper';
import MediaActionModalComponent from '@/components/generic/modals/MediaActionModelComponent';
import { iconHelper } from '@/config/icons';

interface MediaActionsProps {
  styles?: Record<string, string>;
  actionType: string;
  children?: string | JSX.Element | JSX.Element[];
  handlingFunctions?: Record<string, Function>;
  refs?: Record<string, React.RefObject<HTMLInputElement>>;
}

const MediaActions: React.FC<MediaActionsProps> = (props) => {
  const { styles, refs, handlingFunctions, actionType, children } = props;

  const [shouldMediaActionsModalDisplay, setShouldMediaActionsModalDisplay] = React.useState(false);

  const params = useParams();
  // Need this query so if user isn't signed in, returns default wrapper
  const { data } = useGetUserQuery();
  const updateShowMutation = useUpdateShowMutation();
  const { data: serverMediaDetail } = useGetItemDetailQuery();
  const { data: serverMedia } = useGetShowQuery(params.id!);

  const handleMediaUpdate = (type: string, val: any) => {
    return updateShowMutation.mutate({
      id: params.id!,
      payload: {
        [type]: val?.value,
        [(serverMediaDetail as MovieDetailType)?.title ? 'title' : 'name']:
          (serverMediaDetail as MovieDetailType)?.title ??
          (serverMediaDetail as TVDetailType)?.name,
        poster_path: serverMediaDetail?.poster_path,
        backdrop_path: serverMediaDetail?.backdrop_path,
        media_type: (serverMediaDetail as MovieDetailType).title ? 'movie' : 'tv',
      },
    });
  };

  if (actionType === 'play') {
    return (
      <ButtonComponent
        className={`text-stone-700 md:text-stone-200 font-extrabold
      uppercase bg-stone-900 bg-opacity-0 rounded-sm ring-2 hover:ring-4 ring-stone-600 md:ring-stone-300 md:h-[3.5rem] text-xl tracking-[0.3rem] px-8 md:px-12 hover:text-stone-50 hover:ring-stone-100
      hover:bg-opacity-100 hover:tracking-[0.4rem] transition-full duration-500 cursor-pointer hover:-ml-2 flex items-center justify-center gap-2 md:py-8 ${styles?.play}`}
        onClick={() => {
          handleMediaUpdate('status', { value: 'Watching' });

          refs?.playRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
          handlingFunctions?.playFunction(true);
        }}
      >
        {children ?? iconHelper.play('text-4xl')}
      </ButtonComponent>
    );
  } else
    return (
      <div className={`w-2/3 text-stone-200 py-4 flex gap-4 items-center ${styles?.others}`}>
        {shouldMediaActionsModalDisplay ? (
          <MediaActionModalComponent cancelFunction={setShouldMediaActionsModalDisplay} />
        ) : null}
        {serverMedia?.isFavorited ? (
          <ButtonComponent
            onClick={() => setShouldMediaActionsModalDisplay(true)}
            className='text-rose-400 bg-stone-900 w-[7rem] h-[4rem] grid place-items-center text-lg px-4 shadow-lg shadow-stone-700 hover:text-rose-300 hover:shadow-stone-600 group'
          >
            {iconHelper.fillHeart('text-[2.1rem]')}
            Favorited
          </ButtonComponent>
        ) : (
          <ButtonComponent
            onClick={() => setShouldMediaActionsModalDisplay(true)}
            className='text-stone-400 bg-stone-900 w-[7rem] h-[4rem] grid place-items-center text-lg px-4 shadow-lg shadow-stone-700 font-bold hover:text-stone-100 hover:shadow-stone-600 group'
          >
            {iconHelper.heart('text-[2.1rem] ')}
            +Favorite
          </ButtonComponent>
        )}
        <ButtonComponent
          onClick={() => setShouldMediaActionsModalDisplay(true)}
          className='text-amber-400 bg-stone-900 w-[7rem] h-[4rem] grid place-items-center text-lg px-4 shadow-lg shadow-stone-700 font-bold hover:text-amber-300 hover:shadow-stone-600 group'
        >
          <svg
            aria-hidden='true'
            className='w-8 h-8 text-amber-400 hover:text-amber-300'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Rating star</title>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          {serverMedia?.score ?? 'Rate'}
        </ButtonComponent>
        <ButtonComponent
          onClick={() => setShouldMediaActionsModalDisplay(true)}
          className='text-stone-300 font-extrabold
          bg-stone-900 to-transparent md:w-[20rem] w-[15rem] h-[4rem] flex justify-center items-center gap-4 text-xl tracking-[0.3rem] uppercase px-4 hover:text-stone-200'
        >
          {serverMedia?.status ?? (
            <>
            {iconHelper.systemUpdate('text-3xl text-stone-50')}
              Add to My List
            </>
          )}
        </ButtonComponent>
      </div>
    );
};

function DefaultPlayComponent({
  refs,
  children,
  handlingFunctions,
}: {
  children?: string | JSX.Element | JSX.Element[];
  refs?: Record<string, React.RefObject<HTMLInputElement>>;
  handlingFunctions?: Record<string, Function>;
}) {
  return (
    <ButtonComponent
      className='text-stone-700 md:text-stone-200 font-extrabold
      uppercase bg-stone-900 bg-opacity-0 rounded-sm ring-2 hover:ring-4 ring-stone-600 md:ring-stone-300 md:h-[3.5rem] text-xl tracking-[0.3rem] px-8 md:px-12 hover:text-stone-50 hover:ring-stone-100
      hover:bg-opacity-100 hover:tracking-[0.4rem] transition-full duration-500 cursor-pointer hover:-ml-2 flex items-center justify-center gap-2 md:py-8 '
      onClick={() => {
        refs?.playRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        handlingFunctions?.playFunction(true);
      }}
    >
      {children ?? iconHelper.play('text-4xl')}
    </ButtonComponent>
  );
}

function DefaultOtherActionsComponent({ styles }: { styles?: Record<string, any> }) {
  const [shouldMediaActionsModalDisplay, setShouldMediaActionsModalDisplay] = React.useState(false);

  return (
    <div className={`w-2/3 text-stone-200 py-4 flex gap-4 items-center ${styles?.others}`}>
      {shouldMediaActionsModalDisplay ? (
        <MediaActionModalComponent cancelFunction={setShouldMediaActionsModalDisplay} />
      ) : null}
      <ButtonComponent
        onClick={() => setShouldMediaActionsModalDisplay(true)}
        className='text-stone-400 bg-stone-900 w-[7rem] h-[4rem] grid place-items-center text-lg px-4 shadow-lg shadow-stone-700 font-bold hover:text-stone-100 hover:shadow-stone-600 group'
      >
        {iconHelper.heart('text-[2.1rem]')}
        +Favorite
      </ButtonComponent>

      <ButtonComponent
        onClick={() => setShouldMediaActionsModalDisplay(true)}
        className='text-amber-400 bg-stone-900 w-[7rem] h-[4rem] grid place-items-center text-lg px-4 shadow-lg shadow-stone-700 font-bold hover:text-amber-300 hover:shadow-stone-600 group'
      >
        <svg
          aria-hidden='true'
          className='w-8 h-8 text-amber-400 hover:text-amber-300'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Rating star</title>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
        </svg>
        Rate
      </ButtonComponent>
      <ButtonComponent
        onClick={() => setShouldMediaActionsModalDisplay(true)}
        className='text-stone-300 font-extrabold
             bg-stone-900 to-transparent w-[15rem] md:w-[20rem] h-[4rem] flex justify-center items-center gap-4 text-xl tracking-[0.3rem] uppercase px-4 hover:text-stone-200'
      >
        {iconHelper.systemUpdate('text-3xl text-stone-50')}
        Add to My List
      </ButtonComponent>
    </div>
  );
}

export default (props: MediaActionsProps) => (
  <Wrapper
    errorComponent={
      props.actionType === 'play'
        ? () => <DefaultPlayComponent {...props} />
        : () => <DefaultOtherActionsComponent {...props} />
    }
  >
    <MediaActions {...props} />
  </Wrapper>
);
