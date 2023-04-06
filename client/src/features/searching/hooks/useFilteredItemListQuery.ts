import { currentURLPathAtom, mediaTypeAtom } from '@/App';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { getFilteredItemListQuery } from '../queries';
import { MovieFilterList, TVFilterList } from '../types';

export const useFilteredItemListQuery = (
  paramList: MovieFilterList | TVFilterList | string,
  period?: string,
) => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const [currentURLPath] = useAtom(currentURLPathAtom);
  const { data } = useQuery({
    ...getFilteredItemListQuery(mediaType, currentURLPath, paramList, period),
  });
  return { data, mediaType };
};
