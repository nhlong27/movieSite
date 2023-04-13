import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useGetItemExtraQuery } from '../hooks/useGetItemExtraQuery';
import { VideoType } from '../types';
import ReactPlayerComponent from './player/ReactPlayerComponent';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useMediaQueries } from '@/hooks/useMediaQueries';

interface TrailersProps {
  shouldTrailersDisplayProp?: boolean;
}

const Trailers: React.FC<TrailersProps> = (props) => {
  const { shouldTrailersDisplayProp } = props;
  const { data } = useGetItemExtraQuery();
  const [shouldTrailersDisplay, setShouldTrailersDisplay] = React.useState(
    shouldTrailersDisplayProp ?? false,
  );
  const {isMd} = useMediaQueries()
  return (
    <>
      <ButtonComponent onClick={() => setShouldTrailersDisplay((prev) => !prev)}>
        Trailers
      </ButtonComponent>
      <div
        className={`overflow-scroll flex flex-col gap-2 justify-start pr-2 items-end `}
      >
        {data.videos.results?.slice(0, 3).map((video: VideoType, index) => {
          return <ReactPlayerComponent key={index} trailerSource={video} className={`${
            shouldTrailersDisplay ? (isMd ? 'w-full aspect-[9/12]' : 'w-full h-[16rem]') : (isMd ? 'md:w-0' : 'w-full h-0')
          } transition-all duration-300`} />;
        })}
      </div>
    </>
  );
};

export default () => (
  <Wrapper>
    <Trailers />
  </Wrapper>
);
