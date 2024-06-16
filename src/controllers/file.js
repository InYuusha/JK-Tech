const { getBucket } = require('../services/bucket');
const {uploadFile, streamFile, deleteFile, createFileMeta, deleteFileMeta, listFilesInBucket} = require('../services/file');
const {CustomError} = require('../utils/error_handling')

exports.uploadFile = async(req, res) => {
  try{

    const {bucketId} = req.params
    const {file, user: {userId}} = req;

  if (!file) {
   throw new CustomError('No file uploaded', 400)
  }
  const uploadedFile = await uploadFile(userId, bucketId, file)
  await createFileMeta({
    userId,
    bucketId,
    fileName: file.filename, 
    mimeType: file.mimetype, 
    size: file.size
  })
  return res.status(200).json({
    message: 'Successfully uploaded file',
    data: uploadedFile
  })
  }catch(error){
    return res.json({
      message: `Failed to Uplaod File: ${error.message}`
    })
  }
};

exports.streamFile = (req, res) => {
  try{
    const {bucketId, fileName} = req.params;
    const {user: {userId}} = req;
    streamFile(userId, bucketId, fileName, res);
  } catch(error){
    return res.json({
      message: `Failed to fetch file ${error.message}`,
      statusCode: error.statusCode || 500
    })
  }
};

exports.streamAllFilesInBucket = async (req, res) => {
  try {
    const {bucketId} = req.params;
    const {user:{userId}} = req;
    const bucket = await getBucket({userId, bucketId})

    if (!bucket) throw new CustomError('Bucket not found ', 404)

    const files = await listFilesInBucket(userId, bucketId, res);
    return res.status(200).json({
      message: 'Successfully feched files',
      data: files
    })
  } catch (error) {
    return res.json({
      message: `Failed to fetch files ${error.message}`,
      statusCode: error.statusCode || 500
    })
  }
};

exports.deleteFile = async(req,res) => {
  try{
    const {user: {userId}} = req;
    const {bucketId, fileName} = req.params;
    await deleteFile(userId, bucketId, fileName);
    
    await deleteFileMeta({
      bucketId,
      fileName,
    })
    return res.json({
      message: 'Successfully deleted file',
      statusCode: 204,
    })
  }catch(error) {
    return res.json({
      message: `Failed to Delete File ${error.message}`,
      statuCode: error.statusCode || 500,
    })
  }
}
