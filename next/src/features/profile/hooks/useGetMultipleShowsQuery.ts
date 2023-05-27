import { useQuery } from '@tanstack/react-query';
import { getMultipleShowsQuery } from '../queries';
import { MultipleShowsQueryResponseType } from '../types';

const useGetMultipleShowsQuery = (query?: string) => {
  let { data, error, isLoading } = useQuery<MultipleShowsQueryResponseType>({
    ...getMultipleShowsQuery(),
  });
  if (query!=='') {
    data = data?.filter((media) =>
      media.title ? media.title.match(new RegExp(query!, 'i')) : media.name?.match(new RegExp(query!, 'i')),
    );
  }
  return { data, error, isLoading };
};

export { useGetMultipleShowsQuery };
