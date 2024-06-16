const {uploadFile, streamFile, deleteFile, streamAllFilesInBucket} = require('../services/file');
const {CustomError} = require('../utils/error_handling')

exports.uploadFile = async(req, res) => {
  try{

    const {bucketId} = req.params
    const {file} = req;

  if (!file) {
   throw new CustomError('No file uploaded', 400)
  }
  const uploadedFile = await uploadFile(bucketId, file)
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
  streamFile(bucketId, fileName, res);
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
    await streamAllFilesInBucket(bucketId, res);
  } catch (error) {
    return res.json({
      message: `Failed to fetch files ${error.message}`,
      statusCode: error.statusCode || 500
    })
  }
};

exports.deleteFile = async(req,res) => {
  try{
    const {bucketId, fileName} = req.params;
    await deleteFile(bucketId, fileName);
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
