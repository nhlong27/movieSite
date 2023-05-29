import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import React from 'react';
import { useSectionBackdropItemsStore } from '../../stores';
import { MovieType, TVType } from '@/types/types';
import { mediaTypeConfig } from '../../queries';
import { imageHelper } from '@/config/images';

const SectionBackdrop = ({ mediaType, section, styles }: { mediaType?: string; section?: string, styles?: Record<string, string>}) => {
  const sectionBackdropItemStore = useSectionBackdropItemsStore();
  const sectionBackdropItem = sectionBackdropItemStore.getSectionBackdropItem(section!);
  return (
    <div className={`absolute  max-h-[50rem] lg:aspect-[18/9] hidden lg:visible  top-0 w-full lg:flex z-0 items-top overflow-hidden ${styles?.wrapper}`}>
      <LazyLoadImageComponent
        path={sectionBackdropItem?.backdrop_path ?? imageHelper.backdrop}
        styles={{
          size: sectionBackdropItem?.backdrop_path ? 'original' : undefined,
          image:
            'ml-[25%] sm:object-left object-scale-down lg:h-full aspect-[18/9] mix-blend-overlay   lg:rounded-l-full overflow-hidden dark:rounded-none',
        }}
      />
      <div className='ml-[25%] absolute  xs:bg-gradient-radial-top-right  ring-2 ring-stone-800 dark:ring-transparent from-transparent via-stone-900 to-stone-900 h-full aspect-[18/9] rounded-l-full dark:rounded-l-none' />

      <div className='h-4/5 shadow-xl lg:rounded-3xl  absolute bottom-0 w-4/5 ml-8 flex flex-col z-20 lg:py-4 font-poppins bg-gradient-to-r from-stone-900 to-transparent'>
        <div className='w-auto max-w-[40rem] rounded-t-md xs:pl-0 md:pl-4 lg:pl-16 flex flex-col lg:pr-8  pt-4'>
          <div className='text-3xl font-black flex justify-between items-center font-serif text-white  tracking-wider'>
            <div className='truncate grow'>
              {mediaType === 'movie'
                ? (sectionBackdropItem as MovieType)?.title
                : (sectionBackdropItem as TVType)?.name}
            </div>
            <div className='ml-auto flex items-center rounded-lg bg-transparent ring-2 ring-white px-2 py-[2px] dark:bg-stone-900 min-w-[5rem]'>
              <svg
                aria-hidden='true'
                className='w-6 h-6 text-amber-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Rating star</title>
                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
              </svg>
              <p className='ml-2 text-lg tracking-[0.2rem] text-yellow-400 font-poppins font-bold'>
                {(sectionBackdropItem?.vote_average ?? 0).toFixed(1)}
              </p>
            </div>
          </div>

          <div className='text-base tracking-[0.2rem] font-bold text-stone-100 flex items-center py-2 dark:text-stone-100'>
            {new Date(
              mediaType === 'movie'
                ? (sectionBackdropItem as MovieType)?.release_date!
                : (sectionBackdropItem as TVType)?.first_air_date!,
            ).getFullYear()}
            <div className='ml-8 flex justify-start gap-4 flex-wrap text-lg py-0'>
              {sectionBackdropItem?.genre_ids?.map((genreId) => {
                return (
                  <span
                    className='rounded-lg ring-2 md:ring-amber-700 md:bg-yellow-400 md:px-4 font-bold ring-stone-400 text-sm bg-stone-300 text-stone-900 dark:bg-lime-400 dark:text-stone-900 dark:ring-transparent px-4 py-[2px]'
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
          <div></div>
        </div>

        <div className='w-full xs:pl-0 md:pl-4 lg:pl-16 flex flex-col lg:pr-4 overflow-y-scroll h-[30rem] scrollbar-hide '>
          <div className='px-4 grow w-full text-base text-yellow-500 font-bold py-4 scrollbar  shadow-md rounded-xl'>
            {sectionBackdropItem?.overview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionBackdrop;
