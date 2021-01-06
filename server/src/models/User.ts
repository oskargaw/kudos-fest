import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  createdAt: string;
}

const userSchema = new Schema({
  email: String,
  password: String,
  createdAt: String,
});

export const User = model<IUser>("User", userSchema);
