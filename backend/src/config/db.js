import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected DB successfully");
}

export default connectDB;

