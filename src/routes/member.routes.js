import express from "express";
import userAuthRouter from "../modules/api/auth/auth.routes.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import userProfileRouter from "../modules/api/users/user.routes.js";

const memberRouter = express.Router();

memberRouter.use("/auth", userAuthRouter);

memberRouter.use(authenticate(['user']));

memberRouter.use("/user", userProfileRouter);

export default memberRouter;
