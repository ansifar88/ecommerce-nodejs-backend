import { BadRequestError } from "../../../utils/errors.js";
import { signToken } from "../../../utils/jwt.js";
import { successResponse } from "../../../utils/response.js";
import User from "../users/user.model.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      next(new BadRequestError("User already exists"));
    } else {
      const user = new User({ email, password, name});
      await user.save();
      if (!user) {
        next(new BadRequestError("Failed to create user"));
      } else {
        const accessToken = signToken({ id: user._id }, { expiresIn: "1h" });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 1000, // 1h
        });
      }
       user.lastLogin = new Date();
      await user.save();
      return successResponse(res, 200, {
        message : "User registered successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if(!user){
      throw new BadRequestError("Invalid email or password");
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
      throw new BadRequestError("Invalid email or password");
    }
    
        const accessToken = signToken({ id: user._id }, { expiresIn: "1h" });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 1000, // 1h
        });
      user.lastLogin = new Date();
      await user.save();
      return successResponse(res, 200, 
        "User logged in successfully"
      );
  }catch (error) {
    next(error);
  }
};
