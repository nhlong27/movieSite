
// import mongoose from "mongoose";
// import { UserDocument } from "./user.model.js";

// interface SessionDocument extends mongoose.Document {
//   user: UserDocument["_id"];
//   valid: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   userAgent: String;
// } 

// const SessionSchema = new mongoose.Schema({
//   user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//   valid: {type: Boolean, default: true},
//   userAgent: {type: String}
// }, {
//   timestamps: true,
// })

// const SessionModel = mongoose.model<SessionDocument>("Session", SessionSchema);

// export {SessionDocument}