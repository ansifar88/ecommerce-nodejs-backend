import { body } from "express-validator";

export const userValidationRules = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),

  body("avatar")
    .optional()
    .isString().withMessage("Avatar must be a string")
    .custom((value) => {
      const isFullUrl = /^https?:\/\/[^\s]+$/.test(value);   // full URL check
      const isPath = /^\/[A-Za-z0-9._\-\/]+$/.test(value);   // path check
      if (!isFullUrl && !isPath) {
        throw new Error("Avatar must be a valid full URL or a valid path starting with '/'");
      }
      return true;
    })
];
