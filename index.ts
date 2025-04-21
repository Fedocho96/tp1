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

const createUser = async () => {
  try {
    const user: UserInterface = new User({
      name: "Jorge Test",
      age: 30,
      email: "Jorgetest@gmail.com",
      password: "123456",
      role: "user",
    });
    await user.save();
    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:" + error);
  }
};

const getUsers = async () => {
    try {
        const users = await User.find();
        console.log("Users:", users);
    } catch (error) {
        console.error("Error getting users:" + error);
    }
    }
//getUsers()

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
//existing user id
//getUserById("68067fbeaa7c4c11690afb44")
//non existing user id
//getUserById("64f1a2b2e4b0c8d3f8e4b0c8")

const updateUser = async (id: string, body: object) => {
    try {
        const user = await User.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );
        if (!user) {
            console.log("User not found");
        }
        else {
            console.log("User updated:", user);
        }
    } catch (error) {
        console.error("Error updating user:" + error);
    }
    };
//existing user id
//updateUser("68067fbeaa7c4c11690afb44", { name: "Jorge Test nuevo" })
//non existing user id
//updateUser("64f1a2b2e4b0c8d3f8e4b0c8", { name: "Jorge Test nuevo" })

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
    }
//existing user id
//deleteUser("68067fbeaa7c4c11690afb44")
//non existing user id
//deleteUser("64f1a2b2e4b0c8d3f8e4b0c8")
 