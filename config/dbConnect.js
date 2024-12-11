const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_SERVER_URI);
    console.log(" MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    
  }
};

module.exports = dbConnect;
