import { useQuery } from '@tanstack/react-query';
import {  getShowQuery } from '../queries';
import { ShowQueryResponseType } from '../types';

const useGetShowQuery = (id: string) => {
  const { data, error, isLoading } = useQuery<ShowQueryResponseType>({ ...getShowQuery(id) });
  return { data, error, isLoading };
};

export { useGetShowQuery };
