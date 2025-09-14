// src/config/env.js
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,

  // Database
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce",

  // JWT
  JWT_SECRET: process.env.JWT_SECRET
};

