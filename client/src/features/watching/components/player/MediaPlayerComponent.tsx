import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPlayerComponent from './ReactPlayerComponent';

const MediaPlayerComponent = ({
  seasonIndex,
  episodeIndex,
}: {
  seasonIndex: string;
  episodeIndex: string;
}) => {
  // const { data, params } = useGetItemDetailQuery();
  const [_, setSearchParams] = useSearchParams();
  return (
    <div>
      MediaPlayerComponent
      <button
        onClick={() => {
          let queryString = new URLSearchParams({
            season: seasonIndex,
            episode: episodeIndex,
          });
          setSearchParams(queryString);
        }}
        // onClick={() => {
        //   let queryString =
        //     (data as TVDetailType)?.last_episode_to_air?.season_number &&
        //     (data as TVDetailType)?.last_episode_to_air?.episode_number
        //       ? new URLSearchParams({
        //           season:
        //             (data as TVDetailType)?.last_episode_to_air?.season_number?.toString() ?? '',
        //           episode:
        //             (data as TVDetailType)?.last_episode_to_air?.episode_number?.toString() ?? '',
        //         })
        //       : '';
        //   setSearchParams(queryString);
        // }}
      >
        Watch
      </button>
      <ReactPlayerComponent tvSource={`&s=${seasonIndex}&e=${episodeIndex}`} />
    </div>
  );
};

export default MediaPlayerComponent;
