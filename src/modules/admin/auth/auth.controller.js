import { successResponse } from "../../../utils/response.js";
import { loginAdmin } from "./ath.service.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { accessToken } = await loginAdmin(username, password);
    res.cookie("adminAccessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000, // 1h
    });
    return successResponse(res, 200, "Admin logged in successfully");
  } catch (error) {
    next(error);
  }
};
