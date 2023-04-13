import React from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import ReactPlayerComponent from './ReactPlayerComponent';
import SeasonSelectComponent from '../tv/SeasonsAndEpisodes';

const MediaPlayer = () => {
  const { data: tmdbDetail, params } = useGetItemDetailQuery();

  return (
    <div>{params.mediaType === 'movie' ? <ReactPlayerComponent /> : <SeasonSelectComponent />}</div>
  );
};

export default MediaPlayer;
