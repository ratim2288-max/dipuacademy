const mongoose = require('mongoose');
const dns = require('dns');

// Use reliable public DNS resolvers to prevent Windows ISP SRV timeout
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const connectDB = async () => {
  mongoose.set('bufferCommands', false);
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dipu_edu';

    if (mongoUri.includes('<db_username>') || mongoUri.includes('<db_password>')) {
      console.warn('[MongoDB Atlas] Placeholder detected in MONGODB_URI: Please set your actual database username and password in .env');
      console.warn('[MongoDB] Running in fallback mode until real credentials are provided.');
      return;
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Atlas] Connected Successfully: ${conn.connection.host}`);

    // Seed/sync authentic courses in MongoDB
    try {
      const { seedCoursesIfEmpty } = require('../services/courseSeeder');
      await seedCoursesIfEmpty();
    } catch (seedErr) {
      console.warn('[MongoDB] Course seeder note:', seedErr.message);
    }
  } catch (error) {
    console.warn(`[MongoDB] Database connection warning: ${error.message}`);
    console.warn('[MongoDB] Running in fallback / in-memory simulated mode.');
  }
};

module.exports = connectDB;
