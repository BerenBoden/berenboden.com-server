import mongoose from "mongoose";

export interface UserDocumnet extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken: string;
  ipAddress: string;
  userAgent: string;
}

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    avatar: String,
    refreshToken: String,
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
