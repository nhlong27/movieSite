import { useQuery } from '@tanstack/react-query';
import { getReviewListQuery } from '../queries';

export const useGetReviewListQuery = (itemId?: number, mediaType?: string) => {
  return useQuery(getReviewListQuery(itemId, mediaType));
};
