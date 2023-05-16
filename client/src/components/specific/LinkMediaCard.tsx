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
      <div className={styles?.detail ?? 'mt-auto flex flex-col w-full '}>
        <h1 className='truncate font-poppins font-bold text-lg text-stone-600 tracking-wide'>
          {(media as MovieType | SimilarMovieType).title}
        </h1>
        <div className='flex justify-between font-poppins text-stone-500 font-extrabold text-xs'>
          <p className='tracking-[0.3rem]'>
            {(media as MovieType | SimilarMovieType).release_date
              ? parseInt((media as MovieType | SimilarMovieType).release_date ?? '404')
              : 'Movie'}
          </p>
          <div className='px-2 bg-amber-100 rounded-lg shadow-md text-xl grid place-items-center text-yellow-600 font-black  tracking-[0.1rem]'>
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
      <div className={styles?.detail ?? 'mt-auto flex flex-col w-full'}>
        <h1 className='truncate font-poppins font-bold text-lg text-stone-600 tracking-wide'>{(media as TVType | SimilarTVType).name}</h1>
        <div className='flex justify-between font-poppins text-stone-500 font-extrabold text-xs'>
          <p className='tracking-[0.3rem]'>
            {(media as TVType | SimilarTVType).first_air_date
              ? parseInt((media as TVType | SimilarTVType).first_air_date ?? '404')
              : 'TV'}
          </p>
          <p className='px-2 bg-amber-100 rounded-lg shadow-md text-xl grid place-items-center text-yellow-600 font-black  tracking-[0.1rem]'>{media.vote_average?.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  ) : (
    <Link
      to={(media as any).media_type === 'movie' ? `/movie/${media.id}` : `/tv/${media.id}`}
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
      <div className={styles?.detail ?? 'mt-auto flex flex-col w-full'}>
        {(media as any).media_type === 'movie' ? (
          <h1 className='truncate font-poppins font-bold text-lg text-stone-600 tracking-wide'>{(media as any).title}</h1>
        ) : (
          <h1 className='truncate font-poppins font-bold text-lg text-stone-600 tracking-wide'>{(media as any).name}</h1>
        )}
        <div className='flex justify-between font-poppins text-stone-500 font-extrabold text-sm'>
          <p>
            Last updated:{' '}
            <span className='text-stone-600 font-bold'>
              {new Date(Date.parse((media as any).updatedAt)).toLocaleString('sv')}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LinkMediaCard;
