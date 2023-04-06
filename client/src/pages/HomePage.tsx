
import { AiringSection, ComingSoonSection, ExtraSection, TrendingSection } from '@/features/searching';
import React from 'react';


const HomePage = () => {
  return (
    <div className='w-full max-w-[1920px] min-w-[300px] flex flex-col justify-center items-center gap-4 '>
      <TrendingSection />
      <ComingSoonSection />
      <AiringSection />
      <ExtraSection />
    </div>
  );
};

export default HomePage;
