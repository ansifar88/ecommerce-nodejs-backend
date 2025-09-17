import expess from "express";
import { login, register } from "./auth.controller.js";
import { loginRules, registerRules } from "./auth.validation.js";
import { validate } from "../../../middlewares/validation.middleware.js";

const userAuthRouter = expess.Router();

userAuthRouter.post("/register", validate(registerRules), register);
userAuthRouter.post("/login", validate(loginRules), login);

export default userAuthRouter;
