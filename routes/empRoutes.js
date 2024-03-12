import express from "express";
import { authorization, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
} from "../controllers/EmpController.js";

//get all employees
router.route("/employees").get(getAllEmployees);
//create a new employee
router
  .route("/addemployee")
  .post(isAuthenticated, authorization, singleUpload, createEmployee);
//edeit delete and get a single employee
router
  .route("/employee/:id")
  .get(isAuthenticated, getSingleEmployee)
  .put(isAuthenticated, authorization, updateEmployee, singleUpload)
  .delete(isAuthenticated, authorization, deleteEmployee);
export default router;
