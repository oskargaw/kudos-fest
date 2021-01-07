import { model, Schema, Document } from "mongoose";

interface ITeamMember extends Document {
  fullName: string;
  imageUrl: string;
}

const teamMemberSchema = new Schema({
  fullName: String,
  imageUrl: String,
});

export const TeamMember = model<ITeamMember>("TeamMember", teamMemberSchema);
