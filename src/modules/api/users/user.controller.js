import { NotFoundError } from "../../../utils/errors.js";
import { successResponse } from "../../../utils/response.js";
import { getUserById, updateUserById } from "./user.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return next(new NotFoundError("User not found"));
    }
    return successResponse(res, 200, "Success", user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { name, avatar } = req.body;

    const updatedUser = await updateUserById(userId, { name, avatar });

    if (!updatedUser) {
      return next(new NotFoundError("User not found"));
    }

    return successResponse(res, 200, "updatedUser");
  } catch (error) {
    next(error);
  }
};
