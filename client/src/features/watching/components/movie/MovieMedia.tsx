import { useMediaQueries } from '@/hooks/useMediaQueries';
import React, { useRef } from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import MediaActions from '../MediaActions';
import Trailers from '../Trailers';
import MovieMediaDetail from './MovieMediaDetail';
import { useGetItemExtraQuery } from '../../hooks/useGetItemExtraQuery';
import MediaCard from '@/components/specific/MediaCard';
import ReactPlayerComponent from '../player/ReactPlayerComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';

const MovieMedia = () => {
  const { isMd } = useMediaQueries();
  const { data } = useGetItemDetailQuery();
  const { data: extraData } = useGetItemExtraQuery();
  const reactPlayerRef = useRef<HTMLInputElement>(null);
  const [isMediaWindowDisplay, setIsMediaWindowDisplay] = React.useState(false)

  const [serverSource, setServerSource] = React.useState('2embed.to');

  return isMd ? (
    <div className='w-11/12 min-h-screen flex flex-col justify-start items-center z-0'>
      <div className='relative z-10 aspect-[22/12] w-full grid grid-cols-3 grid-rows-2 overflow-hidden'>
        <div className='text-white ml-6 mt-4 absolute top-0 left-0'>{data.vote_average}</div>
        <div className=' bg-gradient-to-t from-black to-transparent row-start-2 col-start-1 col-end-4 p-6 lg:p-6 flex flex-col justify-start'>
          <div className='text-white w-2/3 text-[1rem]'>tagline</div>
          <div className='text-white w-2/3 text-[3rem]'>title</div>
          <div className='text-white w-2/3 grow '>
            <MediaActions
              options={{
                wrapper: {
                  className: 'flex gap-2',
                },
                ref: reactPlayerRef,
                playFnc: setIsMediaWindowDisplay,
              }}
            />
          </div>
        </div>
        <div className='pt-4 px-4 pb-6 bg-gradient-to-l from-black to-transparent row-start-1 row-end-3 col-start-3 z-10 text-white flex flex-col justify-start items-end'>
          <Trailers />
        </div>
      </div>
      <div className='relative min-h-[15vh] w-full px-6 py-2 grid grid-cols-4 gap-4'>
        <div className='col-start-1 col-span-1'>
          <LazyLoadImageComponent
            path={data?.poster_path}
            className='-z-10 w-full object-cover aspect-[12/16]'
            size='original'
            effect='blur'
          />
        </div>
        <div className='col-start-2 col-span-3 p-2'>
          <MovieMediaDetail role='md' />
        </div>
      </div>
      {isMediaWindowDisplay ? null : (
        <MediaActions
          role='play'
          options={{
            playFnc: setIsMediaWindowDisplay,
          }}
        />
      )}
      <div
        ref={reactPlayerRef}
        className={`${
          isMediaWindowDisplay ? 'visible opacity-100 max-h-[40rem]' : 'invisible opacity-0 max-h-0'
        } transition-all duration-500 relative w-full px-6 py-2`}
      >
        <p>
          If you get any error message when trying to stream, please Refresh the page or switch to
          another streaming server.
        </p>
        <ReactPlayerComponent serverSource={serverSource} className='w-full aspect-square' />
      </div>
      <div className='w-full md:w-3/4 xl:w-1/2 '>
        <div className='w-full flex flex-col justify-center items-center gap-x-custom-x-max-medium'>
          <p>If current server doesn't work please try other servers below.</p>
          <div className='flex xs:flex-row flex-col gap-2 justify-between'>
            <ButtonComponent
              className='uppercase grid place-items-center px-4 py-2 ring-2 ring-black rounded-lg hover:bg-gray-100'
              onClick={() => setServerSource('2embed.to')}
            >
              2embed.to
            </ButtonComponent>
            <ButtonComponent
              className='uppercase grid place-items-center px-4 py-2 ring-2 ring-black rounded-lg hover:bg-gray-100'
              onClick={() => setServerSource('2embed.org')}
            >
              2embed.org
            </ButtonComponent>
            <ButtonComponent
              className='uppercase grid place-items-center px-4 py-2 ring-2 ring-black rounded-lg hover:bg-gray-100'
              onClick={() => setServerSource('vidsrc.me')}
            >
              vidsrc.me
            </ButtonComponent>
          </div>
        </div>
      </div>
      <div
        className='relative w-full py-4 
        px-custom-x-max-medium'
      >
        <h1>You may also like</h1>
        <div className='flex justify-center items-start w-full'>
          <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 place-items-center w-full gap-y-4 2xl:gap-4'>
          {extraData.similar?.results?.map((media, index) => {
            return (
              <MediaCard
                key={index}
                media={media}
                mediaType='movie'
                options={{
                  overviewComponent: {
                    className: `w-[200px] overflow-hidden flex justify-center items-center flex-col
                  `,
                  },
                  lazyImageComponent: {
                    size: 'w200',
                  },
                }}
              />
            );
          })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='w-11/12 min-h-screen flex flex-col justify-start items-center'>
      <div className='relative min-h-[30rem]  w-full z-10 flex flex-col justify-center items-center py-4 gap-4'>
        <div className='-z-10 grid place-items-center w-full'>
          <LazyLoadImageComponent
            path={data?.poster_path}
            className='-z-10 w-full object-cover'
            size='original'
            effect='blur'
          />
        </div>
        <div
          className='sm:w-4/5 w-[90%] bg-white z-10 -mt-[4rem]  py-4 
        px-custom-x-max-medium '
        >
          <MediaActions
            options={{
              wrapper: {
                className: 'flex flex-col gap-2',
              },
              ref: reactPlayerRef,
              playFnc: setIsMediaWindowDisplay,
            }}
          />
        </div>
        <div
          className='sm:w-4/5 w-[90%] py-4 
        px-custom-x-max-medium'
        >
          <MovieMediaDetail />
        </div>
        <div
          className='sm:w-4/5 w-[90%] relative py-4
    px-custom-x-max-medium flex flex-col'
        >
          <Trailers />
        </div>
      </div>
      {isMediaWindowDisplay ? null : (
        <MediaActions
          role='play'
          options={{
            playFnc: setIsMediaWindowDisplay,
          }}
        />
      )}
      <div
        ref={reactPlayerRef}
        className={`${
          isMediaWindowDisplay ? 'visible opacity-100 max-h-[40rem]' : 'invisible opacity-0 max-h-0'
        } transition-all duration-500 relative w-full px-6 py-2`}
      >
        <p>
          If you get any error message when trying to stream, please Refresh the page or switch to
          another streaming server.
        </p>
        <ReactPlayerComponent serverSource={serverSource} className='w-full aspect-square' />
      </div>
      <div className='w-full md:w-3/4 xl:w-1/2 '>
        <div className='w-full flex flex-col justify-center items-center gap-x-custom-x-max-medium'>
          <p>If current server doesn't work please try other servers below.</p>
          <div className='flex xs:flex-row flex-col gap-2 justify-between'>
            <ButtonComponent
              className='uppercase grid place-items-center px-4 py-2 ring-2 ring-black rounded-lg hover:bg-gray-100'
              onClick={() => setServerSource('2embed.to')}
            >
              2embed.to
            </ButtonComponent>
            <ButtonComponent
              className='uppercase grid place-items-center px-4 py-2 ring-2 ring-black rounded-lg hover:bg-gray-100'
              onClick={() => setServerSource('2embed.org')}
            >
              2embed.org
            </ButtonComponent>
            <ButtonComponent
              className='uppercase grid place-items-center px-4 py-2 ring-2 ring-black rounded-lg hover:bg-gray-100'
              onClick={() => setServerSource('vidsrc.me')}
            >
              vidsrc.me
            </ButtonComponent>
          </div>
        </div>
      </div>
      <div
        className='relative w-full py-4 
        px-custom-x-max-medium'
      >
        <h1>You may also like</h1>
        <div className='flex flex-col justify-start items-center gap-4 w-full'>
          {extraData.similar?.results?.map((media, index) => {
            return (
              <MediaCard
                key={index}
                media={media}
                mediaType='movie'
                options={{
                  overviewComponent: {
                    className: `w-[200px] flex justify-center items-center flex-col overflow-hidden
                  `,
                  },
                  lazyImageComponent: {
                    size: 'w200',
                  },
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieMedia;
