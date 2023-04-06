import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useGetItemExtraQuery } from '../hooks/useGetItemExtraQuery';
import { VideoType } from '../types';
import ReactPlayerComponent from './player/ReactPlayerComponent';

const TrailerListComponent: React.FC = () => {
  const { data } = useGetItemExtraQuery();
  return (
    <div>
      {data.videos.results?.slice(0, 3).map((video: VideoType, index) => {
        return <ReactPlayerComponent key={index} video={video} />;
      })}
    </div>
  );
};

export default () => (
  <Wrapper>
    <TrailerListComponent />
  </Wrapper>
);
