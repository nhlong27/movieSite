import { useQuery } from '@tanstack/react-query';
import { getMultipleShowsQuery } from '../queries';
import { MultipleShowsQueryResponseType } from '../types';

const useGetMultipleShowsQuery = () => {
  const { data, error, isLoading } = useQuery<MultipleShowsQueryResponseType>({
    ...getMultipleShowsQuery(),
  });
  return { data, error, isLoading };
};

export { useGetMultipleShowsQuery };
