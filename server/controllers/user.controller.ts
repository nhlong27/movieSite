import { UserType } from "../schemas/user.schema.js";
import { createUser, deactivateUser, validatePassword } from "../services/user.service.js";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import { signJWT } from "../utils/jwt.utils.js";
import { SignInType } from "../schemas/signIn.schema.js";

import fs from 'fs'

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

const deactivateUserHandler = async (req: Request, res: Response) => {
  const success = await deactivateUser({email: res.locals.user.email, password: req.body.password})
  if (success){
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return res.status(200).json({ status: 'success, cookies cleared, user deactivated' });
  }
  return res.status(400).json({status: "Error: failed to delete user"})
}

const avatarUploadHandler = async(req: Request, res: Response) => {
  
  try{
    const user = await UserModel.findOne({email: res.locals.user.email});
    if (!user) return res.status(400).send("User not found");

    const base64Data = req.body.base64

    // const dataStart = base64Data.indexOf(',') + 1;
    // const contentTypeStart = base64Data.indexOf(':') + 1;
    // const contentTypeEnd = base64Data.indexOf(';');
    // const data = Buffer.from(base64Data.slice(dataStart), 'base64');
    // const contentType = base64Data.slice(contentTypeStart, contentTypeEnd);

    // Read the binary data of the image file from disk

    // const imageData = req.body.imageData;
    // console.log(req.body)
    // const base64Data = imageData.toString('base64');
    // const dataUrl = `data:image/jpeg;base64,${base64Data}`;

    user.avatar = base64Data
    await user.save();

    res.status(201).json({ msg : "New image uploaded...!"})
    
  }catch(error: any){
      res.status(409).json({ message : error.message })
  }
};

const getUserHandler =  async(req: Request, res: Response) => {
  try{
    const user = await UserModel.findOne({email: res.locals.user.email});
    if (!user) return res.status(400).send("User not found");
    
    res.status(201).send(user)
  }catch(error: any){
      res.status(409).json({ message : error.message })
  }
}

export {signUpHandler, signInHandler, signOutHandler, deactivateUserHandler, avatarUploadHandler, getUserHandler};