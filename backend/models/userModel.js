import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    f_name: {
      type: String,
      required: [true, "Please enter first name"],
    },
    l_name: {
      type: String,
      required: [true, "Please enter the last name"],
    },
    date: {
      type: Number,
      required: [true, "Please enter the date"],
    },
    month: {
      type: String,
      required: [true, "Please enter the month"],
    },
    year: {
      type: Number,
      required: [true, "Please enter the year"],
    },
    gender: {
      type: String,
      required: [true, "Please enter the gender"],
    },
    m_mail: {
      type: String,
      required: [true, "Please enter the mail or phone"],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
    pronouns: {
      type: String,
      required: false,
      default: null,
    },
    otp: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
