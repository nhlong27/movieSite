import React from 'react';
import DeactivateRequestContainer from '@/features/profile/components/userinfo/DeactivateRequestContainer';
import Wrapper from '@/components/handling/Wrapper';
import { useGetShowQuery, useGetUserQuery, useUpdateShowMutation } from '@/features/profile';
import ButtonComponent from '../ButtonComponent';
import SelectComponent from '../SelectComponent';
import { useQueryClient } from '@tanstack/react-query';
import { useGetItemDetailQuery } from '@/features/watching';
import { Link, useParams } from 'react-router-dom';
import { MovieDetailType, TVDetailType } from '@/features/watching/types';
import { MdSystemUpdateAlt } from 'react-icons/md';
import Ratings from '@/components/specific/Ratings';

interface MediaActionModalComponentProps {
  cancelFunction: React.Dispatch<React.SetStateAction<boolean>>;
}
const MediaActionModalComponent: React.FC<MediaActionModalComponentProps> = (props) => {
  const { cancelFunction } = props;
  const [isFavorited, setIsFavorited] = React.useState(false);
  const params = useParams();
  const queryClient = useQueryClient();

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
        media_type: (serverMediaDetail as MovieDetailType).title ? 'movie' : 'tv',
      },
    });
  };

  return (
    <div
      className='relative font-poppins z-30'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-stone-700 bg-opacity-75 transition-opacity'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-8 sm:pr-8 sm:pl-8 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-full flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <MdSystemUpdateAlt className='text-xl text-blue-700' />
                </div>
                <div className='mt-3 grow text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <h3
                    className='text-2xl font-semibold leading-6 text-gray-900 tracking-wider'
                    id='modal-title'
                  >
                    Update media
                  </h3>
                  <div className='mt-4'>
                    <div className='w-5/6 text-base text-stone-400 font-black pt-4'>
                      <div className='flex gap-4 items-center h-[4rem]'>
                        <span>Add to list</span>
                        <SelectComponent
                          options={[
                            { value: 'Plan to Watch', label: 'Plan to Watch' },
                            { value: 'Completed', label: 'Completed' },
                            { value: 'Dropped', label: 'Dropped' },
                          ]}
                          name={'status'}
                          className='bg-stone-50 rounded-sm w-[10rem] text-stone-900 my-4'
                          placeholder={serverMedia?.status ?? 'Add status'}
                          extras={{ isSearchable: false, isClearable: true }}
                          handleOnChange={(val: any) => handleMediaUpdate('status', val)}
                        />
                      </div>
                      <div className='flex gap-4 items-center h-[4rem] mt-8'>
                        <span>Select score</span>
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
                          className='bg-stone-50 rounded-sm w-[5rem] text-stone-900 my-4'
                          placeholder={serverMedia?.score?.toString() ?? ''}
                          extras={{ isSearchable: false, isClearable: true }}
                          handleOnChange={(val: any) => handleMediaUpdate('score', val)}
                        />
                      </div>
                      <Ratings rating={serverMedia?.score ?? 0} />
                      <div className='py-2 w-full flex justify-between items-center mt-8'>
                        {serverMedia?.isFavorited ? (
                          <ButtonComponent
                            className='inline-flex justify-center rounded-md bg-rose-400 px-6 py-2 text-base tracking-wider font-semibold text-stone-50 shadow-sm hover:bg-rose-500 sm:ml-3 sm:w-auto'
                            onClick={() => {
                              handleMediaUpdate('isFavorited', { value: !isFavorited });
                              setIsFavorited((prev) => !prev);
                            }}
                          >
                            Favorited
                          </ButtonComponent>
                        ) : (
                          <ButtonComponent
                            className='inline-flex justify-center rounded-md bg-stone-100 px-6 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-stone-50 sm:mt-0 sm:w-auto'
                            onClick={() => {
                              handleMediaUpdate('isFavorited', { value: !isFavorited });
                              setIsFavorited((prev) => !prev);
                            }}
                          >
                            + Favorite
                          </ButtonComponent>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-slate-100 px-4 py-4 sm:py-6 mt-4 gap-4 flex justify-end sm:gap-0 sm:px-8 w-full grow'>
              <ButtonComponent
                onClick={() => cancelFunction(false)}
                type='button'
                className='ml-auto inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-base tracking-wider font-semibold text-stone-100 shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto'
              >
                Done
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotSignedInDefaultComponent = ({
  cancelFunction,
}: {
  cancelFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className='relative font-poppins z-30'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='fixed inset-0 bg-stone-700 bg-opacity-75 transition-opacity'></div>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-8 sm:pr-8 sm:pl-8 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <svg
                    className='h-8 w-8 text-red-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <h3
                    className='text-2xl font-semibold leading-6 text-gray-900 tracking-wider'
                    id='modal-title'
                  >
                    You need an account
                  </h3>
                  <div className='mt-4'>
                    <p className='text-lg text-stone-500'>
                      An account lets you favorite, rate or add to lists. e.g. 'Plan to Watch'.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-slate-100 px-4 py-4 sm:py-6 mt-4 gap-4 flex flex-col sm:flex-row sm:gap-0 sm:px-8 w-full grow'>
              <ButtonComponent
                onClick={() => cancelFunction(false)}
                type='button'
                className='ml-auto mt-3 inline-flex w-full justify-center rounded-md bg-stone-100 px-6 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-stone-300 hover:bg-stone-50 sm:mt-0 sm:w-auto'
              >
                Cancel
              </ButtonComponent>
              <Link
                to='/profile'
                className='inline-flex w-full justify-center rounded-md bg-blue-600 px-6 py-2 text-base tracking-wider font-semibold text-stone-100 shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto'
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default (props: MediaActionModalComponentProps) => (
  <Wrapper errorComponent={() => <NotSignedInDefaultComponent {...props} />}>
    <MediaActionModalComponent {...props} />
  </Wrapper>
);
