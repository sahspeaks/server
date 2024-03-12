import mongoose from "mongoose";
import validator from "validator";

const EmployeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  phone: {
    type: Number,
    validate: validator.isMobilePhone,
  },

  designation: {
    type: String,
    enum: ["HR", "Manager", "Sales"],
  },
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  course: {
    type: String,
    enum: ["MCA", "BCA", "BSC"],
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Employee = mongoose.model("Employee", EmployeeSchema);
