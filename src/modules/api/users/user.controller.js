import { NotFoundError } from "../../../utils/errors.js";
import { successResponse } from "../../../utils/response.js";
import { getUserById } from "./user.service.js";


export const getProfile =async (req, res, next) => {
    try {
        const user = await getUserById(req.user.id);
        console.log(user);
        
        if (!user) {
            return next(new NotFoundError("User not found"));
        }
        return successResponse(res, 200, user);
    } catch (error) {
        next(error);
    }
}