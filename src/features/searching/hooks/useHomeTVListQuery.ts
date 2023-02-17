
import { useQuery } from '@tanstack/react-query';
import {  getHomeTVListQuery } from '../queries';
import { StatusList} from '../types';

export const useHomeTVListQuery = (paramList: StatusList ) => {
  return useQuery(getHomeTVListQuery(paramList));
};
