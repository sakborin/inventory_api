const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "inventory_db" });
    console.log("Database Connected!");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDB;
