import { BadRequestError } from "../../../utils/errors.js";
import { successResponse } from "../../../utils/response.js";
import { getCategoryByName, insertCategory } from "./category.service.js";

export const getCategories = async (req, res, next) => {
  try {
    const category = getAllCategory()
    return successResponse(res, 200, "u have reached getcat contr",category);
  } catch (error) {
    next(error);
  }
};
export const createCategories = async (req, res, next) => {
  try {
    const isExists = await getCategoryByName(req.body.name);
    if (isExists) {
      return next(new BadRequestError("Category name must be unique"));
    }
    req.body.createdBy = req.user.id;
    const cat = await insertCategory(req.body);
    return successResponse(res, 200, "Category added successfully");
  } catch (error) {
    next(error);
  }
};
