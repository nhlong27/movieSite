import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import MovieMedia from './movie/MovieMedia';
import TVMedia from './tv/TVMedia';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import BackdropComponent from './BackdropComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';

const MediaContainer: React.FC = () => {
  const { params } = useGetItemDetailQuery();
  const { isMd } = useMediaQueries();
  return isMd ? (
    <>
      <BackdropComponent />
      {params.mediaType === 'movie' ? <MovieMedia /> : <TVMedia />}
    </>
  ) : (
    <>{params.mediaType === 'movie' ? <MovieMedia /> : <TVMedia />}</>
  );
};

export default () => (
  <Wrapper>
    <MediaContainer />
  </Wrapper>
);
