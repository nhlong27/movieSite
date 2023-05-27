import React from 'react';
import ButtonComponent from '../generic/ButtonComponent';
import LazyLoadImageComponent from '../handling/LazyLoadImageComponent';
import { MovieType, TVType } from '@/types/types';
import { SimilarMovieType } from '@/features/watching/types';
import { SimilarTVType } from '@/features/watching/types';
import { imageHelper } from '@/config/images';

interface ButtonMediaCardProps {
  media: MovieType | TVType | SimilarMovieType | SimilarTVType;
  handleButtonClick?: () => void;
  styles?: Record<string, any>;
  role?: 'buttonMovieCard' | 'buttonTVCard';
}

const ButtonMediaCard: React.FC<ButtonMediaCardProps> = (props) => {
  const { media, styles, handleButtonClick, role } = props;

  return (
    <ButtonComponent onClick={handleButtonClick} className={`${styles?.button} font-poppins relative`}>
      <LazyLoadImageComponent
        styles={{height: styles?.height, width:styles?.width, size: styles?.size, image:styles?.image}}
        path={media.poster_path ?? imageHelper.poster}
      />
      {role === 'buttonMovieCard' ? (
        <div className={styles?.detail ?? 'flex flex-col pb-2 absolute  inset-0 bg-gradient-to-t from-stone-900 to-transparent px-4 w-full'}>
          <h1 className='truncate flex mt-auto text-lg tracking-wide ml-0 whitespace-pre-line text-white mb-2'>{(media as MovieType | SimilarMovieType).title}</h1>
          <div className='flex text-sm tracking-[0.2rem]'>
            <p className='text-stone-300'>{parseInt((media as MovieType | SimilarMovieType).release_date ?? '404')}</p>
            <p className='ml-auto px-2 bg-amber-100 rounded-lg shadow-md text-base grid place-items-center text-yellow-600 font-semibold tracking-[0.1rem] dark:bg-stone-900 dark:text-yellow-500'>{media?.vote_average?.toFixed(1)}</p>
          </div>
        </div>
      ) : (
        <div className={styles?.detail ?? 'flex flex-col pb-2 absolute  inset-0 bg-gradient-to-t from-stone-900 to-transparent px-4 w-full'}>
          <h1 className='truncate flex mt-auto text-lg tracking-wide ml-0 whitespace-pre-line text-white mb-2'>{(media as TVType | SimilarTVType).name}</h1>
          <div className=' flex text-sm tracking-[0.2rem]'>
            <p className='text-stone-300'>
              {(media as TVType | SimilarTVType).first_air_date
                ? parseInt((media as TVType | SimilarTVType).first_air_date ?? '404')
                : 'TV'}
            </p>
            <p className='ml-auto px-2 bg-amber-100 rounded-lg shadow-md text-base grid place-items-center text-yellow-600 font-semibold tracking-[0.1rem] dark:bg-stone-900 dark:text-yellow-500'>{media.vote_average?.toFixed(1)}</p>
          </div>
        </div>
      )}
    </ButtonComponent>
  );
};

export default ButtonMediaCard;
