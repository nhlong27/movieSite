// import { FilterQuery, UpdateQuery } from "mongoose";
// import { SessionDocument, SessionModel } from "../models/session.model.js";

// const createSession = async (userId: string, userAgent: string) => {
//   const session = await SessionModel.create({user: userId, userAgent})
//   return session.toJSON();
// }

// const findSession = async (query: FilterQuery<SessionDocument>) : Promise<SessionDocument> => {
//   return SessionModel.find(query).lean();
// }

// const updateSession = async (query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
//   return SessionModel.updateOne(query, update);
// }

// export {createSession, findSession, updateSession}