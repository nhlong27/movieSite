import { useQueries } from '@tanstack/react-query';
import { getSeasonQuery } from '../queries';

export const useGetSeasonListQuery = (number_of_seasons?: number, tvId?: string) => {
  return useQueries({
    queries: [
      ...Array(number_of_seasons).fill('').map((_, index: number) => ({
        ...getSeasonQuery((index + 1).toString(), tvId),
      })),
    ],
  });
};
