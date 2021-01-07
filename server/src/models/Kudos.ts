import { model, Schema, Document } from "mongoose";

interface IKudos extends Document {
  body: string;
  fromWhom: string;
  forWhom: string;
  createdAt: string;
}

const kudosSchema = new Schema({
  body: String,
  fromWhom: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  forWhom: String,
  createdAt: String,
});

export const Kudos = model<IKudos>("Kudos", kudosSchema);
