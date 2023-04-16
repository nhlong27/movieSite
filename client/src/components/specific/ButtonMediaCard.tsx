import React from 'react';
import ButtonComponent from '../generic/ButtonComponent';
import LazyLoadImageComponent from '../handling/LazyLoadImageComponent';
import { MovieType, TVType } from '@/types/types';
import { SimilarMovieType } from '@/features/watching/types';
import { SimilarTVType } from '@/features/watching/types';

interface ButtonMediaCardProps {
  media: MovieType | TVType | SimilarMovieType | SimilarTVType;
  handleButtonClick?: () => void;
  styles?: Record<string, string>;
  role?: 'buttonMovieCard' | 'buttonTVCard';
}

const ButtonMediaCard: React.FC<ButtonMediaCardProps> = (props) => {
  const { media, styles, handleButtonClick, role } = props;

  return (
    <ButtonComponent onClick={handleButtonClick} className={styles?.button}>
      <LazyLoadImageComponent
        styles={{height: styles?.height, width:styles?.width, size: styles?.size, image:styles?.image}}
        path={media.poster_path ?? media.backdrop_path}
      />
      {role === 'buttonMovieCard' ? (
        <div className={styles?.detail ?? 'flex flex-col w-full mt-auto'}>
          <h1 className='truncate'>{(media as MovieType | SimilarMovieType).title}</h1>
          <div className='flex justify-between'>
            <p>{parseInt((media as MovieType | SimilarMovieType).release_date ?? '404')}</p>
            <p>{media?.vote_average?.toFixed(1)}</p>
          </div>
        </div>
      ) : (
        <div className={styles?.detail ?? 'flex flex-col w-full mt-auto'}>
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
      )}
    </ButtonComponent>
  );
};

export default ButtonMediaCard;
