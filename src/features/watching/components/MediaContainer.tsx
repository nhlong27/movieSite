import Wrapper from '@/components/ui/Wrapper';
import React from 'react';
import { useGetItemExtraQuery } from '../hooks/useGetItemExtraQuery';
import BackdropComponent from './BackdropComponent';
import ItemOverview from './ItemOverview';
import MediaPlayerComponent from './player/MediaPlayerComponent';
import PosterComponent from './PosterComponent';
import SeasonSelectComponent from './SeasonSelectComponent';
import SimilarListComponent from './sections/SimilarListSection';
import TrailerListComponent from './TrailerListComponent';

const MediaContainer: React.FC = () => {
  const [isReady, setIsReady] = React.useState(false);
  const { params } = useGetItemExtraQuery();

  return (
    <>
      <BackdropComponent />
      <PosterComponent />
      <ItemOverview />
      {params.type === 'tv' && <SeasonSelectComponent />}

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
