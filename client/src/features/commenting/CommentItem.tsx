import React from 'react';
import Comments from './Comments';
import { CommentType } from './types';
import { useUpdateCommentMutation } from './hooks/useUpdateCommentMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserQuery } from '../profile';
import { toast } from 'react-hot-toast';

const CommentItem = ({
  itemId,
  itemsById,
}: {
  itemId: string;
  itemsById: Record<string, CommentType>;
}) => {
  const item = itemsById[itemId];
  const [shouldReplyBoxDisplay, setShouldReplayBoxDisplay] = React.useState(false);

  const updateCommentMutation = useUpdateCommentMutation();
  const queryClient = useQueryClient();
  const { data: user } = useGetUserQuery();

  const handleUpdateComment = (isRoot: boolean, val: any) => {
    let newId = user?._id! + Math.floor(Math.random() * 100).toString();
    updateCommentMutation.mutate(
      {
        id: val.id ?? newId,
        payload: {
          ...val,
          user: user?._id,
          isRoot: val.isRoot ?? isRoot,
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
    return newId;
  };

  return (
    <>
      <div className='p-3'>
        <div className='flex gap-3 items-center'>
          <img
            src='https://avatars.githubusercontent.com/u/22263436?v=4'
            className='object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400'
          />
          <h3 className='font-bold'>
            User 1
            <br />
            <span className='text-sm text-gray-400 font-normal'>Level 1</span>
          </h3>
        </div>
        <p className='text-gray-600 mt-2'>{item.content}</p>
        <button
          onClick={() => setShouldReplayBoxDisplay(true)}
          className='text-right text-blue-500'
        >
          Reply
        </button>
      </div>
      <div className='flex flex-col items-end gap-3 pr-3 py-3'>
        <div>
          <svg
            className='w-6 h-6 text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='5'
            stroke='currentColor'
          >
            <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
          </svg>
        </div>
        <div>
          <svg
            className='w-6 h-6 text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='5'
            stroke='currentColor'
          >
            <path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
      </div>

      {shouldReplyBoxDisplay ? (
        <div className='flex w-full  items-center justify-center shadow-lg mt-56 mb-4'>
          <form
            className='w-full max-w-xl bg-white rounded-lg px-4 pt-2 shadow-xl'
            onSubmit={async (e) => {
              e.preventDefault();
              let newChildId = await handleUpdateComment(
                false,
                Object.fromEntries(new FormData(e.currentTarget).entries()),
              );
              await handleUpdateComment(false, {
                ...item,
                children: item.children?.concat(newChildId),
              });
            }}
          >
            <div className='flex flex-wrap -mx-3 mb-6'>
              <h2 className='px-4 pt-3 pb-2 text-gray-800 text-lg'>Add a new comment</h2>
              <div className='w-full md:w-full px-3 mb-2 mt-2'>
                <textarea
                  className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white'
                  name='content'
                  placeholder='Type Your Comment'
                  required
                ></textarea>
              </div>
              <div className='w-full md:w-full flex items-start px-3'>
                <div className='flex items-start w-1/2 text-gray-700 px-2 mr-auto'>
                  <svg
                    fill='none'
                    className='w-5 h-5 text-gray-600 mr-1'
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
                  <p className='text-xs md:text-sm pt-px'>Some HTML is okay.</p>
                </div>
                <div className='-mr-1'>
                  <input
                    type='submit'
                    className='bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100'
                    value='Post Comment'
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : null}

      {item.children ? <Comments itemIds={item.children} itemsById={itemsById} /> : null}
    </>
  );
};

export default CommentItem;
