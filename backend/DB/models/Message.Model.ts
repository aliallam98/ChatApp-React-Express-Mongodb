import mongoose, { Schema, model, Types, Document } from "mongoose";


export interface IMessage extends Document {
  _id: string;
  content: string;
  senderId: string
  receiverId: string
  createdAt: Date;
  updatedAt: Date;

}
const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    senderId :{type:Types.ObjectId, ref:"User",required: true},
    receiverId :{type:Types.ObjectId, ref:"User",required: true}
  },
  {
    timestamps: true,
    strict:true
  }
);


const messageModel = model<IMessage>("Message", messageSchema);


export default messageModel;
