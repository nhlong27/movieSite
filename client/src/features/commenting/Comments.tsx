import React from 'react';
import CommentItem from './CommentItem';
import { CommentType } from './types';

const Comments = ({
  itemIds,
  itemsById,
}: {
  itemIds?: string[];
  itemsById: Record<string, CommentType>;
}) => {
  return (
    <>
      {itemIds?.map((id) => (
        <React.Fragment key={id} >
          <div  className='text-gray-300 font-bold pl-14'>|</div>
          <div className='flex justify-between border ml-5  rounded-md'>
            <CommentItem key={id} itemId={id} itemsById={itemsById} />
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default Comments;
