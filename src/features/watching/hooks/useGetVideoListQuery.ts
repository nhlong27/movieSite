import { useQuery } from '@tanstack/react-query';
import { getVideoListQuery } from '../queries';

export const useGetVideoListQuery = (itemId?: number, mediaType?: string) => {
  const {data} = useQuery(getVideoListQuery(itemId, mediaType));
};
