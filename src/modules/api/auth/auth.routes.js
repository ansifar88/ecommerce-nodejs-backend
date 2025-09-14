import expess from "express";
import { login, register } from "./auth.controller.js";
import { registerRules } from "./auth.validation.js";
import { validate } from "../../../middlewares/validation.middleware.js";

const userAuthRouter = expess.Router();

userAuthRouter.post("/register",validate(registerRules), register);
userAuthRouter.post("/login", login);

export default userAuthRouter;
