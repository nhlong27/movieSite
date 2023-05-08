
import React from 'react';
import { useGetItemExtraQuery } from '../hooks/useGetItemExtraQuery';
import { VideoType } from '../types';
import ReactPlayerComponent from './player/ReactPlayerComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';

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
  return (
    <>
      <ButtonComponent onClick={() => setShouldTrailersDisplay((prev) => !prev)}>
        Trailers
      </ButtonComponent>
      <div
        className={`overflow-scroll scrollbar-hide flex xs:w-4/5 w-full flex-col gap-8 justify-start pr-2 items-end ${
          shouldTrailersDisplay ? 'visible opacity-100' : 'invisible opacity-0 h-0'
        } transition-all duration-1000`}
      >
        {data.videos.results?.slice(0, 5).map((video: VideoType, index) => {
          return (
            <div
            key={index}
              className='h-full w-full'
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
    </>
  );
};

export default Trailers;
