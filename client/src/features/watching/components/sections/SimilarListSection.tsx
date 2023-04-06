import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useGetItemExtraQuery } from '../../hooks/useGetItemExtraQuery';
import { SimilarMovieType, SimilarTVType } from '../../types';

const SimilarListSection: React.FC = () => {
  const { data } = useGetItemExtraQuery();
  return (
    <div>
      {data.similar.results?.map((similar: SimilarMovieType | SimilarTVType, index) => {
        return <div key={index}>Similar component</div>;
      })}
    </div>
  );
};

export default () => (
  <Wrapper>
    <SimilarListSection />
  </Wrapper>
);
