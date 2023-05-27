import { currentURLPathAtom, mediaTypeAtom } from '@/components/Layout';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { getFilteredItemListQuery } from '../queries';
import { MovieFilterList, TVFilterList } from '../types';

export const useFilteredItemListQuery = (
  paramList: MovieFilterList | TVFilterList | string,
  period?: string,
  extra?: Record<string, any>,
) => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const [currentURLPath] = useAtom(currentURLPathAtom);
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...getFilteredItemListQuery(mediaType, currentURLPath, paramList, period),
    ...(extra ?? {}),
  });
  return { data, hasNextPage, fetchNextPage, mediaType };
};
