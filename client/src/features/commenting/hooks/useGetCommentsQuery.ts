import { useQuery } from '@tanstack/react-query';
import { getCommentsQuery } from '../queries';
import { CommentsResponseType } from '../types';

const useGetCommentsQuery = () => {
  let { data, error, isLoading } = useQuery<CommentsResponseType>({...getCommentsQuery()});
  return { data, error, isLoading };
};

export { useGetCommentsQuery };
