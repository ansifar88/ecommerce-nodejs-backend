import mongoose from "mongoose";
import { DatabaseConnectionError } from "../utils/errors.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn.connection.readyState === 1) {
      console.log("✅ MongoDB connected");
    }
  } catch (error) {
    throw new DatabaseConnectionError(
      error.message || "Failed to connect to the database"
    );
  }
};
