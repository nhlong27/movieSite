import React, { useRef } from 'react';
import Comments from './Comments';
import { useGetCommentsQuery } from './hooks/useGetCommentsQuery';
import { useDeleteCommentMutation } from './hooks/useDeleteCommentMutation';
import { useUpdateCommentMutation } from './hooks/useUpdateCommentMutation';
import Wrapper from '@/components/handling/Wrapper';
import { useGetUserQuery } from '../profile';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { iconHelper } from '@/config/icons';

const CommentSection = () => {
  const { data: comments, error } = useGetCommentsQuery();

  const itemsById = (comments ?? []).reduce(
    (prev, item) => ({ ...prev, [`${item.id}`]: item }),
    {},
  );
  const rootIds = comments?.filter(({ isRoot }) => isRoot).map(({ id }) => id);

  const { data: user } = useGetUserQuery();

  const updateCommentMutation = useUpdateCommentMutation();
  const queryClient = useQueryClient();

  const replyBoxRef = useRef<HTMLInputElement>(null);

  const handleUpdateComment = (isRoot: boolean, val: any) => {
    val = Object.fromEntries(val.entries());
    return updateCommentMutation.mutate(
      {
        id: user?._id! + Math.floor(Math.random() * 100).toString(),
        payload: {
          user: user?._id!,
          userName: user?.name!,
          content: val.content,
          children: [],
          href: isRoot ? undefined : val.href,
          isRoot: isRoot,
        },
      },
      {
        onError: (e: any) => {
          console.log(e);
          toast.error(e.message + '. ' + e.response.data);
        },
        onSuccess: async () => {
          try {
            console.log('Update comment successfully!');
            toast.success('Success!');
            queryClient.invalidateQueries({ queryKey: ['comments'] });
          } catch (e: any) {
            console.log(e);
            toast.error('Server error. Please retry.');
          }
        },
      },
    );
  };

  return (
    <div className='w-full rounded-lg md:p-3 mt-16 ring-2 ring-stone-500 shadow-inner bg-stone-200 dark:bg-stone-900 dark:ring-transparent'>
      <h3 className='font-semibold px-2 p-1 text-2xl dark:text-yellow-500'>Discussion</h3>
      <div className='flex flex-col gap-5 m-3'>
        <button
          className='bg-blue-500 hover:bg-blue-700 ml-8 w-[10rem] text-white font-bold py-2 px-2 rounded shadow-lg dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-stone-900'
          onClick={() => {
            replyBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          Add a comment
        </button>
        <div>
          {comments ? ( 
            (comments?.length ?? 0 > 0) ? 
            <Comments options={{ isRoot: true }} itemIds={rootIds} itemsById={itemsById} /> : <div className='w-full text-center py-8 font-black text-stone-900 dark:text-yellow-500 dark:bg-stone-700 rounded-lg'>
              There is currently no comment. <br/> It would be great if you can add one.
            </div>
          ) : error instanceof Error ? (
            <>
              <div className='w-full text-center py-8 font-black text-stone-900 dark:text-yellow-500 dark:bg-stone-700 rounded-lg'>
                Error loading comment
              </div>
              <ButtonComponent
                className='px-8 py-2 bg-primary rounded-md  text-xl mt-8 hover:bg-yellow-400
                 transition duration-300 flex gap-2 items-center hover:ring-2  hover:ring-stone-800 hover:text-stone-900 bg-stone-900 text-yellow-500 ring-yellow-500'
                onClick={() => {
                  console.log('reloading the page..');
                  window.location.reload();
                }}
              >
                {iconHelper.reload()}
                Reload
              </ButtonComponent>
            </>
          ) : (
            <div className='w-full text-center py-8 font-black text-stone-900 dark:text-yellow-500 dark:bg-stone-700 rounded-lg'>
              Loading comments..
            </div>
          )}
        </div>
      </div>

      <div
        ref={replyBoxRef}
        className='flex w-full  items-center justify-center mt-16 mb-4 bg-stone-100 py-4 rounded-md shadow-lg dark:bg-stone-800'
      >
        <form
          className='w-full max-w-xl bg-stone-100 rounded-lg px-4 pt-2 shadow-xl dark:bg-stone-700'
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateComment(true, new FormData(e.currentTarget));
            e.currentTarget.reset()
          }}
        >
          <div className='flex flex-wrap -mx-3 mb-6'>
            <h2 className='px-4 pt-3 pb-2 text-stone-800 text-lg dark:text-stone-100'>Add a new comment</h2>
            <div className='w-full md:w-full px-3 mb-2 mt-2'>
              <textarea
                className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white dark:bg-stone-600 dark:border-none dark:focus:bg-stone-600 dark:placeholder-stone-200 dark:text-white'
                name='content'
                placeholder='Type Your Comment'
                required
              ></textarea>
            </div>
            <div className='w-full md:w-full flex items-start px-3'>
              <div className='flex items-start w-1/2 text-gray-700 px-2 mr-auto dark:text-stone-100'>
                <svg
                  fill='none'
                  className='w-5 h-5 text-gray-600 mr-1 dark:text-stone-100'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='text-xs md:text-sm pt-px'>Please refrain from any profanity.</p>
              </div>
              <div className='-mr-1'>
                <input
                  type='submit'
                  className='bg-white text-gray-700 font-medium border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100 dark:bg-yellow-600 dark:border-none dark:text-stone-50 dark:hover:bg-yellow-700 cursor-pointer px-4 py-2'
                  value='Post Comment'
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default () => (
  <Wrapper>
    <CommentSection />
  </Wrapper>
);
