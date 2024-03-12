import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { v2 as cloudinary } from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  const file = req.file;
  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User Already Exist", 409));

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  sendToken(res, user, "Registered successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Incorrect Email and Password", 401));

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email and Password", 401));

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});
