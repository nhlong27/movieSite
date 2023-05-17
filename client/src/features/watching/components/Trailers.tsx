import React from 'react';
import { useGetItemExtraQuery } from '../hooks/useGetItemExtraQuery';
import { VideoType } from '../types';
import ReactPlayerComponent from './player/ReactPlayerComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { iconHelper } from '@/config/icons';

interface TrailersProps {
  shouldTrailersDisplayProp?: boolean;
  setSelectedTrailer?: React.Dispatch<
    React.SetStateAction<{
      name?: string | undefined;
      key?: string | undefined;
    } | null>
  >;
}

const Trailers: React.FC<TrailersProps> = (props) => {
  const { shouldTrailersDisplayProp, setSelectedTrailer } = props;
  const { data } = useGetItemExtraQuery();
  const [shouldTrailersDisplay, setShouldTrailersDisplay] = React.useState(
    shouldTrailersDisplayProp ?? true,
  );
  const { isXs } = useMediaQueries();
  return isXs ? (
    <>
      <ButtonComponent
        className='flex items-center gap-2 text-xl tracking-[0.1rem] bg-transparent px-4 py-2 border-t-2 border-stone-400 hover:bg-stone-600 hover:bg-opacity-50 font-bold capitalize text-stone-300 dark:text-yellow-400'
        onClick={() => setShouldTrailersDisplay((prev) => !prev)}
      >
        {iconHelper.trailer('text-xl')}
        Trailers
      </ButtonComponent>
      {shouldTrailersDisplay && (
        <div
          className={`overflow-scroll scrollbar-hide flex w-11/12 flex-col gap-8 justify-start pr-8 items-end py-8 border-r-4 border-stone-600`}
        >
          {data.videos.results?.slice(0, 5).map((video: VideoType, index) => {
            return (
              <div
                key={index}
                className='
                   shadow-lg shadow-stone-600 ring-offset-2 ring-offset-stone-200 relative'
                onClick={() => setSelectedTrailer && setSelectedTrailer(video)}
              >
                <ReactPlayerComponent
                  trailerType={isXs ? 'image' : 'video'}
                  trailerSource={video}
                  className='w-full'
                />
                <div className='absolute top-0 h-full w-full z-30 grid place-items-center hover:bg-stone-900  hover:bg-opacity-70 text-xl font-poppins font-black uppercase tracking-wider opacity-0 hover:opacity-100 '>
                  Play
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  ) : (
    <>
      <ButtonComponent
        className='flex items-center gap-2 bg-stone-300 px-4 py-2 rounded-lg hover:bg-stone-400 font-bold uppercase tracking-wider text-stone-500 shadow-lg mb-4  border-b-2 border-stone-400 dark:bg-stone-900 dark:border-transparent dark:text-yellow-500 dark:ring-2 dark:ring-yellow-500'
        onClick={() => setShouldTrailersDisplay((prev) => !prev)}
      >
        {iconHelper.trailer('text-lg')}
        Trailers
      </ButtonComponent>
      {shouldTrailersDisplay && (
        <div
          className={`overflow-scroll scrollbar-hide flex xs:w-4/5 w-full flex-col gap-8 justify-start pr-2 items-end py-8`}
        >
          {data.videos.results?.slice(0, 5).map((video: VideoType, index) => {
            return (
              <div
                key={index}
                className='h-full w-full rounded-lg overflow-hidden shadow-lg ring-2 ring-stone-400 ring-offset-2 ring-offset-stone-200 dark:ring-transparent dark:ring-offset-transparent'
                onClick={() => setSelectedTrailer && setSelectedTrailer(video)}
              >
                <ReactPlayerComponent
                  trailerType={isXs ? 'image' : 'video'}
                  trailerSource={video}
                  className='w-full '
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Trailers;
