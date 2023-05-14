import React from 'react';
import { useGetItemDetailQuery } from '../../hooks/useGetItemDetailQuery';
import { useGetSeasonListQuery } from '../../hooks/useGetSeasonQuery';
import { TVDetailType } from '../../types';
import { useAtom } from 'jotai';
import { seasonAndEpisodeAtom } from '../../atoms';
import ButtonComponent from '@/components/generic/ButtonComponent';
import LazyLoadImageComponent from '@/components/handling/LazyLoadImageComponent';
import { episode as episode_image } from '@/config/images';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaListUl } from 'react-icons/fa';
import { BsPlayFill, BsListNested } from 'react-icons/bs';

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
                    path={episode?.still_path ?? episode_image}
                    styles={{
                      image: 'w-full object-contain',
                      size: episode?.still_path ? 'w200' : undefined,
                    }}
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
    <div
      ref={animationParentRef}
      className='flex flex-col rounded-lg py-4 font-poppins bg-stone-200 md:bg-stone-300'
    >
      <ButtonComponent
        onClick={() => setShouldSeasonsDisplay((prev) => !prev)}
        className='flex justify-between items-center py-2 px-4 hover:bg-stone-300 md:hover:bg-stone-400'
      >
        <h1 className='text-lg md:text-2xl font-bold flex gap-2 items-center text-stone-600 '>
          <FaListUl className='text-lg md:text-2xl' />
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
                className={` overflow-hidden  w-full flex justify-between items-center md:grid md:grid-cols-2 md:place-items-start py-2 pl-8 pr-4 bg-stone-300 hover:bg-stone-400 md:hover:bg-stone-500`}
                key={seasonIndex}
              >
                <p className='font-bold text-stone-600 flex items-center gap-2'>
                  <BsListNested className='text-lg' />
                  Season {seasonIndex + 1}
                </p>
                <p className='text-lg  font-black text-stone-500'>{season?.name}</p>
              </ButtonComponent>
            );
          })}
        </div>
      ) : null}
      <ButtonComponent
        onClick={() => setShouldEpisodesDisplay((prev) => !prev)}
        className='flex justify-between items-center py-2 px-4 pl-3 hover:bg-stone-300 md:hover:bg-stone-400 mt-8'
      >
        <h1 className='text-lg font-bold flex gap-2 items-center text-stone-600 md:text-2xl '>
          <BsPlayFill className='text-2xl md:text-[2rem]' />
          Episode {seasonAndEpisode?.episode}
        </h1>
      </ButtonComponent>
      {shouldEpisodesDisplay ? (
        <div
          className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 2xl:grid-cols-6md:place-content-start md:place-items-center  justify-start items-center gap-8 md:bg-stone-400 px-8 py-8`}
        >
          {seasonList[`${seasonAndEpisode?.season! - 1}` as any]?.episodes?.map(
            (episode: any, episodeIndex) => {
              return (
                <ButtonComponent
                  onClick={() => {
                    setSeasonAndEpisode((prev) => ({ ...(prev ?? {}), episode: episodeIndex + 1 }));
                    options?.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={` w-[300px] rounded-lg overflow-hidden flex flex-col  relative shadow-lg`}
                  key={episodeIndex}
                >
                  <LazyLoadImageComponent
                    path={episode?.still_path ?? episode_image}
                    styles={{
                      image: 'w-[300px]object-cover',
                      size: episode?.still_path ? 'w300' : undefined,
                    }}
                  />
                  <div className='overflow-hidden w-full flex -mt-2 justify-between items-center py-2 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 '>
                    <h1 className='font-bold text-stone-600 flex items-center gap-2'>
                      {' '}
                      <BsPlayFill className='text-lg text-stone-400' /> Episode {episodeIndex + 1}
                    </h1>
                    <h2 className='text-lg  font-black text-stone-500 truncate'>{episode?.name}</h2>
                  </div>
                  <div className='absolute top-0 h-full w-full z-30 grid place-items-center hover:bg-stone-900  hover:bg-opacity-70 text-xl font-poppins font-black uppercase tracking-wider opacity-0 hover:opacity-100 text-stone-300 '>Play</div>
                </ButtonComponent>
              );
            },
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SeasonsAndEpisodes;
