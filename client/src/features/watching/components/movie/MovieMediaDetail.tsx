import ErrorComponent from '@/components/handling/ErrorComponent';
import SuspenseComponent from '@/components/handling/SkeletonComponent';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import { MovieDetailType } from '../../types';

interface MovieMediaDetailProps {
  role?: string;
}
const MovieMediaDetail: React.FC<MovieMediaDetailProps> = (props) => {
  const { role } = props;
  const { data } = useGetItemDetailQuery();
  return role ? (
    <div className='flex flex-col gap-4'>
      <div>{(data as MovieDetailType).overview}</div>
      <div className='flex justify-start items-start'>
        <div>
          <p>Released: {(data as MovieDetailType).release_date}</p>
          <div>
            Genres: {data?.genres?.map((genre) => genre.name)?.join(', ')}
            <div>
              Language:{' '}
              {(data as MovieDetailType).original_language === 'en'
                ? 'English'
                : (data as MovieDetailType).original_language}
            </div>
          </div>
          <p>Duration: {(data as MovieDetailType).runtime} min</p>
          <p>
            Budget:{' '}
            {(data as MovieDetailType).budget
              ? Math.floor((data as MovieDetailType).budget! / 1000000)
              : 'No information'}{' '}
            mil
          </p>
          <p>
            Revenue:{' '}
            {(data as MovieDetailType).revenue
              ? Math.floor((data as MovieDetailType).revenue! / 1000000)
              : 'No information'}{' '}
            mil
          </p>
        </div>
        <div>
          <p>Status: {data.status}</p>
          <p>Country: {data?.production_countries?.map((country) => country.name)?.join(', ')}</p>
          <p>
            Production: {data?.production_companies?.map((company) => company.name)?.join(', ')}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>{(data as MovieDetailType).title}</h1>
      <h2>{(data as MovieDetailType).tagline}</h2>
      <h2>{(data as MovieDetailType).vote_average}</h2>
      <p>{(data as MovieDetailType).overview}</p>
      <p>Released: {(data as MovieDetailType).release_date}</p>
      <div>
        Genres: {data?.genres?.map((genre) => genre.name)?.join(', ')}
        <div>
          Language:{' '}
          {(data as MovieDetailType).original_language === 'en'
            ? 'English'
            : (data as MovieDetailType).original_language}
        </div>
      </div>
      <p>Duration: {(data as MovieDetailType).runtime} min</p>
      <p>
        Budget:{' '}
        {(data as MovieDetailType).budget
          ? Math.floor((data as MovieDetailType).budget! / 1000000)
          : 'No information'}{' '}
        mil
      </p>
      <p>
        Revenue:{' '}
        {(data as MovieDetailType).revenue
          ? Math.floor((data as MovieDetailType).revenue! / 1000000)
          : 'No information'}{' '}
        mil
      </p>
      <p>Status: {data.status}</p>
      <p>Country: {data?.production_countries?.map((country) => country.name)?.join(', ')}</p>
      <p>Production: {data?.production_companies?.map((company) => company.name)?.join(', ')}</p>
    </div>
  );
};

export default MovieMediaDetail;
