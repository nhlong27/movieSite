import LazyLoadImageComponent from '@/components/ui/LazyLoadImageComponent';
import { MovieType, TVType } from '@/types/types';
import React from 'react';

const HeroSection = ({
  heroIndex,
  mediaType,
}: {
  heroIndex: MovieType | TVType | null;
  mediaType: string;
}) => {
  return (
    <div className='relative lg:w-[110%] w-full lg:-ml-[2vh] h-full lg:h-[110%]  lg:-mt-[2vh] flex items-top overflow-hidden lg:pl-[25%]'>
      <LazyLoadImageComponent
        path={heroIndex?.backdrop_path ?? heroIndex?.poster_path}
        className='w-full lg:object-cover md:object-scale-down object-cover lg:object-left lg:h-[70vh] md:mt-[5rem] lg:mt-0 aspect-[16/9] mix-blend-overlay'
        size='original'
        effect='blur'
      />
      <div className='absolute  lg:bg-gradient-radial-out ring-2 ring-black from-transparent via-black to-black w-full h-[70vh]' />

      {/* <div className='w-full truncate '>
        {mediaType === 'movie' ? (heroIndex as MovieType)?.title : (heroIndex as TVType)?.name}
        {heroIndex?.id}
      </div> */}
    </div>
  );
};

export default HeroSection;
