import React from 'react';
import ButtonComponent from '../generic/ButtonComponent';
import { MovieType, TVType } from '@/types/types';
import LazyLoadImageComponent from '../handling/LazyLoadImageComponent';
import { ShowQueryResponseType } from '@/features/profile/types';
import { Link } from 'react-router-dom';

interface SimpleShowCardProps {
  item: MovieType | TVType | ShowQueryResponseType;
  handleClick?: () => void;
  options?: { [key: string]: any };
  mediaType: string;
  role?: string;
}

const SimpleShowCard: React.FC<SimpleShowCardProps> = (props) => {
  const { mediaType, item, options, handleClick, role } = props;
  return role === 'button' ? (
    <ButtonComponent onClick={handleClick} className={options?.wrapperComponent?.className}>
      <LazyLoadImageComponent
        className={`${
          options?.lazyImageComponent?.className ?? 'object-cover rounded-md h-full aspect-[10/14]'
        }`}
        path={options?.lazyImageComponent?.path ?? item.poster_path}
        size={options?.lazyImageComponent?.size}
      />
      <div className={`${options?.overviewComponent?.className}`}>
        <div className='truncate'>
          {mediaType === 'movie' ? (item as MovieType).title : (item as TVType).name}
        </div>
        <div className='flex justify-between'>
          <div>{(item as MovieType | TVType).vote_average}</div>
          <div>
            {mediaType === 'movie'
              ? (item as MovieType).release_date
              : (item as TVType).first_air_date}
          </div>
        </div>
      </div>
    </ButtonComponent>
  ) : (
    <Link
      to={`/${mediaType}/${item.id}`}
      onClick={handleClick}
      className={options?.wrapperComponent?.className}
    >
      <LazyLoadImageComponent
        className='object-cover
                  rounded-md 
                  h-full
                  aspect-[10/14]'
        path={options?.lazyImageComponent?.path ?? item.poster_path}
        size={options?.lazyImageComponent?.size}
      />
      <div className={`${options?.overviewComponent?.className}`}>
        <div className='truncate'>
          {mediaType === 'movie' ? (item as MovieType).title : (item as TVType).name}
        </div>
        <div>{(item as MovieType | TVType).vote_average}</div>
        {/* <div>
          {mediaType === 'movie'
            ? (item as MovieType).release_date
            : (item as TVType).first_air_date}
        </div> */}
      </div>
    </Link>
  );
};

export default SimpleShowCard;
