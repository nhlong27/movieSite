import React from 'react';
import CommentItem from './CommentItem';
import { CommentType } from './types';

const Comments = ({
  mediaId,
  itemIds,
  itemsById,
  options,
}: {
  mediaId: string
  itemIds?: string[];
  itemsById: Record<string, CommentType>;
  options?: Record<string, any>;
}) => {
  return (
    <>
      {itemIds?.map((id) => (
        <React.Fragment key={id}>
          {!options?.isRoot && <div className='text-slate-900 pl-14 text-left dark:text-yellow-50'>|</div>}
          <CommentItem key={id} itemId={id} mediaId={mediaId} itemsById={itemsById} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Comments;
