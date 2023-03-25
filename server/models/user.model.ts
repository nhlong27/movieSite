
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  avatar: string,
  createdAt: Date;
  updatedAt: Date;
  comparePassword (candidatePassword: string): Promise<boolean>
} 

const UserMongoSchema = new mongoose.Schema({
  email: {type: String, require: true, unique: true},
  name: {type: String, require: true},
  password: {type: String, require: true},
  avatar: String,
}, {
  timestamps: true,
})

UserMongoSchema.pre("save", async function (next){
  let user = this as UserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
})

UserMongoSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument
  return bcrypt.compare(candidatePassword, user.password).catch((e)=>false)
}

const UserModel = mongoose.model<UserDocument>("User", UserMongoSchema);

export {UserModel, UserDocument}