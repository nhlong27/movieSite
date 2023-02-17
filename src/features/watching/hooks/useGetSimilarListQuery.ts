import { useQuery } from '@tanstack/react-query';
import { getSimilarListQuery } from '../queries';

export const useGetSimilarListQuery = (itemId?: number, mediaType?: string) => {
  return useQuery(getSimilarListQuery(itemId, mediaType));
};
