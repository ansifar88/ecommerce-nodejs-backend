import Category from "./category.model.js";

export const getCategoryByName = async (name) => {
  const cat = await Category.findOne({ name });
  return cat;
};

export const insertCategory = async (data) => {

  const cat = await Category.create(data);
  return cat;
};
