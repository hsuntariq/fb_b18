import express from "express";
import {
  loginUser,
  registerUser,
  verifyOTP,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/reg-user", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/verify-otp/:user_id", verifyOTP);
