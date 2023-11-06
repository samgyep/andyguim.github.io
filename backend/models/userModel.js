import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      //lowercase: true,
    },
    name: {
      type: String,

      //lowercase: true,
    },
    contact: {
      type: String,
    },
    role: {
      type: String,
      default: "customer",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

export const User = mongoose.model("User1", userSchema);
