import React from 'react';
import ButtonComponent from '../generic/ButtonComponent';
import LazyLoadImageComponent from '../handling/LazyLoadImageComponent';
import { Link } from 'react-router-dom';

interface MediaCardProps<T> {
  media: T;
  handleClick?: () => void;
  options?: { [key: string]: any };
  mediaType: string;
  role?: string;
}

function MediaCard<T extends object>(props: MediaCardProps<T>) {
  const { mediaType, media, options, handleClick, role } = props;

  return role === 'button' ? (
    <ButtonComponent onClick={handleClick} className={options?.wrapperComponent?.className}>
      <LazyLoadImageComponent
        className={`${
          options?.lazyImageComponent?.className ?? 'object-cover rounded-md h-full aspect-[10/14]'
        }`}
        path={options?.lazyImageComponent?.path ?? (media as any).poster_path}
        size={options?.lazyImageComponent?.size}
      />
      {mediaType === 'movie' ? (
        <div className={`${options?.overviewComponent?.className} flex flex-col w-full`}>
          <h1 className='truncate'>{(media as any).title}</h1>
          <div className='flex justify-between'>
            <p>{(media as any).release_date ? parseInt((media as any).release_date) : 'TV'}</p>
            <p>{(media as any).vote_average.toFixed(1)}</p>
          </div>
        </div>
      ) : (
        <div className={`${options?.overviewComponent?.className} flex flex-col w-full`}>
          <h1 className='truncate'>{(media as any).name}</h1>
          <div className='flex justify-between'>
            <p>{(media as any).first_air_date ? parseInt((media as any).first_air_date) : 'TV'}</p>
            <p>{(media as any).vote_average.toFixed(1)}</p>
          </div>
        </div>
      )}
    </ButtonComponent>
  ) : (
    <Link
      to={`/${mediaType}/${(media as any).id}`}
      onClick={handleClick}
      className={options?.wrapperComponent?.className}
    >
      <LazyLoadImageComponent
        className='object-cover
                  rounded-md 
                  h-full
                  aspect-[10/14]'
        path={options?.lazyImageComponent?.path ?? (media as any).poster_path}
        size={options?.lazyImageComponent?.size}
      />
      {mediaType === 'movie' ? (
        <div className={`${options?.overviewComponent?.className} flex flex-col w-full`}>
          <h1 className='truncate'>{(media as any).title}</h1>
          <div className='flex justify-between w-full'>
            <p>{(media as any).release_date ? parseInt((media as any).release_date) : 'Movie'}</p>
            <p>{(media as any).vote_average.toFixed(1)}</p>
          </div>
        </div>
      ) : (
        <div className={`${options?.overviewComponent?.className} flex flex-col w-full`}>
          <h1 className='truncate'>{(media as any).name}</h1>
          <div className='flex justify-between w-full'>
            <div>{(media as any).first_air_date ? parseInt((media as any).first_air_date) : 'TV'}</div>
            <div>{(media as any).vote_average.toFixed(1)}</div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default MediaCard;
