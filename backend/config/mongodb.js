import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("connected", () => {
      console.log("DB Connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("DB Connection Error:", err);
    });

  } catch (err) {
    console.error("Mongo Connect Failed:", err);
    process.exit(1);
  }
};

export default connectDB;

