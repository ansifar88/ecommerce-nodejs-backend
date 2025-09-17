import { UnauthorizedError } from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  const token = req.cookies?.accessToken; // 🔑 read from cookie

  if (!token) {
    return next(new UnauthorizedError("No token provided"));
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return next(new UnauthorizedError("Invalid or expired token"));
    }
    req.user = decoded;
    next();
  } catch (err) {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
};
