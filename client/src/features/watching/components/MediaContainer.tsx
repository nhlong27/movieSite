import Wrapper from '@/components/ui/Wrapper';
import React from 'react';
import BackdropComponent from './BackdropComponent';
import ItemOverview from './ItemOverview';
import PosterComponent from './PosterComponent';
import SimilarListComponent from './sections/SimilarListSection';
import TrailerListComponent from './TrailerListComponent';
import OptionsContainer from './OptionsContainer';

const MediaContainer: React.FC = () => {
  return (
    <>
      <BackdropComponent />
      <PosterComponent />

      <OptionsContainer />
      

      <ItemOverview />
      
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
