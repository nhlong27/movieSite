import Wrapper from '@/components/ui/Wrapper';
import React from 'react';
import { useGetItemDetailQuery } from '../hooks/useGetItemDetailQuery';
import { useGetSeasonListQuery } from '../hooks/useGetSeasonQuery';
import {TVDetailType } from '../types';

const SeasonSelectComponent = () => {
  const { data } = useGetItemDetailQuery();
  const { data: seasonList } = useGetSeasonListQuery(
    (data as TVDetailType)?.number_of_seasons,
    data?.id?.toString(),
  );
  return (
    <div className=''>
      {seasonList.map((season, index) => {
        return (
          <div key={index} className=''>
            Season Name: {season?.name} <br />
            <div className='flex flex-col ml-4'>
              {season?.episodes?.map((episode, index) => {
                return (
                  <div className='' key={index}>
                    {episode.name}
                  </div>
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
