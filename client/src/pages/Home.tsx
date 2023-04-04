import TrendingSection from '@/features/searching/components/home/TrendingSection';
import React from 'react';
import ComingSoonSection from '@/features/searching/components/home/ComingSoonSection';
import AiringSection from '@/features/searching/components/home/AiringSection';

const Home = () => {
  return (
    <div className='w-full flex justify-center items-center '>
      <div className='w-11/12 max-w-[1536px] min-w-[500px] flex flex-col'>
        <TrendingSection />
        <ComingSoonSection />
      <AiringSection />
      </div>
    </div>
  );
};

export default Home;
