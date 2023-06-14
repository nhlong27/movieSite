import { useMediaQueries } from '@/hooks/useMediaQueries';
import React, { useRef } from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import MediaActions from '../MediaActions';
import Trailers from '../Trailers';
import MovieMediaDetail from './MovieMediaDetail';
import { useGetItemExtraQuery } from '../../hooks/useGetItemExtraQuery';
import ReactPlayerComponent from '../player/ReactPlayerComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import LinkMediaCard from '@/components/specific/LinkMediaCard';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Link } from 'react-router-dom';

import { MovieType } from '@/types/types';
import { iconHelper } from '@/config/icons';
import { imageHelper } from '@/config/images';
import { CommentSection } from '@/features/commenting';

const MovieMedia = () => {
  const { isMd } = useMediaQueries();
  const { data } = useGetItemDetailQuery();
  const { data: extraData } = useGetItemExtraQuery();
  const reactPlayerRef = useRef<HTMLInputElement>(null);
  const trailerRef = useRef<HTMLInputElement>(null);
  const [isMediaWindowDisplay, setIsMediaWindowDisplay] = React.useState(false);

  const [animationParentRef] = useAutoAnimate();
  const [animationParentRef2] = useAutoAnimate();

  const [serverSource, setServerSource] = React.useState('2embed.to');

  const [selectedTrailer, setSelectedTrailer] = React.useState<null | {
    name?: string | undefined;
    key?: string | undefined;
  }>(null);

  return isMd ? (
    <div className='w-11/12 min-h-screen flex flex-col justify-start items-center z-0 rounded-b-xl shadow-xl font-poppins'>
      <div className='relative z-10 aspect-[22/12] w-full grid grid-cols-3 grid-rows-2 overflow-hidden'>
        <div className='ml-6 mt-4 absolute top-0 left-0'>
          <div className='flex items-center bg-opacity-70  rounded-md dark:bg-amber-400 px-2 py-[2px]'>
            <svg
              aria-hidden='true'
              className='w-6 h-6 text-amber-400 dark:text-stone-900'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Rating star</title>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <p className='ml-2 text-[1.2rem] text-lime-300 font-bold tracking-[0.3rem] dark:text-stone-900'>
              {(data.vote_average ?? 0).toFixed(1)}
            </p>
          </div>
        </div>
        <div className=' bg-gradient-to-t from-stone-900 to-transparent row-start-2 col-start-1 col-end-4 p-6 lg:p-6 flex flex-col justify-start z-30'>
          <h2 className='px-4 w-[40rem] bg-gradient-to-r from-transparent via-stone-900 to-transparent bg-opacity-100 border-y-2 border-stone-500 hidden lg:block'>
            <div className='h-3 text-2xl text-left text-stone-300'>“</div>
            <p className='px-4 text-base tracking-[0.1rem] italic text-center truncate text-stone-300'>
              {data.tagline !== '' ? data.tagline : 'Have you watched Morbius?'}
            </p>
            <div className='h-3 text-2xl text-right text-stone-300'>”</div>
          </h2>
          <div className='w-2/3 font-black capitalize text-[2.8rem] lg:text-[3.3rem] text-stone-200 font-serif tracking-[0.2rem] dark:text-yellow-500 grow text-ellipsis whitespace-nowrap overflow-hidden'>
            {(data as MovieType).title}
          </div>
          <div className='w-2/3 text-stone-200 lg:py-4 flex gap-4 items-center'>
            <MediaActions actionType='others' />
            <div className='hidden lg:block'>
              <MediaActions
                actionType='play'
                refs={{ playRef: reactPlayerRef }}
                handlingFunctions={{ playFunction: setIsMediaWindowDisplay }}
              >
                Watch now
              </MediaActions>
            </div>
          </div>
        </div>
        <div
          ref={animationParentRef}
          className='pt-4 px-4 pb-6 bg-gradient-to-l from-stone-900 to-transparent row-start-1 row-end-3 col-start-3 z-20 text-stone-200 flex flex-col justify-start items-end dark:text-yellow-500'
        >
          <Trailers setSelectedTrailer={setSelectedTrailer} refs={{ playRef: trailerRef }} />
        </div>
      </div>
      <div className='relative min-h-[15vh] w-full pr-6 grid grid-cols-4 gap-4 overflow-hidden dark:bg-transparent bg-slate-50'>
        <div className='col-start-1 col-span-1'>
          <LazyLoadImageComponent
            path={data?.poster_path ?? imageHelper.poster}
            styles={{
              image: '-z-10 h-full w-full object-cover overflow-hidden aspect-[12/16]',
              size: data?.poster_path ? 'w500' : undefined,
            }}
          />
        </div>
        <div ref={trailerRef} className='col-start-2 col-span-3 p-2 bg-slate-50 dark:bg-stone-900'>
          {selectedTrailer ? (
            <>
              <ReactPlayerComponent className='h-[30rem]' trailerSource={selectedTrailer} />
              <ButtonComponent
                onClick={() => setSelectedTrailer(null)}
                className='absolute right-0 top-1/2 bg-stone-900 text-stone-200 text-lg px-8 py-4 hover:bg-stone-400 z-10 dark:text-yellow-500 dark:hover:bg-yellow-400 dark:hover:text-stone-900 dark:hover:ring-2 dark:hover:ring-stone-800 rounded-l-lg'
              >
                Close
              </ButtonComponent>
            </>
          ) : (
            <MovieMediaDetail />
          )}
        </div>
      </div>
      <div
        className='relative w-full z-0 grid place-items-center py-8 gap-4 bg-gradient-to-r from-stone-900 to-stone-900 via-stone-700 dark:via-stone-900  bg-opacity-50'
        ref={animationParentRef2}
      >
        {!isMediaWindowDisplay ? (
          <div className='w-3/4 flex flex-col justify-center items-center border-y-2 border-stone-500 mt-16 py-8 dark:border-yellow-600'>
            <MediaActions
              actionType='play'
              handlingFunctions={{
                playFunction: setIsMediaWindowDisplay,
              }}
            />
          </div>
        ) : null}
        {isMediaWindowDisplay ? (
          <div
            className={` w-3/4 p-2  bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-opacity-50 rounded-xl shadow-xl pb-6  dark:via-stone-900 dark:bg-opacity-100`}
          >
            <div className='w-full py-4 border-b-4 border-stone-300 md:border-0 grid place-items-center mb- flex-grow'>
              <div className='w-11/12 text-center rounded-xl shadow-inner px-4 py-2 bg-stone-300 font-poppins font-bold  text-lg text-stone-400 bg-opacity-20 tracking-wide dark:bg-stone-900 dark:text-yellow-600'>
                If you get any error message when trying to stream, please refresh the page or
                switch to another streaming server.
              </div>
            </div>
            <div className='relative h-0 pb-[56.25%]'>
              <ReactPlayerComponent
                serverSource={serverSource}
                className='absolute top-0 left-0 w-full h-full'
              />
            </div>
          </div>
        ) : null}
      </div>

      <div
        ref={reactPlayerRef}
        className='w-full grid place-items-center
      bg-gradient-to-r from-stone-900 via-stone-700 to-stone-900 bg-opacity-50 font-poppins py-16 dark:via-stone-900'
      >
        <div className='w-3/4 flex flex-col justify-center items-center gap-x-custom-x-max-medium bg-stone-400 rounded shadow-inner py-4 px-8 bg-opacity-20 dark:bg-yellow-400 dark:bg-opacity-20'>
          <p className='text-left  py-4 text-stone-300 text-lg tracking-wider  dark:text-yellow-500'>
            If current server doesn't work please try other servers below.
          </p>
          <div className='flex xs:flex-row flex-col  justify-between text-stone-700 font-bold text-base gap-4'>
            <ButtonComponent
              className='uppercase  flex items-center gap-2 px-4 py-2 bg-stone-300 rounded-lg hover:bg-stone-200 dark:bg-amber-200 dark:hover:bg-amber-300 transition-full duration-200'
              onClick={() => setServerSource('2embed.to')}
            >
              {iconHelper.play('text-3xl')}
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-600'>Server</span>
                2embed.to
              </div>
            </ButtonComponent>
            <ButtonComponent
              className='uppercase px-4 py-2 bg-stone-300 rounded-lg flex items-center gap-2 hover:bg-stone-200 dark:bg-amber-200 dark:hover:bg-amber-300 transition-full duration-200'
              onClick={() => setServerSource('2embed.org')}
            >
              {iconHelper.play('text-3xl')}
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-600'>Server</span>
                2embed.org
              </div>
            </ButtonComponent>
            <ButtonComponent
              className='uppercase  flex items-center gap-2 px-4 py-2 bg-stone-300 rounded-lg hover:bg-stone-200 dark:bg-amber-200 dark:hover:bg-amber-300 transition-full duration-200'
              onClick={() => setServerSource('vidsrc.me')}
            >
              {iconHelper.play('text-3xl')}
              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-600'>Server</span>
                vidsrc.me
              </div>
            </ButtonComponent>
          </div>
        </div>
      </div>

      <div
        className='relative w-full py-4 px-4 
         rounded-t-lg bg-slate-50  dark:bg-stone-900'
      >
        <h1 className='py-2 px-4 text-left font-poppins text-slate-900 uppercase border-b-4 border-slate-200 bg-slate-50 rounded-t-md text-2xl dark:bg-stone-900 dark:border-yellow-600 dark:text-yellow-400'>
          You may also like
        </h1>
        {extraData.similar?.results?.length ?? 0 > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 4k:grid-cols-7 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-slate-50 rounded-b-xl shadow-xl py-8 dark:bg-stone-900'>
            {extraData.similar?.results?.map((media: any, index) => {
              return (
                <LinkMediaCard
                  key={index}
                  media={media}
                  role='linkMovieCard'
                  styles={{
                    link: 'relative h-[20rem] w-[200px] overflow-hidden flex justify-center items-center flex-col rounded-xl  bg-gradient-to-t from-stone-900 to-yellow-500 transition-full duration-200 hover:transform hover:scale-110 shadow-lg',
                    image:
                      'overflow-hidden  bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow',
                    size: (media as any).poster_path ? 'w200' : undefined,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className='relative w-full flex flex-row h-auto justify-center items-baseline gap-4 bg-slate-50 bg-opacity-20 shadow-inner border-2 border-slate-200 font-poppins text-normal font-semibold px-8 py-8 dark:bg-stone-900 dark:border-yellow-600'>
            <h1 className='text-slate-900 text-sm dark:text-yellow-500'>
              No movies or TV shows for this media
            </h1>
            <Link
              className='w-auto px-4 py-[2px] font-poppins rounded-xl bg-slate-200 grid place-items-center text-slate-900 hover:bg-slate-300 text-base  dark:bg-stone-900  dark:text-yellow-500 dark:hover:bg-yellow-400 dark:hover:text-stone-900 dark:hover:shadow-md dark:hover:shadow-yellow-500 hover:shadow-md hover:shadow-stone-900 transition-full duration-300'
              to='/discover'
              onClick={() => {
                console.log('navigating to exploring page..');
              }}
            >
              <span> Find something else to watch</span>
            </Link>
          </div>
        )}
      </div>

      <div className='w-full flex flex-col justify-center items-center gap-4 rounded-b-lg bg-slate-50 shadow-inner font-poppins text-normal px-8 py-4 dark:bg-stone-900'>
        <CommentSection mediaId={data.id?.toString() ?? '404'} />
      </div>
    </div>
  ) : (
    <div className='w-11/12 min-h-screen flex flex-col justify-start items-center rounded-b-xl shadow-xl font-poppins z-0'>
      <div className='relative min-h-[30rem] w-full z-10 flex flex-col justify-center items-center pt-4 pb-8 gap-4 bg-gradient-to-t from-stone-300 to-stone-900 via-stone-500 dark:from-stone-900 dark:via-stone-900'>
        <div className='-z-10 grid place-items-center w-full bg-stone-900 rounded-t-xl overflow-hidden'>
          <LazyLoadImageComponent
            path={data?.poster_path ?? imageHelper.poster}
            styles={{
              image: '-z-10 w-full object-cover',
              size: data?.poster_path ? 'original' : undefined,
            }}
          />
        </div>
        <div
          className='sm:w-4/5 w-[90%] bg-slate-50 -mt-[4rem]  py-4 px-8
         rounded-xl shadow-xl flex flex-col items-center dark:bg-gradient-to-t  dark:from-stone-900 dark:to-yellow-500  dark:ring-2 dark:ring-yellow-500'
        >
          <div className='grid place-items-center w-full py-4'>
            <MediaActions
              actionType='play'
              refs={{ playRef: reactPlayerRef }}
              handlingFunctions={{ playFunction: setIsMediaWindowDisplay }}
              styles={{ play: 'px-16 py-4' }}
            />
          </div>
          <div className='grid place-items-center w-full'>
            <MediaActions actionType='others' styles={{ others: 'w-full flex-col' }} />
          </div>
        </div>
        <div
          className='sm:w-4/5 w-[90%] py-4 
        px-custom-x-max-medium dark:bg-transparent bg-slate-50 rounded-xl shadow-xl '
        >
          <MovieMediaDetail />
        </div>
        <div
          ref={animationParentRef}
          className='sm:w-4/5 w-[90%] relative py-4
    px-custom-x-max-medium flex flex-col h-full bg-slate-50 rounded-xl shadow-xl items-center justify-start font-poppins dark:bg-stone-900'
        >
          <Trailers />
        </div>
      </div>
      <div
        className='relative w-full z-0 flex flex-col justify-center items-center py-4 gap-4 bg-slate-300 dark:bg-stone-900'
        ref={animationParentRef2}
      >
        {!isMediaWindowDisplay ? (
          <div className='w-full flex flex-col justify-center items-center border-y-2 border-stone-400 py-8 dark:border-yellow-600'>
            <MediaActions
              actionType='play'
              handlingFunctions={{
                playFunction: setIsMediaWindowDisplay,
              }}
            />
          </div>
        ) : null}
        {isMediaWindowDisplay ? (
          <div className={`w-11/12 p-2 bg-slate-200 rounded-xl shadow-xl pb-6 dark:bg-stone-900`}>
            <div className='w-full py-8 border-b-4 border-stone-300 grid place-items-center mb-4 dark:border-amber-400'>
              <div className='w-5/6 text-center rounded-xl shadow-inner px-4 py-2 bg-stone-300 font-poppins text-sm font-bold text-stone-500 dark:text-yellow-600 dark:bg-stone-800'>
                If you get any error message when trying to stream, please refresh the page or
                switch to another streaming server.
              </div>
            </div>
            <div className='relative h-0 pb-[56.25%]'>
              <ReactPlayerComponent
                serverSource={serverSource}
                className='absolute top-0 left-0 w-full h-full'
              />
            </div>
          </div>
        ) : null}
      </div>
      <div
        ref={reactPlayerRef}
        className='w-full md:w-3/4 xl:w-1/2 bg-slate-50 grid place-items-center font-poppins py-4 dark:bg-stone-900'
      >
        <div className='w-11/12 flex flex-col justify-center items-center gap-x-custom-x-max-medium dark:bg-stone-900 rounded shadow-inner py-4 px-8 '>
          <p className='text-left text-sm font-bold text-slate-700 py-4 dark:text-yellow-400'>
            If current server doesn't work please try other servers below.
          </p>
          <div className='flex md:flex-row flex-col gap-2 justify-between text-stone-500 font-bold'>
            <ButtonComponent
              className='uppercase  flex items-center gap-2 px-4 py-2 bg-stone-300 rounded-lg hover:bg-stone-200 dark:bg-amber-200 dark:hover:bg-amber-300 transition-full duration-200'
              onClick={() => setServerSource('2embed.to')}
            >
              {iconHelper.play('text-3xl')}

              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-400'>Server</span>
                2embed.to
              </div>
            </ButtonComponent>
            <ButtonComponent
              className='uppercase px-4 py-2 bg-stone-300 rounded-lg flex items-center gap-2 hover:bg-stone-200 dark:bg-amber-200 dark:hover:bg-amber-300 transition-full duration-200'
              onClick={() => setServerSource('2embed.org')}
            >
              {iconHelper.play('text-3xl')}

              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-400'>Server</span>
                2embed.org
              </div>
            </ButtonComponent>
            <ButtonComponent
              className='uppercase  flex items-center gap-2 px-4 py-2 bg-stone-300 rounded-lg hover:bg-stone-200 dark:bg-amber-200 dark:hover:bg-amber-300 transition-full duration-200'
              onClick={() => setServerSource('vidsrc.me')}
            >
              {iconHelper.play('text-3xl')}

              <div className='flex flex-col justify-center items-start'>
                <span className='text-sm capitalize text-stone-400'>Server</span>
                vidsrc.me
              </div>
            </ButtonComponent>
          </div>
        </div>
      </div>
      <div
        className='relative w-full py-4 
        px-custom-x-max-medium bg-slate-50 shadow-lg dark:bg-stone-900'
      >
        <h1 className='py-2 px-4 text-left font-poppins text-slate-900 text-xl uppercase border-b-4 border-slate-200 bg-slate-50 rounded-t-lg dark:bg-stone-900 dark:text-yellow-400 dark:border-yellow-600'>
          You may also like
        </h1>
        {extraData.similar?.results?.length ?? 0 > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 4k:grid-cols-7 place-items-center w-full gap-4 2xl:gap-4 min-h-screen  place-content-start bg-slate-50 rounded-b-xl shadow-xl py-8 dark:bg-stone-900'>
            {extraData.similar?.results?.map((media, index) => {
              return (
                <LinkMediaCard
                  key={index}
                  media={media}
                  role='linkMovieCard'
                  styles={{
                    link: 'relative h-[20rem] w-[200px] overflow-hidden flex justify-center items-center flex-col rounded-xl  bg-gradient-to-t from-stone-900 to-yellow-500  transition-full duration-200 hover:transform hover:scale-110 shadow-lg',
                    image:
                      'overflow-hidden  bg-gradient-to-tr  from-white  to-black  dark:from-stone-900 dark:to-yellow-500 grow',
                    size: (media as any).poster_path ? 'w400' : undefined,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className='relative w-full flex flex-row h-auto justify-center items-baseline gap-4 bg-slate-50 bg-opacity-20 shadow-inner border-2 border-slate-200 font-poppins text-normal font-semibold px-8 py-8 dark:bg-stone-900 dark:border-yellow-600'>
            <h1 className='text-stone-400 text-sm dark:text-yellow-500'>
              No movies or TV shows for this media
            </h1>
            <Link
              className='w-auto px-4 py-[2px] font-poppins rounded-xl bg-slate-200 grid place-items-center text-slate-900 hover:bg-slate-300 text-base  dark:bg-stone-900  dark:text-yellow-500 dark:hover:bg-yellow-400 dark:hover:text-stone-900 dark:hover:shadow-md dark:hover:shadow-yellow-500 hover:shadow-md hover:shadow-stone-900 transition-full duration-300'
              to='/discover'
              onClick={() => {
                console.log('navigating to exploring page..');
              }}
            >
              <span> Find something else to watch</span>
            </Link>
          </div>
        )}
      </div>
      <div className='w-full flex flex-col justify-center items-center rounded-b-lg bg-slate-50 shadow-inner font-poppins text-normal px-4 py-4 dark:bg-stone-900'>
        <CommentSection mediaId={data.id?.toString() ?? '404'} />
      </div>
    </div>
  );
};

export default MovieMedia;
