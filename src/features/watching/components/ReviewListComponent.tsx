import { useAtom } from 'jotai';
import React from 'react';
import { movieDetailAtom, tvDetailAtom } from '../atoms';
import { useGetReviewListQuery } from '../hooks/useGetReviewListQuery';

interface ReviewListComponentProps {
  role: 'tv' | 'movie';
}
const ReviewListComponent: React.FC<ReviewListComponentProps> = (props) => {
  return props.role === 'movie' ? <MovieReviewList /> : <TVReviewList />;
};

const MovieReviewList = () => {
  const [movieDetail] = useAtom(movieDetailAtom);
  const { data: reviewList } = useGetReviewListQuery(movieDetail?.id, 'movie');
  return <div>{reviewList && 'success'}</div>;
};

const TVReviewList = () => {
  const [tvDetail] = useAtom(tvDetailAtom);
  const { data: reviewList } = useGetReviewListQuery(tvDetail?.id, 'tv');
  return <div>{reviewList && 'success'}</div>;
};

export default ReviewListComponent;
