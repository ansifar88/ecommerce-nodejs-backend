import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import errorHandler from "./middlewares/error.middleware.js";

import memberRouter from "./routes/member.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
connectDB();

app.use("/api", memberRouter);

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`✅ Server running on http://localhost:${ENV.PORT}`);
});
