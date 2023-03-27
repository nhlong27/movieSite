import { useQuery } from '@tanstack/react-query';
import { getUser, getUserQuery } from '../queries';
import { UserQueryResponseType } from '../types';

const useUserQuery = () => {
  const { data, error, isLoading } = useQuery<UserQueryResponseType>({...getUserQuery()});
  return { data, error, isLoading };
};

export { useUserQuery };
