import React from 'react';
import Comments from './Comments';
import { CommentType } from './types';
import { useUpdateCommentMutation } from './hooks/useUpdateCommentMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserQuery } from '../profile';
import { toast } from 'react-hot-toast';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { imageHelper } from '@/config/images';

const CommentItem = ({
  mediaId,
  itemId,
  itemsById,
}: {
  mediaId: string;
  itemId: string;
  itemsById: Record<string, CommentType>;
}) => {
  const item = itemsById[itemId];
  const [shouldReplyBoxDisplay, setShouldReplayBoxDisplay] = React.useState(false);
  const [shouldChildrenDisplay, setShouldChildrenDisplay] = React.useState(true);

  const updateCommentMutation = useUpdateCommentMutation();
  const queryClient = useQueryClient();
  const { data: user } = useGetUserQuery();

  const [animationParentRef] = useAutoAnimate();

  const handleUpdateComment = (isRoot: boolean, val: any) => {
    let newId = user?._id! + Math.floor(Math.random() * 100).toString();
    updateCommentMutation.mutate(
      {
        id: val.id ?? newId,
        payload: {
          ...val,
          user: user?._id,
          mediaId: mediaId,
          avatar: user?.avatar ?? imageHelper.logo_better,
          userName: user?.name!,
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
    <div ref={animationParentRef} className={`flex flex-col ml-2 md:ml-12 ${item?.isRoot && 'mt-8'}`}>
      <div className='flex justify-between rounded-md ring-2 ring-stone-500 bg-stone-100  dark:bg-stone-800  dark:ring-transparent'>
        <div className='p-3 flex flex-col items-start'>
          <div className='flex gap-3 items-center'>
            <img
              src={item?.avatar}
              className='object-cover w-10 h-10 rounded-full border-2 border-yellow-400  shadow-yellow-400'
            />
            <h3 className='font-bold dark:text-stone-50 text-left'>
              {item?.userName}
              <br />
              <span className='text-sm text-gray-400 dark:text-yellow-600 font-normal'>
                {new Date(Date.parse(item?.updatedAt)).toLocaleString('sv')}
              </span>
            </h3>
          </div>
          <p className='text-gray-600 my-4 pl-4 text-sm md:text-lg dark:text-stone-100'>{item?.content}</p>
          {item?.content !== 'Comment has been deleted' && (
            <div>
              <button
                onClick={() => setShouldReplayBoxDisplay(true)}
                className='mr-4 text-right text-yellow-400 hover:text-yellow-300'
              >
                Reply
              </button>
              {user?._id === item?.user ? (
                <>
                  <button
                    onClick={() => {
                      handleUpdateComment(false, {
                        ...item,
                        content: 'Comment has been deleted',
                      });
                    }}
                    className='mr-4 text-right text-red-500 hover:text-red-400'
                  >
                    Delete
                  </button>
                </>
              ) : null}
            </div>
          )}
        </div>
        {item?.children?.length ?? 0 > 0 ? (
          <div className='flex flex-col items-end gap-3 pr-3 py-3'>
            <button onClick={() => setShouldChildrenDisplay(false)}>
              <svg
                className='w-6 h-6 text-gray-600 dark:text-stone-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='5'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
              </svg>
            </button>
            <button onClick={() => setShouldChildrenDisplay(true)}>
              <svg
                className='w-6 h-6 text-gray-600 dark:text-stone-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='5'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                />
              </svg>
            </button>
          </div>
        ) : null}
      </div>

      {shouldReplyBoxDisplay ? (
        <div className='flex w-full  items-center justify-center -mt-4 mb-4 bg-stone-100 py-4 rounded-md shadow-lg dark:bg-stone-800'>
          <form
            className='w-11/12 ring-2 ring-stone-500 bg-stone-100 rounded-lg px-4 pt-2 shadow-xl dark:ring-transparent dark:bg-stone-700'
            onSubmit={async (e) => {
              e.preventDefault();
              let newChildId = await handleUpdateComment(
                false,
                Object.fromEntries(new FormData(e.currentTarget).entries()),
              );
              await handleUpdateComment(false, {
                ...item,
                children: item?.children?.concat(newChildId),
              });
              setShouldReplayBoxDisplay(false);
            }}
          >
            <div className='flex md:flex-row flex-col -mx-3 mb-6'>
              <h2 className='md:px-4 pt-3 pb-2 w-[10rem] text-stone-800 text-sm md:text-lg text-end md:pr-4 dark:text-stone-100'>
                Add a reply
              </h2>
              <div className='grow px-3 mb-2 mt-2'>
                <textarea
                  className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white dark:bg-stone-600 dark:border-none dark:focus:bg-stone-600 dark:placeholder-stone-200 dark:text-white'
                  name='content'
                  placeholder='Type Your Reply'
                  required
                ></textarea>
              </div>
              <div className='flex items-start px-3 ml-auto mt-auto'>
                <div className='-mr-1 '>
                  <input
                    type='submit'
                    className='bg-white text-gray-700 font-medium border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100 dark:bg-yellow-600 dark:border-none dark:text-stone-50 dark:hover:bg-yellow-700 cursor-pointer px-4 py-2'
                    value='Post'
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : null}

      {item?.children && shouldChildrenDisplay ? (
        <Comments mediaId={mediaId} itemIds={item?.children} itemsById={itemsById} />
      ) : null}
    </div>
  );
};

export default CommentItem;
