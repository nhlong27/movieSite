import React from 'react';
import CommentItem from './CommentItem';
import { CommentType } from './types';

const Comments = ({
  itemIds,
  itemsById,
  options,
}: {
  itemIds?: string[];
  itemsById: Record<string, CommentType>;
  options?: Record<string, any>;
}) => {
  return (
    <>
      {itemIds?.map((id) => (
        <React.Fragment key={id}>
          {!options?.isRoot && <div className='text-stone-800 font-bold pl-14 text-left dark:text-yellow-50'>|</div>}
          <CommentItem key={id} itemId={id} itemsById={itemsById} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Comments;
