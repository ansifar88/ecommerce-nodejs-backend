import { body } from "express-validator";

export const insertRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name should be between 3 and 20 charators"),
  body("description")
    .trim()
    .optional()
    .isLength({ max: 50 })
    .withMessage("description cannot exceed 50 charactor"),
  body("icon")
    .trim()
    .optional()
    .isString()
    .withMessage("Avatar must be a string")
    .custom((value) => {
      const isFullUrl = /^https?:\/\/[^\s]+$/.test(value); // full URL check
      const isPath = /^\/[A-Za-z0-9._\-\/]+$/.test(value); // path check
      if (!isFullUrl && !isPath) {
        throw new Error(
          "Avatar must be a valid full URL or a valid path starting with '/'"
        );
      }
      return true;
    }),
];
