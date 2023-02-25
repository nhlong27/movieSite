import { featureAtom, mediaTypeAtom } from '@/App';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { getFilteredItemListQuery } from '../queries';
import { MovieFilterList, TVFilterList } from '../types';

export const useFilteredItemListQuery = (
  paramList: MovieFilterList | TVFilterList | string,
  period?: string,
) => {
  const [mediaType] = useAtom(mediaTypeAtom);
  const [feature] = useAtom(featureAtom);
  const { data } = useQuery({
    ...getFilteredItemListQuery(mediaType, feature, paramList, period),
  });
  
  return { data, mediaType };
};
