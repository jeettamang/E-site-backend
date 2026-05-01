import express from "express";
import { loginUser, signUpUser } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/register", signUpUser).post("/login", loginUser);

export default authRouter;
