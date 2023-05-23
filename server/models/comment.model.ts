
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { UserDocument } from "./user.model.js";

interface CommentDocument extends mongoose.Document {
  user: UserDocument['_id'];
  mediaId: string;
  userName: string;
  avatar?: string;
  id: string;
  content: string;
  href?: string;
  children?: string[];
  isRoot?: boolean;
  createdAt: Date;
  updatedAt: Date;
} 

const CommentSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  mediaId: {type: String, required: true},
  avatar: String,
  userName: String,
  id: {type: String, required: true},
  content: String,
  href: String,
  children: [{type:String}],
  isRoot: Boolean,
}, {
  timestamps: true,
})


const CommentModel = mongoose.model<CommentDocument>("Comment", CommentSchema);

export {CommentModel, CommentDocument}