import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    user: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: "User",
      required: true,
    },
    date: {
      type: Date, // Date of the booking
      required: true,
    },
    // post: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // startTime: {
    //   type: Date, // Start time of the booking
    //   required: true,
    // },
    // endTime: {
    //   type: Date, // End time of the booking
    //   required: true,
    // },
  },
  { timeStamps: true }
);

export const Booking = mongoose.model("Cat", bookingSchema);
