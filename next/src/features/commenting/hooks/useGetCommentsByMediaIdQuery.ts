import { useQuery } from '@tanstack/react-query';
import { CommentsResponseType } from '../types';
import { getCommentsByMediaIdQuery } from '../queries';

const useGetCommentsByMediaIdQuery = (mediaId: string) => {
  let { data, error, isLoading } = useQuery<CommentsResponseType>({
    ...getCommentsByMediaIdQuery(mediaId),
  });
  return { data, error, isLoading };
};

export { useGetCommentsByMediaIdQuery };
