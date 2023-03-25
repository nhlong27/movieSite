import { UserDocument, UserModel } from "../models/user.model.js";
import { DocumentDefinition, FilterQuery } from "mongoose";
import pgk from "lodash";

const createUser = async (input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword" | "avatar" >>) => {
  try {
    const user =  await UserModel.create(input);
    return pgk.omit(user.toJSON(), 'password');
  } 
  catch(e: any) {
    throw new Error(e);
  }
}

const validatePassword = async ({email, password}:{email: string; password: string}) => {
  const user = await UserModel.findOne({email});
  if (!user) return false;
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return pgk.omit(user.toJSON(), 'password');
}

const findUser = async (query: FilterQuery<UserDocument>): Promise<UserDocument> => {
  return UserModel.findOne(query).lean()
}

const deactivateUser = async ({ email: email, password}:{ email: string; password: string}) => {
  try {
    const user = await validatePassword({email, password});
    await UserModel.deleteOne({email});
    return true;
  }
  catch(e: any){
    throw new Error(e)
  }
}
export {createUser, validatePassword, findUser, deactivateUser};