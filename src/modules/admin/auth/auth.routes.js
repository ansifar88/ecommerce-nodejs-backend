import express from "express";
import { validate } from "../../../middlewares/validation.middleware.js";
import { login } from "./auth.controller.js";
import { adminLoginRules } from "./auth.validation.js";

const adminAuthRouter = express.Router();

adminAuthRouter.post("/login",validate(adminLoginRules), login);

export default adminAuthRouter
