import { useQueries } from '@tanstack/react-query';
import { getSeasonQuery } from '../queries';

export const useGetSeasonListQuery = (number_of_seasons?: number, tvId?: string) => {
  const queries = useQueries({
    queries: [
      ...Array(number_of_seasons)
        .fill('')
        .map((_, index: number) => ({
          ...getSeasonQuery((index + 1).toString(), tvId),
        })),
    ],
  });
  const data = queries.map((query) => query.data);
  return { data };
};
