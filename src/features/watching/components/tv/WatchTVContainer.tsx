import { tvLoader } from '@/routes/router';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useParams, useSearchParams } from 'react-router-dom';
import { getTVDetailQuery } from '../../queries';
import { useAtom } from 'jotai';
import { tvDetailAtom } from '../../atoms';
import TVHero from './TVHero';
import TVDetail from './TVDetail';
import TVSlide from './TVSlide';
import WatchSection from '../movie/WatchSection';
import { useGetSeasonListQuery } from '../../hooks/useGetSeasonQuery';
import SeasonSelectComponent from './SeasonSelectComponent';

const WatchTVContainer = () => {
  const [isReady, setIsReady] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [__, setTVDetail] = useAtom(tvDetailAtom);

  const params = useParams();
  const initialData = useLoaderData() as Awaited<ReturnType<typeof tvLoader>>;
  const { data: tvDetail, error } = useQuery({
    ...getTVDetailQuery(params.id),
    initialData: initialData,
  });

  React.useEffect(() => {
    setTVDetail((pre) => ({ ...(pre ?? {}), ...tvDetail }));
  }, []);

  const seasonList = useGetSeasonListQuery(tvDetail?.number_of_seasons, tvDetail?.id?.toString());

  return tvDetail ? (
    <>
      <TVHero />
      {isReady && (
        <SeasonSelectComponent
          seasonList={[...seasonList?.map((queryResult) => ({ ...queryResult.data }))]}
        />
      )}
      <button
        onClick={() => {
          let queryString =
            tvDetail.last_episode_to_air?.season_number &&
            tvDetail.last_episode_to_air?.episode_number
              ? new URLSearchParams({
                  season: tvDetail.last_episode_to_air?.season_number?.toString(),
                  episode: (tvDetail.last_episode_to_air?.episode_number).toString(),
                })
              : '';
          setSearchParams(queryString);
          setIsReady(true);
        }}
      >
        Watch
      </button>
      {isReady && (
        <WatchSection
          params={{
            id: tvDetail?.id,
            season: searchParams.get('season'),
            episode: searchParams.get('episode'),
          }}
        />
      )}
      <TVDetail />
      <TVSlide />
    </>
  ) : error instanceof Error ? (
    <div>Error</div>
  ) : (
    <div>Loading</div>
  );
};

export default WatchTVContainer;
