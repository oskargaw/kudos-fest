import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
}

const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  createdAt: String,
});

export const User = model<IUser>("User", userSchema);
