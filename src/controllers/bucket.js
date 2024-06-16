const {createBucket, deleteBucket, listBuckets} = require('../services/bucket');
const { validateBucketName } = require('../utils/validations');

exports.createBucket = async(req, res) => {
 try{
  const {name:bucketName} = req.body
  
  // validate bucket name
  validateBucketName(bucketName)
  await createBucket(bucketName)

  return res.status(201).json({
    message: 'Successfully created bucket'
  })
    
 } catch(error){
  return res.json({
    message: error.message, 
    statusCode: error.statusCode || 500
  })
 }
};

exports.deleteBucket = async(req, res) => {
 try{
  const {bucketId} = req.params;
  await deleteBucket(bucketId)
  return res.status(204).json({
    message: 'Successfylly delete bucket'
  })
 }catch(error){
  return res.json({
    message: `Failed to delete bucket ${error.message}`,
    statusCode: error.statusCode || 500
  })
 }

};

exports.listBuckets = async(req, res) => {
 try{
  const buckets = await listBuckets();
  return res.status(200).json({
    message: 'Successfully fetched buckets',
    data: buckets
  })
 } catch(error){
    return res.json({
      message: `Failed to fetch buckets ${error.message}`,
      statusCode: error.statusCode || 500
    })
 }
};
