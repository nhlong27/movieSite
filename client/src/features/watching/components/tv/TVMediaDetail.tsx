import ErrorComponent from '@/components/handling/ErrorComponent';
import SuspenseComponent from '@/components/handling/SkeletonComponent';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import { TVDetailType } from '../../types';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import AvatarComponent from '@/components/generic/AvatarComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface TVMediaDetailProps {
  role?: string;
}

const TVMediaDetail: React.FC<TVMediaDetailProps> = (props) => {
  const { role } = props;

  const [shouldMoreInformationDisplay, setShouldMoreInformationDisplay] = React.useState(false);

  const { data } = useGetItemDetailQuery();
  return role ? (
    <div className='flex flex-col gap-4'>
      <div>{(data as TVDetailType).overview}</div>
      <div className='grid grid-cols-2'>
        <div>
          <p>Released: {(data as TVDetailType).first_air_date}</p>
          <div>
            Genres: {data?.genres?.map((genre) => genre.name)?.join(', ')}
            <div>
              Language:{' '}
              {(data as TVDetailType).original_language === 'en'
                ? 'English'
                : (data as TVDetailType).original_language}
            </div>
          </div>
          <p>Episode duration: {(data as TVDetailType).episode_run_time} min</p>
          <p>Seasons: {(data as TVDetailType).number_of_seasons}</p>
          <p>Episodes: {(data as TVDetailType).number_of_episodes}</p>
        </div>
        <div>
          <p>Status: {data.status}</p>
          <p>Type: {(data as TVDetailType).type}</p>
          <p>Country: {data?.production_countries?.map((country) => country.name)?.join(', ')}</p>
          <p>
            Production: {data?.production_companies?.map((company) => company.name)?.join(', ')}
          </p>
        </div>
      </div>
      <div className='flex flex-col'>
        <p>Networks </p>
        <ul className='flex flex-wrap gap-4'>
          {(data as TVDetailType)?.networks?.map((network, index) => (
            <li key={index} className='grid place-items-center'>
              <LazyLoadImageComponent
                path={network.logo_path ?? undefined}
                styles={{ image: 'object-contain aspect-1/2 w-[5rem] overflow-hidden', size: 'original' }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col'>
        <p>Created by</p>
        <ul className='flex flex-wrap gap-4'>
          {(data as TVDetailType)?.created_by?.map((creator, index) => (
            <li key={index} className='flex flex-col justify-center items-center'>
              <LazyLoadImageComponent
                  path={creator.profile_path ?? undefined}
                  styles={{ image: 'rounded-full object-contain h-[5rem] w-[5rem] overflow-hidden', size: 'w200' }}
                />
              <p>{creator.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div>
      <h1>{(data as TVDetailType).name}</h1>
      <h2>{(data as TVDetailType).tagline}</h2>
      <h2>{(data as TVDetailType).vote_average}</h2>
      <p>{(data as TVDetailType).overview}</p>
      <p>Released: {(data as TVDetailType).first_air_date}</p>
      <div>
        Genres: {data?.genres?.map((genre) => genre.name)?.join(', ')}
        <div>
          Language:{' '}
          {(data as TVDetailType).original_language === 'en'
            ? 'English'
            : (data as TVDetailType).original_language}
        </div>
      </div>
      <p>Episode duration: {(data as TVDetailType).episode_run_time} min</p>
      <p>Seasons: {(data as TVDetailType).number_of_seasons}</p>
      <p>Episodes: {(data as TVDetailType).number_of_episodes}</p>

      {shouldMoreInformationDisplay ? null : (
        <ButtonComponent
          className='border-t-2 border-gray-200 w-full text-left'
          onClick={() => setShouldMoreInformationDisplay(true)}
        >
          More..
        </ButtonComponent>
      )}
      <div
        className={`${
          shouldMoreInformationDisplay ? 'h-[30rem] border-t-2 border-gray-200' : 'h-0'
        }  overflow-y-scroll transition-all duration-300`}
      >
        <p>Status: {data.status}</p>
        <p>Type: {(data as TVDetailType).type}</p>
        <p>Country: {data?.production_countries?.map((country) => country.name)?.join(', ')}</p>
        <p>Production: {data?.production_companies?.map((company) => company.name)?.join(', ')}</p>
        <div className='flex flex-col'>
          <p>Networks </p>
          <ul className='flex flex-wrap gap-4'>
            {(data as TVDetailType)?.networks?.map((network, index) => (
              <li key={index} className='grid place-items-center'>
                <LazyLoadImageComponent
                  path={network.logo_path ?? undefined}
                  styles={{ image: ' object-contain aspect-1/2 w-[5rem] overflow-hidden', size: 'w200' }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className='flex flex-col'>
          <p>Created by</p>
          <ul className='flex flex-wrap gap-4'>
            {(data as TVDetailType)?.created_by?.map((creator, index) => (
              <li key={index} className='flex flex-col justify-center items-center'>
                <LazyLoadImageComponent
                  path={creator.profile_path ?? undefined}
                  styles={{ image: 'rounded-full object-contain h-[5rem] w-[5rem] overflow-hidden', size: 'w200' }}
                />
                <p>{creator.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {shouldMoreInformationDisplay ? (
        <ButtonComponent onClick={() => setShouldMoreInformationDisplay(false)}>
          Less..
        </ButtonComponent>
      ) : null}
    </div>
  );
};

export default TVMediaDetail;
