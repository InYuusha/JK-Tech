const fs = require("fs-extra");
const path = require("path");
const mime = require("mime-types");
const MultiStream = require("multistream");
const FileMeta = require("../models/file");
const { BUCKETS_DIR } = require("../config");
const { CustomError } = require("../utils/error_handling");

exports.uploadFile = async (userId, bucketId, file) => {
  const bucketPath = path.join(BUCKETS_DIR, userId, bucketId);

  if (!(await fs.pathExists(bucketPath))) throw new Error("Bucket not found");

  const filepath = path.join(bucketPath, file.originalname);
  return {
    name: file.filename,
    url: file.path,
    bucketId,
  };
};
exports.createFileMeta = async ({
  userId,
  bucketId,
  fileName,
  mimeType,
  size,
}) => {
  try {
    const fileMeta = new FileMeta({
      userId,
      bucketId,
      fileName,
      mimeType,
      size,
    });
    await fileMeta.save();
    return fileMeta;
  } catch (error) {
    console.log(`Failed to create file meta ${error.message}`);
    throw new CustomError("Failed to create file meta ", 500);
  }
};

exports.listFilesInBucket = async ({userId, bucketId}) => {
  try {
    const files = await FileMeta.find({
      userId,
      bucketId,
    });
    return files;
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.streamFile = ({userId, bucketId, fileName, res}) => {
  const filePath = path.join(BUCKETS_DIR, userId, bucketId, fileName);

  if (!fs.existsSync(filePath)) {
    throw new CustomError("File not found ", 404);
  }
  const stat = fs.statSync(filePath);

  const mimeType = getMimeType(fileName);

  res.writeHead(200, {
    "Content-Type": mimeType || "application/octet-stream",
    "Content-Length": stat.size,
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
};

exports.deleteFile = async ({userId, bucketId, fileName}) => {
  const filePath = path.join(BUCKETS_DIR, userId, bucketId, fileName);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found");
  }
  // Delete the file
  fs.unlinkSync(filePath);
  return;
};
exports.deleteFileMeta = async ({ bucketId, fileName }) => {
  try {
    await FileMeta.findOneAndDelete({
      bucketId,
      fileName,
    });
  } catch (error) {
    throw new CustomError("Failed to delete filemeta", 500);
  }
};

exports.deleteAllFilesMeta = async ({ userId, bucketId }) => {
  try {
    await FileMeta.deleteMany({
      userId,
      bucketId,
    });
  } catch (error) {
    throw new CustomError("Failed to delete filesmeta", 500);
  }
};

const getMimeType = (fileId) => {
  // Extract the file extension
  const ext = path.extname(fileId).slice(1);
  // Get the MIME type based on the file extension
  return mime.lookup(ext) || "application/octet-stream";
};
