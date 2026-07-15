import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("✅ MongoDB Connected");
    // console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.log("❌ MongoDB Connection Failed");

    console.error(error);

    process.exit(1);
  }
};

export default connectDB;