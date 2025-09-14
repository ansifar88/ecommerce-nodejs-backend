import jwt from "jsonwebtoken";

import { UnauthorizedError } from "../utils/errors.js";
import { ENV } from "../config/env.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded; // attach user payload (id, role, etc.) to request
    next();
  } catch (err) {
    return next(new UnauthorizedError("Invalid token"));
  }
};
