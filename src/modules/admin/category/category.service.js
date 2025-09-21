import { getPagination } from "../../../utils/paginator.js";
import Category from "./category.model.js";

export const getCategoryByName = async (name) => {
  const cat = await Category.findOne({ name });
  return cat;
};

export const insertCategory = async (data) => {
  const cat = await Category.create(data);
  return cat;
};

export const getCategory = async (query) => {
  const { page, limit, skip } = getPagination(query);

  const filter = {};

  if (query.search) {
    filter.name = { $regex: "^" + query.search, $options: "i" };
  }
  if (query.status !== undefined && query.status !== "all") {
    filter.isActive = query.status === "active" ? true : false;
  }
  let sort = { createdAt: -1 }; // default sort
  if (query.sortBy) {
    sort = {
      [query.sortBy]: query.sortOrder === "asc" ? 1 : -1,
    };
  }
  const [categories, total] = await Promise.all([
    Category.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate("createdBy", "username")
      .select("-__v")
      .lean(),
    Category.countDocuments(filter),
  ]);
  const result = categories.map((cat) => ({
    ...cat,
    createdBy: cat.createdBy?.username || null,
    isActive: (cat.isActive = true ? "active" : "inactive"),
  }));
  return {
    result,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
