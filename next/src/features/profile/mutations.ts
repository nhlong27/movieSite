import { serverClient } from '@/lib/serverClient';
import {
  ShowUpdateFormType,
  UserAvatarUpdateFormType,
  UserInfoUpdateFormType,
  UserPasswordUpdateFormType,
} from './types';

const updateUser = (
  payload: UserInfoUpdateFormType | UserAvatarUpdateFormType | UserPasswordUpdateFormType,
  type: string,
) => {
  return serverClient.patch('/api/v1/user/', payload, {
    params: {
      type: type,
    },
  });
};

const deactivateUser = (password: string) => {
  return serverClient.delete('/api/v1/user/', { data: { password } });
};

const updateUserMutationFn = ({
  payload,
  type,
}: {
  payload: UserInfoUpdateFormType | UserAvatarUpdateFormType | UserPasswordUpdateFormType;
  type: string;
}) => updateUser(payload, type);

const deactivateUserMutationFn = (password: string) => deactivateUser(password);

const updateShow = (id: string, payload: ShowUpdateFormType) => {
  return serverClient.put(`/api/v1/show/${id}`, payload);
};
const deleteShow = (id: string) => {
  return serverClient.delete(`/api/v1/show/${id}`);
};

const updateShowMutationFn = ({id, payload}:{id: string, payload: ShowUpdateFormType}) => {
  return updateShow(id, payload);
};
const deleteShowMutationFn = (id: string) => {
  return deleteShow(id);
};

export {
  updateUserMutationFn,
  deactivateUserMutationFn,
  updateShowMutationFn,
  deleteShowMutationFn,
};
