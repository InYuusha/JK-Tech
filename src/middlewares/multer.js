const multer = require('multer');
const Uid = require('short-unique-id')
const fs = require('fs-extra');
const path = require('path');
const { BUCKETS_DIR } = require('../config');
const { CustomError } = require('../utils/error_handling');


const id = new Uid({ length: 10 })


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const {user:{userId}, params: {bucketId}} = req;
    const bucketPath = path.join(BUCKETS_DIR, userId, bucketId);
    if (!fs.pathExistsSync(bucketPath))
      cb(new CustomError('Bucket not found', 404))
    cb(null, bucketPath);
  },
  filename: (req, file, cb) => {
    const fileId = `${id.rnd()}.${file.mimetype.split('/')[1]}`;
    cb(null, fileId);
  }
});

module.exports = multer({ storage });
