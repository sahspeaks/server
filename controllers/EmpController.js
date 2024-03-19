import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Employee } from "../models/Employee.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

//get all employees
export const getAllEmployees = catchAsyncError(async (req, res, next) => {
  const employee = await Employee.find({});

  res.status(200).json({
    succes: true,
    employee,
  });
});
//create a new employee
export const createEmployee = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, gender, designation, course } = req.body;
  const file = req.file;
  if (!name || !email)
    return next(new ErrorHandler("Please enter all fields", 400));
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await Employee.create({
    name,
    email,
    phone,
    gender,
    designation,
    course,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Employee created successfully",
  });
});

//get a single employee with id
export const getSingleEmployee = catchAsyncError(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return next(new ErrorHandler("Employee not found", 404));
  res.status(200).json({
    success: true,
    employee,
  });
});

//update employee with id
export const updateEmployee = catchAsyncError(async (req, res, next) => {
  let employee = await Employee.findById(req.params.id);
  if (!employee) return next(new ErrorHandler("Employee not found", 404));
  const { name, email, phone, designation, gender, course } = req.body;
  // const file = req.file;

  // const fileUri = getDataUri(file);
  // const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  // await cloudinary.v2.uploader.destroy(employee.avatar.public_id);

  employee = await Employee.findByIdAndUpdate(req.params.id, {
    name,
    email,
    phone,
    designation,
    gender,
    course,
    // avatar: {
    //   public_id: mycloud.public_id,
    //   url: mycloud.secure_url,
    // },
  });
  await employee.save();
  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
  });
});

//delete employee with id
export const deleteEmployee = catchAsyncError(async (req, res, next) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) return next(new ErrorHandler("Employee not found", 404));
  await cloudinary.v2.uploader.destroy(emp.avatar.public_id);
  await emp.deleteOne();
  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
});
