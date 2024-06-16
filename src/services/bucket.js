const fs = require('fs-extra');
const path = require('path');
const { BUCKETS_DIR } = require('../config');
const Bucket = require('../models/bucket');
const { CustomError } = require('../utils/error_handling');

exports.createBucket = async({userId, bucketName}) => {
  try{
    const bucketPath = path.join(BUCKETS_DIR, userId, bucketName);
  await fs.ensureDir(bucketPath);
  }catch(error){
    throw new CustomError('Failed to create bucket', 500)
  }
}
exports.createBucketMeta = async ({
  userId,
  bucketName
}) => {
  try{
    const bucket = new Bucket({
      userId,
      name: bucketName,
    })
    const createdBucket = await bucket.save()
    return createdBucket
  }catch(error){
    console.log('Failed to create bucket ', error.message)
    throw new CustomError('Failed to create bucket metadata', 500)
  }

};
exports.deleteBucket = async({userId, bucketId}) => {
  try{
    const bucketPath = path.join(BUCKETS_DIR, userId, bucketId);
  await fs.remove(bucketPath);
  }catch(error){
    throw new CustomError('Failed to create bucket', 500)
  }
}
exports.deleteBucketMeta = async ({
  userId,
  bucketId
}) => {
  try{
    await Bucket.findOneAndDelete({
      userId,
      name: bucketId
    })
    return true;
  }catch(error) {
    throw new CustomError("Filed to delete bucket metadeta", 500)
  }
};
exports.getBucket = async ({
  userId,
  bucketId,
}) => {
  try{
    const bucket = await Bucket.findOne({
      userId,
      name: bucketId,
    })
    return bucket
  }catch(error){
    throw new CustomError("Failed to fetch bucket", 500)
  }
}

exports.listBuckets = async ({
  userId
}) => {
 try{
  const buckets = await Bucket.find({
    userId: userId
  })
  return buckets;
 }catch(error){
  throw new CustomError("Failed to fetch buckets", 500)
 }
};
