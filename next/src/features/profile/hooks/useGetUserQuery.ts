import { useQuery } from '@tanstack/react-query';
import { getUserQuery } from '../queries';
import { UserQueryResponseType } from '../types';

const useGetUserQuery = () => {
  const { data, error, isLoading } = useQuery<UserQueryResponseType>({
    ...getUserQuery(),
  });
  return { data, error, isLoading };
};

export { useGetUserQuery };
