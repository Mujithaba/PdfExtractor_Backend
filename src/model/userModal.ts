import mongoose, { Schema, Document, Model } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
}

interface IUserDocument extends User, Document {}

const userSchema: Schema<IUserDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);

export default UserModel;
