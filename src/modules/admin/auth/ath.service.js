import { NotFoundError } from "../../../utils/errors.js";
import { signToken } from "../../../utils/jwt.js";
import Admin from "../auth/auth.model.js";

export const loginAdmin = async (username, password) => {
  const admin = await Admin.findOne({ username }).select("+password");

  if (!admin) {
    throw new NotFoundError("Invalid credentials");
  }
  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    throw new NotFoundError("Invalid credentials");
  }
  const accessToken = signToken(
    { id: admin._id, role: "admin" },
    { expiresIn: "1h" }
  );
  return { accessToken };
};
