import React from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import { MovieDetailType } from '../../types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import { distributor } from '@/config/images';

interface MovieMediaDetailProps {
  role?: string;
}
const MovieMediaDetail: React.FC<MovieMediaDetailProps> = (props) => {
  const { role } = props;
  const { data } = useGetItemDetailQuery();

  const [animationParentRef] = useAutoAnimate();

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
    <div ref={animationParentRef}>
      <h1 className='truncate font-poppins font-black text-2xl text-stone-700 tracking-wide py-4 md:text-3xl md:uppercase'>
        {(data as MovieDetailType).title}
      </h1>
      <h2 className='rounded-lg bg-stone-300 md:bg-stone-200 py-2 px-4 md:hidden'>
        <div className='h-3 text-3xl text-left text-stone-600'>“</div>
        <p className='px-4 text-base italic text-center text-stone-600'>
          {(data as MovieDetailType).tagline !== ''
            ? (data as MovieDetailType).tagline
            : 'Have you watched Morbius?'}
        </p>
        <div className='h-3 text-3xl text-right text-stone-600'>”</div>
      </h2>
      <div className='flex justify-start gap-4 flex-wrap text-lg py-4 md:py-0'>
        {data?.genres?.map((genre, index) => (
          <span
            className='rounded-lg ring-2 md:ring-amber-700 md:text-amber-800 md:bg-yellow-400 md:bg-opacity-70 md:px-4 font-bold ring-stone-400 px-2 bg-stone-300 text-stone-500'
            key={index}
          >
            {genre.name}
          </span>
        ))}
      </div>
      <div className='text-base  font-bold text-stone-500 flex items-center py-4'>
        <p className='md:text-xl'>{(data as MovieDetailType).release_date}</p>
        <div className='ml-auto flex items-center rounded-lg tracking-[0.2rem] md:hidden'>
          <svg
            aria-hidden='true'
            className='w-8 h-8 text-amber-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Rating star</title>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          <p className='ml-2 text-[1.3rem] text-yellow-500 font-bold'>
            {(data as MovieDetailType)?.vote_average?.toFixed(1)}
          </p>
        </div>
      </div>
      <p className='text-stone-500 mb-2 md:text-xl md:font-bold '>
        {(data as MovieDetailType).overview}
      </p>

      <div className='border-t-4 border-stone-300 md:mt-0 md:border-0 py-4 mt-8 grid grid-cols-4 gap-x-8 gap-y-4 text-sm font-bold text-stone-400 md:text-stone-700 md:text-lg md:gap-y-0'>
        <h3 className='col-span-1 text-stone-500'>Language</h3>
        <p className='col-start-2 col-span-3'>
          {(data as MovieDetailType).original_language === 'en'
            ? 'English'
            : (data as MovieDetailType).original_language ?? 'No information'}
        </p>
        <h3 className='col-span-1 text-stone-500'>Duration</h3>
        <p className='col-start-2 col-span-3'>
          {(data as MovieDetailType).runtime
            ? (data as MovieDetailType).runtime + 'min'
            : 'No information'}
        </p>

        <h3 className='col-span-1 text-stone-500'>Budget</h3>
        <p className='col-start-2 col-span-3'>
          {(data as MovieDetailType).budget
            ? Math.floor((data as MovieDetailType).budget! / 1000000) + 'mil'
            : 'No information'}
        </p>
        <h3 className='col-span-1 text-stone-500'>Revenue</h3>
        <p className='col-start-2 col-span-3'>
          {(data as MovieDetailType).revenue
            ? Math.floor((data as MovieDetailType).revenue! / 1000000) + 'mil'
            : 'No information'}
        </p>
        <h3 className='col-span-1 text-stone-500'>Status</h3>
        <p className='col-start-2 col-span-3'>{data.status ?? 'No information'}</p>
        <h3 className='col-span-1 text-stone-500'>Country</h3>
        <p className='col-start-2 col-span-3'>
          {data?.production_countries?.length ?? 0 > 0
            ? data?.production_countries?.map((country) => country.name)?.join(', ')
            : 'No information'}
        </p>
        <h3 className='col-span-1 text-stone-500'>Production</h3>
        <ul className='col-start-2 col-span-3 flex flex-wrap gap-4'>
          {data?.production_companies?.length ?? 0 > 0
            ? data?.production_companies?.map((company, index) => (
                <li key={index} className='grid place-items-center'>
                  <LazyLoadImageComponent
                    path={company.logo_path ?? distributor}
                    styles={{
                      image: ' object-contain aspect-1/2 w-[5rem] overflow-hidden',
                      size: company?.logo_path ? 'w200' : undefined,
                    }}
                  />
                </li>
              ))
            : 'No information'}
        </ul>
      </div>
    </div>
  );
};

export default MovieMediaDetail;
