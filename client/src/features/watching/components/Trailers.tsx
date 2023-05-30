import React from 'react';
import { useGetItemExtraQuery } from '../hooks/useGetItemExtraQuery';
import { VideoType } from '../types';
import ReactPlayerComponent from './player/ReactPlayerComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';
import { iconHelper } from '@/config/icons';

interface TrailersProps {
  refs?: Record<string, React.RefObject<HTMLInputElement>>;
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
  const { isMd } = useMediaQueries();
  return isMd ? (
    <>
      <ButtonComponent
        className='flex items-center gap-2 tracking-[0.1rem] bg-transparent px-4 py-2 capitalize text-white hover:text-stone-300 text-base'
        onClick={() => setShouldTrailersDisplay((prev) => !prev)}
      >
        {iconHelper.trailer('text-lg')}
        Trailers
      </ButtonComponent>
      {shouldTrailersDisplay && (
        <div
          className={`overflow-scroll scrollbar-hide flex w-11/12 flex-col gap-8 justify-start pr-8 items-end pt-8 pb-[20rem] border-r-2 border-slate-400 dark:border-stone-400`}
        >
          {data.videos.results?.slice(0, 5).map((video: VideoType, index) => {
            return (
              <div
                key={index}
                className='
                   shadow-lg ring-offset-2 ring-offset-stone-200 relative'
                onClick={() => {setSelectedTrailer && setSelectedTrailer(video);
                props.refs?.playRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                <ReactPlayerComponent
                  trailerType={'image'}
                  trailerSource={video}
                  className='w-full'
                />
                <div className='absolute top-0 h-full w-full z-30 grid place-items-center hover:bg-stone-900  hover:bg-opacity-70 text-xl font-poppins font-black uppercase tracking-wider opacity-0 hover:opacity-100 transition-full duration-200'>
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
        className='flex items-center gap-2  px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-slate-900 shadow-md mb-4 dark:bg-stone-900  dark:text-yellow-500'
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
                className='h-full w-full rounded-lg overflow-hidden shadow-lg'
                onClick={() => setSelectedTrailer && setSelectedTrailer(video)}
              >
                <ReactPlayerComponent
                  trailerType={'video'}
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
