import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    // console.log("🔗 Connecting to MongoDB at:", process.env.MONGODB_URL);

    await mongoose.connect(`${process.env.MONGODB_URL}/seminar`);

    console.log("✅ MongoDB Connected Successfully");

  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
