const path = require('path');
require('dotenv').config();

const {
  PORT,
  MONGO_URL,
  JWT_SECRET
} = process.env;

const config = {
  BUCKETS_DIR: path.join(__dirname, '../../buckets'),
  PORT: PORT || 3000,
  MONGO_URL,
  JWT_SECRET,
};

module.exports = config
