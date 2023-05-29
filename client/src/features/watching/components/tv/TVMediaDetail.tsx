import React from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import { TVDetailType } from '../../types';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { imageHelper } from '@/config/images';


interface TVMediaDetailProps {
  role?: string;
}

const TVMediaDetail: React.FC<TVMediaDetailProps> = (props) => {
  const { role } = props;

  const [shouldMoreInformationDisplay, setShouldMoreInformationDisplay] = React.useState(false);

  const [animationParentRef] = useAutoAnimate();

  const { data } = useGetItemDetailQuery();
  return (
    <div ref={animationParentRef}>
      <h1 className='truncate font-poppins font-black text-2xl tracking-wide py-4 md:text-3xl md:uppercase text-slate-900 dark:text-yellow-300 '>
        {(data as TVDetailType).name}
      </h1>

      <div className='flex justify-start gap-4 flex-wrap text-lg py-4 md:py-0'>
        {data?.genres?.map((genre, index) => (
          <span
            className='rounded-lg md:px-4 font-bold  bg-stone-300 text-stone-900 dark:bg-lime-500 dark:text-stone-900 text-base font-poppins  px-3 py-[2px]'
            key={index}
          >
            {genre.name}
          </span>
        ))}
      </div>

      <div className='text-base font-bold flex items-center py-4 dark:text-white text-slate-700'>
        <p className='md:text-base'> {(data as TVDetailType).first_air_date}</p>
        <div className='ml-16 flex items-center rounded-lg tracking-[0.2rem] dark:bg-stone-900 px-2 py-[4px]'>
          <svg
            aria-hidden='true'
            className='w-6 h-6 text-amber-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Rating star</title>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
          </svg>
          <p className='ml-2 text-[1.3rem] text-yellow-500 font-bold'>
            {(data as TVDetailType)?.vote_average?.toFixed(1)}
          </p>
        </div>
      </div>

      <p className='dark:text-white text-slate-900 mb-2 md:text-lg border-l-4 dark:border-yellow-500 border-slate-200 pl-4 py-4'>{(data as TVDetailType).overview}</p>

      <div className='pl-8 md:mt-0 py-4 mt-4 grid grid-cols-4 gap-x-16 md:gap-x-8 gap-y-4 text-sm  dark:text-white text-slate-900 md:text-base md:gap-y-0'>
        <h3 className='col-span-1 '>Language</h3>
        <p className='col-start-2 col-span-3'>
          {(data as TVDetailType).original_language === 'en'
            ? 'English'
            : (data as TVDetailType).original_language ?? 'No information'}
        </p>
        <h3 className='col-span-1 '>Episode duration</h3>
        <p className='col-start-2 col-span-3'>
          {((data as TVDetailType).episode_run_time ?? []).reduce((a, b) => a + b, 0) /
            ((data as TVDetailType).episode_run_time ?? []).length || 'No information'}
        </p>
        <h3 className='col-span-1 '>Seasons</h3>
        <p className='col-start-2 col-span-3'>{(data as TVDetailType).number_of_seasons ?? 'No information'}</p>
        <h3 className='col-span-1 '>Episodes</h3>
        <p className='col-start-2 col-span-3'>{(data as TVDetailType).number_of_episodes ?? 'No information'}</p>
      </div>

      {shouldMoreInformationDisplay ? null : (
        <ButtonComponent
          className=' w-full text-middle dark:text-white text-slate-500 font-semibold dark:bg-stone-900  hover:text-stone-900 md:gap-y-0 text-sm py-2 '
          onClick={() => setShouldMoreInformationDisplay(true)}
        >
          Show more
        </ButtonComponent>
      )}
      {shouldMoreInformationDisplay ? (
        <div className=' pl-8 md:mt-0  py-4 mt-4 grid grid-cols-4 gap-x-16 md:gap-x-8 gap-y-4 text-sm dark:text-white text-slate-900 md:text-base md:gap-y-0'>
          <h3 className='col-span-1 '>Status</h3>
          <p className='col-start-2 col-span-3'>{data.status ?? 'No information'}</p>
          <h3 className='col-span-1 '>Type</h3>
          <p className='col-start-2 col-span-3'>{(data as TVDetailType).type ?? 'No information'}</p>
          <h3 className='col-span-1 '>Country</h3>
          <p className='col-start-2 col-span-3'>
            {data?.production_countries?.length ?? 0 > 0 ? data?.production_countries?.map((country) => country.name)?.join(', ') : 'No information'}
          </p>
          <h3 className='col-span-1 '>Production</h3>
          <p className='col-start-2 col-span-3 py-4'>
            {data?.production_companies?.length ?? 0 > 0 ? data?.production_companies?.map((company) => company.name)?.join(', ') : 'No information'}
          </p>
          <h3 className='col-span-1 '>Networks</h3>
          <ul className='col-start-2 col-span-3 flex flex-wrap gap-4 py-4'>
            {(data as TVDetailType)?.networks?.map(
              (
                network: {
                  id?: number | undefined;
                  name?: string | undefined;
                  logo_path?: string | null | undefined;
                },
                index,
              ) => (
                <li key={index} className='grid place-items-center bg-yellow-400 bg-opacity-90 py-[2px] px-[3px]'>
                  <LazyLoadImageComponent
                    path={network.logo_path ?? imageHelper.network}
                    styles={{
                      image: 'object-contain aspect-1/2  md:w-[5rem] w-[3rem] overflow-hidden',
                      size: network?.logo_path ? 'w200' : undefined,
                    }}
                  />
                </li>
              ),
            )}
          </ul>
          <h3 className='col-span-1 '>Created by</h3>
          <ul className='col-start-2 col-span-3 flex flex-wrap gap-4 py-4'>
            {(data as TVDetailType)?.created_by?.map((creator, index) => (
              <li key={index} className='flex flex-col justify-center items-center'>
                <LazyLoadImageComponent
                  path={creator.profile_path ?? imageHelper.deer}
                  styles={{
                    image: 'rounded-full object-contain md:h-[5rem] md:w-[5rem] h-[3rem] w-[3rem] overflow-hidden shadow-inner',
                    size: creator?.profile_path ? 'w200' : undefined,
                  }}
                />
                <p>{creator.name}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {shouldMoreInformationDisplay ? (
        <ButtonComponent
          className='w-full text-middle dark:text-white text-slate-500 font-semibold dark:bg-stone-900  hover:text-stone-900 md:gap-y-0 text-sm py-2 '
          onClick={() => setShouldMoreInformationDisplay(false)}
        >
          Show less
        </ButtonComponent>
      ) : null}
    </div>
  );
};

export default TVMediaDetail;
