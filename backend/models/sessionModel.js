import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
  session: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },

  customer: {
    type: String,
    default: "",
  },
  customerEmail: {
    type: String,
    unique: true,
    default: "",
  },
  availability: {
    type: String,
    default: "yes",
  },
  note: {
    type: String,
  },
});

export const Session = mongoose.model("Session", sessionSchema);
