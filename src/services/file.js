const fs = require("fs-extra");
const path = require("path");
const mime = require('mime-types');
const MultiStream = require('multistream');
const { BUCKETS_DIR } = require("../config");
const { CustomError } = require("../utils/error_handling");

exports.uploadFile = async (bucketId, file) => {

    const bucketPath = path.join(BUCKETS_DIR, bucketId)

    if (!await fs.pathExists(bucketPath)) throw new Error('Bucket not found');

    const filepath = path.join(bucketPath, file.originalname);
    return {
        name: file.filename,
        url: file.path,
        bucketId,
    }
}

exports.streamAllFilesInBucket = async (bucketId, res) => {
  try {
    const bucketPath = path.join(BUCKETS_DIR, bucketId);
    const files = fs.readdirSync(bucketPath).map(fileName => path.join(bucketPath, fileName));

    const streams = files.map(filePath => fs.createReadStream(filePath));
    const multiStream = new MultiStream(streams);

    res.setHeader('Content-Type', 'application/octet-stream');
    multiStream.pipe(res);

    multiStream.on('error', (err) => {
      res.status(500).send('Internal Server Error');
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
exports.streamFile = (bucketId, fileName, res) => {
    const filePath = path.join(BUCKETS_DIR, bucketId, fileName);

    if (!fs.existsSync(filePath)) {
      throw new CustomError('File not found ', 404);
    }
    const stat = fs.statSync(filePath);

    const mimeType = getMimeType(fileName);

  res.writeHead(200, {
    'Content-Type': mimeType || 'application/octet-stream',
    'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}

exports.deleteFile = async (bucketId, fileName) => {
  const filePath = path.join(BUCKETS_DIR, bucketId, fileName);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }
  // Delete the file
  fs.unlinkSync(filePath);
  return;
};

const getMimeType = (fileId) => {
  // Extract the file extension
  const ext = path.extname(fileId).slice(1);
  // Get the MIME type based on the file extension
  return mime.lookup(ext) || 'application/octet-stream';
};