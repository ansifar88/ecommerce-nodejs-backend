import { ForbiddenError, UnauthorizedError } from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (roles = []) => {
  return (req, res, next) => {
    const token = roles.includes("admin")
      ? req.cookies?.adminAccessToken
      : req.cookies?.userAccessToken; // 🔑 read from cookie

    if (!token) {
      return next(new UnauthorizedError("No token provided"));
    }

    try {
      const decoded = verifyToken(token);
      if (!decoded) {
        return next(new UnauthorizedError("Invalid or expired token"));
      }
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return next(
          new ForbiddenError("You don’t have permission for this resource")
        );
      }
      next();
    } catch (err) {
      return next(new UnauthorizedError("Invalid or expired token"));
    }
  };
};
