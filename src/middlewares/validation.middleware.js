import { validationResult } from "express-validator";
import { BadRequestError, RequestValidationError } from "../utils/errors.js";

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new RequestValidationError("Validation failed", errors));
     }

    next();
  };
};
