import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import { TVDetailType } from '../../types';

const MediaPlayerComponent = () => {
  const { data, params } = useGetItemDetailQuery();
  const [_, setSearchParams] = useSearchParams();
  return (
    <div>
      MediaPlayerComponent
      {params.mediaType === 'tv' && (
        <button
          onClick={() => {
            let queryString =
              (data as TVDetailType)?.last_episode_to_air?.season_number &&
              (data as TVDetailType)?.last_episode_to_air?.episode_number
                ? new URLSearchParams({
                    season:
                      (data as TVDetailType)?.last_episode_to_air?.season_number?.toString() ?? '',
                    episode:
                      (data as TVDetailType)?.last_episode_to_air?.episode_number?.toString() ?? '',
                  })
                : '';
            setSearchParams(queryString);
          }}
        >
          Watch
        </button>
      )}
    </div>
  );
};

export default MediaPlayerComponent;
