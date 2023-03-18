import { UserType } from "../schemas/user.schema.js";
import { createUser, validatePassword } from "../services/user.service.js";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import { signJWT } from "../utils/jwt.utils.js";
import { SignInType } from "../schemas/signIn.schema.js";

const signUpHandler = async (req: Request<{},{}, UserType["body"]>, res: Response) => {
  try {
    const registered = await UserModel.findOne({email: req.body.email});
    if (registered) return res.status(400).send('User already registered')

    // Create user
    const user = await createUser(req.body);

    // Create tokens
    const accessToken = signJWT({...user}, {expiresIn: '15m'}); // 15mins
    const refreshToken = signJWT({...user}, {expiresIn: '1y'}); //1 year

    // Add tokens to cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // sameSite: 'strict',
      //secure: true,
      //maxAge: 1000000,
      //signed: true
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // sameSite: 'strict',
      //secure: true,
      //maxAge: 1000000,
      //signed: true
    })

    // should redirect
    return res.send(user);

  } catch (e: any) {
    console.error(e);
    return res.status(400).send(e.message)
  }
};

const signInHandler = async (req: Request<{},{}, SignInType["body"]>, res: Response) => {
  try {
    const user = await validatePassword(req.body);
    if (!user) return res.status(400).send("Invalid email or password");

    // Create tokens
    const accessToken = signJWT({...user}, {expiresIn: '15m'}); // 15mins
    const refreshToken = signJWT({...user}, {expiresIn: '1y'}); //1 year

    // Add tokens to cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // sameSite: 'strict',
      //secure: true,
      //maxAge: 1000000,
      //signed: true
    })

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // sameSite: 'strict',
      //secure: true,
      //maxAge: 1000000,
      //signed: true
    })

    // should redirect
    return res.send(user);

  } catch (e: any) {
    console.error(e);
    return res.status(400).send(e.message)
  }
};

const signOutHandler = async (req: Request, res: Response) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  return res.status(200).json({ status: 'success, cookies cleared' });
};

export {signUpHandler, signInHandler, signOutHandler};