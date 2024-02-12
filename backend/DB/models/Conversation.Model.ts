import mongoose, { Schema, model, Types, Document } from "mongoose";

export interface IConversation extends Document {
  _id: string;
  participants: [];
  messages: string[]
  createdAt: Date;
  updatedAt: Date;
}
const conversationSchema = new Schema(
  {
    participants: [{ type: Types.ObjectId, ref: "User" }],
    messages: [{ type: Types.ObjectId, ref: "Message" , default:[] }],
  },
  {
    timestamps: true,
    strict: true,
  }
);

const conversationModel = model<IConversation>("Conversation", conversationSchema);

export default conversationModel;
