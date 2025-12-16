const mongoose = require('mongoose');
const env = require('../config/env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;