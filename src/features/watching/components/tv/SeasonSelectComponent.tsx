import React from 'react';
import { SeasonType } from '../../types';

const SeasonSelectComponent = ({seasonList}:{seasonList?: SeasonType[]}) => {
  return (
    <div className=''>
      {seasonList?.map((season: SeasonType, index) => {
        return (
          <div key={index} className=''>
            Season Name: {season.name} <br />
            <div className='flex flex-col ml-4'>
              {season?.episodes?.map((episode: any, index: number) => {
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

export default SeasonSelectComponent;
