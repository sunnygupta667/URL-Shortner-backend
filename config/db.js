import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
    return true; // ✅ Return true if connection successful
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    return false; // ✅ Return false if connection fails
  }
};
