const { getBucket } = require("../services/bucket");
const {
  uploadFile,
  streamFile,
  deleteFile,
  createFileMeta,
  deleteFileMeta,
  listFilesInBucket,
} = require("../services/file");
const { CustomError } = require("../utils/error_handling");

exports.uploadFile = async (req, res) => {
  try {
    const { bucketId } = req.params;
    const {
      file,
      user: { userId },
    } = req;

    if (!file) {
      throw new CustomError("No file uploaded", 400);
    }
    const [uploadedFile] = await Promise.all([
      uploadFile(userId, bucketId, file),
      createFileMeta({
        userId,
        bucketId,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
      }),
    ]);
    return res.status(200).json({
      message: "Successfully uploaded file",
      data: uploadedFile,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: `Failed to Uplaod File: ${error.message}`,
    });
  }
};

exports.streamFile = (req, res) => {
  try {
    const { bucketId, fileName } = req.params;
    const {
      user: { userId },
    } = req;
    streamFile(userId, bucketId, fileName, res);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: `Failed to fetch file ${error.message}`,
    });
  }
};

exports.streamAllFilesInBucket = async (req, res) => {
  try {
    const { bucketId } = req.params;
    const {
      user: { userId },
    } = req;
    const bucket = await getBucket({ userId, bucketId });

    if (!bucket) throw new CustomError("Bucket not found ", 404);

    const files = await listFilesInBucket(userId, bucketId, res);
    return res.status(200).json({
      message: "Successfully feched files",
      data: files,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: `Failed to fetch files ${error.message}`,
    });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const {
      user: { userId },
    } = req;
    const { bucketId, fileName } = req.params;
    await Promise.all([
      deleteFile(userId, bucketId, fileName),
      deleteFileMeta({
        bucketId,
        fileName,
      }),
    ]);
    return res.status(200).json({
      message: "Successfully deleted file",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: `Failed to Delete File ${error.message}`,
    });
  }
};
