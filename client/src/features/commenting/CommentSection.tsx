import React from 'react';
import Comments from './Comments';
import { useGetCommentsQuery } from './hooks/useGetCommentsQuery';
import { useDeleteCommentMutation } from './hooks/useDeleteCommentMutation';
import { useUpdateCommentMutation } from './hooks/useUpdateCommentMutation';
import Wrapper from '@/components/handling/Wrapper';
import { useGetUserQuery } from '../profile';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const CommentSection = () => {
  const { data: comments, error } = useGetCommentsQuery();

  const itemsById = (comments ?? []).reduce(
    (prev, item) => ({ ...prev, [`${item.id}`]: item }),
    {},
  );
  const rootIds = comments?.filter(({ isRoot }) => isRoot).map(({ id }) => id);

  const {data: user} = useGetUserQuery();

  const deleteCommentMutation = useDeleteCommentMutation();
  const updateCommentMutation = useUpdateCommentMutation();
  const queryClient = useQueryClient();
  

  const handleUpdateComment = ( isRoot: boolean, val: any) => {
    val = Object.fromEntries(val.entries())
    return updateCommentMutation.mutate(
      {
        id: user?._id! + (Math.floor(Math.random() * 100)).toString(),
        payload: {
          user: user?._id!,
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
    <div className='w-full bg-white rounded-lg border p-1 md:p-3'>
      <h3 className='font-semibold p-1'>Discussion</h3>
      <div className='flex flex-col gap-5 m-3'>
        <div>
            {comments ? (
              <Comments itemIds={rootIds} itemsById={itemsById} />
            ) : error instanceof Error ? (
              <div>error</div>
            ) : (
              <div>Loading ..</div>
            )}
          
        </div>
      </div>

      <div className='flex w-full  items-center justify-center shadow-lg mt-56 mb-4'>
        <form className='w-full max-w-xl bg-white rounded-lg px-4 pt-2 shadow-xl' onSubmit={(e)=>{e.preventDefault(); handleUpdateComment(true, new FormData(e.currentTarget))}}>
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
    </div>
  );
};

export default ()=>(<Wrapper>
  <CommentSection />
</Wrapper>)
