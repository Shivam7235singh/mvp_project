require("dotenv").config(); // Load environment variables from .env
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDataBase = async () => {
  if (!URI) {
    console.error("MONGODB_URI is not defined in the .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,  // Parse connection strings properly
      useUnifiedTopology: true, // Opt into the MongoDB driver's new connection management engine
    });
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDataBase;
