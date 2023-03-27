import { serverClient } from "@/lib/serverClient"
import { UserQueryResponse } from "./types";

const getUser = async() => {
  return UserQueryResponse.parse((await serverClient.get('/api/v1/user/')).data);
}

const getUserQuery = () => {
  return {
    queryKey:  ['profile'],
    queryFn: () => getUser(),
  }
}

export {getUserQuery, getUser}