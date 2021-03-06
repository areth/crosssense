'use strict';
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI_TEST
      || 'mongodb://localhost/crosssense-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
