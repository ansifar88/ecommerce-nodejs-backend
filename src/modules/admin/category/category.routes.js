import express from "express";
// updateCategory createCategory
import { validate } from "../../../middlewares/validation.middleware.js";
import { insertRules } from "../category/category.validation.js";
import { createCategories, getCategories } from "./category.controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/", validate(insertRules), createCategories);
// categoryRouter.put('/:id', /*conroller will be here*/)

export default categoryRouter;
