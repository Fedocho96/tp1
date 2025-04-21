import mongoose, { Document, Schema } from "mongoose";

import { connectDB } from "./config/mongo";
connectDB();

interface User extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  role: "user" | "admin";
}

const userSchema: Schema = new Schema<User>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    versionKey: false,
  }
);
