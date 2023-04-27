
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { UserDocument } from "./user.model.js";

interface ShowDocument extends mongoose.Document {
  user: UserDocument['_id'];
  title?: string;
  name?: string;
  poster_path?: string;
  media_type?: string;
  season_number?: number;
  id: string;
  status?: string;
  isFavorited?: boolean;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
} 

const ShowSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  title: String,
  name: String,
  poster_path: String,
  media_type: String,
  season_number: Number,
  id: {type: String, required: true},
  status: String,
  isFavorited: Boolean,
  score: Number,
}, {
  timestamps: true,
})


const ShowModel = mongoose.model<ShowDocument>("Show", ShowSchema);

export {ShowModel, ShowDocument}