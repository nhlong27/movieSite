import { NextFunction, Request, Response } from 'express';
import lo from 'lodash';
import { reIssueAccessToken } from '../services/jwt.service.js';
// import { findSession } from "../services/session.service.js";
import { findUser } from '../services/user.service.js';
import { verifyJWT } from '../utils/jwt.utils.js';
import dotenv from 'dotenv';

dotenv.config();

const deserializeUserFromJWT = async (req: Request, res: Response, next: NextFunction) => {
  // const accessToken = lo.get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  // const refreshToken = lo.get(req, "headers.x-refresh") as string;

  const accessToken = req?.cookies?.accessToken;
  const refreshToken = req?.cookies?.refreshToken;
  if (!accessToken) return next();

  const { decoded, expired } = verifyJWT(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  // accessToken invalid, decoded is null
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      // res.setHeader("x-access-token", newAccessToken)
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        //maxAge: 1000000,
        //signed: true
        domain: process.env.DOMAIN,
      });
      const { decoded } = verifyJWT(newAccessToken);
      res.locals.user = decoded;
      return next();
    }
  }

  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    //maxAge: 1000000,
    //signed: true
    domain: process.env.DOMAIN,
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    //maxAge: 1000000,
    //signed: true
    domain: process.env.DOMAIN,
  });
  return res.status(404).send('Invalid access token or refresh token');
};

// const deserializeUserFromSession = async (req: Request, res: Response, next: NextFunction) => {
//   const sessionId = req.cookies.sessionId;
//   if (!sessionId) return next();

//   const session = await findSession(sessionId)
//   const user = await findUser(session.user)

//   if (user) {
//     res.locals.user = user;
//     return next();
//   }

//   // user null
//   res.clearCookie("sessionId")
//   return res.status(404).send('Invalid session Id or user not found').redirect('/')
// }

export { deserializeUserFromJWT };
