import { serverClient } from '@/lib/serverClient';
import { MultipleShowsQueryResponse, ShowQueryResponse, UserQueryResponse } from './types';

const getUser = async () => {
  return UserQueryResponse.parse((await serverClient.get('/api/v1/user/')).data);
};

const getUserQuery = () => {
  return {
    queryKey: ['profile'],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    keepPreviousData: false,
    suspense: true,
    useErrorBoundary: true,
  };
};

const getShow = async (id: string) => {
  return ShowQueryResponse.parse((await serverClient.get(`/api/v1/show/${id}`)).data);
};

const getMultipleShows = async () => {
  return MultipleShowsQueryResponse.parse((await serverClient.get(`/api/v1/show/`)).data);
};

const getShowQuery = (id: string) => {
  return {
    queryKey: ['shows', id],
    queryFn: () => getShow(id),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: false,
    // suspense: true,
    // useErrorBoundary: true
  };
};

const getMultipleShowsQuery = () => {
  return {
    queryKey: ['shows'],
    queryFn: getMultipleShows,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    keepPreviousData: false,
    // suspense: true,
    // useErrorBoundary: true,
  };
};

export { getUserQuery, getUser, getMultipleShowsQuery, getShowQuery };
