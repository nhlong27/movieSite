import { serverClient } from '@/lib/serverClient';
import {
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
  return serverClient.delete('/api/v1/user/', {data: {password}})
}

const updateUserMutationFn = ({payload, type} :{
  payload: UserInfoUpdateFormType | UserAvatarUpdateFormType | UserPasswordUpdateFormType,
  type: string}
) => updateUser(payload, type);

const deactivateUserMutationFn = (password: string) => deactivateUser(password);

export { updateUserMutationFn, deactivateUserMutationFn };
