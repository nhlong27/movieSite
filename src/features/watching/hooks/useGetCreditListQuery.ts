import { useQuery } from '@tanstack/react-query';
import { getCreditListQuery } from '../queries';

export const useGetCreditListQuery = (itemId?: number, mediaType?: string) => {
  return useQuery(getCreditListQuery(itemId, mediaType));
};
