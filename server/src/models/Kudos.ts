import { model, Schema } from "mongoose";

const kudosSchema = new Schema({
  body: String,
  fromWhom: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  forWhom: String,
  createdAt: String,
});

export const Kudos = model("Kudos", kudosSchema);
