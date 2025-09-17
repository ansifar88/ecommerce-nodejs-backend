import User from "./user.model.js";

export const getUserById = async (id) => {
  return await User.findById(id).select(
    "-addresses -lastLogin -updatedAt -__v" 
  );
};