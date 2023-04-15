import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import React from 'react';
import { useSectionBackdropItemsStore } from '../../stores';
import { MovieType, TVType } from '@/types/types';
import { mediaTypeConfig } from '../../queries';
import ButtonComponent from '@/components/generic/ButtonComponent';

const SectionBackdrop = ({ mediaType, section }: { mediaType?: string; section?: string }) => {
  const sectionBackdropItemStore = useSectionBackdropItemsStore();
  const sectionBackdropItem = sectionBackdropItemStore.getSectionBackdropItem(section!);
  return (
    <div className=' absolute aspect-[18/9] top-0 w-full flex z-0 items-top overflow-hidden'>
      <LazyLoadImageComponent
        path={sectionBackdropItem?.backdrop_path ?? sectionBackdropItem?.poster_path}
        className='ml-[25%] object-left sm:object-scale-down lg:h-full aspect-[18/9] mix-blend-overlay'
        size='original'
        effect='blur'
      />
      <div className='ml-[25%] absolute  xs:bg-gradient-radial-top-right ring-2 ring-black from-transparent via-black to-black h-full aspect-[18/9]' />

      <div className='h-5/6 via-black bg-gradient-to-r from-black to-transparent absolute bottom-0 w-2/5 text-white ml-8 xs:pl-0 md:pl-4 lg:pl-16 flex flex-col z-20'>
        <div>
          {mediaType === 'movie' ?(sectionBackdropItem as MovieType)?.title : (sectionBackdropItem as TVType)?.name}
        </div>
        <div className=''>
          {new Date(
            mediaType === 'movie'
              ? (sectionBackdropItem as MovieType)?.release_date!
              : (sectionBackdropItem as TVType).first_air_date!,
          ).getFullYear()}
        </div>
        <div>
          <div className='flex items-center'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-yellow-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Rating star</title>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <p className='ml-2 text-sm font-bold text-gray-900 dark:text-white'>
              {sectionBackdropItem?.vote_average}
            </p>
          </div>
        </div>
        <div className='flex justify-between'>
          {sectionBackdropItem?.genre_ids?.map((genreId, index) => {
            const a = mediaTypeConfig[
              `${mediaType}` as keyof typeof mediaTypeConfig
            ].discover.paramList.with_genres.filter((set: any) => set.id === genreId);
            return <span key={index}>{a[0]?.name}</span>;
          })}
        </div>
        <div>
          <ButtonComponent>Play</ButtonComponent>
          <ButtonComponent>Watch Later</ButtonComponent>
        </div>
        <div className='grow w-full overflow-scroll'>{sectionBackdropItem?.overview} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae doloribus, hic maxime, facilis aut quos numquam saepe distinctio harum doloremque vitae alias inventore, vero amet veniam soluta vel placeat? Tempore perspiciatis nisi quis tempora quam nemo incidunt quas aspernatur reiciendis obcaecati cumque, non animi quo sunt voluptatum ab corrupti repellendus, itaque molestias ipsum maxime? Quae, autem inventore? Eligendi, veniam rem. Facilis aperiam qui veniam nulla suscipit quibusdam voluptates ea, blanditiis nobis expedita voluptatibus eum quisquam cumque beatae! Eveniet atque voluptatibus culpa sed? Minima atque numquam nam minus quibusdam eos accusantium quod, nesciunt eveniet aliquam quas explicabo facilis dolor dolore totam.</div>
      </div>
    </div>
  );
};

export default SectionBackdrop;
