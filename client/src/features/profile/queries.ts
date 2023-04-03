import { serverClient } from '@/lib/serverClient';
import { MultipleShowsQueryResponse, ShowQueryResponse, UserQueryResponse } from './types';

const getUser = async () => {
  return UserQueryResponse.parse((await serverClient.get('/api/v1/user/')).data);
};

const getUserQuery = () => {
  return {
    queryKey: ['profile'],
    queryFn: getUser,
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
  };
};

const getMultipleShowsQuery = () => {
  return {
    queryKey: ['shows',],
    queryFn: getMultipleShows,
  };
};

export { getUserQuery, getUser, getMultipleShowsQuery, getShowQuery };
