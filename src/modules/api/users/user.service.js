import User from "./user.model.js";

export const getUserById = async (id) => {
  return await User.findById(id).select(
    "-addresses -lastLogin -updatedAt -__v" 
  );
};

export const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,       
    runValidators: true,
  }).select(
    "-addresses -lastLogin -updatedAt -__v" 
  );
};
