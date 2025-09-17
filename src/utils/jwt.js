import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { UnauthorizedError } from "./errors.js";

const secret = ENV.JWT_SECRET;

export const signToken = (payload, options) => {
  try {
    return jwt.sign(payload, secret, options);
  } catch (error) {
    throw new UnauthorizedError("Token signing failed");
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};
