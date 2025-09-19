import express from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { userValidationRules } from "./user.validation.js";

const userProfileRouter = express.Router();

userProfileRouter.get("/profile", getProfile);
userProfileRouter.put("/profile",validate(userValidationRules), updateProfile);

export default userProfileRouter;
