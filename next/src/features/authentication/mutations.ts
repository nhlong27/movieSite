import { serverClient } from '@/lib/serverClient';
import { SignInFormType, SignUpFormType } from './types';

const signUpUser = (newUser: SignUpFormType) => {
  return serverClient.post('/api/v1/user/SignUp', newUser);
};

const signInUser = (registered: SignInFormType) => {
  return serverClient.post('/api/v1/user/SignIn', registered);
};

const signUpMutationFn = (newUser: SignUpFormType) => signUpUser(newUser);

const signInMutationFn = (registered: SignInFormType) => signInUser(registered);

export { signUpMutationFn, signInMutationFn };
