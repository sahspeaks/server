import express from "express";
import { authorization, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();

import {
  //   deleteMyProfile,
  getMyProfile,
  login,
  //   logout,
  register,
} from "../controllers/userController.js";

//to register a new user
router.route("/register").post(singleUpload, register);

//login
router.route("/login").post(login);
//logout
// router.route("/logout").get(logout);

//get my profile
router.route("/me").get(isAuthenticated, getMyProfile);
//delete my profile
// router.route("/me").delete(isAuthenticated, deleteMyProfile);

export default router;
