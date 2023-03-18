import { signJWT, verifyJWT } from "../utils/jwt.utils.js";
import { findUser } from "./user.service.js";

const reIssueAccessToken = async ({refreshToken}: {refreshToken: string}) => {
  const {decoded} = verifyJWT(refreshToken)
  if (!decoded) return false;

  const user = await findUser({_id: (decoded as any)._id})
  if (!user) return false;

  const accessToken = signJWT({...user}, {expiresIn: '15m'});
  return accessToken;
}

export {reIssueAccessToken}