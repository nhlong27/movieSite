import Wrapper from '@/components/ui/Wrapper';
import React from 'react';
import { useGetItemExtraQuery } from '../hooks/useGetItemExtraQuery';
import { SimilarMovieType, SimilarTVType } from '../types';

const SimilarListComponent: React.FC = () => {
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
    <SimilarListComponent />
  </Wrapper>
);
