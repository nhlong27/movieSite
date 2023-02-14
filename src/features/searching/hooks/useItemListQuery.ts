import { useQuery } from '@tanstack/react-query';
import { getItemListQuery } from '../queries';

export const useItemListQuery = (query? : string ) => {
  return useQuery(getItemListQuery(query));
};
