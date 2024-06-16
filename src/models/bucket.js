const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Bucket = mongoose.model('Bucket', bucketSchema);
module.exports = Bucket;
