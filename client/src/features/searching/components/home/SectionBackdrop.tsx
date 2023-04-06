import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import React from 'react';
import { useSectionBackdropItems } from '../../stores';

const SectionBackdrop = ({ mediaType, section }: { mediaType?: string; section?: string }) => {
  const sectionBackdropItem = useSectionBackdropItems();
  return (
    <div className='absolute aspect-[18/9] top-0 w-full flex items-top overflow-hidden '>
      <LazyLoadImageComponent
        path={
          sectionBackdropItem.getSectionBackdropItem(section!)?.backdrop_path ??
          sectionBackdropItem.getSectionBackdropItem(section!)?.poster_path
        }
        className='ml-[25%] object-left md:object-scale-down lg:h-full aspect-[18/9] mix-blend-overlay'
        size='original'
        effect='blur'
      />
      <div className='ml-[25%] absolute  md:bg-gradient-radial-top-right ring-2 ring-black from-transparent via-black to-black h-full aspect-[18/9]' />

      {/* <div className='w-full truncate '>
        {mediaType === 'movie' ? (heroIndex as MovieType)?.title : (heroIndex as TVType)?.name}
        {heroIndex?.id}
      </div> */}
    </div>
  );
};

export default SectionBackdrop;
