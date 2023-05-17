import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import React from 'react';
import { useSectionBackdropItemsStore } from '../../stores';
import { MovieType, TVType } from '@/types/types';
import { mediaTypeConfig } from '../../queries';
import { imageHelper } from '@/config/images';

const SectionBackdrop = ({ mediaType, section }: { mediaType?: string; section?: string }) => {
  const sectionBackdropItemStore = useSectionBackdropItemsStore();
  const sectionBackdropItem = sectionBackdropItemStore.getSectionBackdropItem(section!);
  return (
    <div className=' absolute aspect-[18/9] top-0 w-full flex z-0 items-top overflow-hidden'>
      <LazyLoadImageComponent
        path={sectionBackdropItem?.backdrop_path ?? imageHelper.backdrop}
        styles={{
          size: sectionBackdropItem?.backdrop_path ? 'original' : undefined,
          image:
            'ml-[25%] object-left sm:object-scale-down lg:h-full aspect-[18/9] mix-blend-overlay  lg:rounded-l-full overflow-hidden',
        }}
      />
      <div className='ml-[25%] absolute  xs:bg-gradient-radial-top-right  ring-2 ring-stone-800 from-transparent via-stone-800 to-stone-900 h-full aspect-[18/9] rounded-l-full dark:rounded-l-none' />

      <div className=' ring-2 ring-stone-200 h-5/6 via-stone-300 bg-gradient-to-t from-stone-200 shadow-xl lg:rounded-3xl to-stone-400 absolute bottom-0 w-2/5 ml-8  flex flex-col z-20 lg:py-8  font-poppins dark:ring-stone-900 dark:from-transparent dark:to-amber-400 dark:via-amber-400'>
        <div className='w-full xs:pl-0 md:pl-4 lg:pl-16 flex flex-col lg:pr-8'>
          <div className='text-3xl font-black text-stone-900 -tracking-wider py-2'>
            {mediaType === 'movie'
              ? (sectionBackdropItem as MovieType)?.title
              : (sectionBackdropItem as TVType)?.name}
          </div>
          <div className='text-lg tracking-[0.2rem] font-bold text-stone-200 flex items-center dark:text-stone-700'>
            {new Date(
              mediaType === 'movie'
                ? (sectionBackdropItem as MovieType)?.release_date!
                : (sectionBackdropItem as TVType)?.first_air_date!,
            ).getFullYear()}
            <div className='ml-auto flex items-center rounded-lg bg-stone-600 px-4 py-2 dark:bg-stone-900'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-amber-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Rating star</title>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
              </svg>
              <p className='ml-2 text-[1.3rem] text-lime-300 font-bold'>
                {(sectionBackdropItem?.vote_average ?? 0).toFixed(1)}
              </p>
            </div>
          </div>
          <div></div>
          <div className='flex justify-start gap-4 flex-wrap text-lg py-2'>
            {sectionBackdropItem?.genre_ids?.map((genreId) => {
              return (
                <span
                  className='rounded-lg ring-2 ring-stone-500 px-2 bg-stone-300 text-stone-700 dark:bg-yellow-400 dark:ring-stone-800 dark:text-stone-900'
                  key={genreId}
                >
                  {mediaTypeConfig[
                    `${mediaType}` as keyof typeof mediaTypeConfig
                  ].discover.paramList.with_genres?.get(genreId)}
                </span>
              );
            })}
          </div>
        </div>

        <div className='w-full xs:pl-0 md:pl-4 lg:pl-16 flex flex-col lg:pr-8 mt-4 border-t-2 dark:bg-yellow-500 dark:border-stone-600'>
          <div className='grow w-full overflow-scroll scrollbar-hide text-lg text-stone-800 font-bold py-4 mt-4'>
            {sectionBackdropItem?.overview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBackdrop;
