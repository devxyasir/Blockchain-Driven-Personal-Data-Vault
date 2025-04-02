const mongoose = require('mongoose');

/**
 * Check if MongoDB connection is healthy
 * @returns {Promise<boolean>} True if connected, false otherwise
 */
const checkDbConnection = async () => {
  try {
    // Check if mongoose is connected
    if (mongoose.connection.readyState === 1) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Database connection check error:', error);
    return false;
  }
};

module.exports = {
  checkDbConnection
};
