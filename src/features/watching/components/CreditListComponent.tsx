import { useAtom } from 'jotai';
import React from 'react';
import { movieDetailAtom, tvDetailAtom } from '../atoms';
import { useGetCreditListQuery } from '../hooks/useGetCreditListQuery';

interface CreditListComponentProps {
  role: 'tv' | 'movie';
}
const CreditListComponent: React.FC<CreditListComponentProps> = (props) => {
  return props.role === 'movie' ? <MovieCreditList /> : <TVCreditList />;
};

const MovieCreditList = () => {
  const [movieDetail] = useAtom(movieDetailAtom);
  const { data: creditList } = useGetCreditListQuery(movieDetail?.id, 'movie');
  return <div>{creditList && 'success'}</div>;
};

const TVCreditList = () => {
  const [tvDetail] = useAtom(tvDetailAtom);
  const { data: creditList } = useGetCreditListQuery(tvDetail?.id, 'tv');
  return <div>{creditList && 'success'}</div>;
};

export default CreditListComponent;
