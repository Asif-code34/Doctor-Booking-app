// import mongoose from "mongoose";

// const connectDB = async () => {
//  mongoose.connection.on('connected',()=>console.log("Database Connected"))
//         const conn = await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);

// };

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`, {
      serverSelectionTimeoutMS: 10000,
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
