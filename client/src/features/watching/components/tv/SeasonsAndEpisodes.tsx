
import React from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import { useGetSeasonListQuery } from '../../hooks/useGetSeasonQuery';
import { TVDetailType } from '../../types';
import { useAtom } from 'jotai';
import { seasonAndEpisodeAtom } from '../../atoms';
import ButtonComponent from '@/components/generic/ButtonComponent';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';

interface SeasonsAndEpisodesProps {
  options: { [key: string]: any };
  role?: string;
}

const SeasonsAndEpisodes: React.FC<SeasonsAndEpisodesProps> = (props) => {
  const { options, role } = props;
  const [seasonAndEpisode, setSeasonAndEpisode] = useAtom(seasonAndEpisodeAtom);
  const [shouldSeasonsDisplay, setShouldSeasonsDisplay] = React.useState(true);
  const [shouldEpisodesDisplay, setShouldEpisodesDisplay] = React.useState(true);
  const { data } = useGetItemDetailQuery();
  const { data: seasonList } = useGetSeasonListQuery(
    (data as TVDetailType)?.number_of_seasons,
    data?.id?.toString(),
  );

  React.useEffect(() => {
    setSeasonAndEpisode((prev) => ({
      ...(prev ?? {}),
      season: (data as TVDetailType)?.last_episode_to_air?.season_number,
      episode: (data as TVDetailType)?.last_episode_to_air?.episode_number,
    }));
  }, []);

  return role ? (
    <div className='flex flex-col'>
      <div className={`flex justify-start`}>
        {seasonList.map((season, seasonIndex) => {
          return (
            <ButtonComponent
              onClick={() =>
                setSeasonAndEpisode((prev) => ({ ...(prev ?? {}), season: seasonIndex + 1 }))
              }
              className={`${
                seasonAndEpisode?.season === seasonIndex + 1 && 'bg-gray-300'
              } transition-all overflow-hidden duration-300 flex`}
              key={seasonIndex}
            >
              <p>{seasonIndex + 1}</p>
              <p>{season?.name}</p>
            </ButtonComponent>
          );
        })}
      </div>
      <div className={`flex justify-start flex-wrap gap-2`}>
        {seasonList[`${seasonAndEpisode?.season! - 1}` as any]?.episodes?.map(
          (episode, episodeIndex) => {
            return (
              <ButtonComponent
                onClick={() => {
                  setSeasonAndEpisode((prev) => ({ ...(prev ?? {}), episode: episodeIndex + 1 }));
                  options?.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`${
                  seasonAndEpisode?.episode === episodeIndex + 1 && 'bg-gray-300'
                } max-h-[10rem] overflow-hidden transition-all duration-300 flex w-[200px] flex-col`}
                key={episodeIndex}
              >
                <div className='grid place-items-center'>
                  <LazyLoadImageComponent
                    path={episode?.still_path}
                    styles={{ image: 'w-full object-contain', size: 'w200' }}
                  />
                </div>
                <div className='flex justify-between'>
                  <h1>{episodeIndex + 1}</h1>
                  <h2>{episode?.name}</h2>
                </div>
              </ButtonComponent>
            );
          },
        )}
      </div>
    </div>
  ) : (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-baseline'>
        <h1>Season: {seasonAndEpisode?.season}</h1>
        <ButtonComponent onClick={() => setShouldSeasonsDisplay((prev) => !prev)}>
          Open/Close
        </ButtonComponent>
      </div>
      <div className={`flex flex-col`}>
        {seasonList.map((season, seasonIndex) => {
          return (
            <ButtonComponent
              onClick={() =>
                setSeasonAndEpisode((prev) => ({ ...(prev ?? {}), season: seasonIndex + 1 }))
              }
              className={`${
                shouldSeasonsDisplay ? 'h-[2rem]' : 'h-0'
              } transition-all overflow-hidden duration-300 w-full flex justify-between`}
              key={seasonIndex}
            >
              <p>{seasonIndex + 1}</p>
              <p>{season?.name}</p>
            </ButtonComponent>
          );
        })}
      </div>
      <div className='w-full flex justify-between items-baseline'>
        <h1>Episode: {seasonAndEpisode?.episode}</h1>
        <ButtonComponent onClick={() => setShouldEpisodesDisplay((prev) => !prev)}>
          Open/Close
        </ButtonComponent>
      </div>
      <div className={`flex flex-col justify-start items-center`}>
        {seasonList[`${seasonAndEpisode?.season! - 1}` as any]?.episodes?.map(
          (episode, episodeIndex) => {
            return (
              <ButtonComponent
                onClick={() => {
                  setSeasonAndEpisode((prev) => ({ ...(prev ?? {}), episode: episodeIndex + 1 }));
                  options?.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`${
                  shouldEpisodesDisplay ? 'h-[12rem]' : 'h-0'
                } w-[300px] overflow-hidden transition-all duration-300 flex flex-col`}
                key={episodeIndex}
              >
                <div className='grid place-items-center w-full'>
                  <LazyLoadImageComponent
                    path={episode?.still_path}
                    styles={{ image: 'w-full object-contain', size: 'w300' }}
                  />
                </div>
                <div className='flex justify-between'>
                  <h1>{episodeIndex + 1}</h1>
                  <h2>{episode?.name}</h2>
                </div>
              </ButtonComponent>
            );
          },
        )}
      </div>
    </div>
  );
};

export default SeasonsAndEpisodes;
