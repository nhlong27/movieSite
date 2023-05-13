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
    <ButtonComponent onClick={handleButtonClick} className={`${styles?.button} font-poppins text-stone-100`}>
      <LazyLoadImageComponent
        styles={{height: styles?.height, width:styles?.width, size: styles?.size, image:styles?.image}}
        path={media.poster_path ?? media.backdrop_path}
      />
      {role === 'buttonMovieCard' ? (
        <div className={styles?.detail ?? 'flex flex-col w-11/12 mt-auto py-2'}>
          <h1 className='truncate flex text-xl tracking-wide ml-0'>{(media as MovieType | SimilarMovieType).title}</h1>
          <div className='flex text-sm text-stone-400 tracking-[0.2rem]'>
            <p>{parseInt((media as MovieType | SimilarMovieType).release_date ?? '404')}</p>
            <p className='font-bold ml-auto text-lime-300'>{media?.vote_average?.toFixed(1)}</p>
          </div>
        </div>
      ) : (
        <div className={styles?.detail ?? 'flex flex-col w-11/12 mt-auto py-2'}>
          <h1 className='truncate flex text-xl tracking-wide ml-0'>{(media as TVType | SimilarTVType).name}</h1>
          <div className=' flex text-sm text-stone-400 tracking-[0.2rem]'>
            <p>
              {(media as TVType | SimilarTVType).first_air_date
                ? parseInt((media as TVType | SimilarTVType).first_air_date ?? '404')
                : 'TV'}
            </p>
            <p className='font-bold ml-auto text-lime-300'>{media.vote_average?.toFixed(1)}</p>
          </div>
        </div>
      )}
    </ButtonComponent>
  );
};

export default ButtonMediaCard;
