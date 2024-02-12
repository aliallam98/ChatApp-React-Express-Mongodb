import mongoose, { Schema, model, Types, Document } from "mongoose";



export interface IUser extends Document {
  _id:string
  fullName: string;
  userName: string;
  password: string;
  role: "Male" | "Female" 
  profileImage:string
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    fullName:  { type: String, required: true } ,
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male","Female"],
      required: true
    },
    profileImage:String
  },
  {
    timestamps: true,
    strict:true
  }
);


const userModel = model<IUser>("User", userSchema);

export default userModel;

