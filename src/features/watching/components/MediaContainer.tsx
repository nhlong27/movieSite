import Wrapper from '@/components/ui/Wrapper';
import React from 'react';
import { useGetItemExtraQuery } from '../hooks/useGetItemExtraQuery';
import BackdropComponent from './BackdropComponent';
import ItemOverview from './ItemOverview';
import MediaPlayerComponent from './MediaPlayerComponent';
import PosterComponent from './PosterComponent';
import SimilarListComponent from './SimilarListComponent';
import TrailerListComponent from './TrailerListComponent';

const MediaContainer: React.FC = () => {
  const [isReady, setIsReady] = React.useState(false);
  const { data } = useGetItemExtraQuery();
  return (
    <>
      <BackdropComponent />
      <PosterComponent />
      <ItemOverview />

      <button onClick={() => setIsReady(true)}>Watch</button>
      {isReady && <MediaPlayerComponent />}
      <TrailerListComponent />
      <SimilarListComponent />
    </>
  );
};

export default () => (
  <Wrapper>
    <MediaContainer />
  </Wrapper>
);
