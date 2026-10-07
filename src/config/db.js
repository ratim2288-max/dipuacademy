const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dipu_edu';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 1500,
    });
    console.log(`[MongoDB] Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB] Database connection warning: ${error.message}`);
    console.warn('[MongoDB] Running in fallback / in-memory simulated mode.');
    mongoose.set('bufferCommands', false);
  }
};

module.exports = connectDB;
