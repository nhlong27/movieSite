import React from 'react';
import LazyLoadImageComponent from '../handling/LazyLoadImageComponent';
import { Link } from 'react-router-dom';
import { MovieType, TVType } from '@/types/types';
import { SimilarMovieType, SimilarTVType } from '@/features/watching/types';

interface LinkMediaCardProps {
  media: MovieType | TVType | SimilarTVType | SimilarMovieType;
  styles?: Record<string, string>;
  role?: 'linkMovieCard' | 'linkTVCard';
}

const LinkMediaCard: React.FC<LinkMediaCardProps> = (props) => {
  const { media, styles, role } = props;

  return role === 'linkMovieCard' ? (
    <Link
      to={`/movie/${media.id}`}
      className={
        styles?.link ?? 'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col'
      }
    >
      <LazyLoadImageComponent
        styles={{
          height: styles?.height,
          width: styles?.width,
          size: styles?.size ?? 'w200',
          image: 'h-[300px] overflow-hidden bg-gradient-to-tr from-white to-black',
        }}
        path={media.poster_path ?? media.backdrop_path}
      />
      <div className={styles?.detail ?? 'mt-auto flex flex-col w-full'}>
        <h1 className='truncate'>{(media as MovieType | SimilarMovieType).title}</h1>
        <div className='flex justify-between'>
          <p>{(media as MovieType | SimilarMovieType).release_date ? parseInt((media as MovieType | SimilarMovieType).release_date ?? '404') : 'Movie'}</p>
          <p>{media?.vote_average?.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  ) : (
    <Link
      to={`/tv/${media.id}`}
      className={
        styles?.link ?? 'min-h-[320px] w-[200px] overflow-hidden flex justify-center items-center flex-col'
      }
    >
      <LazyLoadImageComponent
        styles={{
          height: styles?.height,
          width: styles?.width,
          size: styles?.size ?? 'w200',
          image: 'h-[300px] overflow-hidden bg-gradient-to-tr from-white to-black',
        }}
        path={media.poster_path ?? media.backdrop_path}
      />
      <div className={styles?.detail ?? 'mt-auto flex flex-col w-full'}>
        <h1 className='truncate'>{(media as TVType | SimilarTVType).name}</h1>
        <div className='flex justify-between'>
          <p>
            {(media as TVType | SimilarTVType).first_air_date
              ? parseInt((media as TVType | SimilarTVType).first_air_date ?? '404')
              : 'TV'}
          </p>
          <p>{media.vote_average?.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
};

export default LinkMediaCard;
