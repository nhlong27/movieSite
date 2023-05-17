import React from 'react';
import LazyLoadImageComponent from '../handling/LazyLoadImageComponent';
import { Link } from 'react-router-dom';
import { MovieType, TVType } from '@/types/types';
import { SimilarMovieType, SimilarTVType } from '@/features/watching/types';
import { imageHelper } from '@/config/images';

interface LinkMediaCardProps {
  media: MovieType | TVType | SimilarTVType | SimilarMovieType;
  styles?: Record<string, any>;
  role?: 'linkMovieCard' | 'linkTVCard' | 'linkMultipleCard';
}

const LinkMediaCard: React.FC<LinkMediaCardProps> = (props) => {
  const { media, styles, role } = props;

  return role === 'linkMovieCard' ? (
    <Link
      to={`/movie/${media.id}`}
      className={
        styles?.link ??
        'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col'
      }
    >
      <LazyLoadImageComponent
        styles={{
          height: styles?.height,
          width: styles?.width,
          size: styles?.size,
          image:
            styles?.image ?? 'h-[300px] overflow-hidden bg-gradient-to-tr from-white to-black ',
        }}
        path={media.poster_path ?? imageHelper.poster}
      />
      <div className={styles?.detail ?? 'flex flex-col w-11/12 mt-auto py-2'}>
        <h1 className='truncate font-poppins font-bold text-xl tracking-wide dark:text-stone-900'>
          {(media as MovieType | SimilarMovieType).title}
        </h1>
        <div className='flex justify-between font-poppins text-stone-500 font-extrabold text-base'>
          <p className='tracking-[0.3rem] dark:text-stone-800'>
            {(media as MovieType | SimilarMovieType).release_date
              ? parseInt((media as MovieType | SimilarMovieType).release_date ?? '404')
              : 'Movie'}
          </p>
          <div className='px-2 bg-amber-100 rounded-lg shadow-md text-xl grid place-items-center text-yellow-600 font-black  tracking-[0.1rem] dark:text-yellow-500 dark:bg-stone-900'>
            {media?.vote_average?.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  ) : role === 'linkTVCard' ? (
    <Link
      to={`/tv/${media.id}`}
      className={
        styles?.link ??
        'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col'
      }
    >
      <LazyLoadImageComponent
        styles={{
          height: styles?.height,
          width: styles?.width,
          size: styles?.size,
          image: styles?.image ?? 'h-[300px] overflow-hidden bg-gradient-to-tr from-white to-black',
        }}
        path={media.poster_path ?? imageHelper.poster}
      />
      <div className={styles?.detail ?? 'flex flex-col w-11/12 mt-auto py-2'}>
        <h1 className='truncate font-poppins font-bold text-xl text-stone-600 tracking-wide dark:text-stone-900'>
          {(media as TVType | SimilarTVType).name}
        </h1>
        <div className='flex justify-between font-poppins text-stone-500 font-extrabold text-base'>
          <p className='tracking-[0.3rem] dark:text-stone-800'>
            {(media as TVType | SimilarTVType).first_air_date
              ? parseInt((media as TVType | SimilarTVType).first_air_date ?? '404')
              : 'TV'}
          </p>
          <p className='px-2 bg-amber-100 rounded-lg shadow-md text-xl grid place-items-center text-yellow-600 font-black  tracking-[0.1rem] dark:text-yellow-500 dark:bg-stone-900'>
            {media.vote_average?.toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <Link
      to={(media as any).media_type === 'movie' ? `/movie/${media.id}` : `/tv/${media.id}`}
      className={
        'h-full w-[500px] overflow-hidden flex justify-center items-center flex-col rounded-md bg-stone-200 dark:bg-stone-900 relative'
      }
    >
      <LazyLoadImageComponent
        styles={{
          height: styles?.height,
          width: '500px',
          size: 'original',
          image:
            styles?.image ??
            'h-[300px] overflow-hidden bg-gradient-to-tr from-white to-black dark:from-yellow-500',
        }}
        path={media.backdrop_path ?? imageHelper.backdrop}
      />
      <div className={styles?.detail ?? 'flex flex-col w-11/12 mt-auto py-6'}>
        {(media as any).media_type === 'movie' ? (
          <h1 className='truncate font-poppins font-bold text-2xl text-stone-600 tracking-wide dark:text-yellow-500 '>
            {(media as any).title}
          </h1>
        ) : (
          <h1 className='truncate font-poppins font-bold text-2xl text-stone-600 dark:text-yellow-500 tracking-wide'>
            {(media as any).name}
          </h1>
        )}
        <div className='flex justify-between font-poppins text-stone-500 dark:text-yellow-600 font-extrabold text-lg'>
          <p>
            Last updated:{' '}
            <span className=' font-bold'>
              {new Date(Date.parse((media as any).updatedAt)).toLocaleString('sv')}
            </span>
          </p>
        </div>
      </div>
      <div className='absolute top-0 h-full w-full z-30 grid place-items-center hover:bg-stone-900  hover:bg-opacity-70 text-xl font-poppins font-black uppercase tracking-wider opacity-0 hover:opacity-100 text-stone-300 '>
        Play
      </div>
    </Link>
  );
};

export default LinkMediaCard;
