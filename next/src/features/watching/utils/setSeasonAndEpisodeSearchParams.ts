import { useSearchParams } from 'react-router-dom';

const setSeasonAndEpisodeSearchParams = (seasonIndex: string, episodeIndex: string) => {
  const [_, setSearchParams] = useSearchParams();

  let queryString = new URLSearchParams({
    season: seasonIndex,
    episode: episodeIndex,
  });
  setSearchParams(queryString);
  
};

export {setSeasonAndEpisodeSearchParams}
