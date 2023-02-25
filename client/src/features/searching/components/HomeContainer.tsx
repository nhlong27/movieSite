import Wrapper from '@/components/ui/Wrapper';
import React from 'react';
import AiringSection from './home/AiringSection';
import ComingSoonSection from './home/ComingSoonSection';
import TrendingSection from './home/TrendingSection';

const HomeContainer = () => {
  return (
    <div>
      Trending:
      <TrendingSection />
      Coming Soon:
      <ComingSoonSection />
      Airing:
      <AiringSection />
    </div>
  );
};

export default () => (
  <Wrapper>
    <HomeContainer />
  </Wrapper>
);
