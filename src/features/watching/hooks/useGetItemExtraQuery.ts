import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getItemDetailQuery } from '../queries';
import { CreditListType, ReviewListType, SimilarListType, VideoListType } from '../types';

export const useGetItemExtraQuery = () => {
  const params = useParams();
  const [videos, credits, reviews, similar] = useQueries({
    queries: [
      ...['videos', 'credits', 'reviews', 'similar'].map((query: any) => ({
        ...getItemDetailQuery((params as any).type, params.id, query),
      })),
    ],
  });
  // const data = [...queries.map((query) => query.data)];
  const data = {
    videos: videos.data as VideoListType,
    credits: credits.data as CreditListType,
    reviews: reviews.data as ReviewListType,
    similar: similar.data as SimilarListType,
  };
  return { data, params };
};
