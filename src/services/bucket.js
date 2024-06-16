const fs = require('fs-extra');
const path = require('path');
const { BUCKETS_DIR } = require('../config');

exports.createBucket = async (name) => {
  const bucketPath = path.join(BUCKETS_DIR, name);
  await fs.ensureDir(bucketPath);
};

exports.deleteBucket = async (bucketId) => {
  const bucketPath = path.join(BUCKETS_DIR, bucketId);
  await fs.remove(bucketPath);
};

exports.listBuckets = async () => {
  const buckets = await fs.readdir(BUCKETS_DIR);
  return buckets;
};
