import express from "express";
import userAuthRouter from "../modules/api/auth/auth.routes.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const memberRouter = express.Router();

memberRouter.use("/auth", userAuthRouter);

memberRouter.use(authenticate);



export default memberRouter;