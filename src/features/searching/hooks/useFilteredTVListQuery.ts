
import { useQuery } from '@tanstack/react-query';
import { getFilteredTVListQuery } from '../queries';
import { TVFilterList } from '../types';

export const useFilteredTVListQuery = (paramList : TVFilterList) => {
  return useQuery(getFilteredTVListQuery(paramList));
};
