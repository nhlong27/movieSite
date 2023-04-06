import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import MovieMedia from './MovieMedia';
import TVMedia from './TVMedia';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import BackdropComponent from './BackdropComponent';

const MediaContainer: React.FC = () => {
  const { params } = useGetItemDetailQuery();

  return (
    <>
      <BackdropComponent />
      {params.mediaType === 'movie' ? <MovieMedia /> : <TVMedia />}
      {/* <BackdropComponent />
      <PosterComponent />

      <OptionsContainer />

      <ItemOverview />

      <TrailerListComponent />
      <SimilarListComponent /> */}
    </>
  );
};

export default () => (
  <Wrapper>
    <MediaContainer />
  </Wrapper>
);
