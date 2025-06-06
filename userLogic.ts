import mongoose, { Document, Schema } from "mongoose";

import { connectDB } from "./config/mongo";
connectDB();

interface UserInterface extends Document {
  name: string;
  age: number;
  email: string;
  password: string;
  role?: "user" | "admin";
}

const userSchema: Schema = new Schema<UserInterface>(
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
userSchema.set("strict", true);

const User = mongoose.model<UserInterface>("user", userSchema);

const createUser = async (newUser: object) => {
  try {
    const user: UserInterface = new User(newUser);
    return await user.save();
  } catch (error: any) {
    return { message: error.message };
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error getting users:" + error);
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("User not found");
    } else {
      console.log("User:", user);
    }
  } catch (error) {
    console.error("Error getting user by ID:" + error);
  }
};


const updateUser = async (id: string, body: object) => {
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true });
    if (!user) {
      console.log("User not found");
    } else {
      console.log("User updated:", user);
    }
  } catch (error) {
    console.error("Error updating user:" + error);
  }
};

const deleteUser = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      console.log("User not found");
    } else {
      console.log("User deleted:", user);
    }
  } catch (error) {
    console.error("Error deleting user:" + error);
  }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
