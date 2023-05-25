import React from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import { useGetSeasonListQuery } from '../../hooks/useGetSeasonQuery';
import { TVDetailType } from '../../types';
import { useAtom } from 'jotai';
import { seasonAndEpisodeAtom } from '../../atoms';
import ButtonComponent from '@/components/generic/ButtonComponent';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { iconHelper } from '@/config/icons';
import { imageHelper } from '@/config/images';

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

  const [animationParentRef] = useAutoAnimate();

  React.useEffect(() => {
    setSeasonAndEpisode((prev) => ({
      ...(prev ?? {}),
      season: (data as TVDetailType)?.last_episode_to_air?.season_number,
      episode: (data as TVDetailType)?.last_episode_to_air?.episode_number,
    }));
  }, []);

  return <div
      ref={animationParentRef}
      className='flex flex-col rounded-lg py-4 font-poppins bg-stone-200 md:bg-stone-300 dark:bg-stone-900 dark:ring-2 dark:ring-yellow-500'
    >
      <ButtonComponent
        onClick={() => setShouldSeasonsDisplay((prev) => !prev)}
        className='flex justify-between items-center py-2 px-4 hover:bg-stone-300 md:hover:bg-stone-400 dark:hover:bg-stone-900  transition-all duration-300'
      >
        <h1 className='text-lg md:text-xl font-bold flex gap-2 items-center text-stone-600 dark:text-yellow-500 '>
          {iconHelper.list('text-lg md:text-xl')}
          Season {seasonAndEpisode?.season}
        </h1>
      </ButtonComponent>
      {shouldSeasonsDisplay ? (
        <div className={`flex flex-col`}>
          {seasonList.map((season, seasonIndex) => {
            return (
              <ButtonComponent
                onClick={() =>
                  setSeasonAndEpisode((prev) => ({ ...(prev ?? {}), season: seasonIndex + 1 }))
                }
                className={` overflow-hidden  w-full flex justify-between items-center md:grid md:grid-cols-2 md:place-items-start py-2 pl-8 pr-4 bg-stone-300 hover:bg-stone-400  dark:hover:bg-stone-900 dark:bg-stone-900 hover:pl-4 transition-all duration-100 `}
                key={seasonIndex}
              >
                <p className=' text-stone-900 flex items-center gap-2 dark:text-white'>
                  {iconHelper.listNested('text-lg')}
                  Season {seasonIndex + 1}
                </p>
                <p className='text-lg text-stone-900 w-[10rem] truncate md:w-[30rem] dark:text-yellow-400'>
                  {season?.name}
                </p>
              </ButtonComponent>
            );
          })}
        </div>
      ) : null}
      <ButtonComponent
        onClick={() => setShouldEpisodesDisplay((prev) => !prev)}
        className='flex justify-between items-center py-2 px-4 pl-3 hover:bg-stone-300 md:hover:bg-stone-400 mt-8  transition-all duration-300
        dark:hover:bg-stone-900'
      >
        <h1 className='text-lg font-bold flex gap-2 items-center text-stone-600 md:text-xl dark:text-yellow-500'>
          {iconHelper.play('text-2xl md:text-[1.5rem]')}
          Episode {seasonAndEpisode?.episode}
        </h1>
      </ButtonComponent>
      {shouldEpisodesDisplay ? (
        <div
          className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 2xl:grid-cols-6md:place-content-start md:place-items-center justify-start items-center gap-8 md:bg-stone-400 px-8 py-8 dark:bg-stone-900`}
        >
          {seasonList[`${seasonAndEpisode?.season! - 1}` as any]?.episodes?.map(
            (episode: any, episodeIndex) => {
              return (
                <ButtonComponent
                  onClick={() => {
                    setSeasonAndEpisode((prev) => ({ ...(prev ?? {}), episode: episodeIndex + 1 }));
                    options?.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={` w-[300px] h-[14rem] rounded-lg overflow-hidden flex flex-col  relative shadow-sm bg-stone-200 dark:bg-stone-900 dark:shadow-yellow-500 ${
                    seasonAndEpisode?.episode === episodeIndex + 1
                      ? 'bg-stone-900 ring-4 dark:bg-yellow-400 dark:bg-opacity-70 dark:ring-transparent text-white dark:text-stone-900 ring-stone-700'
                      : 'dark:text-yellow-400 text-stone-900'
                  }`}
                  key={episodeIndex}
                >
                  <LazyLoadImageComponent
                    path={episode?.still_path ?? episode}
                    styles={{
                      image:
                        'w-[300px]  overflow-hidden bg-gradient-to-tr from-stone-900 to-stone-700  grow dark:to-yellow-500',
                      size: episode?.still_path ? 'w300' : undefined,
                    }}
                  />

                  <div className='overflow-hidden w-full flex flex-col -mt-2 justify-between items-center py-2  '>
                    <h1 className=' flex items-center gap-2 dark:text-white'>
                      {' '}
                      {iconHelper.play('text-lg text-stone-400 dark:text-white')} Episode {episodeIndex + 1}
                    </h1>
                    <h2 className='text-lg w-[10rem] truncate md:w-[15rem]'>
                      {episode?.name}
                    </h2>
                  </div>
                  <div className='absolute top-0 h-full w-full z-30 grid place-items-center hover:bg-stone-900  hover:bg-opacity-70 text-xl font-poppins font-black uppercase tracking-wider opacity-0 hover:opacity-100 text-stone-300 '>
                    Play
                  </div>
                </ButtonComponent>
              );
            },
          )}
        </div>
      ) : null}
    </div>
};

export default SeasonsAndEpisodes;
