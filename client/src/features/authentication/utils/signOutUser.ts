import { serverClient } from '@/lib/serverClient';

const signOutUser = async () => {
  try {
    const response = await serverClient.get('/api/v1/user/SignOut');
    return response.data;
  } catch (e: any) {
    return e;
  }
};


export { signOutUser };
