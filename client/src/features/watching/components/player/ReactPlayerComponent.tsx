import React from 'react';
import { VideoType } from '../../types';
import ReactPlayer from 'react-player';
import urls from '@/config/urls';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';

const ReactPlayerComponent = ({ tvSource, video }: { tvSource?: string; video?: VideoType }) => {
  const { params } = useGetItemDetailQuery();
  if (video) return <ReactPlayer url={`${urls.yt}${video.key}`} />  
  return (
      <iframe
      // className="absolute w-full h-full top-0 left-0"
      src={params.mediaType==='movie' ? `${urls.embed}/${params.mediaType}?id=${params.id}` : `${urls.embed}/${params.mediaType}?id=${params.id}${tvSource as string}`}
      title="Film Video Player"
      frameBorder="0"
      // allowFullScreen
    />
    )
};

export default ReactPlayerComponent;
