import {
  AiringSection,
  ComingSoonSection,
  ExtraSection,
  TrendingSection,
} from '@/features/searching';
import WatchHistorySection from '@/features/searching/components/home/WatchHistorySection';
import React from 'react';

const HomePage = () => {
  return (
    <div className='w-full max-w-[1920px] min-w-[300px] flex flex-col justify-center items-center gap-8 py-8'>
      <TrendingSection />
      <WatchHistorySection />
      <ComingSoonSection />
      <AiringSection />
      <ExtraSection />
    </div>
  );
};

export default HomePage;
