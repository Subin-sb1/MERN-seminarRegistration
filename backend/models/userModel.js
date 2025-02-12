import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registered: { type: Boolean, default: false } 
}, { timestamps: true });

//Hash password before saving


export default mongoose.model("User", userSchema);
