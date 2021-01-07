import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: String,
  password: String,
  createdAt: String,
});

export const User = model("User", userSchema);
