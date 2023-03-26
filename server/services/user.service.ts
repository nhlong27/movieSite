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

const validatePassword = async ({_id, email, password}:{_id?: string, email?: string; password: string}) => {
  let user;
  if (_id) {
    user = await UserModel.findOne({_id});
  } else {
    user = await UserModel.findOne({email});
  }
  if (!user) return false;
  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return pgk.omit(user.toJSON(), 'password');
}

const findUser = async (query: FilterQuery<UserDocument>): Promise<UserDocument> => {
  return UserModel.findOne(query).lean()
}

const deactivateUser = async ({ _id, password}:{_id: string; password: string}) => {
    const user = await validatePassword({_id, password});
    if (!user) return false;
    await UserModel.deleteOne({_id});
    return true;
}

export {createUser, validatePassword, findUser, deactivateUser};