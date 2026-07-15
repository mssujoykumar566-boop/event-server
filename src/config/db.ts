import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("✅ MongoDB Connected");
    // console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.log("❌ MongoDB Connection Failed");

    console.error(error);

    throw error;
  }
};

export default connectDB;
