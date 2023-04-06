import Wrapper from '@/components/handling/Wrapper';
import React from 'react';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import { useGetSeasonListQuery } from '../hooks/useGetSeasonQuery';
import { TVDetailType } from '../types';
import MediaPlayerComponent from './player/MediaPlayerComponent';

const SeasonSelectComponent = () => {
  const [isReady, setIsReady] = React.useState(false);

  const { data } = useGetItemDetailQuery();
  const { data: seasonList } = useGetSeasonListQuery(
    (data as TVDetailType)?.number_of_seasons,
    data?.id?.toString(),
  );
  return (
    <div className=''>
      {seasonList.map((season, seasonIndex) => {
        return (
          <div key={seasonIndex} className=''>
            Season Name: {season?.name} <br />
            <div className='flex flex-col ml-4'>
              {season?.episodes?.map((episode, episodeIndex) => {
                return (
                  <MediaPlayerComponent
                    seasonIndex={seasonIndex.toString()}
                    key={episodeIndex}
                    episodeIndex={episodeIndex.toString()}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default () => (
  <Wrapper>
    <SeasonSelectComponent />
  </Wrapper>
);
