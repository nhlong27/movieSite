import { itemLoader } from '@/routes/router';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';
import { getItemDetailQuery } from '../queries';
import { MovieDetailType, TVDetailType } from '../types';
import { useAtom } from 'jotai';
import { seasonAndEpisodeAtom } from '../atoms';

export const useGetItemDetailQuery = () => {
  const params = useParams();
  // const [_, setSeasonAndEpisode] = useAtom(seasonAndEpisodeAtom);

  const initialData = useLoaderData() as Awaited<ReturnType<typeof itemLoader>>;

  const { data }: { data: MovieDetailType | TVDetailType } = useQuery({
    //below is a hack
    ...getItemDetailQuery((params as any).mediaType, params.id),
    initialData: initialData,
  });



  return { data, params };
};
