import mongoose from "mongoose";

export const connectMongo = () => {
  mongoose.connect(
    "mongodb+srv://sah_speaks:Abhisheksvce@cluster1.32vvhw3.mongodb.net/"
  );
  console.log("Connected to Database successfully");
};
// module.exports = connectMongo;

// mongodb+srv://sah_speaks:<password>@cluster1.32vvhw3.mongodb.net/
// Abhisheksvce
