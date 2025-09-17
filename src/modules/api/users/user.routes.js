import express from "express";
import { getProfile } from "./user.controller.js";

const userProfileRouter = express.Router();

userProfileRouter.get("/profile", getProfile);

export default userProfileRouter;
